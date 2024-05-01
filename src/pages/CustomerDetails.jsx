import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customerService from '../services/customerService';
import OrderTable from '../tables/OrderTable';

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setCustomer(await customerService.findById(customerId));
            //console.log('Customer:', customer);
        };

        fetchData();
    }, [customerId]);

    if (!customer) {
        return <div>Loading...</div>; // or some other loading indicator or handling
    }

    const fullName = [customer.first_name, customer.middle_name, customer.last_name]
        .filter(name => name && name !== "NULL") // Check for non-null and not "NULL"
        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()) // Capitalize names
        .join(" ");

    return<>
        <h1 className='text-xl font-semibold '>{`${customer.customer_id + ": "+ fullName}`}</h1>
        <div className='flex flex-row justify-between'>
        <div className='pt-2'>
            <div className='flex flex-row space-x-2'>
                <div className=''>Office:</div>
                <div>{customer.office_phone}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Residential:</div>
                <div>{customer.residential_phone}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Mobile:</div>
                <div>{customer.mobile}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Email:</div>
                <div>{customer.email}</div>
            </div>
        </div>
        <div className='pt-2'>
            <div className='flex flex-row space-x-2'>
                <div className=''>Address 1:</div>
                <div>{customer.add1}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Address 2:</div>
                <div>{customer.add2}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Address 3:</div>
                <div>{customer.add3}</div>
            </div>
            <div className='flex flex-row space-x-2'>
                <div className=''>Address 4:</div>
                <div>{customer.add4}</div>
            </div>
        </div>
        </div>
        <OrderTable customerId={customerId}/>
    </>;
};

export default CustomerDetails;