import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProfileEditFormProps {
  initialData: {
    username: string;
    bio: string;
    school?: string;
    email?: string;
  };
  onSave: (data: {
    username: string;
    bio: string;
    school?: string;
    email?: string;
  }) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState({
    username: initialData.username,
    bio: initialData.bio,
    school: initialData.school || "",
    email: initialData.email || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="请输入用户名"
          />
        </div>

        <div>
          <Label htmlFor="bio">个人简介</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="介绍一下自己吧"
            className="h-24"
          />
        </div>

        <div>
          <Label htmlFor="school">学校</Label>
          <Input
            id="school"
            value={formData.school}
            onChange={(e) =>
              setFormData({ ...formData, school: e.target.value })
            }
            placeholder="请输入您的学校"
          />
        </div>

        <div>
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="请输入您的邮箱"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
