"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

import { useLoading } from "@/hooks/useLoading";
import styles from "./page.module.css";
import Background from "./assets/files/Menu_Background.png";
import { Button } from "@/components/Button/Button";
import { Loading } from "@/components/Loading/Loading";
import { Title } from "@/components/Title/Title";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const { loading,  setLoading } = useLoading();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    setLoading(false);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return isConnected ? (
    <>    
      <div className={styles.background}>
        <div className={styles.container}>
          <br /><br />
          <Title
            text = "Air Hockey Online"
          />
          <br /><br /><br /><br /><br />
          <Button
            text="Play With A Friend"
            onClick={() => {
              setLoading(true);
              redirect("/game/friend");
            }}
            size = "large"
            loading = {loading}
          />
          <Button
            text="Play With A Stranger"
            onClick={() => {
              setLoading(true);
              redirect("/game/stranger");
            }}
            size="large"
            loading = {loading}
          />
          <br /><br /><br />
          <Suspense fallback={<Loading />}>
              <div className={styles.aboutContainer}>
                <a href="https://github.com/Frank0125/Air-Hockey-Online">
                  <p className={styles.aboutText}>About</p>
                </a>
              </div>
          </Suspense>
        </div>
        <Image 
          className={styles.backgroundImage}
          src={Background}
          alt={"Background"}
          width={840}
          height={778.5}          
        />
      </div>
    </> 
    ) : (
      <>
        <Loading />
      </>
    );
}