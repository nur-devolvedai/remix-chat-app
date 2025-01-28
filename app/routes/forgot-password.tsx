import { Form } from "@remix-run/react";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <p className="text-sm text-center text-gray-600">
          Enter your email address, and we&apos;ll send you a link to reset your password.
        </p>
        <Form method="post" action="/reset-password" className="space-y-4">
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

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reset Password
          </button>
        </Form>

        {/* Link to Login */}
        <div className="text-sm text-center text-gray-500">
          Remember your password?{" "}
          <a href="/" className="text-black hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}
