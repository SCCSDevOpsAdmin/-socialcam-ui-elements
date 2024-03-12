export interface ActionLabelProps
{
    label: string;
    value: any[];
    onSelect?(e: any): void;
    onClear?(e: any): void;
    selectLabel?: string;
    clearLabel?: string;
}