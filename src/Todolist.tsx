import React, {useState} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input";
import Button from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const onClickFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)}

    return <div>
        <h3>{props.title}</h3>
        <Input addTask={addTask} title={title} setTitle={setTitle} />
        <Button name={'+'} callback={addTask} />
        <ul>
            {props.tasks.map(t => {
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name={'x'} callback={() => {removeTaskHandler(t.id)}} />
                </li>
            })
            }
        </ul>
        <div>
            <Button name={'all'} callback={() => {onClickFilterHandler('all')}} />
            <Button name={'active'} callback={() => {onClickFilterHandler('active')}} />
            <Button name={'completed'} callback={() => {onClickFilterHandler('completed')}} />
        </div>
    </div>
}
