import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Clear, HighlightOff} from "@material-ui/icons";

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
    const itemFontStyle = {fontWeight: "bold"};

    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <ListItem
                key={t.id}
                disableGutters
                divider
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div style={itemFontStyle}>
                <Checkbox
                    color={"primary"}
                    size={"small"}
                    checked={t.isDone}
                    onChange={changeStatus}
                    style={{marginRight: "15px"}}
                />
                {t.isDone
                    ? <span className={"is-done"}>{t.title}</span>
                    : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                }
                </div>
                <IconButton
                    onClick={removeTask}
                    color={"primary"}
                    size={"small"}
                >
                    <HighlightOff/>
                </IconButton>
            </ListItem>
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

    /* const getBtnClass = (filter: FilterValuesType) => {
    return props.filter === filter ? "active-filter" : ""
}*/

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%"
        }}>
            <Typography
                variant={"h5"}
                align={"center"}
                style={{fontWeight: "small"}}
            >
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton
                    onClick={removeTodoList}
                    size={"small"}
                >
                    <Clear/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksList}
            </List>
            <div>
                <ButtonGroup
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    fullWidth
                >
                    <Button
                        color={props.filter === "all" ? "secondary" : "primary"}
                        //className={getBtnClass("all")}
                        onClick={onClickSetAllFilter}
                    >All</Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        //className={getBtnClass("active")}
                        onClick={onClickSetActiveFilter}
                    >Active</Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        //className={getBtnClass("completed")}
                        onClick={onClickSetCompletedFilter}
                    >Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default TodoList;