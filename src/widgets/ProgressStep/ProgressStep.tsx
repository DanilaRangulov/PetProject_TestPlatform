import React from 'react';
import * as classes from './progressStep.module.scss'
interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    const progressPercent = (currentStep / totalSteps) * 100;

    return (
        <div className={classes.ProgressStep}>
            <div style={{
                width: `${progressPercent}%`,
            }} className={classes.progress} />
        </div>
    );
};

export default ProgressBar;
