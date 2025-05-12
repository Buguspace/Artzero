import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CtaSection: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-artflow-blue to-artflow-pink text-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">加入我们的低碳艺术社区</h2>
        <p className="text-lg mb-8 opacity-90">
          成为LowCarbon Art的一员，展示您的作品，结识志同道合的伙伴，探索无限可能。
        </p>
        <Link to={user ? "/categories" : "/register"} className="btn-accent inline-flex items-center">
          <span>{user ? "开始探索" : "立即注册"}</span>
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
