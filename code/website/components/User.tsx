import { ComponentPropsWithoutRef } from "react";
import axios from "axios";


export default function User({ id }: ComponentPropsWithoutRef<any>){
    return(
        <div>
            Hello {id}
        </div>
    )
}