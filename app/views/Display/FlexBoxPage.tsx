import React from 'react';

type Props = {};

const FlexBoxPage = (props: Props) => {
    const justifyContentOptions = [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
    ];

    const alignContentOptions = [
        'start',
        'end',
        'center',
        'stretch',
        'baseline',
    ];
    const MyArray = [
        { content: 1, width: '50px', height: '100px' },
        { content: 2, width: '15px', height: '50px' },
        { content: 3, width: '25px', height: '75px' },
        { content: 4, width: '30px', height: '10px' },
        { content: 5, width: '70px', height: '20px' },
    ];
    return (
        <>
            <div
                style={{ width: '400px', padding: '10px', background: 'black' }}
                className="cs-card"
            >
                <div className="w-full cs-evenly-side-sections cs-evenly-wide-sides">
                    <div className="left side cs-card"></div>
                    <div className="cs-card">Section Center</div>
                    <div className="right side cs-card">
                        <span>Right</span>
                    </div>
                </div>
            </div>
            <div
                style={{ width: '400px', padding: '10px', background: 'black' }}
                className="cs-card"
            >
                <div className="w-full cs-evenly-side-sections">
                    <div className="cs-card">Section Center</div>
                </div>
            </div>

            <div className="flex-col cs-bg-white" style={{ width: '900px' }}>
                <h1>Flexbox guide</h1>
                {justifyContentOptions.map((just, indx) => {
                    return (
                        <>
                            {alignContentOptions.map((align, indy) => {
                                return (
                                    <div>
                                        <h1>
                                            {just}-{align}
                                        </h1>
                                        <div
                                            key={`fr-${just}-${align}`}
                                            className={`flex-row-${just}-${align} cs-bg-gray-light`}
                                        >
                                            {MyArray.map((item, index) => {
                                                return (
                                                    <span
                                                        key={`i-${item}-${index}`}
                                                        className="cs-bg-primary"
                                                        style={{
                                                            width: item.width,
                                                            minHeight:
                                                                item.height,
                                                        }}
                                                    >
                                                        {item.content}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default FlexBoxPage;
