import { ObjectUtils } from 'src/utils/Utils';
import {
    between,
    contains,
    dateAfter,
    dateBefore,
    dateIs,
    dateIsNot,
    endsWith,
    equals,
    gt,
    gte,
    infilter,
    lt,
    lte,
    notContains,
    notEquals,
    startsWith,
} from './filters/index';
import { FilterMatchMode } from './types';

type FilterType =
    | 'startsWith'
    | 'contains'
    | 'notContains'
    | 'endsWith'
    | 'equals'
    | 'notEquals'
    | 'in'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'between'
    | 'dateIs'
    | 'dateIsNot'
    | 'dateBefore'
    | 'dateAfter';

export const FilterService = {
    filter(
        value: any,
        fields: string[],
        filterValue: any,
        filterMatchMode: FilterType | string,
        filterLocale?: string
    ): any[] {
        let filteredItems = [];

        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    let fieldValue = ObjectUtils.resolveFieldData(item, field);
                    if (
                        filters[filterMatchMode](
                            fieldValue,
                            filterValue,
                            filterLocale
                        )
                    ) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    },

    register(rule: FilterType | string, fn: (...arg: any[]) => boolean): void {
        filters[rule] = fn;
    },
};

const filters: Record<
    FilterType,
    (value: any, filterValue: any, filterLocale?: string) => boolean
> = {
    startsWith,
    contains,
    notContains,
    endsWith,
    equals,
    notEquals,
    in: infilter,
    lt,
    lte,
    gt,
    gte,
    between,
    dateIs,
    dateIsNot,
    dateBefore,
    dateAfter,
};
