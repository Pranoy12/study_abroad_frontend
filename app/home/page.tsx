"use client";

import React, { useEffect } from "react";
import InputField from "@/components/InputField";
import Dropdown from "@/components/Dropdown";
import { callAI } from "@/utils/api";
import { useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";

const Home = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(entries)) {
      const query = `My ${key} is ${value}`;
      console.log(query);
      await callAI(query);
    }

    router.push("/chat");
  };

  useEffect(() => {
    callAI("Hi");
  }, []);

  return (
    <>
      <div>
        <button
          className="text-black bg-white-700 hover:bg-white-800 focus:ring-4 
              focus:outline-none focus:ring-white-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center dark:bg-white-600 
              dark:hover:bg-white-700 dark:focus:ring-whitex-800"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <InputField
            InputFor="first_name"
            Label="First Name"
            InputType="text"
            placeholder="John"
          />
          <InputField
            InputFor="last_name"
            Label="Last Name"
            InputType="text"
            placeholder="Doe"
          />
          <InputField
            InputFor="phone"
            Label="Phone Number"
            InputType="tel"
            placeholder="123-45-678"
            pattern="[0-9]{10}"
          />
          <InputField
            InputFor="email"
            Label="Email Address"
            InputType="email"
            placeholder="pranoy@gmail.com"
          />
          <InputField
            InputFor="LinkedInURL"
            Label="LinkedIn URL"
            InputType="url"
            placeholder="https://www.linkedin.com/in/john-doe-123abc"
          />
          <Dropdown
            InputFor="education"
            Label={"Select Highest education"}
            placeholder=""
            options={["BTECH", "12"]}
          />
          <InputField
            InputFor="academic_percentage"
            Label="Accademic Percentage"
            InputType="text"
            placeholder="95%"
          />
          <Dropdown
            InputFor="budget"
            Label={"Select Budget Range"}
            placeholder=""
            options={[
              "10,00,000 - 30,00,000",
              "30,00,000 - 50,00,000",
              "50,00,000 - 75,00,000",
              "75,00,000 - 1,00,00,000",
            ]}
          />
          <Dropdown
            InputFor="test"
            Label={"Select Graduate Admission test taken"}
            placeholder=""
            options={["IELTS", "GRE", "GMAT", "LSAT", "TOEFL"]}
          />
          <InputField
            InputFor="standardised_test_score"
            Label="Graduate Admission Test Score"
            InputType="text"
            placeholder="455"
          />
        </div>
        <div className="mb-6">
          <InputField
            InputFor="letter_of_recommendation"
            Label="Link to Letter of Recommendation"
            InputType="url"
            placeholder="https://dummy.com"
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 
                focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 
                dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center dark:bg-blue-600 
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Home;
