import React from 'react';

type PropsType = {
    name: string,
    callback: () => void
}

export const Button = (props: PropsType) => {
    const onClickButtonHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onClickButtonHandler}>{props.name}</button>
    );
};