import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import PrimeReact from '../../api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import { useUnmountEffect } from '../../hooks/Hooks';
import { Portal } from '../portal/Portal';
import { classNames, ObjectUtils, ZIndexUtils } from 'src/utils/Utils';
import { ToastMessage } from './ToastMessage';
import { ToastProps } from './types';
import './Toast.scss';

let messageIdx = 0;

export const Toast = React.memo(
    React.forwardRef((props: ToastProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [messagesState, setMessagesState] = React.useState([]);
        const containerRef = React.useRef(null);

        const show = (value) => {
            if (value) {
                const messages = assignIdentifiers(value, true);
                messagesState.length === 0 &&
                    ZIndexUtils.set(
                        'toast',
                        containerRef.current,
                        PrimeReact.autoZIndex,
                        props.baseZIndex || PrimeReact.zIndex['toast']
                    );
                setMessagesState(messages);
            }
        };

        const assignIdentifiers = (value, copy) => {
            let messages;
            if (Array.isArray(value)) {
                const multipleMessages = value.reduce((acc, message) => {
                    acc.push({ _pId: messageIdx++, message });

                    return acc;
                }, []);

                if (copy) {
                    messages = messagesState
                        ? [...messagesState, ...multipleMessages]
                        : multipleMessages;
                } else {
                    messages = multipleMessages;
                }
            } else {
                const message = { _pId: messageIdx++, message: value };
                if (copy) {
                    messages = messagesState
                        ? [...messagesState, message]
                        : [message];
                } else {
                    messages = [message];
                }
            }
            return messages;
        };

        const clear = () => {
            ZIndexUtils.clear(containerRef.current);
            setMessagesState([]);
        };

        const replace = (value) => {
            const replaced = assignIdentifiers(value, false);
            setMessagesState(replaced);
        };

        const onClose = (messageInfo) => {
            const messages = messagesState.filter(
                (msg) => msg._pId !== messageInfo._pId
            );
            setMessagesState(messages);

            props.onRemove && props.onRemove(messageInfo.message);
        };

        const onEntered = () => {
            props.onShow && props.onShow();
        };

        const onExited = () => {
            messagesState.length === 1 &&
                ZIndexUtils.clear(containerRef.current);

            props.onHide && props.onHide();
        };

        useUnmountEffect(() => {
            ZIndexUtils.clear(containerRef.current);
        });

        React.useImperativeHandle(ref, () => ({
            props,
            show,
            replace,
            clear,
            getElement: () => containerRef.current,
        }));

        const createElement = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-toast cs-component cs-toast-' + props.position,
                props.className
            );

            return (
                <div
                    ref={containerRef}
                    id={props.id}
                    className={className}
                    style={props.style}
                    {...otherProps}
                >
                    <TransitionGroup>
                        {messagesState.map((messageInfo) => {
                            const messageRef = React.createRef();

                            return (
                                <CSSTransition
                                    nodeRef={messageRef}
                                    key={messageInfo._pId}
                                    classNames="cs-toast-message"
                                    unmountOnExit
                                    timeout={{ enter: 300, exit: 300 }}
                                    onEntered={onEntered}
                                    onExited={onExited}
                                    options={props.transitionOptions}
                                >
                                    <ToastMessage
                                        ref={messageRef}
                                        messageInfo={messageInfo}
                                        onClick={props.onClick}
                                        onClose={onClose}
                                        onMouseEnter={props.onMouseEnter}
                                        onMouseLeave={props.onMouseLeave}
                                    />
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </div>
            );
        };

        const element = createElement();

        return <Portal element={element} appendTo={props.appendTo} />;
    })
);

Toast.displayName = 'Toast';
const defaultProps = {
    __TYPE: 'Toast',
    id: null,
    className: null,
    style: null,
    baseZIndex: 0,
    position: 'top-right',
    transitionOptions: null,
    appendTo: 'self',
    onClick: null,
    onRemove: null,
    onShow: null,
    onHide: null,
    onMouseEnter: null,
    onMouseLeave: null,
};
