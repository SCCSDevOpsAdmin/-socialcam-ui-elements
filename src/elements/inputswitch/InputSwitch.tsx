import * as React from 'react';
import { classNames, DomHandler, ObjectUtils } from 'src/utils/Utils';
import { InputSwitchProps } from './types';
import './InputSwitch.scss';

export const InputSwitch = React.memo(
    React.forwardRef((props: InputSwitchProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [focusedState, setFocusedState] = React.useState(false);
        const elementRef = React.useRef(null);
        const inputRef = React.useRef(props.inputRef);
        const checked = props.checked === props.trueValue;

        const onClick = (event) => {
            if (props.disabled) {
                return;
            }

            toggle(event);
            DomHandler.focus(inputRef.current);

            event.preventDefault();
        };

        const toggle = (event) => {
            if (props.onChange) {
                const value = checked ? props.falseValue : props.trueValue;

                props.onChange({
                    originalEvent: event,
                    value,
                    stopPropagation: () => {},
                    preventDefault: () => {},
                    target: {
                        name: props.name,
                        id: props.id,
                        value,
                    },
                });
            }
        };

        const onFocus = (event) => {
            setFocusedState(true);
            props.onFocus && props.onFocus(event);
        };

        const onBlur = (event) => {
            setFocusedState(false);
            props.onBlur && props.onBlur(event);
        };

        React.useImperativeHandle(ref, () => ({
            getElement: () => elementRef.current,
            getInput: () => elementRef.current,
            ...props,
        }));

        React.useEffect(() => {
            ObjectUtils.combinedRefs(inputRef, props.inputRef);
        }, [inputRef, props.inputRef]);

        //const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-inputswitch cs-component',
            {
                'cs-inputswitch-checked': checked,
                'cs-disabled': props.disabled,
                'cs-focus': focusedState,
            },
            props.className
        );

        return (
            <>
                <div
                    ref={elementRef}
                    id={props.id}
                    className={className}
                    style={props.style}
                    {...otherProps}
                    onClick={onClick}
                    role="checkbox"
                    aria-checked={checked}
                >
                    <div className="cs-hidden-accessible">
                        <input
                            ref={inputRef}
                            type="checkbox"
                            id={props.inputId}
                            name={props.name}
                            checked={checked}
                            onChange={toggle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            disabled={props.disabled}
                            role="switch"
                            tabIndex={props.tabIndex}
                            aria-checked={checked}
                            aria-labelledby={props['aria-labelledby']}
                            aria-label={props['aria-label']}
                        />
                    </div>
                    <span className="cs-inputswitch-slider"></span>
                </div>
                {/* {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} {...props.tooltipOptions} />} */}
            </>
        );
    })
);

InputSwitch.displayName = 'InputSwitch';
const defaultProps = {
    __TYPE: 'InputSwitch',
    id: null,
    inputRef: null,
    style: null,
    className: null,
    inputId: null,
    name: null,
    tabIndex: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    disabled: false,
    // tooltip: null,
    // tooltipOptions: null,
    'aria-label': null,
    'aria-labelledby': null,
    onChange: null,
    onFocus: null,
    onBlur: null,
};
