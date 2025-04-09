import { FormCard, RegisterForm } from '@/components/forms';

export const User = () => {
  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Welcome User🌱
      </h1>

      <FormCard>
        <RegisterForm />
      </FormCard>
    </>
  );
};
