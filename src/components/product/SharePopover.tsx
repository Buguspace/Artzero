
import React from "react";
import { Button } from "@/components/ui/button";
import { Share, Facebook, Twitter, MessageCircle, Send } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/sonner";

interface SharePopoverProps {
  product: {
    id: number;
    title: string;
  };
}

const SharePopover: React.FC<SharePopoverProps> = ({ product }) => {
  // Share product function
  const shareProduct = (platform: string) => {
    const productUrl = window.location.href;
    const productTitle = product.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(productTitle)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`;
        break;
      case 'wechat':
        // WeChat sharing typically requires QR code generation
        // For simplicity, we'll copy the link to clipboard
        navigator.clipboard.writeText(productUrl);
        toast.success("链接已复制，可在微信中粘贴分享");
        return;
      case 'weibo':
        shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(productTitle)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(productTitle + " " + productUrl)}`;
        break;
      default:
        // Copy link to clipboard as fallback
        navigator.clipboard.writeText(productUrl);
        toast.success("链接已复制到剪贴板");
        return;
    }
    
    // Open sharing URL in a new window
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Share size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="grid gap-1">
          <p className="text-sm font-medium px-2 py-1.5">分享至</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => shareProduct('wechat')}
          >
            <MessageCircle className="mr-2" size={16} />
            微信
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => shareProduct('weibo')}
          >
            <Send className="mr-2" size={16} />
            微博
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => shareProduct('whatsapp')}
          >
            <Send className="mr-2" size={16} />
            WhatsApp
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => shareProduct('facebook')}
          >
            <Facebook className="mr-2" size={16} />
            Facebook
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => shareProduct('twitter')}
          >
            <Twitter className="mr-2" size={16} />
            Twitter
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("链接已复制到剪贴板");
            }}
          >
            <Share className="mr-2" size={16} />
            复制链接
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SharePopover;
