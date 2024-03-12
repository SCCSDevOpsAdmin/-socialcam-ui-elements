import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const DropdownItem = React.memo((props: any) => {
    const onClick = (event: any) => {
        if (props.onClick) {
            props.onClick({
                originalEvent: event,
                option: props.option,
            });
        }
    };

    const className = classNames(
        'cs-dropdown-item',
        {
            'cs-highlight': props.selected,
            'cs-disabled': props.disabled,
            'cs-dropdown-item-empty': !props.label || props.label.length === 0,
        },
        props.option && props.option.className
    );
    const content = props.template
        ? ObjectUtils.getJSXElement(props.template, props.option)
        : props.label;

    return (
        <li
            className={className}
            onClick={onClick}
            aria-label={props.label}
            key={props.label}
            role="option"
            aria-selected={props.selected}
        >
            {content}
        </li>
    );
});

DropdownItem.displayName = 'DropdownItem';
