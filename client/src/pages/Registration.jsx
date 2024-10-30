import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Typography, Input, Button } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';

export function Registration() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => setPasswordShown2((cur) => !cur);

  //validate register form data
  const validation = Yup.object({
    email: Yup.string()
      .email('invalid email format')
      .required('Email is required'),
    password1: Yup.string().required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Must match "password" field value')
      .required('Enter password again'),
  });

  // formik object
  const formik = useFormik({
    initialValues: {
      email: '',
      password1: '',
      password2: '',
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log('formik called');
      console.log(values);
      const response = axios.post("http://localhost:5000/api/register",values);
      console.log(response);
      
    },
    validateOnChange: false,
    validateOnBlur: false,
  });



  return (
    <section className='grid text-center h-screen items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Registration
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email and password to sign up
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className='mx-auto max-w-[24rem] text-left'
        >
          {/* email */}
          <div className='mb-6'>
            <label htmlFor='email'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Your Email
              </Typography>
            </label>
            <Input
              id='email'
              color='gray'
              size='lg'
              type='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
            />
            {formik.errors.email && (
              <Typography color='red' variant='small'>
                {formik.errors.email}
              </Typography>
            )}
          </div>
          {/* password */}
          <div className='mb-6'>
            <label htmlFor='password'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Password
              </Typography>
            </label>
            <Input
              id='password1'
              name='password1'
              color='gray'
              size='lg'
              placeholder='********'
              value={formik.values.password1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              labelProps={{
                className: 'hidden',
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              type={passwordShown ? 'text' : 'password'}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className='h-5 w-5' />
                  ) : (
                    <EyeSlashIcon className='h-5 w-5' />
                  )}
                </i>
              }
            />
            {formik.errors.password1 && (
              <Typography color='red' variant='small'>
                {formik.errors.password1}
              </Typography>
            )}
          </div>
          {/* confirm password */}
          <div className='mb-6'>
            {/* text */}
            <label htmlFor='password'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Confirm Password
              </Typography>
            </label>
            {/* input field */}
            <Input
              id='password2'
              size='lg'
              placeholder='********'
              name='password2'
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              labelProps={{
                className: 'hidden',
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              type={passwordShown2 ? 'text' : 'password'}
              // icon
              icon={
                <i onClick={togglePasswordVisiblity2}>
                  {passwordShown2 ? (
                    <EyeIcon className='h-5 w-5' />
                  ) : (
                    <EyeSlashIcon className='h-5 w-5' />
                  )}
                </i>
              }
            />
            {/* validation errors */}
            {formik.errors.password2 && (
              <Typography color='red' variant='small'>
                {formik.errors.password2}
              </Typography>
            )}
          </div>

          {/* registor button */}
          <Button
            color='green'
            size='lg'
            className='mt-16'
            fullWidth
            type='submit'
          >
            Register
          </Button>
          {/* <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <a href="#" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography> */}
        </form>
      </div>
    </section>
  );
}

export default Registration;
