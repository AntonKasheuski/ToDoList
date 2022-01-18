import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

/*    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : <div>Enter title</div>*/

    return (
        <div style={{textAlign: "center"}}>
            <TextField
                variant={"outlined"}
                size={"small"}
                label={"Enter item title"}
                helperText={error && "Title is required!" }
                //className={error ? "error" : ""}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
                error={error}
            />
            <IconButton
                color={"primary"}
                onClick={addItem}
            >
                <AddBox />
            </IconButton>
        </div>
    );
};