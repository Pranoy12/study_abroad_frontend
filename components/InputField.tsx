import React from "react";

type InputFieldProps = {
  InputFor?: string;
  Label?: string | null;
  InputType?: string;
  placeholder?: string;
  pattern?: string;
};

const InputField = ({
  InputFor,
  Label,
  InputType,
  placeholder,
  pattern,
}: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={InputFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {Label}
      </label>
      <input
        type={InputType}
        id={InputFor}
        name={InputFor}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
        placeholder={placeholder}
        pattern={pattern}
        required
      />
    </div>
  );
};

export default InputField;
