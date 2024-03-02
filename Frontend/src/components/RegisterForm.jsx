import { useForm } from 'react-hook-form';
import { register as registerService } from '../services/login';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'wouter';

import PropTypes from 'prop-types';

export function RegisterForm() {
  ErrorMessage.propTypes = {
    field: PropTypes.string,
  };
  const [, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorRegister = ({ message }) => toast.error(message);
  const successRegister = ({ message }) => toast.success(message);

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    try {
      const dataUser = await registerService({
        firstName,
        lastName,
        email,
        password,
      });
      if (dataUser.data.token) {
        successRegister({ message: dataUser.message });
        setTimeout(() => setLocation('/tasks'), 500);
      } else {
        errorRegister({ message: 'Failed Register' });
      }
    } catch (error) {
      errorRegister({ message: error.message });
    }
  };

  function ErrorMessage({ field }) {
    return <small className="text-red-400">{errors[field].message}</small>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-semibold text-gray-90"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', {
            required: 'This field is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50',
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'invalid first name, only letters are allowed',
            },
          })}
          className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
        />
        {errors.firstName && <ErrorMessage field="firstName" />}
      </div>
      <div className="mb-6">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-semibold text-gray-90"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register('lastName', {
            required: 'This field is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50',
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'invalid last name, only letters are allowed',
            },
          })}
          className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
        />
        {errors.lastName && <ErrorMessage field="lastName" />}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-gray-90"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            maxLength: {
              value: 50,
              message: 'Max length is 50',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
        />
        {errors.email && <ErrorMessage field="email" />}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2  text-sm font-semibold text-gray-90"
        >
          Password
        </label>
        <input
          type="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Min length is 8',
            },
            maxLength: {
              value: 12,
              message: 'Max length is 12',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
              message:
                'The password must include at least one number, one uppercase and one lowercase',
            },
          })}
          id="password"
          className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
        />
        {errors.password && <ErrorMessage field="password" />}
      </div>
      <button
        type="submit"
        className="text-white bg-[#4F46E5] font-medium rounded-lg text-sm w-full p-6 text-center "
      >
        Register
      </button>
      <Toaster />
    </form>
  );
}
