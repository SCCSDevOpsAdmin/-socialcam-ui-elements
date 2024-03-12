import * as React from 'react';
import { IconType } from '../../utils/types';

export interface CarouselPassThroughMethodOptions {
    props: CarouselProps;
    state: CarouselState;
}

/**
 * Defines current inline state in Carousel component.
 */
export interface CarouselState {
    /**
     * Number of items per page as a number.
     * @defaultValue 1
     */
    numVisible: number;
    /**
     * Number of items to scroll as a number.
     * @defaultValue 1
     */
    numScroll: number;
    /**
     * Index of the first item.
     * @defaultValue 0
     */
    page: number;
    /**
     * Total shifted items' count as a number.
     * @defaultValue 0
     */
    totalShiftedItems: number;
}

interface CarouselResponsiveOption {
    /**
     * The breakpoint to define the maximum width boundary.
     */
    breakpoint: string;
    /**
     * Number of items per page.
     */
    numVisible: number;
    /**
     * Number of items to scroll.
     */
    numScroll: number;
}

interface CarouselPageChangeEvent {
    /**
     * Value of the new page.
     */
    page: number;
}

/**
 * Defines valid properties in Carousel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */

export interface CarouselItemProps
    extends Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    key: number | string;
    template?(item: any): React.ReactNode | undefined;
    item: any;
    active: boolean;
    start: boolean;
    end: boolean;
}

export interface CarouselProps
    extends Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    /**
     * An array of objects to display.
     */
    value?: any[];
    /**
     * Index of the first item.
     */
    page?: number | undefined;
    /**
     * Label of header.
     */
    header?: React.ReactNode | undefined;
    /**
     * Label of footer.
     */
    footer?: React.ReactNode | undefined;
    /**
     * Function that gets an item in the value and returns the content for it.
     * @param {*} item - Current item
     */
    itemTemplate?(item: any): React.ReactNode | undefined;
    /**
     * Defines if scrolling would be infinite.
     * @defaultValue false
     */
    circular?: boolean | undefined;
    /**
     * Whether to display indicator container.
     * @defaultValue true
     */
    showIndicators?: boolean | undefined;
    /**
     * Whether to display navigation buttons in container.
     * @defaultValue true
     */
    showNavigators?: boolean | undefined;
    /**
     * Time in milliseconds to scroll items automatically.
     */
    autoplayInterval?: number | undefined;
    /**
     * Number of items per page.
     * @defaultValue 1
     */
    numVisible?: number | undefined;
    /**
     * Number of items to scroll.
     * @defaultValue 1
     */
    numScroll?: number | undefined;
    /**
     * Icon for the previous button by orientation.
     */
    prevIcon?: IconType<CarouselProps> | undefined;
    /**
     * Icon for the next button by orientation.
     */
    nextIcon?: IconType<CarouselProps> | undefined;
    /**
     * An array of options for responsive design.
     * @type {CarouselResponsiveOption}
     */
    responsiveOptions?: CarouselResponsiveOption[] | undefined;
    /**
     * Specifies the layout of the component, valid values are "horizontal" and "vertical".
     * @defaultValue horizontal
     */
    orientation?: 'vertical' | 'horizontal' | undefined;
    /**
     * Height of the viewport in vertical layout.
     * @defaultValue 300px
     */
    verticalViewPortHeight?: string | undefined;
    /**
     * Style class of main content.
     */
    contentClassName?: string | undefined;
    /**
     * Style class of the viewport container.
     */
    containerClassName?: string | undefined;
    /**
     * Style class of the paginator items.
     */
    indicatorsContentClassName?: string | undefined;
    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageChangeEvent} event - Custom change event.
     */
    onPageChange?(event: CarouselPageChangeEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {CarouselPassThroughOptions}
     */
}

export declare class Carousel extends React.Component<CarouselProps, any> {
    /**
     * Used to start the autoplay if it is currently stopped.
     */
    public startAutoplay(): void;
    /**
     * Used to stop the autoplay if it is currently started.
     */
    public stopAutoplay(): void;
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
