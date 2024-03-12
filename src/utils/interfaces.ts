export interface IconOptions<ParentProps> {
    iconProps: React.HTMLProps<HTMLElement>;
    element: React.ReactNode;
    props?: ParentProps;
    [key: string]: any;
}
