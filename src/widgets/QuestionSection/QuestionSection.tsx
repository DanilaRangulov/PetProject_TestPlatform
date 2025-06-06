import React from 'react';
import RadioQuestion, {RadioOption, RadioQuestionModel} from "shared/ui/RadioQuestion/RadioQuestion";
import TextQuestion, {TextQuestionModel} from "shared/ui/TextQuestion/TextQuestion";
import * as classes from './QuestionSection.module.scss'
type body =
    | { type: 'radio'; content: RadioQuestionModel, options: RadioOption[]}
    | { type: 'text'; content: TextQuestionModel };
export interface SectionModel {
    title: string;
    elements: body[]
}
interface QuestionSectionProps {
    handleChange: (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
    content: SectionModel;
}
const QuestionSection = (props: QuestionSectionProps) => {
    const {handleChange} = props;
    const {title, elements} = props.content
    return (
        <div className={classes.questionSection}>
            <h1 className={'title3'}>{title}</h1>
            {elements.map((element, i) => {
                if (element.type === "radio") {
                    return (
                        <RadioQuestion
                            key={i}
                            handleChange={handleChange}
                            content={element.content}
                            options={element.options}
                        />
                    );
                }
                if (element.type === "text") {
                    return (
                        <TextQuestion
                            key={i}
                            handleChange={handleChange}
                            content={element.content}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default QuestionSection;