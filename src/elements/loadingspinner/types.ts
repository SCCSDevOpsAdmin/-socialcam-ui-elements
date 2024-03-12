import * as React from 'react';

export enum LoadingState {
    loading = 'loading',
    success = 'success',
    fail = 'fail',
}

export interface LoadingSpinnerProps
    extends Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'ref'
    > {
    label?: string;
    state?: string | LoadingState;
    icon?: string;
}

export declare class LoadingSpinner extends React.Component<
    LoadingSpinnerProps,
    any
> {
    public getElement(): HTMLDivElement;
}
