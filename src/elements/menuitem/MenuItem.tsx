import React from 'react';

export interface MenuItemCommandParams {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
    index?: number;
}

export interface MenuItemOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    labelClassName: string;
    iconClassName: string;
    element: React.ReactNode;
    props: any;
}

export type MenuItemTemplateType =
    | React.ReactNode
    | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);

export interface MenuItem {
    label?: string;
    icon?: any;
    url?: string;
    items?: MenuItem[] | MenuItem[][];
    expanded?: boolean;
    disabled?: boolean;
    target?: string;
    separator?: boolean;
    style?: object;
    className?: string;
    command?(e: MenuItemCommandParams): void;
    template?: MenuItemTemplateType;
}
