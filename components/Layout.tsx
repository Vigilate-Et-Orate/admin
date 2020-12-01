import React from 'react'
import Head from 'next/head'

import Nav from './Nav'

export type TLayoutProps = {
  children: JSX.Element[] | JSX.Element,
  title: string
}

const Layout = ({ children, title }: TLayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ overflowX: 'hidden' }}>
        <Nav>
          {children}
        </Nav>
      </main>
    </div>
  )
}

export default Layout