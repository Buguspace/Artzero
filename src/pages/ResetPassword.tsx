import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const accessToken = query.get("access_token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("密码长度至少为6位");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }
    setIsLoading(true);
    try {
      if (!accessToken) {
        toast.error("链接无效或已过期");
        return;
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("密码重置成功，请重新登录");
        navigate("/login");
      }
    } catch (error) {
      toast.error("重置失败，请稍后再试");
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
            <h2 className="text-2xl font-bold text-white text-center">重置密码</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">新密码</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="请输入新密码"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">确认新密码</label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-artflow-blue hover:bg-artflow-blue/90" disabled={isLoading}>
                {isLoading ? "重置中..." : "重置密码"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword; 