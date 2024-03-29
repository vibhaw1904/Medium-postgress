import React from 'react'
import { Signupcomponent } from '../components/SignupComponent'
import { Quote } from '../components/Quote'

const Signin = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <Signupcomponent type='signin'/>
      <div className='hidden lg:block'>
      <Quote/>

      </div>    </div>
  )
}

export default Signin
