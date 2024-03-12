import * as React from 'react';
import PrimeReact from '../../api/Api';
import {
    CSSTransition,
    CSSTransitionProps,
} from '../csstransition/CSSTransition';

import {
    useOverlayListener,
    useUnmountEffect,
    useUpdateEffect,
} from '../../hooks/Hooks';

import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import {
    classNames,
    DomHandler,
    ObjectUtils,
    ZIndexUtils,
} from 'src/utils/Utils';
import { SlideMenuSub } from './SlideMenuSub';
import { MenuItem } from '../menuitem/MenuItem';

type SlideMenuAppendToType = 'self' | HTMLElement | undefined | null;

import './SlideMenu.scss';

export interface SlideMenuProps {
    /*Unique identifier of the element.*/
    id?: string;
    /*An array of menuitems.*/
    model?: MenuItem[];
    /*Defines if menu would displayed as a popup.*/
    popup?: boolean;
    /*Inline style of the component.*/
    style?: object;
    /*Style class of the component.*/
    className?: string;
    easing?: string;
    effectDuration?: number;
    backLabel?: string;
    menuWidth?: number;
    viewportHeight?: number;
    /*Whether to automatically manage layering.*/
    autoZIndex?: boolean;
    /*Base zIndex value to use in layering.*/
    baseZIndex?: number;
    /**
     * DOM element instance where the overlay panel should be mounted.
     * Valid values are any DOM Element and 'self'.
     * The self value is used to render a component where it is located.
     */
    appendTo?: SlideMenuAppendToType;
    /* The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.*/
    transitionOptions?: CSSTransitionProps;
    /*Callback to invoke when a popup menu is shown.*/
    onShow?(e: React.SyntheticEvent): void;
    /*Callback to invoke when a popup menu is hidden.*/
    onHide?(e: React.SyntheticEvent): void;
    /*Displays the popup menu.*/
    show?(event: React.SyntheticEvent): void;
    /*Displays the popup menu.*/
    hide?(event: React.SyntheticEvent): void;
    /*Toggles the visibility of the popup menu. */
    toggle?(event: React.SyntheticEvent): void;

    children?: React.ReactNode;
}

export const SlideMenu = React.memo(
    React.forwardRef((props: SlideMenuProps | any, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [levelState, setLevelState] = React.useState(0);
        const [visibleState, setVisibleState] = React.useState(false);
        const menuRef = React.useRef(null);
        const targetRef = React.useRef(null);
        const backward = React.useRef(null);
        const slideMenuContent = React.useRef(null);

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

        const navigateForward = () => {
            setLevelState((prevLevel) => prevLevel + 1);
        };

        const navigateBack = () => {
            setLevelState((prevLevel) => prevLevel - 1);
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
            targetRef.current = event.currentTarget;
            setVisibleState(false);
            props.onHide && props.onHide(event);
        };

        const onEnter = () => {
            if (props.autoZIndex) {
                ZIndexUtils.set(
                    'menu',
                    menuRef.current,
                    PrimeReact.autoZIndex,
                    props.baseZIndex || PrimeReact.zIndex['menu']
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
            setLevelState(0);
        };

        useUpdateEffect(() => {
            setLevelState(0);
        }, [props.model]);

        useUnmountEffect(() => {
            ZIndexUtils.clear(menuRef.current);
        });

        React.useImperativeHandle(ref, () => ({
            toggle,
            show,
            hide,
        }));

        const createBackward = () => {
            const className = classNames('cs-slidemenu-backward', {
                'cs-hidden': levelState === 0,
            });

            return (
                <div
                    ref={backward}
                    className={className}
                    onClick={navigateBack}
                >
                    <span className="cs-slidemenu-backward-icon csi csi-fw csi-chevron-left"></span>
                    <span>{props.backLabel}</span>
                </div>
            );
        };

        const createElement = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-slidemenu cs-component',
                {
                    'cs-slidemenu-overlay': props.popup,
                },
                props.className
            );
            const wrapperStyle = { height: props.viewportHeight + 'px' };
            const backward = createBackward();

            return (
                <CSSTransition
                    nodeRef={menuRef}
                    classNames="cs-connected-overlay"
                    in={!props.popup || visibleState}
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
                        <div
                            className="cs-slidemenu-wrapper"
                            style={wrapperStyle}
                        >
                            <div
                                className="cs-slidemenu-content"
                                ref={slideMenuContent}
                            >
                                <SlideMenuSub
                                    menuProps={props}
                                    model={props.model}
                                    root
                                    index={0}
                                    menuWidth={props.menuWidth}
                                    effectDuration={props.effectDuration}
                                    level={levelState}
                                    parentActive={levelState === 0}
                                    onForward={navigateForward}
                                />
                            </div>
                            {backward}
                        </div>
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

SlideMenu.displayName = 'SlideMenu';
let defaultProps = {
    __TYPE: 'SlideMenu',
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    easing: 'ease-out',
    effectDuration: 250,
    backLabel: 'Back',
    menuWidth: 190,
    viewportHeight: 175,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
};
