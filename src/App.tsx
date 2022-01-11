import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [{id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}],
        [todoListID_2]: [{id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BEER", isDone: false}],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        /*const copy = {...tasks[todoListID]}
        const newCopy = copy.filter(t => t.id !== taskID)
        setTasks({...tasks, newCopy})*/
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(tasksCopy)
    }
    const addTask = (title: string, todoListID: string) => {
        /*const copy = {...tasks[todoListID]}
        const newCopy = [{id: v1(), title, isDone: false}, ...copy]
        setTasks({...tasks, newCopy})*/
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
        setTasks(tasksCopy)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        /*const copy = {...tasks[todoListID]}
        const newCopy = copy.map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks, newCopy})*/
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(tasksCopy)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const tasksCopy = {...tasks}
        delete tasksCopy[todoListID]
        setTasks(tasksCopy)
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        setTodoLists([...todoLists, {id: newTodoListID, title: title, filter: "all"}])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const tasksCopy = {...tasks}
        tasksCopy[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(tasksCopy)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const todoListsComps = todoLists.map(tl =>
        <TodoList
            key={tl.id}
            todoListID={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={getTasksForRender(tl.filter, tasks[tl.id])}
            addTask={addTask}
            removeTask={removeTask}
            changeTodoListFilter={changeTodoListFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
        />)

    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListsComps}
        </div>
    )
}

export default App;


