import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { Password } from "@mui/icons-material";

function RegisterPage() {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validating Form Data

    if (!firstName || !lastName || !email || !Password) {
      setError("Please Fill Out All Fileds ");
      return;
    }
    const response = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to Register User , Please Try Different Credintials");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Invalid Token");
      return;
    }

    login(email, token);
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
        <Typography variant="h5">Register a New User</Typography>
        <TextField
          id="outlined-basic"
          label="First Name"
          name="firstname"
          variant="outlined"
          inputRef={firstNameRef}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          name="lastname"
          variant="outlined"
          inputRef={lastNameRef}
        />
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
          Register
        </Button>
        {error && (
          <Typography sx={{ textAlign: "center", color: "red" }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default RegisterPage;
