import React from 'react';
import { classNames, IconUtils, ObjectUtils } from 'src/utils/Utils';
import { IconType, TemplateType } from '../../utils/types';

import './Chip.scss';

export interface ChipProps {
    label?: string;
    icon?: IconType<ChipProps>;
    image?: string;
    removable?: boolean;
    removeIcon?: string;
    className?: string;
    style?: object;
    template?: TemplateType<ChipProps>;
    imageAlt?: string;
    onImageError?(event: React.SyntheticEvent): void;
    onRemove?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export const Chip = React.memo(
    React.forwardRef((props: ChipProps, ref) => {
        const [visibleState, setVisibleState] = React.useState(true);

        const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
            if (event.key === '13') {
                // enter
                close(event);
            }
        };
        const close = (event: any) => {
            setVisibleState(false);

            if (props.onRemove) {
                props.onRemove(event);
            }
        };

        const createContent = () => {
            let content = [];

            if (props.image) {
                content.push(
                    <img
                        key="image"
                        src={props.image}
                        alt={props.imageAlt}
                        onError={props.onImageError}
                    ></img>
                );
            } else if (props.icon) {
                content.push(
                    IconUtils.getJSXIcon(
                        props.icon,
                        { key: 'icon', className: 'cs-chip-icon' },
                        { props }
                    )
                );
            }

            if (props.label) {
                content.push(
                    <span key="label" className="cs-chip-text">
                        {props.label}
                    </span>
                );
            }

            if (props.removable) {
                content.push(
                    IconUtils.getJSXIcon(
                        props.removeIcon,
                        {
                            key: 'removeIcon',
                            tabIndex: 0,
                            className: 'cs-chip-remove-icon',
                            onClick: close,
                            onKeyDown,
                        },
                        { props }
                    )
                );
            }

            return content;
        };
        const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
        const className = classNames(
            'cs-chip cs-component',
            {
                'cs-chip-image': props.image != null,
            },
            props.className
        );
        const content = props.template
            ? ObjectUtils.getJSXElement(props.template, props)
            : createContent();

        return (
            <div className={className} style={props.style} {...otherProps}>
                {content}
            </div>
        );
    })
);

const defaultProps = {
    __TYPE: 'Chip',
    label: null,
    icon: null,
    image: null,
    removable: false,
    removeIcon: 'csi csi-times-circle',
    className: null,
    style: null,
    template: null,
    imageAlt: 'chip',
    onImageError: null,
    onRemove: null,
};
