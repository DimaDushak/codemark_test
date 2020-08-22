import React from 'react';
import styles from './message.css';

interface IMessageProps {
    message: string;
    setMessage: (message: string) => void;
    setIsLoad: (isLoad: boolean) => void;
}

export function Message({ message, setMessage, setIsLoad }: IMessageProps) {
    const handleClick = () => { 
        setMessage('');
        setIsLoad(false);
    };
    const popup = React.useRef<HTMLDivElement>(null);

    return (
        <div
            className={styles.container}
            ref={popup}
            onClick={(e) => {
                if (e.target == popup.current) handleClick();
            }}
        >
            <div className={styles.message}>
                {message}
                <button
                    onClick={handleClick}
                    className={styles.closeButton}
                >&#215;</button>
            </div>
        </div>
    );
}
