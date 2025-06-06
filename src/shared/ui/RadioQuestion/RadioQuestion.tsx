import React, {ChangeEvent} from 'react';
import * as classes from "./RadioQuestion.module.scss";
import {useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
export interface RadioQuestionModel {
    questionId: string,
    title: string,
}
interface RadioQuestionProps {
    handleChange: (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void,
    content: RadioQuestionModel
    options: RadioOption[]
}
export interface RadioOption {
    label: string;
    value: string;
}
const RadioQuestion = (props: RadioQuestionProps) => {
    const {handleChange, content: {questionId, title}, options} = props;
    const answer = useSelector((state:StateScheme) => state.test.answers[questionId]);

    // const {questionId, title} = props.content;
    return (
        <div className={classes.question}>
            <h1 className={'regular16'}>{title}</h1>
            <div className={classes.questionGroup}>
                {options.map((option, index) => (
                    <label className={classes.customRadio} key={option.value}>
                        <input
                            type="radio"
                            name={questionId}
                            value={option.value}
                            id={`${questionId}_${index + 1}`}
                            onChange={handleChange(questionId)}
                            checked={answer === option.value}
                        />
                        <span className={classes.radioIndicator}></span>
                        <p className={'regular12'}>{option.label}</p>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioQuestion;