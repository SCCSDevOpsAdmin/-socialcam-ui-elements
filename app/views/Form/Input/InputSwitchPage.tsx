import React, { useState } from 'react';
import { InputSwitch } from 'src/elements';

const InputSwitchPage = () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <InputSwitch
                    checked={checked1}
                    onChange={(e) => setChecked1(e.value)}
                />

                <h5>Preselection</h5>
                <InputSwitch
                    checked={checked2}
                    onChange={(e) => setChecked2(e.value)}
                />
            </div>
        </div>
    );
};

export default InputSwitchPage;
