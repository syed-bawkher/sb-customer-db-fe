import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaSheetPlastic, FaWarehouse } from "react-icons/fa6";
import { Layout } from 'antd'
import { useNavigate } from "react-router-dom"; 

const NavBar = () => {
    const { Header } = Layout;
    const navigate = useNavigate(); // Hook to get the navigate function

    const handleManageCustomersClick = () => {
        navigate(`/`); // Navigate to Home
    };

    const handleManageTextileClick = () => {
        navigate(`/fabrics`); // Navigate to customer details
    };
  return (
    <>
        <Header className='flex flex-row justify-between' >
            <div style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>
                Syed Bawkher CRM
            </div>
            <div className='flex flex-row items-center space-x-5'>
                <div className='flex flex-row text-white items-center space-x-2' onClick={handleManageCustomersClick}>
                    <FaUsers className='text-2xl'/>
                    <div>Manage Customers</div>
                </div>
                <div className='flex flex-row text-white items-center space-x-2' onClick={handleManageTextileClick}>
                    <FaWarehouse className='text-2xl' />
                    <div>Manage Inventory</div>
                </div>
            </div>
        </Header>
    </>
  )
}

export default NavBar

/*
    <div className='flex flex-row text-white items-center space-x-2'>
       <FaSheetPlastic className='text-2xl' />
       <div>Manage Orders</div>
    </div>
 */