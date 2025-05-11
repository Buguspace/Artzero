import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CommentPermissionManagerProps {
  permission: 'everyone' | 'friends' | 'none';
  onChange: (permission: 'everyone' | 'friends' | 'none') => void;
}

const CommentPermissionManager: React.FC<CommentPermissionManagerProps> = ({
  permission,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>评论权限设置</Label>
      <Select value={permission} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择评论权限" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="everyone">所有人可评论</SelectItem>
          <SelectItem value="friends">仅好友可评论</SelectItem>
          <SelectItem value="none">禁止评论</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500">
        {permission === 'everyone' && '所有人都可以评论您的内容'}
        {permission === 'friends' && '只有您的好友可以评论您的内容'}
        {permission === 'none' && '禁止所有人评论您的内容'}
      </p>
    </div>
  );
};

export default CommentPermissionManager; 
 