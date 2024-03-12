/* eslint-disable */
import * as React from 'react';
import { DomHandler, ObjectUtils } from 'src/utils/Utils';
import { usePrevious } from './usePrevious';
import { useUnmountEffect } from './useUnmountEffect';

export const useOverlayScrollListener = ({
    target,
    listener,
    options,
    when = true,
}: any) => {
    const targetRef = React.useRef<any>(null);
    const listenerRef = React.useRef<any>(null);
    const scrollableParents = React.useRef<any>([]);
    const prevOptions = usePrevious(options);

    const bind = (bindOptions: any = {}) => {
        if (ObjectUtils.isNotEmpty(bindOptions.target)) {
            unbind();
            (bindOptions.when || when) &&
                (targetRef.current = DomHandler.getTargetElement(
                    bindOptions.target
                ));
        }

        if (!listenerRef.current && targetRef.current) {
            const nodes = (scrollableParents.current =
                DomHandler.getScrollableParents(targetRef.current));

            listenerRef.current = (event: any) => listener && listener(event);
            nodes.forEach((node: any) =>
                node.addEventListener('scroll', listenerRef.current, options)
            );
        }
    };

    const unbind = () => {
        if (listenerRef.current) {
            const nodes = scrollableParents.current;
            nodes.forEach((node: any) =>
                node.removeEventListener('scroll', listenerRef.current, options)
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
/* eslint-enable */
