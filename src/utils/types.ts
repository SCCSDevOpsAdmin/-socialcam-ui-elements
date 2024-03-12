import { IconOptions } from './interfaces';

export type IconType<ParentProps> =
    | React.ReactNode
    | ((options: IconOptions<ParentProps>) => React.ReactNode);

export type TemplateType<ParentProps> =
    | React.ReactNode
    | ((props: ParentProps) => React.ReactNode);
