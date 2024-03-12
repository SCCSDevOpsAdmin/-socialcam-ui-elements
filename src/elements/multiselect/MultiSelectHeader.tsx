import * as React from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import { InputText } from '../inputtext/InputText';
import { Ripple } from '../ripple/Ripple';
import { ObjectUtils } from 'src/utils/Utils';

export const MultiSelectHeader = React.memo((props: any) => {
    const onFilter = (event) => {
        if (props.onFilter) {
            props.onFilter({
                originalEvent: event,
                query: event.target.value,
            });
        }
    };

    const onSelectAll = (event) => {
        if (props.onSelectAll) {
            props.onSelectAll({
                originalEvent: event,
                checked: props.selectAll,
            });
        }

        event.preventDefault();
    };

    const createFilterElement = () => {
        if (props.filter) {
            return (
                <div className="cs-multiselect-filter-container">
                    <InputText
                        type="text"
                        role="textbox"
                        value={props.filterValue}
                        onChange={onFilter}
                        className="cs-multiselect-filter"
                        placeholder={props.filterPlaceholder}
                    />
                    <span className="cs-multiselect-filter-icon csi csi-search"></span>
                </div>
            );
        }

        return null;
    };

    const filterElement = createFilterElement();
    const checkboxElement = props.showSelectAll && (
        <Checkbox
            checked={props.selectAll}
            onChange={onSelectAll}
            role="checkbox"
            aria-checked={props.selectAll}
        />
    );
    const closeElement = (
        <button
            type="button"
            className="cs-multiselect-close cs-link"
            onClick={props.onClose}
        >
            <span className="cs-multiselect-close-icon csi csi-times"></span>
            <Ripple />
        </button>
    );
    const element = (
        <div className="cs-multiselect-header">
            {checkboxElement}
            {filterElement}
            {closeElement}
        </div>
    );

    if (props.template) {
        const defaultOptions = {
            className: 'cs-multiselect-header',
            checkboxElement,
            checked: props.selectAll,
            onChange: onSelectAll,
            filterElement,
            closeElement,
            closeElementClassName: 'cs-multiselect-close cs-link',
            closeIconClassName: 'cs-multiselect-close-icon csi csi-times',
            onCloseClick: props.onClose,
            element,
            props,
        };

        return ObjectUtils.getJSXElement(props.template, defaultOptions);
    }

    return element;
});

MultiSelectHeader.displayName = 'MultiSelectHeader';
