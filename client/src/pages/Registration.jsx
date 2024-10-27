import { useState } from 'react';

import { Typography, Input, Button } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
  });

  const { email, password1, password2 } = formData;

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => setPasswordShown2((cur) => !cur);

  //submit registration form
  const submit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    //  console.log(formData);
    validation(formData);
  };

  //validate register form data
  const validation = (e) => {
    console.log(formData);
    //password validation
    
  };

  return (
    <section className='grid text-center h-screen items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Registration
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email and password to sign up
        </Typography>
        <form onSubmit={submit} className='mx-auto max-w-[24rem] text-left'>
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
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
            />
          </div>
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
              size='lg'
              placeholder='********'
              value={password1}
              onChange={(e) =>
                setFormData({ ...formData, password1: e.target.value })
              }
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
          </div>

          <div className='mb-6'>
            <label htmlFor='password'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size='lg'
              placeholder='********'
              value={password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
              labelProps={{
                className: 'hidden',
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              type={passwordShown2 ? 'text' : 'password'}
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
          </div>
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

export default Login;
