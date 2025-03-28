"use client"

import { socket } from "../../../socket";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { useLoading } from "@/hooks/useLoading";
import Board from "../../assets/files/Game_Board2.svg";
import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";
import { TextInput } from "@/components/TextInput/TextInput"
import { Title } from "@/components/Title/Title";
import { NotFound } from "@/components/NotFound/NotFound";
import { Room } from "@/interfaces/Room"

export default function GameRoom() {
    const [value, setValue] = useState("Mensaje por Defecto");
    const [room, setRoom] = useState<Room | null>(null)
    const { id } = useParams();
    const { loading, setLoading } = useLoading();

    function sendMessage() {
        socket.emit("room:update",  id, value, (error : Error, result : string) => {
            if(error){
                alert("There has been an error" + error)
            }

            console.log(result);
        });
        setLoading(false);
    }

    function receiveMessage() {
        socket.emit("room:receive", id, (error : Error, result : string) => {
            if(error){
                alert("There has been an error" + error)
            }
            console.log("receiveD?");
        })
        setLoading(false);
    }

    useEffect(() => {
        function handleRoomGet(room: Room) {
            setRoom(room);
        }
        function getRoom() {
            socket.on("room:get", handleRoomGet);
        }
        getRoom();
        if (room === null) {
            setValue("Null");
        } else if (room === undefined) {
            setValue("Undefined");
        }
        return () => {
            socket.off("room:get", handleRoomGet);
        }
    }, []);

    return (
        <>
            <div className={styles.background}>
                <br />
                <Title
                    text = "Room Chat:"
                />
                <div className = {styles.chatContainer}>
                    <h2 className = {styles.messageText}>{room ? room.chat : "nada"}</h2>
                    <p className = {styles.disclaimerText}>One message at a time</p>
                </div>
                <TextInput
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    size = "large"
                    text = "Send"
                    onClick={() => {
                        setLoading(true);
                        sendMessage();
                    }}
                    loading = { loading }
                />
                <Button
                    size = "large"
                    text = "Receive"
                    onClick={() => {
                        setLoading(true);
                        receiveMessage();
                    }}
                    loading = { loading }
                />
                <div className = {styles.img}>
                    <Image
                        src = { Board }
                        alt = "Board"
                    />
                </div>
            </div>
        </>
    )
}