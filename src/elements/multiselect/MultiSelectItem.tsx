import * as React from 'react';
import { Ripple } from '../ripple/Ripple';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const MultiSelectItem = React.memo((props: any) => {
    const onClick = (event) => {
        if (props.onClick) {
            props.onClick({
                originalEvent: event,
                option: props.option,
            });
        }

        event.preventDefault();
    };

    const onKeyDown = (event) => {
        if (props.onKeyDown) {
            props.onKeyDown({
                originalEvent: event,
                option: props.option,
            });
        }
    };

    const className = classNames(
        'cs-multiselect-item',
        {
            'cs-highlight': props.selected,
            'cs-disabled': props.disabled,
        },
        props.option.className
    );
    const checkboxClassName = classNames('cs-checkbox-box', {
        'cs-highlight': props.selected,
    });
    const checkboxIcon = classNames('cs-checkbox-icon cs-c', {
        'csi csi-check': props.selected,
    });
    const content = props.template
        ? ObjectUtils.getJSXElement(props.template, props.option)
        : props.label;
    const tabIndex = props.disabled ? null : props.tabIndex || 0;

    return (
        <li
            className={className}
            onClick={onClick}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            role="option"
            aria-selected={props.selected}
        >
            <div className="cs-checkbox cs-component">
                <div className={checkboxClassName}>
                    <span className={checkboxIcon}></span>
                </div>
            </div>
            <span>{content}</span>
            <Ripple />
        </li>
    );
});

MultiSelectItem.displayName = 'MultiSelectItem';
