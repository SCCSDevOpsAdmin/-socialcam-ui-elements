import React, { useState } from 'react';
import { InputTextArea } from 'src/elements';

const InputTextAreaPage = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <InputTextArea
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    rows={5}
                    cols={30}
                />

                <h5>Auto Resize</h5>
                <InputTextArea
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    rows={5}
                    cols={30}
                    autoResize
                />

                <h5>Disabled</h5>
                <InputTextArea value={value3} rows={5} cols={30} disabled />
            </div>
        </div>
    );
};

export default InputTextAreaPage;
