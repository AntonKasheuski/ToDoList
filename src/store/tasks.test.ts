import {
    addSalary,
    AddSalaryActionType,
    divSalary, DivSalaryActionType,
    multSalary, MultSalaryActionType,
    reduceSalary,
    ReduceSalaryActionType,
    salaryReducer
} from "./tasks";

test("AddSalary", () => {
    //data
    const salary: number = 700;
    const bonus: number = 250

    //action
    const result = addSalary(salary, bonus)

    //check result
    expect(result).toBe(950)
})

test("ReduceSalary", () => {
    //data
    const salary: number = 700;
    const minus: number = 250

    //action
    const result = reduceSalary(salary, minus)

    //check result
    expect(result).toBe(450)
})

test("MultSalary", () => {
    //data
    const salary: number = 1000;
    const coef: number = 1.1

    //action
    const result = multSalary(salary, coef)

    //check result
    expect(result).toBe(1100)
})

test("DivSalary", () => {
    //data
    const salary: number = 700;
    const coef: number = 0.9

    //action
    const result = divSalary(salary, coef)

    //check result
    expect(result).toBe(630)
})

test("case 'ADD_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: AddSalaryActionType = {
        type: "ADD_SALARY",
        bonus: 250
    }
    expect(salaryReducer(salary, action)).toBe(950)
})

test("case 'REDUCE_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: ReduceSalaryActionType = {
        type: "REDUCE_SALARY",
        minus: 100
    }
    expect(salaryReducer(salary, action)).toBe(600)
})

test("case 'MULT_SALARY' of salaryReducer", () => {
    const salary: number = 1000
    const action: MultSalaryActionType = {
        type: "MULT_SALARY",
        coef: 1.1
    }
    expect(salaryReducer(salary, action)).toBe(1100)
})

test("case 'DIV_SALARY' of salaryReducer", () => {
    const salary: number = 700
    const action: DivSalaryActionType = {
        type: "DIV_SALARY",
        coef: 0.9
    }
    expect(salaryReducer(salary, action)).toBe(630)
})