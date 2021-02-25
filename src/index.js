import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Header from './components/header';
import { theme, ChakraProvider, Box, Image, Badge, StarIcon } from "@chakra-ui/react";



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


  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  }


  return (
    <>
      <ChakraProvider theme={newTheme} resetCSS>
        <Header />
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={tokenData && tokenData.image && tokenData.image.small} alt={tokenData && tokenData.image && tokenData.image.small} />
          <Box p="6">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>

                  <Box color="gray.500" fontWeight="semibold" letterSpacing="wide"
                    fontSize="xs" textTransform="uppercase" ml="2">
                    {tokenData.name} beds &bull; {tokenData.name} baths
                  </Box>

                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight"
                    isTruncated>
                    {tokenData.name}
                  </Box>
                  
                  <Box>
                    {priceData && priceData.usd }
                    <Box as="span" color="gray.600" fontSize="sm">
                      / wk
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center"> 
                    
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {priceData && priceData.usd} reviews
                    </Box>
                  </Box>
          </Box>        
        </Box>
      </ChakraProvider>
    </>
  );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
