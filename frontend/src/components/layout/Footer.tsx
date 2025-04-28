
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">Resume</span>
              <span className="text-gray-800 text-xl font-bold">AI</span>
            </Link>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center text-gray-500 text-sm">
              &copy; {currentYear} ResumeAI. All rights reserved.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex justify-center space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About Us
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
