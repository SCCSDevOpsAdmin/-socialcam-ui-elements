import React, { useState } from 'react';
import { Slider } from 'src/elements';
import { InputText } from 'src/elements';

const SliderPage = () => {
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(20);
    const [value4, setValue4] = useState(30.5);
    const [value5, setValue5] = useState<[number, number]>([20, 80]);
    const [value6, setValue6] = useState(50);

    return (
        <div className="slider-h">
            <div className="card">
                <h5>Basic: {value1}</h5>
                <Slider value={value1} onChange={(e) => setValue1(e.value)} />

                <h5>Input: {value2}</h5>
                <InputText
                    value={value2}
                    onChange={(e: any) => setValue2(e.target.value)}
                />
                <Slider
                    value={value2}
                    onChange={(e: any) => setValue2(e.value)}
                />

                <h5>Step: {value3}</h5>
                <Slider
                    value={value3}
                    onChange={(e: any) => setValue3(e.value)}
                    step={20}
                />

                <h5>Decimal Step: {value4}</h5>
                <Slider
                    value={value4}
                    onChange={(e: any) => setValue4(e.value)}
                    step={0.5}
                />

                <h5>
                    Range: [{value5[0]}, {value5[1]}]
                </h5>
                <Slider
                    value={value5}
                    onChange={(e: any) => setValue5(e.value)}
                    range
                />

                <h5>Vertical: {value6}</h5>
                <Slider
                    value={value6}
                    onChange={(e: any) => setValue6(e.value)}
                    orientation="vertical"
                />
            </div>
        </div>
    );
};

export default SliderPage;
