import React from 'react'

const Header = ({ pageTitle}) => {
  return (
    <header className='app-header'>
      <h1 className='page-title'>{pageTitle}</h1>
    </header>
  )
}

export default Header