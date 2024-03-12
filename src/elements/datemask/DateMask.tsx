import React from 'react';
import moment from 'moment';
import { ObjectUtils } from 'src/utils/Utils';
import { DateMaskProps } from './types';

export const DateMask = React.memo(
    React.forwardRef((props: DateMaskProps | any, ref?) => {
        props = ObjectUtils.initProps(props, defaultProps);

        const applyMomentDateMask = () => {
            moment.locale(props.locale);
            const dateLiteral = moment
                .utc(props.date)
                .local()
                .startOf('s')
                .fromNow();
            return props.prefix + dateLiteral + props.suffix;
        };

        return <div>{applyMomentDateMask()}</div>;
    })
);

DateMask.displayName = 'DateMask';
const defaultProps = {
    __TYPE: 'DateMask',
    date: null,
    locale: 'en',
    prefix: '',
    suffix: '',
};
