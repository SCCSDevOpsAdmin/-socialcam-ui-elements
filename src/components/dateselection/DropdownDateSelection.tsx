import React, { forwardRef, useEffect, useState } from 'react';
import { localeOption } from 'src/api/Api';
import { Dropdown } from 'src/elements';

interface DateSelectionProps {
    id?: string | undefined;
    date?: Date | string;
    maxDate?: Date | string;
    minDate?: Date | string;
    onChangeDay?(day: number): any;
    onChangeMonth?(month: number): any;
    onChangeYear?(year: number): any;
    onChange?(date: any): any;
    locale?: string;
}

export const DropdownDateSelection = React.memo(
    forwardRef((props: DateSelectionProps | any, ref?) => {
        const monthNames = localeOption('monthNames', props.locale);
        const days = Array.from({ length: 31 }, (_, i) => i + 1);

        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 99;
        const maxYear = currentYear + 1;
        const years = Array.from(
            { length: maxYear - minYear },
            (_, i) => i + minYear
        );
        const months = Array.from(monthNames, (month, index) => {
            return {
                label: month,
                value: index,
            };
        });
        const [day, setDay] = useState<number>();
        const [month, setMonth] = useState<number>(); //0~11
        const [year, setYear] = useState(years[years.length - 1]);
        const [dateValue, setDateValue] = useState<Date>();

        useEffect(() => {
            const newDate: Date = props.date
                ? new Date(props.date)
                : new Date();
            initDateValues(newDate);
        }, [props.date]);

        function initDateValues(newDate: Date) {
            setDay(newDate.getDate());
            setMonth(newDate.getMonth());
            setYear(newDate.getFullYear());
            setDateValue(newDate);
        }

        function changeDay(day: number) {
            let value = new Date(dateValue.setDate(day));
            setDateValue(value);
            setDay(day);
            if (props.onChangeDay) props.onChangeDay(day);
            if (props.onChange) props.onChange(value);
        }

        function changeMonth(month: number) {
            let value = new Date(dateValue.setMonth(month));
            setDateValue(value);
            setMonth(month);
            if (props.onChangeMonth) props.onChangeMonth(month);
            if (props.onChange) props.onChange(value);
        }

        function changeYear(year: number) {
            let value = new Date(dateValue.setFullYear(year));
            setDateValue(value);
            setYear(year);
            if (props.onChangeYear) props.onChangeYear(year);
            if (props.onChange) props.onChange(value);
        }
        return (
            <>
                <div
                    id={props.id}
                    className="flex-row-evenly-center flex-wrap gap-2"
                >
                    <Dropdown
                        id="dd-selection-dd"
                        className="auto-width flex-grow-1"
                        name="days-selection-input"
                        value={day}
                        options={days}
                        onChange={(e: any) => {
                            changeDay(e.value);
                        }}
                        placeholder={localeOption('day', props.locale)}
                    />
                    <Dropdown
                        id="dd-selection-mm"
                        className="auto-width flex-grow-1"
                        name="month-selection-input"
                        value={month}
                        options={months}
                        onChange={(e: any) => {
                            changeMonth(e.value);
                        }}
                        placeholder={localeOption('month', props.locale)}
                    />
                    <Dropdown
                        id="dd-selection-yy"
                        className="auto-width flex-grow-1"
                        name="year-selection-input"
                        value={year}
                        options={years}
                        onChange={(e: any) => {
                            changeYear(e.value);
                        }}
                        placeholder={localeOption('year', props.locale)}
                    />
                </div>
            </>
        );
    })
);
