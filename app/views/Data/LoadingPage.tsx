import React from 'react';
import { LoadingSpinner } from 'src/elements/loadingspinner/LoadingSpinner';

type Props = {};

const LoadingPage = (props: Props) => {
    return (
        <div>
            <LoadingSpinner />
        </div>
    );
};

export default LoadingPage;
