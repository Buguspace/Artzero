import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  X, User, Heart, Image, Book, Music, 
  Video, Home, LogIn, LogOut, Settings 
} from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const handleClose = useCallback(() => {
    try {
      onClose();
    } catch (error) {
      console.error('Error closing side menu:', error);
    }
  }, [onClose]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    try {
      handleClose();
    } catch (error) {
      console.error('Error handling click:', error);
    }
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transform transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClick}
    >
      <div 
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg">菜单</span>
            <button onClick={handleClose} className="p-1">
              <X size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <div className="py-2">
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                主页面
              </h3>
              <Link to="/" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Home size={18} className="mr-3 text-artflow-blue" />
                <span>主页</span>
              </Link>
              <Link to="/settings" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Settings size={18} className="mr-3 text-artflow-blue" />
                <span>设置</span>
              </Link>
              <Link to="/profile" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <User size={18} className="mr-3 text-artflow-blue" />
                <span>个人中心</span>
              </Link>
            </div>

            <div className="py-2 border-t border-gray-200">
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                生活
              </h3>
              <Link to="/categories/life/books" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Book size={18} className="mr-3 text-artflow-pink" />
                <span>书籍</span>
              </Link>
              <Link to="/categories/life/art" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Image size={18} className="mr-3 text-artflow-pink" />
                <span>艺术</span>
              </Link>
              <Link to="/categories/life/housing" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Home size={18} className="mr-3 text-artflow-pink" />
                <span>租房</span>
              </Link>
            </div>

            <div className="py-2 border-t border-gray-200">
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                娱乐
              </h3>
              <Link to="/categories/entertainment/music" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Music size={18} className="mr-3 text-artflow-yellow" />
                <span>音乐</span>
              </Link>
              <Link to="/categories/entertainment/video" className="flex items-center px-4 py-3 hover:bg-gray-100" onClick={handleClose}>
                <Video size={18} className="mr-3 text-artflow-yellow" />
                <span>视频</span>
              </Link>
            </div>
          </nav>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <Link to="/login" className="flex-1 py-2 px-3 bg-white border border-gray-300 rounded text-center text-sm font-medium" onClick={handleClose}>
                <span className="flex items-center justify-center">
                  <LogIn size={16} className="mr-2" />
                  登录
                </span>
              </Link>
              <Link to="/register" className="flex-1 py-2 px-3 bg-artflow-blue text-white rounded text-center text-sm font-medium" onClick={handleClose}>
                注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
