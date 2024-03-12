import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import classNames from 'classnames';
import { ObjectUtils } from 'src/utils';

interface RangeRatingProps
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        'onChange'
    > {
    id?: string;
    value?: number;
    disabled?: boolean;
    readOnly?: boolean;
    stars?: number;
    cancel?: boolean;
    style?: object;
    className?: string;
    //tooltip?: string;
    //tooltipOptions?: TooltipOptions;
    onChange?(min: number, max: number): any;
    minValue: number;
    maxValue: number;
    children?: React.ReactNode;
}

export type RatingRangeSelectionActionsHandle = {
    apply?: (min: number, max: number) => any;
    clear?: () => any;
};

const RatingRangeSelection = forwardRef<
    RatingRangeSelectionActionsHandle,
    RangeRatingProps
>((props, ref) => {
    useImperativeHandle(ref, () => ({
        apply(min: number, max: number) {
            setRatingList([min, max]);
        },
        clear() {
            setRatingList([0, MAX_RATING]);
        },
    }));

    const elementRef = React.useRef(null);
    const [ratingList, setRatingList] = useState<number[]>([
        props.minValue,
        props.maxValue,
    ]);
    const [ratingValueMin, setRatingValueMin] = useState<number>(
        props.minValue
    );
    const [ratingValueMax, setRatingValueMax] = useState<number>(
        props.maxValue
    );

    function handleChange(e: any, value: number): void {
        setRatingList((prevList) => {
            prevList.shift();
            return [...prevList, value];
        });
    }

    useEffect(() => {
        let arr = ratingList.map((x) => x);
        arr.sort((a, b) => {
            return a - b;
        });
        setRatingValueMin(arr[0]);
        setRatingValueMax(arr[1]);
        if (props.onChange) props.onChange(arr[0], arr[1]);
    }, [ratingList]);

    const createStars = () => {
        return Array.from({ length: MAX_RATING }, (_, i) => i + 1).map(
            (value) => {
                const iconClassName = classNames('cs-rating-icon', {
                    'csi csi-star':
                        value < ratingValueMin || value > ratingValueMax,
                    'csi csi-star-fill':
                        value >= ratingValueMin || value <= ratingValueMax,
                });

                return (
                    <span
                        className={iconClassName}
                        onClick={(e) => handleChange(e, value)}
                        key={value}
                    ></span>
                );
            }
        );
    };
    const stars = createStars();
    const className = classNames(
        'cs-rating',
        {
            'cs-disabled': props.disabled,
            'cs-readonly': props.readOnly,
        },
        props.className
    );
    const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);

    return (
        <>
            <div
                ref={elementRef}
                id={props.id}
                className={className}
                style={props.style}
                {...otherProps}
            >
                {stars}
            </div>
        </>
    );
});

export default RatingRangeSelection;

const MAX_RATING = 5;
const defaultProps = {
    __TYPE: 'RatingRange',
    id: null,
    value: null,
    disabled: false,
    readOnly: false,
    stars: MAX_RATING,
    cancel: true,
    style: null,
    className: null,
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    minValue: 0,
    maxValue: 0,
};
