import * as React from 'react';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { ToolbarProps } from './types';
import './Toolbar.scss';

export const Toolbar = React.memo(
    React.forwardRef((props: ToolbarProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef(null);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const toolbarClass = classNames(
            'cs-toolbar cs-component',
            props.className
        );
        const left = ObjectUtils.getJSXElement(props.left, props);
        const right = ObjectUtils.getJSXElement(props.right, props);

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current,
        }));

        return (
            <div
                id={props.id}
                ref={elementRef}
                className={toolbarClass}
                style={props.style}
                role="toolbar"
                {...otherProps}
            >
                <div className="cs-toolbar-group-left">{left}</div>
                <div className="cs-toolbar-group-right">{right}</div>
            </div>
        );
    })
);

Toolbar.displayName = 'Toolbar';
const defaultProps = {
    __TYPE: 'Toolbar',
    id: null,
    style: null,
    className: null,
    left: null,
    right: null,
};
