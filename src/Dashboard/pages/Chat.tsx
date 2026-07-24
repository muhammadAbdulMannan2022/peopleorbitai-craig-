import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import MessageBox from "./MessageInput";
import MessageDisplay from "./Messages";
import { 
  useGetChatMessagesQuery, 
  useSendMessageMutation,
  useGeneratePresignedUrlsMutation,
  apiSlice
} from "../../store/apiSlice";

export interface Message {
  text: string;
  sender: "user" | "bot";
  files?: Array<{ name: string; path?: string } | File>;
}

export default function Chat() {
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const chatId = searchParams.get("chatId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState<string>("");

  const justCreatedChatRef = useRef(false);

  // Reset typing state and streamed text when active chat changes
  useEffect(() => {
    if (justCreatedChatRef.current) {
      justCreatedChatRef.current = false;
      return;
    }
    setIsTyping(false);
    setStreamedText("");
  }, [chatId]);

  // Listen to WebSocket events forwarded from useKbSocket hook
  useEffect(() => {
    const handleWsEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const wsMessage = customEvent.detail;
      
      // If we receive a thinking status for our active chat
      if (wsMessage.type === 'AI_RESPONSE_PENDING' && wsMessage.data?.chat_id === chatId) {
        setIsTyping(true);
        setStreamedText("");
      }
      // If we receive stream chunks
      else if (wsMessage.type === 'AI_RESPONSE_CHUNK' && wsMessage.data?.chat_id === chatId) {
        const chunkContent = wsMessage.data?.content || "";
        if (chunkContent === '[START]') {
          setStreamedText("");
        } else if (chunkContent === '[END]') {
          setIsTyping(false);
          setStreamedText("");
          // Refetch messages query to show the updated DB messages list
          dispatch(apiSlice.util.invalidateTags(['Message']));
        } else {
          setStreamedText((prev) => prev + chunkContent);
        }
      }
      // If the AI response completes or ends for our active chat
      else if (
        (wsMessage.type === 'AI_RESPONSE_COMPLETE' || wsMessage.type === 'AI_RESPONSE_END') &&
        wsMessage.data?.chat_id === chatId
      ) {
        setIsTyping(false);
        setStreamedText("");
      }
    };

    window.addEventListener('kb-websocket-event', handleWsEvent);
    return () => {
      window.removeEventListener('kb-websocket-event', handleWsEvent);
    };
  }, [chatId]);

  // RTK Query hooks
  const { data: messagesRes, isLoading: messagesLoading } = useGetChatMessagesQuery(
    chatId || "",
    { skip: !chatId }
  );
  const [sendMessage] = useSendMessageMutation();
  const [generatePresignedUrls] = useGeneratePresignedUrlsMutation();

  // Convert backend messages schema to UI message schema
  const dbMessages = messagesRes?.data || [];
  const messages: Message[] = dbMessages.map((msg: any) => ({
    text: msg.content,
    sender: msg.role === "user" ? "user" : "bot",
    files: (msg.attachment_s3_paths || []).map((path: string, pIdx: number) => ({
      name: path.split("/").pop() || "Attachment",
      path: path,
      url: msg.attachment_s3_urls?.[pIdx] || undefined,
    })),
  }));

  // Append streaming chunk response if there's active streaming content
  const lastMessageIsUser = dbMessages.length > 0 && dbMessages[dbMessages.length - 1].role === "user";
  if (streamedText && lastMessageIsUser) {
    messages.push({
      text: streamedText,
      sender: "bot",
    });
  }

  const handleSend = async () => {
    if (!message.trim() && files.length === 0) return;

    try {
      setIsTyping(true);
      setStreamedText("");
      let attachmentS3Paths: string[] = [];

      // Step 1: If files are attached, upload them first
      if (files.length > 0) {
        const presignedRes = await generatePresignedUrls({
          files: files.map((file) => ({
            fileName: file.name,
            fileType: file.type || "application/octet-stream",
            fileSize: file.size,
          })),
        }).unwrap();

        const urls = presignedRes?.data?.urls || [];
        
        await Promise.all(
          files.map(async (file, idx) => {
            const uploadInfo = urls[idx];
            if (!uploadInfo) return;

            // Direct S3 Upload via PUT
            const s3Response = await fetch(uploadInfo.uploadUrl, {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type || "application/octet-stream",
              },
            });

            if (s3Response.ok) {
              attachmentS3Paths.push(uploadInfo.s3Key);
            } else {
              console.error(`S3 upload failed for ${file.name}`);
            }
          })
        );
      }

      // Step 2: Send Message to Backend
      const agentType = searchParams.get("agentType") || "recruitment";
      const res = await sendMessage({
        chat_id: chatId || undefined, // undefined will auto-create a new chat
        content: message,
        role: "user",
        title: message.substring(0, 30),
        assignment_id: assignmentId || undefined,
        attachment_s3_paths: attachmentS3Paths,
        agent_type: agentType,
      }).unwrap();

      setMessage("");
      setFiles([]);

      if (!chatId && res?.data?.chat_id) {
        justCreatedChatRef.current = true;
        navigate(`/dashboard/chat?assignmentId=${assignmentId}&chatId=${res.data.chat_id}&agentType=${agentType}`);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Error sending message.");
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#EFF2F6] relative overflow-y-auto pb-24">
      {messagesLoading ? (
        <div className="flex h-3/4 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B7EF0]"></div>
        </div>
      ) : (
        <MessageDisplay setMessages={() => {}} messages={messages} isTyping={isTyping} />
      )}
      {/* chat box part  */}
      <MessageBox
        message={message}
        files={files}
        setMessage={setMessage}
        setFiles={setFiles}
        onSend={handleSend}
      />
    </div>
  );
}
