import classNames from 'classnames';
import React, { useState } from 'react';
import { InputNumber, InputText } from 'src/elements';

type Props = {};

const InputTextPage = (props: Props) => {
    const [state, setState] = useState({
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        validated: '',
    });

    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    function handleInputValidate(
        event: React.FormEvent<HTMLInputElement>,
        validatePattern: boolean
    ) {
        setIsValid(validatePattern);
    }
    const [valid, setIsValid] = useState<boolean>(true);
    return (
        <div>
            <div className="card">
                <h5>Validated</h5>
                <InputText
                    className={classNames({ 'cs-invalid': valid == false })}
                    value={state.validated}
                    onChange={(e) =>
                        setState({ ...state, validated: e.target.value })
                    }
                    onInput={handleInputValidate}
                />
                {valid == false && <span className="cs-invalid">invalid</span>}
            </div>
            <div className="card">
                <h5>Basic</h5>
                <InputText
                    value={state.value1}
                    onChange={(e) =>
                        setState({ ...state, value1: e.target.value })
                    }
                />
                <span className="ml-2">{state.value1}</span>

                <h5>Floating Label</h5>
                <span className="cs-float-label">
                    <InputText
                        id="username"
                        value={state.value2}
                        onChange={(e) =>
                            setState({ ...state, value2: e.target.value })
                        }
                    />
                    <label htmlFor="username">Username</label>
                </span>

                <h5>Left Icon</h5>
                <span className="cs-input-icon-left">
                    <i className="csi csi-search" />
                    <InputText
                        value={state.value3}
                        onChange={(e) =>
                            setState({ ...state, value3: e.target.value })
                        }
                        placeholder="Search"
                    />
                </span>

                <h5>Right Icon</h5>
                <span className="cs-input-icon-right">
                    <i className="csi csi-spin csi-spinner" />
                    <InputText
                        value={state.value4}
                        onChange={(e) =>
                            setState({ ...state, value4: e.target.value })
                        }
                    />
                </span>
                <h5>Right Icon</h5>
                <div className="field">
                    <label htmlFor="username1" className="block">
                        Username
                    </label>
                    <span className="cs-input-icon-right">
                        <i className="csi csi-spin csi-spinner" />
                        <InputText
                            value={state.value4}
                            onChange={(e) =>
                                setState({ ...state, value4: e.target.value })
                            }
                        />
                    </span>
                </div>

                <h5>Help Text</h5>
                <div className="field">
                    <label htmlFor="username1" className="block">
                        Username
                    </label>
                    <InputText
                        id="username1"
                        aria-describedby="username1-help"
                        className="block"
                    />
                    <small id="username1-help" className="block">
                        Enter your username to reset your password.
                    </small>
                </div>

                <h5>Invalid</h5>
                <div className="field">
                    <label htmlFor="username2" className="block">
                        Username
                    </label>
                    <InputText
                        id="username2"
                        aria-describedby="username2-help"
                        className="cs-invalid block"
                    />
                    <small id="username2-help" className="cs-error block">
                        Username is not available.
                    </small>
                </div>

                <h5>Disabled</h5>
                <InputText value={state.value5} disabled />

                <h5>Sizes</h5>
                <div className="sizes">
                    <InputText
                        type="text"
                        className="cs-inputtext-sm block mb-2"
                        placeholder="Small"
                    />
                    <InputText
                        type="text"
                        className="block mb-2"
                        placeholder="Normal"
                    />
                    <InputText
                        type="text"
                        className="cs-inputtext-lg block"
                        placeholder="Large"
                    />
                </div>

                <h5>Input Number</h5>
                {/* Height */}
                <div className="field">
                    <label htmlFor="Height" className="block">
                        Height
                    </label>
                    <InputNumber
                        id="Height"
                        className=""
                        placeholder="Input height"
                        onChange={(e: any) => setHeight(e.value)}
                        value={height}
                        step={1}
                        min={0}
                        max={300}
                        minFractionDigits={1}
                        maxFractionDigits={1}
                        inputMode="decimal"
                        blockMax
                        suffix=" cm"
                        showButtons
                        buttonLayout="horizontal"
                        // decrementButtonClassName="cs-button-secondary"
                        // incrementButtonClassName="cs-button-primary"
                        incrementButtonIcon="csi csi-plus"
                        decrementButtonIcon="csi csi-minus"
                    />
                </div>
                {/* Weight */}
                <div className="field">
                    <label htmlFor="Weight" className="block">
                        Weight
                    </label>
                    <InputNumber
                        id="Weight"
                        className=""
                        placeholder="Input weight"
                        onChange={(e: any) => setWeight(e.value)}
                        value={weight}
                        step={1}
                        min={0}
                        max={300}
                        minFractionDigits={1}
                        maxFractionDigits={1}
                        inputMode="decimal"
                        blockMax
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="cs-button-primary"
                        incrementButtonClassName="cs-button-secondary"
                        incrementButtonIcon="csi csi-plus"
                        decrementButtonIcon="csi csi-minus"
                        suffix=" kgr"
                    />
                </div>
            </div>
        </div>
    );
};

export default InputTextPage;
