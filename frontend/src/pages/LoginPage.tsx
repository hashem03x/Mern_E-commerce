import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../context/Authentication/Authcontext";
import { Password } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validating Form Data

    if (!email || !Password) {
      setError("Please Fill Out All Fileds ");
      return;
    }
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to Login , Please Check your Cerintials");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Invalid Token");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <Container
      sx={{
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          border: 1,
          borderColor: "#1976D2",
          p: 3,
          borderRadius: 2,
          width: "350px",
        }}
      >
        <Typography variant="h5">Login</Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          inputRef={emailRef}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          inputRef={passwordRef}
        />
        <Button onClick={onSubmit} variant="contained">
          Login
        </Button>
        <Link
          style={{
            textDecoration: "none",
            textAlign: "center",
            fontSize: "16px",
          }}
          to="/register"
        >
          New User? Create an account
        </Link>
        {error && (
          <Typography sx={{ textAlign: "center", color: "red" }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default LoginPage;
