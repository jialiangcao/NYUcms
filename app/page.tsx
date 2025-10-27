'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// People data arrays
const executiveBoard = [
  { name: 'Serena Chen', title: 'President', school: 'CAS 2027', picture: 'serenachen.jpg' },
  { name: 'Anji Zhou', title: 'President', school: 'CAS 2027', picture: 'anjizhou.jpg' },
  { name: 'Stella Lin', title: 'Vice President', school: 'CAS 2026', picture: 'stellalin.png' },
  { name: 'Steven Lo', title: 'Vice President', school: 'Tandon 2026', picture: 'stevenlo.jpeg' },
]

const eventsTeam = [
  { name: 'Annie Soon', title: 'Events Director', school: 'CAS 2027', picture: 'anniesoon.jpeg' },
  { name: 'Gary Li', title: 'Events Team', school: 'CAS 2028', picture: 'garyli.jpeg' },
  { name: 'Jonathan Chen', title: 'Events Team', school: 'CAS 2026', picture: 'jonathanchen.jpeg' },
  { name: 'John Zhang', title: 'Events Team', school: 'Stern 2028', picture: 'johnzhang.jpeg' },
  { name: 'Alyssa Chen', title: 'Events Team', school: 'Tandon 2028', picture: 'alyssachen.jpeg' },
  { name: 'Emily Ma', title: 'Events Team', school: 'Meyers 2029', picture: 'emilyma.png' },
]

const logisticsTeam = [
  { name: 'Hoi Chan', title: 'Logistics Director', school: 'CAS 2028', picture: 'hoichan.jpg' },
  { name: 'Michael Liu', title: 'Logistics Director', school: 'Tandon 2027', picture: 'michaelliu.jpg' },
  { name: 'Michelle Li', title: 'Secretary', school: 'CAS 2028', picture: 'michelleli.jpeg' },
  { name: 'Evan Li', title: 'Treasurer', school: 'Stern 2027', picture: 'evanli.jpg' },
  { name: 'Melody Wang', title: 'Logistics Team', school: 'Stern 2028', picture: 'melodywang.png' },
]

const graphicsTeam = [
  { name: 'Mike Chen', title: 'Graphics Team', school: 'Stern 2027', picture: 'mikechen.webp' },
  { name: 'Emma Wang', title: 'Graphics Team', school: 'Steinhardt 2028', picture: 'emmawang.webp' },
  { name: 'Ayden Lui', title: 'Graphics Team', school: 'CAS 2028', picture: 'aydenlui.png' }, // no picture
]

const marketingTeam = [
  { name: 'Alyssa Meng', title: 'Marketing Director', school: 'CAS 2026', picture: 'alyssameng.webp' },
  { name: 'Kyra Li', title: 'Marketing Director', school: 'Tisch 2027', picture: 'kyrali.webp' },
  { name: 'Kelly Yang', title: 'Marketing Team', school: 'Gallatin 2028', picture: 'kellyyang.webp' },
  { name: 'Lester Wu', title: 'Marketing Team', school: 'Steinhardt 2027', picture: 'lesterwu.webp' },
  { name: 'Mona Zhao', title: 'Marketing Team', school: 'CAS 2028', picture: 'monazhao.webp' },
  { name: 'Kai Yuen', title: 'Marketing Team', school: 'Tandon 2028', picture: 'kaiyuen.webp' },
]

const seniorAdvisors = [
  { name: 'Isabel Ting', title: 'Senior Advisor', school: 'CAS 2026', picture: 'isabelting.webp' },
  { name: 'Saranna Zhang', title: 'Senior Advisor', school: 'CAS 2026', picture: 'sarannazhang.webp' },
  { name: 'Harry Chen', title: 'Senior Advisor', school: 'SPS 2026', picture: 'harrychen.webp' },
  { name: 'David Liu', title: 'Senior Advisor', school: 'Tisch 2026', picture: 'davidliu.png' }, // no picture
  { name: 'Joyce Shi', title: 'Senior Advisor', school: 'CAS 2026', picture: 'joyceshi.png' }, // no picture
  { name: 'Jun Yan Lu', title: 'Senior Advisor', school: 'Stern 2026', picture: 'junyanlu.png' }, // no picture
]

