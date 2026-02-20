import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signInSchema } from "../../validation/signInValidation";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          console.log("Login attempt:", values);
        }}
      >
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Field
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Login
          </button>
        </Form>
      </Formik>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="/Sign Up"
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
