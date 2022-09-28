import { ComponentPropsWithoutRef, useState } from "react";
import axios from "axios";
const GetUserByIdApiUrl = "localhost/getUserById"

export default async function User({ id }: ComponentPropsWithoutRef<any>){
    async function GetUsernameById(id: number){
        return axios.get(GetUserByIdApiUrl, {
            params: { id }
        })
    }
    
    const [Username, SetUsername] = useState<any>(null)
    const NewUsername = await GetUsernameById(id)
    console.log(NewUsername.data)
    SetUsername(NewUsername.data)
    return(
        <div>  
            <h1>{Username}</h1>
        </div>
    )
}