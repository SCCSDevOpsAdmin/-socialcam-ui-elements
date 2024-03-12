import React, { FC, useContext, useState } from 'react';
import {
    getAppStateContext,
    IAppContext,
} from 'app/providers/AppStateProvider';
import { Button } from 'src/elements';

const AppHeader = () => {
    const {
        sidebarVisible,
        sidebarPosition,
        openSidebar,
        openConfigDialog,
    }: IAppContext = useContext(getAppStateContext());
    return (
        <>
            <div className="flex-row align-items-center justify-content-between">
                <Button
                    icon="csi csi-bars"
                    className="cs-button-rounded"
                    onClick={() => openSidebar()}
                />
                <div>UI Template Sample application</div>
                <Button
                    icon={'csi csi-cog'}
                    className="cs-button-rounded"
                    onClick={() => openConfigDialog()}
                />
            </div>
        </>
    );
};

export default AppHeader;
