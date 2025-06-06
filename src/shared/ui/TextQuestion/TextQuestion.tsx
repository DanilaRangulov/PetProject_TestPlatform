import React, {useCallback} from 'react';
import * as classes from './TextQuestion.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
export interface TextQuestionModel {
    questionId: string,
    title: string,
    rows?: number
}
interface TextQuestionProps {
    handleChange: (questionId: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    content: TextQuestionModel
}
const TextQuestion = (props: TextQuestionProps) => {
    const {handleChange, content: {questionId, title, rows}} = props;
    const answer = useSelector((state:StateScheme) => state.test.answers[questionId]);
    const [hasContent, setHasContent] = React.useState(Boolean(answer));
    const onChangeHandle = useCallback( (questionId: string) =>
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setHasContent(e.target.value !== '');
            handleChange(questionId)(e);
        },
        [handleChange, questionId]
    );
    const mods: Record<string, boolean> = {
        [classes.hasContent]: hasContent,
    };
    return (
        <div>
            <h1 className={'regular16'}>{title}</h1>
            <textarea
                value={answer}
                id="specialAreas"
                name="specialAreas"
                rows={rows || 4}
                onChange={onChangeHandle(questionId)}
                className={classNames(classes.textArea, mods)}
            />
        </div>
    );
};

export default TextQuestion;