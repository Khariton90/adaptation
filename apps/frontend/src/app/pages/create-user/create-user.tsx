import { useState, useEffect } from "react";
import { Loader } from "../../components/loader/loader";
import { Link } from "react-router-dom";
import { AppRoute } from "../../types/consts";
import logo from "../../../assets/logo.svg";
import { CreateUserForm } from "../../components/create-user-form/create-user-form";
import 'dayjs/locale/ru';
import "../dashboard/dashboard.scss";
import "./create-user.scss";

export function CreateUser(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoaded(true);
    }, 3500);

    return () => clearTimeout(loader);
  }, [loaded]);

  if (!loaded) {
    return <Loader />
  }

  return (
    <div className="dashboard-page create-user page">
      <header className="header">Header</header>
      <main className="main">
        <CreateUserForm />
      </main>
      <aside className="aside">
        <div className="dashboard-logo">
          <Link to={AppRoute.Main}>
            <img src={logo} alt="logo" />
            <h2>Адаптация</h2>
          </Link>
        </div>
        <nav className="dashboard-nav">
          <ul className="dashboard-list">
            <li className="dashboard-item">
              <Link to={AppRoute.Dash}>Список пользователей</Link>
            </li>
            <li className="dashboard-item">
              <Link to="create">Новый пользователь</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <footer className="footer">Footer</footer>
    </div>
  )
}