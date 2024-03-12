import * as React from 'react';
import { useTimeout } from '../../hooks/Hooks';
//import { Ripple } from '../ripple/Ripple';
import { classNames } from 'src/utils/Utils';

import './Messages.scss';

export const UIMessage = React.memo(
    React.forwardRef((props: any, ref: any) => {
        const { severity, content, summary, detail, closable, life, sticky } =
            props.message;

        const [clearTimer] = useTimeout(
            () => {
                onClose(null);
            },
            life || 3000,
            !sticky
        );

        const onClose = (event: any) => {
            clearTimer();
            props.onClose && props.onClose(props.message);

            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const onClick = () => {
            props.onClick && props.onClick(props.message);
        };

        const createCloseIcon = () => {
            if (closable !== false) {
                return (
                    <button
                        type="button"
                        className="cs-message-close cs-link"
                        onClick={onClose}
                    >
                        <i className="cs-message-close-icon csi csi-times"></i>
                        {/*<Ripple />*/}
                    </button>
                );
            }

            return null;
        };

        const createMessage = () => {
            if (props.message) {
                const icon = classNames('cs-message-icon csi ', {
                    'csi-info-circle': severity === 'info',
                    'csi-check': severity === 'success',
                    'csi-exclamation-triangle': severity === 'warn',
                    'csi-times-circle': severity === 'error',
                });

                return (
                    content || (
                        <>
                            <span className={icon}></span>
                            <span className="cs-message-summary">
                                {summary}
                            </span>
                            <span className="cs-message-detail">{detail}</span>
                        </>
                    )
                );
            }

            return null;
        };

        const className = classNames(
            'cs-message cs-component cs-message-' + severity
        );
        const closeIcon = createCloseIcon();
        const message = createMessage();

        return (
            <div ref={ref} className={className} onClick={onClick}>
                <div className="cs-message-wrapper">
                    {message}
                    {closeIcon}
                </div>
            </div>
        );
    })
);

UIMessage.displayName = 'UIMessage';
