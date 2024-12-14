import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service'; // Import the AuthService class
import TextInput from './forms/forms-components/TextInput';
import ErrorMessage from './forms/forms-components/ErrorMessage';
import FormButton from './forms/forms-components/FormButton';
import { useUser } from '../context/UserContext'; // Import the useUser context

interface FormState {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword?: string;
  form: string;
  name?: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get the setUser function to update the context

  // State for toggling between register and login
  const [isRegister, setIsRegister] = useState<boolean>(false);

  // Form data and error handling
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
    name: '',
  });

  const clearErrors = () => {
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
      name: '',
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
      name: '',
    };

    if (isRegister && !form.name) newErrors.name = 'Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    if (isRegister && form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) return;

    try {
      const authService = new AuthService();

      if (isRegister) {
        // Registration logic
        const isRegistered = await authService.register(
          form.email,
          form.password,
          form.name || ''
        );
        if (isRegistered) {
          // After successful registration, log in the user
          const { success, user } = await authService.login(
            form.email,
            form.password
          );
          if (success && user) {
            setUser(user); // Set user in context after successful login
            navigate('/plants');
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              form: 'Login failed after registration.',
            }));
          }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: 'Registration failed.',
          }));
        }
      } else {
        // Login logic
        const { success, user } = await authService.login(
          form.email,
          form.password
        );
        if (success && user) {
          setUser(user); // Set user in context after successful login
          navigate('/plants');
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: 'Invalid username or password',
          }));
        }
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'An error occurred during authentication.',
      }));
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    clearErrors();
  };

  return (
    <div className="flex flex-col justify-center w-full gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isRegister && (
          <TextInput
            id="name"
            label="Name"
            value={form.name || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            placeholder="Enter your name"
          />
        )}

        <TextInput
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          placeholder="Enter your email"
        />

        <TextInput
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          placeholder="Enter your password"
        />

        {isRegister && (
          <TextInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword || ''}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
        )}

        {errors.form && (
          <ErrorMessage message={errors.form} variant="error" size="sm" />
        )}

        <FormButton type="submit" variant="primary">
          {isRegister ? 'Register' : 'Login'}
        </FormButton>
      </form>

      <button
        type="button"
        onClick={toggleForm}
        className="inline-block align-baseline font-bold text-sm text-secondary dark:text-dark-secondary hover:text-secondaryVariant dark:hover:text-dark-secondaryVariant"
      >
        {isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;
