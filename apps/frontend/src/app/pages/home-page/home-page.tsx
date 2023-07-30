import "./home-page.scss";
import avatar from "../../../../../public/default-avatar.svg";
import { Button } from "@mui/material";
import { useState } from "react";

export function HomePage(): JSX.Element {
  const [offset, setOffset] = useState(734);

  return (
    <div className="home-page page">
      <div className="container">
        <div className="user-card user-card-info">
          <ul className="user-card-list">
            <li>ФИО</li>
            <li>Подразделение</li>
            <li>Должность</li>
            <li>Наставник</li>
          </ul>
          <div className="user-card-avatar">
            <img src={avatar} alt="avatar" />
          </div>
        </div>

        <div className="user-frame" onClick={() => setOffset((prev) => prev -= 10.9)}>
          <h2 className="user-frame-title">1 День</h2>
          <div className="user-frame-progress">

            <span>100%</span>
            <svg className="bag" height="120" width="120">
              <circle cx="60" cy="60" r="52" stroke="#2FCD20" strokeWidth="8" fill="none">
              </circle>
            </svg>
            <svg className="over" height="120" width="120">
              <circle cx="60" cy="60" r="52" stroke="#FFF" strokeWidth="8" strokeDashoffset={offset} fill="none" >
                {/* <animate attributeType="CSS" attributeName="stroke-dasharray" from="1,254" to="247,56" dur="5s" repeatCount="indefinite" /> */}
              </circle>
            </svg>
          </div>
          <div className="user-frame-menu">
            <p>Первый день и уже есть первое задание</p>
            <Button>Начинаем</Button>
          </div>
        </div>
      </div>
    </div>
  )
}