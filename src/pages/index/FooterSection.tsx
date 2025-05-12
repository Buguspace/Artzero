import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const FooterSection: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <div className="absolute top-0 left-0 w-8 h-8 bg-artflow-pink rounded-full opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-artflow-blue rounded-full"></div>
              </div>
              <span className="logo-text">ArtFlow</span>
            </div>
            <p className="mt-2 text-gray-400">艺术创作与交流平台</p>
          </div>
          
          <div className="flex space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="hover:text-artflow-pink transition-colors">
                  登录
                </Link>
                <Link to="/register" className="hover:text-artflow-pink transition-colors">
                  注册
                </Link>
                <Link to="/categories" className="hover:text-artflow-pink transition-colors">
                  探索
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="hover:text-artflow-pink transition-colors">
                登出/切换账号
              </button>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ArtFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
