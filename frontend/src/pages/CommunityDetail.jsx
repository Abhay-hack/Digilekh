import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
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
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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

  const handleDelete = async () => {
    try {
      await fetch(`/community/${communityId}`, { method: 'DELETE' });
      setMessage('Community deleted successfully');
      setTimeout(() => {
        navigate('/community'); // Redirect after deletion
      }, 2000);
    } catch (err) {
      console.error('Error deleting community:', err);
      setError('Failed to delete community.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header /> {/* Include your header component */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10 mb-16">
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
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>

        {/* Success Message */}
        {message && <div className="text-green-500 text-center mt-2">{message}</div>}

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
    </div>
  );
};

export default CommunityDetail;
