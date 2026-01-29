import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"
import { useContext } from "react"

const WithAuthHOC = (WrappedComponent) => {
    
    return (props) => {
        const navigate = useNavigate();
        const{setLogin}= useContext(AuthContext);

        useEffect(() => {
            const isLogin = localStorage.getItem("isLogin")
            if(!isLogin){
                setLogin(false);
                navigate("/")

                return
            }
        },[navigate])

        return <WrappedComponent {...props} />
    }
}

export default WithAuthHOC