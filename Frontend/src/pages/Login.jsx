import { LoginForm } from "../components/LoginForm";

export function Login() {
  return (
    <main className="grid grid-cols-2  h-screen">
      <section className="px-[16rem] flex gap-3 flex-col justify-center ">
        <img src="/images/logo.svg" alt="Logo" className="w-14 h-14 mb-12" />
        <h1 className="font-semibold text-2xl">Masuk ke akun kamu</h1>
        <p className="text-[#4B5563] text-base font-normal self-stretch mb-8">
          Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu
          cita-citata sejak dalam embrio!
        </p>
        <LoginForm />
        <p className="mt-10 text-center">
          Belum punya akun?
          <span className="text-[#4F46E5]"> Daftar sekarang, gratis!</span>
        </p>
      </section>
      <section className="pb-[13rem] bg-right-side bg-center bg-no-repeat bg-cover flex flex-col-reverse items-center justify-between">
        <div className="max-w-xl gap-4">
          <p className="text-sm mb-4 text-white/60">NAMANYAJUGABELAJAR.IO</p>
          <p className="text-3xl text-white">
            Belajar secara online semakin mudah – tetep belajar walaupun pake
            kuota dari Kemendikbud hehe~
          </p>
        </div>
      </section>
    </main>
  );
}
