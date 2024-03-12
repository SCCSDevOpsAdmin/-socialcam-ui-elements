import React, { useRef } from 'react';
import { TieredMenu, Button, Menu } from 'src/elements';

type Props = {};
const TieredMenuPage: React.FC<Props> = (props: Props) => {
    const menu = useRef(null);
    const tmenu = useRef(null);
    const mitems = [
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
    ];
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
            <div className="card">
                <h5>Inline</h5>
                <TieredMenu model={items} />

                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <div>
                    <Menu
                        model={mitems}
                        popup={true}
                        ref={menu}
                        id="overlay_menu"
                        appendTo={'self'}
                    />
                    <Button
                        label="Show"
                        icon="csi csi-bars"
                        onClick={(event) => menu.current.toggle(event)}
                        aria-haspopup
                        aria-controls="overlay_menu"
                    />
                </div>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <h5>Overlay</h5>
                <div className="menu-container">
                    <TieredMenu
                        model={items}
                        popup
                        ref={tmenu}
                        id="overlay_tmenu"
                        className="cs-menu"
                        appendTo={'self'}
                    />
                    <Button
                        label="Show"
                        icon="csi csi-bars"
                        onClick={(event) => tmenu.current.toggle(event)}
                        aria-haspopup
                        aria-controls="overlay_tmenu"
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(TieredMenuPage);
