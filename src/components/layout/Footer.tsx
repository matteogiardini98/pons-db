import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t border-border py-12 mt-12">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h4 className="text-base font-semibold">pons database</h4>
            <p className="text-sm text-muted-foreground">pons is an open-source database of AI solutions to help companies find the right tools for their business problems.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Database
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/add-tool" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Add a Tool
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">about</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Changelog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold">contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:info@aisolutionsdatabase.com" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors link-underline">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} AI Solutions Database. Open-source project.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;