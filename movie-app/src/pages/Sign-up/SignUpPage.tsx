import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../../validation/signUpValidation";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg bg-gray-900/70 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-gray-400">
          Join StreamVibe and start your movie journey.
        </p>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            console.log("Sign up details:", values);
          }}
        >
          <Form className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  First name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-sm text-red-400 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Last name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-sm text-red-400 mt-1"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="jane@email.com"
                className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-400 mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
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
                className="text-sm text-red-400 mt-1"
              />
              <p className="mt-2 text-xs text-gray-500">
                Use 8+ characters with uppercase, number, and special character.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm password
              </label>
              <div className="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
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
                name="confirmPassword"
                component="p"
                className="text-sm text-red-400 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Create Account
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default SignUpPage;
