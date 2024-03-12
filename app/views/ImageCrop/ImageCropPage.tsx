import React, { FC, useEffect, useRef, useState } from 'react';
import sampleImage from 'public/assets/photo.jpg';
import { ImageCrop } from 'src/components';
import './style.scss';
import { FileUpload } from 'src/elements/fileupload/FileUpload';
import InputText from 'src/elements/inputtext/InputText';
import { Button } from 'src/elements/buttons/Button';
import { Dropdown } from 'src/elements';
import { ImageCropProps } from 'src/components/imagecrop/ImageCrop';
type Props = {};

const ImageCropPage = (props: Props) => {
    async function onSave(data) {
        const { canvas, canvasScaled } = data;
        //let blob = await fetch(canvas)
        //    .then((res) => res.blob())
        //    .then((blob) => URL.createObjectURL(blob));
        //// This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        //// drawn on another canvas, or added to the DOM.
        //let dataUrl = await canvas.toDataURL();
        //// If you want the image resized to the canvas size (also a HTMLCanvasElement)
        //const scaled = canvasScaled;
        //const result = await fetch(dataUrl);
        //const blob = await result.blob();
    }
    const [selectedFileURL, setSelectedFileUrl] = useState<string | null>(
        sampleImage
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const onSelectFile = (files: File[]) => {
        setSelectedFile(files[0]);
        setSelectedFileUrl(URL.createObjectURL(files[0]));
    };

    let saveButtnProps = {
        className: 'cs-button-primary cs-button-sm',
        onClick: () => alert('zavara'),
        label: 'Save',
    };

    let resetButtnProps = {
        className: 'cs-button-info cs-button-sm',
        onClick: () => alert('zavara'),
        label: 'Reset',
    };

    const cropModes = [
        { label: 'avatar', value: 'avatar' },
        { label: 'banner', value: 'banner' },
        { label: 'other', value: 'other' },
    ];
    const [mode, setMode] = useState<string>('avatar');
    useEffect(() => {
        if (mode == 'avatar') {
            setShape('round');
            setAspect(1);
            setCropSize({
                width: 400,
                height: 400,
            });
        } else if (mode == 'banner') {
            setShape('rect');
            setAspect(16 / 9);
        } else {
            setShape('rect');
            setCropSize(undefined);
        }
    }, [mode]);

    const defaultCropOptions: ImageCropProps = {
        imageUrl: selectedFileURL,
        cropShape: 'rect',
    };

    const [shape, setShape] = useState<'rect' | 'round'>('rect');
    const [aspect, setAspect] = useState(16 / 9);
    const [cropSize, setCropSize] = useState(null);
    return (
        <>
            <div className="test-wrapper">
                <UploadImageComponent onSelect={onSelectFile} />
            </div>
            <h1>Edit Profile Image</h1>
            <div className="flex-row-start-center">
                <Dropdown
                    value={mode}
                    options={cropModes}
                    onChange={(e) => {
                        setMode(e.value);
                    }}
                />
                <span>{mode}</span>
            </div>
            <div className="test-wrapper">
                <ImageCrop
                    imageUrl={selectedFileURL}
                    onSave={onSave}
                    cropShape={shape}
                    cropAspect={aspect}
                    enableCrop={false}
                    enableZoom={false}
                    locale="el"
                />
            </div>
        </>
    );
};

export default ImageCropPage;

type UploadProps = {
    onSelect?(files: File[]): any;
    inputUrlEnabled?: boolean;
};

const MAX_FILE_SIZE = 2 * 1024; //size * 1MB to Bytes
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

const UploadImageComponent: FC<UploadProps> = ({
    onSelect,
    inputUrlEnabled,
}) => {
    const hiddenFileInput = useRef<any>(null);
    const handleClick = (event: any) => {
        hiddenFileInput.current.click();
    };
    const [file, setFile] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    function handleFileChange(files: File[]) {
        const selectedFile = files[0];
        if (validateFile(selectedFile) && onSelect) onSelect(files);
    }

    function validateFile(file: File) {
        try {
            setHasError(false);
            setErrorMsg('');
            if (!file) {
                setHasError(true);
                setErrorMsg('Please choose a file');
                return;
            }
            validateFileType(file);
            validateSelectedFile(file);
        } catch (ex) {
            console.log(ex);
            return false;
        }
        return true;
    }

    /**
     * Validates File type must allow only KPI jpeg and png format
     * @param selectedFile
     */
    const validateFileType = (selectedFile: File) => {
        if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
            setHasError(true);
            setErrorMsg(
                `profile:ErrorMessages.TypeNotSupported, ${ALLOWED_IMAGE_TYPES.join(
                    ', '
                )}`
            );

            throw new Error('InvalidFileType');
        }
    };

    /**
     * Validate File size to 2MB
     * @param selectedFile
     */
    const validateSelectedFile = (selectedFile: File) => {
        const fileSizeKiloBytes = selectedFile.size / 1024;
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setHasError(true);
            setErrorMsg('profile:ErrorMessages.FileSizeTooBig');
            throw new Error('InvalidFileSize');
        }
    };

    const editActionsTemplate = (options: any) => {
        return (
            <>
                {inputUrlEnabled && (
                    <div className="upload-header flex-row-start-center gap-20">
                        <InputText
                            className="flex-grow w-full"
                            placeholder={'InsertImageLink'}
                        />
                        <Button
                            className="cs-button-primary"
                            label={'Search'}
                            onClick={() => {
                                alert('search');
                            }}
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <div className="">
                <input
                    type="file"
                    accept={ALLOWED_IMAGE_TYPES.join(', ')}
                    ref={hiddenFileInput}
                    onChange={(event: any) => {
                        handleFileChange(event.target.files);
                    }}
                    style={{ display: 'none' }}
                />
                <FileUpload
                    name="upload-profile-picture"
                    accept={ALLOWED_IMAGE_TYPES.join(', ')}
                    maxFileSize={MAX_FILE_SIZE}
                    onSelect={(e: any) => {
                        handleFileChange(e.files);
                    }}
                    allowedFileTypes={ALLOWED_IMAGE_TYPES}
                    emptyTemplate={
                        <div className="empty-image-container flex-col-center-center gap-8">
                            <ImageIcon />
                            <span className="cs-text-t2 cs-color-black">
                                {'DropHereYourImage'}
                            </span>
                            <a
                                href=""
                                onClick={(event: any) => {
                                    event.preventDefault();
                                    handleClick(event);
                                }}
                            >
                                {'UploadFromDevice'}
                            </a>
                            {hasError && (
                                <span className="cs-invalid">{errorMsg}</span>
                            )}
                        </div>
                    }
                    onValidationFail={(file: File) => validateFile(file)}
                    headerTemplate={editActionsTemplate}
                    className="image-upload-container flex-col"
                />
            </div>
        </>
    );
};

const ImageIcon: FC<Props> = () => {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
            />
            <path
                d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
            />
            <path
                d="M42 30L32 20L10 42"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
            />
        </svg>
    );
};
