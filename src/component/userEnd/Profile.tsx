import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGetUserDetails from "./userHTTTP/useGetUserDetails";
import usePostUpdateMutation from "./userHTTTP/usePostUpdateMutation";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  joined: string;
  avatar: string;
  bio?: string;
  location?: string;
  skills?: string[];
  hourlyRate?: number;
}

interface FormData {
  name: string;
  email: string;
  bio: string;
  location: string;
  skills: string[];
  hourlyRate: number;
}

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "provider",
    joined: "January 15, 2024",
    avatar: "https://i.pravatar.cc/150?img=3",
  });

  const { data, isLoading } = useGetUserDetails();
  const { mutate, isPending } = usePostUpdateMutation();

  React.useEffect(() => {
    if (data && data.user) {
      setUser({
        name: data.user.name || "John Doe",
        email: data.user.email || "john.doe@example.com",
        role: data.user.role || "provider",
        joined: new Date(data.user.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        avatar: "https://i.pravatar.cc/150?img=3", 
        bio: data.user.bio || "",
        location: data.user.location || "",
        skills: data.user.skills || [],
        hourlyRate: data.user.hourlyRate || 0
      });
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      location: user.location || "",
      skills: user.skills || [],
      hourlyRate: user.hourlyRate || 0
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log("Form data:", formData);
    
    // Call the mutation function to update the user profile
    mutate({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      skills: formData.skills,
      hourlyRate: formData.hourlyRate
    });
    
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    reset({
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      location: user.location || "",
      skills: user.skills || [],
      hourlyRate: user.hourlyRate || 0
    });
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm mt-1 text-gray-500 capitalize">
            Role: {user.role}
          </p>
          <p className="text-sm text-gray-500">Joined: {user.joined}</p>
          {user.bio && <p className="text-sm text-gray-700 mt-2">{user.bio}</p>}
          {user.location && <p className="text-sm text-gray-600">Location: {user.location}</p>}
          {user.hourlyRate > 0 && <p className="text-sm text-gray-600">Hourly Rate: ${user.hourlyRate}</p>}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Skills:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.skills.map((skill, index) => (
                  <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={openEditModal}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    {...register("bio")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...register("location")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="hourlyRate">
                    Hourly Rate ($)
                  </label>
                  <input
                    id="hourlyRate"
                    type="number"
                    {...register("hourlyRate", { valueAsNumber: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="skills">
                    Skills (comma separated)
                  </label>
                  <input
                    id="skills"
                    type="text"
                    {...register("skills")}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400">
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
