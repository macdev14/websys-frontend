import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./copyright";
import api from "./api";
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
  error: {
    color: "red",
  },
}));

export default function Register() {
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

  async function handleRegister() {
    return await api
      .post("api/users/", {
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
      })
      .then(function (resp) {
        if (Object.keys(resp).includes("data")) {
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log("hello");
        console.log(error.response.data);
        if (Object.keys(error).includes("response")) {
          error = error.response.data;
        }

        return setError(error);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="caption" className={classes.error}>
          Cadastro
        </Typography>

        <form className={classes.form} noValidate>
          <Typography component="p" variant="caption" className={classes.error}>
            {error.name}
          </Typography>
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
          <Typography component="p" variant="caption" className={classes.error}>
            {error.email}
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.identity}
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.password}
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            autoComplete="current-password"
          />

          <Typography component="p" variant="caption" className={classes.error}>
            {error.pis}
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
          <Typography component="p" variant="caption" className={classes.error}>
            {error.country}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="street"
            label="País"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            autoComplete="country"
            autoFocus
          />
          <Typography component="p" variant="caption" className={classes.error}>
            {error.state}
          </Typography>
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.city}
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.street}
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.number}
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

          <Typography component="p" variant="caption" className={classes.error}>
            {error.reference}
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
            Cadastre se
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/"> Já possui cadastro? Entre aqui</Link>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
