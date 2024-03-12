import { ObjectUtils } from 'src/utils/Utils';

export function startsWith(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = ObjectUtils.removeAccents(
        filter.toString()
    ).toLocaleLowerCase(filterLocale);
    let stringValue = ObjectUtils.removeAccents(
        value.toString()
    ).toLocaleLowerCase(filterLocale);

    return stringValue.slice(0, filterValue.length) === filterValue;
}

export function contains(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (
        filter === undefined ||
        filter === null ||
        (typeof filter === 'string' && filter.trim() === '')
    ) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = ObjectUtils.removeAccents(
        filter.toString()
    ).toLocaleLowerCase(filterLocale);
    let stringValue = ObjectUtils.removeAccents(
        value.toString()
    ).toLocaleLowerCase(filterLocale);

    return stringValue.indexOf(filterValue) !== -1;
}
export function notContains(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (
        filter === undefined ||
        filter === null ||
        (typeof filter === 'string' && filter.trim() === '')
    ) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = ObjectUtils.removeAccents(
        filter.toString()
    ).toLocaleLowerCase(filterLocale);
    let stringValue = ObjectUtils.removeAccents(
        value.toString()
    ).toLocaleLowerCase(filterLocale);

    return stringValue.indexOf(filterValue) === -1;
}

export function endsWith(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = ObjectUtils.removeAccents(
        filter.toString()
    ).toLocaleLowerCase(filterLocale);
    let stringValue = ObjectUtils.removeAccents(
        value.toString()
    ).toLocaleLowerCase(filterLocale);

    return (
        stringValue.indexOf(
            filterValue,
            stringValue.length - filterValue.length
        ) !== -1
    );
}
export function equals(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (
        filter === undefined ||
        filter === null ||
        (typeof filter === 'string' && filter.trim() === '')
    ) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() === filter.getTime();
    else
        return (
            ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(
                filterLocale
            ) ===
            ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(
                filterLocale
            )
        );
}

export function notEquals(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (
        filter === undefined ||
        filter === null ||
        (typeof filter === 'string' && filter.trim() === '')
    ) {
        return false;
    }

    if (value === undefined || value === null) {
        return true;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() !== filter.getTime();
    else
        return (
            ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(
                filterLocale
            ) !==
            ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(
                filterLocale
            )
        );
}

export function infilter(
    value: any,
    filter: any,
    filterLocale?: string
): boolean {
    if (filter === undefined || filter === null || filter.length === 0) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    for (let i = 0; i < filter.length; i++) {
        if (equals(value, filter[i])) {
            return true;
        }
    }

    return false;
}
export function between(value: any, filter: any): boolean {
    if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime)
        return (
            filter[0].getTime() <= value.getTime() &&
            value.getTime() <= filter[1].getTime()
        );
    else return filter[0] <= value && value <= filter[1];
}
export function lt(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() < filter.getTime();
    else return value < filter;
}
export function lte(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() <= filter.getTime();
    else return value <= filter;
}
export function gt(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() > filter.getTime();
    else return value > filter;
}
export function gte(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value.getTime && filter.getTime)
        return value.getTime() >= filter.getTime();
    else return value >= filter;
}
export function dateIs(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.toDateString() === filter.toDateString();
}
export function dateIsNot(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.toDateString() !== filter.toDateString();
}
export function dateBefore(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.getTime() < filter.getTime();
}
export function dateAfter(value: any, filter: any): boolean {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.getTime() > filter.getTime();
}
