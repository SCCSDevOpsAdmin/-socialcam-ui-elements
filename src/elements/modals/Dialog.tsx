import {
    classNames,
    DomHandler,
    ObjectUtils,
    UniqueComponentId,
    ZIndexUtils,
} from 'src/utils/Utils';
import * as React from 'react';
import { IconType } from '../../utils/types';
import {
    useEventListener,
    useMountEffect,
    useUnmountEffect,
    useUpdateEffect,
} from '../../hooks/Hooks';
import { Portal } from './Portal';
import './Dialog.scss';
import {
    CSSTransition,
    CSSTransitionProps,
} from '../csstransition/CSSTransition';
import CsReact from '../../api/CsReact';

export type DialogPositionType =
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

type DialogTemplateType =
    | React.ReactNode
    | ((props: DialogProps) => React.ReactNode);

export type DialogAppendToType = 'self' | HTMLElement | undefined | null;

interface DialogMaximizeParams {
    originalEvent: Event;
    maximized: boolean;
}

interface DialogBreakpoints {
    [key: string]: string;
}

export interface DialogProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'onClick' | 'ref' | 'onResize'
    > {
    id?: string;
    header?: DialogTemplateType;
    footer?: DialogTemplateType;
    visible?: boolean;
    position?: DialogPositionType | string;
    draggable?: boolean;
    resizable?: boolean;
    modal?: boolean;
    contentStyle?: object;
    contentClassName?: string;
    closeOnEscape?: boolean;
    dismissableMask?: boolean;
    rtl?: boolean;
    closable?: boolean;
    style?: object;
    className?: string;
    maskStyle?: object;
    maskClassName?: string;
    showHeader?: boolean;
    appendTo?: DialogAppendToType;
    baseZIndex?: number;
    maximizable?: boolean;
    blockScroll?: boolean;
    icons?: DialogTemplateType;
    ariaCloseIconLabel?: string;
    focusOnShow?: boolean;
    minX?: number;
    minY?: number;
    keepInViewport?: boolean;
    maximized?: boolean;
    breakpoints?: DialogBreakpoints;
    transitionOptions?: CSSTransitionProps;
    onMaximize?(e: DialogMaximizeParams): void;
    onDragStart?(e: React.DragEvent<HTMLElement>): void;
    onDrag?(e: React.DragEvent<HTMLElement>): void;
    onDragEnd?(e: React.DragEvent<HTMLElement>): void;
    onResizeStart?(e: React.MouseEvent<HTMLElement>): void;
    onResize?(e: React.MouseEvent<HTMLElement>): void;
    onResizeEnd?(e: React.MouseEvent<HTMLElement>): void;
    onHide(): void;
    onShow?(): void;
    onMaskClick?(e: React.MouseEvent<HTMLElement>): void;
    onClick?(e: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
    secondaryButton?: boolean;
    secondaryButtonClass?: string;
    onSecondaryButtonClick?(e: React.MouseEvent<HTMLElement>): void;
}

export const Dialog = React.memo(
    React.forwardRef((props: DialogProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [idState, setIdState] = React.useState(props.id);
        const [maskVisibleState, setMaskVisibleState] = React.useState(false);
        const [visibleState, setVisibleState] = React.useState(false);
        const [maximizedState, setMaximizedState] = React.useState(
            props.maximized
        );
        const dialogRef = React.useRef<any>(null);
        const maskRef = React.useRef<any>(null);
        const contentRef = React.useRef<any>(null);
        const headerRef = React.useRef<any>(null);
        const footerRef = React.useRef<any>(null);
        const closeRef = React.useRef<any>(null);
        const dragging = React.useRef<any>(false);
        const resizing = React.useRef<any>(false);
        const lastPageX = React.useRef<any>(0);
        const lastPageY = React.useRef<any>(0);
        const styleElement = React.useRef<any>(null);
        const attributeSelector = React.useRef<any>('');
        const maximized = props.onMaximize ? props.maximized : maximizedState;

        const [bindDocumentKeyDownListener, unbindDocumentKeyDownListener] =
            useEventListener({
                type: 'keydown',
                listener: (event: React.MouseEvent<HTMLElement>) =>
                    onKeyDown(event),
            });
        const [bindDocumentResizeListener, unbindDocumentResizeListener] =
            useEventListener({
                type: 'mousemove',
                target: () => window.document,
                listener: (event: React.MouseEvent<HTMLElement>) =>
                    onResize(event),
            });
        const [bindDocumentResizeEndListener, unbindDocumentResizEndListener] =
            useEventListener({
                type: 'mouseup',
                target: () => window.document,
                listener: (event: React.MouseEvent<HTMLElement>) =>
                    onResizeEnd(event),
            });
        const [bindDocumentDragListener, unbindDocumentDragListener] =
            useEventListener({
                type: 'mousemove',
                target: () => window.document,
                listener: (event: React.DragEvent<HTMLElement>) =>
                    onDrag(event),
            });
        const [bindDocumentDragEndListener, unbindDocumentDragEndListener] =
            useEventListener({
                type: 'mouseup',
                target: () => window.document,
                listener: (event: React.DragEvent<HTMLElement>) =>
                    onDragEnd(event),
            });

        const onClose = (event: React.MouseEvent<HTMLElement>) => {
            props.onHide();
            event.preventDefault();
        };

        const focus = () => {
            let activeElement = document.activeElement;
            let isActiveElementInDialog =
                activeElement &&
                dialogRef.current &&
                dialogRef.current.contains(activeElement);
            if (
                !isActiveElementInDialog &&
                props.closable &&
                props.showHeader
            ) {
                closeRef.current!.focus();
            }
        };

        const onMaskClick = (event: React.MouseEvent<HTMLElement>) => {
            if (
                props.dismissableMask &&
                props.modal &&
                maskRef.current === event.target
            ) {
                onClose(event);
            }

            props.onMaskClick && props.onMaskClick(event);
        };

        const toggleMaximize = (event: any) => {
            if (props.onMaximize) {
                props.onMaximize({
                    originalEvent: event,
                    maximized: !maximized,
                });
            } else {
                setMaximizedState((prevMaximized) => !prevMaximized);
            }

            event.preventDefault();
        };

        const onKeyDown = (event: any) => {
            let currentTarget = event.currentTarget;

            if (currentTarget && currentTarget.primeDialogParams) {
                let params = currentTarget.primeDialogParams;
                let paramLength = params.length;
                let dialogId = params[paramLength - 1]
                    ? params[paramLength - 1].id
                    : undefined;

                if (dialogId === idState && props.closeOnEscape) {
                    let dialog = document.getElementById(dialogId);

                    if (event.which === 27) {
                        onClose(event);
                        event.stopPropagation();

                        params.splice(paramLength - 1, 1);
                    } else if (event.which === 9) {
                        event.preventDefault();
                        let focusableElements =
                            DomHandler.getFocusableElements(dialog);
                        if (focusableElements && focusableElements.length > 0) {
                            if (!document.activeElement) {
                                focusableElements[0].focus();
                            } else {
                                let focusedIndex = focusableElements.indexOf(
                                    document.activeElement
                                );
                                if (event.shiftKey) {
                                    if (
                                        focusedIndex === -1 ||
                                        focusedIndex === 0
                                    )
                                        focusableElements[
                                            focusableElements.length - 1
                                        ].focus();
                                    else
                                        focusableElements[
                                            focusedIndex - 1
                                        ].focus();
                                } else {
                                    if (
                                        focusedIndex === -1 ||
                                        focusedIndex ===
                                            focusableElements.length - 1
                                    )
                                        focusableElements[0].focus();
                                    else
                                        focusableElements[
                                            focusedIndex + 1
                                        ].focus();
                                }
                            }
                        }
                    }
                }
            }
        };

        const onDragStart = (event: React.DragEvent<HTMLDivElement> | any) => {
            if (
                DomHandler.hasClass(event.target, 'cs-dialog-header-icon') ||
                DomHandler.hasClass(
                    event.target.parentElement,
                    'cs-dialog-header-icon'
                )
            ) {
                return;
            }

            if (props.draggable) {
                dragging.current = true;
                lastPageX.current = event.pageX;
                lastPageY.current = event.pageY;
                dialogRef.current!.style.margin = '0';
                DomHandler.addClass(document.body, 'cs-unselectable-text');

                props.onDragStart && props.onDragStart(event);
            }
        };

        const onDrag = (event: React.DragEvent<HTMLElement>) => {
            if (dragging.current) {
                const width = DomHandler.getOuterWidth(
                    dialogRef.current!,
                    false
                );
                const height = DomHandler.getOuterHeight(
                    dialogRef.current!,
                    false
                );
                const deltaX = event.pageX - lastPageX.current;
                const deltaY = event.pageY - lastPageY.current;
                const offset = dialogRef.current!.getBoundingClientRect();
                const leftPos = offset.left + deltaX;
                const topPos = offset.top + deltaY;
                const viewport = DomHandler.getViewport();

                dialogRef.current!.style.position = 'fixed';

                if (!props.minX) {
                    props.minX = 0;
                }
                if (!props.minY) {
                    props.minY = 0;
                }

                if (props.keepInViewport) {
                    if (
                        leftPos >= props.minX &&
                        leftPos + width < viewport.width
                    ) {
                        lastPageX.current = event.pageX;
                        dialogRef.current!.style.left = leftPos + 'px';
                    }

                    if (
                        topPos >= props.minY &&
                        topPos + height < viewport.height
                    ) {
                        lastPageY.current = event.pageY;
                        dialogRef.current!.style.top = topPos + 'px';
                    }
                } else {
                    lastPageX.current = event.pageX;
                    dialogRef.current!.style.left = leftPos + 'px';
                    lastPageY.current = event.pageY;
                    dialogRef.current!.style.top = topPos + 'px';
                }

                props.onDrag && props.onDrag(event);
            }
        };

        const onDragEnd = (event: React.DragEvent<HTMLElement>) => {
            if (dragging.current) {
                dragging.current = false;
                DomHandler.removeClass(document.body, 'cs-unselectable-text');

                props.onDragEnd && props.onDragEnd(event);
            }
        };

        const onResizeStart = (event: React.MouseEvent<HTMLElement>) => {
            if (props.resizable) {
                resizing.current = true;
                lastPageX.current = event.pageX;
                lastPageY.current = event.pageY;
                DomHandler.addClass(document.body, 'cs-unselectable-text');

                props.onResizeStart && props.onResizeStart(event);
            }
        };

        const convertToPx = (value: any, property: any, viewport: any) => {
            !viewport && (viewport = DomHandler.getViewport());

            const val = parseInt(value);
            if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
                return val * (viewport[property] / 100);
            }

            return val;
        };

        const onResize = (event: React.MouseEvent<HTMLElement>) => {
            if (resizing.current) {
                const deltaX = event.pageX - lastPageX.current;
                const deltaY = event.pageY - lastPageY.current;
                const width = DomHandler.getOuterWidth(
                    dialogRef.current!,
                    false
                );
                const height = DomHandler.getOuterHeight(
                    dialogRef.current!,
                    false
                );
                const offset = dialogRef.current!.getBoundingClientRect();
                const viewport = DomHandler.getViewport();

                const hasBeenDragged =
                    !parseInt(dialogRef.current!.style.top) ||
                    !parseInt(dialogRef.current!.style.left);
                const minWidth = convertToPx(
                    dialogRef.current!.style.minWidth,
                    'width',
                    viewport
                );
                const minHeight = convertToPx(
                    dialogRef.current!.style.minHeight,
                    'height',
                    viewport
                );
                let newWidth = width + deltaX;
                let newHeight = height + deltaY;

                if (hasBeenDragged) {
                    newWidth += deltaX;
                    newHeight += deltaY;
                }

                if (
                    (!minWidth || newWidth > minWidth) &&
                    offset.left + newWidth < viewport.width
                ) {
                    dialogRef.current!.style.width = newWidth + 'px';
                }

                if (
                    (!minHeight || newHeight > minHeight) &&
                    offset.top + newHeight < viewport.height
                ) {
                    dialogRef.current!.style.height = newHeight + 'px';
                }

                lastPageX.current = event.pageX;
                lastPageY.current = event.pageY;

                props.onResize && props.onResize(event);
            }
        };

        const onResizeEnd = (event: React.MouseEvent<HTMLElement>) => {
            if (resizing.current) {
                resizing.current = false;
                DomHandler.removeClass(document.body, 'cs-unselectable-text');

                props.onResizeEnd && props.onResizeEnd(event);
            }
        };

        const resetPosition = () => {
            dialogRef.current!.style.position = '';
            dialogRef.current!.style.left = '';
            dialogRef.current!.style.top = '';
            dialogRef.current!.style.margin = '';
        };

        const getPositionClass = () => {
            const positions = [
                'center',
                'left',
                'right',
                'top',
                'top-left',
                'top-right',
                'bottom',
                'bottom-left',
                'bottom-right',
            ];
            const pos = positions.find(
                (item) =>
                    item === props.position ||
                    item.replace('-', '') === props.position
            );

            return pos ? `cs-dialog-${pos}` : '';
        };

        const onEnter = () => {
            dialogRef?.current?.setAttribute(attributeSelector.current, '');
        };

        const onEntered = () => {
            props.onShow && props.onShow();

            if (props.focusOnShow) {
                focus();
            }

            enableDocumentSettings();
        };

        const onExiting = () => {
            if (props.modal) {
                DomHandler.addClass(
                    maskRef.current,
                    'cs-component-overlay-leave'
                );
            }
        };

        const onExited = () => {
            dragging.current = false;
            ZIndexUtils.clear(maskRef.current);
            setMaskVisibleState(false);
            disableDocumentSettings();
        };

        const enableDocumentSettings = () => {
            bindGlobalListeners();

            if (props.blockScroll || (props.maximizable && maximized)) {
                DomHandler.addClass(document.body, 'cs-overflow-hidden');
            }
        };

        const disableDocumentSettings = () => {
            unbindGlobalListeners();
            let doc = document as any;
            if (props.modal) {
                let hasBlockScroll =
                    doc.primeDialogParams &&
                    doc.primeDialogParams.some(
                        (param: any) => param.hasBlockScroll
                    );
                if (!hasBlockScroll) {
                    DomHandler.removeClass(doc.body, 'cs-overflow-hidden');
                }
            } else if (props.blockScroll || (props.maximizable && maximized)) {
                DomHandler.removeClass(doc.body, 'cs-overflow-hidden');
            }
        };

        const bindGlobalListeners = () => {
            if (props.draggable) {
                bindDocumentDragListener();
                bindDocumentDragEndListener();
            }

            if (props.resizable) {
                bindDocumentResizeListener();
                bindDocumentResizeEndListener();
            }

            if (props.closable) {
                bindDocumentKeyDownListener();

                const newParam = {
                    id: idState,
                    hasBlockScroll: props.blockScroll,
                };
                let doc = document as any;
                doc.primeDialogParams = doc.primeDialogParams
                    ? [...doc.primeDialogParams, newParam]
                    : [newParam];
            }
        };

        const unbindGlobalListeners = () => {
            unbindDocumentDragListener();
            unbindDocumentDragEndListener();
            unbindDocumentResizeListener();
            unbindDocumentResizEndListener();
            unbindDocumentKeyDownListener();

            let doc = document as any;
            doc.primeDialogParams =
                doc.primeDialogParams &&
                doc.primeDialogParams.filter(
                    (param: any) => param.id !== idState
                );
        };

        const createStyle = () => {
            if (!styleElement.current) {
                styleElement.current = DomHandler.createInlineStyle(
                    CsReact.nonce
                );
                let innerHTML = '';
                for (let breakpoint in props.breakpoints) {
                    innerHTML += `
                     @media screen and (max-width: ${breakpoint}) {
                         .cs-dialog[${attributeSelector.current}] {
                             width: ${props.breakpoints[breakpoint]} !important;
                         }
                     }
                 `;
                }
                styleElement.current.innerHTML = innerHTML;
            }
        };

        const changeScrollOnMaximizable = () => {
            if (!props.blockScroll) {
                if (maximized) {
                    DomHandler.addClass(document.body, 'cs-overflow-hidden');
                } else {
                    DomHandler.removeClass(document.body, 'cs-overflow-hidden');
                }
            }
        };

        useMountEffect(() => {
            if (!idState) {
                setIdState(UniqueComponentId());
            }
            attributeSelector.current = UniqueComponentId();
            if (props.visible) {
                setMaskVisibleState(true);
            }
            if (props.breakpoints) {
                createStyle();
            }
        });

        useUpdateEffect(() => {
            if (props.visible && !maskVisibleState) {
                setMaskVisibleState(true);
            }

            if (props.visible !== visibleState && maskVisibleState) {
                setVisibleState(props.visible ? props.visible : false);
            }
        });

        useUpdateEffect(() => {
            if (maskVisibleState) {
                ZIndexUtils.set(
                    'modal',
                    maskRef.current,
                    CsReact.autoZIndex,
                    props.baseZIndex || CsReact.zIndex['modal']
                );
                setVisibleState(true);
            }
        }, [maskVisibleState]);

        useUpdateEffect(() => {
            changeScrollOnMaximizable();
        }, [props.maximized, maximizedState]);

        useUnmountEffect(() => {
            disableDocumentSettings();
            DomHandler.removeInlineStyle(styleElement.current);
            ZIndexUtils.clear(maskRef.current);
        });

        React.useImperativeHandle(ref, () => ({
            resetPosition,
        }));

        const createCloseIcon = () => {
            if (props.closable) {
                return (
                    <button
                        ref={closeRef}
                        type="button"
                        className="cs-dialog-header-icon cs-dialog-header-close cs-link"
                        aria-label={props.ariaCloseIconLabel}
                        onClick={onClose}
                    >
                        <span
                            className={
                                'cs-dialog-header-close-icon csi csi-times'
                            }
                        ></span>
                        {/*<Ripple />*/}
                    </button>
                );
            }

            return null;
        };

        const createSecondaryButtonIcon = () => {
            const iconClassName = classNames(
                'cs-dialog-header-secondary-icon',
                props.secondaryButtonClass ?? 'csi csi-angle-left'
            );
            if (props.secondaryButton) {
                return (
                    <button
                        ref={closeRef}
                        type="button"
                        className="cs-dialog-header-icon cs-dialog-header-close cs-link"
                        aria-label={props.ariaCloseIconLabel}
                        onClick={props.onSecondaryButtonClick}
                    >
                        <span className={iconClassName}></span>
                        {/*<Ripple />*/}
                    </button>
                );
            }

            return null;
        };

        const createMaximizeIcon = () => {
            const iconClassName = classNames(
                'cs-dialog-header-maximize-icon csi',
                {
                    'csi-window-maximize': !maximized,
                    'csi-window-minimize': maximized,
                }
            );

            if (props.maximizable) {
                return (
                    <button
                        type="button"
                        className="cs-dialog-header-icon cs-dialog-header-maximize cs-link"
                        onClick={toggleMaximize}
                    >
                        <span className={iconClassName}></span>
                        {/*<Ripple />*/}
                    </button>
                );
            }

            return null;
        };

        const createHeader = () => {
            if (props.showHeader) {
                const closeIcon = createCloseIcon();
                const maximizeIcon = createMaximizeIcon();
                const secondaryButton = createSecondaryButtonIcon();
                const icons = ObjectUtils.getJSXElement(props.icons, props);
                const header = ObjectUtils.getJSXElement(props.header, props);
                const headerId = idState + '_header';

                return (
                    <div
                        ref={headerRef}
                        className="cs-dialog-header"
                        onMouseDown={onDragStart}
                    >
                        <div className="cs-dialog-header-icons left">
                            {props.secondaryButton && secondaryButton}
                        </div>
                        <div id={headerId} className="cs-dialog-title">
                            {header}
                        </div>
                        <div className="cs-dialog-header-icons right">
                            {icons}
                            {maximizeIcon}
                            {closeIcon}
                        </div>
                    </div>
                );
            }

            return null;
        };

        const createContent = () => {
            const className = classNames(
                'cs-dialog-content',
                props.footer ? '' : 'no-footer',
                props.contentClassName
            );
            const contentId = idState + '_content';

            return (
                <div
                    id={contentId}
                    ref={contentRef}
                    className={className}
                    style={props.contentStyle}
                >
                    {props.children}
                </div>
            );
        };

        const createFooter = () => {
            const footer = ObjectUtils.getJSXElement(props.footer, props);

            return (
                footer && (
                    <div ref={footerRef} className="cs-dialog-footer">
                        {footer}
                    </div>
                )
            );
        };

        const createResizer = () => {
            if (props.resizable) {
                return (
                    <div
                        className="cs-resizable-handle"
                        style={{ zIndex: 90 }}
                        onMouseDown={onResizeStart}
                    ></div>
                );
            }

            return null;
        };

        const createElement = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-dialog cs-component',
                props.className,
                {
                    'cs-dialog-rtl': props.rtl,
                    'cs-dialog-maximized': maximized,
                }
            );
            const maskClassName = classNames(
                'cs-dialog-mask',
                getPositionClass(),
                {
                    'cs-component-overlay cs-component-overlay-enter':
                        props.modal,
                    'cs-dialog-visible': maskVisibleState,
                    'cs-dialog-draggable': props.draggable,
                    'cs-dialog-resizable': props.resizable,
                },
                props.maskClassName
            );
            const header = createHeader();
            const content = createContent();
            const footer = createFooter();
            const resizer = createResizer();

            const headerId = idState + '_header';
            const contentId = idState + '_content';
            const transitionTimeout = {
                enter: props.position === 'center' ? 150 : 300,
                exit: props.position === 'center' ? 150 : 300,
            };
            return (
                <div
                    ref={maskRef}
                    style={props.maskStyle}
                    className={maskClassName}
                    onClick={onMaskClick}
                >
                    <CSSTransition
                        nodeRef={dialogRef}
                        classNames="cs-dialog"
                        timeout={transitionTimeout}
                        in={visibleState}
                        options={props.transitionOptions}
                        unmountOnExit
                        onEnter={onEnter}
                        onEntered={onEntered}
                        onExiting={onExiting}
                        onExited={onExited}
                    >
                        <div
                            ref={dialogRef}
                            id={idState}
                            className={className}
                            style={props.style}
                            onClick={props.onClick}
                            role="dialog"
                            {...otherProps}
                            aria-labelledby={headerId}
                            aria-describedby={contentId}
                            aria-modal={props.modal}
                        >
                            {header}
                            {content}
                            {footer}
                            {resizer}
                        </div>
                    </CSSTransition>
                </div>
            );
        };
        const createDialog = () => {
            const element = createElement();

            return (
                <Portal
                    element={element}
                    appendTo={props.appendTo}
                    visible={true}
                />
            );
        };

        if (maskVisibleState) {
            return createDialog();
        } else {
            return null;
        }
    })
);

Dialog.displayName = 'Dialog';
const defaultProps = {
    __TYPE: 'Dialog',
    id: null,
    header: null,
    footer: null,
    visible: false,
    position: 'center',
    draggable: true,
    resizable: true,
    modal: true,
    onHide: null,
    onShow: null,
    contentStyle: null,
    contentClassName: null,
    closeOnEscape: true,
    dismissableMask: false,
    rtl: false,
    closable: true,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
    showHeader: true,
    appendTo: null,
    baseZIndex: 0,
    maximizable: false,
    blockScroll: false,
    icons: null,
    ariaCloseIconLabel: 'Close',
    focusOnShow: true,
    minX: 0,
    minY: 0,
    keepInViewport: true,
    maximized: false,
    breakpoints: null,
    transitionOptions: null,
    onMaximize: null,
    onDragStart: null,
    onDrag: null,
    onDragEnd: null,
    onResizeStart: null,
    onResize: null,
    onResizeEnd: null,
    onClick: null,
    onMaskClick: null,
    secondaryButton: null,
    secondaryButtonClass: null,
    onSecondaryButtonClick: null,
};
