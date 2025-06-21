import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import {
    SignOutButton
} from "@civic/auth/react";

const interestsOptions = [
  "Football", "Cricket", "Badminton", "Basketball", "Volleyball",
  "Photography", "Quiz", "Chess", "Dance", "Poetry", "Art", "Yoga"
];

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  interests: z.array(z.string()).min(1, 'Select at least one interest')
});

const UserProfileForm = () => {
  const user = useSelector(state => state.authReducer.auth);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      bio: user?.bio || '',
      interests: user?.interests || []
    }
  });

  const bioLength = watch('bio')?.length || 0;

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    toast.success('Profile updated successfully!', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
        padding: '10px 20px',
        borderRadius: '8px'
      }
    });
  };

//   const handleLogout = () => {

//   }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-white mb-6">Update Your Profile</h1>
            
            {/* Main Flex Container */}
            <div className="flex flex-col md:flex-row">
              {/* Fixed Profile Picture - Left Side (Desktop) */}
              <div className="hidden md:block md:w-1/4 md:pr-8 md:fixed md:h-[calc(100vh-200px)]">
                <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg">
                  <img
                    className="w-40 h-40 rounded-full mb-4 object-cover border-4 border-indigo-500"
                    src={user?.avatar || "https://res.cloudinary.com/du4bs9xd2/image/upload/v1750344689/profile_image_srdpjg.png"}
                    alt="User Avatar"
                  />
                  
                </div>
              </div>

              {/* Scrollable Form Content - Right Side */}
              <div className="md:ml-[25%] md:w-3/4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Mobile Profile Picture */}
                  <div className="md:hidden flex flex-col items-center">
                    <img
                      className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-indigo-500"
                      src={user?.avatar || "https://res.cloudinary.com/du4bs9xd2/image/upload/v1750344689/profile_image_srdpjg.png"}
                      alt="User Avatar"
                    />
                    <button
                      type="button"
                      className="text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      Change Photo
                    </button>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      {...register('fullName')}
                      className={`w-full px-4 py-2 bg-gray-100 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="bio"
                      {...register('bio')}
                      rows={4}
                      className={`w-full px-4 py-2 bg-gray-100 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.bio ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Tell us about yourself (at least 20 characters)"
                    />
                    <div className="flex justify-between mt-1">
                      {errors.bio ? (
                        <p className="text-sm text-red-400">{errors.bio.message}</p>
                      ) : (
                        <p className="text-sm text-gray-400">Minimum 20 characters</p>
                      )}
                      <p className={`text-xs ${
                        bioLength < 20 ? 'text-gray-400' : 'text-green-400'
                      }`}>
                        {bioLength}/20
                      </p>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Select Your Interests <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="interests"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {interestsOptions.map((interest) => (
                            <div key={interest} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`interest-${interest}`}
                                checked={field.value.includes(interest)}
                                onChange={(e) => {
                                  const newInterests = e.target.checked
                                    ? [...field.value, interest]
                                    : field.value.filter(item => item !== interest);
                                  field.onChange(newInterests);
                                }}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded"
                              />
                              <label
                                htmlFor={`interest-${interest}`}
                                className="ml-2 text-sm text-gray-300"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {/* {errors.interests && (
                      <p className="mt-1 text-sm text-red-400">{errors.interests.message}</p>
                    )} */}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between pt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-500 hover:bg-indigo-900 hover:cursor-pointer text-white font-medium rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 shadow-md"
                    >
                      Update Profile
                    </button>

                    <SignOutButton
                    className="px-6 py-2 bg-red-500 hover:bg-red-900 hover:cursor-pointer text-white font-medium rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offsered-800 transition-colors duration-200 shadow-md"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileForm;





