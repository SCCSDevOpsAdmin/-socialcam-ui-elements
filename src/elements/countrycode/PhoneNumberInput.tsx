import React from 'react';
import PhoneInput, { Country, FeatureProps } from 'react-phone-number-input';
import './PhoneNumberInput.scss';
import { classNames } from 'src/utils/Utils';

/**
 * @TODO extend with country code and events
 * @TODO apply validation using package hooks
 * */
interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'onChange' | 'ref'
    > {
    onChange?(e: any): void;
    value?: string;
    defaultCountry?: Country;
}

/**
 * Git hub Pludgin Repo https://www.npmjs.com/package/react-phone-number-input
 * Review Docs for custom input https://catamphetamine.gitlab.io/react-phone-number-input/
 * ISO Codes: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 */
export const PhoneNumberInput = React.memo(
    React.forwardRef(
        (
            { defaultCountry, onChange, className, value, ...rest }: Props,
            ref
        ) => {
            return (
                <PhoneInput
                    defaultCountry={defaultCountry}
                    className={classNames(
                        'cs-input-phonenumber',
                        className ?? ''
                    )}
                    onChange={onChange}
                    value={value}
                    {...rest}
                />
            );
        }
    )
);
