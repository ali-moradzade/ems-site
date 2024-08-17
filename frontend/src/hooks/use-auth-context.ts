import {useContext} from "react";
import {AuthContext} from "../context/Auth";

export function useAuthContext() {
    return useContext(AuthContext)!;
}
