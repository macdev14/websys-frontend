import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Copyright from "./copyright";
import api from "./api";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ parentStateSetter }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    return await api
      .post("api/token/", { email: user, password: pass })
      .then(function (resp) {
        if (Object.keys(resp).includes("data")) {
          localStorage.setItem("token", resp.data.access);
          localStorage.setItem("name", resp.data.name);
          parentStateSetter(localStorage.getItem("token"));
        }
      })
      .catch((err) => {
        let error = "Credenciais Inválidas.";
        if (Object.keys(err).includes("data")) {
          error = err.response.data.detail;
        }

        return setError(error);
      });
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Olá, Visitante!
        </Typography>
        &nbsp;
        <Typography component="h4" variant="h5">
          Já é cadastrado?
        </Typography>
        <Typography style={{ color: "red" }}>{error}</Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (e) => {
              e.preventDefault();
              await handleLogin();
            }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Não possui cadastro? Cadastre-se aqui."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
