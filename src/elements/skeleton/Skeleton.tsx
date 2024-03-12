import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { SkeletonProps } from './types';
import './Skeleton.scss';

export const Skeleton = React.memo(
    React.forwardRef((props: SkeletonProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef(null);
        let style = {};
        if (props.size)
            style = Object.assign(style, {
                width: props.size,
                height: props.size,
            });
        if (props.width && !props.size)
            style = Object.assign(style, {
                width: props.width,
            });
        if (props.height && !props.size)
            style = Object.assign(style, {
                height: props.height,
            });
        if (props.borderRadius)
            style = Object.assign(style, { borderRadius: props.borderRadius });

        const className = classNames(
            'cs-skeleton cs-component',
            {
                'cs-skeleton-circle': props.shape === 'circle',
                'cs-skeleton-none': props.animation === 'none',
            },
            props.className
        );

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current,
        }));

        return <div className={className} style={style} ref={elementRef} />;
    })
);

Skeleton.displayName = 'Skeleton';
const defaultProps = {
    __TYPE: 'Skeleton',
    shape: 'rectangle',
    size: null,
    borderRadius: null,
    animation: 'wave',
    style: null,
    className: null,
};
