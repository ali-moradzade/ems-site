import {useContext} from "react";
import {EmployeeContext} from "../context/Employee";

export function useEmployeeContext() {
    return useContext(EmployeeContext);
}
