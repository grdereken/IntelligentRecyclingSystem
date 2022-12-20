import { useRouter } from 'next/router'
import User from '../../components/User'

const Users = () => {
    const router = useRouter()
    const {id} = router.query
    if(id == undefined) return
    return(
        <div>
            <User id={id}/>
        </div>
    )
}
export default Users    