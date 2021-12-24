import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    addTask: (title: string) => void,
    title: string,
    setTitle: (title: string) => void
}

const Input = (props: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(props.title);
        }
    }

    return (
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
    );
};

export default Input;