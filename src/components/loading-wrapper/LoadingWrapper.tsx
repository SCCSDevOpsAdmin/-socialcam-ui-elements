import React, { FC, ReactNode } from 'react';
import { LoadingSpinner } from 'src/elements';
import { LoadingSpinnerProps } from 'src/elements/loadingspinner/types';

export interface LoadingWrapperProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    isLoading: boolean;
    loadingLabel?: string;
    loadingTemplate?: ReactNode;
    children?: ReactNode;
    disableSpinner?: boolean;
    spinnerProps?: LoadingSpinnerProps;
}

const LoadingWrapper: FC<LoadingWrapperProps> = (props) => {
    if (props.isLoading) {
        return (
            <div
                className={
                    props.className ??
                    'h-full w-full flex-col-center-center gap-10'
                }
            >
                {props.disableSpinner !== true && (
                    <LoadingSpinner
                        label={props.loadingLabel}
                        className="cs-color-primary cs-text-h1 flex-col-center-center"
                    />
                )}
                {props.loadingTemplate}
            </div>
        );
    }
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default React.memo(LoadingWrapper);
