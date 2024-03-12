import * as React from 'react';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import { SlideMenuProps } from './SlideMenu';

export interface SlideMenuSubProps extends SlideMenuProps {
    menuProps?: SlideMenuProps | any;
    root?: any;
    index?: number;
    level?: number;
    parentActive?: boolean;
    onForward?: (event?: React.SyntheticEvent) => void;
}

export const SlideMenuSub = React.memo((props: SlideMenuSubProps) => {
    const [activeItemState, setActiveItemState] = React.useState(null);

    const onItemClick = (event, item, index?) => {
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

        if (item.items) {
            setActiveItemState(item);
            props.onForward();
        }
    };

    const createSeparator = (index) => {
        const key = 'separator_' + index;

        return <li key={key} className="cs-menu-separator"></li>;
    };

    const createSubmenu = (item) => {
        if (item.items) {
            return (
                <SlideMenuSub
                    menuProps={props.menuProps}
                    model={item.items}
                    index={props.index + 1}
                    menuWidth={props.menuWidth}
                    effectDuration={props.effectDuration}
                    onForward={props.onForward}
                    parentActive={item === activeItemState}
                />
            );
        }

        return null;
    };

    const createMenuitem = (item, index) => {
        const key = item.label + '_' + index;
        const active = activeItemState === item;
        const className = classNames(
            'cs-menuitem',
            { 'cs-menuitem-active': active, 'cs-disabled': item.disabled },
            item.className
        );
        const iconClassName = classNames('cs-menuitem-icon', item.icon);
        const submenuIconClassName =
            'cs-submenu-icon csi csi-fw csi-angle-right';
        const icon = IconUtils.getJSXIcon(
            item.icon,
            { className: 'cs-menuitem-icon' },
            { props: props.menuProps }
        );
        const label = item.label && (
            <span className="cs-menuitem-text">{item.label}</span>
        );
        const submenuIcon = item.items && (
            <span className={submenuIconClassName}></span>
        );
        const submenu = createSubmenu(item);
        let content = (
            <a
                href={item.url || '#'}
                className="cs-menuitem-link"
                target={item.target}
                onClick={(event) => onItemClick(event, item, index)}
                aria-disabled={item.disabled}
            >
                {icon}
                {label}
                {submenuIcon}
            </a>
        );

        if (item.template) {
            const defaultContentOptions = {
                onClick: (event) => onItemClick(event, item, index),
                className: 'cs-menuitem-link',
                labelClassName: 'cs-menuitem-text',
                iconClassName,
                submenuIconClassName,
                element: content,
                props,
                active,
            };

            content = ObjectUtils.getJSXElement(
                item.template,
                item,
                defaultContentOptions
            );
        }

        return (
            <li key={key} className={className} style={item.style}>
                {content}
                {submenu}
            </li>
        );
    };

    const createItem = (item, index) => {
        return item.separator
            ? createSeparator(index)
            : createMenuitem(item, index);
    };

    const createItems = () => {
        return props.model ? props.model.map(createItem) : null;
    };

    const style = {
        width: props.menuWidth + 'px',
        left: props.root
            ? -1 * props.level * props.menuWidth + 'px'
            : props.menuWidth + 'px',
        transitionProperty: props.root ? 'left' : 'none',
        transitionDuration: props.effectDuration + 'ms',
        transitionTimingFunction: props.easing,
    };
    const className = classNames({
        'cs-slidemenu-rootlist': props.root,
        'cs-submenu-list': !props.root,
        'cs-active-submenu': props.parentActive,
    });
    const items = createItems();

    return (
        <ul className={className} style={style}>
            {items}
        </ul>
    );
});

SlideMenuSub.displayName = 'SlideMenuSub';
