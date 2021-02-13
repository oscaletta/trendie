import React from 'react';
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './components/copyright';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const data = [
  {
    name: 'FEB-01',
    price: 2400,
    amt: 2400,
  },
  {
    name: 'FEB-02',
    price: 1398,
    amt: 2210,
  },
  {
    name: 'FEB-03',
    price: 19800,
    amt: 2290,
  },
  {
    name: 'FEB-04',
    price: 3908,
    amt: 2000,
  },
  {
    name: 'FEB-05',
    price: 4800,
    amt: 2181,
  },
  {
    name: 'FEB-06',
    price: 3500,
    amt: 2500,
  },
  {
    name: 'FEB-07',
    price: 2000,
    amt: 2100,
  },
  {
    name: 'FEB-08',
    price: 20000,
    amt: 2100,
  },
  {
    name: 'FEB-09',
    price: 980,
    amt: 2100,
  },
  {
    name: 'FEB-10',
    price: 6400,
    amt: 2100,
  },
  {
    name: 'FEB-11',
    price: 7200,
    amt: 2100,
  },
];

function App() {

  const classes = useStyles();


  return (
    
    <Container maxWidth="sm">
          <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://assets.coingecko.com/coins/images/11093/small/sora_logo_cg_white.png?1588284194"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Sora
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Soramitsu
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: 1030114
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    Comprar
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">$262.00</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h4" component="h1" gutterBottom>
          Graphs
        </Typography>
        <LineChart width={500} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        <Copyright />
    </Container>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
