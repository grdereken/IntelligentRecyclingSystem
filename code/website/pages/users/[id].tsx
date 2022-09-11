import { useRouter } from 'next/router'
import User from '../../components/User'

export default function(){
    const router = useRouter()
    const { id } = router.query
    return(
        <div>
            <User id={ id }/>
        </div>
    )
    
}