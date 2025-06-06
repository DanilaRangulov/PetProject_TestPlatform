import React from 'react';
import ProgressBar from "widgets/ProgressStep/ProgressStep";
import UploadImageStep from "entities/test/ui/uploadImageStep/UploadImageStep";
import Questions from "entities/test/ui/Questions/Questions";
import {useSelector} from "react-redux";
import {StateScheme} from "app/providers/StoreProvider";
import Report from "entities/test/ui/Report/Report";

const TestWindow = () => {
    const {currentStep} = useSelector((state: StateScheme) => state).test;
    return (
        <div>
            <ProgressBar currentStep={currentStep} totalSteps={3}/>
            {currentStep === 1 && <UploadImageStep />}
            {currentStep === 2 && <Questions />}
            {currentStep === 3 && <Report />}
        </div>
    );
};

export default TestWindow;