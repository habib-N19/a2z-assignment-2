import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import SocialLogin from '../shared/SocialLogin/SocialLogin'

const Login = () => {
  const { signIn } = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = data => {
    console.log(data)
    signIn(data.email, data.password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser)
        // navigate(from, { replace: true })
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='p-6 rounded bg-base-20 w-96 mx-auto shadow-lg border-slate-300 h-fit'>
        <h2 className='text-4xl text-center mb-12 dark:text-white'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            <div>
              <div className='mt-2.5 relative text-gray-400 focus-within:text-gray-600'>
                <input
                  type='email'
                  {...register('email', { required: true })}
                  name='email'
                  placeholder='Enter email'
                  className='block w-full p-4 pl-10 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                />
                {errors.email && (
                  <span className='text-red-600'>Email is required</span>
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'></div>
              <div className='mt-2.5 relative text-gray-400 focus-within:text-gray-600'>
                <input
                  type='password'
                  {...register('password', {
                    required: true
                  })}
                  placeholder='Enter your password'
                  className='block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600'
                />
                <a
                  href='#'
                  title=''
                  className='text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline'
                >
                  Forgot password?
                </a>
                {errors.password?.type === 'required' && (
                  <p className='text-red-600'>Password is required</p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
              >
                Log in
              </button>
            </div>
            <div className='mt-3 space-y-3'>
              <SocialLogin></SocialLogin>
            </div>

            <div className='text-center'>
              <p className='text-base text-gray-600'>
                Don’t have an account?{' '}
                <Link
                  to='/signup'
                  title=''
                  className='font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline'
                >
                  Create a free account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
