// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";
import { Preview } from "./components/preview/preview";
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from "./types/consts";
import { Dashboard } from "./pages/dashboard/dashboard";
import { CreateUser } from "./pages/create-user/create-user";
import { LoginPage } from "./pages/login-page/login-page";
import { HomePage } from "./pages/home-page/home-page";
import { ChatPage } from "./pages/chat-page/chat-page";

export function App() {
  const [loaded, setLoaded] = useState(false);

  const onChangeLoaded = () => {
    setLoaded((prev) => prev = !prev);
  }
  return (
    <div className="App">
      <Routes>
        {/* <Route path={AppRoute.Main} element={<HomePage />} /> */}
        <Route path={AppRoute.Main} element={<Preview loaded={loaded} onChangeLoaded={onChangeLoaded}/>} />
        <Route path={AppRoute.Dash} element={<Dashboard />} />
        <Route path={AppRoute.CreateUser} element={<CreateUser />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Chat} element={<ChatPage />}/>
      </Routes>
    </div>
  );
}

export default App;
