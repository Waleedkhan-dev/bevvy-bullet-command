import { BiSolidLike } from "react-icons/bi";
import { FaComment, FaShare } from "react-icons/fa";


interface FacebookPostPreviewProps {
  caption: string;
  imageUrl?: string;
}

const FacebookPostPreview = ({ caption, imageUrl }: FacebookPostPreviewProps) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-blue-600/30 max-w-md">
      {/* Header */}
      <div className="bg-gray-800 p-3 border-b border-gray-600">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
          <div>
            <p className="text-white font-semibold text-sm">Bevvy Bullet</p>
            <p className="text-gray-400 text-xs">Just now · 🌍</p>
          </div>
        </div>
      </div>

      {/* Caption Text First */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 group">
        <p className="text-white text-sm leading-relaxed line-clamp-none transition-all cursor-default">
          {caption || "No caption added"}
        </p>
      </div>

      {/* Image/Video */}
      {imageUrl && (
        <div className="bg-black aspect-square">
          <img 
            src={imageUrl} 
            alt="post" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700 text-gray-400 text-xs flex justify-between">
        <span className="flex items-center gap-1"><BiSolidLike />
 2.4K</span>
        <span className="flex item-center gap-1"><FaComment/>
 156</span>
        <span className="flex item-center gap-1"><FaShare />
 34</span>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-800 p-3 border-t border-gray-600 flex gap-4 text-gray-400 text-sm">
        <button className="flex-1 hover:bg-gray-700 rounded p-2 transition-colors font-medium">
          👍 Like
        </button>
        <button className="flex-1 hover:bg-gray-700 rounded p-2 transition-colors font-medium">
          💬 Comment
        </button>
        <button className="flex-1 hover:bg-gray-700 rounded p-2 transition-colors font-medium">
          ↗️ Share
        </button>
      </div>
    </div>
  );
};

export default FacebookPostPreview;