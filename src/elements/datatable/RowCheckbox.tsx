import * as React from 'react';
import { classNames } from 'src/utils/Utils';
import './DataTable.scss';

export const RowCheckbox = React.memo((props: any) => {
    const [focusedState, setFocusedState] = React.useState(false);

    const onFocus = () => {
        setFocusedState(true);
    };

    const onBlur = () => {
        setFocusedState(false);
    };

    const onClick = (event) => {
        if (!props.disabled) {
            setFocusedState(true);

            props.onChange(event);
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Space') {
            onClick(event);
            event.preventDefault();
        }
    };

    const className = classNames('cs-checkbox cs-component', {
        'cs-checkbox-focused': focusedState,
    });
    const boxClassName = classNames('cs-checkbox-box cs-component', {
        'cs-highlight': props.checked,
        'cs-disabled': props.disabled,
        'cs-focus': focusedState,
    });
    const iconClassName = classNames('cs-checkbox-icon', {
        'csi csi-check': props.checked,
    });
    const tabIndex = props.disabled ? null : '0';

    return (
        <div className={className} onClick={onClick}>
            <div
                className={boxClassName}
                role="checkbox"
                aria-checked={props.checked}
                tabIndex={parseInt(tabIndex)}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <span className={iconClassName}></span>
            </div>
        </div>
    );
});

RowCheckbox.displayName = 'RowCheckbox';
