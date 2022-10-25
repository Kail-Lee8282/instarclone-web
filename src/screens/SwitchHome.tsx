import { useOutletContext } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

interface IContext {
    isLoggedIn: boolean;
}

function SwitchHome() {
    const { isLoggedIn } = useOutletContext<IContext>();
    return <>
        {isLoggedIn ?
            <Home /> : <Login />
        }</>
}

export default SwitchHome;