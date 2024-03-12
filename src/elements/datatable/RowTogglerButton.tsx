import * as React from 'react';
import { Ripple } from '../ripple/Ripple';
import { classNames } from 'src/utils/Utils';
import './DataTable.scss';

export const RowTogglerButton = React.memo((props: any) => {
    const onClick = (event) => {
        props.onClick({
            originalEvent: event,
            data: props.rowData,
        });
    };

    const iconClassName = classNames(
        'cs-row-toggler-icon',
        props.expanded ? props.expandedRowIcon : props.collapsedRowIcon
    );

    return (
        <button
            type="button"
            onClick={onClick}
            className="cs-row-toggler cs-link"
            tabIndex={props.tabIndex}
        >
            <span className={iconClassName}></span>
            <Ripple />
        </button>
    );
});

RowTogglerButton.displayName = 'RowTogglerButton';
