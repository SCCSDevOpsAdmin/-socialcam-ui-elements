import React from 'react';
import { classNames, DomHandler, ObjectUtils } from 'src/utils/Utils';
import { Tooltip } from '../tooltip/Tooltip';
import TooltipOptions from '../tooltip/TooltipOptions';
//import { classNames, DomHandler, ObjectUtils } from 'src/utils/Utils';
import './InputText.scss';
import { KeyFilterType } from '../keyfilter/KeyFilterOptions';
import { KeyFilter } from '../keyfilter/KeyFilter';
type Props = {};

export interface InputTextProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'onInput' | 'ref'
    > {
    keyfilter?: KeyFilterType;
    validateOnly?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onInput?(
        event: React.FormEvent<HTMLInputElement>,
        validatePattern: boolean
    ): void;
    children?: React.ReactNode;
    inputMode?:
        | 'none'
        | 'text'
        | 'tel'
        | 'url'
        | 'email'
        | 'numeric'
        | 'decimal'
        | 'search';
}

const defaultProps = {
    //__TYPE: 'InputText',
    keyfilter: null,
    validateOnly: false,
    tooltip: null,
    tooltipOptions: null,
    onInput: null,
    onKeyDown: null,
    onKeyUp: null,
    onPaste: null,
};

export const InputText = React.memo(
    React.forwardRef((props: InputTextProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef<any>(ref);

        const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            props.onKeyDown && props.onKeyDown(event);
        };

        const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
            props.onKeyUp && props.onKeyUp(event);
        };

        const onInput = (event: any) => {
            let validatePattern = true;
            if (props.keyfilter && props.validateOnly) {
                validatePattern = KeyFilter.validate(event, props.keyfilter);
            }

            props.onInput && props.onInput(event, validatePattern);

            if (!props.onChange) {
                const target = event.target;
                ObjectUtils.isNotEmpty(target.value)
                    ? DomHandler.addClass(target, 'cs-filled')
                    : DomHandler.removeClass(target, 'cs-filled');
            }
        };

        const onPaste = (event: any) => {
            props.onPaste && props.onPaste(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };

        const isFilled = React.useMemo(
            () =>
                ObjectUtils.isNotEmpty(props.value) ||
                ObjectUtils.isNotEmpty(props.defaultValue) ||
                (elementRef.current &&
                    ObjectUtils.isNotEmpty(elementRef.current.value)),
            [props.value, props.defaultValue]
        );

        React.useEffect(() => {
            ObjectUtils.combinedRefs(elementRef, ref);
        }, [elementRef, ref]);

        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-inputtext  cs-component',
            {
                'cs-disabled': props.disabled,
                'cs-filled': isFilled,
            },
            props.className
        );

        return (
            <>
                <input
                    ref={elementRef}
                    {...otherProps}
                    className={className}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onPaste={onPaste}
                />
                {hasTooltip && (
                    <Tooltip
                        target={elementRef}
                        content={props.tooltip}
                        {...props.tooltipOptions}
                    />
                )}
            </>
        );
    })
);

export default InputText;
