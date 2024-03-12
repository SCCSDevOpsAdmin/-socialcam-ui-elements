import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Button } from 'src/elements';
import { AppRoutes as navItems } from 'app/Routes';
import { SidebarPositionType } from 'src/elements/sidebar/types';

const positionOptions: string[] = ['top', 'bottom', 'left', 'right'];

const SidebarPage = () => {
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('left');

    const sidebarPositionToggler = (option: string) => {
        setSelectedPosition(option);
    };

    return (
        <div>
            <div className="card">
                <div>
                    {positionOptions.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                label={item}
                                onClick={() => sidebarPositionToggler(item)}
                            />
                        );
                    })}
                </div>

                <Button
                    label={`Open Sidebar-${selectedPosition}`}
                    onClick={() => setVisible1(true)}
                />

                <Sidebar
                    visible={visible}
                    position={selectedPosition as SidebarPositionType}
                    fullScreen={visibleFullScreen}
                    headerTitle='header'
                    onHide={() => setVisible(false)}
                    secondaryButton="cs-sidebar-header-secondary-icon csi csi-arrow-left"
                    onSecondaryButtonClick={() => {console.log('done!')}}
                >
                    <>
                        <h1>This is sidebar</h1>
                        <div>
                            <ul>
                                {navItems.map((item, index) => {
                                    return (
                                        <li
                                            key={`nav-${index}`}
                                            onClick={() =>
                                                navigate(item.routePath)
                                            }
                                        >
                                            {item.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                </Sidebar>

                <Sidebar
                    visible={visible1}
                    position={selectedPosition as SidebarPositionType}
                    fullScreen={visibleFullScreen}
                    headerTitle='header'
                    onHide={() => setVisible1(false)}
                    secondaryButton="cs-sidebar-header-secondary-icon csi csi-arrow-left"
                    onSecondaryButtonClick={() => {console.log('done!')}}
                >
                    <>
                        <h1>This is sidebar</h1>
                        <div>
                            <ul>
                                {navItems.map((item, index) => {
                                    return (
                                        <li
                                            key={`nav-${index}`}
                                            onClick={() =>
                                                navigate(item.routePath)
                                            }
                                        >
                                            {item.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                </Sidebar>

                <Button
                    icon="csi csi-th-large"
                    onClick={() => setVisibleFullScreen(true)}
                    className="mr-2"
                />
            </div>
        </div>
    );
};

export default SidebarPage;
