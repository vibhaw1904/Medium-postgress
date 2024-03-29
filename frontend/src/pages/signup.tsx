import React from 'react'
import { Quote } from '../components/Quote'
import { Signupcomponent } from '../components/SignupComponent'

const Signup = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <Signupcomponent type='signup'/>
      <div className='hidden lg:block'>
      <Quote/>

      </div>
    </div>
  )
}

export default Signup

