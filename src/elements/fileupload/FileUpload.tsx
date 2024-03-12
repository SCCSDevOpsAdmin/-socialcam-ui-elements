import * as React from 'react';
import { localeOption } from '../../api/Api';
import { Button } from '../buttons/Button';
import { Messages } from '../messages/Messages';
import { ProgressBar } from '../progressbar/ProgressBar';
//import { Ripple } from '../ripple/Ripple';
import {
    classNames,
    DomHandler,
    IconUtils,
    ObjectUtils,
} from 'src/utils/Utils';

import { FileUploadProps } from './types';
import './FileUpload.scss';

export const FileUpload = React.memo(
    React.forwardRef((props: FileUploadProps | any, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);
        const [filesState, setFilesState] = React.useState<any>([]);
        const [progressState, setProgressState] = React.useState(0);
        const [focusedState, setFocusedState] = React.useState(false);
        const fileInputRef = React.useRef<any>(null);
        const messagesRef = React.useRef<any>(null);
        const contentRef = React.useRef<any>(null);
        const duplicateIEEvent = React.useRef(false);
        let uploadedFileCount = React.useRef(0);
        const hasFiles = ObjectUtils.isNotEmpty(filesState);

        const chooseButtonLabel =
            (props.chooseLabel && props.chooseLabel !== null) ||
            props.chooseOptions?.label ||
            localeOption('choose');

        const uploadButtonLabel =
            (props.uploadLabel && props.uploadLabel !== null) ||
            props.uploadOptions?.label ||
            localeOption('upload');

        const cancelButtonLabel =
            (props.cancelLabel && props.cancelLabel !== null) ||
            props.cancelOptions?.label ||
            localeOption('cancel');

        const chooseDisabled =
            (props.disabled && props.disabled !== null) ||
            (props.fileLimit &&
                props.fileLimit <= filesState.length + uploadedFileCount);

        const uploadDisabled =
            (props.disabled && props.disabled !== null) || !hasFiles;
        const cancelDisabled =
            (props.disabled && props.disabled !== null) || !hasFiles;

        const isImage = (file: File) => {
            return /^image\//.test(file.type);
        };

        const remove = (event: React.SyntheticEvent, index: any) => {
            clearInput();
            let currentFiles = [...filesState];
            let removedFile = filesState[index];

            currentFiles.splice(index, 1);
            setFilesState(currentFiles);

            if (props.onRemove) {
                props.onRemove({
                    originalEvent: event,
                    file: removedFile,
                });
            }
        };

        const clearInput = () => {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };

        const clearIEInput = () => {
            if (fileInputRef.current) {
                duplicateIEEvent.current = true; //IE11 fix to prevent onFileChange trigger again
                fileInputRef.current.value = '';
            }
        };

        const formatSize = (bytes: number) => {
            if (bytes === 0) {
                return '0 B';
            }
            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return (
                parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
                ' ' +
                sizes[i]
            );
        };

        const onFileSelect = (event: any) => {
            if (event.type !== 'drop' && isIE11() && duplicateIEEvent.current) {
                duplicateIEEvent.current = false;
                return;
            }

            let currentFiles: any[] = [];
            if (props.multiple) {
                currentFiles = filesState ? [...filesState] : [];
            }

            let selectedFiles = event.dataTransfer
                ? event.dataTransfer.files
                : event.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                let file = selectedFiles[i];

                if (!isFileSelected(file) && validate(file)) {
                    if (isImage(file)) {
                        file.objectURL = window.URL.createObjectURL(file);
                    }
                    currentFiles.push(file);
                }
            }

            setFilesState(currentFiles);

            if (ObjectUtils.isNotEmpty(currentFiles) && props.auto) {
                upload(currentFiles);
            }

            if (props.onSelect) {
                props.onSelect({ originalEvent: event, files: selectedFiles });
            }

            if (event.type !== 'drop' && isIE11()) {
                clearIEInput();
            } else {
                clearInput();
            }

            if (props.mode === 'basic' && currentFiles.length > 0) {
                fileInputRef.current.style.display = 'none';
            }
        };

        const isFileSelected = (file: File) => {
            return filesState.some(
                (f: File) =>
                    f.name + f.type + f.size ===
                    file.name + file.type + file.size
            );
        };

        const isIE11 = () => {
            return false;
            //!!window.MSInputMethodContext && !!document.documentMode
        };

        const validate = (file: File) => {
            if (
                props.maxFileSize &&
                props.maxFileSize !== null &&
                file.size > props.maxFileSize
            ) {
                const message = {
                    severity: 'error',
                    summary: props.invalidFileSizeMessageSummary.replace(
                        '{0}',
                        file.name
                    ),
                    detail: props.invalidFileSizeMessageDetail.replace(
                        '{0}',
                        formatSize(props.maxFileSize)
                    ),
                    sticky: true,
                };

                //if (props.mode === 'advanced') {
                //    messagesRef.current.show(message);
                //}

                props.onValidationFail && props.onValidationFail(file);

                return false;
            }
            if (
                props.allowedFileTypes &&
                props.allowedFileTypes.includes(file.type)
            ) {
                const message = {
                    severity: 'error',
                    summary: props.invalidFileTypeMessageSummary.replace(
                        '{0}',
                        file.name
                    ),
                    detail: props.invalidFileTypeMessageDetail.replace(
                        '{0}',
                        formatSize(props.type)
                    ),
                    sticky: true,
                };

                //if (props.mode === 'advanced') {
                //    messagesRef.current.show(message);
                //}

                props.onValidationFail && props.onValidationFail(file);

                return false;
            }

            return true;
        };

        const upload = (files?: any) => {
            files = files || filesState;
            if (files && files.nativeEvent) {
                files = filesState;
            }

            if (props.customUpload) {
                if (props.fileLimit) {
                    uploadedFileCount += files.length;
                }

                if (props.uploadHandler && props.uploadHandler !== null) {
                    props.uploadHandler({
                        files,
                        options: {
                            clear,
                            props,
                        },
                    });
                }
            } else {
                let xhr = new XMLHttpRequest();
                let formData = new FormData();

                if (props.onBeforeUpload) {
                    props.onBeforeUpload({
                        xhr: xhr,
                        formData: formData,
                    });
                }

                for (let file of files) {
                    formData.append(props.name, file, file.name);
                }

                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round(
                            (event.loaded * 100) / event.total
                        );
                        setProgressState(progress);

                        if (props.onProgress) {
                            props.onProgress({
                                originalEvent: event,
                                progress,
                            });
                        }
                    }
                });

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        setProgressState(0);

                        if (xhr.status >= 200 && xhr.status < 300) {
                            if (props.fileLimit) {
                                uploadedFileCount += files.length;
                            }

                            if (props.onUpload && props.onUpload !== null) {
                                props.onUpload({
                                    xhr,
                                    files,
                                });
                            }
                        } else {
                            if (props.onError) {
                                props.onError({
                                    xhr,
                                    files,
                                });
                            }
                        }

                        clear();
                    }
                };

                xhr.open('POST', props.url, true);

                if (props.onBeforeSend) {
                    props.onBeforeSend({
                        xhr: xhr,
                        formData: formData,
                    });
                }

                xhr.withCredentials = props.withCredentials;

                xhr.send(formData);
            }
        };

        const clear = () => {
            setFilesState([]);
            props.onClear && props.onClear !== null && props.onClear();
            clearInput();
        };

        const choose = () => {
            fileInputRef.current.click();
        };

        const onFocus = () => {
            setFocusedState(true);
        };

        const onBlur = () => {
            setFocusedState(false);
        };

        const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.which === 13) {
                // enter
                choose();
            }
        };

        const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
            if (!props.disabled) {
                event.dataTransfer.dropEffect = 'copy';
                event.stopPropagation();
                event.preventDefault();
            }
        };

        const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
            if (!props.disabled) {
                event.dataTransfer.dropEffect = 'copy';
                DomHandler.addClass(
                    contentRef.current,
                    'cs-fileupload-highlight'
                );
                event.stopPropagation();
                event.preventDefault();
            }
        };

        const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
            if (!props.disabled) {
                event.dataTransfer.dropEffect = 'copy';
                DomHandler.removeClass(
                    contentRef.current,
                    'cs-fileupload-highlight'
                );
            }
        };

        const onDrop = (event: React.DragEvent<HTMLDivElement> | any) => {
            if (!props.disabled) {
                DomHandler.removeClass(
                    contentRef.current,
                    'cs-fileupload-highlight'
                );
                event.stopPropagation();
                event.preventDefault();

                const files = event.dataTransfer
                    ? event.dataTransfer.files
                    : event.target.files;
                const allowDrop =
                    props.multiple ||
                    (ObjectUtils.isEmpty(filesState) &&
                        files &&
                        files.length === 1);

                allowDrop && onFileSelect(event);
            }
        };

        const onSimpleUploaderClick = () => {
            hasFiles ? upload() : fileInputRef.current.click();
        };

        React.useImperativeHandle(ref, () => ({
            upload,
            clear,
            formatSize,
        }));

        const createChooseButton = () => {
            const {
                className,
                style,
                icon: _icon,
                iconOnly,
            } = props.chooseOptions;
            const chooseClassName = classNames(
                'cs-button cs-fileupload-choose p-component',
                {
                    'cs-disabled': props.disabled,
                    'cs-focus': focusedState,
                    'cs-button-icon-only': iconOnly,
                },
                className
            );
            const labelClassName = 'cs-button-label cs-clickable';
            const label = iconOnly ? (
                <span className={labelClassName} />
            ) : (
                //dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                <span className={labelClassName}>{chooseButtonLabel}</span>
            );
            const input = (
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onFileSelect}
                    multiple={props.multiple}
                    accept={props.accept}
                    disabled={chooseDisabled}
                />
            );
            const icon = IconUtils.getJSXIcon(
                _icon || 'csi csi-fw csi-plus',
                {
                    className:
                        'cs-button-icon cs-button-icon-left cs-clickable',
                },
                { props }
            );
            return (
                <span
                    className={chooseClassName}
                    style={style}
                    onClick={choose}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    tabIndex={0}
                >
                    {input}
                    {icon}
                    {label}
                    {/*<Ripple />*/}
                </span>
            );
        };

        const createFile = (file: any, index: any) => {
            const key = file.name + file.type + file.size;
            const preview = isImage(file) ? (
                <div>
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={props.previewWidth}
                    />
                </div>
            ) : null;
            const fileName = (
                <div className="cs-fileupload-filename">{file.name}</div>
            );
            const size = <div>{formatSize(file.size)}</div>;
            const removeButton = (
                <div>
                    <Button
                        type="button"
                        icon="csi csi-times"
                        onClick={(e: any) => remove(e, index)}
                    />
                </div>
            );
            let content = (
                <>
                    {preview}
                    {fileName}
                    {size}
                    {removeButton}
                </>
            );

            if (props.itemTemplate && props.itemTemplate !== null) {
                const defaultContentOptions = {
                    onRemove: (event: any) => remove(event, index),
                    previewElement: preview,
                    fileNameElement: fileName,
                    sizeElement: size,
                    removeElement: removeButton,
                    formatSize: formatSize(file.size),
                    element: content,
                    props,
                };

                content = ObjectUtils.getJSXElement(
                    props.itemTemplate,
                    file,
                    defaultContentOptions
                );
            }

            return (
                <div className="cs-fileupload-row" key={key}>
                    {content}
                </div>
            );
        };

        const createFiles = () => {
            const content = filesState.map(createFile);
            return <div className="cs-fileupload-files">{content}</div>;
        };

        const createEmptyContent = () => {
            return props.emptyTemplate &&
                props.emptyTemplate !== null &&
                !hasFiles
                ? ObjectUtils.getJSXElement(props.emptyTemplate, props)
                : null;
        };

        const createProgressBarContent = () => {
            if (props.progressBarTemplate) {
                return ObjectUtils.getJSXElement(
                    props.progressBarTemplate,
                    props
                );
            }

            return <ProgressBar value={progressState} showValue={false} />;
        };

        const createAdvanced: any = () => {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-fileupload cs-fileupload-advanced cs-component',
                props.className
            );
            const headerClassName = classNames(
                'cs-fileupload-buttonbar',
                props.headerClassName
            );
            const contentClassName = classNames(
                'cs-fileupload-content',
                props.contentClassName
            );
            const chooseButton = createChooseButton();
            const emptyContent = createEmptyContent();
            let uploadButton, cancelButton, filesList, progressBar;

            if (!props.auto) {
                const uploadOptions = props.uploadOptions;
                const cancelOptions = props.cancelOptions;
                const uploadLabel = !uploadOptions.iconOnly
                    ? uploadButtonLabel
                    : '';
                const cancelLabel = !cancelOptions.iconOnly
                    ? cancelButtonLabel
                    : '';

                uploadButton = (
                    <Button
                        type="button"
                        label={uploadLabel}
                        icon={uploadOptions.icon || 'csi csi-upload'}
                        onClick={upload}
                        disabled={uploadDisabled}
                        style={uploadOptions.style}
                        className={uploadOptions.className}
                    />
                );
                cancelButton = (
                    <Button
                        type="button"
                        label={cancelLabel}
                        icon={cancelOptions.icon || 'csi csi-times'}
                        onClick={clear}
                        disabled={cancelDisabled}
                        style={cancelOptions.style}
                        className={cancelOptions.className}
                    />
                );
            }

            if (hasFiles) {
                filesList = createFiles();
                progressBar = createProgressBarContent();
            }

            let header = (
                <div className={headerClassName} style={props.headerStyle}>
                    {chooseButton}
                    {uploadButton}
                    {cancelButton}
                </div>
            );

            if (props.headerTemplate && props.headerTemplate !== null) {
                const defaultContentOptions = {
                    className: headerClassName,
                    chooseButton,
                    uploadButton,
                    cancelButton,
                    element: header,
                    props,
                };

                header = ObjectUtils.getJSXElement(
                    props.headerTemplate,
                    defaultContentOptions
                );
            }

            return (
                <div
                    id={props.id}
                    className={className}
                    style={props.style}
                    {...otherProps}
                >
                    {header}
                    <div
                        ref={contentRef}
                        className={contentClassName}
                        style={props.contentStyle}
                        onDragEnter={onDragEnter}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        {progressBar}
                        {/*<Messages ref={messagesRef} />*/}
                        {filesList}
                        {emptyContent}
                    </div>
                </div>
            );
        };

        const createBasic: any = () => {
            const chooseOptions = props.chooseOptions;
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-fileupload cs-fileupload-basic cs-component',
                props.className
            );
            const buttonClassName = classNames(
                'cs-button cs-component cs-fileupload-choose',
                {
                    'cs-fileupload-choose-selected': hasFiles,
                    'cs-disabled': props.disabled,
                    'cs-focus': focusedState,
                },
                chooseOptions.className
            );
            const chooseIcon =
                chooseOptions.icon ||
                classNames({
                    'csi csi-plus':
                        !chooseOptions.icon && (!hasFiles || props.auto),
                    'csi csi-upload':
                        !chooseOptions.icon && hasFiles && !props.auto,
                });
            const labelClassName = 'cs-button-label cs-clickable';
            const chooseLabel = chooseOptions.iconOnly ? (
                <span className={labelClassName} />
            ) : (
                //dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                <span className={labelClassName}>{chooseButtonLabel}</span>
            );
            const label = props.auto ? (
                chooseLabel
            ) : (
                <span className={labelClassName}>
                    {hasFiles ? filesState[0].name : chooseLabel}
                </span>
            );
            const icon = IconUtils.getJSXIcon(
                chooseIcon,
                { className: 'cs-button-icon cs-button-icon-left' },
                { props, hasFiles }
            );
            const input = !hasFiles && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={props.accept}
                    multiple={props.multiple}
                    disabled={props.disabled}
                    onChange={onFileSelect}
                />
            );

            return (
                <div className={className} style={props.style} {...otherProps}>
                    {/*<Messages ref={messagesRef} />*/}
                    <span
                        className={buttonClassName}
                        style={chooseOptions.style}
                        onMouseUp={onSimpleUploaderClick}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        tabIndex={0}
                    >
                        {icon}
                        {label}
                        {input}
                        {/*<Ripple />*/}
                    </span>
                </div>
            );
        };

        if (props.mode === 'advanced') return createAdvanced();
        else if (props.mode === 'basic') return createBasic();
    })
);

