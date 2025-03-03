"use client";

import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.titleText}>Air Hockey Online</p>
        </div>
        <Button
          text="Play With A Friend"
          onClick={() => {
            redirect("/game");
            console.log("Friend");
          }}
          size="large"
        />
        <br />
        <Button
          text="Play With A Stranger"
          onClick={() => {
            redirect("/game");
            console.log("Stranger");
          }}
          size="large"
        />
        <br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}
