import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "../styles/UserComponent.module.css"
import * as ReactDOM from 'react-dom/client';
const GetUserByIdApiUrl = "http://localhost:4200/getUserById"
const SetUserPointsUrl = "http://localhost:4200/setUserPoints"

export default function User({ id }: ComponentPropsWithoutRef<any>){
    let IsOnChangeMode = false
    const PointsRef = useRef<HTMLInputElement>(null)
    const AdminRef = useRef<HTMLInputElement>(null)
    function GetUserById(id: number){
        return axios.get(GetUserByIdApiUrl, {
            params: { id }
        })
    }
    function SetPoints(username: string) {
        let adminPassword = undefined
        if(AdminRef.current?.value != ''){
            adminPassword = AdminRef.current?.value
        }
        return axios.get(SetUserPointsUrl, {
            
            params: {username, points: PointsRef.current!.value, adminPassword}
        })
    }
    const [User, SetUser] = useState<any>({})
    useEffect(()=>{
        GetUserById(id).then((UserData)=>{
            SetUser(UserData.data)
        })
    }, [])
    function HandleConfirmClick(){
        SetPoints(User.username).then((UserData)=>{
            SetUser(UserData.data)
        })
    }
    function HandleChangePointsClick(){
        IsOnChangeMode ? IsOnChangeMode = false : IsOnChangeMode = true
        if(IsOnChangeMode == false) {
            const root = ReactDOM.createRoot(document.getElementById('InputFields')!)
            root.unmount()
            return
        }
        const root = ReactDOM.createRoot(document.getElementById('InputFields')!)
        root.render(
            <div className={styles.InputFields}>
                <input ref={PointsRef} placeholder='Points' className={styles.PointsInput}></input>
                <input ref={AdminRef} placeholder='AdminPassword' className={styles.AdminPassword}></input>
                <button onClick={HandleConfirmClick}>Confirm</button>
            </div>
        )
    }
    return(
        <div>  
            <h1 className={styles.Title}>{User.username}</h1>
            <div className={styles.PointsCell}>
                <a>Points: {User.points}</a>
                <button onClick={HandleChangePointsClick}>Change</button>
            </div>
            <div id='InputFields'></div>
        </div>
    )
}