const FeatureCard = ({ icon, title, bgColor = 'bg-gray-100' }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div
        className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center`}
      >
        <img src={icon} alt={title} className="w-4 h-4" />
      </div>
      <div>{title && <p className="text-gray-600 text-xs">{title}</p>}</div>
    </div>
  );
};

export default FeatureCard;
