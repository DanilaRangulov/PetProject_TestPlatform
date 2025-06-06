import React, {ButtonHTMLAttributes} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as classes from "./switchbutton.module.scss"
export enum ButtonTheme {
    BACK = 'backTheme',
    NEXT = 'nextTheme'
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    disabled?: boolean;
    theme?: ButtonTheme
    iconUrl?: any
}
const SwitchButton = (props: ButtonProps) => {
    const {disabled, children, theme, iconUrl, ...otherProps} = props;
    const mods: Record<string, boolean> = {
        [classes.disabled]: disabled,
        [classes[theme]]: true
    };

    return (
        <button
            className={classNames(classes.btn, mods, ['regular16'])}
            disabled={disabled}
            {...otherProps}>
            {children}
        </button>
    );
};

export default SwitchButton;