// People without pictures - will show emoji placeholder
const noPicturePeople = new Set(['Ayden Lui', 'David Liu', 'Joyce Shi', 'Jun Yan Lu'])

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [aspectRatios, setAspectRatios] = useState<number[]>([16/9, 16/9, 16/9, 16/9])
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = mainRef.current?.offsetHeight || 1200
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      
      // Hide nav when at bottom of page
      if (currentScrollY >= scrollableHeight - 50) {
        setShowNav(false)
      }
      // Hide nav when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowNav(true)
      }
      
      // Hide scroll indicator after leaving homepage (after ~10% of scroll)
      if (currentScrollY > maxScroll * 0.1) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Load image aspect ratios
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const imagePaths = [2, 3, 4, 5]
    const loadAspectRatios = async () => {
      const ratios = await Promise.all(
        imagePaths.map((num) => {
          return new Promise<number>((resolve) => {
            const img = new window.Image()
            img.onload = () => {
              resolve(img.width / img.height)
            }
            img.onerror = () => resolve(16 / 9) // fallback
            img.src = `/event${num}.png`
          })
        })
      )
      setAspectRatios(ratios)
    }
    loadAspectRatios()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (section: number) => {
    // Target positions where each section is fully visible and stable
    const percentages = [5, 30, 62, 78, 90]
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

      // Section 4 - People (slides in from bottom with flip effect)
      if (section4Ref.current) {
        gsap.set(section4Ref.current, { opacity: 0, y: 100, rotationY: 45 })
        
        // Reset scroll position when entering
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: '70%',
          end: '71%',
          onEnter: () => {
            // Find the scrollable container and reset its scroll position
            const scrollableContainer = section4Ref.current?.querySelector('.overflow-y-auto')
            if (scrollableContainer) {
              scrollableContainer.scrollTop = 0
            }
          },
        })
        
        // Enter animation - slide up with flip
        gsap.to(section4Ref.current, {
          y: 0,
          rotationY: 0,
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
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <Image
                    src="/cmslogo.png"
                    alt="NYU Chinese Mei Society Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg md:text-2xl font-bold text-gradient">
                  NYU Chinese Mei Society
                </span>
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
          <div className="max-w-7xl w-full px-6 py-20 pointer-events-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Our Events
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Join us for exciting events celebrating Chinese culture
                throughout the year
              </p>
            </div>

            {/* Carousel Container */}
            <div className="flex flex-col items-center">
              <div className="relative max-w-5xl w-full">
                {/* Main Image Display */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 w-full"
                  style={{
                    aspectRatio: aspectRatios[currentSlide] || 16/9,
                    maxHeight: '600px'
                  }}
                >
                  {[2, 3, 4, 5].map((imageNum, index) => (
                    <div
                      key={imageNum}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={`/event${imageNum}.png`}
                        alt={`Event ${imageNum}`}
                        fill
                        className="object-contain"
                        priority={imageNum === 2}
                      />
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + 4) % 4)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 z-10"
                    aria-label="Previous slide"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 z-10"
                    aria-label="Next slide"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 mt-6">
                {[2, 3, 4, 5].map((imageNum, index) => (
                  <button
                    key={imageNum}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index
                        ? 'w-12 h-3 bg-primary-600'
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: People - Rotates in from top */}
        <div
          ref={section4Ref}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-primary-50 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-7xl w-full mx-auto px-6 py-24 scale-90 md:scale-100 max-h-full overflow-y-auto pointer-events-auto scrollbar-hide">
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
                {executiveBoard.map((person, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-lg text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden relative bg-gradient-to-br from-primary-400 to-accent-500">
                      <Image
                        src={`/${person.picture}`}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-base mb-1">{person.name}</h4>
                    <p className="text-primary-600 font-semibold text-sm mb-1">{person.title}</p>
                    <p className="text-gray-500 text-xs">{person.school}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teams Grid and Senior Advisor */}
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {/* Teams Grid */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {/* Events Team */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Events Team
                  </h3>
                  <div className="space-y-3">
                    {eventsTeam.map((person, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gradient-to-br from-primary-400 to-accent-400 flex-shrink-0">
                          <Image
                            src={`/${person.picture}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{person.name}</h4>
                          <p className="text-xs text-primary-600">{person.title}</p>
                          <p className="text-xs text-gray-500">{person.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics Team */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Logistics Team
                  </h3>
                  <div className="space-y-3">
                    {logisticsTeam.map((person, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gradient-to-br from-red-400 to-primary-500 flex-shrink-0">
                          <Image
                            src={`/${person.picture}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{person.name}</h4>
                          <p className="text-xs text-primary-600">{person.title}</p>
                          <p className="text-xs text-gray-500">{person.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphics Team */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Graphics Team
                  </h3>
                  <div className="space-y-3">
                    {graphicsTeam.map((person, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gradient-to-br from-accent-500 to-red-400 flex-shrink-0">
                          {noPicturePeople.has(person.name) ? (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              👤
                            </div>
                          ) : (
                            <Image
                              src={`/${person.picture}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{person.name}</h4>
                          <p className="text-xs text-primary-600">{person.title}</p>
                          <p className="text-xs text-gray-500">{person.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marketing Team */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Marketing Team
                  </h3>
                  <div className="space-y-3">
                    {marketingTeam.map((person, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gradient-to-br from-primary-500 to-accent-500 flex-shrink-0">
                          <Image
                            src={`/${person.picture}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{person.name}</h4>
                          <p className="text-xs text-primary-600">{person.title}</p>
                          <p className="text-xs text-gray-500">{person.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Senior Advisor */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-xl h-full">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Senior Advisors
                  </h3>
                  <div className="space-y-6">
                    {seniorAdvisors.map((person, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden relative bg-gradient-to-br from-primary-600 to-accent-600">
                          {noPicturePeople.has(person.name) ? (
                            <div className="w-full h-full flex items-center justify-center text-5xl">
                              👤
                            </div>
                          ) : (
                            <Image
                              src={`/${person.picture}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{person.name}</h4>
                        <p className="text-primary-600 font-semibold mb-1">{person.title}</p>
                        <p className="text-gray-500 text-sm">{person.school}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
              <a 
                href="https://www.instagram.com/nyucms/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-64 hover:scale-105 transition-all cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-center text-white">Instagram</h3>
                    <p className="text-white/90 text-center">@nyucms</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://www.tiktok.com/@cms.nyu?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-64 hover:scale-105 transition-all cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/tiktok.png"
                    alt="TikTok"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-center text-white">TikTok</h3>
                    <p className="text-white/90 text-center">@cms.nyu</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://engage.nyu.edu/organization/chinese-mei-society-all-university"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden h-64 hover:scale-105 transition-all cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/engage.png"
                    alt="NYU Engage"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-center text-white">NYU Engage</h3>
                    <p className="text-white/90 text-center">NYU Engage</p>
                  </div>
                </div>
              </a>
            </div>

            <a 
              href="mailto:cms.nyu@gmail.com"
              className="px-12 py-6 bg-white text-primary-600 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl pointer-events-auto inline-block"
            >
              Get in Touch
            </a>

            <div className="mt-16 pt-8 border-t border-white/20 space-y-6">
              {/* Self Plug */}
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/70 text-sm md:text-base">Website built by</span>
                <span className="text-white font-semibold text-base md:text-lg">Matt Cao</span>
                <span className="text-white/70 text-sm md:text-base">reach me here: </span>
                <a 
                  href="https://www.linkedin.com/in/caomatt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-110 transition-all duration-300 pointer-events-auto"
                  aria-label="Matt Cao's LinkedIn"
                >
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
              {/* Copyright */}
              <p className="text-white/40 text-sm text-center pb-6">
                © 2025 NYU Chinese Mei Society. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {typeof window !== 'undefined' && window.location.pathname === '/' && showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
