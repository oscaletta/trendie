import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
//import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from 'axios';
import SearchBar from './components/searchbar';
import Header from './components/header';
import { theme, ChakraProvider, Grid, GridItem, Box, Image } from "@chakra-ui/react";

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

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};

function App() {

  const classes = useStyles();
  const [tokenData, setTokenData] = useState('');
  const [priceData, setPriceData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

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
  
  console.log(input);


  return (
    <>
      <ChakraProvider theme={newTheme} resetCSS>
        <Header />
        <Paper>
          <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={1}
          >
            <GridItem rowSpan={2} colSpan={1} bg="tomato">
              <Box
                w="150px"
                borderRadius="10px"
                overflow="hidden"
                _hover={{ bg: "lightgrey" }}
              >
                <Image
                  src={tokenData && tokenData.image && tokenData.image.small}
                  alt={tokenData.name}
                  height="155px"
                  width="155px"
                  objectFit="cover"
                  display="block"
                />
                <Box
                  as="h4"
                  h="40px"
                  mb="auto"
                  fontWeight="bold"
                  lineHeight="tight"
                  display="flex"
                  justifyContent="center"
                  color="black"
                  isTruncated
                >
                  {tokenData.name}
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={3} bg="tomato">
              <Typography gutterBottom variant="subtitle1">
                {isLoading ? (<div>Loading ...</div>) : (tokenData.name)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Soramitsu
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>
              <Typography variant="subtitle1">{isLoading ? ('Loading ...') : (priceData && priceData.usd )}</Typography>
            </GridItem>
            {/*<GridItem colSpan={3} bg="tomato" />*/}
          </Grid>
        </Paper>
        
      </ChakraProvider>
      {/*<SearchBar input={input} setInput={setInput}/>
      <button size="xl" variant="with-shadow">Get data</button>*/}
      
    </>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
