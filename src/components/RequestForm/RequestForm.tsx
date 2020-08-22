import React from 'react';
import { Modal } from '../Modal';
import { Message } from '../Message';
import { ButtonComponent, EColors } from '../ButtonComponent';
import { generateRandomString } from '../../utils';
import { key } from '../../key';
import { IImage } from '../../App';
import styles from './requestform.css';

interface IRequestFormProps {
    handleSubmit: (image: IImage) => void;
    setImages: (images: IImage[]) => void;
    setRequestName: (category: string) => void;
    requestName: string;
}

export function RequestForm(props: IRequestFormProps) {
    const { handleSubmit, setImages, requestName, setRequestName } = props;
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoad, setIsLoad ] = React.useState(false);
    const [ message, setMessage] = React.useState('');

    React.useEffect(() => setInputValue(requestName), [requestName]);

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoad(true);

        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${inputValue}`)
            .then((response) => {
                return (response.ok) ? response.json() : response.json().then((error) => {
                    throw new Error('Произошла ошибка: ' + error.message);
                });
            })
            .then((response) => {
                const url = response.data.image_url;

                if (url) {
                    const image = {
                        id: generateRandomString(),
                        category: inputValue,
                        className: styles.imageItem,
                        content: <img
                                     src={url}
                                     onClick={() => setRequestName(inputValue)} 
                                     className={styles.image}
                                 />,
                    };
                    handleSubmit(image);
                    setIsLoad(false);
                } else {
                    setMessage('По тегу ничего не найдено');
                }
            })
            .catch((error) => setMessage(error.message));
    };

    const handleClick = () => {
        setInputValue('');
        setImages([]);
    };

    return (
        <>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    required
                    placeholder="введите тег"
                    onInvalid={(e) => e.currentTarget.setCustomValidity(`заполните поле 'тег'`)}
                    className={styles.input}
                />
                <ButtonComponent
                    disabled={isLoad}
                    color={EColors.green}
                    className={styles.margin}
                    type="submit"
                >
                    {isLoad ? 'Загрузка...' : 'Загрузить'}
                </ButtonComponent>
                <ButtonComponent
                    type="reset"
                    onClick={handleClick}
                    color={EColors.red}
                    className={styles.margin}
                >
                    Очистить
                </ButtonComponent>
            </form>
            {message && (
                <Modal>
                    <Message
                        message={message}
                        setMessage={setMessage}
                        setIsLoad={setIsLoad}
                    />
                </Modal>
            )}
        </>
    );
}
