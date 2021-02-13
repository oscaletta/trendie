import React, {useState} from 'react';
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from 'axios';

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



function App() {

  const classes = useStyles();
  const [TokenData, setTokenData] = useState('')

  axios.get('https://api.coingecko.com/api/v3/coins/sora/history?date=13-02-2021')
         .then(response => {
            console.log(response.data)
            const dataT  = response.data
            setTokenData(dataT)
         });

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
    </Container>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
