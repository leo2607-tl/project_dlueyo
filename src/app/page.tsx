'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminIntro() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, [])

  const handleStart = () => {
    setTimeout(() => {
      setLoading(true) 
    }, 0) 

    setTimeout(() => {
      router.push('/events') 
    }, 500) 
  }

  return (
    <div className={`relative w-full min-h-screen mx-auto transition-opacity ${loading ? 'opacity-0' : 'opacity-100 '}, ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2023/03/15/154779-808521851.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Lớp phủ mờ cho video */}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center space-y-6 z-10">
        <h1 className="text-white text-6xl font-extrabold tracking-tight">
          Chào mừng bạn đến với Admin của Dlueyo
        </h1>
        <p className="text-white text-xl font-medium max-w-3xl mx-auto">
          Đây là không gian dành cho quản trị viên. Bạn có thể quản lý tất cả các sự kiện, người dùng, và kiểm soát nền tảng dễ dàng với công cụ trực quan và mạnh mẽ.
        </p>
        <button 
          className="flex items-center justify-center px-8 py-4 bg-gray-600 text-white text-lg font-semibold rounded-full shadow-xl transition duration-300 hover:bg-gray-700 hover:scale-105 transform"
          onClick={handleStart}
        >
          <span className="mr-2">Bắt đầu ngay</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 6l6 6-6 6"></path>
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center py-6 z-10 bg-black opacity-75">
        <div className="w-full text-center">
          <p className="text-white text-sm">&copy; 2025 Dlueyo. All rights reserved.</p>
        </div>
        <div className="w-full text-center mt-2">
          <p className="text-white text-sm">Theo dõi chúng tôi trên các mạng xã hội:</p>
          <div className="flex justify-center space-x-8 mt-4">
            <div className="flex items-center space-x-2">
              <a 
                href="https://www.facebook.com/dlueyo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
                title="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <span className="text-white">Facebook</span>
            </div>

            <div className="flex items-center space-x-2">
              <a 
                href="https://github.com/dlueyo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <span className="text-white">GitHub</span>
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-4">
          <p className="text-white text-sm">Nhà phát triển: LeoDy</p>
        </div>
      </div>
    </div>
  );
}
