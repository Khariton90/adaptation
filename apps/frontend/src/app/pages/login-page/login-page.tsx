import { useEffect, useState } from "react"
import { Loader } from "../../components/loader/loader";
import FormControl from "@mui/material/FormControl";
import { Button, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router";
import { AppRoute } from "../../types/consts";
import "./login-page.scss";

export function LoginPage(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoaded(true);
    }, 4000);

    return () => clearTimeout(loader);
  }, [loaded]);

  if (loaded) {
    return (
      <div className="login-page page">
        <form className="login-form">

        <FormControl fullWidth color="success">
          <InputLabel htmlFor="outlined-adornment-amount">Login</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Login"
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" color="success">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button sx={{ width: '50%' }} color="success" variant="contained" onClick={() => navigate(AppRoute.Dash)}>Войти</Button>
        </form>
      </div>
    )
  }

  return <Loader />

}