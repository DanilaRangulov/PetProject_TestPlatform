import React from 'react';
import * as classes from './mainpage.module.scss'
import TestWindow from "entities/test/ui/TestWindow/TestWindow";
const MainPage = () => {
    return (
        <div className={`${classes.main_page} container`}>
            <TestWindow/>
        </div>
    );
};

export default MainPage;