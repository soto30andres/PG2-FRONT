import { useForm } from "react-hook-form";
import { signIn } from "../services/login";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "wouter";

import PropTypes from "prop-types";
export function LoginForm() {
  ErrorMessage.propTypes = {
    field: PropTypes.string,
  };
  const [, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorSignIn = ({ message }) => toast.error(message);
  const successSignIn = ({ message }) => toast.success(message);

  const onSubmit = async ({ email, password }) => {
    try {
      const dataUser = await signIn({ email, password });
      successSignIn({ message: dataUser.message });
      setTimeout(() => setLocation("/tasks"), 500);
    } catch (error) {
      errorSignIn({ message: error.message });
    }
  };

  function ErrorMessage({ field }) {
    return <small className="text-red-400">{errors[field].message}</small>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
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
          Kata Sandi
        </label>
        <input
          type="password"
          {...register("password", { required: "This field is required" })}
          id="password"
          className=" text-sm h-16 rounded-lg block w-full p-2.5 bg-[#F3F4F6]"
        />
        {errors.password && <ErrorMessage field="password" />}
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4  ounded focus:ring-3 focus:ring-blue-300 bg-[#F3F4F6] "
          />
        </div>
        <label htmlFor="remember" className="ml-2 text-sm font-base">
          Ingat saya
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-[#4F46E5] font-medium rounded-lg text-sm w-full p-6 text-center "
      >
        Masuk
      </button>
      <Toaster />
    </form>
  );
}
