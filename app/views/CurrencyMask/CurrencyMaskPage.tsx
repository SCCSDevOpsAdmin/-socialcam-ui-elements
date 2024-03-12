import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { InputNumber, InputText } from 'src/elements';
import { CurrencyMask } from 'src/elements/currencymask/CurrencyMask';

type Props = {};

const CurrencyMaskPage = (props: Props) => {
    const [valueNum, setValueNum] = useState<number>();
    const [valueStr, setValueStr] = useState<string>('');
    const testValues = [
        '12324.1412', //12.3k
        '12.324,1412', //invalid
        '123,1.123', //invalid
        '0.123', //0.12
        '0,1231', //invalid
        '4323.123', //4.3k
        '4,323.123', //invalid
        1251.3334334,
        11.1,
        150.15,
        150.165, //150.16
        150.9999999999, //150.99
    ];

    return (
        <>
            <div className="flex-col-stretch-start">
                <h2>Currency Mask Page</h2>
                <div className="flex-row-start-center">
                    <InputNumber
                        value={valueNum}
                        onChange={(e) => setValueNum(e.value)}
                    />
                    <CurrencyMask value={valueNum} locale="en" />
                </div>
                <div className="flex-row-start-center">
                    <InputText
                        value={valueStr}
                        onChange={(e) => setValueStr(e.target.value)}
                    />
                    <CurrencyMask
                        value={valueStr}
                        locale="en"
                        className="cs-text-h2 cs-color-primary"
                    />
                </div>
                ------------------------------------------
                {testValues.map((item) => {
                    return (
                        <>
                            <div className="flex-row-start-center">
                                <span className="cs-color-gray-1 cs-text-t2">
                                    {item}:&nbsp;
                                </span>
                                <CurrencyMask value={item} locale="en" />
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default CurrencyMaskPage;
