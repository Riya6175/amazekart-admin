import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiPhoneNumber from "material-ui-phone-number";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from "../../components/layout"
import {login} from "../../actions"
import {useDispatch, useSelector} from 'react-redux';
// import { Redirect } from 'react-router';
import{ Redirect } from "react-router-dom"



/**
* @author
* @function Signin
**/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        AmazeKart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: "#4B5563",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4B5563",
    "&:hover": {
        backgroundColor: "#6B7280"
    }
  },
}));

export default function Signin(props) {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error,setError] = useState("")
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  

  
  const userLogin = (e) => {

    e.preventDefault();
    const user = {
      email,password
    }

    dispatch(login(user));
  }
    
  const classes = useStyles();
  
  if(auth.authenticate){
    return <Redirect to={"/category"}/>
  }
  return (
      <Layout>

      
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {console.log(auth.error)}
        <Avatar  className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={userLogin} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          
        </form>
      </div>
      <hr style={{ marginTop: "10%"}}/>
      <Box style={{ marginBottom: "10%"}} mt={5}>
        <Copyright />
      </Box>
    </Container>
    </Layout>
  );
}