
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-medium tracking-tight flex items-center gap-2 mb-3">
              <span className="bg-primary text-primary-foreground p-1 rounded-md">PS</span>
              <span>PlagiatScope</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Advanced plagiarism detection service for students, teachers, and content creators. 
              Check your text for originality with precision and ease.
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/check" className="text-muted-foreground hover:text-primary transition-colors">
                  Check Text
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {currentYear} PlagiatScope. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            Made with precision and care
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
