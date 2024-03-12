import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import './ProgressBar.scss';

type ProgressBarModeType = 'determinate' | 'indeterminate' | 'string';
type ProgressBarValueType = string | number | undefined | null;

export interface ProgressBarProps {
    id?: string;
    value?: ProgressBarValueType;
    showValue?: boolean;
    unit?: string;
    style?: object;
    className?: string;
    mode?: ProgressBarModeType;
    color?: string;
    displayValueTemplate?(value: ProgressBarValueType): React.ReactNode;
    children?: React.ReactNode;
}

export const ProgressBar = React.memo(
    React.forwardRef((props: ProgressBarProps | any, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);

        const createLabel: any = () => {
            if (props.showValue && props.value != null) {
                const label = props.displayValueTemplate
                    ? props.displayValueTemplate(props.value)
                    : props.value + props.unit;
                return <div className="cs-progressbar-label">{label}</div>;
            }

            return <></>;
        };

        const createDeterminate = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-progressbar cs-component cs-progressbar-determinate',
                props.className
            );
            const label = createLabel();

            return (
                <div
                    role="progressbar"
                    id={props.id}
                    className={className}
                    style={props.style}
                    aria-valuemin={Number('0')}
                    aria-valuenow={Number(props.value ?? 0)}
                    aria-valuemax={Number('100')}
                    {...otherProps}
                >
                    <div
                        className="cs-progressbar-value cs-progressbar-value-animate"
                        style={{
                            width: props.value + '%',
                            display: 'block',
                            backgroundColor: props.color,
                        }}
                    ></div>
                    {label}
                </div>
            );
        };

        const createIndeterminate = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-progressbar cs-component cs-progressbar-indeterminate',
                props.className
            );

            return (
                <div
                    role="progressbar"
                    id={props.id}
                    className={className}
                    style={props.style}
                    {...otherProps}
                >
                    <div className="cs-progressbar-indeterminate-container">
                        <div
                            className="cs-progressbar-value cs-progressbar-value-animate"
                            style={{ backgroundColor: props.color }}
                        ></div>
                    </div>
                </div>
            );
        };

        if (props.mode === 'determinate') return createDeterminate();
        else if (props.mode === 'indeterminate') return createIndeterminate();
        else
            throw new Error(
                props.mode +
                    " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'"
            );
    })
);

ProgressBar.displayName = 'ProgressBar';
const defaultProps = {
    __TYPE: 'ProgressBar',
    id: null,
    value: null,
    showValue: true,
    unit: '%',
    style: null,
    className: null,
    mode: 'determinate',
    displayValueTemplate: null,
    color: null,
};
