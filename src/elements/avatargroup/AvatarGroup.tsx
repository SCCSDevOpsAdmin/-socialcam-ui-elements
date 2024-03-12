import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { AvatarGroupProps } from './types';

import './AvatarGroup.scss';
export const AvatarGroup = React.forwardRef((props: AvatarGroupProps, ref?) => {
    // props = ObjectUtils.initProps(props, defaultProps);
    const elementRef = React.useRef(null);
    const otherProps = ObjectUtils.findDiffKeys(
        props,
        AvatarGroup.defaultProps
    );
    const className = classNames(
        'cs-avatar-group cs-component',
        props.className
    );

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current,
    }));

    return (
        <div
            ref={elementRef}
            className={className}
            style={props.style}
            {...otherProps}
        >
            {props.children}
        </div>
    );
});

AvatarGroup.displayName = 'AvatarGroup';
const defaultProps = {
    __TYPE: 'AvatarGroup',
    style: null,
    className: null,
};
