import * as React from 'react';
//import { localeOption } from '../../api/Api';
import { CSSTransition } from '../csstransition/CSSTransition';
import { Portal } from '../portal/Portal';
import { classNames, ObjectUtils } from 'src/utils/Utils';
import { VirtualScroller } from '../virtualscroller/VirtualScroller';
import { DropdownItem } from './DropdownItem';

import './Dropdown.scss';

export const DropdownPanel = React.memo(
    React.forwardRef((props: any, ref: any) => {
        const virtualScrollerRef = React.useRef<any>(null);
        const filterInputRef = React.useRef<any>(null);
        const isEmptyFilter =
            !(props.visibleOptions && props.visibleOptions.length) &&
            props.hasFilter;

        const onEnter = () => {
            props.onEnter(() => {
                if (virtualScrollerRef.current) {
                    const selectedIndex = props.getSelectedOptionIndex();
                    if (selectedIndex !== -1) {
                        setTimeout(
                            () =>
                                virtualScrollerRef.current.scrollToIndex(
                                    selectedIndex
                                ),
                            0
                        );
                    }
                }
            });
        };

        const onEntered = () => {
            props.onEntered(() => {
                if (props.filter && props.filterInputAutoFocus) {
                    filterInputRef.current.focus();
                }
            });
        };

        const onFilterInputChange = (event: any) => {
            virtualScrollerRef.current &&
                virtualScrollerRef.current.scrollToIndex(0);

            props.onFilterInputChange && props.onFilterInputChange(event);
        };

        const createGroupChildren = (optionGroup: any) => {
            const groupChildren = props.getOptionGroupChildren(optionGroup);
            return groupChildren.map((option: any, j: any) => {
                const optionLabel = props.getOptionLabel(option);
                const optionKey = j + '_' + props.getOptionRenderKey(option);
                const disabled = props.isOptionDisabled(option);

                return (
                    <DropdownItem
                        key={optionKey}
                        label={optionLabel}
                        option={option}
                        template={props.itemTemplate}
                        selected={props.isSelected(option)}
                        disabled={disabled}
                        onClick={props.onOptionClick}
                    />
                );
            });
        };

        const createEmptyMessage = (emptyMessage?: any, isFilter?: any) => {
            const message = ObjectUtils.getJSXElement(emptyMessage, props);
            //|| localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');

            return <li className="cs-dropdown-empty-message">{message}</li>;
        };

        const createItem = (option: any, index: any) => {
            if (props.optionGroupLabel) {
                const groupContent = props.optionGroupTemplate
                    ? ObjectUtils.getJSXElement(
                          props.optionGroupTemplate,
                          option,
                          index
                      )
                    : props.getOptionGroupLabel(option);
                const groupChildrenContent = createGroupChildren(option);
                const key = index + '_' + props.getOptionGroupRenderKey(option);

                return (
                    <React.Fragment key={key}>
                        <li className="cs-dropdown-item-group">
                            {groupContent}
                        </li>
                        {groupChildrenContent}
                    </React.Fragment>
                );
            } else {
                const optionLabel = props.getOptionLabel(option);
                const optionKey =
                    index + '_' + props.getOptionRenderKey(option);
                const disabled = props.isOptionDisabled(option);

                return (
                    <DropdownItem
                        key={optionKey}
                        label={optionLabel}
                        option={option}
                        template={props.itemTemplate}
                        selected={props.isSelected(option)}
                        disabled={disabled}
                        onClick={props.onOptionClick}
                    />
                );
            }
        };

        const createItems = () => {
            if (ObjectUtils.isNotEmpty(props.visibleOptions)) {
                return props.visibleOptions.map(createItem);
            } else if (props.hasFilter) {
                return createEmptyMessage(props.emptyFilterMessage, true);
            }

            return createEmptyMessage(props.emptyMessage);
        };

        const createFilterClearIcon = () => {
            if (props.showFilterClear && props.filterValue) {
                return (
                    <i
                        className="cs-dropdown-filter-clear-icon csi csi-times"
                        onClick={() =>
                            props.onFilterClearIconClick(() =>
                                filterInputRef.current.focus()
                            )
                        }
                    ></i>
                );
            }

            return null;
        };

        const createFilter = () => {
            if (props.filter) {
                const clearIcon = createFilterClearIcon();
                const containerClassName = classNames(
                    'cs-dropdown-filter-container',
                    { 'cs-dropdown-clearable-filter': !!clearIcon }
                );
                return (
                    <div className="cs-dropdown-header">
                        <div className={containerClassName}>
                            <input
                                ref={filterInputRef}
                                type="text"
                                autoComplete="off"
                                className="cs-dropdown-filter cs-inputtext cs-component"
                                placeholder={props.filterPlaceholder}
                                onKeyDown={props.onFilterInputKeyDown}
                                onChange={onFilterInputChange}
                                value={props.filterValue}
                            />
                            {clearIcon}
                            <i className="cs-dropdown-filter-icon csi csi-search"></i>
                        </div>
                    </div>
                );
            }

            return null;
        };

        const createContent = () => {
            if (props.virtualScrollerOptions) {
                const virtualScrollerProps = {
                    ...props.virtualScrollerOptions,
                    ...{
                        style: {
                            ...props.virtualScrollerOptions.style,
                            ...{ height: props.scrollHeight },
                        },
                        className: classNames(
                            'cs-dropdown-items-wrapper',
                            props.virtualScrollerOptions.className
                        ),
                        items: props.visibleOptions,
                        onLazyLoad: (event: any) =>
                            props.virtualScrollerOptions.onLazyLoad({
                                ...event,
                                ...{ filter: props.filterValue },
                            }),
                        itemTemplate: (item: any, options: any) =>
                            item && createItem(item, options.index),
                        contentTemplate: (options: any) => {
                            const className = classNames(
                                'cs-dropdown-items',
                                options.className
                            );
                            const content = isEmptyFilter
                                ? createEmptyMessage()
                                : options.children;

                            return (
                                <ul
                                    ref={options.contentRef}
                                    className={className}
                                    role="listbox"
                                >
                                    {content}
                                </ul>
                            );
                        },
                    },
                };

                return (
                    <VirtualScroller
                        ref={virtualScrollerRef}
                        {...virtualScrollerProps}
                    />
                );
            } else {
                const items = createItems();

                return (
                    <div
                        className="cs-dropdown-items-wrapper"
                        style={{ maxHeight: props.scrollHeight || 'auto' }}
                    >
                        <ul className="cs-dropdown-items" role="listbox">
                            {items}
                        </ul>
                    </div>
                );
            }
        };

        const createElement = () => {
            const className = classNames(
                'cs-dropdown-panel cs-component',
                props.panelClassName
            );
            const filter = createFilter();
            const content = createContent();

            return (
                <CSSTransition
                    nodeRef={ref}
                    classNames="cs-connected-overlay"
                    in={props.in}
                    timeout={{ enter: 120, exit: 100 }}
                    options={props.transitionOptions}
                    unmountOnExit
                    onEnter={onEnter}
                    onEntering={props.onEntering}
                    onEntered={onEntered}
                    onExit={props.onExit}
                    onExited={props.onExited}
                >
                    <div
                        ref={ref}
                        className={className}
                        style={props.panelStyle}
                        onClick={props.onClick}
                    >
                        {filter}
                        {content}
                    </div>
                </CSSTransition>
            );
        };

        const element = createElement();

        return <Portal element={element} appendTo={props.appendTo} />;
    })
);

DropdownPanel.displayName = 'DropdownPanel';
