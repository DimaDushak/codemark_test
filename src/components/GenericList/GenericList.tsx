import React from 'react';

export interface IGenericListItem {
    As?: 'li' | 'div';
    id: string;
    content: string | React.ReactNode;
    onClick?: () => void;
    className?: string;
}

interface IGenericListProps {
    list: IGenericListItem[];
}

const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'li', onClick = NOOP, id, content, className }) => (
                <As
                    key={id}
                    onClick={onClick}
                    className={className}
                >{content}</As>
            ))}
        </>
    );
}
