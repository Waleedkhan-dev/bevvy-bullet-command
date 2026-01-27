interface TikTokPostPreviewProps {
  caption: string;
  imageUrl?: string;
}

const TikTokPostPreview = ({ caption, imageUrl }: TikTokPostPreviewProps) => {
  return (
    <div className="bg-black rounded-lg overflow-hidden border border-pink-500/30 max-w-sm relative">
      {/* Video/Image Background - Full Square */}
      <div className="bg-black aspect-square relative">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="post" 
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Right Side Action Bar */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-10">
          <button className="text-white text-2xl hover:scale-110 transition-transform">❤️</button>
          <button className="text-white text-2xl hover:scale-110 transition-transform">💬</button>
          <button className="text-white text-2xl hover:scale-110 transition-transform">🔖</button>
          <button className="text-white text-2xl hover:scale-110 transition-transform">↗️</button>
        </div>

        {/* Bottom Caption Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {/* Profile */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500"></div>
            <span className="text-white font-semibold text-sm">@bevvy_bullet</span>
            <button className="ml-auto bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-colors">
              + Follow
            </button>
          </div>

          {/* Caption */}
          <div className="group">
            <p className="text-white text-sm line-clamp-none transition-all cursor-default leading-tight">
              {caption || "No caption added"}
            </p>
          </div>

          {/* Hashtags/Sound */}
          <div className="flex items-center gap-2 mt-2 text-gray-200 text-xs">
            <span>🎵 Original Sound</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TikTokPostPreview;