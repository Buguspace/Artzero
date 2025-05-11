
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CommentSection from "@/components/CommentSection";

interface CommentsCardProps {
  productId: number;
  initialComments: Array<{
    id: number;
    author: string;
    authorAvatar: string;
    content: string;
    date: string;
  }>;
}

const CommentsCard: React.FC<CommentsCardProps> = ({ productId, initialComments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left text-lg">评论区</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentSection productId={productId} initialComments={initialComments} />
      </CardContent>
    </Card>
  );
};

export default CommentsCard;
