import Image from "next/image";

import NotFoundGif from "../../app/assets/files/Not-Found.gif";
import styles from "./NotFound.module.css";

export const  NotFound = () =>{
    return (
        <>
            <div className = {styles.notFound}> Page was not found, Sorry!</div>
            <Image
                src = { NotFoundGif }
                alt = "Page Not Found"
                fill = { true }
            />
            <div className = {styles.blackBox}></div>
        </>
    )
}