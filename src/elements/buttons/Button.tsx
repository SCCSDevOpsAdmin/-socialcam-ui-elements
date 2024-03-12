import React from 'react';
import classNames from 'classnames';
import { IconUtils, ObjectUtils } from 'src/utils/Utils';
import './Button.scss';
import { IconType } from '../../utils/types';
import { Tooltip } from '../tooltip/Tooltip';
import TooltipOptions from '../tooltip/TooltipOptions';

export type ButtonVariantType = 'text' | 'raised' | 'outlined' | string;
export type ButtonPositionType = 'top' | 'bottom' | 'left' | 'right';
export interface ButtonProps
    extends Omit<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        'disabled' | 'ref'
    > {
    label?: string;
    variant?: ButtonVariantType;
    disabled?: boolean;
    content?: string;
    icon?: IconType<ButtonProps>;
    iconPos?: ButtonPositionType;
    badge?: string;
    badgeClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    loading?: boolean;
    loadingIcon?: IconType<ButtonProps>;
    children?: React.ReactNode;
}

const defaultProps = {
    __TYPE: 'Button',
    variant: '',
    disabled: false,
    label: null,
    icon: null,
    iconPos: 'left',
    badge: null,
    badgeClassName: null,
    tooltip: null,
    tooltipOptions: null,
    loading: false,
    loadingIcon: 'csi csi-spinner csi-spin',
    className: 'cs-main',
};

export const Button = React.memo(
    React.forwardRef((props: ButtonProps | any, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef<any>(ref);

        React.useEffect(() => {
            ObjectUtils.combinedRefs(elementRef, ref);
        }, [elementRef, ref]);

        const createIcon = () => {
            const icon = props.loading ? props.loadingIcon : props.icon;
            const className = classNames('cs-button-icon cs-c', {
                'cs-button-loading-icon': props.loading,
                [`cs-button-icon-${props.iconPos}`]: props.label,
            });

            return IconUtils.getJSXIcon(icon, { className }, { props });
        };

        const createLabel = () => {
            if (props.label) {
                return (
                    <span className="cs-button-label cs-c">{props.label}</span>
                );
            }

            return (
                !props.children &&
                !props.label && (
                    <span className="cs-button-label cs-c"></span>
                    //dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                )
            );
        };
        const createBadge = () => {
            if (props.badge) {
                const badgeClassName = classNames(
                    'cs-badge',
                    props.badgeClassName
                );

                return <span className={badgeClassName}>{props.badge}</span>;
            }

            return null;
        };
        const disabled = props.disabled || props.loading;
        const showTooltip = !disabled || (props.tooltipOptions && props.tooltipOptions.showOnDisabled);
        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
        const variant = props.variant ?? defaultProps.variant;
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-button cs-component',
            variant ?? `cs-${variant}`,
            props.className,
            {
                'cs-button-icon-only':
                    (props.icon || (props.loading && props.loadingIcon)) &&
                    !props.label,
                'cs-button-vertical':
                    (props.iconPos === 'top' || props.iconPos === 'bottom') &&
                    props.label,
                'cs-disabled': disabled,
                'cs-button-loading': props.loading,
                'cs-button-loading-label-only':
                    props.loading && !props.icon && props.label,
                [`cs-button-loading-${props.iconPos}`]:
                    props.loading && props.loadingIcon && props.label,
            }
        );

        const icon = createIcon();
        const label = createLabel();
        const badge = createBadge();
        const defaultAriaLabel = props.label
            ? props.label + (props.badge ? ' ' + props.badge : '')
            : props['aria-label'];

        return (
            <>
                <button
                    ref={elementRef}
                    aria-label={defaultAriaLabel}
                    {...otherProps}
                    className={className}
                    disabled={disabled}
                >
                    {icon}
                    {label}
                    {props.children}
                    {badge}
                </button>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} {...props.tooltipOptions} />}
            </>
        );
    })
);

Button.displayName = 'Button';
