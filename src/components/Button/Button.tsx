import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    text: string
    onClick: () => void;
    size: 'small' | 'large';
    loading: boolean;
}

export const Button = ({ text, onClick, size, loading }: ButtonProps) => {
    return (
        <a onClick={onClick} className = {loading ? styles.disabled : "" }>
            <div  
                className={`${size === 'small' ? styles.buttonSmall : styles.buttonLarge}`}>
                <p className = {`${size === 'small' ? styles.buttonTextSmall : styles.buttonTextLarge}`}>{text}</p>
            </div>
        </a>
    )
}