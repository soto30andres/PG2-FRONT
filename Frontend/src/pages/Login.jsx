import { LoginForm } from '../components/LoginForm';
import { Link } from 'wouter';

export function Login() {
  return (
    <section className="m-auto mt-20 flex gap-3 flex-col justify-center max-w-lg">
      <img src="/images/logo.svg" alt="Logo" className="w-14 h-14 mb-12" />
      <h1 className="font-semibold text-2xl">Log In</h1>
      <LoginForm />
      <p className="mt-10 text-center">
        Dont have an account? &nbsp;
        <Link href="/signup" className="text-[#4F46E5]">
          Register
        </Link>
      </p>
    </section>
  );
}
