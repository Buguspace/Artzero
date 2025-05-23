import { useState } from "react";
import { Edit } from "lucide-react";
import AvatarUpload from "../../components/AvatarUpload";
import ProfileEditForm from "./ProfileEditForm";

interface ProfileHeaderProps {
  user: {
    username: string;
    bio: string;
    email: string;
    coffeeBean: number;
    joinDate: string;
    gender?: string;
    birthday?: Date;
    school?: string;
  };
  onUpdateUser: (updatedUser: {
    username: string;
    bio: string;
    gender?: string;
    birthday?: Date;
    school?: string;
    email?: string;
  }) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onUpdateUser }) => {
  const [editMode, setEditMode] = useState(false);

  const handleSave = (data: {
    username: string;
    bio: string;
    gender?: string;
    birthday?: Date;
    school?: string;
    email?: string;
  }) => {
    onUpdateUser(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="h-32 bg-gradient-to-r from-artflow-blue to-artflow-pink"></div>

      <div className="relative px-6 pb-6">
        <div className="-mt-16 mb-6">
          <AvatarUpload />
        </div>

        {editMode ? (
          <ProfileEditForm 
            initialData={user}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-600 mt-1">{user.bio}</p>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="p-2 text-artflow-blue hover:bg-gray-100 rounded-full"
              >
                <Edit size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-500">电子邮箱</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500">咖啡豆</p>
                <p className="font-medium">{user.coffeeBean}</p>
              </div>
              <div>
                <p className="text-gray-500">加入日期</p>
                <p className="font-medium">{user.joinDate}</p>
              </div>
              {user.school && (
                <div>
                  <p className="text-gray-500">学校</p>
                  <p className="font-medium">{user.school}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
