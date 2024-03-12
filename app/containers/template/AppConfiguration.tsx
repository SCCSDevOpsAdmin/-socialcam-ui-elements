import {
    getAppStateContext,
    IAppContext,
} from 'app/providers/AppStateProvider';
import React, { useContext, useState } from 'react';
import { Dialog, Dropdown } from 'src/elements';
import { SidebarPositionType } from 'src/elements/sidebar/types';

type Props = {};

const AppConfiguration = (props: Props) => {
    const {
        sidebarPosition,
        changeSidebarPosition,
        configDialogVisible,
        closeConfigDialog,
    }: IAppContext = useContext(getAppStateContext());

    const sidebarOptions = [
        { label: 'left', value: 'left' },
        { label: 'right', value: 'right' },
        { label: 'top', value: 'top' },
        { label: 'bottom', value: 'bottom' },
    ];
    return (
        <>
            <Dialog
                header={'Application Configuration'}
                visible={configDialogVisible}
                onHide={() => closeConfigDialog()}
                draggable={false}
                resizable={false}
                maximizable={true}
                maximized={false}
                position={'center'}
                style={{ minWidth: '45%' }}
            >
                <div className="flex-col">
                    <div className="field">
                        <label className="block">App Sidebar Position</label>
                        <Dropdown
                            value={sidebarPosition}
                            options={sidebarOptions}
                            onChange={(e: any) =>
                                changeSidebarPosition(
                                    e.value as SidebarPositionType
                                )
                            }
                            optionLabel="label"
                            placeholder="Select Sidebar position"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default React.memo(AppConfiguration);
