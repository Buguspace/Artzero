
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  productId: string | number;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ productId, initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast("评论内容不能为空", {
        description: "请输入评论内容后再提交"
      });
      return;
    }

    // In a real app, this would be an API call
    const comment: Comment = {
      id: Date.now(),
      author: "当前用户",
      authorAvatar: "/public/lovable-uploads/e513ef7e-981b-40f2-ac5a-d741573bbbd3.png",
      content: newComment,
      date: new Date().toLocaleDateString("zh-CN")
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    toast("评论成功", {
      description: "您的评论已发布"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">商品评论</h3>
        <span className="text-sm text-gray-500">
          {comments.length} 条评论
        </span>
      </div>

      {/* Comment input */}
      <div className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="分享您对这个商品的看法..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment}
            className="bg-artflow-blue hover:bg-artflow-blue/90"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            发表评论
          </Button>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无评论，来发表第一条评论吧！
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
