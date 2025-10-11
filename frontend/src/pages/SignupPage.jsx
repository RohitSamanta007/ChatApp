import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningup, signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
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
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* form Element  */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FullName  */}
                  <div>
                    <label htmlFor="fullName" className="auth-input-label">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        placeholder="John Snow"
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                      />
                    </div>
                  </div>

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
                    className="auth-btn"
                    type="submit"
                    disabled={isSigningup}
                  >
                    {isSigningup ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link to={"/login"} className="auth-link">
                    Already have an account ? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Image content -Right Side  */}
            <div className="hiddent md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                  <img src="/signup.png" alt="people using mobile devices" className="w-full h-auto object-contain" />
                  <div className="mt-6 text-center">
                    <h3>Start Your Journey Today</h3>
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

export default SignupPage;
