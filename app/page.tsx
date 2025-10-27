'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1 - Hero (starts visible, slides up and fades out)
      if (section1Ref.current) {
        gsap.set(section1Ref.current, { opacity: 1, y: 0 })
        
        gsap.to(section1Ref.current, {
          y: -100,
          opacity: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: '25%',
            scrub: 1,
          },
        })
      }

      // Section 2 - About (slides up from bottom, then exits by shrinking)
      if (section2Ref.current) {
        gsap.set(section2Ref.current, { opacity: 0, y: 100 })
        
        // Enter animation
        gsap.to(section2Ref.current, {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '25%',
            end: '35%',
            scrub: 1,
          },
        })
        
        // Exit animation - scale down
        gsap.to(section2Ref.current, {
          scale: 0.8,
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '45%',
            end: '55%',
            scrub: 1,
          },
        })
      }

      // Section 3 - Events (zooms in from center)
      if (section3Ref.current) {
        gsap.set(section3Ref.current, { opacity: 0, scale: 0.5 })
        
        // Enter animation - zoom in
        gsap.to(section3Ref.current, {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '50%',
            end: '60%',
            scrub: 1,
          },
        })
        
        // Exit animation - slide left
        gsap.to(section3Ref.current, {
          x: -200,
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '70%',
            end: '80%',
            scrub: 1,
          },
        })
      }

      // Section 4 - Contact (slides in from right, stays)
      if (section4Ref.current) {
        gsap.set(section4Ref.current, { opacity: 0, x: 200 })
        
        gsap.to(section4Ref.current, {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '75%',
            end: '90%',
            scrub: 1,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Scrollable spacer */}
      <div ref={mainRef} style={{ height: '500vh' }}></div>

      {/* Fixed viewport container */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 glass-effect">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gradient">
                NYU Mei Society
              </div>
            </div>
          </div>
        </nav>

        {/* Section 1: Hero - Slides up and fades */}
        <div
          ref={section1Ref}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white via-primary-50 to-accent-50"
        >
          <div className="max-w-5xl w-full text-center px-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-gradient block mt-2">
                NYU Chinese Mei Society
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A vibrant community celebrating Chinese culture and traditions at
              New York University
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg">
                Join Us
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: About - Slides up from bottom, scales down to exit */}
        <div
          ref={section2Ref}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-white pointer-events-none"
        >
          <div className="max-w-6xl w-full px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                About Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="text-6xl mb-6 text-center">🎌</div>
                <h3 className="text-2xl font-bold mb-4 text-center">Culture</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Celebrating rich Chinese traditions and cultural heritage
                  through festivals and events
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="text-6xl mb-6 text-center">🎭</div>
                <h3 className="text-2xl font-bold mb-4 text-center">Arts</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Exploring traditional Chinese arts including calligraphy,
                  music, and dance performances
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="text-6xl mb-6 text-center">🤝</div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Community
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Building lasting connections and friendships within the NYU
                  community and beyond
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Events - Zooms in from center, slides left to exit */}
        <div
          ref={section3Ref}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-accent-50 pointer-events-none"
        >
          <div className="max-w-7xl w-full px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Cultural Events & Workshops
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Join us for exciting events celebrating Chinese culture
                throughout the year
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-56 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-8xl">
                  🎏
                </div>
                <div className="p-8">
                  <div className="text-primary-600 font-semibold mb-2">
                    Spring Season
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Spring Festival</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Join us for traditional dragon dances, lantern displays, and
                    delicious Chinese cuisine to celebrate the Lunar New Year.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-56 bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-8xl">
                  🎨
                </div>
                <div className="p-8">
                  <div className="text-accent-600 font-semibold mb-2">
                    Monthly Workshops
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Calligraphy Class</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Learn the ancient art of Chinese calligraphy from master
                    artists. All materials provided for beginners.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-56 bg-gradient-to-br from-primary-400 to-accent-600 flex items-center justify-center text-8xl">
                  🍜
                </div>
                <div className="p-8">
                  <div className="text-primary-600 font-semibold mb-2">
                    Social Events
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Dumpling Night</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Join us for an evening of making traditional Chinese
                    dumplings and learning about their cultural significance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Contact - Slides in from right */}
        <div
          ref={section4Ref}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600 text-white pointer-events-none"
        >
          <div className="max-w-5xl w-full text-center px-6 py-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Join Our Community
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Whether you're interested in Chinese culture or simply want to make
              new friends, we welcome you to join NYU Chinese Mei Society.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-white/80">mei.society@nyu.edu</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                <p className="text-white/80">@nyumeisociety</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-white/80">NYU Campus, NYC</p>
              </div>
            </div>

            <button className="px-12 py-6 bg-white text-primary-600 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl pointer-events-auto">
              Get in Touch
            </button>

            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-white/60">
                © 2024 NYU Chinese Mei Society. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}
