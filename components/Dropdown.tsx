import React from "react";

type DropdownProps = {
  InputFor?: string;
  Label?: string | null;
  placeholder?: string;
  options?: any;
};

const Dropdown = ({ InputFor, Label, placeholder, options }: DropdownProps) => {
  return (
    <div>
      <label
        htmlFor={InputFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {Label}
      </label>
      <select
        id={InputFor}
        name={InputFor}
        defaultValue={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue={placeholder}>{placeholder}</option>
        {options.map((code: string, index: number) => (
          <option key={index} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
