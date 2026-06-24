"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth"; 
import { Card, CardHeader, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      } else {
        toast.success("লগইন সফল হয়েছে! 🎉");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error("কিছু একটা ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      toast.error("গুগল লগইন ব্যর্থ হয়েছে!");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)] px-4">
      <Card className="w-full max-w-md p-2 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center pt-4 pb-0">
          <h1 className="text-2xl font-bold text-center">StartupForge</h1>
          <p className="text-small text-default-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </CardHeader>

        <div className="p-5 flex flex-col gap-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              label="ইমেইল অ্যাড্রেস"
              variant="bordered"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required /* এখানে isRequired এর বদলে required ব্যবহার করা হয়েছে */
            />
            
            <Input
              label="পাসওয়ার্ড"
              variant="bordered"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required /* এখানে isRequired এর বদলে required ব্যবহার করা হয়েছে */
              endContent={
                <button 
                  className="focus:outline-none flex items-center h-full" 
                  type="button" 
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <Button 
              type="submit" 
              color="primary" 
              className="w-full font-semibold"
              isLoading={loading}
            >
              লগইন করুন
            </Button>
          </form>

          <div className="flex items-center my-2">
            <hr className="flex-1 border-t border-default-200" />
            <span className="px-3 text-small text-default-400">অথবা</span>
            <hr className="flex-1 border-t border-default-200" />
          </div>

          <Button
            variant="bordered"
            className="w-full font-medium"
            startContent={
              !googleLoading && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              )
            }
            onClick={handleGoogleLogin}
            isLoading={googleLoading}
          >
            Google দিয়ে সাইন-ইন করুন
          </Button>

          <p className="text-center text-small mt-2">
            নতুন ইউজার?{" "}
            <span 
              className="text-primary cursor-pointer hover:underline font-medium"
              onClick={() => router.push("/register")}
            >
              রেজিস্ট্রেশন করুন
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}