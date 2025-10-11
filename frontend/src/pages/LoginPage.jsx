import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Loader2, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="w-full p-4">
      <div className=" relative w-full max-w-6xl md:h-[800px] h-[650px] mx-auto">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* From Content - Left side  */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="size-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* form Element  */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email  */}
                  <div>
                    <label htmlFor="email" className="auth-input-label">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        placeholder="John.snow@mail.com"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Password Input  */}
                  <div>
                    <label htmlFor="password" className="auth-input-label">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                      />
                    </div>
                  </div>
                  <button
                    className="auth-btn flex items-center justify-center"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <Loader2 className="size-6 animate-spin" />
                    ) : (
                      "Login "
                    )}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link to={"/signup"} className="auth-link">
                    Do not hanve an account ? Signup
                  </Link>
                </div>
              </div>
            </div>

            {/* Image content -Right Side  */}
            <div className="hiddent md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="people using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3>Connect anytime, anywhere</h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
