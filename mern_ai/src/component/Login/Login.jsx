import React, { useContext } from 'react'
import styles from './Login.module.css'
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import {auth, provider} from '../../utils/firebase.jsx'
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios.js';

const Login = () => {
  const{isLogin, setLogin, userInfo, setUserInfo} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async() => {
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      await axios.post('/api/user', userData).then((response) => {
        setUserInfo(response.data.user)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user))
      }).catch((err) => {
        console.log(err)
      })

      setLogin(true);
      localStorage.setItem("isLogin", true);
      navigate("/dashboard");

    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h2>Login</h2>
          <LoginIcon sx={{fontSize: 30}}/>
        </div>

        <div className={styles.googleBtn} onClick={handleLogin}><GoogleIcon sx={{color: "red", fontSize: 25}}/> Sign In With Google</div>
        
      </div>
      
    </div>
  )
}



export default Login
