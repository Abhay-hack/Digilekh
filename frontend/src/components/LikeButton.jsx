import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = ({ liked, handleLike, blog }) => {
  return (
    <div className="ml-[24%] mt-8 flex items-center space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center ${liked ? 'bg-red-500 ' : ''} py-2 px-2 rounded-md`}
      >

        {liked ? (
          <FaHeart className="text-white text-xl" /> 
        ) : (
          <FaRegHeart className="text-gray-500 text-xl" />
        )}
      </button>

    </div>
  );
};

export default LikeButton;
