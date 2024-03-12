import React from 'react';
import Cropper from 'react-easy-crop';
import { MediaSize } from 'react-easy-crop/types';
import { Button, Slider } from 'src/elements';
import { SliderProps } from 'src/elements/slider/types';
import { getCroppedImg } from './CropUtils';

const defaultZoomOpts = {
    min: 1,
    max: 10,
    step: 0.1,
};

const defaultRotateOpts = {
    min: 0,
    max: 360,
    step: 1,
};

//cropShape = 'rect' | 'round'
//objectFit = "contain" , "horizontal-cover" , "vertical-cover"
//style	{ containerStyle: object, mediaStyle: object, cropAreaStyle: object }
//Custom styles to be used with the Cropper. Styles passed via the style prop are merged with the defaults.

//classes	{ containerClassName: string, mediaClassName: string, cropAreaClassName: string }
//	Custom class names to be used with the Cropper. Classes passed via the classes prop are merged with the defaults. If you have CSS specificity issues, you should probably use the disableAutomaticStylesInjection prop.
type ElementsCanvas = {
    canvas: HTMLCanvasElement;
    canvasScaled: HTMLCanvasElement;
};

type CropObjectFeet = 'contain' | 'horizontal-cover' | 'vertical-cover';
type CropShape = 'rect' | 'round';

import './ImageCrop.scss';
import { classNames } from 'src/utils';
import { localeOption } from 'src/api/Locale';

export interface ImageCropProps {
    imageUrl: string;
    locale?: string;
    enableCrop?: boolean;
    enableZoom?: boolean;
    enableRotate?: boolean;

    zoomOptions?: SliderProps;
    rotateOptions?: SliderProps;

    showGrid?: boolean;
    avoidCacheLoad?: boolean;
    cropAspect?: number;
    objectFit?: CropObjectFeet;
    cropShape?: CropShape;
    onSave?: (e?: ElementsCanvas | any) => ElementsCanvas | any;
    onDiscard?: () => any;
    cropperClass?: string;
    actionMode?: ActionMode | undefined;
}

