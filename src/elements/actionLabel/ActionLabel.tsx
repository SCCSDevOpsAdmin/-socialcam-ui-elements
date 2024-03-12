import * as React from 'react';
import { ObjectUtils } from 'src/utils/Utils';
import { ActionLabelProps } from './types';
import './ActionLabel.scss';

export const ActionLabel = React.forwardRef((props: ActionLabelProps, ref?) => {
    props = ObjectUtils.initProps(props, defaultProps);

    const clickHandler = (e: any) => {
        if(props.value && props.value.length > 0) {
            props.onClear(e);
            props.label = props.selectLabel;
        } else {
            props.onSelect(e);
            props.label = props.clearLabel;
        }
    }

    return (
        <span
            className="cs-text-t2 cs-color-primary on-hover-link"
            onClick={(e: any) => clickHandler(e)}
        >
            {props.label}
        </span>
    );
});

ActionLabel.displayName = 'ActionLabel';
const defaultProps = {
    __TYPE: 'ActionLabel',
    onSelect: null,
    onClear: null,
    selectLabel: '',
    clearLabel: ''
};
