import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useProfileQuery } from "../../redux/features/auth/authApi";

const Profile: React.FC = () => {
    const { data: profileData, isLoading } = useProfileQuery("");
    //   const [updateProfile] = useUpdateProfileMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        isBlocked: false,
        picture: "",
    });

    // Load API data into form once available
    React.useEffect(() => {
        if (profileData?.data) {
            setFormData(profileData.data);
        }
    }, [profileData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //   const res = await updateProfile(formData).unwrap();
            //   toast.success(res.message || "Profile updated successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Update failed");
        }
    };

    if (isLoading) return <Loader2 className="animate-spin w-10 h-10 text-blue-600 mx-auto mt-20" />;

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Picture */}
                    <div className="flex flex-col items-center">
                        <img
                            src={formData.picture || "https://res.cloudinary.com/deicntkum/image/upload/v1755900488/man-user-circle-icon_wrrmd6.png"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-2 border-blue-500 mb-2"
                        />
                        <input
                            type="text"
                            name="picture"
                            value={formData.picture}
                            onChange={handleChange}
                            placeholder="Profile Picture URL"
                            className="w-full border rounded-lg p-2 text-sm"
                        />
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

                    {/* Role */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            disabled
                            className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-gray-700"
                        />
                    </div>

                    {/* isBlocked */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isBlocked"
                            checked={formData.isBlocked}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <label className="text-gray-700 dark:text-gray-300">Blocked</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Profile;
