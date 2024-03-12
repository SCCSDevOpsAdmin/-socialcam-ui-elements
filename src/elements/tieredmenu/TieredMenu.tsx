import * as React from 'react';
import CsReact from '../../api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import { useOverlayListener, useUnmountEffect } from '../../hooks/Hooks';
import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import {
    classNames,
    DomHandler,
    ObjectUtils,
    ZIndexUtils,
} from 'src/utils/Utils';
import { TieredMenuProps } from './types';
import { TieredMenuSub } from './TieredMenuSub';
import './TieredMenu.scss';

export const TieredMenu = React.memo(
    React.forwardRef((props: TieredMenuProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [visibleState, setVisibleState] = React.useState(!props.popup);
        const menuRef = React.useRef(null);
        const targetRef = React.useRef(null);

        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener(
            {
                target: targetRef,
                overlay: menuRef,
                listener: (event, { valid }) => {
                    valid && hide(event);
                },
                when: visibleState,
            }
        );

        const onPanelClick = (event) => {
            if (props.popup) {
                OverlayService.emit('overlay-click', {
                    originalEvent: event,
                    target: targetRef.current,
                });
            }
        };

        const toggle = (event) => {
            if (props.popup) {
                visibleState ? hide(event) : show(event);
            }
        };

        const show = (event) => {
            targetRef.current = event.currentTarget;
            setVisibleState(true);
            props.onShow && props.onShow(event);
        };

        const hide = (event) => {
            if (props.popup) {
                targetRef.current = event.currentTarget;
                setVisibleState(false);
                props.onHide && props.onHide(event);
            }
        };

        const onEnter = () => {
            if (props.autoZIndex) {
                ZIndexUtils.set(
                    'menu',
                    menuRef.current,
                    CsReact.autoZIndex,
                    props.baseZIndex || CsReact.zIndex['menu']
                );
            }

            DomHandler.absolutePosition(menuRef.current, targetRef.current);
        };

        const onEntered = () => {
            bindOverlayListener();
        };

        const onExit = () => {
            targetRef.current = null;
            unbindOverlayListener();
        };

        const onExited = () => {
            ZIndexUtils.clear(menuRef.current);
        };

        useUnmountEffect(() => {
            ZIndexUtils.clear(menuRef.current);
        });

        React.useImperativeHandle(ref, () => ({
            props,
            toggle,
            show,
            hide,
            getElement: () => menuRef.current,
        }));

        const createElement = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-tieredmenu cs-component',
                {
                    'cs-tieredmenu-overlay': props.popup,
                    'cs-input-filled': CsReact.inputStyle === 'filled',
                    'cs-ripple-disabled': CsReact.ripple === false,
                },
                props.className
            );

            return (
                <CSSTransition
                    nodeRef={menuRef}
                    classNames="cs-connected-overlay"
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
                        ref={menuRef}
                        id={props.id}
                        className={className}
                        style={props.style}
                        {...otherProps}
                        onClick={onPanelClick}
                    >
                        <TieredMenuSub
                            menuProps={props}
                            model={props.model}
                            root
                            popup={props.popup}
                            onHide={hide}
                        />
                    </div>
                </CSSTransition>
            );
        };

        const element = createElement();

        return props.popup ? (
            <Portal element={element} appendTo={props.appendTo} />
        ) : (
            element
        );
    })
);

TieredMenu.displayName = 'TieredMenu';
const defaultProps = {
    __TYPE: 'TieredMenu',
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
};
