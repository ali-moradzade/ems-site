import {useContext} from "react";
import {EmployeeContext, EmployeeContextType} from "../context/Employee";

export function useEmployeeContext(): EmployeeContextType {
    return useContext(EmployeeContext)!;
}
