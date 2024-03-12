import React from 'react';
import { DateMask } from 'src/elements/datemask/DateMask';

type Props = {};

const DateMaskPage = (props: Props) => {
    const sampleDate_StringFormatted1 = '2012-12-16 12:00:24';
    const sampleDate1 = new Date('2019-12-04 12:00:24');
    const sampleDate2 = new Date('2023-07-05 00:23:24');
    const sampleDate_StringFormatted2 = '20230704';

    return (
        <>
            <div>
                <h3>Literal calculation of input date: 2019-12-04 12:00:24</h3>
                <DateMask date={sampleDate1} />
            </div>
            <div>
                <h3>
                    Literal calculation of input string: 2019-12-04 12:00:24
                </h3>
                <DateMask
                    date={sampleDate_StringFormatted1}
                    prefix="Active "
                    suffix=". Send message?"
                />
            </div>
            <div>
                <h3>
                    Literal calculation of input date: 2023-07-04 22:59:24 with
                    locale
                </h3>
                <DateMask date={sampleDate2} locale="el" />
            </div>
            <div>
                <h3>
                    Literal calculation of input string: 20111031 with locale
                </h3>
                <DateMask date={sampleDate_StringFormatted2} locale="el" />
            </div>
            <div>
                <h3>
                    Literal calculation of input string: 2023-07-05 00:23:24
                    with locale and delegation
                </h3>
                <DateMask date={sampleDate2} locale="el" />
            </div>
        </>
    );
};

export default DateMaskPage;
