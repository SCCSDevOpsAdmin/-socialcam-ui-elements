import React, { useRef, useState } from 'react';
import { SwiperItem } from 'src/components';
import { getTouchEventData } from 'src/lib/dom';
import { getRefValue, useStateRef } from 'src/lib/hooks';
import img1 from '../../../public/images/avatar/amyelsner.png';
import img2 from '../../../public/images/avatar/asiyajavayant.png';
import img3 from '../../../public/images/avatar/ionibowcher.png';
import img4 from '../../../public/images/avatar/onyamalimba.png';
import img5 from '../../../public/images/avatar/walter.jpg';
import img6 from '../../../public/images/avatar/xuxuefeng.png';
import './Swiper.scss';

const MIN_SWIPE_REQUIRED = 40;
const items = [
    {imageSrc: img1, imageAlt: 'image1'},
    {imageSrc: img2, imageAlt: 'image2'},
    {imageSrc: img3, imageAlt: 'image3'},
    {imageSrc: img4, imageAlt: 'image4'},
    {imageSrc: img5, imageAlt: 'image5'},
    {imageSrc: img6, imageAlt: 'image6'},
]

const Swiper = () => {
    const containerRef = useRef<HTMLUListElement>(null);
    const containerWidthRef = useRef(0);
    const currentOffsetXRef = useRef(0);
    const startXRef = useRef(0);
    const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
    const minOffsetXRef = useRef(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);

    const onTouchMove = (e: TouchEvent | MouseEvent) => {
        const currentX = getTouchEventData(e).clientX;
        const diff = getRefValue(startXRef) - currentX;
        let newOffsetX = getRefValue(currentOffsetXRef) - diff;

        const maxOffsetX = 0;
        const minOffsetX = getRefValue(minOffsetXRef);
    
        if (newOffsetX > maxOffsetX) {
          newOffsetX = maxOffsetX;
        }
    
        if (newOffsetX < minOffsetX) {
          newOffsetX = minOffsetX;
        }
    
        setOffsetX(newOffsetX);
    };

    const onTouchEnd = () => {
        const currentOffsetX = getRefValue(currentOffsetXRef);
        const containerWidth = getRefValue(containerWidthRef);
        let newOffsetX = getRefValue(offsetXRef);
    
        const diff = currentOffsetX - newOffsetX;
    
        // we need to check difference in absolute/positive value (if diff is more than 40px)
        if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
          if (diff > 0) {
            // swipe to the right if diff is positive
            newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
          } else {
            // swipe to the left if diff is negative
            newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
          }
        } else {
          // remain in the current image
          newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
        }
    
        setIsSwiping(false);
        setOffsetX(newOffsetX);
        setCurrentIdx(Math.abs(newOffsetX / containerWidth));

        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('mouseup', onTouchEnd);
        window.removeEventListener('mousemove', onTouchMove);
    };
    const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
        setIsSwiping(true);

        currentOffsetXRef.current = getRefValue(offsetXRef);
        startXRef.current = getTouchEventData(e).clientX;

        const containerEl = getRefValue(containerRef);
        const containerWidth = containerEl.offsetWidth;

        containerWidthRef.current = containerWidth;
        minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('mousemove', onTouchMove);
        window.addEventListener('mouseup', onTouchEnd);
    };

    const indicatorOnClick = (idx: number) => {
        const containerEl = getRefValue(containerRef);
        const containerWidth = containerEl.offsetWidth;
    
        setCurrentIdx(idx);
        setOffsetX(-(containerWidth * idx));
    };

    return (
        <div className="swiper-container" onTouchStart={onTouchStart} onMouseDown={onTouchStart}>
            <ul className={`swiper-list ${isSwiping ? 'is-swiping' : ''}`} style={{ transform: `translate3d(${offsetX}px, 0, 0)` }} ref={containerRef}>
                {items.map((item, idx) => (
                    <SwiperItem key={idx} {...item} />
                ))}
            </ul>
            <ul className="swiper-indicator">
                {items.map((_item, idx) => (
                <li
                    key={idx}
                    className={`swiper-indicator-item ${currentIdx === idx ? 'active' : ''}`}
                    onClick={() => indicatorOnClick(idx)}
                />
                ))}
            </ul>
        </div>
    );
};

export default React.memo(Swiper);
