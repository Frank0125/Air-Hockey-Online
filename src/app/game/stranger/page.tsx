"use client";

import { socket } from "../../../socket";
import { redirect } from "next/navigation";

import styles from "./page.module.css";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@/components/Button/Button";
import { Title } from "@/components/Title/Title"
//IN PROGRESS
export default function Stranger() {
  const { loading,  setLoading } = useLoading();

  function createStrangerRoom() {
    socket.emit("room:create", { type: "stranger"}, (error : Error, roomId : string) => {
      if (error) {
        console.error(error);
        alert("An error occurred while trying to join a room" + error);
      } 

      console.log("Joined room: " + roomId);
      redirect("/game/" + roomId)
    })
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Title
          text = "Play with a Stranger!!"
          fontSize = "2.6rem"
          margingTop = "0.6rem"
        />
        <Button 
          text = "Join Room" 
          onClick = {() => {
            createStrangerRoom();
            setLoading(true);
          }} 
          size = "large"
          loading = { loading }
        />  
        <Button 
          text = "Go To Menu" 
          onClick = {() => {
            setLoading(true);
            redirect("/");
          }} 
          size = "large"
          loading = { loading }
        />
        <br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}
