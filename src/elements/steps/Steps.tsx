import * as React from 'react';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import { MenuItem } from '../menuitem/MenuItem';

import './Steps.scss';

interface StepsSelectParams {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
    index: number;
}

export interface StepsProps {
    id?: string;
    model: MenuItem[];
    activeIndex?: number;
    readOnly?: boolean;
    style?: object;
    className?: string;
    onSelect?(e: StepsSelectParams): void;
    children?: React.ReactNode;
}

//export declare class Steps extends React.Component<StepsProps, any> {}
const defaultProps = {
    __TYPE: 'Steps',
    id: null,
    model: null,
    activeIndex: 0,
    readOnly: true,
    style: null,
    className: null,
    onSelect: null,
};

export const Steps = React.memo(
    React.forwardRef((props: StepsProps, ref: any) => {
        const itemClick = (
            event: React.SyntheticEvent,
            item: MenuItem,
            index: number
        ) => {
            if (props.readOnly || item.disabled) {
                event.preventDefault();
                return;
            }

            if (props.onSelect) {
                props.onSelect({
                    originalEvent: event,
                    item,
                    index,
                });
            }

            if (!item.url) {
                event.preventDefault();
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item,
                    index,
                });
            }
        };

        const createItem = (item: MenuItem, index: number) => {
            const key = item.label + '_' + index;
            const active = index === props.activeIndex;
            const disabled =
                item.disabled ||
                (index !== props.activeIndex && props.readOnly);
            const tabIndex = disabled ? -1 : undefined;
            const className = classNames('cs-steps-item', item.className, {
                'cs-highlight cs-steps-current': active,
                'cs-disabled': disabled,
            });
            const iconClassName = classNames('cs-menuitem-icon', item.icon);
            const icon = IconUtils.getJSXIcon(
                item.icon,
                { className: 'cs-menuitem-icon' },
                { props }
            );
            const label = item.label && (
                <span className="cs-steps-title">{item.label}</span>
            );
            let content = (
                <a
                    href={item.url || '#'}
                    className="cs-menuitem-link"
                    role="presentation"
                    target={item.target}
                    onClick={(event) => itemClick(event, item, index)}
                    tabIndex={tabIndex}
                >
                    <span className="cs-steps-number">{index + 1}</span>
                    {icon}
                    {label}
                </a>
            );

            if (item.template) {
                const defaultContentOptions = {
                    onClick: (event: React.SyntheticEvent) =>
                        itemClick(event, item, index),
                    className: 'cs-menuitem-link',
                    labelClassName: 'cs-steps-title',
                    numberClassName: 'cs-steps-number',
                    iconClassName,
                    element: content,
                    props,
                    tabIndex,
                    active,
                    disabled,
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
                    role="tab"
                    aria-selected={active}
                    aria-expanded={active}
                >
                    {content}
                </li>
            );
        };

        const createItems = () => {
            if (props.model) {
                const items = props.model.map(createItem);

                return <ul role="tablist">{items}</ul>;
            }

            return null;
        };

        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-steps cs-component',
            {
                'cs-readonly': props.readOnly,
            },
            props.className
        );
        const items = createItems();

        return (
            <div
                id={props.id}
                className={className}
                style={props.style}
                {...otherProps}
            >
                {items}
            </div>
        );
    })
);
