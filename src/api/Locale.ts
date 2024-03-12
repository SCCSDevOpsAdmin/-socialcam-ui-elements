import CsReact from './CsReact';

let locales: Record<string, any> = {
    en: {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        noFilter: 'No Filter',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Greater than or equal to',
        dateIs: 'Date is',
        dateIsNot: 'Date is not',
        dateBefore: 'Date is before',
        dateAfter: 'Date is after',
        custom: 'Custom',
        clear: 'Clear',
        apply: 'Apply',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        accept: 'Yes',
        reject: 'No',
        choose: 'Choose',
        upload: 'Upload',
        cancel: 'Cancel',
        day: 'Day',
        dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        month: 'Month',
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        year: 'Year',
        today: 'Today',
        weekHeader: 'Wk',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'Enter a password',
        emptyFilterMessage: 'No available options',
        emptyMessage: 'No results found',
        aria: {
            trueLabel: 'True',
            falseLabel: 'False',
            nullLabel: 'Not Selected',
            pageLabel: 'Page',
            firstPageLabel: 'First Page',
            lastPageLabel: 'Last Page',
            nextPageLabel: 'Next Page',
            previousPageLabel: 'Previous Page',
        },
        status: {
            OFFLINE: 'Offline',
            ONLINE: 'Online',
            BUSY: 'Busy',
            ON_BREAK: 'On Break',
            AWAY: 'Away',
            LIVE: 'Live Streaming',
            UNKNOWN: 'Unknown',
        },
        thousand: 'k',
        million: 'm',
        billion: 'b',
        crop: 'Crop',
        zoom: 'Zoom',
        rotate: 'Rotate',
        imageSize: 'Image Size',
        rotateRight: 'Rotate right',
        rotateLeft: 'Rotate left',
    },
    el: {
        startsWith: 'Ξεκινάει με',
        contains: 'Περιέχει',
        notContains: 'Δεν περιέχει',
        endsWith: 'Τελειώνει με',
        equals: 'Είναι ίσο με',
        notEquals: 'Δεν είναι ίσο με',
        noFilter: 'Χωρίς φίλτρο',
        lt: 'Μικρότερο από',
        lte: 'Μικρότερο από ή ίσο με',
        gt: 'Μεγαλύτερο από',
        gte: 'Μεγαλύτερο από ή ίσο με',
        dateIs: 'Ημερομηνία είναι',
        dateIsNot: 'Ημερομηνία δεν είναι',
        dateBefore: 'Ημερομηνία είναι πριν τις',
        dateAfter: 'Ημερομηνία είναι μετά τις',
        custom: 'Custom',
        clear: 'Καθαρισμός',
        apply: 'Εφαρμογή',
        matchAll: 'Ταιριάζει με όλα',
        matchAny: 'Ταιριάζει με κάποιο',
        addRule: 'Προσθέστε κανόνα',
        removeRule: 'Διαγράψτε κανόνα',
        accept: 'Αποδοχή',
        reject: 'Απόρριψη',
        choose: 'Διαλέξτε',
        upload: 'Ανεβάστε',
        cancel: 'Ακύρωση',
        day: 'Ημέρα',
        dayNames: [
            'Κυριακή',
            'Δευτέρα',
            'Τρίτη',
            'Τετάρτη',
            'Πέμπτη',
            'Παρασκευή',
            'Σάββατο',
        ],
        dayNamesShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
        dayNamesMin: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
        month: 'Μήνας',
        monthNames: [
            'Ιανουάριος',
            'Φεβρουάριος',
            'Μάρτιος',
            'Απρίλιος',
            'Μάιος',
            'Ιούνιος',
            'Ιούλιος',
            'Αύγουστος',
            'Σεπτέμβριος',
            'Οκτώβριος',
            'Νοέμβριος',
            'Δεκέμβριος',
        ],
        monthNamesShort: [
            'Ιαν',
            'Φεβ',
            'Μαρ',
            'Απρ',
            'Μαι',
            'Ιουν',
            'Ιουλ',
            'Αυγ',
            'Σεπ',
            'Οκτ',
            'Νοε',
            'Δεκ',
        ],
        year: 'Χρονολογία',
        today: 'Σήμερα',
        weekHeader: 'Εβδ',
        firstDayOfWeek: 0,
        dateFormat: 'μμ/ηη/χχ',
        weak: 'Αδύναμο',
        medium: 'Μέτριο',
        strong: 'Δυνατό',
        passwordPrompt: 'Προσθέστε κωδικό πρόσβασης',
        emptyFilterMessage: 'Δεν υπάρχουν διαθέσιμες επιλογές',
        emptyMessage: 'Δεν βρέθηκαν αποτελέσματα',
        aria: {
            trueLabel: 'Σωστό',
            falseLabel: 'Λάθος',
            nullLabel: 'Δεν επιλέχθηκε',
            pageLabel: 'Σελίδα',
            firstPageLabel: 'Πρώτη Σελίδα',
            lastPageLabel: 'Τελευταία Σελίδα',
            nextPageLabel: 'Επόμενη Σελίδα',
            previousPageLabel: 'Προηγούμενη Σελίδα',
        },
        thousand: 'χιλ',
        million: 'εκ',
        billion: 'δις',
        crop: 'Περικοπή',
        zoom: 'Μεγέθυνση',
        rotate: 'Περιστροφή',
        imageSize: 'Διαστάσεις εικόνας',
        rotateRight: 'Δεξιά περιστροφή',
        rotateLeft: 'Αριστερή περιστροφή',
        status: {
            OFFLINE: 'Εκτός σύνδεσης',
            ONLINE: 'Διαθέσιμος',
            BUSY: 'Μη Διαθέσιμος',
            ON_BREAK: 'Σε διάλειμμα',
            AWAY: 'Απών',
            LIVE: 'Ζωντανή μετάδοση',
            UNKNOWN: 'Άγνωστο',
        },
    },
};

function locale(locale: string) {
    locale && (CsReact.locale = locale);

    return {
        locale: CsReact.locale,
        options: locales[CsReact.locale],
    };
}

function addLocale(locale: any, options: any) {
    locales[locale] = { ...locales['en'], ...options };
}

function updateLocaleOption(key: any, value: any, locale: string) {
    localeOptions(locale)[key] = value;
}

function updateLocaleOptions(options: any, locale: string) {
    const _locale = locale || CsReact.locale;
    locales[_locale] = { ...locales[_locale], ...options };
}

function localeOption(key: any, locale?: string) {
    const _locale = locale || CsReact.locale;

    try {
        return localeOptions(_locale)[key];
    } catch (error) {
        throw new Error(
            `The ${key} option is not found in the current locale('${_locale}').`
        );
    }
}

function ariaLabel(key: any) {
    const _locale = CsReact.locale;

    try {
        return localeOptions(_locale)['aria'][key];
    } catch (error) {
        throw new Error(
            `The ${key} option is not found in the current locale('${_locale}').`
        );
    }
}

//Improve with locale matching on languages ex "en-US as en"
function localeOptions(locale: string) {
    const _locale = locale || CsReact.locale;

    return locales[_locale] ?? locales[CsReact.locale];
}

export {
    locale,
    addLocale,
    updateLocaleOption,
    updateLocaleOptions,
    localeOption,
    localeOptions,
    ariaLabel,
};
