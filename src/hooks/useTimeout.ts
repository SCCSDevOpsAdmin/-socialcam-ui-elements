/* eslint-disable */
import * as React from 'react';
import { useUnmountEffect } from './useUnmountEffect';

// export declare function useTimeout(fn: any,delay?: number,when?: boolean);
export const useTimeout = (fn: any, delay = 0, when = true): any[] => {
    const timeout = React.useRef<any>(null);
    const savedCallback = React.useRef<any>(null);

    const clear = React.useCallback(
        () => clearTimeout(timeout.current),
        [timeout.current]
    );

    React.useEffect(() => {
        savedCallback.current = fn;
    });

    React.useEffect(() => {
        function callback() {
            savedCallback.current();
        }

        if (when) {
            timeout.current = setTimeout(callback, delay);
            return clear;
        } else {
            clear();
        }
    }, [delay, when]);

    useUnmountEffect(() => {
        clear();
    });

    return [clear];
};
