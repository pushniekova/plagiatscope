
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="text-xl font-medium tracking-tight flex items-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      <span className="button-gradient text-white p-1 rounded-md flex items-center justify-center">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="rainbow-text font-bold">ForgenHub</span>
    </Link>
  );
};

export default Logo;
