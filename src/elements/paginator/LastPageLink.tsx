import * as React from 'react';
import { Button } from '../buttons/Button';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const LastPageLink = React.memo((props: any) => {
    const className = classNames(
        'cs-paginator-last cs-paginator-element cs-link',
        { 'cs-disabled': props.disabled }
    );
    const iconClassName = 'cs-paginator-icon csi csi-angle-double-right';
    const element = (
        <Button
            type="button"
            className={className}
            icon={iconClassName}
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label="lastPageLabel"
        />
    );

    if (props.template) {
        const defaultOptions = {
            onClick: props.onClick,
            className,
            iconClassName,
            disabled: props.disabled,
            element,
            props,
        };

        return ObjectUtils.getJSXElement(props.template, defaultOptions);
    }

    return element;
});

LastPageLink.displayName = 'LastPageLink';
const defaultProps = {
    __TYPE: 'LastPageLink',
    disabled: false,
    onClick: null,
    template: null,
};
