import React, {useState, useEffect} from 'react';
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
  const [tokenData, setTokenData] = useState('')
  const [priceData, setPriceData] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  let currentDate = new Date();
  const formattedDate = currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear();

  
  useEffect(() => {
    setIsLoading(true);
    const ticker = "chainlink";
    const urlTokenHistory = 'https://api.coingecko.com/api/v3/coins/'+ticker+'/history?date='+formattedDate;

    axios.get(urlTokenHistory)
         .then(response => {
            const data  = response.data
            setTokenData(data)
         });

    //fetching updated price
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+ticker+'&vs_currencies=usd')
         .then(response => {
            console.log(response.data[ticker] && response.data[ticker].usd)
            const data  = response.data[ticker]
            setPriceData(data)
         });
    setIsLoading(false);
  },[])
  
  //console.log(priceData.usd);

  return (
    <Container maxWidth="sm">
          <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={tokenData && tokenData.image && tokenData.image.small}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {isLoading ? (<div>Loading ...</div>) : (tokenData.name)}
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
                <Typography variant="subtitle1">{isLoading ? ('Loading ...') : (priceData && priceData.usd )}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    </Container>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
