import * as React from 'react';
import CsReact, { localeOption } from '../../api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import { useOverlayListener, useUnmountEffect } from '../../hooks/Hooks';
import { InputText } from '../inputtext/InputText';
import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import {
    classNames,
    DomHandler,
    ObjectUtils,
    ZIndexUtils,
} from 'src/utils/Utils';

import { CSSTransitionProps } from '../csstransition/CSSTransition';
import './Password.scss';
import TooltipOptions from '../tooltip/TooltipOptions';

type PasswordHeaderType =
    | React.ReactNode
    | ((props: PasswordProps) => React.ReactNode);

type PasswordFooterType =
    | React.ReactNode
    | ((props: PasswordProps) => React.ReactNode);

type PasswordContentType =
    | React.ReactNode
    | ((props: PasswordProps) => React.ReactNode);

interface PasswordIconParams {
    onClick(): void;
    className: string;
    element: JSX.Element;
    props: PasswordProps;
}

type PasswordIconType =
    | React.ReactNode
    | ((e: PasswordIconParams) => React.ReactNode);

type PasswordAppendToType =  'self' | HTMLElement | undefined | null;

export interface PasswordProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'onInput' | 'ref' |'content'
    > {
    id?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    locale?: string;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    mediumRegex?: string;
    strongRegex?: string;
    feedback?: boolean;
    toggleMask?: boolean;
    appendTo?: PasswordAppendToType;
    header?: PasswordHeaderType;
    content?: PasswordContentType;
    footer?: PasswordFooterType;
    icon?: PasswordIconType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    style?: object;
    className?: string;
    inputStyle?: object;
    inputClassName?: string;
    panelStyle?: object;
    panelClassName?: string;
    transitionOptions?: CSSTransitionProps;
    onInput?(
        event: React.FormEvent<HTMLInputElement>,
        validatePattern: boolean
    ): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export const Password = React.memo(
    React.forwardRef((props: PasswordProps | any, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const promptLabel =
            props.promptLabel || localeOption('passwordPrompt', props.locale);
        const weakLabel = props.weakLabel || localeOption('weak', props.locale);
        const mediumLabel =
            props.mediumLabel || localeOption('medium', props.locale);
        const strongLabel =
            props.strongLabel || localeOption('strong', props.locale);

        const [overlayVisibleState, setOverlayVisibleState] =
            React.useState(false);
        const [meterState, setMeterState] = React.useState<any>(null);
        const [infoTextState, setInfoTextState] = React.useState(promptLabel);
        const [focusedState, setFocusedState] = React.useState(false);
        const [unmaskedState, setUnmaskedState] = React.useState(false);
        const elementRef = React.useRef<any>(null);
        const overlayRef = React.useRef<any>(null);
        const inputRef = React.useRef<any>(props.inputRef);
        const mediumCheckRegExp = React.useRef(new RegExp(props.mediumRegex));
        const strongCheckRegExp = React.useRef(new RegExp(props.strongRegex));
        const type = unmaskedState ? 'text' : 'password';

        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener(
            {
                target: elementRef,
                overlay: overlayRef,
                listener: (event, { valid }) => {
                    valid && hide();
                },
                when: overlayVisibleState,
            }
        );

        const isFilled = React.useMemo(
            () =>
                ObjectUtils.isNotEmpty(props.value) ||
                ObjectUtils.isNotEmpty(props.defaultValue) ||
                (inputRef.current &&
                    ObjectUtils.isNotEmpty(inputRef.current.value)),
            [props.value, props.defaultValue, inputRef]
        );

        const updateLabels = () => {
            if (meterState) {
                let label = null;
                switch (meterState.strength) {
                    case 'weak':
                        label = weakLabel;
                        break;

                    case 'medium':
                        label = mediumLabel;
                        break;

                    case 'strong':
                        label = strongLabel;
                        break;

                    default:
                        break;
                }

                if (label && infoTextState !== label) {
                    setInfoTextState(label);
                }
            } else {
                if (infoTextState !== promptLabel) {
                    setInfoTextState(promptLabel);
                }
            }
        };

        const onPanelClick = (event: any) => {
            if (props.feedback) {
                OverlayService.emit('overlay-click', {
                    originalEvent: event,
                    target: elementRef.current,
                });
            }
        };

        const onMaskToggle = () => {
            setUnmaskedState((prevUnmasked) => !prevUnmasked);
        };

        const show = () => {
            updateLabels();
            setOverlayVisibleState(true);
        };

        const hide = () => {
            setOverlayVisibleState(false);
        };

        const alignOverlay = () => {
            if (inputRef.current) {
                DomHandler.alignOverlay(
                    overlayRef.current,
                    inputRef.current.parentElement,
                    props.appendTo || CsReact.appendTo
                );
            }
        };

        const onOverlayEnter = () => {
            ZIndexUtils.set(
                'overlay',
                overlayRef.current,
                CsReact.autoZIndex,
                CsReact.zIndex['overlay']
            );
            alignOverlay();
        };

        const onOverlayEntered = () => {
            bindOverlayListener();

            props.onShow && props.onShow();
        };

        const onOverlayExit = () => {
            unbindOverlayListener();
        };

        const onOverlayExited = () => {
            ZIndexUtils.clear(overlayRef.current);

            props.onHide && props.onHide();
        };

        const onFocus = (event: any) => {
            setFocusedState(true);

            if (props.feedback) {
                show();
            }

            props.onFocus && props.onFocus(event);
        };

        const onBlur = (event: any) => {
            setFocusedState(false);

            if (props.feedback) {
                hide();
            }

            props.onBlur && props.onBlur(event);
        };

        const onKeyup = (e: any) => {
            let keyCode = e.keyCode || e.which;

            if (props.feedback) {
                let value = e.target.value;
                let label = null;
                let meter = null;

                switch (testStrength(value)) {
                    case 1:
                        label = weakLabel;
                        meter = {
                            strength: 'weak',
                            width: '33.33%',
                        };
                        break;

                    case 2:
                        label = mediumLabel;
                        meter = {
                            strength: 'medium',
                            width: '66.66%',
                        };
                        break;

                    case 3:
                        label = strongLabel;
                        meter = {
                            strength: 'strong',
                            width: '100%',
                        };
                        break;

                    default:
                        label = promptLabel;
                        meter = null;
                        break;
                }

                setMeterState(meter);
                setInfoTextState(label);

                if (!!keyCode && !overlayVisibleState) {
                    show();
                }
            }

            props.onKeyUp && props.onKeyUp(e);
        };

        const onInput = (event: any, validatePattern: boolean) => {
            if (props.onInput) {
                props.onInput(event, validatePattern);
            }

            if (!props.onChange) {
                ObjectUtils.isNotEmpty(event.target.value)
                    ? DomHandler.addClass(
                          elementRef.current,
                          'cs-inputwrapper-filled'
                      )
                    : DomHandler.removeClass(
                          elementRef.current,
                          'cs-inputwrapper-filled'
                      );
            }
        };

        const testStrength = (str: any) => {
            if (strongCheckRegExp.current.test(str)) return 3;
            else if (mediumCheckRegExp.current.test(str)) return 2;
            else if (str.length) return 1;

            return 0;
        };

        React.useEffect(() => {
            ObjectUtils.combinedRefs(inputRef, props.inputRef);
        }, [inputRef, props.inputRef]);

        React.useEffect(() => {
            mediumCheckRegExp.current = new RegExp(props.mediumRegex);
        }, [props.mediumRegex]);

        React.useEffect(() => {
            strongCheckRegExp.current = new RegExp(props.strongRegex);
        }, [props.strongRegex]);

        React.useEffect(() => {
            if (
                !isFilled &&
                DomHandler.hasClass(
                    elementRef.current,
                    'cs-inputwrapper-filled'
                )
            ) {
                DomHandler.removeClass(
                    elementRef.current,
                    'cs-inputwrapper-filled'
                );
            }
        }, [isFilled]);

        useUnmountEffect(() => {
            ZIndexUtils.clear(overlayRef.current);
        });

        const createIcon = () => {
            if (props.toggleMask) {
                const iconClassName = unmaskedState
                    ? 'csi csi-eye-slash'
                    : 'csi csi-eye';
                let content = (
                    <i className={iconClassName} onClick={onMaskToggle} />
                );

                if (props.icon) {
                    const defaultIconOptions = {
                        onClick: onMaskToggle,
                        className: iconClassName,
                        element: content,
                        props,
                    };

                    content = ObjectUtils.getJSXElement(
                        props.icon,
                        defaultIconOptions
                    );
                }

                return content;
            }

            return null;
        };

        const createPanel = () => {
            const panelClassName = classNames(
                'cs-password-panel cs-component',
                props.panelClassName
            );
            const { strength, width } = meterState || {
                strength: '',
                width: '0%',
            };
            const header = ObjectUtils.getJSXElement(props.header, props);
            const footer = ObjectUtils.getJSXElement(props.footer, props);
            const content = props.content ? (
                ObjectUtils.getJSXElement(props.content, props)
            ) : (
                <>
                    <div className="cs-password-meter">
                        <div
                            className={`cs-password-strength ${strength}`}
                            style={{ width }}
                        ></div>
                    </div>
                    <div className="cs-password-info">{infoTextState}</div>
                </>
            );

            const panel = (
                <CSSTransition
                    nodeRef={overlayRef}
                    classNames="cs-connected-overlay"
                    in={overlayVisibleState}
                    timeout={{ enter: 120, exit: 100 }}
                    options={props.transitionOptions}
                    unmountOnExit
                    onEnter={onOverlayEnter}
                    onEntered={onOverlayEntered}
                    onExit={onOverlayExit}
                    onExited={onOverlayExited}
                >
                    <div
                        ref={overlayRef}
                        className={panelClassName}
                        style={props.panelStyle}
                        onClick={onPanelClick}
                    >
                        {header}
                        {content}
                        {footer}
                    </div>
                </CSSTransition>
            );

            return <Portal element={panel} appendTo={props.appendTo} />;
        };

        const className = classNames(
            'cs-password cs-component cs-inputwrapper',
            {
                'cs-inputwrapper-filled': isFilled,
                'cs-inputwrapper-focus': focusedState,
                'cs-input-icon-right': props.toggleMask,
            },
            props.className
        );
        const inputClassName = classNames(
            'cs-password-input',
            props.inputClassName
        );
        const inputProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const icon = createIcon();
        const panel = createPanel();

        return (
            <div
                ref={elementRef}
                id={props.id}
                className={className}
                style={props.style}
            >
                <InputText
                    ref={inputRef}
                    id={props.inputId}
                    {...inputProps}
                    type={type}
                    className={inputClassName}
                    style={props.inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyUp={onKeyup}
                    onInput={onInput}
                    tooltip={props.tooltip}
                    //tooltipOptions={props.tooltipOptions}
                />
                {icon}
                {panel}
            </div>
        );
    })
);

Password.displayName = 'Password';
const defaultProps = {
    __TYPE: 'Password',
    id: null,
    inputId: null,
    inputRef: null,
    locale: 'en',
    promptLabel: null,
    weakLabel: null,
    mediumLabel: null,
    strongLabel: null,
    mediumRegex:
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    feedback: true,
    toggleMask: false,
    appendTo: null,
    header: null,
    content: null,
    footer: null,
    icon: null,
    tooltip: null,
    tooltipOptions: null,
    style: null,
    className: null,
    inputStyle: null,
    inputClassName: null,
    panelStyle: null,
    panelClassName: null,
    transitionOptions: null,
    onInput: null,
    onShow: null,
    onHide: null,
};
