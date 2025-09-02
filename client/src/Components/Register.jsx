import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';



import { addNewDoc } from "../Helpers/fdbManager";

import "../Styles/Register.css";

function Register() {
  const [newUserInfo, setNewUserInfo] = useState({ firstName: "", lastName: "", userName: "", password: "", showOrders: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserInfo({ ...newUserInfo, [name]: type === "checkbox" ? checked : value });
  }

  const createNewUser = async () => {
    if (newUserInfo && newUserInfo.userName && newUserInfo.password) {
      const justCreatedUser = await addNewDoc("users", { ...newUserInfo, isAdmin: false });
      if (justCreatedUser && justCreatedUser.id) {
        dispatch({ type: "SET_USER", payload: justCreatedUser });
        navigate("/"); 
      }
    }
  }

  return (
    <Box className="register-bg">
      <Paper elevation={8} className="register-paper" sx={{ background: 'rgba(20,20,30,0.95)', boxShadow: '0 0 80px #d441d4' }}>
        <Typography variant="h4" className="register-title">
          Registration
        </Typography>
        <TextField
          name="firstName"
          onChange={handleChange}
          label="First Name"
          variant="outlined"
          fullWidth
          className="register-input"
          sx={{ mb: 2 }}
        />
        <TextField
          name="lastName"
          onChange={handleChange}
          label="Last Name"
          variant="outlined"
          fullWidth
          className="register-input"
          sx={{ mb: 2 }}
        />
        <TextField
          name="userName"
          onChange={handleChange}
          label="User Name"
          variant="outlined"
          fullWidth
          className="register-input"
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="register-input"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{ color: '#d441d4' }}
              name="showOrders"
              onChange={handleChange}
            />
          }
          label="Allow others to see my orders"
          sx={{ mb: 2, color: '#d441d4' }}
        />
        <Button
          variant="contained"
          fullWidth
          className="create-btn"
          onClick={createNewUser}
        >
          Create
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;

