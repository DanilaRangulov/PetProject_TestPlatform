import React from 'react';
import * as classes from './tip.module.scss'
import TipItem, {TipItemProps} from "shared/ui/Tip/ui/TipItem/TipItem";
import {classNames} from "shared/lib/classNames/classNames";
interface TipProps {
    items: TipItemProps[];
    classname?: string;
}
const Tip = (props: TipProps) => {
    const {items, classname} = props;
    return (
        <div className={classNames(classes.tip, {}, [classname], )}>
            {items.map((item, index) => <TipItem textContent={item.textContent} imageUrl={item.imageUrl} key={index} />)}
        </div>
    );
};

export default Tip;