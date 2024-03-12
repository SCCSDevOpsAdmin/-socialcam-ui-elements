import React from 'react';

type Props = {};

const ColoringTest = (props: Props) => {
    const options = [
        'gradient',
        'primary',
        'secondary',
        'alternate',
        'black',
        'white',
        'gray-1',
        'gray-2',
        'gray-dark',
        'gray-light',
    ];

    return (
        <div className="flex-col justify-content-start">
            <h1>Colored Backgrounds</h1>
            <div className="flex-row gap-10">
                {options.map((color, index) => {
                    return (
                        <div
                            className={`cs-bg-${color}`}
                            style={{ width: '100px', height: '100px' }}
                        >
                            {color}
                        </div>
                    );
                })}
            </div>
            <h1>Text and Fonts</h1>
            <div className="flex-row gap-10">
                {options.map((color, index) => {
                    return (
                        <div
                            className={`cs-color-${color}`}
                            style={{ width: '100px', height: '100px' }}
                        >
                            {color}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ColoringTest;
