import React from 'react';
import * as classes from './tipitem.module.scss'
export interface TipItemProps {
    imageUrl: string;
    textContent: string
}
const TipItem = (props: TipItemProps) => {
    const {imageUrl, textContent} = props;
    return (
        <div
            className={`regular16 ${classes.tipItem}`}
            style={{ '--icon-url': `url(${imageUrl})` } as Record<string, string>}
        >
            <span className={'regular16'}>{textContent}</span>
        </div>
    );
};

export default TipItem;