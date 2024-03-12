import React, { useState } from 'react';
import { InputText, Button, Slider, Badge, Tooltip } from 'src/elements';
import './TooltipPage.scss';
type Props = {};

const FacebookIcon = (props: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Ebene 1"
            viewBox="0 0 1024 1024"
            id="facebook-logo-2019"
        >
            <path
                fill="#1877f2"
                d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
            ></path>
            <path
                fill="#fff"
                d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
            ></path>
        </svg>
    );
};

const TooltipPage = (props: Props) => {
    const [saveBtnTooltipText, setSaveBtnTooltipText] =
        useState('Click to proceed');
    const [sliderValue, setSliderValue] = useState<number | [number, number]>(
        20
    );
    const [count, setCount] = useState(0);

    return (
        <div>
            <div className="card">
                <h5>Positions</h5>
                <div className="grid cs-fluid">
                    <div className="col-12 md:col-3">
                        <InputText
                            type="text"
                            placeholder="Right"
                            tooltip="Enter your username"
                            tooltipOptions={{ position: 'right' }}
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <InputText
                            type="text"
                            placeholder="Top"
                            tooltip="Enter your username"
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <InputText
                            type="text"
                            placeholder="Bottom"
                            tooltip="Enter your username"
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    </div>
                    <div className="col-12 md:col-3">
                        <InputText
                            type="text"
                            placeholder="Left"
                            tooltip="Enter your username"
                            tooltipOptions={{ position: 'left' }}
                        />
                    </div>
                </div>

                <h5>Focus and Blur</h5>
                <InputText
                    type="text"
                    placeholder="Focus"
                    tooltip="Enter your username"
                    tooltipOptions={{ event: 'focus' }}
                />

                <h5>Info Button Tooltip</h5>
                <div className="flex align-items-center">
                    <Button
                        className="cs-button-rounded cs-button-info cs-button-outlined button-tooltip"
                        type="button"
                        label="Supported url videos"
                        icon="csi csi-info"
                        onClick={() => {}}
                    />
                    <Tooltip
                        target=".button-tooltip"
                    >
                        <div 
                            className='flex-col-start-stretch gap-10'
                            style={{ minWidth: '6rem' }}
                        >
                            <div className="flex-row-center-center gap-10">
                                <FacebookIcon />
                                <span
                                    className="cs-text-t2 cs-color-gray-1"
                                >
                                    Facebook
                                </span>
                            </div>
                            <div className="flex-row-center-center gap-10">
                                <FacebookIcon />
                                <span
                                    className="cs-text-t2 cs-color-gray-1"
                                >
                                    Youtube
                                </span>
                            </div>
                        </div>
                    </Tooltip>
                </div>

                <h5>Dynamic Tooltip</h5>
                <div className="flex align-items-center">
                    <Button
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                        tooltip={saveBtnTooltipText}
                        onClick={() => setSaveBtnTooltipText('Completed')}
                    />

                    <Tooltip
                        target=".slider>.cs-slider-handle"
                        content={`${sliderValue}%`}
                        position="top"
                        event="focus"
                    />
                    <Slider
                        className="slider ml-3"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.value)}
                        style={{ width: '14rem' }}
                    />
                </div>

                <h5>MouseTrack</h5>
                <div className="flex align-items-center">
                    <Button
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                        tooltip="Save"
                        tooltipOptions={{
                            position: 'bottom',
                            mouseTrack: true,
                            mouseTrackTop: 15,
                        }}
                    />

                    <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
                    <img
                        className="logo ml-2"
                        alt="logo"
                        src="assets/photo.jpg"
                        data-pr-tooltip="PrimeReact-Logo"
                        height="80px"
                    />
                </div>

                <div className="flex align-items-center">
                    <Button
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                        tooltip="Save (autoHide: true)"
                        tooltipOptions={{
                            position: 'bottom',
                            mouseTrack: true,
                            mouseTrackTop: 15,
                        }}
                    />

                    <Tooltip
                        target=".tooltip-button"
                        autoHide={false}
                        mouseTrack
                    >
                        <div className="flex align-items-center">
                            <span style={{ minWidth: '5rem' }}>
                                Count: {count}
                            </span>
                            <Button
                                type="button"
                                icon="csi csi-plus"
                                onClick={() => setCount(count + 1)}
                                className="cs-button-rounded cs-button-success ml-2"
                            ></Button>
                            <Button
                                type="button"
                                icon="csi csi-minus"
                                onClick={() => setCount(count - 1)}
                                className="cs-button-rounded cs-button-danger ml-2"
                            ></Button>
                        </div>
                    </Tooltip>
                    <Button
                        className="tooltip-button ml-2"
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                    />
                </div>

                <h5>Template</h5>
                <div className="flex align-items-center">
                    <Tooltip target=".custom-tooltip-btn">
                        <img
                            alt="logo"
                            src="assets/photo.jpg"
                            data-pr-tooltip="PrimeReact-Logo"
                            height="80px"
                        />
                    </Tooltip>

                    <Button
                        className="custom-tooltip-btn"
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                    />
                </div>

                <h5>Disabled Elements</h5>
                <div className="flex align-items-center">
                    <Tooltip target=".disabled-button" />
                    <span
                        className="disabled-button mr-2"
                        data-pr-tooltip="A Disabled Button"
                    >
                        <Button
                            type="button"
                            label="Save"
                            icon="csi csi-check"
                            disabled
                        />
                    </span>

                    <Button
                        type="button"
                        label="Save"
                        icon="csi csi-check"
                        disabled
                        tooltip="A Disabled Button"
                        tooltipOptions={{ showOnDisabled: true }}
                    />
                </div>

                <h5>Target</h5>
                <div className="flex align-items-center">
                    <Tooltip target=".custom-target-icon" />

                    <i
                        className="custom-target-icon csi csi-envelope cs-text-secondary cs-overlay-badge"
                        data-pr-tooltip="No notifications"
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                    >
                        <Badge severity="danger"></Badge>
                    </i>
                </div>

                <h5>Color</h5>
                <div className="flex align-items-center flex-wrap">
                    <Button
                        label="Blue"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Blue"
                        tooltipOptions={{
                            className: 'blue-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Green"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Green"
                        tooltipOptions={{
                            className: 'green-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Yellow"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Yellow"
                        tooltipOptions={{
                            className: 'yellow-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Cyan"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Cyan"
                        tooltipOptions={{
                            className: 'cyan-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="csink"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="csink"
                        tooltipOptions={{
                            className: 'csink-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Indigo"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Indigo"
                        tooltipOptions={{
                            className: 'indigo-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Teal"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Teal"
                        tooltipOptions={{
                            className: 'teal-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Blue Gray"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Blue Gray"
                        tooltipOptions={{
                            className: 'bluegray-tooltip',
                            position: 'top',
                        }}
                    />
                    <Button
                        label="Purple"
                        className="cs-button-secondary cs-button-outlined mr-3 mb-2"
                        tooltip="Purple"
                        tooltipOptions={{
                            className: 'purple-tooltip',
                            position: 'top',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TooltipPage;
