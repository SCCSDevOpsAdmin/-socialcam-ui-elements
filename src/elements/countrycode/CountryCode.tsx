import React, { useEffect, useState } from 'react';
import { ObjectUtils } from 'src/utils/Utils';
import { InputText } from '../inputtext/InputText';
import { Dropdown } from '../dropdown/Dropdown';
//import jsonData from './country_dial_info.json';
import FlagData from './country_dial_info';
import * as flags from './flags';

export enum CountryCodeMode {
    PhoneInput= 'Phone Input',
    LanguageSwitcher= 'Language Switcher'
}

export interface CountryCodeProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'onInput' | 'ref'
    > {
    children?: React.ReactNode;
    options?: string[];
    mode?: CountryCodeMode;
    env?: string;
    nativeLanguage?: string;
    languageChanged?: (selectedLanguage: string) => void;
}

interface CountryCodeInfo {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
    nativeName?: string;
}

const defaultProps = {};

const getLangObj = (language: string) => {
    return FlagData.find(el => el.code === language);
}

export const CountryCode = React.memo(
    React.forwardRef((props: CountryCodeProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [phoneCountrySelection, setPhoneCountrySelection] = useState<string>('');
        const [languageCountrySelection, setLanguageCountrySelection] = useState<CountryCodeInfo>(getLangObj(props.nativeLanguage));
        const [phoneNumber, setPhoneNumber] = useState('');

        const [optionData, setOptionData] = useState<CountryCodeInfo[]>([]);
        const optionTemplateData = (option: any) => {
            let flagURL = FlagData.find(
                ({ code }) => code === option.code
            ).flag;
            return (
                <div>
                    <img
                        src={`${flags[option.code]}`}
                        alt={option.code}
                        height="20"
                        width="30"
                    />
                    <span>{props.mode === CountryCodeMode.PhoneInput ? option.name : option.nativeName}</span>
                </div>
            );
        };

        const selectedCountryTemplate = (option: any) => {
            return (
                <>
                {option && (
                    <img
                        src={`${flags[option.code]}`}
                        alt={option.code}
                        height="20"
                        width="30"
                    />
                )}
                </>
            );
        }

        const setOptions = (options: string[]) => {
            var x = FlagData.filter(el => options.includes(el.code))
            return x;
        };

        useEffect(() => {
            let options = setOptions(props.options);
            setOptionData(options);
        }, []);

        const handlePhoneSelection = (selectedCountry: any) => {
            setPhoneCountrySelection(selectedCountry);
            let dialCode = FlagData.find(
                ({ code }) => code === selectedCountry.code
            ).dial_code;
            let codeModified = '(' + dialCode + ')' + ' ';
            setPhoneNumber(codeModified);
        };

        const handleLanguageSelection = (selectedLanguage: any) => {
            setLanguageCountrySelection(selectedLanguage);
            props.languageChanged(selectedLanguage.code);
        }

        return (
            <>
                {props.mode === CountryCodeMode.PhoneInput && <>
                    {props.env==='test' && <h1>Phone input with Country Code</h1>}
                    <div className="cs-component">
                        <Dropdown
                            id="pref-language-select"
                            placeholder="Select country"
                            value={phoneCountrySelection}
                            options={optionData}
                            itemTemplate={optionTemplateData}
                            optionLabel="name"
                            filter
                            filterBy="name"
                            onChange={(e: any) => handlePhoneSelection(e.target.value)}
                        />
                        <InputText
                            id="phone-number"
                            placeholder="ex. 6987654321 or 2109595555"
                            onChange={(e: any) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />
                    </div>
                </>}
                {props.mode === CountryCodeMode.LanguageSwitcher && <>
                    {props.env==='test' && <h1>Language Switcher</h1>}
                        <Dropdown
                            id="language-switcher"
                            className="lang-switcher"
                            value={languageCountrySelection}
                            options={optionData}
                            valueTemplate={selectedCountryTemplate}
                            itemTemplate={optionTemplateData}
                            optionLabel="name"
                            onChange={(e: any) => handleLanguageSelection(e.target.value)}
                        />
                </>}
            </>
        );
    })
);

export default CountryCode;

// {/* <div className="lang-switcher">
//     <div className="lang-menu">
//         <div className="lang-option">
//             {/* {optionTemplateData} */}
//             <span className="lang-label">
//                 {optionData[countrySelection]?.nativeName}
//             </span>
//         </div>
//         <div className="lang-menu-container">
//             <div className="lang-option-menu">
//                 {optionData.map((lng: CountryCodeInfo, index) => (
//                     <div
//                         key={`lng-item-${index}`}
//                         className={'lang-option'}
//                         style={{
//                             fontWeight:
//                                 countrySelection === lng.code
//                                     ? 'bold'
//                                     : 'normal',
//                         }}
//                         onClick={() => {
//                             setCountrySelection(lng.code);
//                         }}
//                     >
//                         {/* <img
//                             className="flag"
//                             src={lng.flag}
//                             alt="flag"
//                         /> */}
//                         <span className="lang-label">
//                             {lng.nativeName}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </div>
// </div> */}