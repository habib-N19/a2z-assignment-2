import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import SocialLogin from '../shared/SocialLogin/SocialLogin'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const { createUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser)
        reset()
      })
      .catch(error => console.error(error))
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='p-6 rounded bg-base-20 w-96 mx-auto shadow-lg border-slate-300 h-fit'>
        <h2 className='text-4xl text-center mb-12 dark:text-white'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
          <div className='space-y-5'>
            <div>
              <div className='mt-2.5'>
                <input
                  type='text'
                  {...register('name', { required: true })}
                  name='name'
                  placeholder='Enter your full name'
                  className='block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                />
                {errors.name && (
                  <span className='text-red-600'>Name is required</span>
                )}
              </div>
            </div>

            <div>
              <div className='mt-2.5'>
                <input
                  type='email'
                  {...register('email', { required: true })}
                  name='email'
                  placeholder='Enter email'
                  className='block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                />
                {errors.email && (
                  <span className='text-red-600'>Email is required</span>
                )}
              </div>
            </div>

            <div>
              <div className='mt-2.5'>
                <input
                  type='password'
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                  placeholder='Enter your password'
                  className='block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                />
                {errors.password?.type === 'required' && (
                  <p className='text-red-600'>Password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className='text-red-600'>Password minimum 6 characters</p>
                )}
              </div>
            </div>
            <div>
              <input
                value='Create Account'
                type='submit'
                className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
              ></input>
            </div>
          </div>
        </form>
        <p className='mt-2 text-base text-gray-600'>
          Already have an account?
          <Link
            to='/'
            title=''
            className='font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
          >
            Login
          </Link>
        </p>

        <div className='mt-3 space-y-3'>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  )
}

export default SignUp
