/* eslint-disable */
import * as React from 'react';
import { DomHandler, ObjectUtils } from 'src/utils/Utils';
import { EventOptions } from './types';
import { usePrevious } from './usePrevious';
import { useUnmountEffect } from './useUnmountEffect';

export const useEventListener = ({
    target = 'document',
    type,
    listener,
    options,
    when = true,
}: EventOptions | any): any[] => {
    const targetRef = React.useRef<any>(null);
    const listenerRef = React.useRef<any>(null);
    const prevOptions = usePrevious(options);

    const bind = (bindOptions?: any) => {
        if (ObjectUtils.isNotEmpty(bindOptions?.target)) {
            unbind();
            (bindOptions.when || when) &&
                (targetRef.current = DomHandler.getTargetElement(
                    bindOptions.target
                ));
        }

        if (!listenerRef.current && targetRef.current) {
            listenerRef.current = (event: any) => listener && listener(event);
            targetRef.current.addEventListener(
                type,
                listenerRef.current,
                options
            );
        }
    };

    const unbind = () => {
        if (listenerRef.current) {
            targetRef.current.removeEventListener(
                type,
                listenerRef.current,
                options
            );
            listenerRef.current = null;
        }
    };

    React.useEffect(() => {
        if (when) {
            targetRef.current = DomHandler.getTargetElement(target);
        } else {
            unbind();
            targetRef.current = null;
        }
    }, [target, when]);

    React.useEffect(() => {
        if (
            listenerRef.current &&
            (listenerRef.current !== listener || prevOptions !== options)
        ) {
            unbind();
            when && bind();
        }
    }, [listener, options]);

    useUnmountEffect(() => {
        unbind();
    });

    return [bind, unbind];
};