FileUpload.displayName = 'FileUpload';
const defaultProps = {
    __TYPE: 'FileUpload',
    //id: null,
    //name: null,
    //url: null,
    mode: 'advanced',
    multiple: false,
    //accept: null,
    disabled: false,
    auto: false,
    maxFileSize: null,
    invalidFileSizeMessageSummary: '{0}: Invalid file size, ',
    invalidFileSizeMessageDetail: 'maximum upload size is {0}.',
    allowedFileTypes: [],
    invalidFileTypeMessageSummary: '{0}: Invalid file Type, ',
    invalidFileTypeMessageDetail: 'file type {0} is not allowed.',
    //style: null,
    //className: null,
    widthCredentials: false,
    previewWidth: 50,
    chooseLabel: null,
    uploadLabel: null,
    cancelLabel: null,
    chooseOptions: {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        style: null,
    },
    uploadOptions: {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        style: null,
    },
    cancelOptions: {
        label: null,
        icon: null,
        iconOnly: false,
        className: null,
        style: null,
    },
    customUpload: false,
    //headerClassName: null,
    //headerStyle: null,
    //contentClassName: null,
    //contentStyle: null,
    headerTemplate: null,
    itemTemplate: null,
    emptyTemplate: null,
    //progressBarTemplate: null,
    //onBeforeUpload: null,
    //onBeforeSend: null,
    onUpload: null,
    //onError: null,
    onClear: null,
    //onSelect: null,
    //onProgress: null,
    onValidationFail: null,
    uploadHandler: null,
    //onRemove: null,
    lang: 'en',
};
