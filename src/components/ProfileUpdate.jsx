import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SectionHeader = ({ title, icon }) => (
  <div className="px-8 py-6 border-b border-[#347928]/10 bg-[#C0EBA6]/20 flex items-center gap-2">
    <span className="material-symbols-outlined text-[#347928]">{icon}</span>
    <h3 className="text-xl font-bold text-[#347928] font-display uppercase tracking-wider">{title}</h3>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text", placeholder, width = "full" }) => (
  <div className={`space-y-2 ${width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
    <label className="text-sm font-semibold text-[#347928]/80">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border-[#347928]/20 bg-white px-4 py-2.5 text-[#347928] placeholder:text-[#347928]/40 focus:border-[#347928] focus:ring-[#347928]"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, width = "full" }) => (
  <div className={`space-y-2 ${width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
    <label className="text-sm font-semibold text-[#347928]/80">{label}</label>
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-full rounded-lg border-[#347928]/20 bg-white px-4 py-2.5 text-[#347928] focus:border-[#347928] focus:ring-[#347928]"
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const ProfileUpdate = () => {
  const [loading, setLoading] = useState(true);
  
  // Initial State matching DB Schema
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '', middleName: '', lastName: '', dateOfBirth: '', firstLanguage: '',
      countryOfCitizenship: '', passportNumber: '', passportExpiryDate: '',
      passportPlaceOfBirth: '', gender: '', maritalStatus: '', phoneNumber: '', studentEmail: ''
    },
    addressDetails: {
      street: '', city: '', country: '', province: '', postalCode: ''
    },
    backgroundInfo: {
      refusedVisa: '', validStudyPermit: '', details: ''
    },
    educationDetails: {
      countryOfEducation: '', highestLevel: '', gradingScheme: '', gradeAverage: '', graduatedMostRecent: ''
    },
    schoolHistory: [], // Array of objects
    testScores: {
      proofOfLanguageProficiency: '', applyConditionalAdmission: false, languageTestStatus: '',
      greScores: '', gmatScores: '', openToProficiencyCourse: ''
    },
    additionalDetails: {
      emergencyContact: '', additionalNotes: ''
    }
  });

  // Fetch Data on Load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/users/me', config);

        if (data) {
          // Merge received data with initial state to ensure structure exists
          setFormData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...data.personalInfo },
            addressDetails: { ...prev.addressDetails, ...data.addressDetails },
            backgroundInfo: { ...prev.backgroundInfo, ...data.backgroundInfo },
            educationDetails: { ...prev.educationDetails, ...data.educationDetails },
            schoolHistory: data.schoolHistory || [],
            testScores: { ...prev.testScores, ...data.testScores },
            additionalDetails: { ...prev.additionalDetails, ...data.additionalDetails },
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Generic Handler for nested objects
  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: val
      }
    }));
  };

  // Specific Handler for School History Array
  const handleSchoolChange = (index, e, subObject = null) => {
    const { name, value } = e.target;
    const newHistory = [...formData.schoolHistory];
    
    if (subObject) {
       // Handle nested school address
       newHistory[index][subObject] = {
         ...newHistory[index][subObject],
         [name]: value
       };
    } else {
       newHistory[index][name] = value;
    }
    
    setFormData(prev => ({ ...prev, schoolHistory: newHistory }));
  };

  const addSchool = () => {
    setFormData(prev => ({
      ...prev,
      schoolHistory: [...prev.schoolHistory, {
        countryOfInstitution: '', schoolName: '', educationLevel: '', gradingScheme: '',
        primaryLanguage: '', attendedFrom: '', attendedTo: '', degreeName: '',
        graduated: '', graduationDate: '', physicalCertificateAvailable: '',
        schoolAddress: { street: '', city: '', province: '', postalCode: '' }
      }]
    }));
  };

  const removeSchool = (index) => {
    const newHistory = [...formData.schoolHistory];
    newHistory.splice(index, 1);
    setFormData(prev => ({ ...prev, schoolHistory: newHistory }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put('http://localhost:5000/api/users/profile', formData, config);
      alert('Profile Updated Successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  if (loading) return <div className="text-center py-20">Loading Profile...</div>;

  return (
    <div className="bg-[#FFFBE6] min-h-screen font-body text-[#347928] py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold font-display mb-2 text-[#347928]">Student Update Profile</h1>
        <p className="mb-10 text-[#347928]/70">Please ensure all details are accurate for your application.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* === PERSONAL INFORMATION === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <SectionHeader title="Personal Information" icon="person" />
            <div className="p-8 grid md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" value={formData.personalInfo.firstName} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Middle Name" name="middleName" value={formData.personalInfo.middleName} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Last Name" name="lastName" value={formData.personalInfo.lastName} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.personalInfo.dateOfBirth ? formData.personalInfo.dateOfBirth.split('T')[0] : ''} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="First Language" name="firstLanguage" value={formData.personalInfo.firstLanguage} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Country of Citizenship" name="countryOfCitizenship" value={formData.personalInfo.countryOfCitizenship} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Passport Number" name="passportNumber" value={formData.personalInfo.passportNumber} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Passport Expiry Date" name="passportExpiryDate" type="date" value={formData.personalInfo.passportExpiryDate ? formData.personalInfo.passportExpiryDate.split('T')[0] : ''} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Passport Place of Birth" name="passportPlaceOfBirth" value={formData.personalInfo.passportPlaceOfBirth} onChange={(e) => handleChange(e, 'personalInfo')} />
              <SelectField label="Gender" name="gender" value={formData.personalInfo.gender} onChange={(e) => handleChange(e, 'personalInfo')} options={['Male', 'Female', 'Other']} width="half" />
              <SelectField label="Marital Status" name="maritalStatus" value={formData.personalInfo.maritalStatus} onChange={(e) => handleChange(e, 'personalInfo')} options={['Single', 'Married', 'Divorced']} width="half" />
              <InputField label="Phone Number" name="phoneNumber" value={formData.personalInfo.phoneNumber} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
              <InputField label="Student Email" name="studentEmail" type="email" value={formData.personalInfo.studentEmail} onChange={(e) => handleChange(e, 'personalInfo')} width="half" />
            </div>
          </div>

          {/* === ADDRESS DETAILS === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <SectionHeader title="Address Details" icon="home" />
            <div className="p-8 grid md:grid-cols-2 gap-6">
              <InputField label="Street Address" name="street" value={formData.addressDetails.street} onChange={(e) => handleChange(e, 'addressDetails')} />
              <InputField label="City" name="city" value={formData.addressDetails.city} onChange={(e) => handleChange(e, 'addressDetails')} width="half" />
              <InputField label="Country" name="country" value={formData.addressDetails.country} onChange={(e) => handleChange(e, 'addressDetails')} width="half" />
              <InputField label="Province/State" name="province" value={formData.addressDetails.province} onChange={(e) => handleChange(e, 'addressDetails')} width="half" />
              <InputField label="Postal/Zip Code" name="postalCode" value={formData.addressDetails.postalCode} onChange={(e) => handleChange(e, 'addressDetails')} width="half" />
            </div>
          </div>

          {/* === BACKGROUND INFORMATION === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <SectionHeader title="Background Information" icon="history" />
            <div className="p-8 grid md:grid-cols-2 gap-6">
              <SelectField label="Refused a Visa? (US, UK, Canada, etc)" name="refusedVisa" value={formData.backgroundInfo.refusedVisa || ''} onChange={(e) => handleChange(e, 'backgroundInfo')} options={['Yes', 'No']} />
              <SelectField label="Valid Study Permit/Visa?" name="validStudyPermit" value={formData.backgroundInfo.validStudyPermit || ''} onChange={(e) => handleChange(e, 'backgroundInfo')} options={['Yes', 'No']} />
              {(formData.backgroundInfo.refusedVisa === 'Yes' || formData.backgroundInfo.validStudyPermit === 'Yes') && (
                 <InputField label="Provide Additional Details" name="details" value={formData.backgroundInfo.details} onChange={(e) => handleChange(e, 'backgroundInfo')} />
              )}
            </div>
          </div>

          {/* === EDUCATION DETAILS === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <SectionHeader title="Education Details (Highest)" icon="school" />
            <div className="p-8 grid md:grid-cols-2 gap-6">
              <InputField label="Country of Education" name="countryOfEducation" value={formData.educationDetails.countryOfEducation} onChange={(e) => handleChange(e, 'educationDetails')} width="half" />
              <InputField label="Highest Level of Education" name="highestLevel" value={formData.educationDetails.highestLevel} onChange={(e) => handleChange(e, 'educationDetails')} width="half" />
              <InputField label="Grading Scheme" name="gradingScheme" value={formData.educationDetails.gradingScheme} onChange={(e) => handleChange(e, 'educationDetails')} width="half" />
              <InputField label="Grade Average" name="gradeAverage" value={formData.educationDetails.gradeAverage} onChange={(e) => handleChange(e, 'educationDetails')} width="half" />
              <SelectField label="Graduated from Most Recent School?" name="graduatedMostRecent" value={formData.educationDetails.graduatedMostRecent || ''} onChange={(e) => handleChange(e, 'educationDetails')} options={['Yes', 'No']} />
            </div>
          </div>

          {/* === SCHOOL HISTORY (Dynamic) === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-[#347928]/10 bg-[#C0EBA6]/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#347928]">history_edu</span>
                    <h3 className="text-xl font-bold text-[#347928] font-display uppercase tracking-wider">School History</h3>
                </div>
                <button type="button" onClick={addSchool} className="bg-[#FCCD2A] hover:bg-yellow-400 text-[#347928] font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">add_circle</span> Add School
                </button>
            </div>
            
            <div className="p-8 space-y-8">
              {formData.schoolHistory.length === 0 && <p className="text-center italic text-gray-500">No school history added yet.</p>}
              
              {formData.schoolHistory.map((school, index) => (
                <div key={index} className="border border-[#347928]/20 rounded-xl p-6 relative bg-gray-50">
                    <button type="button" onClick={() => removeSchool(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                    
                    <h4 className="font-bold text-[#347928] mb-4 border-b pb-2">School #{index + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Country of Institution" name="countryOfInstitution" value={school.countryOfInstitution} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <InputField label="School Name" name="schoolName" value={school.schoolName} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <InputField label="Education Level" name="educationLevel" value={school.educationLevel} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <InputField label="Grading Scheme" name="gradingScheme" value={school.gradingScheme} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <InputField label="Primary Language" name="primaryLanguage" value={school.primaryLanguage} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <div className="grid grid-cols-2 gap-2 col-span-2 md:col-span-1">
                            <InputField label="From" type="date" name="attendedFrom" value={school.attendedFrom ? school.attendedFrom.split('T')[0] : ''} onChange={(e) => handleSchoolChange(index, e)} />
                            <InputField label="To" type="date" name="attendedTo" value={school.attendedTo ? school.attendedTo.split('T')[0] : ''} onChange={(e) => handleSchoolChange(index, e)} />
                        </div>
                        <InputField label="Degree Name" name="degreeName" value={school.degreeName} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <SelectField label="Graduated?" name="graduated" value={school.graduated || ''} onChange={(e) => handleSchoolChange(index, e)} options={['Yes', 'No']} width="half" />
                        <InputField label="Graduation Date" type="date" name="graduationDate" value={school.graduationDate ? school.graduationDate.split('T')[0] : ''} onChange={(e) => handleSchoolChange(index, e)} width="half" />
                        <SelectField label="Physical Certificate Available?" name="physicalCertificateAvailable" value={school.physicalCertificateAvailable || ''} onChange={(e) => handleSchoolChange(index, e)} options={['Yes', 'No']} width="half" />
                    </div>

                    {/* School Address Sub-section */}
                    <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-sm text-[#347928] uppercase mb-3">School Address</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputField label="Street Address" name="street" value={school.schoolAddress?.street} onChange={(e) => handleSchoolChange(index, e, 'schoolAddress')} />
                            <InputField label="City/Town" name="city" value={school.schoolAddress?.city} onChange={(e) => handleSchoolChange(index, e, 'schoolAddress')} width="half" />
                            <InputField label="Province/State" name="province" value={school.schoolAddress?.province} onChange={(e) => handleSchoolChange(index, e, 'schoolAddress')} width="half" />
                            <InputField label="Postal/Zip Code" name="postalCode" value={school.schoolAddress?.postalCode} onChange={(e) => handleSchoolChange(index, e, 'schoolAddress')} width="half" />
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* === TEST SCORES === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
            <SectionHeader title="Test Scores" icon="quiz" />
            <div className="p-8 grid md:grid-cols-2 gap-6">
              <SelectField label="Proof of Language Proficiency Available?" name="proofOfLanguageProficiency" value={formData.testScores.proofOfLanguageProficiency || ''} onChange={(e) => handleChange(e, 'testScores')} options={['Yes', 'No']} />
              <SelectField label="Apply with Conditional Admission?" name="applyConditionalAdmission" value={formData.testScores.applyConditionalAdmission ? 'Yes' : 'No'} onChange={(e) => { const e2 = {...e}; e2.target.type = 'checkbox'; e2.target.checked = e.target.value === 'Yes'; handleChange(e2, 'testScores'); }} options={['Yes', 'No']} />
              <InputField label="Language Test Status" name="languageTestStatus" value={formData.testScores.languageTestStatus} onChange={(e) => handleChange(e, 'testScores')} width="half" />
              <SelectField label="Open to Language Proficiency Course?" name="openToProficiencyCourse" value={formData.testScores.openToProficiencyCourse || ''} onChange={(e) => handleChange(e, 'testScores')} options={['Yes', 'No']} width="half" />
              <InputField label="GRE Exam Scores" name="greScores" value={formData.testScores.greScores} onChange={(e) => handleChange(e, 'testScores')} width="half" />
              <InputField label="GMAT Exam Scores" name="gmatScores" value={formData.testScores.gmatScores} onChange={(e) => handleChange(e, 'testScores')} width="half" />
            </div>
          </div>

          {/* === ADDITIONAL DETAILS === */}
          <div className="bg-white rounded-2xl shadow-md border border-[#347928]/5 overflow-hidden">
             <SectionHeader title="Additional Details" icon="more_horiz" />
             <div className="p-8 space-y-6">
                <InputField label="Emergency Contacts" name="emergencyContact" value={formData.additionalDetails.emergencyContact} onChange={(e) => handleChange(e, 'additionalDetails')} placeholder="Name: Phone" />
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#347928]/80">Additional Notes</label>
                    <textarea 
                        name="additionalNotes" 
                        value={formData.additionalDetails.additionalNotes} 
                        onChange={(e) => handleChange(e, 'additionalDetails')}
                        className="w-full rounded-lg border-[#347928]/20 bg-white px-4 py-2.5 text-[#347928] placeholder:text-[#347928]/40 focus:border-[#347928] focus:ring-[#347928] h-32"
                    ></textarea>
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4 pb-12">
            <button type="submit" className="h-14 px-12 bg-[#FCCD2A] text-[#347928] text-lg font-bold rounded-lg shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] transition-all border border-[#347928]">
              SAVE PROFILE
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;