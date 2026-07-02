import { FileText, ImageIcon } from "lucide-react";
import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import ReactMarkdown from "react-markdown";
import type { Message } from "./Chat";

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext || "")) {
    return <ImageIcon className="w-6 h-6 text-[#8B7EF0]" />;
  }
  return <FileText className="w-6 h-6 text-[#8B7EF0]" />;
}

function MessageDisplay({
  messages,
  setMessages,
  isTyping,
}: {
  messages: Message[];
  setMessages?: Function;
  isTyping?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const chatId = searchParams.get("chatId");

  const isValidChat = assignmentId && chatId;

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (setMessages) {
      setMessages([]);
    }
  }, [assignmentId, chatId, setMessages]);

  return (
    <div className="flex-1 h-[100%] w-full max-w-4xl mx-auto p-4 flex flex-col justify-between">
      {isValidChat ? (
        messages.length > 0 ? (
          <div
            ref={messagesRef}
            className="overflow-y-auto space-y-4 h-full pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-900 scrollbar-track-transparent scroll-hide"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#8B7EF0] text-white rounded-br-none"
                      : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                  }`}
                >
                  {msg.text &&
                    (msg.sender === "bot" ? (
                      <div className="react-markdown-container">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ))}
                  {msg.files && msg.files.length > 0 && (
                    <div className="mt-2.5 flex flex-col gap-1.5 border-t border-black/5 pt-2">
                      {msg.files.map((file: any, fidx: number) => {
                        const name =
                          file instanceof File ? file.name : file.name;
                        const fileEl = (
                          <div
                            className={`flex items-center gap-2 p-2 rounded-lg ${
                              msg.sender === "user"
                                ? "bg-black/10 text-white"
                                : "bg-slate-50 text-slate-700"
                            }`}
                          >
                            {getFileIcon(name)}
                            <span className="text-xs truncate font-medium flex-1 max-w-[180px] underline decoration-dotted">
                              {name}
                            </span>
                          </div>
                        );

                        if (file.url) {
                          return (
                            <a
                              key={fidx}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:opacity-85 transition-opacity"
                            >
                              {fileEl}
                            </a>
                          );
                        }

                        return <div key={fidx}>{fileEl}</div>;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 rounded-2xl rounded-bl-none border border-slate-100 p-4 shadow-sm flex items-center space-x-2">
                  <div className="flex space-x-1.5 items-center h-2">
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7EF0] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7EF0] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7EF0] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold text-[#8B7EF0]">
              Start the conversation
            </h2>
            <p className="text-slate-400 text-xs mt-1 font-medium">
              Send a message to begin chatting with your AI agent.
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-black text-[#8B7EF0] tracking-tight">
            Welcome to PeopleOrbit AI
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-semibold">
            Select or create an assignment from the sidebar to start chatting.
          </p>
        </div>
      )}
    </div>
  );
}

export default MessageDisplay;
