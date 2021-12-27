import React from 'react';
import s from './Todolist.module.css'
import {TaskType} from "./Todolist";

type PropsType = {
    tasks: Array<TaskType>
    onChangeCheckbox: (tID: string, value: boolean) => void
    onClickHandler: (tID: string) => void
}

export const TasksMap = ({tasks, onChangeCheckbox, onClickHandler, ...props}: PropsType) => {
    return (
        <ul>
            {
                tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? s.isDone : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e)=>onChangeCheckbox(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={ () => onClickHandler(t.id) }>x</button>
                    </li>
                })
            }
        </ul>
    );
};
