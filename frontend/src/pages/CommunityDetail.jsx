import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import EmojiPicker from "emoji-picker-react";
import Header from '../components/Header'; // Assuming you have a header component

// Connect to the socket server
const socket = io('http://localhost:5000');

const CommunityDetail = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [messages, setMessages] = useState([]); // For chat messages
  const [message, setMessage] = useState(''); // Current message input
  const [error, setError] = useState(null); // For handling errors
  const [isCreator, setIsCreator] = useState(false); // Flag to check if the user is the creator
  const navigate = useNavigate();
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiTarget, setEmojiTarget] = useState(null);
  const emojiButtonRef = useRef(null); // Reference to the emoji button

  const handleEmojiClick = (emojiObject) => {
    if (emojiTarget === "message") {
      setMessage(prev => prev + emojiObject.emoji); // Add emoji to message input
    }
    setShowEmojiPicker(false); // Hide the emoji picker after selecting
  };

  useEffect(() => {
    // Fetch community details
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`http://localhost:5000/community/${communityId}`);
        const communityData = await response.json();
        setCommunity(communityData);

        // Check if the current user is the creator
        // Assuming the user object is available via context or similar
        // setIsCreator(currentUser.id === communityData.creatorId);
      } catch (err) {
        setError('Failed to fetch community details.');
        console.error('Error fetching community:', err);
      }
    };

    fetchCommunity();

    socket.emit('joinRoom', communityId);

    socket.on('receiveMessage', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    socket.on('error', (err) => {
      setError(err.message); // Handle errors (e.g., token issues)
    });

    return () => {
      socket.emit('leaveRoom', communityId);
    };
  }, [communityId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { communityId, message });
      setMessage('');
    }
  };

  return (
    <div className="bg-[#86DEB7] min-h-screen">
      <Header /> {/* Include your header component */}
      <div className="max-w-4xl mx-auto bg-[#C7CEDB] rounded-lg shadow-lg p-8 mt-10 mb-16">
        <h1 className='text-4xl'>Chat-Room</h1>

        {/* Community Info Section */}
        {community && community.name && (
          <div className="mb-8 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800">{community.name}</h2>
            <p className="text-lg text-gray-600 mt-2">{community.description}</p>
          </div>
        )}

        {/* Messages Section */}
        <div className="messages-container bg-gray-50 p-4 rounded-lg shadow-inner h-96 overflow-y-auto mb-8">
          <div className="messages space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="bg-blue-100 p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-gray-800">
                  <strong>Anonymous:</strong> {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 items-center">
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
              placeholder="Type your message..."
            />
            <button
              ref={emojiButtonRef} // Assign ref to emoji button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none mt-1"
              onClick={() => {
                setEmojiTarget("message"); // Set target to message input
                setShowEmojiPicker((prev) => !prev);
              }}
            >
              😊
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>

        {/* Delete Community button, shown only if the user is the creator */}
        {isCreator && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Community
            </button>
          </div>
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bg-white shadow-lg rounded-md border p-2"
          style={{
            top: `${emojiButtonRef.current?.getBoundingClientRect().top + window.scrollY - 400}px`, // Adjust position below the emoji button
            left: `${emojiButtonRef.current?.getBoundingClientRect().right}px`, // Align with the emoji button
            zIndex: 10,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;
