import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'; // Extendable to other types as needed
  value: string | number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder = '',
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-surface dark:bg-dark-surface text-onSurface dark:text-dark-onSurface ${
        error ? 'border-error' : ''
      }`}
    />
    {error && <p className="text-error text-xs italic">{error}</p>}
  </div>
);

export default TextInput;
