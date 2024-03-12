import React, { useState } from 'react';
import { Button, Dialog } from 'src/elements';
import './ImageModal.scss';

type Props = {};

function ImageModal(props: Props) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
        displayBasic2: setDisplayBasic2,
        displayModal: setDisplayModal,
        displayMaximizable: setDisplayMaximizable,
        displayPosition: setDisplayPosition,
        displayResponsive: setDisplayResponsive,
    };

    const actOnModal = (name: string, value: boolean) => {
        switch (name) {
            case 'displayBasic':
                setDisplayBasic(value);
                break;
            case 'displayBasic2':
                setDisplayBasic2(value);
                break;
            case 'displayModal':
                setDisplayModal(value);
                break;
            case 'displayMaximizable':
                setDisplayMaximizable(value);
                break;
            case 'displayPosition':
                setDisplayPosition(value);
                break;
            case 'displayResponsive':
                setDisplayResponsive(value);
                break;
            default:
                break;
        }
    };
    const onClick = (name: string, position?: string) => {
        actOnModal(name, true);
        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name: string) => {
        actOnModal(name, false);
    };

    const renderFooter = (name: string) => {
        return (
            <div>
                <Button
                    label="No"
                    icon="csi csi-times"
                    onClick={() => onHide(name)}
                    variant="raised"
                    className="cs-button-text"
                />
                <Button
                    label="Yes"
                    icon="csi csi-check"
                    onClick={() => onHide(name)}
                    variant="raised"
                    autoFocus
                />
            </div>
        );
    };

    return (
        // <div>
        //     <Button onClick={setClick} variant='outlined' className='main'>Start Testing the Dialog</Button>
        //     {clicked &&
        //     <Dialog className="p-dialog-titlebar-icon p-link" header="Header" visible={true} modal style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
        //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        //         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        //         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        //         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        //     </Dialog>}
        // </div>
        <div className="dialog-demo">
            <div className="card">
                <h5>Basic</h5>
                <Button
                    label="Show"
                    icon="csi csi-external-link"
                    onClick={() => onClick('displayBasic')}
                />
                <Dialog
                    header="Header"
                    visible={displayBasic}
                    style={{
                        display: 'flex',
                        position: 'fixed',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                    }}
                    footer={renderFooter('displayBasic')}
                    onHide={() => onHide('displayBasic')}
                    position={position}
                >
                    <p>{sampleText}</p>
                </Dialog>

                <Button
                    label="Long Content"
                    icon="csi csi-external-link"
                    onClick={() => onClick('displayBasic2')}
                />
                <Dialog
                    header="Header"
                    visible={displayBasic2}
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayBasic2')}
                    onHide={() => onHide('displayBasic2')}
                >
                    <p>{sampleText}</p>
                    <br />
                    <p>{sampleText}</p>
                    <br />
                    <p>{sampleText}</p>
                    <br />
                    <p>{sampleText}</p>
                    <br />
                    <p>{sampleText}</p>
                    <br />
                    <p>{sampleText}</p>
                    <br />
                </Dialog>

                <h5>Without Modal</h5>
                <Button
                    label="Show"
                    icon="csi csi-external-link"
                    onClick={() => onClick('displayModal')}
                />
                <Dialog
                    header="Header"
                    visible={displayModal}
                    modal={false}
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayModal')}
                    onHide={() => onHide('displayModal')}
                >
                    <p className="m-0">{sampleText}</p>
                </Dialog>

                <h5>Responsive</h5>
                <Button
                    label="Show"
                    icon="csi csi-external-link"
                    onClick={() => onClick('displayResponsive')}
                />
                <Dialog
                    header="Header"
                    visible={displayResponsive}
                    onHide={() => onHide('displayResponsive')}
                    breakpoints={{ '960px': '75vw' }}
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayResponsive')}
                    secondaryButton={true}
                    onSecondaryButtonClick={() => {
                        alert('done!');
                    }}
                >
                    <p>{sampleText}</p>
                </Dialog>

                <h5>Maximizable</h5>
                <Button
                    label="Show"
                    icon="csi csi-external-link"
                    onClick={() => onClick('displayMaximizable')}
                />
                <Dialog
                    header="Header"
                    visible={displayMaximizable}
                    maximizable
                    modal
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayMaximizable')}
                    onHide={() => onHide('displayMaximizable')}
                >
                    <p className="m-0">{sampleText}</p>
                </Dialog>
            </div>
        </div>
    );
}

export default ImageModal;

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.`;
