import {useContext} from "react";
import {UserContext} from "../context/User";

export function useUserContext() {
    return useContext(UserContext);
}
