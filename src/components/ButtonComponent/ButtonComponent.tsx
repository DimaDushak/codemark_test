import React from 'react';
import classNames from 'classnames';
import styles from './buttoncomponent.css';

export enum EColors {
    green = 'green',
    red = 'red',
    blue = 'blue'
}

type TButton = 'reset' | 'submit' | 'button';

interface IButtonComponents {
    color: EColors;
    children: string;
    className?: string;
    type?: TButton;
    disabled?: boolean;
    onClick?: () => void;
}

export function ButtonComponent(props: IButtonComponents) {
    const { color, children, disabled, className, type = 'button', onClick = () => {} } = props;
    const classes = classNames(
        styles.button,
        styles[color],
        className
    );

    return (
        <button className={classes} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
}
