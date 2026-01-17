import React from "react";
import { ChevronLeft, Phone, Mail } from "lucide-react";
import type { ProfileData } from "./Profile";

interface EditProfileProps {
  data: ProfileData;
  onSave: (updatedData: ProfileData) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<ProfileData>(data);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const InputField = ({
    label,
    value,
    onChange,
    placeholder = "Enter here",
    icon: Icon,
    type = "text",
  }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[#8E99AF] text-sm font-normal">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E99AF]">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[#F3F6F9] text-[#464E5F] rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#8B7EF0] transition-all text-sm ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onCancel}
          className="flex items-center hover:cursor-pointer z-10 gap-1 text-[#8E99AF] hover:text-[#464E5F] transition-colors font-medium"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="flex-1 text-center text-[#464E5F] text-2xl font-bold -ml-12">
          Edit Profile Details
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <InputField
          label="Compnay Name"
          value={formData.companyName}
          onChange={(v: string) => handleChange("companyName", v)}
        />
        <InputField
          label="Your Designation"
          value={formData.designation}
          onChange={(v: string) => handleChange("designation", v)}
        />
        <InputField
          label="Phone number (personal)"
          value={formData.personalPhone}
          onChange={(v: string) => handleChange("personalPhone", v)}
          icon={Phone}
          placeholder="3546-63541645"
        />

        <InputField
          label="Describe yourself in short"
          value={formData.bio}
          onChange={(v: string) => handleChange("bio", v)}
        />
        <InputField
          label="Profession"
          value={formData.profession}
          onChange={(v: string) => handleChange("profession", v)}
        />
        <InputField
          label="Education"
          value={formData.education}
          onChange={(v: string) => handleChange("education", v)}
        />

        <div className="flex gap-4">
          <InputField
            label="Gender"
            value={formData.gender}
            onChange={(v: string) => handleChange("gender", v)}
          />
          <InputField
            label="Age"
            value={formData.age}
            onChange={(v: string) => handleChange("age", v)}
          />
        </div>
        <InputField
          label="Language"
          value={formData.language}
          onChange={(v: string) => handleChange("language", v)}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[#8E99AF] text-sm font-normal">
            Upload picture
          </label>
          <div className="flex items-center w-full bg-[#F3F6F9] rounded-lg overflow-hidden border border-transparent focus-within:ring-1 focus-within:ring-[#8B7EF0]">
            <label className="bg-[#E1E9F1] text-[#464E5F] px-4 py-3 text-sm font-medium cursor-pointer hover:bg-[#D4DEE9] transition-colors">
              Choose file
              <input type="file" className="hidden" />
            </label>
            <span className="flex-1 px-4 text-[#8E99AF] text-xs truncate">
              a:sdjlkgjadslg;lasd.jpg
            </span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-[#464E5F] text-xl font-bold mb-4 flex items-center gap-2">
          Address
        </h2>
        <div className="h-px bg-[#EBEDF3] w-full mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="House No."
            value={formData.address.houseNo}
            onChange={(v: string) => handleAddressChange("houseNo", v)}
          />
          <InputField
            label="Road No"
            value={formData.address.roadNo}
            onChange={(v: string) => handleAddressChange("roadNo", v)}
          />
          <InputField
            label="Town/city"
            value={formData.address.townCity}
            onChange={(v: string) => handleAddressChange("townCity", v)}
          />
          <InputField
            label="Postal code"
            value={formData.address.postalCode}
            onChange={(v: string) => handleAddressChange("postalCode", v)}
          />
          <InputField
            label="Business email"
            value={formData.address.businessEmail}
            onChange={(v: string) => handleAddressChange("businessEmail", v)}
            icon={Mail}
            placeholder="user@mail.com"
          />
          <InputField
            label="Phone number (Home)"
            value={formData.address.homePhone}
            onChange={(v: string) => handleAddressChange("homePhone", v)}
            icon={Phone}
            placeholder="3546-63541645"
          />
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => onSave(formData)}
          className="bg-dashboardMain hover:bg-dashboardMain/90 hover:cursor-pointer text-white font-bold py-4 px-16 rounded-xl transition-all shadow-lg shadow-[#8B7EF033] text-lg"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
