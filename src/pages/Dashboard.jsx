import React from 'react';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Dashboard = () => {

  return (
        <div>
          <h1 className='text-2xl font-semibold'>Home Page</h1>
          
          <div className='flex flex-row flex-wrap'>
            <Card 
              imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
              title={'Asset Master'}
              number={580}
              bgColor={'#8196CE'}
            />

            <Card 
              imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
              title={'Asset TSPM'}
              number={444}
              bgColor={'#2A4876'}
            />

            <Card 
              imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
              title={'Asset TSPM'}
              number={444}
              bgColor={'#2A4876'}
            />

            
          <Card 
              imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
              title={'Asset TSPM'}
              number={444}
              bgColor={'#2A4876'}
            />
          </div>
          
        </div>
  )
}

export default Dashboard