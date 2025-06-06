import React, {useCallback} from 'react';
import * as classes from "./questions.module.scss";
import {testActions} from "entities/test/slice/testSlice";
import {useDispatch, useSelector} from "react-redux";
import QuestionSection, {SectionModel} from "widgets/QuestionSection/QuestionSection";
import questionsData from 'shared/assets/questionData.json';
import AboutKid from "widgets/AboutKid/AboutKid";
import SwitchButton, {ButtonTheme} from "shared/ui/switchButton/SwitchButton";
import {StateScheme} from "app/providers/StoreProvider";
import {sendAnswers} from "entities/test/services/sendAnswers";
import Tip from "shared/ui/Tip/Tip";
import flag from "shared/assets/images/tipImages/flag.png";
import ok from "shared/assets/images/tipImages/ok.png";
import isMobile from "shared/functions/isMobile";
const Questions = () => {
    const dispatch = useDispatch<any>();
    const {answers, taskId} = useSelector((state: StateScheme) => state.test);
    const {currentStep} = useSelector((state: StateScheme) => state.test);
    const isComplete = useSelector((state: StateScheme) => {
        const answers = state.test.answers;
        return Object.values(answers).every(answer => answer !== null && answer !== '');
    });
    const handleChange = useCallback((questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const answer = e.target.value
        dispatch(testActions.setAnswer({ questionId, answer }));
    },[dispatch]);
    const uploadAnswers = useCallback(() => {
        dispatch(sendAnswers({answers, taskId}))
    }, [dispatch, answers])
    const getPrevStep = useCallback(() => {
        dispatch(testActions.prevStep())
    }, [dispatch, currentStep])
    const tipItems = [
        {
            imageUrl: ok,
            textContent: 'Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее подходящий вариант ответа, отражающий поведение и эмоциональное состояние вашего ребенка в течение последних 2-4 недель. Отвечайте максимально честно и искренне, так как от этого зависит точность оценки психоэмоционального развития Вашего ребенка.'
        },
        {
            imageUrl: flag,
            textContent: 'Все вопросы обязательны к заполнению.'
        }
    ]

    return (
        <div className={classes.questionsSection}>
            <AboutKid handleChange={handleChange}/>
            <Tip items={tipItems} classname={classes.Alert}/>
            {questionsData.sections && questionsData.sections.map((element: SectionModel, index: number) => <QuestionSection key={index} handleChange={handleChange} content={element}/>)}
            <div className={classes.bottom}>
                {
                    isMobile()
                        ? null
                        : <p className={`bold14`}
                             style={{color: '#A0A9B8'}}>Шаг {currentStep}/3</p>
                }
                <div className={classes.btns}>
                    <SwitchButton
                        onClick={getPrevStep}
                        theme={ButtonTheme.BACK}
                    >
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1L1 6L6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                        <span>К загрузке рисунков</span>
                    </SwitchButton>
                    <SwitchButton
                        disabled={!isComplete}
                        onClick={uploadAnswers}
                        theme={ButtonTheme.NEXT}
                    >
                        Узнать результаты
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 10L12.5 6L8.5 2M1.5 11L6.5 6L1.5 1" stroke="currentColor" stroke-opacity="0.5"
                                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </SwitchButton>
                </div>
                {
                    isMobile()
                        ? <p className={`bold14`}
                             style={{color: '#A0A9B8'}}>Шаг {currentStep}/3</p>
                        : null
                }
            </div>
        </div>
    );
};

export default Questions;