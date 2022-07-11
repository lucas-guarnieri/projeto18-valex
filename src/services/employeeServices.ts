import * as employeeRepository from "../repositories/employeeRepository.js"

export async function getEmployeeById(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
        throw {
            type: "employeeError", message: "employee not found", code: "404"
        }
    }
    return employee;
}

export function formatName(fullName: string) {
    const formatedName : string[] = fullName.toUpperCase().split(' ').filter(elem => elem.length>=3);
    if (formatedName.length>2){
        for (let i = 1; i<formatedName.length-1; i++){
            formatedName[i] = formatedName[i].slice(0,1);
        }
    }
    return (formatedName.join(" "));
}
