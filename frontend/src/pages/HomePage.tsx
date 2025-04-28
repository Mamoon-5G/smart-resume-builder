import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { user } = useAuth(); // Get the user from the AuthContext

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={user} />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl mb-6">
                  Build Your Resume with <span className="text-blue-600">AI</span> Power
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-xl">
                  Create professional, tailored resumes in minutes with our AI-powered resume builder. Get expert recommendations and stand out to employers.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {user ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="w-full sm:w-auto">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/signup">
                        <Button size="lg" className="w-full sm:w-auto">
                          Get Started
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          Log In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/resume-builder-hero.svg"
                  alt="Resume Builder Illustration"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Resume+Builder";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Build Better Resumes, Faster
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our AI-powered platform helps you create professional, tailored resumes that stand out to employers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Content</h3>
                <p className="text-gray-600">
                  Our AI helps you phrase your experiences professionally and suggests improvements to make your resume stand out.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Templates</h3>
                <p className="text-gray-600">
                  Choose from multiple professional templates designed to impress employers across different industries.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy PDF Export</h3>
                <p className="text-gray-600">
                  Download your resume as a professional PDF file that's ready to share with potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl mb-6">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of job seekers who have created winning resumes with our AI-powered platform.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600">
                  Get Started — It's Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
