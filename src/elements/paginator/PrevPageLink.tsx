import * as React from 'react';
import { Button } from '../buttons/Button';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const PrevPageLink = React.memo((props: any) => {
    const className = classNames(
        'cs-paginator-prev cs-paginator-element cs-link',
        { 'cs-disabled': props.disabled }
    );
    const iconClassName = 'cs-paginator-icon csi csi-angle-left';
    const element = (
        <Button
            type="button"
            className={className}
            icon={iconClassName}
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label="previousPageLabel"
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

PrevPageLink.displayName = 'PrevPageLink';
const defaultProps = {
    __TYPE: 'PrevPageLink',
    disabled: false,
    onClick: null,
    template: null,
};
