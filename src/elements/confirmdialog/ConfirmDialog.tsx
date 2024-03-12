import * as React from 'react';
import { localeOption } from '../../api/Api';
import { Button } from '../buttons/Button';
import { Dialog, DialogProps } from '../modals/Dialog';
import { useUnmountEffect, useUpdateEffect } from '../../hooks/Hooks';
import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import { IconType } from '../../utils/types';

interface ConfirmDialogProps extends Omit<DialogProps, 'onHide' | 'accept' | 'footer'> {
    tagKey?: string;
    visible?: boolean;
    message?: ConfirmDialogTemplateType;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: any; // IconType<ConfirmDialogProps>;
    rejectIcon?: any; //IconType<ConfirmDialogProps>;
    acceptIcon?: any; //IconType<ConfirmDialogProps>;
    rejectClassName?: string;
    acceptClassName?: string;
    appendTo?: ConfirmDialogAppendToType;
    className?: string;
    footer?: ConfirmDialogTemplateType;
    breakpoints?: ConfirmDialogBreakpoints;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
    children?: React.ReactNode;
    target?: string | string[] | HTMLElement;
}

interface ConfirmDialogReturn {
    show(): void;
    hide(): void;
}

type ConfirmDialogTemplateType =
    | React.ReactNode
    | ((options: ConfirmDialogOptions) => React.ReactNode);

type ConfirmDialogAppendToType = 'self' | HTMLElement | undefined | null;

interface ConfirmDialogBreakpoints {
    [key: string]: string;
}

interface ConfirmDialogOptions {
    accept(): void;
    reject(): void;
    acceptClassName: string;
    rejectClassName: string;
    acceptLabel: string;
    rejectLabel: string;
    element: React.ReactNode;
    props: ConfirmDialogProps;
    [key: string]: any;
}

//export const confirmDialog = (
//    props: ConfirmDialogProps = {}
//): ConfirmDialogReturn => {
//    props = {
//        ...props,
//        ...{ visible: props.visible === undefined ? true : props.visible },
//    };
//    props.visible && OverlayService.emit('confirm-dialog', props);

//    const show = (updatedProps = {}) => {
//        OverlayService.emit('confirm-dialog', {
//            ...props,
//            ...updatedProps,
//            ...{ visible: true },
//        });
//    };

//    const hide = () => {
//        OverlayService.emit('confirm-dialog', { visible: false });
//    };

//    return { show, hide };
//};

export const ConfirmDialog = React.memo(
    React.forwardRef((props: ConfirmDialogProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [visibleState, setVisibleState] = React.useState(props.visible);
        const [reshowState, setReshowState] = React.useState(false);
        const confirmProps = React.useRef(null);
        const getCurrentProps = () => confirmProps.current || props;
        const getPropValue = (key) => (confirmProps.current || props)[key];
        const callbackFromProp = (key, ...param) =>
            ObjectUtils.getPropValue(getPropValue(key), param);

        const acceptLabel =
            getPropValue('acceptLabel') || localeOption('accept');
        const rejectLabel =
            getPropValue('rejectLabel') || localeOption('reject');

        const accept = () => {
            callbackFromProp('accept');
            hide('accept');
        };

        const reject = () => {
            callbackFromProp('reject');
            hide('reject');
        };

        const show = () => {
            setVisibleState(true);
        };

        const hide = (result?) => {
            setVisibleState(false);
            callbackFromProp('onHide', result);
        };

        const confirm = (updatedProps) => {
            if (updatedProps.tagKey === props.tagKey) {
                const isVisibleChanged = visibleState !== updatedProps.visible;
                const targetChanged =
                    getPropValue('target') !== updatedProps.target;

                if (targetChanged && !props.target) {
                    hide();
                    confirmProps.current = updatedProps;
                    setReshowState(true);
                } else if (isVisibleChanged) {
                    confirmProps.current = updatedProps;
                    updatedProps.visible ? show() : hide();
                }
            }
        };

        React.useEffect(() => {
            props.visible ? show() : hide();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.visible]);

        React.useEffect(() => {
            if (!props.target && !props.message) {
                OverlayService.on('confirm-dialog', confirm);
            }

            return () => {
                OverlayService.off('confirm-dialog', confirm);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.target]);

        useUpdateEffect(() => {
            reshowState && show();
        }, [reshowState]);

        useUnmountEffect(() => {
            OverlayService.off('confirm-dialog', confirm);
        });

        React.useImperativeHandle(ref, () => ({
            confirm,
        }));

        const createFooter = () => {
            const acceptClassName = classNames(
                'cs-confirm-dialog-accept',
                getPropValue('acceptClassName')
            );
            const rejectClassName = classNames(
                'cs-confirm-dialog-reject',
                {
                    'cs-button-text': !getPropValue('rejectClassName'),
                },
                getPropValue('rejectClassName')
            );
            const content = (
                <>
                    <Button
                        label={rejectLabel}
                        icon={getPropValue('rejectIcon')}
                        className={rejectClassName}
                        onClick={reject}
                    />
                    <Button
                        label={acceptLabel}
                        icon={getPropValue('acceptIcon')}
                        className={acceptClassName}
                        onClick={accept}
                        autoFocus
                    />
                </>
            );

            if (getPropValue('footer')) {
                const defaultContentOptions = {
                    accept,
                    reject,
                    acceptClassName,
                    rejectClassName,
                    acceptLabel,
                    rejectLabel,
                    element: content,
                    props: getCurrentProps(),
                };

                return ObjectUtils.getJSXElement(
                    getPropValue('footer'),
                    defaultContentOptions
                );
            }

            return content;
        };

        const createElement = () => {
            const currentProps = getCurrentProps();
            const className = classNames(
                'cs-confirm-dialog',
                getPropValue('className')
            );
            const otherProps = ObjectUtils.findDiffKeys(
                currentProps,
                defaultProps
            );
            const message = ObjectUtils.getJSXElement(
                getPropValue('message'),
                currentProps
            );
            const icon = IconUtils.getJSXIcon(
                getPropValue('icon'),
                { className: 'cs-confirm-dialog-icon' },
                { props: currentProps }
            );
            const footer = createFooter();

            return (
                <Dialog
                    visible={visibleState}
                    {...otherProps}
                    className={className}
                    footer={footer}
                    onHide={hide}
                    breakpoints={getPropValue('breakpoints')}
                >
                    {icon}
                    <span className="cs-confirm-dialog-message">{message}</span>
                </Dialog>
            );
        };

        const element = createElement();

        return <Portal element={element} appendTo={getPropValue('appendTo')} />;
    })
);

ConfirmDialog.displayName = 'ConfirmDialog';
const defaultProps = {
    __TYPE: 'ConfirmDialog',
    tagKey: undefined,
    visible: false,
    message: null,
    rejectLabel: null,
    acceptLabel: null,
    icon: null,
    rejectIcon: null,
    acceptIcon: null,
    rejectClassName: null,
    acceptClassName: null,
    className: null,
    appendTo: null,
    footer: null,
    breakpoints: null,
    onHide: null,
    accept: null,
    reject: null,
};
