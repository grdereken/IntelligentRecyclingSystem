import { ComponentPropsWithoutRef, useState } from "react";
import axios from "axios";
const GetUserByIdApiUrl = "http://localhost:4200/getUserById"

export default function User({ id }: ComponentPropsWithoutRef<any>){
    async function GetUserById(id: number){
        return axios.get(GetUserByIdApiUrl, {
            params: { id }
        })
    }
    
    const [Username, SetUsername] = useState<any>(null)
    GetUserById(id).then((UserData)=>{
        const user = UserData.data 
        const {username, id, points} = user
        SetUsername(username)
    })


    return(
        <div>  
            <h1>{Username}</h1>
        </div>
    )
}