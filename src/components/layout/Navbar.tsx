import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, className, children }) => {
  return (
    <Link to={href}>
      <span className={cn(
        "transition-colors duration-200",
        className
      )}>
        {children}
      </span>
    </Link>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink href="/" className="text-xl font-bold hover:text-primary transition-colors">
            艺术交易平台
          </NavLink>

          {/* 导航链接 - 桌面端 */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/artworks" className="text-gray-600 hover:text-gray-900">
              作品
            </NavLink>
            <NavLink href="/artists" className="text-gray-600 hover:text-gray-900">
              艺术家
            </NavLink>
            <NavLink href="/categories" className="text-gray-600 hover:text-gray-900">
              分类
            </NavLink>
          </div>

          {/* 右侧按钮 */}
          <div className="flex items-center space-x-4">
            <NavLink href="/artwork/upload">
              <Button className="hidden md:flex items-center gap-2 hover:scale-105 transition-transform">
                <Plus className="h-4 w-4" />
                发布作品
              </Button>
            </NavLink>
            <NavLink href="/login">
              <Button variant="outline" className="hover:bg-gray-100 transition-colors">
                登录
              </Button>
            </NavLink>
          </div>

          {/* 移动端菜单按钮 */}
          <Button 
            variant="ghost" 
            className="md:hidden hover:bg-gray-100 transition-colors" 
            onClick={toggleMenu}
            aria-label="切换菜单"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* 移动端菜单 */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-4">
              <NavLink href="/artworks" className="text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                作品
              </NavLink>
              <NavLink href="/artists" className="text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                艺术家
              </NavLink>
              <NavLink href="/categories" className="text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                分类
              </NavLink>
              <NavLink href="/artwork/upload" className="px-4">
                <Button className="w-full items-center gap-2 hover:scale-105 transition-transform">
                  <Plus className="h-4 w-4" />
                  发布作品
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 