type ActionMode = 'crop' | 'rotate' | 'zoom';
const ImageCrop = ({
    imageUrl,
    enableZoom = true,
    zoomOptions = defaultZoomOpts,
    enableRotate = true,
    rotateOptions = defaultRotateOpts,
    enableCrop = true,
    showGrid = false,
    avoidCacheLoad = false,
    cropAspect,
    objectFit = 'contain',
    cropShape = 'rect',
    onSave = () => {},
    onDiscard = () => {},
    cropperClass = '',
    locale = 'en',
    actionMode = 'crop',
}: ImageCropProps) => {
    const [zoomProps, setZoomProps] = React.useState<SliderProps>({});
    const [zoomValue, setZoomValue] = React.useState(1);
    const [rotate, setRotate] = React.useState(0);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [rotateProps, setRotateProps] = React.useState<SliderProps>({});
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const [croppedImage, setCroppedImage] = React.useState(null);
    const [aspectValue, setAspectValue] = React.useState<number>(cropAspect);
    const [naturalSize, setNaturalSize] = React.useState<MediaSize>();
    const [naturalAspect, setNaturalAspect] = React.useState<number>(1);

    const [optionActionMode, setOptionActionMode] =
        React.useState<ActionMode>(initMode());
    function initMode() {
        const getTrueKey = (obj: Record<ActionMode, boolean>) => {
            for (const key in obj) {
                if (obj[key]) return key as ActionMode;
            }
            return undefined;
        };
        let allowedOptions: Record<ActionMode, boolean> = {} as Record<
            ActionMode,
            boolean
        >;
        if (enableCrop == true)
            allowedOptions = { ...allowedOptions, crop: enableCrop };
        if (enableZoom == true)
            allowedOptions = { ...allowedOptions, zoom: enableZoom };
        if (enableRotate == true)
            allowedOptions = { ...allowedOptions, rotate: enableRotate };

        if (actionMode === 'crop' && enableCrop != true)
            return getTrueKey(allowedOptions);
        if (actionMode === 'zoom' && enableZoom != true)
            return getTrueKey(allowedOptions);
        if (actionMode === 'rotate' && enableRotate != true)
            return getTrueKey(allowedOptions);

        return actionMode;
    }

    React.useEffect(() => {
        setZoomProps(zoomOptions);
    }, [zoomOptions]);

    React.useEffect(() => {
        setRotateProps(rotateOptions);
    }, [rotateOptions]);

    const onCropComplete = React.useCallback(
        (croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const onSaveAction = React.useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageUrl,
                croppedAreaPixels,
                rotate,
                avoidCacheLoad
            );
            setCroppedImage(croppedImage);
            if (onSave) {
                onSave(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotate]);

    const handleMediaSize = (mediaSize: MediaSize) => {
        const initialH = mediaSize.naturalHeight;
        const initialW = mediaSize.naturalWidth;
        let aspect = cropAspect != undefined ? cropAspect : initialW / initialH;
        setAspectValue(aspect);
        setNaturalSize(mediaSize);
        setNaturalAspect(initialW / initialH);
    };

    const onResetAction = () => {
        setZoomValue(1);
        setRotate(0);
        setCrop({ x: 0, y: 0 });
        const initialH = naturalSize.naturalHeight;
        const initialW = naturalSize.naturalWidth;
        let aspect = cropAspect != undefined ? cropAspect : initialW / initialH;
        setAspectValue(aspect);

        if (onDiscard) onDiscard();
    };

    const cropOptions = [
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
        { label: '1:1', value: 1 },
        { label: '3:4', value: 3 / 4 },
        { label: '9:16', value: 9 / 16 },
    ];

    function onChangeRotate(value: number) {
        let newValue = value;
        if (value > 360) newValue = value - 360;
        else if (value < 0) newValue = 360 - Math.abs(value);
        setRotate(newValue);
    }
    function onAspectChange(value: number) {
        if (enableCrop) setAspectValue(value);
    }
    function setAspectToNatural() {
        onAspectChange(naturalSize.naturalWidth / naturalSize.naturalHeight);
    }
    function onChangeActionMode(mode: ActionMode) {
        if (mode === 'crop' && enableCrop != true) return;
        else if (mode === 'zoom' && enableZoom != true) return;
        else if (mode === 'rotate' && enableRotate != true) return;
        setOptionActionMode(mode);
    }
    let classes = {
        containerClassName: 'cs-crop-containerClass',
        mediaClassName: 'cs-crop-mediaClass',
        cropAreaClassName: 'cs-crop-cropAreaClass',
    };

    return (
        <>
            <div className="cs-crop-wrapper">
                <div
                    className={classNames(
                        'cs-crop-container',
                        cropperClass ?? ''
                    )}
                >
                    <div className="cs-crop-container-relative">
                        <Cropper
                            classes={classes}
                            crop={crop}
                            image={imageUrl}
                            zoom={zoomValue}
                            minZoom={zoomProps.min}
                            maxZoom={zoomProps.max}
                            zoomSpeed={0.1}
                            onZoomChange={setZoomValue}
                            zoomWithScroll={false}
                            showGrid={showGrid}
                            rotation={rotate}
                            objectFit={objectFit}
                            cropShape={cropShape}
                            aspect={aspectValue}
                            onCropChange={setCrop}
                            onRotationChange={setRotate}
                            onCropComplete={onCropComplete}
                            onMediaLoaded={handleMediaSize}
                        />
                    </div>
                </div>
                <div className="cs-crop-options-container">
                    <div
                        className={classNames('cs-crop-option', {
                            active: optionActionMode === 'crop',
                            disabled: enableCrop != true,
                        })}
                        onClick={() => {
                            onChangeActionMode('crop');
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 5.5H19C19.3978 5.5 19.7794 5.65804 20.0607 5.93934C20.342 6.22064 20.5 6.60218 20.5 7V25M5.5 10V19C5.5 19.3978 5.65804 19.7794 5.93934 20.0607C6.22064 20.342 6.60218 20.5 7 20.5H16M5.5 1V5.5M20.5 20.5H25"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="option-label">
                            {localeOption('crop', locale)}
                        </span>
                    </div>
                    <div
                        className={classNames('cs-crop-option', {
                            active: optionActionMode === 'zoom',
                            disabled: enableZoom != true,
                        })}
                        onClick={() => {
                            onChangeActionMode('zoom');
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20.9984 20.9999L16.6484 16.6499"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11 8V14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 11H14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="option-label">
                            {localeOption('zoom', locale)}
                        </span>
                    </div>
                    <div
                        className={classNames('cs-crop-option', {
                            active: optionActionMode === 'rotate',
                            disabled: enableRotate != true,
                        })}
                        onClick={() => {
                            onChangeActionMode('rotate');
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M23 4V10H17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20.4899 15C19.8399 16.8399 18.6094 18.4187 16.984 19.4985C15.3586 20.5783 13.4263 21.1006 11.4783 20.9866C9.53026 20.8726 7.67203 20.1286 6.18363 18.8667C4.69524 17.6047 3.6573 15.8932 3.22625 13.9901C2.79519 12.0869 2.99436 10.0952 3.79374 8.31508C4.59313 6.53496 5.94942 5.06288 7.65823 4.12065C9.36705 3.17843 11.3358 2.81711 13.2678 3.09116C15.1999 3.3652 16.9905 4.25975 18.3699 5.64001L22.9999 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="option-label">
                            {localeOption('rotate', locale)}
                        </span>
                    </div>
                </div>
                <div className="cs-crop-options-content">
                    {optionActionMode === 'crop' && (
                        <>
                            <div className="cs-crop-utils justify-content-evenly">
                                {cropOptions.map((option, index) => {
                                    return (
                                        <div
                                            key={`crop-opt-${index}`}
                                            className={classNames(
                                                'cs-chip cs-component',
                                                {
                                                    active:
                                                        option.value ===
                                                        aspectValue,
                                                }
                                            )}
                                            onClick={() => {
                                                onAspectChange(option.value);
                                            }}
                                        >
                                            <span className="cs-chip-text">
                                                {option.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="cs-crop-utils crop-option">
                                <div
                                    className={classNames(
                                        'cs-chip cs-component',
                                        {
                                            active:
                                                aspectValue === naturalAspect,
                                        }
                                    )}
                                    onClick={() => setAspectToNatural()}
                                >
                                    <span className="cs-chip-text">
                                        {localeOption('imageSize', locale)}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                    {optionActionMode === 'zoom' && (
                        <div className="field">
                            <label>{localeOption('zoom', locale)}</label>
                            <Slider
                                className="my-1"
                                value={zoomValue}
                                min={zoomProps.min}
                                max={zoomProps.max}
                                step={zoomProps.step}
                                onChange={(e: any) => {
                                    setZoomValue(e.value);
                                }}
                                aria-labelledby={
                                    zoomProps.ariaLabelledBy ??
                                    'avatareditor-zoom'
                                }
                            />
                        </div>
                    )}
                    {optionActionMode === 'rotate' && (
                        <>
                            <div className="flex-row-around-stretch">
                                <Button
                                    className="cs-button-rounded cs-button-sm cs-button-text"
                                    onClick={() => onChangeRotate(rotate + 90)}
                                    disabled={!enableRotate}
                                    icon={
                                        <>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 2.25V3.75H12.75V2.25H12ZM14.367 2.5785L13.9455 4.008L14.5305 4.1715L14.5785 4.1955L15.0938 4.383L15.141 4.4055H15.1635L15.7972 3.048L15.7267 3.02325L15.7028 3.00075H15.6788L15.0465 2.766H15.0225L15 2.7435L14.367 2.5785ZM3 3V4.5H5.742C3.597 6.28875 2.25 8.955 2.25 12C2.25 17.3587 6.64125 21.75 12 21.75C17.3587 21.75 21.75 17.3587 21.75 12V11.25H20.25V12C20.25 16.5412 16.5412 20.25 12 20.25C7.45875 20.25 3.75 16.5412 3.75 12C3.75 9.045 5.2275 6.57 7.5 5.085V9H9V3H3ZM17.133 3.75L16.335 5.016L16.6875 5.25L16.7347 5.2725L17.1562 5.6025L17.2035 5.625L17.367 5.766L18.3517 4.641L18.1403 4.4535H18.1163L18.0938 4.4295L17.5762 4.032H17.5538L17.5312 4.008L17.133 3.75ZM19.4295 5.6955L18.282 6.6795L18.4455 6.867L18.468 6.8895L18.798 7.33575L18.843 7.38375L19.0545 7.73625L20.3205 6.915L20.0625 6.51525L20.04 6.49275V6.46875L19.641 5.95275L19.617 5.93025L19.5945 5.90625L19.4295 5.6955ZM21.0225 8.25L19.665 8.883V8.9055L19.6875 8.95275L19.875 9.46875L19.8975 9.516L20.0625 10.101L21.492 9.7035L21.3285 9.0705L21.3045 9.02325V9L21.0705 8.39025V8.36775L21.0465 8.34375L21.024 8.25H21.0225Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </>
                                    }
                                />
                                <Button
                                    className="cs-button-rounded cs-button-sm cs-button-text"
                                    onClick={() => onChangeRotate(rotate - 90)}
                                    disabled={!enableRotate}
                                    icon={
                                        <>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.25 2.25V3.75H12V2.25H11.25ZM9.633 2.5785L9 2.74125L8.9775 2.76375L8.95275 2.76525L8.3205 2.99925H8.298L8.27325 3.02175L8.20425 3.04575L8.8365 4.4055H8.86125L8.90775 4.383L9.42375 4.1955L9.47025 4.1715L10.0552 4.0065L9.63525 2.57775L9.633 2.5785ZM15 3V9H16.5V5.085C18.7725 6.57 20.25 9.045 20.25 12C20.25 16.5412 16.5412 20.25 12 20.25C7.45875 20.25 3.75 16.5412 3.75 12V11.25H2.25V12C2.25 17.3587 6.64125 21.75 12 21.75C17.3587 21.75 21.75 17.3587 21.75 12C21.75 8.955 20.4037 6.28875 18.258 4.5H21V3H15ZM6.867 3.75L6.4695 4.008L6.4455 4.0305H6.423L5.9055 4.4295L5.883 4.4535H5.859L5.649 4.641L6.633 5.766L6.798 5.625L6.843 5.6025L7.26525 5.2725L7.3125 5.25L7.665 5.01525L6.86625 3.75H6.867ZM4.5705 5.6955L4.4055 5.9055L4.383 5.9295L4.359 5.9535L3.9615 6.46875V6.49125L3.9375 6.516L3.6795 6.9135L4.9455 7.73475L5.1555 7.38225L5.2035 7.33575L5.53125 6.89175L5.55375 6.86775L5.71875 6.68025L4.57125 5.69625L4.5705 5.6955ZM2.9775 8.25L2.95275 8.34375L2.93025 8.36625V8.391L2.69475 9V9.0225L2.67225 9.0705L2.50725 9.7035L3.93675 10.101L4.10175 9.516L4.12425 9.46875L4.31175 8.95275L4.33425 8.90625V8.88375L2.9775 8.25Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </>
                                    }
                                />
                            </div>
                            <div className="field">
                                <label>{localeOption('rotate', locale)}</label>
                                <Slider
                                    className="my-1"
                                    value={rotate}
                                    min={rotateProps.min}
                                    max={rotateProps.max}
                                    step={rotateProps.step}
                                    onChange={(e: any) => {
                                        onChangeRotate(e.value);
                                    }}
                                    aria-labelledby={
                                        rotateProps.ariaLabelledBy ??
                                        'avatareditor-rotate'
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="cs-crop-actions cs-fluid">
                    <Button
                        className="cs-button-secondary cs-button-sm"
                        onClick={onResetAction}
                        label={localeOption('clear', locale)}
                    ></Button>
                    <Button
                        className="cs-button-primary cs-button-sm"
                        onClick={onSaveAction}
                        label={localeOption('apply', locale)}
                    ></Button>
                </div>
            </div>
        </>
    );
};

export default ImageCrop;
