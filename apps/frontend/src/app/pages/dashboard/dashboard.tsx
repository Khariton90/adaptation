import { useState, useEffect } from "react";
import { Loader } from "../../components/loader/loader";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AppRoute, jobTitleList } from "../../types/consts";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Avatar } from "@mui/material";
import "./dashboard.scss";
import dayjs from "dayjs";
import { JobTitle } from "@org/shared-types";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 240 },
  {
    field: 'avatar',
    headerName: 'Аватар',
    width: 120,
    renderCell: (params) => {
      return (
        <Avatar src={params.value} />
      );
    }
  },
  {
    field: 'fullName',
    headerName: 'Пользователь',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstname || ''} ${params.row.lastname || ''}`,
  },
  { field: 'jobTitle', headerName: 'Должность', width: 140,
  renderCell: (params) => {
    return (
      <div>{jobTitleList[params.value as JobTitle]}</div>
    );
  }
},
  { field: 'email', headerName: 'E-mail', width: 200 },
  {
    field: 'teacher', headerName: 'Наставник', width: 200,
    renderCell: (params) => {
      return (
        <div>Иванов Иван</div>
      );
    }
  },
  {
    field: 'startDate', headerName: 'Начало обучения', width: 140,
    renderCell: (params) => {
      return (
        <div>{dayjs(params.value).format('DD.MM.YYYY')}</div>
      );
    }
  },
  {
    field: 'status',
    headerName: 'Прогресс',
    type: 'number',
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <div> {Number(100 / 30 * params.value).toFixed(0)}%</div>
          <meter id="fuel"
            style={{ width: 60 }}
            min="0" max="100"
            value={100 / 30 * params.value}>
          </meter>
        </>
      );
    }
  },
];

const rows = [
  // eslint-disable-next-line jsx-a11y/alt-text
  { id: 1, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Сноу', firstname: 'Марина', status: 35 },
  { id: 2, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Ланистер', firstname: 'Сергей', status: 42 },
  { id: 3, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Старк', firstname: 'Евгений', status: 45 },
  { id: 4, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Рокси', firstname: 'Ольга', status: 16 },
  { id: 5, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Targaryen', firstname: 'Роман', status: null },
  { id: 6, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Melisandre', firstname: 'Эдуард', status: 150 },
  { id: 7, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Clifford', firstname: 'Моника', status: 44 },
  { id: 8, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Frances', firstname: 'Николь', status: 36 },
  { id: 9, avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-middle", lastname: 'Roxie', firstname: 'Максим', status: 65 },
];

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};


export function Dashboard(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchJson("http://localhost:3333/api/users/all")
      .then((data) => setData(data));
  }, []);

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
    <div className="dashboard-page page">
      <header className="header">Header</header>
      <main className="main">
        {
          data.length ?
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            /> :
            <h2>Пользователей пока нет</h2>
        }
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
              <Link to={AppRoute.CreateUser}>Новый пользователь</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <footer className="footer">Footer</footer>
    </div>
  )
}