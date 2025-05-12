import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    verificationCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendCode = async () => {
    if (loginType === "phone" && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast.error("请输入正确的手机号");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formData.phone,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("验证码已发送");
      }
    } catch (error) {
      toast.error("发送验证码失败，请稍后重试");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginType === "email") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast.error(error.message);
        } else if (data.user) {
          toast.success("登录成功！");
          window.location.href = "/";
        }
      } else {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: formData.phone,
          token: formData.verificationCode,
          type: "sms",
        });

        if (error) {
          toast.error(error.message);
        } else if (data.user) {
          toast.success("登录成功！");
          window.location.href = "/";
        }
      }
    } catch (error) {
      toast.error("登录时发生错误，请稍后再试");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        toast.error(`${provider} 登录失败: ${error.message}`);
      }
    } catch (error) {
      toast.error(`${provider} 登录时发生错误`);
      console.error("Social login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto pt-24 pb-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="bg-gradient-to-r from-artflow-blue to-artflow-pink py-4">
            <h2 className="text-2xl font-bold text-white text-center">欢迎回来</h2>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setLoginType(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">邮箱登录</TabsTrigger>
                <TabsTrigger value="phone">手机登录</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      电子邮箱
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      密码
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="mt-1 text-right">
                      <Link to="/forgot-password" className="text-sm text-artflow-blue hover:underline">
                        忘记密码?
                      </Link>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-artflow-blue hover:bg-artflow-blue/90"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? "登录中..." : "登录"}</span>
                    {!isLoading && <ArrowRight size={18} className="ml-2" />}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      手机号码
                    </label>
                    <div className="flex space-x-4">
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="请输入手机号"
                        className="flex-1"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendCode}
                        disabled={isLoading}
                      >
                        发送验证码
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                      验证码
                    </label>
                    <Input
                      type="text"
                      id="verificationCode"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      placeholder="请输入验证码"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-artflow-blue hover:bg-artflow-blue/90"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? "登录中..." : "登录"}</span>
                    {!isLoading && <ArrowRight size={18} className="ml-2" />}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或者使用</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-white"
                onClick={() => handleSocialLogin('google')}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-white"
                onClick={() => handleSocialLogin('github')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center bg-white"
                onClick={() => handleSocialLogin('facebook')}
              >
                <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
            </div>

            <div className="text-center mt-6">
              <span className="text-gray-600">还没有账号? </span>
              <Link to="/register" className="text-artflow-blue font-medium hover:underline">
                立即注册
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
