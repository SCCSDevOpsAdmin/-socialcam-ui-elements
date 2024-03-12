import * as React from 'react';
import { Button } from '../buttons/Button';
import { classNames, ObjectUtils } from 'src/utils/Utils';

export const NextPageLink = React.memo((props: any) => {
    const className = classNames(
        'cs-paginator-next cs-paginator-element cs-link',
        { 'cs-disabled': props.disabled }
    );
    const iconClassName = 'cs-paginator-icon csi csi-angle-right';
    const element = (
        <Button
            type="button"
            className={className}
            icon={iconClassName}
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label="nextPageLabel"
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

NextPageLink.displayName = 'NextPageLink';
const defaultProps = {
    __TYPE: 'NextPageLink',
    disabled: false,
    onClick: null,
    template: null,
};
