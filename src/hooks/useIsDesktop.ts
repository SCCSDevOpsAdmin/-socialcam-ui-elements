import React, { useState, useEffect, useRef } from 'react';

export function useIsDesktop(): boolean {
    const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenSize(window.innerWidth);
        });
        return () => {
            window.removeEventListener('resize', () => {
                setScreenSize(window.innerWidth);
            });
        };
    }, []);

    return screenSize >= 1280;
    // screenSize <= 1280 ? setIsDesktop(false) : setIsDesktop(true);
}
