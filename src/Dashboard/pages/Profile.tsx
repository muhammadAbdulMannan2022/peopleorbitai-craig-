import React, { useState } from "react";
import { Edit, FileText, UploadCloud, CheckCircle, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import InfoField from "./InfoFild";
import EditProfile from "./EditProfile";
import { 
  useGetProfileQuery, 
  useUpdateProfileMutation, 
  useAddAddressMutation, 
  useDeleteAddressMutation,
  useGetKnowledgeBasesQuery,
  useGeneratePresignedUrlsMutation,
  useCreateKnowledgeBaseMutation
} from "../../store/apiSlice";

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

const mapBackendToProfileData = (user: any): ProfileData => {
  const p = user?.profile || {};
  const addr = p.addresses && p.addresses.length > 0 ? p.addresses[0] : {};
  return {
    companyName: p.company || "",
    designation: p.job_title || "",
    personalPhone: p.phone_personal || "",
    bio: p.about_me || "",
    profession: p.profession || "",
    education: p.education || "",
    gender: p.gender || "",
    age: String(p.age || ""),
    language: p.languages || "",
    avatar: p.avatar_url || "https://picsum.photos/seed/alex/150/150",
    address: {
      houseNo: addr.house_no || "",
      roadNo: addr.road_no || "",
      townCity: addr.town_city || "",
      postalCode: addr.postal_code || "",
      businessEmail: p.business_email || "",
      homePhone: p.phone_home || "",
    },
  };
};

const Profile: React.FC = () => {
  const { data: profileResponse, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const { data: kbResponse, isLoading: kbLoading } = useGetKnowledgeBasesQuery();
  const [generatePresignedUrls] = useGeneratePresignedUrlsMutation();
  const [createKb] = useCreateKnowledgeBaseMutation();

  const [view, setView] = useState<"view" | "edit">("view");

  // Knowledge base upload form state
  const [kbFile, setKbFile] = useState<File | null>(null);
  const [kbDescription, setKbDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  if (profileLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#EFF2F6] min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#8B7EF0]"></div>
      </div>
    );
  }

  const user = profileResponse?.data?.profile;
  const data = mapBackendToProfileData(user);
  const addresses = user?.profile?.addresses || [];

  const handleSave = async (updated: ProfileData, avatarFile: File | null) => {
    try {
      // 1. Submit Profile fields (as FormData)
      const formData = new FormData();
      formData.append("company", updated.companyName);
      formData.append("job_title", updated.designation);
      formData.append("phone_personal", updated.personalPhone);
      formData.append("about_me", updated.bio);
      formData.append("profession", updated.profession);
      formData.append("education", updated.education);
      formData.append("gender", updated.gender);
      formData.append("age", updated.age);
      formData.append("languages", updated.language);
      formData.append("phone_home", updated.address.homePhone);
      formData.append("business_email", updated.address.businessEmail);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await updateProfile(formData).unwrap();

      // 2. Address Handling
      const newAddress = updated.address;
      const oldAddress = addresses[0];

      const hasAddressChanged = 
        !oldAddress || 
        oldAddress.house_no !== newAddress.houseNo ||
        oldAddress.road_no !== newAddress.roadNo ||
        oldAddress.town_city !== newAddress.townCity ||
        oldAddress.postal_code !== newAddress.postalCode;

      if (hasAddressChanged) {
        // If old address exists, delete it first
        if (oldAddress) {
          await deleteAddress(oldAddress.id).unwrap();
        }
        
        // Add new address record
        await addAddress({
          house_no: newAddress.houseNo,
          road_no: newAddress.roadNo,
          town_city: newAddress.townCity,
          postal_code: newAddress.postalCode,
        }).unwrap();
      }

      setView("view");
    } catch (err) {
      console.error("Save profile error:", err);
      alert("Failed to update profile changes.");
    }
  };

  const handleKbUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kbFile || !kbDescription.trim()) {
      setUploadError("Please choose a file and provide a description.");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    try {
      // Step A: Request Presigned URL
      const presignedRes = await generatePresignedUrls({
        files: [{
          fileName: kbFile.name,
          fileType: kbFile.type || "application/octet-stream",
          fileSize: kbFile.size
        }]
      }).unwrap();

      const uploadInfo = presignedRes?.data?.urls?.[0];
      if (!uploadInfo) {
        throw new Error("Failed to get S3 presigned URL");
      }

      // Step B: Upload file directly to S3
      const s3Response = await fetch(uploadInfo.uploadUrl, {
        method: "PUT",
        body: kbFile,
        headers: {
          "Content-Type": kbFile.type || "application/octet-stream"
        }
      });

      if (!s3Response.ok) {
        throw new Error("Direct S3 upload failed");
      }

      // Step C: Trigger indexing
      await createKb({
        scope: "user_specific",
        description: kbDescription,
        s3_paths: [uploadInfo.s3Key]
      }).unwrap();

      // Reset Form State on Success
      setKbFile(null);
      setKbDescription("");
      alert("Document uploaded successfully! Indexing process started.");
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Failed to upload and index document.");
    } finally {
      setIsUploading(false);
    }
  };

  const kbs = (kbResponse?.data || []).filter((kb: any) => kb.scope === "user_specific");

  if (view === "edit") {
    return (
      <EditProfile
        data={data}
        onSave={handleSave}
        onCancel={() => setView("view")}
      />
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto hide-scrollbar md:p-8 flex flex-col gap-6 max-w-5xl mx-auto text-slate-800">
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
                {data.designation || "No designation set"}
              </h1>
              <p className="text-slate-500 font-medium">{data.companyName || "No company set"}</p>
              <p className="text-slate-400 text-sm mt-1">
                {data.address.townCity || "No city set"}
              </p>
            </div>
            <div className="hidden md:block w-px bg-slate-100 self-stretch my-2"></div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                About me
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {data.bio || "No bio set."}
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

      {/* Info fields */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-medium text-slate-700 mb-8 border-b border-slate-50 pb-4">
          Personal & Professional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <InfoField label="Personal Phone" value={data.personalPhone || "—"} />
          <InfoField label="Profession" value={data.profession || "—"} />
          <InfoField label="Education" value={data.education || "—"} />
          <InfoField label="Gender" value={data.gender || "—"} />
          <InfoField label="Age" value={data.age || "—"} />
          <InfoField label="Language" value={data.language || "—"} />
        </div>
      </div>

      {/* Address */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-medium text-slate-700 mb-8 border-b border-slate-50 pb-4">
          Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <InfoField label="House No." value={data.address.houseNo || "—"} />
          <InfoField label="Road No." value={data.address.roadNo || "—"} />
          <InfoField label="Town/City" value={data.address.townCity || "—"} />
          <InfoField label="Postal Code" value={data.address.postalCode || "—"} />
          <InfoField
            label="Business Email"
            value={data.address.businessEmail || "—"}
          />
          <InfoField label="Home Phone" value={data.address.homePhone || "—"} />
        </div>
      </div>

      {/* Knowledgebase Upload Section */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-medium text-slate-700 mb-2 border-b border-slate-50 pb-4">
          Upload Knowledgebase (User-specific)
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Upload files (PDF, Word, TXT, etc.) to your user profile. These documents will act as grounding context for AI agents across all chats.
        </p>

        {/* Upload Form */}
        <form onSubmit={handleKbUpload} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div className="md:col-span-4 flex flex-col gap-1.5 w-full">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Choose File</label>
            <label className="flex items-center justify-center border-2 border-dashed border-[#8B7EF0]/40 rounded-lg py-3 px-4 bg-white hover:bg-indigo-50/20 cursor-pointer transition-colors group">
              <UploadCloud size={18} className="text-[#8B7EF0] mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#8B7EF0] truncate">
                {kbFile ? kbFile.name : "Select Document"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setKbFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <div className="md:col-span-5 flex flex-col gap-1.5 w-full">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Description</label>
            <input
              type="text"
              placeholder="e.g. Employee handbook, Internal policy doc"
              value={kbDescription}
              onChange={(e) => setKbDescription(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-4 py-3 outline-none focus:border-[#8B7EF0] focus:ring-1 focus:ring-[#8B7EF0] transition-all"
            />
          </div>

          <div className="md:col-span-3 w-full">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-[#8B7EF0] to-[#7C4DE0] hover:from-[#7C4DE0] hover:to-[#8B7EF0] text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <RefreshCw size={16} className="animate-spin mr-2" />
                  Indexing...
                </>
              ) : (
                "Upload & Index"
              )}
            </button>
          </div>

          {uploadError && (
            <div className="col-span-12 flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{uploadError}</span>
            </div>
          )}
        </form>

        {/* Uploaded Documents List */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Uploaded Documents</h3>
          {kbLoading ? (
            <div className="flex justify-center p-4">
              <RefreshCw className="animate-spin text-slate-400" />
            </div>
          ) : kbs.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-lg p-8 text-center text-slate-400">
              <FileText size={32} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No user-specific knowledge base documents uploaded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Document</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {kbs.map((kb: any) => (
                    <tr key={kb.id} className="hover:bg-slate-50/40">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        {kb.s3_paths?.[0]?.split("/").pop() || "Document"}
                      </td>
                      <td className="py-4 px-4 text-slate-500">{kb.description}</td>
                      <td className="py-4 px-4">
                        {kb.status === "completed" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle size={12} />
                            Completed
                          </span>
                        )}
                        {kb.status === "pending" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <RefreshCw size={12} className="animate-spin" />
                            Indexing...
                          </span>
                        )}
                        {kb.status === "failed" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                            <AlertCircle size={12} />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {kb.status === "completed" && kb.s3_urls?.[0] && (
                          <a
                            href={kb.s3_urls[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B7EF0] hover:text-[#7C4DE0] hover:underline"
                          >
                            Download <ExternalLink size={12} />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
