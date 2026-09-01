import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    fetchMessages,
    replyToMessage,
    markMessageAsRead
} from "../services/api";

function Messages() {
    const { user, setUnreadCount } = useAuth();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [replyText, setReplyText] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }

        const loadMessages = async () => {
            try {
                const data = await fetchMessages();

                setMessages(data);

                const unreadMessages = data.filter(
                    (message) =>
                        message.receiver_id === user.id &&
                        !message.is_read
                );

                setUnreadCount(unreadMessages.length);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [user, setUnreadCount]);

    const handleOpenMessage = async (message) => {
        if (message.is_read || message.receiver_id !== user.id) {
            return;
        }

        try {
            const updatedMessage = await markMessageAsRead(message.id);

            setMessages((currentMessages) =>
                currentMessages.map((currentMessage) =>
                    currentMessage.id === updatedMessage.id
                        ? updatedMessage
                        : currentMessage
                )
            );

            setUnreadCount((currentCount) =>
                Math.max(currentCount - 1, 0)
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const handleReplyChange = (messageId, value) => {
        setReplyText((currentReplies) => ({
            ...currentReplies,
            [messageId]: value
        }));
    };

    const handleReply = async (messageId) => {
        const content = replyText[messageId]?.trim();

        if (!content) {
            return;
        }

        setSendingReply(true);
        setError("");

        try {
            const newReply = await replyToMessage(
                messageId,
                content
            );

            setMessages((currentMessages) => [
                newReply,
                ...currentMessages
            ]);

            setReplyText((currentReplies) => ({
                ...currentReplies,
                [messageId]: ""
            }));

            setReplyingTo(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSendingReply(false);
        }
    };

    if (!user || loading) {
        return (
            <main className="messages-page">
                <p>Loading messages...</p>
            </main>
        );
    }

    return (
        <main className="messages-page">
            <section className="messages-container">

                <div className="messages-header">
                    <p className="section-label">MESSAGES</p>

                    <h2>Messages</h2>

                    <p>
                        {user.role === "landlord"
                            ? "Respond to enquiries from house hunters about your properties."
                            : "Contact landlords and keep track of your property enquiries."}
                    </p>
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {messages.length === 0 ? (
                    <div className="messages-empty">
                        <h3>No messages yet</h3>

                        <p>
                            {user.role === "landlord"
                                ? "When a house hunter enquires about one of your properties, their message will appear here."
                                : "When you enquire about a property, your conversation with the landlord will appear here."}
                        </p>
                    </div>
                ) : (
                    <div className="messages-list">
                        {messages.map((message) => {
                            const isReceived =
                                message.receiver_id === user.id;

                            const otherUser = isReceived
                                ? message.sender
                                : message.receiver;

                            return (
                                <article
                                    key={message.id}
                                    className={`message-card ${
                                        !message.is_read &&
                                        isReceived
                                            ? "message-unread"
                                            : ""
                                    }`}
                                >
                                    <div className="message-card-header">
                                        <div>
                                            <p className="message-person">
                                                {isReceived
                                                    ? `From: ${otherUser?.username || "Unknown user"}`
                                                    : `To: ${otherUser?.username || "Unknown user"}`}
                                            </p>

                                            <p className="message-property">
                                                {message.property?.title ||
                                                    "Property"}
                                            </p>
                                        </div>

                                        {!message.is_read &&
                                            isReceived && (
                                                <span className="unread-badge">
                                                    New
                                                </span>
                                            )}
                                    </div>

                                    <div className="message-content">
                                        {message.content}
                                    </div>

                                    <div className="message-footer">
                                        <span>
                                            {message.created_at
                                                ? new Date(
                                                      message.created_at
                                                  ).toLocaleString()
                                                : ""}
                                        </span>

                                        <div className="message-actions">
                                            {isReceived &&
                                                !message.is_read && (
                                                    <button
                                                        type="button"
                                                        className="open-message-button"
                                                        onClick={() =>
                                                            handleOpenMessage(
                                                                message
                                                            )
                                                        }
                                                    >
                                                        Open Message
                                                    </button>
                                                )}

                                            <button
                                                type="button"
                                                className="reply-button"
                                                onClick={() =>
                                                    setReplyingTo(
                                                        message.id
                                                    )
                                                }
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>

                                    {replyingTo === message.id && (
                                        <div className="reply-form">
                                            <textarea
                                                value={
                                                    replyText[
                                                        message.id
                                                    ] || ""
                                                }
                                                onChange={(event) =>
                                                    handleReplyChange(
                                                        message.id,
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Write your reply..."
                                                rows="4"
                                            />

                                            <div className="reply-actions">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReply(
                                                            message.id
                                                        )
                                                    }
                                                    disabled={sendingReply}
                                                >
                                                    {sendingReply
                                                        ? "Sending..."
                                                        : "Send Reply"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="cancel-reply-button"
                                                    onClick={() =>
                                                        setReplyingTo(null)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Messages;

