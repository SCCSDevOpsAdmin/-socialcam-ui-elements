import * as React from 'react';
import { classNames } from 'src/utils/Utils';
import './DataTable.scss';

export const HeaderCheckbox = React.memo((props: any) => {
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

            props.onChange({
                originalEvent: event,
                checked: !props.checked,
            });
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Space') {
            onClick(event);
            event.preventDefault();
        }
    };

    const boxClassName = classNames('cs-checkbox-box cs-component', {
        'cs-highlight': props.checked,
        'cs-disabled': props.disabled,
        'cs-focus': focusedState,
    });
    const iconClassName = classNames('cs-checkbox-icon', {
        'csi csi-check': props.checked,
    });
    const tabIndex = props.disabled ? null : 0;

    return (
        <div className="cs-checkbox cs-component" onClick={onClick}>
            <div
                className={boxClassName}
                role="checkbox"
                aria-checked={props.checked}
                tabIndex={tabIndex}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            >
                <span className={iconClassName}></span>
            </div>
        </div>
    );
});

HeaderCheckbox.displayName = 'HeaderCheckbox';
