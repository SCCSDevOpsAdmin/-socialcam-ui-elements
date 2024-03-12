import * as React from 'react';

export interface DateMaskProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'onChange' | 'ref'
    > {
    date: string | Date;
    locale?: string;
    prefix?: string;
    suffix?: string;
}
