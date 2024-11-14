import React from 'react'
import { Typography } from '@mui/material'
import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  console.log('home', HOME_IMAGE)
  return (
    <>
      <Typography variant="h2">Home Page1</Typography>
    </>
  )
}

export default HomePage
