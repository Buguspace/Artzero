import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, ChevronDown, Settings, User, Heart, Image, Book, Music, Video } from "lucide-react";
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";
import { useIsMobile } from "../hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navbar: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex w-full justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <div className="absolute top-0 left-0 w-8 h-8 bg-artflow-pink rounded-full opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-artflow-blue rounded-full"></div>
              </div>
              <span className="logo-text text-black">LowCarbon Art</span>
            </Link>
            
            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-grow max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {!user ? (
                <>
                  <Link to="/login" className="flex items-center space-x-1 font-medium hover:text-artflow-blue transition-colors">
                    <LogIn size={18} />
                    <span>登录</span>
                  </Link>
                  <Link to="/register" className="btn-primary">
                    注册
                  </Link>
                </>
              ) : (
                <>
                  {/* 发现 Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium hover:text-artflow-blue transition-colors focus:outline-none">
                      <span>发现</span>
                      <ChevronDown className="ml-1" size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      <DropdownMenuItem asChild>
                        <Link to="/categories/life/books" className="flex items-center">
                          <Book size={16} className="mr-2 text-artflow-pink" />
                          <span>书籍</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/categories/life/art" className="flex items-center">
                          <Image size={16} className="mr-2 text-artflow-pink" />
                          <span>艺术</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/categories/entertainment/music" className="flex items-center">
                          <Music size={16} className="mr-2 text-artflow-yellow" />
                          <span>音乐</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/categories/entertainment/video" className="flex items-center">
                          <Video size={16} className="mr-2 text-artflow-yellow" />
                          <span>视频</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* 我的空间 Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center font-medium hover:text-artflow-blue transition-colors focus:outline-none">
                      <span>我的空间</span>
                      <ChevronDown className="ml-1" size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center">
                          <User size={16} className="mr-2" />
                          <span>个人中心</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile#favorites" className="flex items-center">
                          <Heart size={16} className="mr-2" />
                          <span>我的收藏</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center">
                          <Settings size={16} className="mr-2" />
                          <span>设置</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" onClick={handleLogout} className="ml-2">登出</Button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            {!user ? null : (
              <button onClick={toggleSideMenu} className="md:hidden p-2">
                {isSideMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
          
          {/* Mobile Search Bar */}
          <div className="md:hidden w-full pb-3 px-2">
            <SearchBar />
          </div>

          {/* Mobile Right Side: 登录/注册 or 菜单 */}
          <div className="md:hidden flex items-center space-x-2 absolute right-4 top-4">
            {!user ? (
              <>
                <Link to="/login" className="btn-primary px-3 py-1 text-sm">登录</Link>
                <Link to="/register" className="btn-secondary px-3 py-1 text-sm">注册</Link>
              </>
            ) : (
              <button onClick={toggleSideMenu} className="p-2">
                {isSideMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Side Menu (Mobile) */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
