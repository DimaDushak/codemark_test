import React from 'react';
import { Layout } from './components/Layout';
import { RequestForm } from './components/RequestForm';
import { ButtonComponent, EColors } from './components/ButtonComponent';
import { GenericList } from './components/GenericList';
import { generateRandomString } from './utils';
import './main.global.css';

export interface IImage {
    id: string;
    content: React.ReactNode;
    className: string;
    category: string;
}

interface IAccumulate {
    [N: string]: Omit<IImage, 'category'>[];
}

export const App = () => {
    const [ images, setImages ] = React.useState<IImage[]>([]);
    const [ isGrouped, setisGrouped ] = React.useState(false);
    const [ requestName, setRequestName ] = React.useState('');

    const handleSubmit = (image: IImage) => {
        setImages((prevValue) => prevValue.concat(image));
    };

    const groupImages = (array: IImage[]) => {
        const newArray = array.reduce((previousValue: IAccumulate, { category, ...item }: IImage) => {
            if (!previousValue[category]) previousValue[category] = [];
            previousValue[category].push(item);

            return previousValue;
        }, {});

        return Object.keys(newArray).map(item => ({
            As: 'div' as const,
            id: generateRandomString(),
            className: "images-block",
            content: <>
                        <p className="heading">{item}</p>
                        <ul className="images-list">
                            <GenericList list={newArray[item]} />
                        </ul>
                     </>
        }));
    };

    return (
        <Layout>
            <div className="container">
                <div className="flex">
                    <RequestForm
                        handleSubmit={handleSubmit}
                        setImages={setImages}
                        requestName={requestName}
                        setRequestName={setRequestName}
                    />
                    <ButtonComponent
                        onClick={() => setisGrouped(!isGrouped)}
                        color={EColors.blue}
                        className="margin"
                    >
                        {isGrouped ? 'Разгруппировать' : 'Группировать'}
                    </ButtonComponent>
                </div>
                {isGrouped ? <GenericList list={groupImages(images)} /> : 
                    <ul className="images-list">
                        <GenericList list={images} />
                    </ul>
                }
            </div>
        </Layout>
    );
}
