import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface SellerInfoCardProps {
  author: string;
  authorAvatar: string;
}

const SellerInfoCard: React.FC<SellerInfoCardProps> = ({ author, authorAvatar }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/profile?author=${author}`);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left text-lg">卖家信息</CardTitle>
      </CardHeader>
      <CardContent>
        <a 
          href="#"
          onClick={handleClick}
          className="flex items-center space-x-2 hover:text-artflow-blue transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={authorAvatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-gray-500">已认证卖家</p>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};

export default SellerInfoCard;
