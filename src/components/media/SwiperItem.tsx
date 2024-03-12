import React, { FC, useEffect } from 'react';
import { SwiperItemProps as SwiperItemProps } from './types';
import './SwiperItem.scss';

const SwiperItem: FC<SwiperItemProps> = (props) => {
    return (
    <li className="swiper-item">
        <img src={props.imageSrc} alt={props.imageAlt} className="swiper-img" draggable={false} />
    </li>
    );
};

export default React.memo(SwiperItem);
