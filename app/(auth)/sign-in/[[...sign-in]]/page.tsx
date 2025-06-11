import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Flohub</h1>
        <p className="text-white/70">Welcome back! Please sign in to continue</p>
      </div>
      <SignIn />
    </main>
  );
};

export default SignInPage; 