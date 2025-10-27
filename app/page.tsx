'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)
  const section5Ref = useRef<HTMLDivElement>(null)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowNav(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (section: number) => {
    const percentages = [0, 25, 50, 70, 85]
    const height = mainRef.current?.offsetHeight || 1200
    const targetY = (height * percentages[section - 1]) / 100
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

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
            start: '68%',
            end: '75%',
            scrub: 1,
          },
        })
      }

      // Section 4 - People (rotate in from top)
      if (section4Ref.current) {
        gsap.set(section4Ref.current, { opacity: 0, rotationX: -90, transformPerspective: 1000 })
        
        // Enter animation - rotate in
        gsap.to(section4Ref.current, {
          rotationX: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '70%',
            end: '80%',
            scrub: 1,
          },
        })
        
        // Exit animation - fade out
        gsap.to(section4Ref.current, {
          opacity: 0,
          scale: 0.9,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '82%',
            end: '87%',
            scrub: 1,
          },
        })
      }

      // Section 5 - Contact (slides in from right, stays)
      if (section5Ref.current) {
        gsap.set(section5Ref.current, { opacity: 0, x: 200 })
        
        gsap.to(section5Ref.current, {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainRef.current,
            start: '85%',
            end: '95%',
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
      <div ref={mainRef} style={{ height: '1200vh' }}></div>

      {/* Fixed viewport container */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Navigation */}
        <nav 
          className={`absolute top-0 left-0 right-0 z-50 glass-effect transition-transform duration-300 ${
            showNav ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg md:text-2xl font-bold text-gradient">
                NYU Chinese Mei Society
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                <button 
                  onClick={() => scrollToSection(1)}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection(2)}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection(3)}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
                >
                  Events
                </button>
                <button 
                  onClick={() => scrollToSection(4)}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
                >
                  People
                </button>
                <button 
                  onClick={() => scrollToSection(5)}
                  className="text-gray-700 hover:text-primary-600 transition-colors font-semibold"
                >
                  Contact
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      scrollToSection(1)
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-semibold text-left py-2"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection(2)
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-semibold text-left py-2"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection(3)
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-semibold text-left py-2"
                  >
                    Events
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection(4)
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-semibold text-left py-2"
                  >
                    People
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection(5)
                      setMobileMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-primary-600 transition-colors font-semibold text-left py-2"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
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
              Founded in 1988 | CMS is one of the largest and oldest running Chinese cultural clubs in NYU.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScOoEH2RMAOoe1VMA-PPr7gkoFAuX3aRCESC_vGqE6jsFtJRw/closedform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                Apply to Eboard
              </a>
              <a
                href="https://engage.nyu.edu/organization/chinese-mei-society-all-university"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-all transform hover:scale-105 inline-block"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: About - Slides up from bottom, scales down to exit */}
        <div
          ref={section2Ref}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-white pointer-events-none"
        >
          <div className="max-w-7xl w-full px-6 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                  About Our Mission
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Chinese Mei Society is one of the largest Chinese cultural organizations on campus, dedicated to celebrating and promoting Chinese culture. We host cultural events that give students the opportunity to experience and appreciate Chinese traditions, as well as social events that help students connect, build communities, and find their NYU family. Our events are open to all students—regardless of gender, religion, or ethnicity—and we warmly welcome anyone interested in learning more about Chinese culture
                </p>
              </div>

              {/* Right side - Photo Collage */}
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
                {/* Photo 1 - Large left */}
                <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-xl group relative">
                  <Image
                    src="/1cms.png"
                    alt="NYU Chinese Mei Society Event"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Photo 2 - Top right */}
                <div className="col-span-2 row-span-1 rounded-3xl overflow-hidden shadow-xl group relative">
                  <Image
                    src="/2cms.png"
                    alt="NYU Chinese Mei Society Event"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Photo 3 - Bottom right small */}
                <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-xl group relative">
                  <Image
                    src="/3cms.png"
                    alt="NYU Chinese Mei Society Event"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Photo 4 - Bottom right small */}
                <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-xl group relative">
                  <Image
                    src="/4cms.png"
                    alt="NYU Chinese Mei Society Event"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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

        {/* Section 4: People - Rotates in from top */}
        <div
          ref={section4Ref}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-primary-50 pointer-events-none overflow-y-auto"
        >
          <div className="max-w-7xl w-full mx-auto px-6 py-24">
            <div className="text-center mb-12 pt-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
                Meet Our People
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated individuals bringing our community together
              </p>
            </div>

            {/* Executive Board */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Executive Board
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-3xl">
                    👨‍💼
                  </div>
                  <h4 className="font-bold text-base mb-1">James Chen</h4>
                  <p className="text-primary-600 font-semibold text-sm mb-1">President</p>
                  <p className="text-gray-500 text-xs">Class of 2025</p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center text-3xl">
                    👩‍💼
                  </div>
                  <h4 className="font-bold text-base mb-1">Sarah Liu</h4>
                  <p className="text-primary-600 font-semibold text-sm mb-1">Vice President</p>
                  <p className="text-gray-500 text-xs">Class of 2025</p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-500 to-red-500 flex items-center justify-center text-3xl">
                    👨
                  </div>
                  <h4 className="font-bold text-base mb-1">David Wong</h4>
                  <p className="text-primary-600 font-semibold text-sm mb-1">Treasurer</p>
                  <p className="text-gray-500 text-xs">Class of 2026</p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent-500 to-primary-400 flex items-center justify-center text-3xl">
                    👩
                  </div>
                  <h4 className="font-bold text-base mb-1">Emily Zhang</h4>
                  <p className="text-primary-600 font-semibold text-sm mb-1">Secretary</p>
                  <p className="text-gray-500 text-xs">Class of 2026</p>
                </div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Events Team */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Events Team
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-xl flex-shrink-0">
                      👨‍🎓
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Michael Wang</h4>
                      <p className="text-xs text-primary-600">Events Director</p>
                      <p className="text-xs text-gray-500">Class of 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center text-xl flex-shrink-0">
                      👩‍🎓
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Lisa Chen</h4>
                      <p className="text-xs text-primary-600">Events Coordinator</p>
                      <p className="text-xs text-gray-500">Class of 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistics Team */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Logistics Team
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-primary-500 flex items-center justify-center text-xl flex-shrink-0">
                      👨‍💻
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Kevin Lin</h4>
                      <p className="text-xs text-primary-600">Logistics Head</p>
                      <p className="text-xs text-gray-500">Class of 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-xl flex-shrink-0">
                      👩‍💻
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Amy Xu</h4>
                      <p className="text-xs text-primary-600">Operations Manager</p>
                      <p className="text-xs text-gray-500">Class of 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphics Team */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Graphics Team
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-red-400 flex items-center justify-center text-xl flex-shrink-0">
                      👨‍🎨
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Jason Zhou</h4>
                      <p className="text-xs text-primary-600">Design Lead</p>
                      <p className="text-xs text-gray-500">Class of 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-red-500 flex items-center justify-center text-xl flex-shrink-0">
                      👩‍🎨
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Jessica Yang</h4>
                      <p className="text-xs text-primary-600">Graphic Designer</p>
                      <p className="text-xs text-gray-500">Class of 2027</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Team */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Marketing Team
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xl flex-shrink-0">
                      👨‍💼
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Ryan Lee</h4>
                      <p className="text-xs text-primary-600">Marketing Director</p>
                      <p className="text-xs text-gray-500">Class of 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-primary-600 flex items-center justify-center text-xl flex-shrink-0">
                      👩‍💼
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Sophia Huang</h4>
                      <p className="text-xs text-primary-600">Social Media Lead</p>
                      <p className="text-xs text-gray-500">Class of 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Senior Advisor */}
            <div className="text-center pb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Senior Advisor
              </h3>
              <div className="inline-block bg-white rounded-2xl p-6 shadow-xl">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-4xl">
                  👨‍🏫
                </div>
                <h4 className="font-bold text-xl mb-1">Professor Wei Chen</h4>
                <p className="text-primary-600 font-semibold mb-1">Senior Advisor</p>
                <p className="text-gray-500 text-sm">Faculty Mentor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Contact - Slides in from right */}
        <div
          ref={section5Ref}
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
