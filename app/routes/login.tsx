import { useEffect, useState, useCallback } from "react";
import {
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";
import { json, type DataFunctionArgs } from "@remix-run/node";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import styles from "~/styles/Login_Form.module.css";
import { sendResetPasswordOTP, verify } from "var";

interface LoaderData {
  error: string | null;
}

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error") || null;
  return json({ error });
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function LoginForm() {
  const { error: loaderError } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromQuery = searchParams.get("email") || "";
  const cookieEmail = typeof document !== "undefined" ? Cookies.get("email") : undefined;
  const email = emailFromQuery || cookieEmail || "";

  const [error, setError] = useState<string | null>(loaderError);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
      nextInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    const updatedOtp = Array(6).fill("");

    for (let i = 0; i < pastedData.length && i < otp.length; i++) {
      updatedOtp[i] = pastedData[i];
    }

    setOtp(updatedOtp);

    if (updatedOtp.every((digit) => digit !== "")) {
      verifyOtp(updatedOtp.join(""));
    }
  };

  const verifyOtp = async (otpValue: string): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await fetch(verify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const res = await response.json();
      if (res.success) {
        Cookies.set("email", res.user.email, { secure: false });
        Cookies.set("token", res.user.token, { secure: false });

        toast.success(res.message);
        navigate("/chat");
      } else {
        setError(res.message || "Failed to verify OTP.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOTP = useCallback(async () => {
    const response = await fetch(sendResetPasswordOTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const res = await response.json();
    if (res.success) {
      toast.success("We have resent an OTP to your email. Check spam if not found!");
      setTimeLeft(180);
      Cookies.set("timeLeft", "180", { secure: false });
    }
  }, [email]);

  useEffect(() => {
    setError(loaderError || searchParams.get("error"));
  }, [loaderError, searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const storedTime = Cookies.get("timeLeft");
    const initialTime = storedTime ? parseInt(storedTime, 10) : 180;
    setTimeLeft(initialTime);

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          Cookies.set("timeLeft", newTime.toString(), { secure: false });
          return newTime;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4">
              <img src="/logo-v2.png" alt="Logo" width={120} height={80} className="mx-auto" />
              <h1 className="text-4xl font-bold text-center text-gray-900">Athena 2.0</h1>

              <form className="space-y-4">
                <fieldset>
                  <label htmlFor="email" className="block text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="block w-full p-2 border rounded-lg bg-gray-100"
                  />
                </fieldset>

                <fieldset>
                  <label htmlFor="otp" className="block text-gray-700">
                    OTP
                  </label>
                  <div className="flex gap-2">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onPaste={handleOtpPaste}
                        className="w-10 p-2 text-center border rounded-lg"
                      />
                    ))}
                  </div>
                  {timeLeft > 0 ? (
                    <p className="text-sm text-gray-500 mt-2">
                      Resend in {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-blue-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </fieldset>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => verifyOtp(otp.join(""))}
                  className="w-full p-2 text-white bg-blue-600 rounded-lg"
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>

                {error && <p className="text-rederifyOext-sm">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
