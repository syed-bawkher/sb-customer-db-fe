import React from 'react'
import { Layout } from 'antd'

const NavBar = () => {
    const { Header } = Layout;
  return (
    <>
        <Header style={{ padding: 0, display: 'flex',alignItems: 'center' }} >
            <div style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>
                Customer Management Tool
            </div>
        </Header>
    </>
  )
}

export default NavBar