import { ComponentPropsWithoutRef, useState } from "react";
import axios from "axios";
import styles from "../styles/UserComponent.module.css"
const GetUserByIdApiUrl = "http://localhost:4200/getUserById"

export default function User({ id }: ComponentPropsWithoutRef<any>){
    async function GetUserById(id: number){
        return axios.get(GetUserByIdApiUrl, {
            params: { id }
        })
    }
    
    const [User, SetUser] = useState<any>(null)
    GetUserById(id).then((UserData)=>{
        const user = UserData.data 
        SetUser(user)
    })


    return(
        <div>  
            <h1 className={styles.Title}>{User.Username}</h1>
            <a>points: {User.Points}</a>
        </div>
    )
}