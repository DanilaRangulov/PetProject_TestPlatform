import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
import * as classes from './dataArea.module.scss'
import "./datapicker.css";
import DatePicker, {ReactDatePickerCustomHeaderProps, registerLocale} from "react-datepicker";
import { ru } from 'date-fns/locale';
import {format} from "date-fns";
import {classNames} from "shared/lib/classNames/classNames";

interface DataAreaProps {
    questionId: string
    handleChange: (questionId: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}
const renderCustomHeader = ({date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled}:ReactDatePickerCustomHeaderProps) => {
    const month = format(date, "LLLL", { locale: ru })
    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    const year = format(date, "yyyy", { locale: ru });
    return <div className={`${classes.customNav}`}>
        <button className={classes.btnDataPickerNav} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L1 6L6 11" stroke="#293244" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
        </button>
        <div className={classes.selectedDate}>
            <p className={'bold18'}>{monthCapitalized}</p>
            <p className={'regular16'} style={{color: '#69758E'}}>{year}</p>
        </div>
        <button className={classes.btnDataPickerNav} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L6 6L1 1" stroke="#293244" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
}
const DataArea = (props: DataAreaProps) => {
    const {questionId, handleChange} = props
    const [hasContent, setHasContent] = React.useState(false);
    const answer = useSelector((state:StateScheme) => state.test.answers[questionId]);
    // const [date, setDate] = useState(answers[`${questionId}`] || '2018-07-22');
    const [date, setDate] = useState<Date>(answer ? new Date(answer) : null);
    const onChangeHandle = (questionId: string, date: Date)  => {
        console.log(questionId, date)
        setHasContent(true);
        handleChange(questionId)({
            target: {
                value: date.toISOString().split("T")[0]
            }
        } as React.ChangeEvent<HTMLInputElement>);
        setDate(date)
    }
    registerLocale('ru', ru);
    const mods: Record<string, boolean> = {
        [classes.hasContent]: hasContent,
    };
    return (
        <div className={classes.DataArea}>
            <h1 className={'regular16'}>Дата рождения ребенка</h1>
            <DatePicker
                selected={date}
                placeholderText={'28.07.1986'}
                onChange={(date: Date) =>  onChangeHandle(questionId, date)}
                // dateFormat="dd.MM.yyyy"
                locale={ru}
                popperPlacement="bottom-start"
                popperClassName={classes.customPopper}
                calendarClassName={classes.customCalendar}   // кастомный класс календаря
                className={classNames(classes.customInput, mods)}            // кастомный класс input
                renderCustomHeader={renderCustomHeader}
            />
            {/*<input*/}
            {/*    value={date}*/}
            {/*    onChange={handleChange(questionId)}*/}
            {/*    type={'date'}*/}
            {/*    id="childBirthdate"*/}
            {/*/>*/}
        </div>
    );
};

export default DataArea;