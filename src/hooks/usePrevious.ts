import * as React from 'react';

export const usePrevious = (newValue: any): any => {
    const ref = React.useRef(undefined);

    React.useEffect(() => {
        ref.current = newValue;
    });

    return ref.current;
};
