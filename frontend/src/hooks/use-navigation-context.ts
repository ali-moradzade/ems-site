import {useContext} from "react";
import {NavigationContext} from "../context/Navigation";

export function useNavigationContext() {
    return useContext(NavigationContext);
}
