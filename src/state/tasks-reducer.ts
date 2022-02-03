import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type RemoveTaskType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTaskType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

export type ActionType = RemoveTaskType | AddTaskType
    | ChangeTaskStatusType | ChangeTaskTitleType
    | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASK": {
            /*const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: "4", title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            return stateCopy*/
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
            /*const stateCopy = {...state}
            stateCopy[action.todolistId] = [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            return stateCopy*/
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete(stateCopy[action.id])
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
export const RemoveTodolistAC = (id: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", id}
}