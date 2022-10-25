import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { routes, userRoutes } from "./routes";
import NotFound from "./screens/NotFound";
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUP";
import SwitchHome from "./screens/SwitchHome";

const router = createBrowserRouter([
{
    path:routes.home,
    element:<Root/>,
    children:[
        {
            path:"",
            element: <SwitchHome/>
        },
        {
            path:routes.signUp,
            element:<SignUp/>
        },
        {
            path:"/users/:username",
            element:<Profile/>,
            children:[
                {
                    path:userRoutes.posts,
                    element:<Posts/>
                },
                {
                    path:userRoutes.tagged,
                    element:<>tagged</>
                }
            ],
            errorElement:<NotFound/>
        }
    ],
    errorElement: <NotFound/>
}
])

export default router;