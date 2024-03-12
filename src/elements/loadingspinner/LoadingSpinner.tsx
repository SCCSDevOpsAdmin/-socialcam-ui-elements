import * as React from 'react';
import { ObjectUtils } from 'src/utils/Utils';
import { LoadingState, LoadingSpinnerProps } from './types';
import { isEmpty } from 'lodash';

export const LoadingSpinner = React.memo(
    React.forwardRef((props: LoadingSpinnerProps, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const elementRef = React.useRef(null);
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current,
        }));

        const loadingIcon = {
            pending: 'csi csi-spinner csi-spin',
            success: 'csi csi-check cs-color-success',
            fail: 'csi csi-times cs-color-danger',
        };
        function iconState(state: string | LoadingState) {
            state = isEmpty(state) ? defaultProps.state : state;
            let iconClass: string = loadingIcon[state];
            if (iconClass) return <i className={iconClass} />;
            return <></>;
        }
        return (
            <div ref={elementRef} {...otherProps}>
                {iconState(props.state)}
                <div>{props.label}</div>
            </div>
        );
    })
);

LoadingSpinner.displayName = 'LoadingSpinner';
const defaultProps = {
    label: '',
    state: LoadingState.loading,
    icon: 'csi csi-spinner csi-spin',
};
