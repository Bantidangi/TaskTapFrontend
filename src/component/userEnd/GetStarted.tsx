import React from "react";

const GetStarted = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Need Help Fast? Tap Into TaskTap!
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Hire reliable help for everyday tasks—or earn money with flexible
          gigs.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold">
            Post a Job
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Find a Job
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          How TaskTap Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 shadow-lg rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-blue-600">📋</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Post or Browse</h3>
            <p>Providers post tasks. Seekers browse jobs nearby.</p>
          </div>
          <div className="text-center p-6 shadow-lg rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-blue-600">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Work</h3>
            <p>Chat, agree, and get the job done.</p>
          </div>
          <div className="text-center p-6 shadow-lg rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-blue-600">💰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pay & Rate</h3>
            <p>Secure payment and leave a review.</p>
          </div>
        </div>
      </section>

      {/* Why Choose TaskTap Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Why TaskTap?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <span className="text-3xl text-blue-600">⏳</span>
            <h3 className="text-lg font-semibold mt-2">Fast & Easy</h3>
            <p>Post or apply in minutes.</p>
          </div>
          <div className="text-center">
            <span className="text-3xl text-blue-600">✅</span>
            <h3 className="text-lg font-semibold mt-2">Trusted Help</h3>
            <p>Verified workers you can rely on.</p>
          </div>
          <div className="text-center">
            <span className="text-3xl text-blue-600">📅</span>
            <h3 className="text-lg font-semibold mt-2">Flexible Gigs</h3>
            <p>Work when you want, how you want.</p>
          </div>
          <div className="text-center">
            <span className="text-3xl text-blue-600">🔒</span>
            <h3 className="text-lg font-semibold mt-2">Secure Payments</h3>
            <p>Funds held safely until the job’s done.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          What People Are Saying
        </h2>
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-0 md:flex md:gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="italic mb-4">
              "TaskTap saved me when I needed help moving last minute!"
            </p>
            <p className="font-semibold">– Sarah, Job Provider</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <p className="italic mb-4">
              "I earned $50 cleaning a home in just 2 hours."
            </p>
            <p className="font-semibold">– Mike, Job Seeker</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Explore Popular Tasks
        </h2>
        <div className="flex overflow-x-auto gap-6 max-w-5xl mx-auto pb-4">
          <div className="min-w-[250px] p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold">Move Furniture</h3>
            <p className="text-gray-600">Pay: $30/hr</p>
            <p className="text-gray-600">Location: Downtown</p>
            <button className="mt-4 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
              View Details
            </button>
          </div>
          <div className="min-w-[250px] p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold">Clean Home</h3>
            <p className="text-gray-600">Pay: $25/hr</p>
            <p className="text-gray-600">Location: Suburbs</p>
            <button className="mt-4 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
              View Details
            </button>
          </div>
          <div className="min-w-[250px] p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold">Run Errands</h3>
            <p className="text-gray-600">Pay: $20/hr</p>
            <p className="text-gray-600">Location: City Center</p>
            <button className="mt-4 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
              View Details
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Get Started? Join TaskTap Today!
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100">
            Post a Job
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Find a Job
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">TaskTap</h3>
          </div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              FAQ
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-blue-400">
              Twitter
            </a>
            <a href="#" className="text-blue-400">
              Instagram
            </a>
            <a href="#" className="text-blue-400">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;
