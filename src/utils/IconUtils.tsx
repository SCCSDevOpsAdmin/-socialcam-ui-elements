import * as React from 'react';
import { ButtonProps } from 'src/elements/buttons/Button';
import { classNames } from './ClassNames';
import ObjectUtils from './ObjectUtils';
import { IconType } from './types';

export default class IconUtils {
    static getJSXIcon(
        icon: IconType<any>,
        iconProps: React.HTMLProps<HTMLElement> = {},
        options: any = {}
    ): any {
        let content: IconType<ButtonProps> = null;

        if (icon !== null) {
            const iconType = typeof icon;
            const className = classNames(
                iconProps.className,
                iconType === 'string' && icon
            );
            content = <span {...iconProps} className={className}></span>;

            if (iconType !== 'string') {
                const defaultContentOptions = {
                    iconProps: iconProps,
                    element: content,
                    ...options,
                };

                return ObjectUtils.getJSXElement(icon, defaultContentOptions);
            }
        }

        return content;
    }
}
