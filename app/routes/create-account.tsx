import { Form } from "@remix-run/react";

export default function CreateAccount() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <Form method="post" action="/verify-code" className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>
        </Form>

        {/* Link to Login */}
        <div className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-black hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}
