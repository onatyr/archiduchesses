import AuthForm from '@plantApp/src/components/AuthForm';
import ReactIcon from '@plantApp/src/components/ReactIcon';

const WelcomeScreen = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 bg-primary dark:bg-dark-primary text-onPrimary dark:text-dark-onPrimary p-8">
        <ReactIcon type="plant" size="3em" />
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to Turbo Plant
        </h2>
      </div>

      <div className="flex justify-center items-center w-1/2 bg-background dark:bg-dark-background p-8">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
