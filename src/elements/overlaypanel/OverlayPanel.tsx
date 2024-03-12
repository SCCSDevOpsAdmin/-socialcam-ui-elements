import * as React from 'react';
import PrimeReact, { localeOption } from 'src/api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import {
    useMountEffect,
    useOnEscapeKey,
    useOverlayListener,
    useUnmountEffect,
} from '../../hooks/Hooks';
import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import { Ripple } from '../ripple/Ripple';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { DomHandler, UniqueComponentId, ZIndexUtils } from 'src/utils/Utils';
import { OverlayPanelProps } from './types';
import './OverlayPanel.scss';

export const OverlayPanel = React.memo(
    React.forwardRef((props: OverlayPanelProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [visibleState, setVisibleState] = React.useState(false);

        const attributeSelector = React.useRef('');
        const overlayRef = React.useRef(null);
        const currentTargetRef = React.useRef(null);
        const isPanelClicked = React.useRef(false);
        const styleElement = React.useRef(null);
        const overlayEventListener = React.useRef(null);

        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener(
            {
                target: currentTargetRef,
                overlay: overlayRef,
                listener: (event, { type, valid }) => {
                    if (valid) {
                        type === 'outside'
                            ? props.dismissable &&
                              !isPanelClicked.current &&
                              hide()
                            : hide();
                    }

                    isPanelClicked.current = false;
                },
                when: visibleState,
            }
        );

        useOnEscapeKey(
            overlayEventListener,
            props.dismissable && props.closeOnEscape,
            () => {
                hide();
            }
        );

        const isOutsideClicked = (target) => {
            return (
                overlayRef &&
                overlayRef.current &&
                !(
                    overlayRef.current.isSameNode(target) ||
                    overlayRef.current.contains(target)
                )
            );
        };

        const hasTargetChanged = (event, target) => {
            return (
                currentTargetRef.current != null &&
                currentTargetRef.current !==
                    (target || event.currentTarget || event.target)
            );
        };

        const onCloseClick = (event) => {
            hide();
            event.preventDefault();
        };

        const onPanelClick = (event) => {
            isPanelClicked.current = true;
            OverlayService.emit('overlay-click', {
                originalEvent: event,
                target: currentTargetRef.current,
            });
        };

        const onContentClick = () => {
            isPanelClicked.current = true;
        };

        const toggle = (event, target) => {
            if (visibleState) {
                hide();

                if (hasTargetChanged(event, target)) {
                    currentTargetRef.current =
                        target || event.currentTarget || event.target;

                    setTimeout(() => {
                        show(event, currentTargetRef.current);
                    }, 200);
                }
            } else {
                show(event, target);
            }
        };

        const show = (event, target) => {
            currentTargetRef.current =
                target || event.currentTarget || event.target;

            if (visibleState) {
                align();
            } else {
                setVisibleState(true);

                overlayEventListener.current = (e) => {
                    !isOutsideClicked(e.target) &&
                        (isPanelClicked.current = true);
                };

                OverlayService.on(
                    'overlay-click',
                    overlayEventListener.current
                );
            }
        };

        const hide = () => {
            setVisibleState(false);

            OverlayService.off('overlay-click', overlayEventListener.current);
            overlayEventListener.current = null;
        };

        const onEnter = () => {
            overlayRef.current.setAttribute(attributeSelector.current, '');
            ZIndexUtils.set(
                'overlay',
                overlayRef.current,
                PrimeReact.autoZIndex,
                PrimeReact.zIndex['overlay']
            );
            DomHandler.addStyles(overlayRef.current, {
                position: 'absolute',
                top: '0',
                left: '0',
            });
            align();
        };

        const onEntered = () => {
            bindOverlayListener();

            props.onShow && props.onShow();
        };

        const onExit = () => {
            unbindOverlayListener();
        };

        const onExited = () => {
            ZIndexUtils.clear(overlayRef.current);
            props.onHide && props.onHide();
        };

        const align = () => {
            if (currentTargetRef.current && overlayRef.current) {
                DomHandler.absolutePosition(
                    overlayRef.current,
                    currentTargetRef.current
                );

                const containerOffset = DomHandler.getOffset(
                    overlayRef.current
                );
                const targetOffset = DomHandler.getOffset(
                    currentTargetRef.current
                );
                let arrowLeft = 0;

                if (
                    containerOffset.left < targetOffset.left &&
                    typeof targetOffset.left === 'number' &&
                    typeof containerOffset.left === 'number'
                ) {
                    arrowLeft = targetOffset.left - containerOffset.left;
                }

                overlayRef.current.style.setProperty(
                    '--overlayArrowLeft',
                    `${arrowLeft}px`
                );

                if (containerOffset.top < targetOffset.top) {
                    overlayRef.current.setAttribute(
                        'data-cs-overlaypanel-flipped',
                        'true'
                    );
                    DomHandler.addClass(
                        overlayRef.current,
                        'cs-overlaypanel-flipped'
                    );
                }
            }
        };

        const createStyle = () => {
            if (!styleElement.current) {
                styleElement.current = DomHandler.createInlineStyle(
                    PrimeReact.nonce
                );

                let innerHTML = '';

                for (let breakpoint in props.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .cs-overlaypanel[${attributeSelector.current}] {
                                width: ${props.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }

                styleElement.current.innerHTML = innerHTML;
            }
        };

        useMountEffect(() => {
            attributeSelector.current = UniqueComponentId();
            if (props.breakpoints) {
                createStyle();
            }
        });

        useUnmountEffect(() => {
            styleElement.current = DomHandler.removeInlineStyle(
                styleElement.current
            );

            if (overlayEventListener.current) {
                OverlayService.off(
                    'overlay-click',
                    overlayEventListener.current
                );
                overlayEventListener.current = null;
            }

            ZIndexUtils.clear(overlayRef.current);
        });

        React.useImperativeHandle(ref, () => ({
            props,
            toggle,
            show,
            hide,
            getElement: () => overlayRef.current,
        }));

        const createCloseIcon = () => {
            if (props.showCloseIcon) {
                return (
                    <button
                        className="cs-overlaypanel-close cs-link"
                        onClick={(e) => onCloseClick(e)}
                        aria-label={
                            props.ariaCloseLabel || localeOption('close')
                        }
                    >
                        <span className="cs-dialog-header-close-icon csi csi-times"></span>
                        <Ripple />
                    </button>
                );
            }

            return null;
        };

        const createElement = () => {
            const closeIcon = createCloseIcon();

            return (
                <CSSTransition
                    nodeRef={overlayRef}
                    classNames="cs-overlaypanel"
                    in={visibleState}
                    timeout={{ enter: 120, exit: 100 }}
                    options={props.transitionOptions}
                    unmountOnExit
                    onEnter={onEnter}
                    onEntered={onEntered}
                    onExit={onExit}
                    onExited={onExited}
                >
                    <div
                        ref={overlayRef}
                        id={props.id}
                        className={classNames(
                            'cs-overlaypanel cs-component',
                            props.className,
                            {
                                'cs-input-filled':
                                    PrimeReact.inputStyle === 'filled',
                                'cs-ripple-disabled':
                                    PrimeReact.ripple === false,
                            }
                        )}
                        style={props.style}
                        onClick={(e) => onPanelClick(e)}
                    >
                        <div
                            className="cs-overlaypanel-content"
                            onClick={() => onContentClick}
                            onMouseDown={onContentClick}
                        >
                            {props.children}
                        </div>
                        {closeIcon}
                    </div>
                </CSSTransition>
            );
        };

        const element = createElement();

        return <Portal element={element} appendTo={props.appendTo} />;
    })
);

OverlayPanel.displayName = 'OverlayPanel';
const defaultProps = {
    __TYPE: 'OverlayPanel',
    id: null,
    dismissable: true,
    showCloseIcon: false,
    style: null,
    className: null,
    appendTo: null,
    breakpoints: null,
    ariaCloseLabel: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    children: undefined,
    closeOnEscape: true,
};
