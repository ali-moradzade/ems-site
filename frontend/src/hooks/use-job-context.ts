import {useContext} from "react";
import {JobContext, JobContextType} from "../context/Job";

export function useJobContext(): JobContextType {
    return useContext(JobContext)!;
}
