import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Flohub</h1>
      </div>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </main>
  );
};

export default SignInPage; 