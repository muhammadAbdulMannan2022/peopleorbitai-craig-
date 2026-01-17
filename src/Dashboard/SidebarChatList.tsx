import { MessageSquare, MoreVertical, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router";

type Chat = {
  id: number;
  title: string;
};

type Assignment = {
  id: number;
  name: string;
  chats: Chat[];
};

const initialAssignments: Assignment[] = [
  {
    id: 1,
    name: "Recruitment",
    chats: Array.from({ length: 15 }, (_, i) => ({
      id: 100 + i + 1,
      title: `Recruitment Chat ${i + 1}`,
    })),
  },
  {
    id: 2,
    name: "HR Operations",
    chats: [{ id: 201, title: "Policy Discussion" }],
  },
  {
    id: 3,
    name: "Engineering",
    chats: [{ id: 301, title: "Sprint Planning" }],
  },
  {
    id: 4,
    name: "Marketing",
    chats: [{ id: 401, title: "Campaign Ideas" }],
  },
  {
    id: 5,
    name: "Sales",
    chats: [{ id: 501, title: "Lead Follow-up" }],
  },
  {
    id: 6,
    name: "Finance",
    chats: [{ id: 601, title: "Budget Review" }],
  },
  {
    id: 7,
    name: "Customer Support",
    chats: [{ id: 701, title: "Ticket Escalation" }],
  },
  {
    id: 8,
    name: "Product",
    chats: [{ id: 801, title: "Feature Roadmap" }],
  },
  {
    id: 9,
    name: "QA",
    chats: [{ id: 901, title: "Bug Triage" }],
  },
  {
    id: 10,
    name: "Design",
    chats: [{ id: 1001, title: "UI Review" }],
  },
  {
    id: 11,
    name: "Legal",
    chats: [{ id: 1101, title: "Contract Review" }],
  },
  {
    id: 12,
    name: "Admin",
    chats: [{ id: 1201, title: "Office Management" }],
  },
];

type AssignmentItemProps = {
  assignment: Assignment;
  onSelect: () => void;
  onEdit: (name: string) => void;
  onDelete: () => void;
};

function AssignmentItem({
  assignment,
  onSelect,
  onEdit,
  onDelete,
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
        className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm bg-dashboardNotActive/40 hover:bg-dashboardNotActive/70"
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
            className="p-1 hover:bg-dashboardNotActive/40 rounded hover:cursor-pointer"
          >
            <MoreVertical size={16} />
          </button>
        )}
      </li>
      {menuOpen && (
        <ul className="absolute right-0 top-full z-10 mt-1 bg-dashboardActive text-white rounded-md shadow-lg py-1 min-w-[120px]">
          <li
            className="px-4 py-2 hover:bg-dashboardNotActive cursor-pointer"
            onClick={handleEdit}
          >
            Edit name
          </li>
          <li
            className="px-4 py-2 hover:bg-dashboardNotActive cursor-pointer"
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
          isActive
            ? "bg-dashboardActive"
            : "bg-dashboardNotActive/40 hover:bg-dashboardNotActive/70"
        }`}
      >
        <MessageSquare size={14} />
        <span className="flex-1 truncate">{chat.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 hover:bg-dashboardNotActive/40 rounded hover:cursor-pointer"
        >
          <MoreVertical size={16} />
        </button>
      </li>
      {menuOpen && (
        <ul className="absolute right-0 top-full z-10 mt-1 bg-dashboardActive/80 text-white rounded-md shadow-lg py-1 min-w-[120px]">
          <li
            className="px-4 py-2 hover:bg-dashboardNotActive cursor-pointer"
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-dashboardActive p-4 rounded-lg text-white w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm font-semibold mb-2">Enter assignment name</h2>
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
          className="w-full bg-dashboardNotActive/40 text-white px-3 py-2 rounded-md outline-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setName("");
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-dashboardNotActive/40 hover:bg-dashboardNotActive/70 border border-main/50 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-dashboardActive hover:bg-dashboardActive/80 border hover:cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SidebarChatList() {
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const chatId = searchParams.get("chatId");
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const [activeAssignmentId, setActiveAssignmentId] = useState<number | null>(
    null,
  );
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeAssignment = assignments.find((a) => a.id === activeAssignmentId);

  const navigate = useNavigate();

  // handle direct visit the chat [ deshi way ]
  useEffect(() => {
    if (!assignmentId) return;

    const assignment = assignments.find((a) => String(a.id) === assignmentId);

    if (!assignment) return;

    setActiveAssignmentId(assignment.id);

    if (chatId) {
      const chat = assignment.chats.find((c) => String(c.id) === chatId);
      setActiveChatId(chat?.id ?? null);
    }
  }, [assignmentId, chatId, assignments]);

  const handleCreateAssignment = (name: string) => {
    const newAssignment: Assignment = {
      id: Date.now(),
      name,
      chats: [],
    };
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  const createChat = () => {
    if (!activeAssignment) return;
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
    };

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === activeAssignment.id
          ? { ...a, chats: [newChat, ...a.chats] }
          : a,
      ),
    );
    setActiveChatId(newChat.id);
  };

  const handleActiveChat = (chatId: number) => {
    setActiveChatId(chatId);
    navigate(
      `/dashboard/chat?assignmentId=${activeAssignmentId}&chatId=${chatId}`,
    );
  };

  return (
    <div className="px-4 py-3 text-white">
      {/* ASSIGNMENT LIST VIEW */}
      {!activeAssignment && (
        <>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-white/10 py-2 px-2 rounded-lg before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md before:rounded-lg z-10">
            <h2 className="text-sm font-semibold">Assignments</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-7 h-7 rounded-full bg-dashboardActive flex items-center justify-center hover:cursor-pointer"
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
                onEdit={(name) =>
                  setAssignments((prev) =>
                    prev.map((p) => (p.id === a.id ? { ...p, name } : p)),
                  )
                }
                onDelete={() => {
                  setAssignments((prev) => prev.filter((p) => p.id !== a.id));
                  if (activeAssignmentId === a.id) {
                    setActiveAssignmentId(null);
                  }
                }}
              />
            ))}
          </ul>
        </>
      )}

      {/* CHAT LIST VIEW */}
      {activeAssignment && (
        <>
          <div className="flex items-center gap-2 mb-3 sticky top-0 bg-white/10 py-2 px-2 rounded-lg before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md before:rounded-lg z-10">
            <button
              onClick={() => {
                setActiveAssignmentId(null);
                setActiveChatId(null);
                navigate("/dashboard/chat");
              }}
              className="p-1 hover:bg-dashboardNotActive/40 rounded hover:cursor-pointer"
            >
              <TbArrowBackUp size={16} />
            </button>
            <h2 className="text-sm font-semibold truncate">
              {activeAssignment.name}
            </h2>
            <button
              onClick={createChat}
              className="ml-auto w-7 h-7 rounded-full bg-dashboardActive flex items-center justify-center hover:cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {activeAssignment.chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={activeChatId === chat.id}
                onSelect={() => handleActiveChat(chat.id)}
                onDelete={() => {
                  setAssignments((prev) =>
                    prev.map((a) =>
                      a.id === activeAssignment.id
                        ? {
                            ...a,
                            chats: a.chats.filter((c) => c.id !== chat.id),
                          }
                        : a,
                    ),
                  );
                  if (activeChatId === chat.id) {
                    setActiveChatId(null);
                  }
                }}
              />
            ))}

            {activeAssignment.chats.length === 0 && (
              <p className="text-xs text-gray-500 px-3">No chats yet</p>
            )}
          </ul>
        </>
      )}

      <NameInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />
    </div>
  );
}
