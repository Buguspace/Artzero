
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("两次输入的密码不一致");
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error("密码长度至少为6位");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success("注册成功！请查收验证邮件");
        navigate("/login");
      }
    } catch (error) {
      toast.error("注册时发生错误，请稍后再试");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
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
            <h2 className="text-2xl font-bold text-white text-center">创建账户</h2>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  用户名
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="用户名"
                  required
                />
              </div>

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
              </div>

              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  确认密码
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-artflow-blue hover:bg-artflow-blue/90"
                disabled={isLoading}
              >
                <span>{isLoading ? "注册中..." : "注册"}</span>
                {!isLoading && <ArrowRight size={18} className="ml-2" />}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或者使用</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center bg-white"
                  onClick={() => handleSocialLogin('google')}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center bg-white"
                  disabled
                  title="微信登录功能即将上线"
                >
                  <svg className="w-5 h-5 mr-2 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2C5.159 2 2 4.724 2 8.067c0 2.785 2.367 5.123 4.82 5.577l-1.206 2.034 2.656-1.46c.382.084.784.123 1.193.123 3.533 0 6.691-2.723 6.691-6.066C16.158 4.723 12.999 2 9.467 2h-.776zm7.131 12.98c-.382 0-.784-.04-1.177-.123l-2.655 1.46 1.206-2.034c-2.435-.454-4.82-2.792-4.82-5.577 0-3.069 2.924-5.577 6.446-5.577 3.533 0 6.691 2.508 6.691 5.577 0 3.343-3.158 6.066-6.691 6.066v.208z" />
                  </svg>
                  微信
                </Button>
              </div>

              <div className="text-center">
                <span className="text-gray-600">已有账号? </span>
                <Link to="/login" className="text-artflow-blue font-medium hover:underline">
                  立即登录
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
