import React, { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { useProfileQuery, useProfileUpdateMutation } from "../../redux/features/auth/authApi";

const Profile: React.FC = () => {
  const { data: profileData, isLoading } = useProfileQuery("");
  const [updateProfile] = useProfileUpdateMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
    password: "",
  });

  // Load API data into form once available
  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
        picture: profileData.data.picture,
        password: "",
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, picture: reader.result as string }));
    };
    reader.readAsDataURL(file);

    console.log("Selected file for upload:", file);
  };

  const handleRemovePicture = () => {
    setFormData((prev) => ({ ...prev, picture: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password optional
    const { password, ...rest } = formData;
    const updateData: any = { ...rest };
    if (password && password.trim().length > 0) {
      updateData.password = password;
    }

    console.log("Form data to submit:", updateData);

    try {
      const res = await updateProfile(updateData).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading)
    return <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto mt-20" />;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                formData.picture ||
                "https://res.cloudinary.com/deicntkum/image/upload/v1755900488/man-user-circle-icon_wrrmd6.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-2 border-blue-500 mb-2 object-cover"
            />
            {formData.picture && (
              <button
                type="button"
                onClick={handleRemovePicture}
                className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                title="Remove Picture"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700">
            <Upload size={18} /> Upload New Picture
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Optional Password */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password if you want"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
