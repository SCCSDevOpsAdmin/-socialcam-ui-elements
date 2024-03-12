export type TargetType =
    | 'document'
    | 'window'
    | React.Ref<HTMLElement>
    | undefined;

export interface EventOptions {
    target?: TargetType;
    type?: string;
    listener?(event: Event): void;
    options?: any;
    when?: boolean;
}

export interface OverlayEventOptions {
    target?: TargetType;
    overlay?: TargetType;
    listener?(event: Event, type?: any): void;
    when?: boolean;
}

export interface ResizeEventOptions extends EventOptions {
    listener?(event: Event): void;
}
