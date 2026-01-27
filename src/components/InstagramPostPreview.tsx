interface InstagramPostPreviewProps {
  caption: string;
  imageUrl?: string;
}

const InstagramPostPreview = ({ caption, imageUrl }: InstagramPostPreviewProps) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-purple-500/30 max-w-sm">
      {/* Header */}
      <div className="bg-gray-800 p-3 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"></div>
            <div>
              <p className="text-white font-semibold text-sm">bevvy_bullet</p>
              <p className="text-gray-400 text-xs">Just now</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">⋯</button>
        </div>
      </div>

      {/* Image/Video (Square Format) */}
      {imageUrl && (
        <div className="bg-black aspect-square">
          <img 
            src={imageUrl} 
            alt="post" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Engagement Buttons */}
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex gap-4 text-white text-lg">
        <button className="hover:text-gray-300 transition-colors">❤️</button>
        <button className="hover:text-gray-300 transition-colors">💬</button>
        <button className="hover:text-gray-300 transition-colors">↗️</button>
        <button className="ml-auto hover:text-gray-300 transition-colors">🔖</button>
      </div>

      {/* Engagement Stats */}
      <div className="bg-gray-800 px-4 py-2 text-white text-sm font-semibold">
        👍 2.4K likes
      </div>

      {/* Caption */}
      <div className="bg-gray-800 px-4 py-3 group">
        <p className="text-white text-sm leading-relaxed line-clamp-2 line-clamp-none transition-all cursor-default">
          <span className="font-semibold">bevvy_bullet </span>
          <span>{caption || "No caption added"}</span>
        </p>
      </div>
    </div>
  );
};

export default InstagramPostPreview;