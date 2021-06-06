import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const Alert = ({ style }) => {
  const { resetAlert, alert, toggleRegister } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        resetAlert();
        if (alert.caller === "register" && alert.type !== "alert") {
          toggleRegister();
        }
      },
      alert.caller === "password" ? 8000 : 3000
    );
    return () => clearTimeout(timeout);
  }, [alert, toggleRegister, resetAlert]);
  return <div className={style[alert.type]}>{alert.msg}</div>;
};

export default Alert;
