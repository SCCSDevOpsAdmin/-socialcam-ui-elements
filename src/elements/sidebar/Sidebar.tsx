import * as React from 'react';
import PrimeReact, { localeOption } from '../../api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import {
    useEventListener,
    useMountEffect,
    useUnmountEffect,
    useUpdateEffect,
} from '../../hooks/Hooks';
import { Portal } from '../portal/Portal';
import { Ripple } from '../ripple/Ripple';
import {
    classNames,
    DomHandler,
    ObjectUtils,
    ZIndexUtils,
} from 'src/utils/Utils';
import { SidebarProps } from './types';
import './Sidebar.scss';

export const Sidebar = React.forwardRef((props: SidebarProps, ref?) => {
    props = ObjectUtils.initProps(props, defaultProps);
    const [maskVisibleState, setMaskVisibleState] = React.useState(false);
    const [visibleState, setVisibleState] = React.useState(false);
    const sidebarRef = React.useRef(null);
    const maskRef = React.useRef(null);
    const closeIconRef = React.useRef(null);

    const [bindDocumentEscapeListener, unbindDocumentEscapeListener] =
        useEventListener({
            type: 'keydown',
            listener: (event) => {
                if (event.which === 27) {
                    if (
                        ZIndexUtils.get(maskRef.current) ===
                        ZIndexUtils.getCurrent('modal', PrimeReact.autoZIndex)
                    ) {
                        onClose(event);
                    }
                }
            },
        });

    const [bindDocumentClickListener, unbindDocumentClickListener] =
        useEventListener({
            type: 'click',
            listener: (event) => {
                if (event.which === 2) {
                    // left click
                    return;
                }

                if (isOutsideClicked(event)) {
                    onClose(event);
                }
            },
        });

    const isOutsideClicked = (event) => {
        return (
            sidebarRef &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target)
        );
    };

    const getPositionClass = () => {
        const positions = ['left', 'right', 'top', 'bottom'];
        const pos = positions.find((item) => item === props.position);

        return pos ? `cs-sidebar-${pos}` : '';
    };

    const focus = () => {
        const activeElement = document.activeElement;
        const isActiveElementInDialog =
            activeElement &&
            sidebarRef &&
            sidebarRef.current.contains(activeElement);

        if (!isActiveElementInDialog && props.showCloseIcon) {
            closeIconRef.current.focus();
        }
    };

    const onMaskClick = (event) => {
        if (
            props.dismissable &&
            props.modal &&
            maskRef.current === event.target
        ) {
            onClose(event);
        }
    };

    const onClose = (event) => {
        props.onHide();
        event.preventDefault();
    };

    const onEntered = () => {
        props.onShow && props.onShow();
        focus();
        enableDocumentSettings();
    };

    const onExiting = () => {
        if (props.modal) {
            DomHandler.addClass(maskRef.current, 'cs-component-overlay-leave');
        }
    };

    const onExited = () => {
        ZIndexUtils.clear(maskRef.current);
        setMaskVisibleState(false);
        disableDocumentSettings();
    };

    const enableDocumentSettings = () => {
        if (props.closeOnEscape) {
            bindDocumentEscapeListener();
        }

        if (props.dismissable && !props.modal) {
            bindDocumentClickListener();
        }

        if (props.blockScroll) {
            DomHandler.addClass(document.body, 'cs-overflow-hidden');
        }
    };

    const disableDocumentSettings = () => {
        unbindDocumentEscapeListener();
        unbindDocumentClickListener();

        if (props.blockScroll) {
            DomHandler.removeClass(document.body, 'cs-overflow-hidden');
        }
    };

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => sidebarRef.current,
        gteMask: () => maskRef.current,
        getCloseIcon: () => closeIconRef.current,
    }));

    useMountEffect(() => {
        if (props.visible) {
            setMaskVisibleState(true);
        }
    });

    useUpdateEffect(() => {
        if (props.visible && !maskVisibleState) {
            setMaskVisibleState(true);
        }

        if (props.visible !== visibleState && maskVisibleState) {
            setVisibleState(props.visible);
        }
    });

    useUpdateEffect(() => {
        if (maskVisibleState) {
            ZIndexUtils.set(
                'modal',
                maskRef.current,
                PrimeReact.autoZIndex,
                props.baseZIndex || PrimeReact.zIndex['modal']
            );
            setVisibleState(true);
        }
    }, [maskVisibleState]);

    useUnmountEffect(() => {
        disableDocumentSettings();
        maskRef.current && ZIndexUtils.clear(maskRef.current);
    });

    const createCloseIcon = () => {
        if (props.showCloseIcon) {
            const ariaLabel = props.ariaCloseLabel || localeOption('close');

            return (
                <button
                    type="button"
                    ref={closeIconRef}
                    className="cs-sidebar-close cs-sidebar-icon cs-sidebar-close-icon cs-link"
                    onClick={onClose}
                    aria-label={ariaLabel}
                >
                    <span
                        className="cs-sidebar-close-icon csi csi-times"
                        aria-hidden="true"
                    />
                    <Ripple />
                </button>
            );
        }

        return null;
    };

    const createSecondaryButtonIcon = () => {
        if (props.secondaryButton) {
            return (
                <button
                    ref={closeIconRef}
                    type="button"
                    className="cs-sidebar-icon cs-sidebar-secondary-icon cs-sidebar-close cs-link"
                    onClick={props.onSecondaryButtonClick}
                >
                    <span className={props.secondaryButton}></span>
                    {/*<Ripple />*/}
                </button>
            );
        }

        return null;
    };

    const createIcons = () => {
        return props.icons
            ? ObjectUtils.getJSXElement(props.icons, props)
            : null;
    };

    const createElement = () => {
        const otherProps = ObjectUtils.findDiffKeys(
            props,
            Sidebar.defaultProps
        );
        const className = classNames(
            'cs-sidebar cs-component',
            props.className
        );
        const maskClassName = classNames(
            'cs-sidebar-mask',
            {
                'cs-component-overlay cs-component-overlay-enter': props.modal,
                'cs-sidebar-mask-scrollblocker': props.blockScroll,
                'cs-sidebar-visible': maskVisibleState,
                'cs-sidebar-full': props.fullScreen,
            },
            getPositionClass(),
            props.maskClassName
        );

        const closeIcon = createCloseIcon();
        const icons = createIcons();
        const secondaryButton = createSecondaryButtonIcon();

        const transitionTimeout = {
            enter: props.fullScreen ? 150 : 300,
            exit: props.fullScreen ? 150 : 300,
        };
        const headerContent = () => {
            return (
                <>
                    <div className='cs-sidebar-icons'>
                        {props.secondaryButton && 
                            secondaryButton
                        }
                    </div>

                    <div className='cs-sidebar-title'>
                        {(props.headerTitle && props.headerTitle.length > 0) &&
                            props.headerTitle
                        }
                    </div>
                    <div className='cs-sidebar-icons'>
                        {icons}
                        {closeIcon}
                    </div>
                </>
            );
        };
        return (
            <div
                ref={maskRef}
                style={props.maskStyle}
                className={maskClassName}
                onMouseDown={onMaskClick}
            >
                <CSSTransition
                    nodeRef={sidebarRef}
                    classNames="cs-sidebar"
                    in={visibleState}
                    timeout={transitionTimeout}
                    options={props.transitionOptions}
                    unmountOnExit
                    onEntered={onEntered}
                    onExiting={onExiting}
                    onExited={onExited}
                >
                    <div
                        ref={sidebarRef}
                        id={props.id}
                        className={className}
                        style={props.style}
                        {...otherProps}
                        role="complementary"
                    >
                        <div className="cs-sidebar-header">
                            {headerContent()}
                        </div>
                        <div className="cs-sidebar-content">
                            {props.children}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    };

    const createSidebar = () => {
        const element = createElement();

        return <Portal element={element} appendTo={props.appendTo} visible />;
    };

    return maskVisibleState && createSidebar();
});

Sidebar.displayName = 'Sidebar';
const defaultProps = {
    __TYPE: 'Sidebar',
    id: null,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
    visible: false,
    position: 'left',
    fullScreen: false,
    blockScroll: false,
    baseZIndex: 0,
    dismissable: true,
    showCloseIcon: true,
    ariaCloseLabel: null,
    closeOnEscape: true,
    icons: null,
    headerTitle: null,
    headerClass: null,
    modal: true,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null,
    secondaryButton: null,
    onSecondaryButtonClick: null,
};
