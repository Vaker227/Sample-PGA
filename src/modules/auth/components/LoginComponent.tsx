import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';
import { emailValidation, passowrdValidation } from '../utils';
import LoginInputComponent from './LoginInputComponent';

interface Props {
  onSubmit: SubmitHandler<ILoginParams>;
}

const LoginComponent = (props: Props) => {
  const { onSubmit } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginParams>({ mode: 'onBlur' });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[30rem] space-y-4 rounded-md  bg-[#f3f3f3] p-4 shadow-lg"
    >
      <div className="text-center text-3xl ">Login</div>
      <LoginInputComponent
        register={register}
        label={'Email'}
        type={'email'}
        validationOptions={emailValidation}
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <LoginInputComponent
        register={register}
        label={'Password'}
        type={'password'}
        validationOptions={passowrdValidation}
        insivible
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <input
        className={`block w-full cursor-pointer rounded bg-green-600 py-2 text-center text-white ${
          !!errors.password && !!errors.email && 'opacity-75'
        } hover:bg-green-700 focus:ring focus:ring-green-300 active:ring active:ring-green-300 `}
        tabIndex={0}
        type="submit"
        value={'Login'}
      />
    </form>
  );
};

export default LoginComponent;
