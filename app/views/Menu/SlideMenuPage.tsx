import React, { useRef } from 'react';
import { Button, SlideMenu } from 'src/elements';

//import Head from 'next/head';

const SlideMenuDemo = () => {
    const menu = useRef(null);
    const items = [
        {
            label: 'File',
            icon: 'csi csi-fw csi-file',
            items: [
                {
                    label: 'New',
                    icon: 'csi csi-fw csi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'csi csi-fw csi-bookmark',
                        },
                        {
                            label: 'Video',
                            icon: 'csi csi-fw csi-video',
                        },
                    ],
                },
                {
                    label: 'Delete',
                    icon: 'csi csi-fw csi-trash',
                },
                {
                    separator: true,
                },
                {
                    label: 'Export',
                    icon: 'csi csi-fw csi-external-link',
                },
            ],
        },
        {
            label: 'Edit',
            icon: 'csi csi-fw csi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'csi csi-fw csi-align-left',
                },
                {
                    label: 'Right',
                    icon: 'csi csi-fw csi-align-right',
                },
                {
                    label: 'Center',
                    icon: 'csi csi-fw csi-align-center',
                },
                {
                    label: 'Justify',
                    icon: 'csi csi-fw csi-align-justify',
                },
            ],
        },
        {
            label: 'Users',
            icon: 'csi csi-fw csi-user',
            items: [
                {
                    label: 'New',
                    icon: 'csi csi-fw csi-user-plus',
                },
                {
                    label: 'Delete',
                    icon: 'csi csi-fw csi-user-minus',
                },
                {
                    label: 'Search',
                    icon: 'csi csi-fw csi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'csi csi-fw csi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'csi csi-fw csi-print',
                                },
                            ],
                        },
                        {
                            icon: 'csi csi-fw csi-bars',
                            label: 'List',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Events',
            icon: 'csi csi-fw csi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'csi csi-fw csi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'csi csi-fw csi-calendar-plus',
                        },
                        {
                            label: 'Delete',
                            icon: 'csi csi-fw csi-calendar-minus',
                        },
                    ],
                },
                {
                    label: 'Archieve',
                    icon: 'csi csi-fw csi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'csi csi-fw csi-calendar-minus',
                        },
                    ],
                },
            ],
        },
        {
            separator: true,
        },
        {
            label: 'Quit',
            icon: 'csi csi-fw csi-power-off',
        },
    ];

    return (
        <div>
            {/*<Head>
                <title>React SlideMenu Component</title>
                <meta
                    name="description"
                    content="SlideMenu displays submenus with a slide animation."
                />
            </Head>*/}
            <div className="content-section introduction">
                <div>
                    <h1>Slide Menu</h1>
                    <p>SlideMenu displays submenus with a slide animation.</p>
                </div>
            </div>

            <div className="content-section implementation">
                <div className="card">
                    <h5>Basic</h5>
                    <SlideMenu
                        model={items}
                        viewportHeight={220}
                        menuWidth={175}
                    ></SlideMenu>

                    <h5>Popup</h5>
                    <SlideMenu
                        ref={menu}
                        model={items}
                        popup
                        viewportHeight={220}
                        menuWidth={175}
                    ></SlideMenu>
                    <Button
                        type="button"
                        icon="csi csi-bars"
                        label="Show"
                        onClick={(event) => menu.current.toggle(event)}
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default SlideMenuDemo;
