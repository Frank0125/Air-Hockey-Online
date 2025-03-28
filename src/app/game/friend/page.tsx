"use client";

import { redirect } from "next/navigation";

import { useLoading } from "@/hooks/useLoading";
import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";
import { Title } from "@/components/Title/Title";
//IN PROGRESS
export default function Friend() {
  const { loading, setLoading } = useLoading();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Title
          text = "Play with your Friend!!"
          fontSize = "2.4rem"
        />
        <Button 
          text = "Go To Menu" 
          onClick = {() => {
            redirect("/");
            setLoading(true);
          }} 
          size = "large"
          loading = { loading }
        />
        <br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}
