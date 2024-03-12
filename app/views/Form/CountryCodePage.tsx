import React, { useState } from 'react';
import {
    Dropdown,
    InputText,
    MultiSelect,
    PhoneNumberInput,
} from 'src/elements';
// import { CountryCode, CountryCodeMode } from 'src/elements';

type Props = {};

const CountryCodePage = (props: Props) => {
    // const onLanguageChanged = (selectedLanguage: string) => {
    //     console.log(selectedLanguage)
    // }
    const [username, setUsername] = useState('');
    const onUsernameChange = (val) => {
        setUsername(val);
    };
    const validateUsername = () => {
        console.log(username);
    };
    const list = [
        { label: 'Australia', value: 'AU' },
        { label: 'Brazil', value: 'BR' },
        { label: 'China', value: 'CN' },
        { label: 'Egypt', value: 'EG' },
        { label: 'France', value: 'FR' },
        { label: 'Germany', value: 'DE' },
        { label: 'India', value: 'IN' },
        { label: 'Japan', value: 'JP' },
        { label: 'Spain', value: 'ES' },
        { label: 'United States', value: 'US' },
    ];
    return (
        <div className="flex-col-start-center gap-20">
            <div className="zavara">
                <PhoneNumberInput
                    placeholder="placehodler"
                    onChange={(e) => {
                        onUsernameChange(e);
                    }}
                    value={username}
                    onBlur={() => {
                        validateUsername();
                    }}
                />
            </div>
            <div>
                <InputText />
            </div>
            <div>
                <MultiSelect options={list} />
            </div>
            <div>
                <Dropdown options={list} />
            </div>
            {/* <CountryCode options={['GR','GB','US']} mode={CountryCodeMode.PhoneInput} env='test'/>
            <CountryCode options={['GR','GB']} mode={CountryCodeMode.LanguageSwitcher} env='test' nativeLanguage='GR' languageChanged={onLanguageChanged}/> */}
        </div>
    );
};

export default CountryCodePage;
