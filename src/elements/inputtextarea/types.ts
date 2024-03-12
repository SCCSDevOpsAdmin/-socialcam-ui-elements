import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

export interface InputTextAreaProps
    extends Omit<
        React.DetailedHTMLProps<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        >,
        'ref'
    > {
    autoResize?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    children?: React.ReactNode;
}

export declare class InputTextArea extends React.Component<
    InputTextAreaProps,
    any
> {
    public getElement(): HTMLTextAreaElement;
    public getInput(): HTMLTextAreaElement;
}
