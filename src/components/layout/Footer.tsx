
import { Link } from 'react-router-dom';
import EmailSubscription from './EmailSubscription';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-12 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-base font-semibold">pons database</h4>
            <p className="text-sm text-muted-foreground">pons is an open-source database of ai solutions to help companies find the right tools for their business problems.</p>
            <EmailSubscription />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  database
                </Link>
              </li>
              <li>
                <Link to="/add-tool" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  add a tool
                </Link>
              </li>
              <li>
                <Link to="/manifesto" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  manifesto
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">about</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/manifesto" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  manifesto
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  changelog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  github
                </a>
              </li>
              <li>
                <a href="mailto:info@aisolutionsdatabase.com" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} ai solutions database. open-source project.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">privacy</Link>
            <Link to="#" className="hover:text-primary transition-colors">terms</Link>
            <Link to="#" className="hover:text-primary transition-colors">cookie policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
