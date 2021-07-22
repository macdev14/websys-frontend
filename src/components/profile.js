import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./copyright";
import api from "./api";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
function getToken() {
  return localStorage.getItem("token") ? localStorage.getItem("token") : "";
}

function getUserid() {
  if (getToken() !== "" && getToken() != null) {
    let decode = jwt(getToken());

    return decode.user_id;
  }

  localStorage.clear();
  return null;
}
export default function Profile({ parentStateSetter, parentState }) {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [pis, setPis] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  let headers = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  async function handleRegister() {
    return await api
      .put(
        "api/users/" + getUserid() + "/",
        {
          email: email,
          password: password,
          name: name,
          pis: pis,
          identity: identity,
          country: country,
          state: state,
          city: city,
          street: street,
          number: number,
          reference: reference,
        },
        headers
      )
      .then(function (resp) {
        if (Object.keys(resp).includes("data")) {
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        if (Object.keys(error).includes("response")) {
          error = error.response.data;
        }
        return setError(error);
      });
  }

  useEffect(() => {
    if (!getUserid() || getUserid() == null) {
      return history.push("/");
    }

    async function getData() {
      return api
        .get("api/users/" + getUserid(), headers)
        .then(function (resp) {
          let data = resp.data;
          setData(data);
          setEmail(data.email ?? "");
          setName(data.name ?? "");
          setIdentity(data.identity ?? "");
          setPis(data.pis ?? "");
          setCountry(data.country ?? "");
          setState(data.state ?? "");
          setCity(data.city ?? "");
          setStreet(data.street ?? "");
          setNumber(data.number ?? "");
          setReference(data.reference ?? "");
          localStorage.setItem("name", data.name);
        })
        .catch((e) => {
          localStorage.clear();
          history.push("/");
        });
    }
    return data ? "" : getData();
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Meu Perfil
          </Typography>

          <Typography component="h5" variant="h5">
            {error}
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label=" Nome"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoComplete="name"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.name}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email address"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.email}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="identity"
              label="CPF"
              name="identity"
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value);
              }}
              autoComplete="identity"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.identity}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              autoComplete="current-password"
            />

            <Typography component="h5" variant="h5">
              {error.password}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="pis"
              label="PIS (opcional)"
              name="pis"
              value={pis}
              onChange={(e) => {
                setPis(e.target.value);
              }}
              autoComplete="pis"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.pis}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="country"
              label="País"
              name="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              autoComplete="country"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="state"
              label="Estado"
              name="state"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              autoComplete="state"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.street}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="city"
              label="Cidade"
              name="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              autoComplete="city"
              autoFocus
            />

            <Typography component="h5" variant="h5">
              {error.city}
            </Typography>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="street"
              label="Rua"
              name="street"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              autoComplete="street"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.street}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="Número"
              name="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              autoComplete="number"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.number}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="reference"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
              }}
              label="Complemento"
              name="reference"
              autoComplete="Complemento"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              {error.reference}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                await handleRegister();
              }}
              className={classes.submit}
            >
              Atualizar Perfil
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Voltar
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
