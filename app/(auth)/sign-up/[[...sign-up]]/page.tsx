import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Flohub</h1>
        <p className="text-white/70">Create an account to get started</p>
      </div>
      <SignUp />
    </main>
  );
};

export default SignUpPage; 