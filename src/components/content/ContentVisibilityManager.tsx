import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ContentVisibilityManagerProps {
  visibility: 'public' | 'friends' | 'private';
  onChange: (visibility: 'public' | 'friends' | 'private') => void;
}

const ContentVisibilityManager: React.FC<ContentVisibilityManagerProps> = ({
  visibility,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label>内容可见范围</Label>
      <Select value={visibility} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择可见范围" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">所有人可见</SelectItem>
          <SelectItem value="friends">仅好友可见</SelectItem>
          <SelectItem value="private">仅自己可见</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500">
        {visibility === 'public' && '所有人都可以看到您的内容'}
        {visibility === 'friends' && '只有您的好友可以看到您的内容'}
        {visibility === 'private' && '只有您自己可以看到您的内容'}
      </p>
    </div>
  );
};

export default ContentVisibilityManager; 
 