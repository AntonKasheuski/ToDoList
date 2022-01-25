export const addSalary = (salary: number, bonus: number) => salary + bonus
export const reduceSalary = (salary: number, minus: number) => salary - minus
export const multSalary = (salary: number, coef: number) => salary * coef
export const divSalary = (salary: number, coef: number) => salary * coef

export type AddSalaryActionType = {
    type: "ADD_SALARY"
    bonus: number
}
export type ReduceSalaryActionType = {
    type: "REDUCE_SALARY"
    minus: number
}
export type MultSalaryActionType = {
    type: "MULT_SALARY"
    coef: number
}
export type DivSalaryActionType = {
    type: "DIV_SALARY"
    coef: number
}

type ActionType = AddSalaryActionType | ReduceSalaryActionType
    | MultSalaryActionType | DivSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case "ADD_SALARY":
            return salary + action.bonus
        case "REDUCE_SALARY":
            return salary - action.minus
        case "MULT_SALARY":
        case "DIV_SALARY":
            return salary * action.coef
        default:
            return salary
    }
}