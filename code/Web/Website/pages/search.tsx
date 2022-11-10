import styles from '../styles/Search.module.css'
import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import axios from 'axios'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import SearchBar from '../components/SearchBar';

function createContentList(users: any){
    if(!users) return 

    return users.map((user: any) =>{
        return (
            <tr 
                className = {styles.user}
                key = {styles.id}>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.points}
                </td>
            </tr>
        )   
    })
}
function GetContentLength(contentList: Array<ReactJSXElement>){
    return contentList.length
}
function CreateResultsFound(ContentLength: number){
    if(ContentLength == 1){
        return(
            <div className={styles.ResultsFound}>
                {ContentLength} result found
            </div>
        )
    }
    return(
        <div className={styles.ResultsFound}>
            {ContentLength} results found
        </div>
    )
}

const searchApiUrl = process.env.NEXT_PUBLIC_SEARCH_URL
const Search: NextPage = ()=>{
    const UsernameRef = useRef<HTMLInputElement>(null)
    const [content, SetContent] = useState(null)
    const [ContentLength, SetContentLength] = useState<any>(null)

    function search(username: string){
        return axios.get(searchApiUrl, {
            params:{
                username
            }
        })
    }
    
    async function HandleSearchButtonClick(){
        if(UsernameRef.current === null) return

        const searchRequest = await search(UsernameRef.current.value)
        const users = searchRequest.data
        
        const ContentList = createContentList(users)
        const ContentLength = GetContentLength(ContentList)
        const ResultsFound = CreateResultsFound(ContentLength)

        SetContent(ContentList)
        SetContentLength(ResultsFound)
    }

    return(
        <div className={styles.main}>
            <h1>Search</h1>
            <SearchBar UsernameRef={UsernameRef} onClick={HandleSearchButtonClick}/>
            <div>
                {ContentLength}
                <table className={styles.content}>
                    <tbody>
                        <tr className={styles.UserList}>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                        {content}
                    </tbody>
                </table>
            </div>

        </div>
    )
}


export default Search