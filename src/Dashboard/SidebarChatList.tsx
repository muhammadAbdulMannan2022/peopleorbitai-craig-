import {
  MessageSquare,
  MoreVertical,
  Plus,
  X,
  UploadCloud,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  FileText,
} from "lucide-react";
import { TbArrowBackUp } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router";
import {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useCreateChatMutation,
  useGetKnowledgeBasesQuery,
  useGeneratePresignedUrlsMutation,
  useCreateKnowledgeBaseMutation,
  useGetAssignmentByIdQuery,
} from "../store/apiSlice";

type Chat = {
  id: string;
  title: string;
};

type Assignment = {
  id: string;
  name: string;
  agent_type: string;
  chats: Chat[];
};

type AssignmentItemProps = {
  assignment: Assignment;
  onSelect: () => void;
  onEdit: (name: string) => void;
  onDelete: () => void;
  onManageKb: () => void;
};

function AssignmentItem({
  assignment,
  onSelect,
  onEdit,
  onDelete,
  onManageKb,
}: AssignmentItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(assignment.name);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
    setMenuOpen(false);
  };

  const handleSave = () => {
    if (name.trim()) {
      onEdit(name);
    } else {
      setName(assignment.name);
    }
    setEditing(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <li
        onClick={editing ? undefined : onSelect}
        className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm bg-[#2c1d45]/40 hover:bg-[#2c1d45]/70"
      >
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              } else if (e.key === "Escape") {
                setName(assignment.name);
                setEditing(false);
              }
            }}
            className="bg-transparent outline-none text-white flex-1"
          />
        ) : (
          <span className="truncate flex-1">{assignment.name}</span>
        )}
        {!editing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 hover:bg-[#2c1d45]/40 rounded hover:cursor-pointer text-slate-300"
          >
            <MoreVertical size={16} />
          </button>
        )}
      </li>
      {menuOpen && (
        <ul className="absolute right-0 top-full z-10 mt-1 bg-[#1c0f33] text-white rounded-md shadow-lg py-1 min-w-[150px] border border-indigo-950">
          <li
            className="px-4 py-2 hover:bg-[#2c1d45] cursor-pointer text-xs font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onManageKb();
              setMenuOpen(false);
            }}
          >
            Manage KB
          </li>
          <li
            className="px-4 py-2 hover:bg-[#2c1d45] cursor-pointer text-xs font-semibold"
            onClick={handleEdit}
          >
            Edit name
          </li>
          <li
            className="px-4 py-2 hover:bg-[#2c1d45] cursor-pointer text-xs font-semibold text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Delete this assignment?")) {
                onDelete();
              }
              setMenuOpen(false);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

