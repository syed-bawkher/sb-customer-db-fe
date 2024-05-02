import React from 'react'
import PantMeasurements from './PantMeasurements';
import ShirtMeasurements from './ShirtMeasurements';
import JacketMeasurements from './JacketMeasurements';

const PastMeasurements = ({customerId}) => {
  return (
    <>
    <h1 className='py-2 text-lg'>Past Measurements</h1>
    <div className='space-y-5 pb-10'>
        <JacketMeasurements customerId={customerId} />
        <PantMeasurements customerId={customerId} />
        <ShirtMeasurements customerId={customerId} />
    </div>
    </>
  )
}

export default PastMeasurements