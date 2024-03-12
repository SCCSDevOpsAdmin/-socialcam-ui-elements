import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { localeOption } from 'src/api/Api';
import { localeOptions } from 'src/api/Api';

export interface CurrencyMaskProps {
    className?: string;
    value: string | number;
    locale?: string;
    invalidLabel?: string;
    onError?(ex: any): any;
}

export const CurrencyMask = ({
    value,
    locale,
    className,
    invalidLabel = '--',
    onError,
}: CurrencyMaskProps) => {
    const [formatted, setFormatted] = useState<string>('');

    useEffect(() => {
        if (typeof value === 'number' && _.isNumber(value)) {
            setFormatted(currencymask(value));
        } else if (typeof value === 'string' && !_.isEmpty(value)) {
            setFormatted(currencymask(value.trim()));
        } else setFormatted(currencymask(0));
    }, [value]);

    function currencymask(value: number | string): string {
        try {
            var output: number;
            var numberValue: number;

            if (typeof value == 'number') {
                numberValue = value;
            } else if (typeof value == 'string' && checkForChars(value)) {
                numberValue = parseFloat(value);
            } else {
                return invalidLabel;
            }

            if (numberValue <= 999) {
                return numberValue.toFixed().toString();
            } else if (numberValue >= 1000 && numberValue <= 9.9 * 10 ** 5) {
                output = 0.1 * Math.floor(numberValue / 100);
                return (
                    output.toFixed(1) + ' ' + localeOption('thousand', locale)
                );
            } else if (numberValue >= 10 ** 6 && numberValue <= 9.9 * 10 ** 8) {
                output = 0.1 * Math.floor(numberValue / 10 ** 5);
                return (
                    output.toFixed(1) + ' ' + localeOption('million', locale)
                );
            } else {
                output = 0.1 * Math.floor(numberValue / 10 ** 8);
                return (
                    output.toFixed(1) + ' ' + localeOption('billion', locale)
                );
            }
        } catch (ex) {
            if (onError) return onError(ex);
            else return invalidLabel;
        }
    }

    function checkForChars(input: string): boolean {
        const regex = /^[-+]?(\d+|\d+\.\d*|\.\d+)([eE][-+]?\d+)?$/;
        if (regex.test(input)) {
            return true;
        }
        return false;
    }

    function isFloat<T>(input: any, valueType: T): boolean {
        if (valueType == typeof Number) {
            return !_.isInteger(input);
        } else {
            let numberValue: number = parseFloat(input);
            return !_.isInteger(numberValue);
        }
    }

    return <div className={className ?? ''}>{formatted}</div>;
};
