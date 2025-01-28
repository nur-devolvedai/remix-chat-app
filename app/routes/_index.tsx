import { useState } from "react";
import { Form, useActionData, useNavigation, useNavigate, Link } from "@remix-run/react";
import { json, ActionFunction } from "@remix-run/node";
import { authEmail, signUpNewsletter } from "var";

// Define the type for action data (used for error handling)
type ActionData = {
  success?: boolean;
  email?: string;
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const newsletterConsent = formData.get("newsletterConsent") === "on";

  // Basic validation for email field
  if (!email || typeof email !== "string") {
    return json(
      { error: "Email is required and must be a valid string." },
      { status: 400 }
    );
  }

  try {
    // 1. Auth Endpoint
    const authResponse = await fetch(authEmail, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const authData = await authResponse.json();
    

    if (!authData.success) {
      return json({ error: authData.message }, { status: 400 });
    }

    // 2. Newsletter Signup (if consent given)
    if (newsletterConsent) {
      const newsletterResponse = await fetch(signUpNewsletter, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: newsletterConsent }),
      });

      const newsletterData = await newsletterResponse.json();
      if (!newsletterData.success) {
        return json(
          { error: "Failed to sign up for the newsletter." },
          { status: 400 }
        );
      }
    }
    // Return success so the client knows to navigate
    return json({ success: true, email }, { status: 200 });
  } catch (error) {
    console.error("Error during form submission:", error);
    return json({ error: "An unexpected error occurred." }, { status: 500 });
  }
};

export default function AuthForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  // Local state for newsletter checkbox
  const [newsletterConsent, setNewsletterConsent] = useState(true);

  // If the server returned success, navigate to the login page
  if (actionData?.success) {
    // navigate(`/login?email=${encodeURIComponent(actionData.email)}`);
    navigate(`/login?email=${actionData.email || ""}`);
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <img src="logo-v2.png" className="w-1/3" alt="" />
              <h1 className="text-4xl pb-0 mb-0 font-bold text-center tracking-tight text-gray-900">
                Athena 2.0
                <br />
                <Link
                  to="https://devolvedai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[10px] font-thin pt-0 mt-0 ml-20 uppercase leading-none"
                >
                  by{" "}
                  <span className="font-[Typewriter] hover:text-[#204FA2]">
                    devolvedai
                  </span>
                </Link>
              </h1>
            </div>

            <Form method="post" className="flex justify-center items-center flex-col">
              {/* EMAIL FIELDSET */}
              <fieldset className="w-full px-2 mt-4 text-left flex flex-col">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Sign up or log in
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Your email"
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full px-4 py-4"
                />
                {actionData?.error && (
                  <small className="block text-red-600 w-full">{actionData.error}</small>
                )}
              </fieldset>

              {/* NEWSLETTER CONSENT FIELDSET */}
              <fieldset className="w-full px-2 mt-4 text-left flex flex-col">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletterConsent"
                    id="newsletterConsent"
                    checked={newsletterConsent}
                    onChange={() => setNewsletterConsent(!newsletterConsent)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="newsletterConsent"
                    className="text-[#253241] text-[0.75rem] font-medium"
                  >
                    I want to receive updates and newsletters about Athena.
                  </label>
                </div>
                <small className="text-gray-500 mt-2 text-[0.55rem]">
                  Get exclusive updates on new features and insights about Athena and much more.
                </small>
              </fieldset>

              {/* TERMS AND CONDITIONS FIELDSET */}
              <fieldset className="w-full px-2 mt-2 text-left flex flex-col">
                <div className="flex items-center">
                  <label className="text-[#253241] text-[0.75rem] font-medium">
                    By signing up you agree to our{" "}
                    <Link
                      to="/termsAndConditions"
                      target="_blank"
                      className="leading-none underline"
                    >
                      Terms and Conditions.
                    </Link>
                  </label>
                </div>
              </fieldset>

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col justify-center w-full items-center px-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                  <span
                    className={`text-center flex-1 mt-6 bg-[#5F5F5F] ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                      } rounded-md p-[1rem] px-4 text-white`}
                  >
                    Continue
                  </span>
                </button>
              </div>

              {/* LOADING STATE */}
              {isSubmitting && <p className="mt-4 text-gray-500">Please wait...</p>}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
