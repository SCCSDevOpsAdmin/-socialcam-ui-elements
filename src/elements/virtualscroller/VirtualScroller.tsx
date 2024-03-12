import * as React from 'react';
import {
    useMountEffect,
    usePrevious,
    useUpdateEffect,
} from '../../hooks/Hooks';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import {
    VirtualScrollerOptionsType,
    VirtualScrollerProps,
    VirtualScrollerScrollBehavior,
    VirtualScrollerToIndexType,
} from './types';

export const VirtualScroller = React.memo(
    React.forwardRef((props: VirtualScrollerProps, ref) => {
        props = ObjectUtils.initProps(props, defaultProps);

        const vertical = props.orientation === 'vertical';
        const horizontal = props.orientation === 'horizontal';
        const both = props.orientation === 'both';

        const [firstState, setFirstState] = React.useState(0);
        const [firstStateObj, setFirstStateObj] = React.useState({
            rows: 0,
            cols: 0,
        });
        const [lastState, setLastState] = React.useState(0);
        const [lastStateObj, setLastStateObj] = React.useState({
            rows: 0,
            cols: 0,
        });

        const [numItemsInViewportState, setNumItemsInViewportState] =
            React.useState(0);
        const [numItemsInViewportStateObj, setNumItemsInViewportStateObj] =
            React.useState({ rows: 0, cols: 0 });
        const [numToleratedItemsState, setNumToleratedItemsState] =
            React.useState<any>(props.numToleratedItems);
        const [loadingState, setLoadingState] = React.useState(props.loading);
        const [loaderArrState, setLoaderArrState] = React.useState<any>([]);
        const elementRef = React.useRef<any>(null);
        const contentRef = React.useRef<any>(null);
        const spacerRef = React.useRef<any>(null);
        const stickyRef = React.useRef<any>(null);
        const lastScrollPos = React.useRef<any>(both ? { top: 0, left: 0 } : 0);
        //const lastScrollPosObj = React.useRef(both ? { top: 0, left: 0 } : 0);
        const scrollTimeout = React.useRef<any>(null);
        const prevItems = usePrevious(props.items);
        const prevLoading = usePrevious(props.loading);

        const scrollTo = (options: VirtualScrollerOptionsType): void => {
            elementRef.current && elementRef.current.scrollTo(options);
        };

        const scrollToIndex = (
            index: any,
            behavior: VirtualScrollerScrollBehavior
        ) => {
            if (!behavior) {
                behavior = 'auto';
            }
            const { numToleratedItems } = calculateNumItems();
            const itemSize: any = props.itemSize;
            const contentPos = getContentPosition();

            const calculateFirst = (_index = 0, _numT: number): number =>
                _index <= _numT ? 0 : _index;

            const calculateCoord = (_first: any, _size: any, _cpos: any) =>
                _first * _size + _cpos;

            const scrollToItem = (left = 0, top = 0) =>
                scrollTo({ left, top, behavior });

            if (both) {
                const newFirst = {
                    rows: calculateFirst(index[0], numToleratedItems[0]),
                    cols: calculateFirst(index[1], numToleratedItems[1]),
                };
                if (
                    newFirst.rows !== firstStateObj.rows ||
                    newFirst.cols !== firstStateObj.cols
                ) {
                    scrollToItem(
                        calculateCoord(
                            newFirst.cols,
                            itemSize[1],
                            contentPos.left
                        ),
                        calculateCoord(
                            newFirst.rows,
                            itemSize[0],
                            contentPos.top
                        )
                    );
                    setFirstStateObj(newFirst);
                }
            } else {
                const newFirst = calculateFirst(index, numToleratedItems);

                if (newFirst !== firstState) {
                    horizontal
                        ? scrollToItem(
                              calculateCoord(
                                  newFirst,
                                  itemSize,
                                  contentPos.left
                              ),
                              0
                          )
                        : scrollToItem(
                              0,
                              calculateCoord(newFirst, itemSize, contentPos.top)
                          );
                    setFirstState(newFirst);
                }
            }
        };

        const scrollInView = (
            index: any,
            to: any,
            behavior: VirtualScrollerScrollBehavior = 'auto'
        ) => {
            if (to) {
                const { first, viewport } = getRenderedRange();
                let firstnum = typeof first === 'number' ? first : 0;
                let firstObj: any = typeof first !== 'number' ? first : {};
                let viewportFirstNum =
                    typeof viewport.first === 'number' ? viewport.first : 0;

                let viewportFirstObj: any =
                    typeof viewport.first !== 'number' ? viewport.first : {};

                let viewportLastNum =
                    typeof viewport.last === 'number' ? viewport.last : 0;

                let viewportLastObj: any =
                    typeof viewport.last !== 'number' ? viewport.last : {};

                const itemSize: any = props.itemSize;
                const scrollToItem = (left = 0, top = 0) =>
                    scrollTo({ left, top, behavior });
                const isToStart = to === 'to-start';
                const isToEnd = to === 'to-end';

                if (isToStart) {
                    if (both) {
                        if (viewportFirstObj.rows - firstObj.rows > index[0]) {
                            scrollToItem(
                                viewportFirstObj.cols * itemSize,
                                (viewportFirstObj.rows - 1) * itemSize
                            );
                        } else if (
                            viewportFirstObj.cols - firstObj.cols >
                            index[1]
                        ) {
                            scrollToItem(
                                (viewportFirstObj.cols - 1) * itemSize,
                                viewportFirstObj.rows * itemSize
                            );
                        }
                    } else {
                        if (viewportFirstNum - firstnum > index) {
                            const pos = (viewportFirstNum - 1) * itemSize;
                            horizontal
                                ? scrollToItem(pos, 0)
                                : scrollToItem(0, pos);
                        }
                    }
                } else if (isToEnd) {
                    if (both) {
                        if (
                            viewportLastObj.rows - firstObj.rows <=
                            index[0] + 1
                        ) {
                            scrollToItem(
                                viewportFirstObj.cols * itemSize,
                                (viewportFirstObj.rows + 1) * itemSize
                            );
                        } else if (
                            viewportLastObj.cols - firstObj.cols <=
                            index[1] + 1
                        ) {
                            scrollToItem(
                                (viewportFirstObj.cols + 1) * itemSize,
                                viewportFirstObj.rows * itemSize
                            );
                        }
                    } else {
                        if (viewportLastNum - firstnum <= index + 1) {
                            const pos = (viewportFirstNum + 1) * itemSize;
                            horizontal
                                ? scrollToItem(pos, 0)
                                : scrollToItem(0, pos);
                        }
                    }
                }
            } else {
                scrollToIndex(index, behavior);
            }
        };

        const getRows = () => {
            return loadingState
                ? props.loaderDisabled
                    ? loaderArrState
                    : []
                : loadedItems();
        };

        const getColumns = () => {
            if (props.columns) {
                if (both || horizontal) {
                    return loadingState && props.loaderDisabled
                        ? both
                            ? loaderArrState[0]
                            : loaderArrState
                        : props.columns.slice(
                              both ? firstStateObj.cols : firstState,
                              both ? lastStateObj.cols : lastState
                          );
                }
            }

            return props.columns;
        };

        const getRenderedRange = () => {
            const itemSize: any = props.itemSize;
            const calculateFirstInViewport = (_pos: any, _size: any) =>
                Math.floor(_pos / (_size || _pos));

            let firstInViewport = both ? firstStateObj : firstState;
            let lastInViewport = null;

            if (elementRef.current) {
                const scrollTop = elementRef.current.scrollTop;
                const scrollLeft = elementRef.current.scrollLeft;

                if (both) {
                    firstInViewport = {
                        rows: calculateFirstInViewport(scrollTop, itemSize[0]),
                        cols: calculateFirstInViewport(scrollLeft, itemSize[1]),
                    };
                    lastInViewport = {
                        rows:
                            firstInViewport.rows +
                            numItemsInViewportStateObj.rows,
                        cols:
                            firstInViewport.cols +
                            numItemsInViewportStateObj.cols,
                    };
                } else {
                    const scrollPos = horizontal ? scrollLeft : scrollTop;
                    firstInViewport = calculateFirstInViewport(
                        scrollPos,
                        itemSize
                    );
                    lastInViewport = firstInViewport + numItemsInViewportState;
                }
            }
            if (lastInViewport === null) {
                lastInViewport = 0;
            }

            return {
                first: both ? firstStateObj : firstState,
                last: both ? lastStateObj : lastState,
                viewport: {
                    first: firstInViewport,
                    last: lastInViewport,
                },
            };
        };

        const calculateNumItems = () => {
            const itemSize: any = props.itemSize;
            const contentPos = getContentPosition();

            const contentWidth = elementRef.current
                ? elementRef.current.offsetWidth - contentPos.left
                : 0;

            const contentHeight = elementRef.current
                ? elementRef.current.offsetHeight - contentPos.top
                : 0;

            const calculateNumItemsInViewport = (
                _contentSize: number,
                _itemSize: number
            ) => Math.ceil(_contentSize / (_itemSize || _contentSize));

            const calculateNumToleratedItems = (_numItems: number) =>
                Math.ceil(_numItems / 2);

            if (both) {
                const numItemsInViewportObj = {
                    rows: calculateNumItemsInViewport(
                        contentHeight,
                        itemSize[0]
                    ),
                    cols: calculateNumItemsInViewport(
                        contentWidth,
                        itemSize[1]
                    ),
                };

                const numToleratedItems = numToleratedItemsState || [
                    calculateNumToleratedItems(numItemsInViewportObj.rows),
                    calculateNumToleratedItems(numItemsInViewportObj.cols),
                ];

                return { numItemsInViewportObj, numToleratedItems };
            } else {
                const numItemsInViewport = calculateNumItemsInViewport(
                    horizontal ? contentWidth : contentHeight,
                    itemSize
                );

                const numToleratedItems =
                    numToleratedItemsState ||
                    calculateNumToleratedItems(numItemsInViewport);

                return { numItemsInViewport, numToleratedItems };
            }
        };

        const calculateOptions = () => {
            const {
                numItemsInViewport,
                numItemsInViewportObj,
                numToleratedItems,
            } = calculateNumItems();

            const calculateLast = (
                _first: number,
                _num: number,
                _numT: number,
                _isCols?: any
            ) =>
                getLast(
                    _first + _num + (_first < _numT ? 2 : 3) * _numT,
                    _isCols
                );
            let last: any;
            if (both) {
                last = {
                    rows: calculateLast(
                        firstStateObj.rows,
                        numItemsInViewportObj ? numItemsInViewportObj.rows : 0,
                        numToleratedItems[0]
                    ),
                    cols: calculateLast(
                        firstStateObj.cols,
                        numItemsInViewportObj ? numItemsInViewportObj.cols : 0,
                        numToleratedItems[1],
                        true
                    ),
                };
            } else {
                last = calculateLast(
                    firstState,
                    numItemsInViewport ?? 0,
                    numToleratedItems
                );
            }

            setNumItemsInViewportState(numItemsInViewport ?? 0);
            setNumItemsInViewportStateObj(
                numItemsInViewportObj ?? { rows: 0, cols: 0 }
            );
            setNumToleratedItemsState(numToleratedItems);
            both ? setLastStateObj(last) : setLastState(last);

            if (props.showLoader) {
                let arr: any[] = [];
                if (both) {
                    arr = Array.from({
                        length: numItemsInViewportObj
                            ? numItemsInViewportObj.rows
                            : 0,
                    }).map(() =>
                        Array.from({
                            length: numItemsInViewportObj
                                ? numItemsInViewportObj.cols
                                : 0,
                        })
                    );
                } else {
                    arr = Array.from({ length: numItemsInViewport ?? 0 });
                }
                setLoaderArrState(arr);
            }

            if (props.lazy) {
                props.onLazyLoad &&
                    props.onLazyLoad({ first: firstState, last });
            }
        };

        const getLast = (last = 0, isCols?: boolean) => {
            if (props.items) {
                return Math.min(
                    isCols
                        ? (props.columns || props.items[0]).length
                        : props.items.length,
                    last
                );
            }

            return 0;
        };

        const getContentPosition = () => {
            if (contentRef.current) {
                const style = getComputedStyle(contentRef.current);
                const left =
                    parseInt(style.paddingLeft, 10) +
                    Math.max(parseInt(style.left, 10), 0);
                const right =
                    parseInt(style.paddingRight, 10) +
                    Math.max(parseInt(style.right, 10), 0);
                const top =
                    parseInt(style.paddingTop, 10) +
                    Math.max(parseInt(style.top, 10), 0);
                const bottom =
                    parseInt(style.paddingBottom, 10) +
                    Math.max(parseInt(style.bottom, 10), 0);

                return {
                    left,
                    right,
                    top,
                    bottom,
                    x: left + right,
                    y: top + bottom,
                };
            }

            return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
        };

        const setSize = () => {
            if (elementRef.current) {
                const parentElement = elementRef.current.parentElement;
                const width =
                    props.scrollWidth ||
                    `${
                        elementRef.current.offsetWidth ||
                        parentElement.offsetWidth
                    }px`;
                const height =
                    props.scrollHeight ||
                    `${
                        elementRef.current.offsetHeight ||
                        parentElement.offsetHeight
                    }px`;
                const setProp = (_name: any, _value: any) =>
                    (elementRef.current.style[_name] = _value);

                if (both || horizontal) {
                    setProp('height', height);
                    setProp('width', width);
                } else {
                    setProp('height', height);
                }
            }
        };

        const setSpacerSize = () => {
            const items = props.items;

            if (spacerRef.current && items) {
                const itemSize: any = props.itemSize;
                const contentPos = getContentPosition();
                const setProp = (
                    _name: any,
                    _value: any,
                    _size: any,
                    _cpos = 0
                ) =>
                    (spacerRef.current.style[_name] =
                        (_value || []).length * _size + _cpos + 'px');

                if (both) {
                    setProp('height', items, itemSize[0], contentPos.y);
                    setProp(
                        'width',
                        props.columns || items[1],
                        itemSize[1],
                        contentPos.x
                    );
                } else {
                    horizontal
                        ? setProp(
                              'width',
                              props.columns || items,
                              itemSize,
                              contentPos.x
                          )
                        : setProp('height', items, itemSize, contentPos.y);
                }
            }
        };

        const setContentPosition = (pos: any) => {
            if (contentRef.current) {
                const first = pos ? pos.first : firstState;
                const itemSize: any = props.itemSize;
                const calculateTranslateVal = (_first: any, _size: any) =>
                    _first * _size;
                const setTransform = (_x = 0, _y = 0) => {
                    stickyRef.current &&
                        (stickyRef.current.style.top = `-${_y}px`);
                    contentRef.current.style.transform = `translate3d(${_x}px, ${_y}px, 0)`;
                };

                if (both) {
                    setTransform(
                        calculateTranslateVal(first.cols, itemSize[1]),
                        calculateTranslateVal(first.rows, itemSize[0])
                    );
                } else {
                    const translateVal = calculateTranslateVal(first, itemSize);
                    horizontal
                        ? setTransform(translateVal, 0)
                        : setTransform(0, translateVal);
                }
            }
        };

        const onScrollPositionChange = (event: any) => {
            const target = event.target;
            const itemSize: any = props.itemSize;
            const contentPos = getContentPosition();
            const calculateScrollPos = (_pos: any, _cpos: any) =>
                _pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0;
            const calculateCurrentIndex = (_pos: any, _size: any) =>
                Math.floor(_pos / (_size || _pos));
            const calculateTriggerIndex = (
                _currentIndex: any,
                _first: any,
                _last: any,
                _num: any,
                _numT: any,
                _isScrollDownOrRight: any
            ) => {
                return _currentIndex <= _numT
                    ? _numT
                    : _isScrollDownOrRight
                    ? _last - _num - _numT
                    : _first + _numT - 1;
            };
            const calculateFirst = (
                _currentIndex: any,
                _triggerIndex: any,
                _first: any,
                _last: any,
                _num: any,
                _numT: any,
                _isScrollDownOrRight: any
            ) => {
                if (_currentIndex <= _numT) return 0;
                else
                    return Math.max(
                        0,
                        _isScrollDownOrRight
                            ? _currentIndex < _triggerIndex
                                ? _first
                                : _currentIndex - _numT
                            : _currentIndex > _triggerIndex
                            ? _first
                            : _currentIndex - 2 * _numT
                    );
            };
            const calculateLast = (
                _currentIndex: any,
                _first: any,
                _last: any,
                _num: any,
                _numT: any,
                _isCols?: any
            ) => {
                let lastValue = _first + _num + 2 * _numT;

                if (_currentIndex >= _numT) {
                    lastValue += _numT + 1;
                }

                return getLast(lastValue, _isCols);
            };

            const scrollTop = calculateScrollPos(
                target.scrollTop,
                contentPos.top
            );
            const scrollLeft = calculateScrollPos(
                target.scrollLeft,
                contentPos.left
            );

            let newFirst;
            let newLast = both ? lastStateObj : lastState;
            let isRangeChanged = false;

            if (both) {
                const isScrollDown = lastScrollPos.current.top <= scrollTop;
                const isScrollRight = lastScrollPos.current.left <= scrollLeft;
                const currentIndex = {
                    rows: calculateCurrentIndex(scrollTop, itemSize[0]),
                    cols: calculateCurrentIndex(scrollLeft, itemSize[1]),
                };
                const triggerIndex = {
                    rows: calculateTriggerIndex(
                        currentIndex.rows,
                        firstStateObj.rows,
                        lastStateObj.rows,
                        numItemsInViewportStateObj.rows,
                        numToleratedItemsState[0],
                        isScrollDown
                    ),
                    cols: calculateTriggerIndex(
                        currentIndex.cols,
                        firstStateObj.cols,
                        lastStateObj.cols,
                        numItemsInViewportStateObj.cols,
                        numToleratedItemsState[1],
                        isScrollRight
                    ),
                };

                newFirst = {
                    rows: calculateFirst(
                        currentIndex.rows,
                        triggerIndex.rows,
                        firstStateObj.rows,
                        lastStateObj.rows,
                        numItemsInViewportStateObj.rows,
                        numToleratedItemsState[0],
                        isScrollDown
                    ),
                    cols: calculateFirst(
                        currentIndex.cols,
                        triggerIndex.cols,
                        firstStateObj.cols,
                        lastStateObj.cols,
                        numItemsInViewportStateObj.cols,
                        numToleratedItemsState[1],
                        isScrollRight
                    ),
                };
                newLast = {
                    rows: calculateLast(
                        currentIndex.rows,
                        newFirst.rows,
                        lastStateObj.rows,
                        numItemsInViewportStateObj.rows,
                        numToleratedItemsState[0]
                    ),
                    cols: calculateLast(
                        currentIndex.cols,
                        newFirst.cols,
                        lastStateObj.cols,
                        numItemsInViewportStateObj.cols,
                        numToleratedItemsState[1],
                        true
                    ),
                };

                isRangeChanged =
                    (newFirst.rows !== firstStateObj.rows &&
                        newLast.rows !== lastStateObj.rows) ||
                    (newFirst.cols !== firstStateObj.cols &&
                        newLast.cols !== lastStateObj.cols);

                lastScrollPos.current = { top: scrollTop, left: scrollLeft };
            } else {
                const scrollPos = horizontal ? scrollLeft : scrollTop;
                const isScrollDownOrRight = lastScrollPos.current <= scrollPos;
                const currentIndex = calculateCurrentIndex(scrollPos, itemSize);
                const triggerIndex = calculateTriggerIndex(
                    currentIndex,
                    firstState,
                    lastState,
                    numItemsInViewportState,
                    numToleratedItemsState,
                    isScrollDownOrRight
                );

                newFirst = calculateFirst(
                    currentIndex,
                    triggerIndex,
                    firstState,
                    lastState,
                    numItemsInViewportState,
                    numToleratedItemsState,
                    isScrollDownOrRight
                );
                newLast = calculateLast(
                    currentIndex,
                    newFirst,
                    lastState,
                    numItemsInViewportState,
                    numToleratedItemsState
                );
                isRangeChanged =
                    newFirst !== firstState && newLast !== lastState;

                lastScrollPos.current = scrollPos;
            }

            return {
                first: newFirst,
                last: newLast,
                isRangeChanged,
            };
        };

        const onScrollChange = (event: any) => {
            const { first, last, isRangeChanged } =
                onScrollPositionChange(event);

            if (isRangeChanged) {
                const newState = { first, last };

                setContentPosition(newState);

                if (typeof first === 'number') setFirstState(first);
                else setFirstStateObj(first);

                if (typeof last === 'number') setLastState(last);
                else setLastStateObj(last);

                props.onScrollIndexChange &&
                    props.onScrollIndexChange(newState);

                if (props.lazy) {
                    props.onLazyLoad && props.onLazyLoad(newState);
                }
            }
        };

        const onScroll = (event: any) => {
            props.onScroll && props.onScroll(event);

            if (props.delay) {
                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                if (!loadingState && props.showLoader) {
                    const { isRangeChanged: changed } =
                        onScrollPositionChange(event);
                    changed && setLoadingState(true);
                }

                scrollTimeout.current = setTimeout(() => {
                    onScrollChange(event);

                    if (loadingState && props.showLoader && !props.lazy) {
                        setLoadingState(false);
                    }
                }, props.delay);
            } else {
                onScrollChange(event);
            }
        };

        const getOptions = (renderedIndex: any) => {
            const count = (props.items || []).length;
            const index = both
                ? firstStateObj.rows + renderedIndex
                : firstState + renderedIndex;

            return {
                index,
                count,
                first: index === 0,
                last: index === count - 1,
                even: index % 2 === 0,
                odd: index % 2 !== 0,
                props,
            };
        };

        const loaderOptions = (index: any, extOptions: any) => {
            const count = loaderArrState.length;

            return {
                index,
                count,
                first: index === 0,
                last: index === count - 1,
                even: index % 2 === 0,
                odd: index % 2 !== 0,
                props,
                ...extOptions,
            };
        };

        const loadedItems = () => {
            const items = props.items;

            if (items && !loadingState) {
                if (both)
                    return items
                        .slice(firstStateObj.rows, lastStateObj.rows)
                        .map((item) =>
                            props.columns
                                ? item
                                : item.slice(
                                      firstStateObj.cols,
                                      lastStateObj.cols
                                  )
                        );
                else if (horizontal && props.columns) return items;
                else return items.slice(firstState, lastState);
            }

            return [];
        };

        const init = () => {
            setSize();
            calculateOptions();
            setSpacerSize();
        };

        useMountEffect(() => {
            init();
        });

        useUpdateEffect(() => {
            init();
        }, [props.itemSize, props.scrollHeight]);

        useUpdateEffect(() => {
            if (!prevItems || prevItems.length !== (props.items || []).length) {
                init();
            }

            if (
                props.lazy &&
                prevLoading !== props.loading &&
                props.loading !== loadingState
            ) {
                setLoadingState(props.loading);
            }
        });

        useUpdateEffect(() => {
            lastScrollPos.current = both ? { top: 0, left: 0 } : 0;
        }, [props.orientation]);

        React.useImperativeHandle(ref, () => ({
            scrollTo,
            scrollToIndex,
            scrollInView,
            getRenderedRange,
        }));

        const createLoaderItem = (index: any, extOptions: any = {}) => {
            const options = loaderOptions(index, extOptions);
            const content = ObjectUtils.getJSXElement(
                props.loadingTemplate,
                options
            );

            return <React.Fragment key={index}>{content}</React.Fragment>;
        };

        const createLoader = () => {
            if (!props.loaderDisabled && props.showLoader && loadingState) {
                const className = classNames('cs-virtualscroller-loader', {
                    'cs-component-overlay': !props.loadingTemplate,
                });

                let content = null;

                if (props.loadingTemplate) {
                    content = loaderArrState.map((_: any, index: any) => {
                        return createLoaderItem(
                            index,
                            both && {
                                numCols: both
                                    ? numItemsInViewportStateObj.cols
                                    : numItemsInViewportState,
                            }
                        );
                    });
                }
                if (content === null)
                    content = (
                        <i className="cs-virtualscroller-loading-icon csi csi-spinner csi-spin"></i>
                    );

                return <div className={className}>{content}</div>;
            }

            return null;
        };

        const createSpacer = () => {
            if (props.showSpacer) {
                return (
                    <div
                        ref={spacerRef}
                        className="cs-virtualscroller-spacer"
                    ></div>
                );
            }

            return null;
        };

        const createItem = (item: any, index: any) => {
            const options = getOptions(index);
            const content = ObjectUtils.getJSXElement(
                props.itemTemplate,
                item,
                options
            );

            return (
                <React.Fragment key={options.index}>{content}</React.Fragment>
            );
        };

        const createItems = () => {
            const items = loadedItems();

            return items.map(createItem);
        };

        const createContent = () => {
            const items = createItems();
            const className = classNames('cs-virtualscroller-content', {
                'cs-virtualscroller-loading': loadingState,
            });
            const content = (
                <div ref={contentRef} className={className}>
                    {items}
                </div>
            );

            if (props.contentTemplate) {
                const defaultOptions = {
                    className,
                    contentRef: (el: Element) =>
                        (contentRef.current = ObjectUtils.getRefElement(el)),
                    spacerRef: (el: Element) =>
                        (spacerRef.current = ObjectUtils.getRefElement(el)),
                    stickyRef: (el: Element) =>
                        (stickyRef.current = ObjectUtils.getRefElement(el)),
                    items: loadedItems,
                    getItemOptions: (index: any) => getOptions(index),
                    children: items,
                    element: content,
                    props,
                    loading: loadingState,
                    getLoaderOptions: (index: any, ext: any) =>
                        loaderOptions(index, ext),
                    loadingTemplate: props.loadingTemplate,
                    itemSize: props.itemSize,
                    rows: getRows(),
                    columns: getColumns(),
                    vertical,
                    horizontal,
                    both,
                };

                return ObjectUtils.getJSXElement(
                    props.contentTemplate,
                    defaultOptions
                );
            }

            return content;
        };

        if (props.disabled) {
            const content = ObjectUtils.getJSXElement(props.contentTemplate, {
                items: props.items,
                rows: props.items,
                columns: props.columns,
            });

            return (
                <React.Fragment>
                    {props.children}
                    {content}
                </React.Fragment>
            );
        } else {
            const otherProps = ObjectUtils.findDiffKeys(props, defaultProps);
            const className = classNames(
                'cs-virtualscroller',
                {
                    'cs-both-scroll': both,
                    'cs-horizontal-scroll': horizontal,
                },
                props.className
            );

            const loader = createLoader();
            const content = createContent();
            const spacer = createSpacer();

            return (
                <div
                    ref={elementRef}
                    className={className}
                    tabIndex={0}
                    style={props.style}
                    {...otherProps}
                    onScroll={onScroll}
                >
                    {content}
                    {spacer}
                    {loader}
                </div>
            );
        }
    })
);

VirtualScroller.displayName = 'VirtualScroller';
const defaultProps = {
    __TYPE: 'VirtualScroller',
    id: null,
    style: null,
    className: null,
    items: null,
    itemSize: 0,
    scrollHeight: null,
    scrollWidth: null,
    orientation: 'vertical',
    numToleratedItems: null,
    delay: 0,
    lazy: false,
    disabled: false,
    loaderDisabled: false,
    columns: null,
    loading: false,
    showSpacer: true,
    showLoader: false,
    loadingTemplate: null,
    itemTemplate: null,
    contentTemplate: null,
    onScroll: null,
    onScrollIndexChange: null,
    onLazyLoad: null,
};
