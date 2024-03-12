import CsReact from './CsReact';
import { CsIcons } from './CsIcons';
import { FilterService } from './FilterService';
import { FilterMatchMode } from './FilterMatchMode';
import {
    locale,
    addLocale,
    localeOption,
    localeOptions,
    updateLocaleOption,
    updateLocaleOptions,
    ariaLabel,
} from './Locale';

export const enum FilterOperator {
    AND = 'and',
    OR = 'or',
}

export default CsReact;
export {
    CsIcons,
    FilterService,
    FilterMatchMode,
    addLocale,
    localeOption,
    localeOptions,
};
