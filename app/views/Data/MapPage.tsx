import React from 'react';
import Places from 'src/components/map/GMap';

type Props = {};

const MapPage = (props: Props) => {
    const onSelectPlace = (place?: any) => void 0;
    return (
        <div>
            <Places onSelect={onSelectPlace} />
        </div>
    );
};

export default React.memo(MapPage);
