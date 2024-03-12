import * as React from 'react';
import CsReact from 'src/api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import { useOverlayListener, useUnmountEffect } from 'src/hooks/Hooks';
import { OverlayService } from '../overlayservice/OverlayService';
import { Portal } from '../portal/Portal';
import {
    classNames,
    DomHandler,
    IconUtils,
    ObjectUtils,
    ZIndexUtils,
} from 'src/utils/Utils';
import { MenuProps } from './MenuTypes';
import './Menu.scss';

export const Menu = React.memo(
    React.forwardRef((props: MenuProps, ref) => {
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

        const onItemClick = (event, item) => {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (!item.url) {
                event.preventDefault();
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item,
                });
            }

            if (props.popup) {
                hide(event);
            }
        };

        const onItemKeyDown = (event, item) => {
            const listItem = event.currentTarget.parentElement;

            switch (event.which) {
                //down
                case 40:
                    const nextItem = findNextItem(listItem);
                    nextItem && nextItem.children[0].focus();
                    event.preventDefault();
                    break;

                //up
                case 38:
                    const prevItem = findPrevItem(listItem);
                    prevItem && prevItem.children[0].focus();
                    event.preventDefault();
                    break;

                default:
                    break;
            }
        };

        const findNextItem = (item) => {
            const nextItem = item.nextElementSibling;
            return nextItem
                ? DomHandler.hasClass(nextItem, 'cs-disabled') ||
                  !DomHandler.hasClass(nextItem, 'cs-menuitem')
                    ? findNextItem(nextItem)
                    : nextItem
                : null;
        };

        const findPrevItem = (item) => {
            const prevItem = item.previousElementSibling;
            return prevItem
                ? DomHandler.hasClass(prevItem, 'cs-disabled') ||
                  !DomHandler.hasClass(prevItem, 'cs-menuitem')
                    ? findPrevItem(prevItem)
                    : prevItem
                : null;
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
            ZIndexUtils.set(
                'menu',
                menuRef.current,
                CsReact.autoZIndex,
                props.baseZIndex || CsReact.zIndex['menu']
            );
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
            toggle,
            show,
            hide,
        }));

        const createSubmenu = (submenu, index) => {
            const key = submenu.label + '_' + index;
            const className = classNames(
                'cs-submenu-header',
                {
                    'cs-disabled': submenu.disabled,
                },
                submenu.className
            );
            const items = submenu.items.map(createMenuItem);

            return (
                <React.Fragment key={key}>
                    <li
                        className={className}
                        style={submenu.style}
                        role="presentation"
                    >
                        {submenu.label}
                    </li>
                    {items}
                </React.Fragment>
            );
        };

        const createSeparator = (index) => {
            const key = 'separator_' + index;

            return (
                <li
                    key={key}
                    className="cs-menu-separator"
                    role="separator"
                ></li>
            );
        };

        const createMenuItem = (item, index) => {
            const className = classNames('cs-menuitem', item.className);
            const linkClassName = classNames('cs-menuitem-link', {
                'cs-disabled': item.disabled,
            });
            const iconClassName = classNames('cs-menuitem-icon', item.icon);
            const icon = IconUtils.getJSXIcon(
                item.icon,
                { className: 'cs-menuitem-icon' },
                { props }
            );
            const label = item.label && (
                <span className="cs-menuitem-text">{item.label}</span>
            );
            const tabIndex = item.disabled ? null : 0;
            const key = item.label + '_' + index;
            let content = (
                <a
                    href={item.url || '#'}
                    className={linkClassName}
                    role="menuitem"
                    target={item.target}
                    onClick={(event) => onItemClick(event, item)}
                    onKeyDown={(event) => onItemKeyDown(event, item)}
                    tabIndex={tabIndex}
                    aria-disabled={item.disabled}
                >
                    {icon}
                    {label}
                </a>
            );

            if (item.template) {
                const defaultContentOptions = {
                    onClick: (event) => onItemClick(event, item),
                    onKeyDown: (event) => onItemKeyDown(event, item),
                    className: linkClassName,
                    tabIndex,
                    labelClassName: 'cs-menuitem-text',
                    iconClassName,
                    element: content,
                    props,
                };

                content = ObjectUtils.getJSXElement(
                    item.template,
                    item,
                    defaultContentOptions
                );
            }

            return (
                <li
                    key={key}
                    className={className}
                    style={item.style}
                    role="none"
                >
                    {content}
                </li>
            );
        };

        const createItem = (item, index) => {
            return item.separator
                ? createSeparator(index)
                : item.items
                ? createSubmenu(item, index)
                : createMenuItem(item, index);
        };

        const createMenu = () => {
            return props.model.map(createItem);
        };

        const createElement = () => {
            if (props.model) {
                const otherProps = ObjectUtils.findDiffKeys(
                    props,
                    defaultProps
                );
                const className = classNames(
                    'cs-menu cs-component',
                    {
                        'cs-menu-overlay': props.popup,
                    },
                    props.className
                );
                const menuitems = createMenu();

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
                            <ul className="cs-menu-list cs-reset" role="menu">
                                {menuitems}
                            </ul>
                        </div>
                    </CSSTransition>
                );
            }

            return null;
        };

        const element = createElement();

        return props.popup ? (
            <Portal element={element} appendTo={props.appendTo} />
        ) : (
            element
        );
    })
);

Menu.displayName = 'Menu';
const defaultProps = {
    __TYPE: 'Menu',
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: 'self',
    transitionOptions: null,
    onShow: null,
    onHide: null,
};
