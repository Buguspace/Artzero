import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("重置密码邮件已发送，请查收邮箱");
        navigate("/login");
      }
    } catch (error) {
      toast.error("发送失败，请稍后再试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="bg-gradient-to-r from-artflow-blue to-artflow-pink py-4">
            <h2 className="text-2xl font-bold text-white text-center">找回密码</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">注册邮箱</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-artflow-blue hover:bg-artflow-blue/90" disabled={isLoading}>
                {isLoading ? "发送中..." : "发送重置邮件"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword; 