import * as React from 'react';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import { AvatarProps } from './types';
import './Avatar.scss';

export const Avatar = React.forwardRef((props: AvatarProps, ref?) => {
    props = ObjectUtils.initProps(props, defaultProps);
    const elementRef = React.useRef(null);

    const createContent = () => {
        if (props.image) {
            return (
                <img
                    src={props.image}
                    alt={props.imageAlt}
                    onError={props.onImageError}
                    onContextMenu={(e: any) => {
                        if(props.disableRightClick) {
                            e.preventDefault();
                            if(e.button == 2) { return false }
                        }
                    }}
                ></img>
            );
        } else if (props.label) {
            return <span className="cs-avatar-text">{props.label}</span>;
        } else if (props.icon) {
            return IconUtils.getJSXIcon(
                props.icon,
                { className: 'cs-avatar-icon' },
                { props }
            );
        }

        return null;
    };

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current,
    }));

    const otherProps = ObjectUtils.findDiffKeys(props, Avatar.defaultProps);
    const containerClassName = classNames(
        'cs-avatar cs-component',
        {
            'cs-avatar-image': props.image != null,
            'cs-avatar-circle': props.shape === 'circle',
            'cs-avatar-lg': props.size === 'large',
            'cs-avatar-xl': props.size === 'xlarge',
            'cs-avatar-default': props.size === null,
            'cs-avatar-clickable': !!props.onClick,
        },
        props.className
    );

    const content = props.template
        ? ObjectUtils.getJSXElement(props.template, props)
        : createContent();

    return (
        <div
            ref={elementRef}
            className={containerClassName}
            style={props.style}
            {...otherProps}
        >
            {content}
            {props.children}
        </div>
    );
});

Avatar.displayName = 'Avatar';
const defaultProps = {
    __TYPE: 'Avatar',
    label: null,
    icon: null,
    image: null,
    size: null,
    shape: 'square',
    style: null,
    className: null,
    template: null,
    imageAlt: 'avatar',
    disableRightClick: false,
    onImageError: null,
};
