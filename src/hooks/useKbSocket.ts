import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../store/apiSlice';

export function useKbSocket(userId: number | undefined) {
  const dispatch = useDispatch() as any;

  useEffect(() => {
    if (!userId) return;

    // Connect to WebSocket server via nginx proxy path
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const wsProtocol = apiBase.startsWith('https') ? 'wss' : 'ws';
    const wsHost = apiBase.replace(/^https?:\/\//, '');
    const socketUrl = `${wsProtocol}://${wsHost}/ws?userId=${userId}`;
    console.log(`[WS] Connecting to ${socketUrl}`);
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('[WS] Connected to Chats WebSocket');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('[WS] Received message:', message);

        // Dispatch a custom window event for any component to listen to
        window.dispatchEvent(new CustomEvent('kb-websocket-event', { detail: message }));

        if (message.type === 'KB_STATUS_UPDATE') {
          console.log('[WS] Knowledge base status updated! Invalidating cache...');
          // Invalidate the KnowledgeBase tag to trigger a refetch of all KB queries
          dispatch(
            apiSlice.util.invalidateTags(['KnowledgeBase'])
          );
        } else if (message.type === 'AI_RESPONSE_COMPLETE') {
          console.log('[WS] AI response complete! Updating chat messages cache...');
          const chatId = message.data?.chat_id;
          const aiResponse = message.data?.ai_response;
          if (chatId && aiResponse) {
            dispatch(
              apiSlice.util.updateQueryData('getChatMessages', chatId, (draft) => {
                if (!draft) {
                  return { success: true, statusCode: 200, data: [aiResponse] };
                }
                if (!draft.data) {
                  draft.data = [];
                }
                const exists = draft.data.some((m: any) => m.id === aiResponse.id);
                if (!exists) {
                  draft.data.push(aiResponse);
                }
              })
            );
          }
          dispatch(apiSlice.util.invalidateTags(['Chat']));
        }
      } catch (err) {
        console.error('[WS] Error parsing message:', err);
      }
    };

    socket.onerror = (error) => {
      console.error('[WS] WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('[WS] Chats WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [userId, dispatch]);
}
