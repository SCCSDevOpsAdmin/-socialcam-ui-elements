import React, { FC, useContext, useEffect, useState } from 'react';
import {
    getAppStateContext,
    IAppContext,
} from 'app/providers/AppStateProvider';
import { Sidebar } from 'src/elements';
import { SidebarPositionType } from 'src/elements/sidebar/types';
import Navbar from '../sidebar/Navbar';

const positionOptions: SidebarPositionType[] = [
    'top',
    'bottom',
    'left',
    'right',
];
type Props = {
    navItems?: any;
};
const AppSidebar: FC<Props> = (props) => {
    const app: IAppContext = useContext(getAppStateContext());
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    return (
        <>
            <Sidebar
                visible={app.sidebarVisible}
                position={app.sidebarPosition}
                fullScreen={visibleFullScreen}
                onHide={() => app.closeSidebar()}
            >
                <Navbar />
            </Sidebar>
        </>
    );
};

export default React.memo(AppSidebar);
