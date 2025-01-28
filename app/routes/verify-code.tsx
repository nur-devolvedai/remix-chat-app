import { Form } from "@remix-run/react";

export default function VerifyCode() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Two-Factor Verification</h1>
        <p className="text-sm text-center text-gray-600">
          Enter the 6-digit code sent to your email or phone.
        </p>
        <Form method="post" action="/verify" className="space-y-4">
          {/* Verification Code */}
          <div>
            <label htmlFor="code" className="block mb-2 text-sm font-medium">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              placeholder="Enter your 6-digit code"
              maxLength={6}
              pattern="\d{6}" // Accept only 6-digit numbers
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-center tracking-widest"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            Verify Code
          </button>
        </Form>

        {/* Resend Code */}
        <div className="text-sm text-center text-gray-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={() => alert("Code resent!")}
            className="text-black hover:underline"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
