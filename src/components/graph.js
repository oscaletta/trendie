import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Copyright from './components/copyright';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


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

const Graph = () => {

    return (
    <Container maxWidth="sm">
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

export default Graph;