import { ComponentPropsWithoutRef } from "react";

export default function User({ id }: ComponentPropsWithoutRef<any>){
    return(
        <div>
            Hello {id}
        </div>
    )
}