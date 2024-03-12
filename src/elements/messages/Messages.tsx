import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import {
    CSSTransition,
    CSSTransitionProps,
} from '../csstransition/CSSTransition';
import { ObjectUtils } from 'src/utils/Utils';
import { UIMessage } from './UIMessage';
import './Messages.scss';

let messageIdx = 0;

type MessagesSeverityType =
    | 'success'
    | 'info'
    | 'warn'
    | 'error'
    | (string & {});

type MessagesMessageType = MessagesMessage | MessagesMessage[];

export interface MessagesMessage {
    id?: string;
    severity?: MessagesSeverityType;
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
}

export interface MessagesProps {
    id?: string;
    className?: string;
    style?: object;
    transitionOptions?: CSSTransitionProps;
    onRemove?(message: MessagesMessage): void;
    onClick?(message: MessagesMessage): void;
    children?: React.ReactNode;
}

export const Messages = React.memo(
    React.forwardRef((props: MessagesProps | any, ref) => {
        const [messagesState, setMessagesState] = React.useState<any[]>([]);

        const show = (value: any) => {
            if (value) {
                let messages: any[] = [];

                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        value[i].id = messageIdx++;
                        messages = [...messagesState, ...value];
                    }
                } else {
                    value.id = messageIdx++;
                    messages = messagesState
                        ? [...messagesState, value]
                        : [value];
                }

                setMessagesState(messages);
            }
        };

        const clear = () => {
            setMessagesState([]);
        };

        const replace = (value: any) => {
            setMessagesState(value);
        };

        const onClose = (message: any) => {
            setMessagesState(
                messagesState.filter((msg) => msg.id !== message.id)
            );
            props.onRemove && props.onRemove(message);
        };

        React.useImperativeHandle(ref, () => ({
            show,
            replace,
            clear,
        }));

        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);

        return (
            <div
                id={props.id}
                className={props.className}
                style={props.style}
                {...otherProps}
            >
                <TransitionGroup>
                    {messagesState.map((message) => {
                        const messageRef = React.createRef();

                        return (
                            <CSSTransition
                                nodeRef={messageRef}
                                key={message.id}
                                classNames="p-message"
                                unmountOnExit
                                timeout={{ enter: 300, exit: 300 }}
                                options={props.transitionOptions}
                            >
                                <UIMessage
                                    ref={messageRef}
                                    message={message}
                                    onClick={props.onClick}
                                    onClose={onClose}
                                />
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
        );
    })
);

Messages.displayName = 'Messages';
const defaultProps = {
    __TYPE: 'Messages',
    id: null,
    className: null,
    style: null,
    transitionOptions: null,
    onRemove: null,
    onClick: null,
};
