import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

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

    // Here you would typically send the data to your backend API
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 sm:p-8 shadow-xl">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-bold text-white mb-6">Create Your Profile</h1>
            <img
              className="w-9 h-9 rounded-full mb-4"
              src={user?.avatar || 'https://via.placeholder.com/64'}
              alt="User Avatar"
            />
        </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                {...register('fullName')}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white ${
                  errors.fullName ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                {...register('bio')}
                rows={4}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white ${
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

            {/* Interests Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Your Interests <span className="text-red-500">*</span>
              </label>
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
              {errors.interests && (
                <p className="mt-1 text-sm text-red-400">{errors.interests.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-900 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 shadow-md"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
