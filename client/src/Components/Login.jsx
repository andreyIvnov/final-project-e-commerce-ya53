import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserByUserNameAndPassword } from "../Helpers/fdbManager.js";

import "../Styles/Login.css";


function Login() {
  const [logInData, setlogInData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogInData({ ...logInData, [name]: value });
  };

  const login = () => {
    if (logInData.username && logInData.password) {
      const getUser = async () => {
        const userFromDB = await getUserByUserNameAndPassword(logInData.username, logInData.password);
        if (userFromDB && userFromDB.id) {
          dispatch({ type: "SET_USER", payload: userFromDB });
          navigate('/');
        }
      };
      getUser();
    }
  };

  return (
    <Box className="login-bg">
      <Paper elevation={8} className="login-paper" sx={{ background: 'rgba(20,20,30,0.95)', boxShadow: '0 0 80px #d441d4' }}>
        <Typography variant="h5" className="login-title" sx={{ mb: 4 }}>
          Next Generation E-Commerce
        </Typography>
        <TextField
          name="username"
          onChange={handleChange}
          label="User Name"
          variant="outlined"
          fullWidth
          className="login-input"
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="login-input"
          sx={{ mb: 3 }}
        />
        <Button
          onClick={login}
          variant="contained"
          fullWidth
          className="login-btn"
          sx={{ mb: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          fullWidth
          className="register-btn"
          onClick={() => navigate('/register')}
        >
          Registration
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;