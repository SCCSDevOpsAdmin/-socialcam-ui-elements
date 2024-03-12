import React, { FC } from 'react';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { AppRoutes } from 'app/Routes';
import Navbar from 'app/containers/sidebar/Navbar';
import { Outlet } from 'react-router-dom';
import AppStatusProvider from 'app/providers/AppStateProvider';
import AppConfiguration from './AppConfiguration';

type Props = {
    children?: any;
};

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <React.Fragment>
                <div className="layout-wrapper">
                    <div className="layout-header">
                        <AppHeader />
                    </div>
                    <div className="layout-container">
                        <div className="layout-sidebar">
                            <div className="sidebar">
                                <Navbar />
                            </div>
                        </div>
                        <div className="layout-main-content">
                            <div className="layout-content-inner">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <AppSidebar navItems={AppRoutes} />
                <AppConfiguration />
            </React.Fragment>
        </>
    );
};

export default React.memo(Layout);
