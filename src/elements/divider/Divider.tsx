import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';

type DividerAlignType = 'center' | 'left' | 'right' | 'bottom' | 'top';

type DividerLayoutType = 'vertical' | 'horizontal';

type DividerBorderType = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
    align?: DividerAlignType;
    layout?: DividerLayoutType;
    type?: DividerBorderType;
    style?: object;
    className?: string;
    children?: React.ReactNode;
}

import './Divider.scss';

export const Divider = React.forwardRef((props: DividerProps | any, ref) => {
    const horizontal = props.layout === 'horizontal';
    const vertical = props.layout === 'vertical';
    const otherProps = ObjectUtils.findDiffKeys(props, Divider.defaultProps);
    const className = classNames(
        `cs-divider cs-component cs-divider-${props.layout} cs-divider-${props.type}`,
        {
            'cs-divider-left':
                horizontal && (!props.align || props.align === 'left'),
            'cs-divider-right': horizontal && props.align === 'right',
            'cs-divider-center':
                (horizontal && props.align === 'center') ||
                (vertical && (!props.align || props.align === 'center')),
            'cs-divider-top': vertical && props.align === 'top',
            'cs-divider-bottom': vertical && props.align === 'bottom',
        },
        props.className
    );

    return (
        <div
            className={className}
            style={props.style}
            role="separator"
            {...otherProps}
        >
            <div className="cs-divider-content">{props.children}</div>
        </div>
    );
});

Divider.displayName = 'Divider';
Divider.defaultProps = {
    __TYPE: 'Divider',
    align: null,
    layout: 'horizontal',
    type: 'solid',
    style: null,
    className: null,
};
