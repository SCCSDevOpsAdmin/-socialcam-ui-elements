import React, { useRef, useState } from 'react';
import { Button, FileUpload, InputText, ProgressBar } from 'src/elements';
type Props = {};

const FileuploadPage = (props: Props) => {
    const [totalSize, setTotalSize] = useState(0);
    //const toast = useRef(null);
    const fileUploadRef = useRef<any>(null);
    //const uploadPath = getConfig().publicRuntimeConfig.uploadPath;

    const onUpload = () => {
        //toast.current.show({
        //    severity: 'info',
        //    summary: 'Success',
        //    detail: 'File Uploaded',
        //});
    };

    const onTemplateSelect = (e: any) => {
        let _totalSize = totalSize;
        let files = e.files;
        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: any) => {
        let _totalSize = 0;
        e.files.forEach((file: File) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        //toast.current.show({
        //    severity: 'info',
        //    summary: 'Success',
        //    detail: 'File Uploaded',
        //});
    };

    const onTemplateRemove = (file: File, callback: any) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const onBasicUpload = () => {
        //toast.current.show({
        //    severity: 'info',
        //    summary: 'Success',
        //    detail: 'File Uploaded with Basic Mode',
        //});
    };

    const onBasicUploadAuto = () => {
        //toast.current.show({
        //    severity: 'info',
        //    summary: 'Success',
        //    detail: 'File Uploaded with Auto Mode',
        //});
    };

    const headerTemplate = (options: any) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        //const formatedValue =
        //    fileUploadRef && fileUploadRef.current
        //        ? fileUploadRef.current.formatSize(totalSize)
        //        : '0 B';

        return (
            <div
                className={className}
                style={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <span className="cs-input-icon-right">
                    <i className="csi csi-cloud-upload" />
                    <InputText
                        ref={fileUploadRef}
                        id="profile-picture"
                        placeholder={'Upload your profile picture'}
                        onChange={(e) => {}}
                    />
                </span>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                {/*<ProgressBar
                    value={value}
                    displayValueTemplate={() => `${formatedValue} / 1 MB`}
                    style={{
                        width: '300px',
                        height: '20px',
                        marginLeft: 'auto',
                    }}
                ></ProgressBar>*/}
            </div>
        );
    };

    /**
     *
     * @param file
     * @param props
     * @returns
     */
    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="flex-col align-items-center">
                <img
                    alt={file.name}
                    role="presentation"
                    src={file.objectURL}
                    width={100}
                />
                <span className="flex-col">
                    {file.name}
                    <small>{new Date().toLocaleDateString()}</small>
                </span>
                {/*<Tag
                    value={props.formatSize}
                    severity="warning"
                    className="px-3 py-2"
                />*/}
                <Button
                    type="button"
                    icon="csi csi-times"
                    className="cs-button-outlined cs-button-rounded cs-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            //<div className="fileUpload-Demo">
            //    <span className="text-center">
            //        Click to browse or drag and drop your photo
            //    </span>
            //</div>
            <div className="flex-col align-items-center">
                <i
                    className="csi csi-image mt-3 p-5"
                    style={{
                        fontSize: '5em',
                        borderRadius: '50%',
                        backgroundColor: 'var(--surface-b)',
                        color: 'var(--surface-d)',
                    }}
                ></i>
                <span
                    style={{
                        fontSize: '1.2em',
                        color: 'var(--text-color-secondary)',
                    }}
                    className="my-5"
                >
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const customBase64Uploader = async (event: any) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
        };
    };

    const chooseOptions = {
        icon: 'csi csi-fw csi-images flex-order-1',
        //iconOnly: true,
        className: 'custom-choose-btn justify-content-between cs-inputtext',
    };
    const uploadOptions = {
        icon: 'csi csi-fw csi-cloud-upload',
        //iconOnly: true,
        className:
            'custom-upload-btn cs-button-success cs-button-rounded cs-button-outlined',
    };
    const cancelOptions = {
        icon: 'csi csi-fw csi-times',
        iconOnly: true,
        className:
            'custom-cancel-btn cs-button-danger cs-button-rounded cs-button-outlined',
    };

    const hello = (e:File) => {
        console.log(e)
    }

    return (
        <div>
            <h5>Template</h5>
            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                //url={uploadPath}
                accept="image/jpeg, image/png"
                maxFileSize={2000000}
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
                onValidationFail={(file: File) => hello(file)}
            />
            <h5>Basic</h5>
            <FileUpload
                mode="basic"
                name="demo[]"
                //url={uploadPath}
                accept="image/jpeg, image/png"
                maxFileSize={2000000}
                onUpload={onBasicUpload}
                onValidationFail={(file: File) => hello(file)}
            />

            <h5>Basic with Auto</h5>
            <FileUpload
                mode="basic"
                name="demo[]"
                //url={uploadPath}
                accept="image/jpeg, image/png"
                maxFileSize={2000000}
                onUpload={onBasicUploadAuto}
                auto
                chooseLabel="Browse"
            />

            <h5>Custom (base64 encoded)</h5>
            <FileUpload
                mode="basic"
                name="demo[]"
                //url={uploadPath}
                accept="image/jpeg, image/png"
                customUpload
                uploadHandler={customBase64Uploader}
            />
        </div>
    );
};

export default FileuploadPage;
