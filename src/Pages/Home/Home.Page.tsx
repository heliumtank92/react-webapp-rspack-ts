import React from 'react'
import { Typography } from '@mui/material'
import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

console.log('HOME_IMAGE', HOME_IMAGE)

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <>
      <Typography variant="h2">Home Page</Typography>
    </>
  )
}

export default HomePage
