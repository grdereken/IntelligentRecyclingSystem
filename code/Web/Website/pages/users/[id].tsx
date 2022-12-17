import { useRouter } from 'next/router'
import User from '../../components/User'
import { useEffect, useState } from 'react';

const Users = () => {
    const router = useRouter()
    const [id, SetId] = useState<any>(undefined)
    useEffect(() => {
        if(router.query == undefined) return;
        SetId(router.query.id)
    }, [router.isReady]);

    if(id == undefined) return
    return(
        <div>
            <User id={id}/>
        </div>
    )
}
export default Users    