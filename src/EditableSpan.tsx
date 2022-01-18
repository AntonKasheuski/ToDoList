import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {setEditMode(true)}
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {offEditMode()}
    }

    return (
        editMode
            ? <TextField
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressOffEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;