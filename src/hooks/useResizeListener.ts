import { ResizeEventOptions } from './types';
import { useEventListener } from './useEventListener';

export const useResizeListener = (props: ResizeEventOptions) =>
    useEventListener({
        target: 'window',
        type: 'resize',
        listener: props.listener,
        options: props.options,
        when: props.when,
    });