function ChatItem({ chat, isActive, onSelect, onDelete }: ChatItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <li
        onClick={onSelect}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm ${
          isActive ? "bg-[#8B7EF0]" : "bg-[#2c1d45]/40 hover:bg-[#2c1d45]/70"
        }`}
      >
        <MessageSquare size={14} />
        <span className="flex-1 truncate">{chat.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 hover:bg-[#2c1d45]/40 rounded hover:cursor-pointer text-slate-300"
        >
          <MoreVertical size={16} />
        </button>
      </li>
      {menuOpen && (
        <ul className="absolute right-0 top-full z-10 mt-1 bg-[#1c0f33] text-white rounded-md shadow-lg py-1 min-w-[120px] border border-indigo-950">
          <li
            className="px-4 py-2 hover:bg-[#2c1d45] cursor-pointer text-xs font-semibold text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Delete this chat?")) {
                onDelete();
              }
              setMenuOpen(false);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

type NameInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

function NameInputModal({ isOpen, onClose, onSubmit }: NameInputModalProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    }
    setName("");
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#150A29] border border-indigo-950 p-6 rounded-xl text-white w-85 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-slate-300">
          Enter assignment name
        </h2>
        <input
          ref={inputRef}
          type="text"
          value={name}
          placeholder="New Assignment"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            } else if (e.key === "Escape") {
              setName("");
              onClose();
            }
          }}
          className="w-full bg-indigo-950/40 border border-indigo-900 text-white px-3 py-2 rounded-lg outline-none focus:border-[#8B7EF0] transition-colors"
        />
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={() => {
              setName("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-indigo-950/40 hover:bg-[#2c1d45]/70 text-slate-300 border border-indigo-900/50 hover:cursor-pointer text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#8B7EF0] hover:bg-[#7c70e2] text-white hover:cursor-pointer text-xs font-bold shadow-lg shadow-[#8B7EF0]/20"
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Assignment Knowledge Base Modal
type AssignmentKbModalProps = {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment | null;
};

function AssignmentKbModal({
  isOpen,
  onClose,
  assignment,
}: AssignmentKbModalProps) {
  const { data: kbResponse, isLoading: kbLoading } = useGetKnowledgeBasesQuery(
    { assignment_id: assignment?.id || "" },
    { skip: !assignment },
  );
  const [generatePresignedUrls] = useGeneratePresignedUrlsMutation();
  const [createKb] = useCreateKnowledgeBaseMutation();

  const [kbFile, setKbFile] = useState<File | null>(null);
  const [kbDescription, setKbDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  if (!isOpen || !assignment) return null;

  const handleUpload = async (e: React.FormEvent) => {
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
        files: [
          {
            fileName: kbFile.name,
            fileType: kbFile.type || "application/octet-stream",
            fileSize: kbFile.size,
          },
        ],
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
          "Content-Type": kbFile.type || "application/octet-stream",
        },
      });

      if (!s3Response.ok) {
        throw new Error("Direct S3 upload failed");
      }

      // Step C: Trigger indexing
      await createKb({
        scope: "assignment_specific",
        assignment_id: assignment.id,
        description: kbDescription,
        s3_paths: [uploadInfo.s3Key],
      }).unwrap();

      // Reset
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

  const kbs = (kbResponse?.data || []).filter(
    (kb: any) =>
      kb.scope === "assignment_specific" && kb.assignment_id === assignment.id,
  );

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-xs text-white"
      onClick={onClose}
    >
      <div
        className="bg-[#150A29] border border-indigo-950 p-6 rounded-xl text-white w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-950/60 pb-3 mb-4">
          <h2 className="text-base font-semibold uppercase tracking-wider text-slate-300">
            KB:{" "}
            <span className="text-[#8B7EF0] font-bold">{assignment.name}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2c1d45]/40 rounded hover:cursor-pointer text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end mb-6 bg-indigo-950/20 p-4 rounded-xl border border-indigo-950/50"
        >
          <div className="md:col-span-4 flex flex-col gap-1.5 w-full">
            <label className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              Choose File
            </label>
            <label className="flex items-center justify-center border border-dashed border-[#8B7EF0]/40 rounded-lg py-2 px-3 bg-indigo-950/40 hover:bg-[#8B7EF0]/10 cursor-pointer transition-colors group">
              <UploadCloud
                size={16}
                className="text-[#8B7EF0] mr-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-semibold text-[#8B7EF0] truncate">
                {kbFile ? kbFile.name : "Select Doc"}
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
            <label className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Conduct rules, Project specifications"
              value={kbDescription}
              onChange={(e) => setKbDescription(e.target.value)}
              className="bg-indigo-950/60 border border-indigo-900 text-white text-xs font-medium rounded-lg px-3 py-2.5 outline-none focus:border-[#8B7EF0] focus:ring-1 focus:ring-[#8B7EF0] transition-all"
            />
          </div>

          <div className="md:col-span-3 w-full">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#8B7EF0] hover:bg-[#7c70e2] text-white font-bold py-2.5 px-4 rounded-lg transition-all text-xs active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <RefreshCw size={12} className="animate-spin mr-1.5" />
                  Indexing
                </>
              ) : (
                "Upload & Index"
              )}
            </button>
          </div>

          {uploadError && (
            <div className="col-span-12 flex items-center gap-1.5 mt-1 text-red-400 text-xs">
              <AlertCircle size={14} />
              <span>{uploadError}</span>
            </div>
          )}
        </form>

        {/* Existing KB Documents */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Knowledge Base Documents
          </h3>
          {kbLoading ? (
            <div className="flex justify-center p-3">
              <RefreshCw className="animate-spin text-slate-400" />
            </div>
          ) : kbs.length === 0 ? (
            <div className="border border-dashed border-indigo-950/60 rounded-lg p-6 text-center text-slate-500">
              <FileText size={28} className="mx-auto mb-1 text-slate-600" />
              <p className="text-xs font-semibold">
                No assignment-specific knowledge bases uploaded yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-indigo-950/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-950/30 border-b border-indigo-950/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-2 px-3">Doc</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-950/40 text-xs">
                  {kbs.map((kb: any) => (
                    <tr key={kb.id} className="hover:bg-indigo-950/10">
                      <td className="py-3 px-3 font-semibold text-slate-300 truncate max-w-[120px]">
                        {kb.s3_paths?.[0]?.split("/").pop() || "Document"}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {kb.description}
                      </td>
                      <td className="py-3 px-3">
                        {kb.status === "completed" && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-950/40 text-green-400 border border-green-900/50">
                            Completed
                          </span>
                        )}
                        {kb.status === "pending" && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-950/40 text-blue-400 border border-blue-900/50">
                            Indexing...
                          </span>
                        )}
                        {kb.status === "failed" && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-950/40 text-red-400 border border-red-900/50">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {kb.status === "completed" && kb.s3_urls?.[0] && (
                          <a
                            href={kb.s3_urls[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#8B7EF0] hover:underline"
                          >
                            Download <ExternalLink size={10} />
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
    </div>,
    document.body,
  );
}

export default function SidebarChatList({
  activeAgentId,
}: {
  activeAgentId?: number;
}) {
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const chatId = searchParams.get("chatId");

  const navigate = useNavigate();

  // Queries & Mutations
  const { data: assignmentsRes } = useGetAssignmentsQuery();
  const [createAssignment] = useCreateAssignmentMutation();
  const [createChatMutation] = useCreateChatMutation();

  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(
    null,
  );
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch details for the active assignment to get its chats
  const { data: activeAssignmentRes } = useGetAssignmentByIdQuery(
    activeAssignmentId || "",
    {
      skip: !activeAssignmentId,
    },
  );

  // Assignment Knowledge Base Modal state
  const [isKbModalOpen, setIsKbModalOpen] = useState(false);
  const [kbModalAssignment, setKbModalAssignment] = useState<Assignment | null>(
    null,
  );

  // Reset active assignment and chat when agent switches
  useEffect(() => {
    setActiveAssignmentId(null);
    setActiveChatId(null);
    navigate("/dashboard/chat");
  }, [activeAgentId]);

  // Group and map data
  const assignmentsList = assignmentsRes?.data || [];
  const currentAgentType = activeAgentId === 2 ? "recruitment" : "hr";

  const assignments: Assignment[] = assignmentsList.map((a: any) => ({
    id: a.id,
    name: a.title,
    agent_type: a.agent_type,
    chats: [], // chats will be fetched when assignment is selected
  }));

  const activeAssignmentFromList = assignments.find(
    (a) => a.id === activeAssignmentId,
  );
  // Filter chats belonging to the active assignment by the current active agent type (with fallback for legacy records)
  const activeAssignmentChats = (activeAssignmentRes?.data?.chats || []).filter(
    (c: any) => {
      const chatAgentType = c.agent_type || activeAssignmentFromList?.agent_type || "recruitment";
      return chatAgentType === currentAgentType;
    }
  );

  const activeAssignment = activeAssignmentFromList
    ? { ...activeAssignmentFromList, chats: activeAssignmentChats }
    : undefined;

  // handle direct visit the chat [ deshi way ]
  useEffect(() => {
    if (!assignmentId) {
      setActiveAssignmentId(null);
      setActiveChatId(null);
      return;
    }

    const assignment = assignments.find((a) => String(a.id) === assignmentId);
    if (!assignment) return;

    setActiveAssignmentId(assignment.id);

    if (chatId) {
      // The chats might not be loaded yet, but we can set the active chat ID
      setActiveChatId(chatId);
    }
  }, [assignmentId, chatId, assignmentsList]);

  const handleCreateAssignment = async (name: string) => {
    try {
      // Assignments are no longer agent-specified
      const res = await createAssignment({
        title: name,
        status: "active",
      }).unwrap();
      const newId = res?.data?.id || res?.id;
      if (newId) {
        setActiveAssignmentId(newId);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create assignment");
    }
  };

  const createChat = async () => {
    if (!activeAssignment) return;
    try {
      const res = await createChatMutation({
        assignment_id: activeAssignment.id,
        title: `New Chat ${activeAssignment.chats.length + 1}`,
        agent_type: currentAgentType
      }).unwrap();

      if (res.success && res.data?.id) {
        setActiveChatId(res.data.id);
        navigate(
          `/dashboard/chat?assignmentId=${activeAssignment.id}&chatId=${res.data.id}&agentType=${currentAgentType}`,
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create chat");
    }
  };

  const handleActiveChat = (cId: string) => {
    setActiveChatId(cId);
    navigate(
      `/dashboard/chat?assignmentId=${activeAssignmentId}&chatId=${cId}&agentType=${currentAgentType}`,
    );
  };

  return (
    <div className="px-4 py-3 text-white">
      {/* ASSIGNMENT LIST VIEW */}
      {!activeAssignment && (
        <>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-white/10 py-2 px-2 rounded-lg before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md before:rounded-lg z-10 border border-white/5">
            <h2 className="text-sm font-semibold">Assignments</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-7 h-7 rounded-full bg-[#8B7EF0] flex items-center justify-center hover:cursor-pointer hover:bg-[#7c70e2] shadow-md shadow-[#8B7EF0]/20"
            >
              <Plus size={16} />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {assignments.map((a) => (
              <AssignmentItem
                key={a.id}
                assignment={a}
                onSelect={() => setActiveAssignmentId(a.id)}
                onEdit={(name) => {
                  // editing name
                  console.log("Edit to", name);
                }}
                onDelete={() => {
                  // deleting assignment
                  console.log("Delete assignment", a.id);
                }}
                onManageKb={() => {
                  setKbModalAssignment(a);
                  setIsKbModalOpen(true);
                }}
              />
            ))}
          </ul>
        </>
      )}

      {/* CHAT LIST VIEW */}
      {activeAssignment && (
        <>
          <div className="flex items-center gap-1 mb-3 sticky top-0 bg-white/10 py-2 px-2 rounded-lg before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md before:rounded-lg z-10 border border-white/5">
            <button
              onClick={() => {
                setActiveAssignmentId(null);
                setActiveChatId(null);
                navigate("/dashboard/chat");
              }}
              className="p-1 hover:bg-[#2c1d45]/40 rounded hover:cursor-pointer"
            >
              <TbArrowBackUp size={16} />
            </button>
            <h2 className="text-sm font-semibold truncate flex-1">
              {activeAssignment.name}
            </h2>
            <button
              onClick={() => {
                setKbModalAssignment(activeAssignment);
                setIsKbModalOpen(true);
              }}
              title="Manage Knowledgebase"
              className="w-7 h-7 rounded-full hover:bg-[#2c1d45]/40 flex items-center justify-center hover:cursor-pointer"
            >
              <FileText size={14} className="text-slate-300" />
            </button>
            <button
              onClick={createChat}
              className="w-7 h-7 rounded-full bg-[#8B7EF0] flex items-center justify-center hover:cursor-pointer hover:bg-[#7c70e2] shadow-md shadow-[#8B7EF0]/20"
            >
              <Plus size={16} />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {activeAssignment.chats.map((chat: any) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={activeChatId === chat.id}
                onSelect={() => handleActiveChat(chat.id)}
                onDelete={() => {
                  // Delete chat logic
                  console.log("Delete chat", chat.id);
                }}
              />
            ))}

            {activeAssignment.chats.length === 0 && (
              <p className="text-xs text-slate-500 px-3 py-1">No chats yet</p>
            )}
          </ul>
        </>
      )}

      {/* Name Input Modal */}
      <NameInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />

      {/* Assignment Knowledge Base Modal */}
      <AssignmentKbModal
        isOpen={isKbModalOpen}
        onClose={() => {
          setIsKbModalOpen(false);
          setKbModalAssignment(null);
        }}
        assignment={kbModalAssignment}
      />
    </div>
  );
}
