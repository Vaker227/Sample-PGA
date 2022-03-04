import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';

interface Props {
  register: UseFormRegister<ILoginParams>;
  label: string;
  validationOptions?: RegisterOptions;
  type: keyof ILoginParams;
  insivible?: boolean;
}

const LoginInputComponent = (props: Props) => {
  const { register, type, label, validationOptions, insivible } = props;
  return (
    <div className="relative">
      <input
        autoComplete="on"
        {...register(type, validationOptions)}
        placeholder={label}
        className="peer w-full rounded-sm px-2 py-4 text-gray-600 placeholder-transparent ring-1
         ring-slate-300 focus:outline-none focus:ring focus:ring-sky-500/50"
        type={insivible ? 'password' : 'text'}
      ></input>
      <div
        className="absolute left-2 top-0.5 text-xs text-gray-900 transition-all
       peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600"
      >
        {label}
      </div>
    </div>
  );
};

export default LoginInputComponent;
