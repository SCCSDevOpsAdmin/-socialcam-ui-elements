import React from 'react';
import { localeOption } from '../../api/Locale';
import { Button } from '../buttons/Button';
import { useTimeout } from '../../hooks/Hooks';
import { classNames, DomHandler, ObjectUtils } from 'src/utils/Utils';
import { ToastMessageProps } from './types';
import './Toast.scss';

export const ToastMessage = React.memo(
    React.forwardRef((props: ToastMessageProps, ref?) => {
        const messageInfo = props.messageInfo;
        const {
            severity,
            content,
            summary,
            detail,
            closable,
            life,
            sticky,
            className: _className,
            style,
            contentClassName: _contentClassName,
            contentStyle,
        } = messageInfo.message;

        const [focused, setFocused] = React.useState(false);
        const [clearTimer] = useTimeout(
            () => {
                onClose();
            },
            life || 3000,
            !sticky && !focused
        );

        const onClose = () => {
            clearTimer();
            props.onClose && props.onClose(messageInfo);
        };

        const onClick = (event) => {
            if (
                props.onClick &&
                !(
                    DomHandler.hasClass(event.target, 'cs-toast-icon-close') ||
                    DomHandler.hasClass(
                        event.target,
                        'cs-toast-icon-close-icon'
                    )
                )
            ) {
                props.onClick(messageInfo.message);
            }
        };

        const onMouseEnter = (event) => {
            props.onMouseEnter && props.onMouseEnter(event);

            // do not continue if the user has canceled the event
            if (event.defaultPrevented) {
                return;
            }

            // stop timer while user has focused message
            if (!sticky) {
                clearTimer();
                setFocused(true);
            }
        };

        const onMouseLeave = (event) => {
            props.onMouseLeave && props.onMouseLeave(event);

            // do not continue if the user has canceled the event
            if (event.defaultPrevented) {
                return;
            }

            // restart timer when user has left message
            if (!sticky) {
                setFocused(false);
            }
        };

        const createCloseIcon = () => {
            if (closable !== false) {
                return (
                    <Button
                        type="button"
                        className="cs-toast-icon-close cs-link"
                        icon="cs-toast-icon-close-icon csi csi-times"
                        onClick={onClose}
                        aria-label={localeOption('close')}
                    />
                );
            }

            return null;
        };

        const createMessage = () => {
            if (messageInfo) {
                const contentEl = ObjectUtils.getJSXElement(content, {
                    message: messageInfo.message,
                    onClick,
                    onClose,
                });
                const iconClassName = classNames('cs-toast-message-icon csi', {
                    'csi-info-circle': severity === 'info',
                    'csi-exclamation-triangle': severity === 'warn',
                    'csi-times': severity === 'error',
                    'csi-check': severity === 'success',
                });

                return (
                    contentEl || (
                        <>
                            <span className={iconClassName}></span>
                            <div className="cs-toast-message-text">
                                <span className="cs-toast-summary">
                                    {summary}
                                </span>
                                {detail && (
                                    <div className="cs-toast-detail">
                                        {detail}
                                    </div>
                                )}
                            </div>
                        </>
                    )
                );
            }

            return null;
        };

        const className = classNames(
            'cs-toast-message',
            {
                [`cs-toast-message-${severity}`]: severity,
            },
            _className
        );
        const contentClassName = classNames(
            'cs-toast-message-content',
            _contentClassName
        );
        const message = createMessage();
        const closeIcon = createCloseIcon();

        return (
            <div
                className={className}
                style={style}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className={contentClassName} style={contentStyle}>
                    {message}
                    {closeIcon}
                </div>
            </div>
        );
    })
);

ToastMessage.displayName = 'ToastMessage';
