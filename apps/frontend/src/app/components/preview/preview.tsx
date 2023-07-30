import "./preview.scss";
import billy from "../../../assets/Billy.png";
import logo from "../../../assets/logo.svg";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../types/consts";

type PreviewProps = {
  loaded: boolean;
  onChangeLoaded: () => void;
}

export function Preview({loaded, onChangeLoaded}: PreviewProps): JSX.Element {
  const bill = useRef(null);
  const logotype = useRef(null);
  const title = useRef(null);
  const btn = useRef(null);
  const box = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
   const ctx = gsap.context(() => {
      gsap.to(bill.current, {translateY: "5%", delay: 1});
      gsap.to(logotype.current, {translateX: "0%", delay: 1});
      gsap.to(title.current, {translateX: "0%", delay: 1});
      gsap.to(bill.current, {translateY: "100%", delay: 2});
      gsap.to(box.current, {translateY: "0%",delay: 2.05});
      gsap.from(btn.current, {translateY: "1000%", opacity: 0, delay: 2.1});
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="preview">
      <div className="preview-logo" ref={box}>
        <img src={logo} alt="" ref={logotype}/>
        <h2 ref={title}>Адаптация</h2>
      </div>
      <button className="login" ref={btn} onClick={() => navigate(AppRoute.Login)}>Войти</button>
      <div className="billy">
      <img src={billy} alt="" ref={bill}/>
      </div>
    </div>
  )
}