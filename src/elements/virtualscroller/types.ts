import * as React from 'react';

export type VirtualScrollerItemsType = any[] | any[][] | undefined | null;

export type VirtualScrollerItemSizeType = number | number[];

export type VirtualScrollerOrientationType = 'vertical' | 'horizontal' | 'both';

export type VirtualScrollerScrollBehavior = 'auto' | 'smooth';

export type VirtualScrollerToType = 'to-start' | 'to-end';

export type VirtualScrollerLoadingTemplateType =
    | React.ReactNode
    | ((options: VirtualScrollerLoadingTemplateOptions) => React.ReactNode);

export type VirtualScrollerItemTemplateType =
    | React.ReactNode
    | ((item: any, options: VirtualScrollerTemplateOptions) => React.ReactNode);

export type VirtualScrollerContentTemplateType =
    | React.ReactNode
    | ((options: VirtualScrollerContentTemplateOptions) => React.ReactNode);

export type VirtualScrollerStateType = number | VirtualScrollerState;

export type VirtualScrollerToIndexType = number | number[];

export interface VirtualScrollerOptionsType {
    left: number;
    top: number;
    behavior: VirtualScrollerScrollBehavior;
}

export interface VirtualScrollerViewportRenderedRange {
    first: number;
    last: number;
}

export interface VirtualScrollerRenderedRange {
    first: number;
    last: number;
    viewport: VirtualScrollerViewportRenderedRange;
}

export interface VirtualScrollerState {
    rows: number;
    cols: number;
}

export interface VirtualScrollerTemplateOptions {
    index: number;
    count: number;
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
    props: VirtualScrollerProps;
}

export interface VirtualScrollerLoadingTemplateOptions
    extends VirtualScrollerTemplateOptions {
    numCols: number;
    [key: string]: any;
}

export interface VirtualScrollerContentTemplateOptions {
    className: string;
    contentRef: any;
    spacerRef: any;
    stickyRef: any;
    items: VirtualScrollerItemsType;
    getItemOptions(index: number): VirtualScrollerTemplateOptions;
    children: any;
    element: JSX.Element;
    props: VirtualScrollerProps;
    loading: boolean;
    getLoaderOptions(
        index: number,
        ext?: object
    ): VirtualScrollerLoadingTemplateOptions;
    loadingTemplate: VirtualScrollerLoadingTemplateType;
    itemSize: VirtualScrollerItemSizeType;
    rows: any[];
    columns: any[];
    vertical: boolean;
    horizontal: boolean;
    both: boolean;
}

export interface VirtualScrollerChangeParams {
    first: VirtualScrollerStateType;
    last: VirtualScrollerStateType;
}

export interface VirtualScrollerLazyParams
    extends VirtualScrollerChangeParams {}

export interface VirtualScrollerProps {
    id?: string;
    style?: object;
    className?: string;
    items?: VirtualScrollerItemsType;
    itemSize?: VirtualScrollerItemSizeType;
    scrollHeight?: string;
    scrollWidth?: string;
    orientation?: VirtualScrollerOrientationType;
    numToleratedItems?: number;
    delay?: number;
    lazy?: boolean;
    disabled?: boolean;
    loaderDisabled?: boolean;
    columns?: any;
    loading?: boolean;
    showSpacer?: boolean;
    showLoader?: boolean;
    loadingTemplate?: VirtualScrollerLoadingTemplateType;
    itemTemplate?: VirtualScrollerItemTemplateType;
    contentTemplate?: VirtualScrollerContentTemplateType;
    onScroll?(e: React.UIEvent<HTMLElement>): void;
    onScrollIndexChange?(e: VirtualScrollerChangeParams): void;
    onLazyLoad?(e: VirtualScrollerLazyParams): void;
    children?: React.ReactNode;
}

export declare class VirtualScroller extends React.Component<
    VirtualScrollerProps,
    any
> {
    public scrollTo(options: VirtualScrollerOptionsType): void;
    public scrollToIndex(
        index: VirtualScrollerToIndexType,
        behavior?: VirtualScrollerScrollBehavior
    ): void;
    public scrollInView(
        index: VirtualScrollerToIndexType,
        to: VirtualScrollerToType,
        behavior?: VirtualScrollerScrollBehavior
    ): void;
    public getRenderedRange(): VirtualScrollerRenderedRange;
}
