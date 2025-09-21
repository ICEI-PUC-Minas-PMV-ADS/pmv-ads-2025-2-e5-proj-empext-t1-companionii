import SkynetIcon from '../../assets/companion';

const Logo = ({ className = '', size = 'medium' }) => {
  const sizes = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16',
  };

  const iconSizes = {
    small: '24',
    medium: '32',
    large: '48',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizes[size]} flex items-center`}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SkynetIcon size={iconSizes[size]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
