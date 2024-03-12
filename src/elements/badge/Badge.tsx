import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { BadgeProps } from './types';

import './Badge.scss';
export const Badge = React.memo(
    React.forwardRef((props: BadgeProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef(null);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-badge cs-component',
            {
                'cs-badge-no-gutter':
                    ObjectUtils.isNotEmpty(props.value) &&
                    String(props.value).length === 1,
                'cs-badge-dot': ObjectUtils.isEmpty(props.value),
                'cs-badge-lg': props.size === 'large',
                'cs-badge-xl': props.size === 'xlarge',
                [`cs-badge-${props.severity}`]: props.severity !== null,
            },
            props.className
        );

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current,
        }));

        return (
            <span
                ref={elementRef}
                className={className}
                style={props.style}
                {...otherProps}
            >
                {props.value}
            </span>
        );
    })
);

Badge.displayName = 'Badge';
const defaultProps = {
    __TYPE: 'Badge',
    value: null,
    severity: null,
    size: null,
    style: null,
    className: null,
};
