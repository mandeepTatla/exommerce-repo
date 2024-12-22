import { useSyncExternalStore } from 'react';

function getInnerHeight() {
    return window.innerHeight;
}

function getInnerWidth() {
    return window.innerWidth;
}

function getOuterHeight() {
    return window.outerHeight;
}

function getOuterWidth() {
    return window.outerWidth;
}

function subscribe(callback: () => void) {
    window.addEventListener('resize', callback);
    return () => {
        window.removeEventListener('resize', callback);
    };
}

/**
 * A hook that returns the sizes from the `window` object
 * @returns The window sizes
 */
export function useWindowSize(): {
    innerHeight: number;
    innerWidth: number;
    outerHeight: number;
    outerWidth: number;
} {
    const innerHeight = useSyncExternalStore(subscribe, getInnerHeight);
    const innerWidth = useSyncExternalStore(subscribe, getInnerWidth);
    const outerHeight = useSyncExternalStore(subscribe, getOuterHeight);
    const outerWidth = useSyncExternalStore(subscribe, getOuterWidth);

    return {
        innerHeight,
        innerWidth,
        outerHeight,
        outerWidth
    };
}
