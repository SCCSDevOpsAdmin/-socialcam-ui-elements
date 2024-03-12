import * as React from 'react';
import { classNames, DomHandler } from 'src/utils/Utils';
import './DataTable.scss';

export const RowRadioButton = React.memo((props: any) => {
    const [focusedState, setFocusedState] = React.useState(false);
    const inputRef = React.useRef(null);

    const onFocus = () => {
        setFocusedState(true);
    };

    const onBlur = () => {
        setFocusedState(false);
    };

    const onClick = (event) => {
        if (!props.disabled) {
            props.onChange(event);

            DomHandler.focus(inputRef.current);
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Space') {
            onClick(event);
            event.preventDefault();
        }
    };

    const onChange = (event) => {
        onClick(event);
    };

    const className = classNames('cs-radiobutton cs-component', {
        'cs-radiobutton-focused': focusedState,
    });
    const boxClassName = classNames('cs-radiobutton-box cs-component', {
        'cs-highlight': props.checked,
        'cs-focus': focusedState,
        'cs-disabled': props.disabled,
    });
    const name = `${props.tableSelector}_dt_radio`;

    return (
        <div className={className}>
            <div className="cs-hidden-accessible">
                <input
                    name={name}
                    ref={inputRef}
                    type="radio"
                    checked={props.checked}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </div>
            <div
                className={boxClassName}
                onClick={onClick}
                role="radio"
                aria-checked={props.checked}
            >
                <div className="cs-radiobutton-icon"></div>
            </div>
        </div>
    );
});

RowRadioButton.displayName = 'RowRadioButton';
