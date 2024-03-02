import { RegisterForm } from '../components/RegisterForm';
import { Link } from 'wouter';
export function Register() {
  return (
    <section className="m-auto mt-20 flex gap-3 flex-col justify-center max-w-lg">
      <img src="/images/logo.svg" alt="Logo" className="w-14 h-14 mb-12" />
      <h1 className="font-semibold text-2xl">Register</h1>
      <RegisterForm />
      <p className="mt-10 text-center">
        Already have an account? &nbsp;
        <Link href="/login" className="text-[#4F46E5]">
          Login
        </Link>
      </p>
    </section>
  );
}
