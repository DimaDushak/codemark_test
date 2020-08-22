import React from 'react';
import ReactDOM from 'react-dom';

interface IModalProps {
    children: React.ReactNode;
}

export function Modal({ children }: IModalProps) {
    const el = document.createElement('div');

    React.useEffect(() => {
        const modalRoot = document.getElementById('modal-root');
        modalRoot?.appendChild(el);

        return () => {
            modalRoot?.removeChild(el);
        };
    }, []);

    return ReactDOM.createPortal(children, el);
}
