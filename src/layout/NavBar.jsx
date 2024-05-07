import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { Layout } from 'antd'

const NavBar = () => {
    const { Header } = Layout;
  return (
    <>
        <Header className='flex flex-row justify-between' >
            <div style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>
                Customer Management Tool
            </div>
            <div className='flex flex-row items-center space-x-5'>
                <div className='flex flex-row text-white items-center space-x-2'>
                    <FaUsers className='text-2xl'/>
                    <div>Manage Customers</div>
                </div>
                <div className='flex flex-row text-white items-center space-x-2'>
                    <FaSheetPlastic className='text-2xl' />
                    <div>Manage Orders</div>
                </div>
            </div>
        </Header>
    </>
  )
}

export default NavBar