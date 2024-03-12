import React, { ReactNode, useState } from 'react';
import { SidebarPositionType } from 'src/elements/sidebar/types';

export const AppContext = React.createContext<IAppContext | null>(null);
export const getAppStateContext = () => {
    return AppContext;
};

type Props = {
    children: ReactNode;
};
export interface IAppContext {
    sidebarPosition: SidebarPositionType;
    changeSidebarPosition: any;
    sidebarVisible: boolean;
    openSidebar: any;
    closeSidebar: any;
    configDialogVisible: boolean;
    openConfigDialog: any;
    closeConfigDialog: any;
}

export default function AppStatusProvider(props: Props) {
    const { children } = props;
    const AppStateContext = getAppStateContext();

    const [sidebarPosition, setSidebarPosition] =
        useState<SidebarPositionType>('left');

    const changeSidebarPosition = (option: SidebarPositionType) => {
        setSidebarPosition(option);
    };

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const openSidebar = () => setSidebarVisible(true);
    const closeSidebar = () => setSidebarVisible(false);

    const [configDialogVisible, setConfigDialogVisible] = useState(false);
    const openConfigDialog = () => setConfigDialogVisible(true);
    const closeConfigDialog = () => setConfigDialogVisible(false);

    let context: IAppContext = {
        sidebarPosition,
        changeSidebarPosition,
        sidebarVisible,
        openSidebar,
        closeSidebar,
        configDialogVisible,
        openConfigDialog,
        closeConfigDialog,
    };
    return (
        <AppStateContext.Provider value={context}>
            {children}
        </AppStateContext.Provider>
    );
}
