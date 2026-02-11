import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- FIXED: Components moved OUTSIDE to prevent re-rendering/focus issues ---
const InputGroup = ({ label, name, type = "text", placeholder, required = false, className = "", value, onChange }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-sm font-bold text-deep-green dark:text-off-white ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''} // Handle null/undefined
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full h-11 px-4 rounded-lg border border-deep-green/20 bg-white dark:bg-white/5 dark:border-white/10 dark:text-white focus:border-deep-green focus:ring-1 focus:ring-deep-green focus:outline-none transition-all placeholder:text-gray-400"
    />
  </div>
);

const SelectGroup = ({ label, name, options, className = "", value, onChange }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-sm font-bold text-deep-green dark:text-off-white ml-1">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value || options[0]} // Handle null/undefined
        onChange={onChange}
        className="w-full h-11 px-4 rounded-lg border border-deep-green/20 bg-white dark:bg-white/5 dark:border-white/10 dark:text-white focus:border-deep-green focus:ring-1 focus:ring-deep-green focus:outline-none transition-all appearance-none cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-deep-green/50 pointer-events-none text-[20px]">
        expand_more
      </span>
    </div>
  </div>
);
// -------------------------------------------------------------------------

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // Store auth token/user info

  // Initial State
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', dateOfBirth: '',
    firstLanguage: '', citizenship: '', passportNumber: '',
    maritalStatus: 'Single', gender: 'Male',
    address: '', city: '', state: '', country: '', zipCode: '',
    email: '', phoneNumber: '',
    countryOfInstitution: '', institutionName: '', levelOfEducation: '',
    languageOfInstruction: 'English', attendedFrom: '', attendedTo: '',
    degreeName: '', graduated: false, graduationDate: '',
    englishTest: 'None', hasGre: false, hasGmat: false, visaRefused: false,
  });

  // 1. Load User Token & Fetch Existing Data on Mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser || !storedUser.token) {
      navigate('/login');
      return;
    }

    setUserData(storedUser);

    // Fetch current profile to pre-fill the form
    const fetchProfile = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${storedUser.token}` },
        };
        const { data } = await axios.get('/api/auth/me', config);
        
        // Map backend nested object to flat form state if profile exists
        if (data.profile) {
          setFormData(prev => ({
            ...prev,
            firstName: data.profile.firstName || '',
            lastName: data.profile.lastName || '',
            // ... Add mappings for other fields if your backend returns them
            // Example:
            // address: data.profile.address?.street || '',
          }));
        }
      } catch (error) {
        console.error("Could not fetch profile data", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      // Axios call using base URL from main.jsx
      const response = await axios.put('/api/auth/profile', formData, config);

      if (response.status === 200) {
        alert("Profile updated successfully!");
        // Update local storage name if it changed
        const updatedUser = { ...userData, name: response.data.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        navigate('/'); // Redirect to dashboard/home after save
      }
    } catch (error) {
      console.error('Update Error:', error);
      const message = error.response?.data?.message || "Failed to update profile";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8 font-display">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-deep-green dark:text-primary tracking-tight mb-2">
            Update Profile
          </h1>
          <p className="text-deep-green/70 dark:text-off-white/70 max-w-2xl">
            Ensure your details match your passport exactly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-off-white/50 dark:bg-white/5 backdrop-blur-sm border border-deep-green/10 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-10">
          
          {/* Section 1: Personal Information */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-deep-green/10 dark:border-white/10 pb-2">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="text-xl font-bold text-deep-green dark:text-off-white">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <InputGroup label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
              <InputGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              
              <InputGroup label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
              <InputGroup label="First Language" name="firstLanguage" value={formData.firstLanguage} onChange={handleChange} />
              <InputGroup label="Passport Number" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />

              <SelectGroup label="Marital Status" name="maritalStatus" options={['Single', 'Married', 'Divorced', 'Widowed']} value={formData.maritalStatus} onChange={handleChange} />
              <SelectGroup label="Gender" name="gender" options={['Male', 'Female', 'Other', 'Prefer not to say']} value={formData.gender} onChange={handleChange} />
              <InputGroup label="Citizenship" name="citizenship" value={formData.citizenship} onChange={handleChange} placeholder="e.g. Indian" />
            </div>
          </section>

          {/* Section 2: Contact Information */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-deep-green/10 dark:border-white/10 pb-2">
               <span className="material-symbols-outlined text-primary">home_pin</span>
               <h3 className="text-xl font-bold text-deep-green dark:text-off-white">Contact Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Street Address" name="address" value={formData.address} onChange={handleChange} className="md:col-span-2" />
              <InputGroup label="City / Town" name="city" value={formData.city} onChange={handleChange} />
              <InputGroup label="State / Province" name="state" value={formData.state} onChange={handleChange} />
              <InputGroup label="Country" name="country" value={formData.country} onChange={handleChange} />
              <InputGroup label="Zip / Postal Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
              <InputGroup label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
              <InputGroup label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </section>

          {/* Section 3: Education */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-deep-green/10 dark:border-white/10 pb-2">
               <span className="material-symbols-outlined text-primary">school</span>
               <h3 className="text-xl font-bold text-deep-green dark:text-off-white">Education History</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Country of Institution" name="countryOfInstitution" value={formData.countryOfInstitution} onChange={handleChange} />
              <InputGroup label="Name of Institution" name="institutionName" value={formData.institutionName} onChange={handleChange} />
              <InputGroup label="Level of Education" name="levelOfEducation" value={formData.levelOfEducation} onChange={handleChange} placeholder="e.g. Bachelor's" />
              <InputGroup label="Language of Instruction" name="languageOfInstruction" value={formData.languageOfInstruction} onChange={handleChange} />
              
              <InputGroup label="Attended From" name="attendedFrom" type="date" value={formData.attendedFrom} onChange={handleChange} />
              <InputGroup label="Attended To" name="attendedTo" type="date" value={formData.attendedTo} onChange={handleChange} />
              
              <InputGroup label="Degree Name" name="degreeName" value={formData.degreeName} onChange={handleChange} className="md:col-span-2" placeholder="e.g. BSc Computer Science" />
              
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 mt-2 p-4 bg-deep-green/5 rounded-lg border border-deep-green/5">
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="graduated" 
                    checked={formData.graduated} 
                    onChange={handleChange} 
                    className="w-5 h-5 text-deep-green rounded border-gray-300 focus:ring-deep-green" 
                  />
                  <span className="ml-3 text-sm font-medium text-deep-green dark:text-off-white group-hover:text-primary transition-colors">I have graduated</span>
                </label>

                {formData.graduated && (
                  <div className="flex-1">
                    <label className="text-sm font-bold text-deep-green dark:text-off-white ml-1 block mb-1">Graduation Date</label>
                     <input
                        type="date"
                        name="graduationDate"
                        value={formData.graduationDate}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded border border-deep-green/20 bg-white focus:outline-none focus:border-deep-green"
                      />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 4: Scores & Background */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-deep-green/10 dark:border-white/10 pb-2">
               <span className="material-symbols-outlined text-primary">fact_check</span>
               <h3 className="text-xl font-bold text-deep-green dark:text-off-white">Test Scores & Background</h3>
            </div>

            <div className="space-y-6">
              <div className="w-full md:w-1/2">
                 <SelectGroup label="English Language Test" name="englishTest" options={["I don't have this", "IELTS", "TOEFL", "PTE", "Duolingo"]} value={formData.englishTest} onChange={handleChange} />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <label className="flex items-center cursor-pointer p-4 border border-deep-green/10 rounded-lg hover:bg-white transition-colors bg-white/50">
                  <input type="checkbox" name="hasGre" checked={formData.hasGre} onChange={handleChange} className="w-5 h-5 text-deep-green rounded focus:ring-deep-green" />
                  <span className="ml-3 text-sm font-bold text-deep-green">I have GRE scores</span>
                </label>
                <label className="flex items-center cursor-pointer p-4 border border-deep-green/10 rounded-lg hover:bg-white transition-colors bg-white/50">
                  <input type="checkbox" name="hasGmat" checked={formData.hasGmat} onChange={handleChange} className="w-5 h-5 text-deep-green rounded focus:ring-deep-green" />
                  <span className="ml-3 text-sm font-bold text-deep-green">I have GMAT scores</span>
                </label>
              </div>

              {/* Visa Refusal Warning Box */}
              <div className="mt-6 p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-600">warning</span>
                      <label className="text-sm font-bold text-red-700 dark:text-red-400">Have you ever been refused a visa?</label>
                   </div>
                   <div className="flex items-center gap-6">
                     <label className="inline-flex items-center cursor-pointer">
                       <input 
                        type="radio" 
                        name="visaRefused" 
                        value={true} 
                        checked={formData.visaRefused === true || formData.visaRefused === 'true'} 
                        onChange={() => setFormData(prev => ({...prev, visaRefused: true}))} 
                        className="w-5 h-5 text-red-600 focus:ring-red-500" 
                      />
                       <span className="ml-2 text-sm font-medium text-deep-green dark:text-off-white">Yes</span>
                     </label>
                     <label className="inline-flex items-center cursor-pointer">
                       <input 
                        type="radio" 
                        name="visaRefused" 
                        value={false} 
                        checked={formData.visaRefused === false || formData.visaRefused === 'false'} 
                        onChange={() => setFormData(prev => ({...prev, visaRefused: false}))} 
                        className="w-5 h-5 text-green-600 focus:ring-green-500" 
                      />
                       <span className="ml-2 text-sm font-medium text-deep-green dark:text-off-white">No</span>
                     </label>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary text-deep-green text-sm font-bold border border-deep-green shadow-[3px_3px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(52,121,40,1)] transition-all uppercase tracking-wide disabled:opacity-50"
            >
              {loading ? (
                 <span>Saving...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Save & Update Profile
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;