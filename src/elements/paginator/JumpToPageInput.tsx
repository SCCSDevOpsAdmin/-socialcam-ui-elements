import * as React from 'react';
import { InputText } from '../inputtext/InputText';
import { ObjectUtils } from 'src/utils/Utils';

export const JumpToPageInput = React.memo((props: any) => {
    const onChange = (event) => {
        if (props.onChange) {
            props.onChange(props.rows * (event.value - 1), props.rows);
        }
    };

    const value = props.pageCount > 0 ? props.page + 1 : 0;
    const element = (
        <InputText
            value={value}
            onChange={onChange}
            className="cs-paginator-page-input"
            disabled={props.disabled}
        />
    );

    if (props.template) {
        const defaultOptions = {
            value,
            onChange: onChange,
            disabled: props.disabled,
            className: 'cs-paginator-page-input',
            element,
            props,
        };

        return ObjectUtils.getJSXElement(props.template, defaultOptions);
    }

    return element;
});

JumpToPageInput.displayName = 'JumpToPageInput';
const defaultProps = {
    __TYPE: 'JumbToPageInput',
    page: null,
    rows: null,
    pageCount: null,
    disabled: false,
    template: null,
    onChange: null,
};
