import React, { useState } from 'react';
import { NewWindow } from 'src/components';
import {
    Button,
    Dropdown,
    InputText,
    InputTextArea,
    Password,
    StatusElement,
} from 'src/elements';
import { AvatarName } from 'src/elements/avatarname/AvatarName';

type Props = {};
const Home: React.FC<Props> = () => {
    const [value1, setValue1] = useState('');
    const [value3, setValue3] = useState('');
    const [statusOpt, setStatusOpt] = useState<string>('OFFLINE');
    const [localeOpt, setLocaleOpt] = useState<string>('el');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const windowOptions = {
        width: 1000,
        height: 600,
        title: 'New Window',
        url: window.location.origin + `/call/sessionId`,
    };

    return (
        <>
            {isOpen && (
                <NewWindow
                    {...windowOptions}
                    onClose={() => alert('Implement on Close')}
                >
                    <div>Zazanka</div>
                </NewWindow>
            )}
            <div>
                <div>
                    <Button
                        label={isOpen ? 'close' : 'open'}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </div>
                <div>
                    <AvatarName url="https://sc-media-virginia.s3.amazonaws.com/bdc1e913-1299-41c6-b1a7-65b481091cae/profileImages/c55994cf-51e6-48b1-b4ed-051171605fe1.jpg?1703210757990" />
                </div>
                <div className="flex-row-center-start gap-10">
                    <span className="flex-col-start-center gap-5">
                        gap
                        <Dropdown
                            options={[
                                'OFFLINE',
                                'AWAY',
                                'ONLINE',
                                'LIVE',
                                'ON_BREAK',
                                'BUSY',
                                'UNKNOWN',
                            ]}
                            value={statusOpt}
                            onChange={(e) => {
                                setStatusOpt(e.target.value);
                            }}
                        />
                        <StatusElement status={statusOpt} locale={localeOpt} />
                    </span>
                    <span>gap</span>
                    <span>gap</span>
                </div>
                <div>
                    <h5>Show Password</h5>
                    <Password
                        value={value3}
                        locale="el"
                        onChange={(e) => setValue3(e.target.value)}
                        toggleMask
                    />
                </div>
                <div className="field">
                    <label htmlFor="username2" className="block">
                        Username
                    </label>
                    <InputText
                        id="username2"
                        aria-describedby="username2-help"
                        className="cs-invalid block"
                    />
                    <small id="username2-help" className="cs-error block">
                        Username is not available.
                    </small>
                </div>
                <label>Phone number or E-mail</label>
                <InputText placeholder="ex. 6987654321 or email@domain.com" />

                <br />
                <h5>Basic</h5>
                <InputTextArea
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    rows={5}
                    cols={30}
                    tooltip="Enter your desc"
                />
            </div>
        </>
    );
};

export default React.memo(Home);
