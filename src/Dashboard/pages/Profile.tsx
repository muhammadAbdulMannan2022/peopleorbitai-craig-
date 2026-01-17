import React, { useState } from "react";
import { Edit } from "lucide-react";
import InfoField from "./InfoFild";
import EditProfile from "./EditProfile";

export interface ProfileData {
  companyName: string;
  designation: string;
  personalPhone: string;
  bio: string;
  profession: string;
  education: string;
  gender: string;
  age: string;
  language: string;
  avatar: string;
  address: {
    houseNo: string;
    roadNo: string;
    townCity: string;
    postalCode: string;
    businessEmail: string;
    homePhone: string;
  };
}

const INITIAL_DATA: ProfileData = {
  companyName: "Top favourite information technology Limited.",
  designation: "DevOps Engineer",
  personalPhone: "+1234567890",
  bio: "Ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in ype and scrambled.",
  profession: "Software Architecture",
  education: "BSc. in Computer science",
  gender: "Male",
  age: "28",
  language: "Bangla, English",
  avatar: "https://picsum.photos/seed/alex/150/150",
  address: {
    houseNo: "63/4",
    roadNo: "24/1",
    townCity: "Tammy City",
    postalCode: "8250",
    businessEmail: "alextammy123@gmail.com",
    homePhone: "163494130358651320",
  },
};

const Profile: React.FC = () => {
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [view, setView] = useState<"view" | "edit">("view");

  if (view === "edit") {
    return (
      <EditProfile
        data={data}
        onSave={(updated) => {
          setData(updated);
          setView("view");
        }}
        onCancel={() => setView("view")}
      />
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto hide-scrollbar md:p-8 flex flex-col items-center gap-6 max-w-5xl mx-auto">
      {/* View Component Header */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={data.avatar}
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-slate-50 object-cover shadow-inner"
          />
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[180px]">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-700">
                {data.designation}
              </h1>
              <p className="text-slate-500 font-medium">{data.companyName}</p>
              <p className="text-slate-400 text-sm mt-1">
                {data.address.townCity}
              </p>
            </div>
            <div className="hidden md:block w-px bg-slate-100 self-stretch my-2"></div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                About me
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {data.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setView("edit")}
            className="flex items-center gap-2 p-2 hover:cursor-pointer border border-slate-200 text-slate-500 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <Edit size={14} />
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-medium text-slate-700 mb-8 border-b border-slate-50 pb-4">
          Personal & Professional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <InfoField label="Personal Phone" value={data.personalPhone} />
          <InfoField label="Profession" value={data.profession} />
          <InfoField label="Education" value={data.education} />
          <InfoField label="Gender" value={data.gender} />
          <InfoField label="Age" value={data.age} />
          <InfoField label="Language" value={data.language} />
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-medium text-slate-700 mb-8 border-b border-slate-50 pb-4">
          Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <InfoField label="House No." value={data.address.houseNo} />
          <InfoField label="Road No." value={data.address.roadNo} />
          <InfoField label="Town/City" value={data.address.townCity} />
          <InfoField label="Postal Code" value={data.address.postalCode} />
          <InfoField
            label="Business Email"
            value={data.address.businessEmail}
          />
          <InfoField label="Home Phone" value={data.address.homePhone} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
