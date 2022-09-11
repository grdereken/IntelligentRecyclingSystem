import { ComponentPropsWithRef } from "react";
import styles from "../styles/SearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';

export default function({UsernameRef, onClick}: ComponentPropsWithRef<any>){
    return(
        <div className={styles.SearchDiv}>
            <input
                ref = {UsernameRef}
                className = {styles.UsernameInput} type='text'
            />
            <button 
                className={styles.SearchButton} 
                onClick = {onClick}>
                <SearchIcon></SearchIcon>
            </button>
        </div>
    )
}