import React, {ChangeEventHandler} from 'react';
import TextQuestion from "shared/ui/TextQuestion/TextQuestion";
import DataArea from "widgets/AboutKid/ui/DataArea/DataArea";
import RadioQuestion from "shared/ui/RadioQuestion/RadioQuestion";
import * as classes from './aboutkid.module.scss'
interface AboutKidProps {
    handleChange: (questionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const AboutKid = (props: AboutKidProps) => {
    const { handleChange } = props;
    return (
        <div className={classes.AboutKid}>
            <h1 className={'title3'}>Общая информация о ребенке</h1>
            <TextQuestion handleChange={handleChange} content={{questionId: 'childName', title: 'Имя ребенка', rows: 1}}/>
            <DataArea questionId={'childDOB'} handleChange={handleChange}/>
            <RadioQuestion handleChange={handleChange} content={{questionId: 'childGender', title: 'Пол ребенка'}} options={[{label: 'Мужской', value: '1'}, {label: 'Женский', value: '2'}]}/>
            <TextQuestion handleChange={handleChange} content={{questionId: 'parentName', title: 'Имя родителя, заполняющего анкету', rows: 1}}/>
        </div>
    );
};

export default AboutKid;