import { useState } from "react";
import AppContext from "./appContext";
import { useNavigate } from "react-router-dom";


const AppState = (props) => {



    const host = "http://localhost:5001/api"

    // const setInitial = []
    const usenavigate = useNavigate();

    const [user, setuser] = useState();

    const signUpUser = async (name, email, password, Inputprofile) => {

        let formData = new FormData()
        formData.append("image", Inputprofile);
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)

        const res = await fetch(`${host}/auth/signup`, {
            method: "POST",
            body: formData
        });
        const resp = await res.json();

        if (resp.error) {
            alert(resp.error)
        } else {
            alert("Success")
            console.log(resp.authToken)
            usenavigate('/login')
        }
    }

    const logInUser = async (email, password) => {
        const res = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const resp = await res.json();
        if (resp.error) {
            alert(resp.error)
        } else if (resp.errors) {
            console.log(resp.errors)
        } else {
            alert('success');
            localStorage.setItem("vToken", resp.authToken);
            usenavigate('/profile')

        }
    }


    const getUserDtl = async () => {

        if (!localStorage.getItem("vToken")) {
            alert("Please Login to continew")
        } else {
            const res = await fetch(`${host}/auth/getuser`, {
                method: "POST",
                headers: { "auth-token": localStorage.getItem("vToken") }
            });
            const resp = await res.json();
            if (resp.error) {
                alert(res.error)
            }else{
                console.log(resp)
                setuser(resp)
            }
        }
    }




    return (
        <AppContext.Provider value={{ signUpUser, logInUser, getUserDtl, user }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;