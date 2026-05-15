import Header from '@/components/custom/Header'
import { Edit, Share2, FileText } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="absolute z-0 w-full h-full bg-none bg-no-repeat"
        style={{
          backgroundImage: "url('/svnit_entrance.jpg')",
          backgroundPosition: "center top",
          backgroundSize: "100vw 100vh"
        }}
      />
      <div className="absolute inset-0 z-10 bg-black bg-opacity-60" />

      <div className="relative z-20">
        <Header />
        <section className="flex items-center justify-center min-h-[90vh] px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              SVNIT Resume Builder
            </h1>
            <p className="mb-10 text-lg text-gray-300 md:text-xl">
              Create, Customize & Share Your Professional Resume in Minutes
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white transition bg-primary rounded-lg hover:bg-primary/90"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </section>

        <section className="bg-white text-black py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">How it Works?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<FileText className="w-8 h-8 text-blue-600" />}
                title="Fill Your Resume Details"
                desc="Enter your personal, educational, and professional details in a simple interface."
              />
              <FeatureCard
                icon={<Edit className="w-8 h-8 text-blue-600" />}
                title="Customize Your Resume"
                desc="Easily edit sections, rearrange fields, and tweak the design to match your style."
              />
              <FeatureCard
                icon={<Share2 className="w-8 h-8 text-blue-600" />}
                title="Share via Live Link"
                desc="Generate a unique link to share your resume instantly with anyone."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  )
}

export default Home