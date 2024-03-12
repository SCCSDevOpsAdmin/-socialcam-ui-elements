import React, { useState } from 'react';
import { Button, ConfirmDialog, Dialog } from 'src/elements';

type Props = {};
const DialogsPage: React.FC<Props> = () => {
    const visibleActions = {
        conf: false,
        test1: false,
        test2: false,
    };
    const [visible, setVisible] = useState(visibleActions);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const accept = () => {
        alert('confirm');
    };
    const reject = () => {
        alert('reject');
    };
    return (
        <>
            <ConfirmDialog
                visible={visible.conf}
                onHide={() => setVisible({ ...visibleActions, conf: false })}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="csi csi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />

            <Dialog
                visible={visible.test1}
                onHide={() => setVisible({ ...visibleActions, test1: false })}
                draggable={false}
                resizable={false}
                maximizable={false}
                header="Test Modal"
                position={'center'}
            >
                <div className="flex-col-stretch-center gap-10">
                    <div>
                        <span>Test message</span>
                    </div>
                    <Button
                        onClick={() =>
                            setVisible({ ...visibleActions, test1: false })
                        }
                        icon="csi csi-check"
                        label="Ok"
                    />
                </div>
            </Dialog>
            <Dialog
                visible={visible.test2}
                onHide={() => setVisible({ ...visibleActions, test2: false })}
                showHeader={false}
                position={'center'}
                footer={
                    <Button
                        onClick={() =>
                            setVisible({ ...visibleActions, test2: false })
                        }
                        icon="csi csi-check"
                        label="Ok"
                    />
                }
            >
                <div className="flex-col-stretch-center gap-10">
                    <div>
                        <span>Test2 message</span>
                    </div>
                    <Button
                        onClick={() =>
                            setVisible({ ...visibleActions, test2: false })
                        }
                        icon="csi csi-check"
                        label="Ok"
                    />
                </div>
            </Dialog>
            <Dialog
                visible={visible1}
                onHide={() => setVisible1(false)}
                header="zavarakatranemia hleos hleos "
            >
                <div>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                </div>
            </Dialog>
            <Dialog
                visible={visible2}
                onHide={() => setVisible2(false)}
                header="zavarakatranemia hleos hleos "
                footer={<span>Koulamuta</span>}
            >
                <div>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                    <span>Test</span>
                </div>
            </Dialog>
            <Button
                onClick={() => setVisible({ ...visibleActions, conf: true })}
                icon="csi csi-check"
                label="Confirm"
            />
            <Button
                onClick={() => setVisible({ ...visibleActions, test1: true })}
                icon="csi csi-check"
                label="Test 1"
            />
            <Button
                onClick={() => setVisible({ ...visibleActions, test2: true })}
                icon="csi csi-check"
                label="No Header Test 2"
            />
            <Button
                onClick={() => setVisible1(true)}
                icon="csi csi-check"
                label="NoFooter"
            />
            <Button
                onClick={() => setVisible2(true)}
                icon="csi csi-check"
                label="WithFooter"
            />
        </>
    );
};
export default DialogsPage;
