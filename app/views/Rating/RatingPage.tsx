import React, { useRef, useState } from 'react';
import { Rating } from 'src/elements/rating/Rating';
import { RatingRangeSelection } from 'src/components';
import { Button } from 'src/elements';

export const RatingPage = () => {
    const [val1, setVal1] = useState(null);
    const [val2, setVal2] = useState(null);
    const [val3, setVal3] = useState(null);
    const [range, setRange] = useState({ min: 0, max: 3 });
    const rangeRef = useRef<any>(null);

    return (
        <div>
            <div className="card">
                <h5>Range RatingRangeSelection</h5>
                <p>
                    Oldest Clicked should be removed and range should apply to
                    latest and last clicked
                </p>
                <Button
                    label="Force Apply 1-3"
                    onClick={() => {
                        rangeRef.current.apply(1, 3);
                    }}
                />
                <RatingRangeSelection
                    ref={rangeRef}
                    minValue={range.min}
                    maxValue={range.max}
                    onChange={(min, max) => {
                        setRange({ min, max });
                    }}
                />
                <div>
                    range: min-{range.min} max{range.max}
                </div>
                <h5>Basic {val1}</h5>
                <Rating value={val1} onChange={(e) => setVal1(e.value)} />

                <h5>Without Cancel</h5>
                <Rating
                    value={val2}
                    cancel={false}
                    onChange={(e) => setVal2(e.value)}
                />

                <h5>ReadOnly</h5>
                <Rating value={5} readOnly stars={10} cancel={false} />

                <h5>Disabled</h5>
                <Rating value={8} disabled stars={10} />

                <h5>Template</h5>
                <Rating
                    value={val3}
                    onChange={(e) => setVal3(e.value)}
                    //cancelIcon={
                    //    <img
                    //        src={`images/rating/cancel.png`}
                    //        alt="custom-cancel-image"
                    //        width="25px"
                    //        height="25px"
                    //    />
                    //}
                    //onIcon={
                    //    <img
                    //        src={`images/rating/custom-icon-active.png`}
                    //        alt="custom-image-active"
                    //        width="25px"
                    //        height="25px"
                    //    />
                    //}
                    //offIcon={
                    //    <img
                    //        src={`images/rating/custom-icon.png`}
                    //        alt="custom-image"
                    //        width="25px"
                    //        height="25px"
                    //    />
                    //}
                />
            </div>
        </div>
    );
};
