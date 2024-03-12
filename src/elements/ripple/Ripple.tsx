import * as React from 'react';
import PrimeReact from '../../api/Api';
import {
    useMountEffect,
    useUnmountEffect,
    useUpdateEffect,
} from '../../hooks/Hooks';
import { DomHandler } from 'src/utils/Utils';

import './Ripple.scss';

export interface RippleProps {
    children?: React.ReactNode;
}

export const Ripple = React.memo(
    React.forwardRef((props: RippleProps | any, ref) => {
        const inkRef = React.useRef<any>(null);
        const targetRef = React.useRef<any>(null);

        const getTarget = () => {
            return inkRef.current && inkRef.current.parentElement;
        };

        const bindEvents = () => {
            if (targetRef.current) {
                targetRef.current.addEventListener('mousedown', onMouseDown);
            }
        };

        const unbindEvents = () => {
            if (targetRef.current) {
                targetRef.current.removeEventListener('mousedown', onMouseDown);
            }
        };

        const onMouseDown = (event: any) => {
            if (
                !inkRef.current ||
                getComputedStyle(inkRef.current, null).display === 'none'
            ) {
                return;
            }

            DomHandler.removeClass(inkRef.current, 'cs-ink-active');
            if (
                !DomHandler.getHeight(inkRef.current) &&
                !DomHandler.getWidth(inkRef.current)
            ) {
                let d = Math.max(
                    DomHandler.getOuterWidth(targetRef.current),
                    DomHandler.getOuterHeight(targetRef.current)
                );
                inkRef.current.style.height = d + 'px';
                inkRef.current.style.width = d + 'px';
            }

            const offset = DomHandler.getOffset(targetRef.current);
            let left = typeof offset.left === 'number' ? offset.left : 0;
            let top = typeof offset.top === 'number' ? offset.top : 0;
            const x =
                event.pageX -
                top +
                document.body.scrollTop -
                DomHandler.getWidth(inkRef.current) / 2;
            const y =
                event.pageY -
                left +
                document.body.scrollLeft -
                DomHandler.getHeight(inkRef.current) / 2;

            inkRef.current.style.top = y + 'px';
            inkRef.current.style.left = x + 'px';
            DomHandler.addClass(inkRef.current, 'cs-ink-active');
        };

        const onAnimationEnd = (event: any) => {
            DomHandler.removeClass(event.currentTarget, 'cs-ink-active');
        };

        useMountEffect(() => {
            if (inkRef.current) {
                targetRef.current = getTarget();
                bindEvents();
            }
        });

        useUpdateEffect(() => {
            if (inkRef.current && !targetRef.current) {
                targetRef.current = getTarget();
                bindEvents();
            }
        });

        useUnmountEffect(() => {
            if (inkRef.current) {
                targetRef.current = null;
                unbindEvents();
            }
        });

        return PrimeReact.ripple ? (
            <span
                role="presentation"
                ref={inkRef}
                className="cs-ink"
                onAnimationEnd={onAnimationEnd}
            ></span>
        ) : null;
    })
);

Ripple.displayName = 'Ripple';
