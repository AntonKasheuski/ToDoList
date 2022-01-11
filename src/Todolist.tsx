import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListID: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = (newTaskTile: string) => {
        props.addTask(newTaskTile, props.todoListID)
    }
    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodolistTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListID)

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }

    return(
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                {/*{props.title}*/}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                { tasksList }
            </ul>
            <div>
                <button
                    className={getBtnClass("all")}
                    onClick={onClickSetAllFilter}
                >All</button>
                <button
                    className={getBtnClass("active")}
                    onClick={onClickSetActiveFilter}
                >Active</button>
                <button
                    className={getBtnClass("completed")}
                    onClick={onClickSetCompletedFilter}
                >Completed</button>
            </div>
        </div>
    )
}

export default TodoList;