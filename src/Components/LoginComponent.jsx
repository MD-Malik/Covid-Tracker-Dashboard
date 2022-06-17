import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from "./LoginComponent.module.css"

export const LoginComponent = () => {
    const [userDetails, setUserDetails] = useState({
        useremail : "",
        password : ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.className] : e.target.value
        })
    }

    const handleLogin = async() => {
        let result = await fetch('https://covid-tracker-dashborad.herokuapp.com/login', {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(userDetails)
        })
        result = await result.json();
        localStorage.setItem("token", JSON.stringify(result.token));
        if(result.status){
            navigate("/Country")
        }
        else{
            alert("Invalid email address or password!")
        }
    }

    const verifyToken = async(token) => {
        console.log(token)
        let result = await fetch('https://covid-tracker-dashborad.herokuapp.com/verifyToken', {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({token: token})
        })
        result = await result.json();
        // alert(result.message);
        console.log(result)
        if(result.status){
            navigate("/Country")
        }        
    }

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("token"))
        // console.log(token)
        if(!token){
            return;
        }
        else{
          verifyToken(token);
        }
    }, [])
  return (
    <div className={styles.LoginDiv}>
      <span>Log in to Covid Tracker Dashboard</span>
      <input type="text" placeholder='Email Address' onChange={handleChange} className="useremail" />
      <input type="text" placeholder="Password" onChange={handleChange} className="password"  />
      <input type="button" placeholder='Log in' className={styles.LoginBtn} value="Log in" onClick={handleLogin}/>
      <p>New to Covid Tracker Dashboard then go to <span onClick={()=>navigate("/signup")}>Sign up</span> page</p>
    </div>
  )
}
