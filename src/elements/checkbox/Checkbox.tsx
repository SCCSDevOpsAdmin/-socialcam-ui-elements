import * as React from 'react';
//import TooltipOptions from '../tooltip/tooltipoptions';
//import { useUpdateEffect } from '../hooks/Hooks';
//import { Tooltip } from '../tooltip/Tooltip';
import { IconType } from '../../utils/types';
import { useUpdateEffect } from '../../hooks/Hooks';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import './Checkbox.scss';
import TooltipOptions from '../tooltip/TooltipOptions';

interface CheckboxChangeTargetOptions {
    type: 'checkbox';
    name: string;
    id: string;
    value: any;
    checked: boolean;
}

interface CheckboxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    checked: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: CheckboxChangeTargetOptions;
}

export interface CheckboxProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'onChange' | 'ref'
    > {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    value?: any;
    name?: string;
    checked?: any;
    trueValue?: any;
    falseValue?: any;
    style?: object;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    icon?: IconType<CheckboxProps>;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: CheckboxChangeParams): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}
export const Checkbox = React.memo(
    React.forwardRef((props: CheckboxProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [focusedState, setFocusedState] = React.useState(false);
        const elementRef = React.useRef<any>(null);
        const inputRef = React.useRef<any>(props.inputRef);

        const onClick = (event: React.MouseEvent<HTMLElement>) => {
            if (!props.disabled && !props.readOnly && props.onChange) {
                const checked = isChecked();
                const value = checked ? props.falseValue : props.trueValue;

                props.onChange({
                    originalEvent: event,
                    value: props.value,
                    checked: value,
                    stopPropagation: () => {},
                    preventDefault: () => {},
                    target: {
                        type: 'checkbox',
                        name: props.name ?? '',
                        id: props.id ?? '',
                        value: props.value,
                        checked: value,
                    },
                });

                inputRef.current.checked = !checked;
                inputRef.current.focus();
            }
        };

        const onFocus = () => {
            setFocusedState(true);
        };

        const onBlur = () => {
            setFocusedState(false);
        };

        const isChecked = () => {
            return props.checked === props.trueValue;
        };

        React.useEffect(() => {
            ObjectUtils.combinedRefs(inputRef, props.inputRef);
        }, [inputRef, props.inputRef]);

        useUpdateEffect(() => {
            inputRef.current.checked = isChecked();
        }, [props.checked, props.trueValue]);

        const checked = isChecked();
        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-checkbox cs-component',
            {
                'cs-checkbox-checked': checked,
                'cs-checkbox-disabled': props.disabled,
                'cs-checkbox-focused': focusedState,
            },
            props.className
        );
        const boxClass = classNames('cs-checkbox-box', {
            'cs-highlight': checked,
            'cs-disabled': props.disabled,
            'cs-focus': focusedState,
        });
        const icon = IconUtils.getJSXIcon(
            checked ? props.icon : '',
            { className: 'cs-checkbox-icon cs-c' },
            { props, checked }
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
                    onContextMenu={props.onContextMenu}
                    onMouseDown={props.onMouseDown}
                >
                    <div className="cs-hidden-accessible">
                        <input
                            ref={inputRef}
                            type="checkbox"
                            id={props.inputId}
                            name={props.name}
                            tabIndex={props.tabIndex}
                            defaultChecked={checked}
                            aria-labelledby={props['aria-labelledby']}
                            aria-label={props['aria-label']}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            required={props.required}
                        />
                    </div>
                    <div className={boxClass}>{icon}</div>
                </div>
                {/*{hasTooltip && (
                    <Tooltip
                        target={elementRef}
                        content={props.tooltip}
                        {...props.tooltipOptions}
                    />
                )}*/}
            </>
        );
    })
);

Checkbox.displayName = 'Checkbox';
const defaultProps = {
    __TYPE: 'Checkbox',
    id: null,
    //inputRef: null,
    inputId: null,
    value: null,
    name: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    style: null,
    className: null,
    disabled: false,
    required: false,
    readOnly: false,
    tabIndex: null,
    icon: 'csi csi-check',
    tooltip: null,
    tooltipOptions: null,
    'aria-label': null,
    'aria-labelledby': null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null,
};
