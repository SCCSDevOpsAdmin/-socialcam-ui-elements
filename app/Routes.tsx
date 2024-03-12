import React from 'react';
import { ButtonsPage, DateMaskPage, SkeletonPage } from 'app/views';
import ImageModal from 'app/views/Media/ImageModal';
import CalendarPage from 'app/views/Form/CalendarPage';
import FileuploadPage from 'app/views/File/FileuploadPage';
import DropDownPage from 'app/views/Form/DropDownPage';
import CountryCodePage from 'app/views/Form/CountryCodePage';
import InputPasswords from 'app/views/Form/Input/InputPassword';
import InputNumberPage from 'app/views/Form/Input/InputNumberPage';
import PaginatorPage from 'app/views/Data/PaginatorPage';
import DataTablePage from 'app/views/Data/DataTablePage';
import SlideMenuPage from 'app/views/Menu/SlideMenuPage';
import CheckboxPage from 'app/views/Form/CheckboxPage';
import Home from 'app/views/Home';
import IconSetPage from 'app/views/Media/IconSetPage';
import TreePage from 'app/views/Menu/TreePage';
import InputSwitchPage from 'app/views/Form/Input/InputSwitchPage';
import InputTextAreaPage from 'app/views/Form/Input/InputTextAreaPage';
import RadioButtonPage from 'app/views/Form/RadioButtonPage';
import SliderPage from 'app/views/Form/SliderPage';
import FilterMenu from 'src/components/menu/FilterMenu';
import { AccordionPage } from 'app/views/Panel/AccordionPage';
import AvatarPage from 'app/views/Misc/AvatarPage';
import DialogsPage from 'app/views/Overlay/DialogsPage';
import LoadingPage from 'app/views/Data/LoadingPage';
import MultiSelectPage from 'app/views/Form/MultiSelectPage';
import SidebarPage from 'app/views/Overlay/SidebarPage';
import MapPage from 'app/views/Data/MapPage';
import InputTextPage from 'app/views/Form/Input/InputTextPage';
import TooltipPage from 'app/views/Misc/TooltipPage';
import ColoringTest from 'app/views/Sample/ColoringTest';
import FlexBoxPage from 'app/views/Display/FlexBoxPage';
import TieredMenuPage from 'app/views/Menu/TieredMenuPage';
import Swiper from './views/Media/Swiper';
import ToastPage from './views/Toast/ToastPage';
import ImageCropPage from './views/ImageCrop/ImageCropPage';
import CurrencyMaskPage from './views/CurrencyMask/CurrencyMaskPage';
import { RatingPage } from './views/Rating/RatingPage';
import { DataScrollerPage } from './views/DataScroller/DataScrollerPage';
import CarouselPage from './views/Carousel/CarouselPage';
import OverlayPanelPage from './views/Overlay/OverlayPanelPage';

export interface RouteElements {
    routePath: string;
    label: string;
    element?: JSX.Element;
    visible?: boolean;
}

export const AppRoutes: RouteElements[] = [
    { routePath: '/', label: 'Home', element: <Home /> },
    { routePath: '/buttons', label: 'Buttons', element: <ButtonsPage /> },
    { routePath: '/calendar', label: 'Calendar', element: <CalendarPage /> },
    { routePath: '/checkbox', label: 'Checkbox', element: <CheckboxPage /> },
    { routePath: '/dropdown', label: 'Dropdown', element: <DropDownPage /> },
    {
        routePath: '/inputpasswords',
        label: 'InputPasswords',
        element: <InputPasswords />,
    },
    { routePath: '/modals', label: 'Modals', element: <ImageModal /> },
    { routePath: '/dialogs', label: 'Dialogs', element: <DialogsPage /> },
    {
        routePath: '/fileupload',
        label: 'Fileupload',
        element: <FileuploadPage />,
    },
    {
        routePath: '/countryCode',
        label: 'CountryCode',
        element: <CountryCodePage />,
    },
    { routePath: '/paginator', label: 'Paginator', element: <PaginatorPage /> },
    {
        routePath: '/datatable',
        label: 'DataTablePaginator',
        element: <DataTablePage />,
    },
    { routePath: '/slideMenu', label: 'SlideMenu', element: <SlideMenuPage /> },
    {
        routePath: '/tieredMenu',
        label: 'TieredMenu',
        element: <TieredMenuPage />,
    },
    { routePath: '/iconset', label: 'Icon Set', element: <IconSetPage /> },
    { routePath: '/tree', label: 'Tree View', element: <TreePage /> },
    {
        routePath: '/inputSwitch',
        label: 'Input Switch',
        element: <InputSwitchPage />,
    },

    {
        routePath: '/inputText',
        label: 'InputText',
        element: <InputTextPage />,
    },

    {
        routePath: '/inputTextArea',
        label: 'InputTextArea',
        element: <InputTextAreaPage />,
    },
    {
        routePath: '/inputNumber',
        label: 'InputNumber',
        element: <InputNumberPage />,
    },
    {
        routePath: '/radioButton',
        label: 'Radio Button',
        element: <RadioButtonPage />,
    },
    {
        routePath: '/filterMenu',
        label: 'Filter Menu',
        element: <FilterMenu />,
    },
    { routePath: '/slider', label: 'Slider', element: <SliderPage /> },
    { routePath: '/accordion', label: 'Accordion', element: <AccordionPage /> },
    { routePath: '/avatar', label: 'Avatar', element: <AvatarPage /> },
    { routePath: '/loading', label: 'Loading', element: <LoadingPage /> },
    {
        routePath: '/multiselect',
        label: 'MultiSelect',
        element: <MultiSelectPage />,
    },
    {
        routePath: '/toasts',
        label: 'Toasts',
        element: <ToastPage />,
    },

    {
        routePath: '/sibebar',
        label: 'Sidebar',
        element: <SidebarPage />,
    },
    {
        routePath: '/tooltips',
        label: 'Tooltips',
        element: <TooltipPage />,
    },
    {
        routePath: '/maps',
        label: 'Google Maps',
        element: <MapPage />,
    },
    {
        routePath: '/coloring',
        label: 'ColoringTest',
        element: <ColoringTest />,
    },
    {
        routePath: '/flexbox',
        label: 'FlexBox',
        element: <FlexBoxPage />,
    },
    { routePath: '/swiper', label: 'Swiper', element: <Swiper /> },
    {
        routePath: '/image-crop',
        label: 'ImageCrop',
        element: <ImageCropPage />,
    },
    {
        routePath: '/currencymask',
        label: 'CurrencyMask',
        element: <CurrencyMaskPage />,
    },
    {
        routePath: '/skeleton',
        label: 'Skeleton',
        element: <SkeletonPage />,
    },
    {
        routePath: '/date-mask',
        label: 'DateMask',
        element: <DateMaskPage />,
    },
    {
        routePath: '/rating',
        label: 'Rating',
        element: <RatingPage />,
    },
    {
        routePath: '/data-scroller',
        label: 'DataScroller',
        element: <DataScrollerPage />,
    },
    {
        routePath: '/carousel',
        label: 'Carousel',
        element: <CarouselPage />,
    },
    {
        routePath: '/overlaypanel',
        label: 'OverlayPanel',
        element: <OverlayPanelPage />,
    },
];
