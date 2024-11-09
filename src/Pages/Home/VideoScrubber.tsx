import React, { useEffect, useRef, useState } from 'react'

const VideoScrubber = ({ videoSrc }) => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && videoRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const videoRect = videoRef.current.getBoundingClientRect()
        const scrollPosition = window.pageYOffset + containerRect.top
        const videoPosition = videoRect.top - containerRect.top
        const seekPosition =
          (scrollPosition - videoPosition) / containerRect.height

        if (seekPosition >= 0 && seekPosition <= 1) {
          videoRef.current.currentTime =
            videoRef.current.duration * seekPosition
        }
      }
    }

    const handlePlayPause = () => {
      setIsPlaying(!isPlaying)
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }

    window.addEventListener('scroll', handleScroll)
    videoRef.current.addEventListener('click', handlePlayPause)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      videoRef.current.removeEventListener('click', handlePlayPause)
    }
  }, [isPlaying])

  return (
    <div ref={containerRef}>
      <video ref={videoRef} src={videoSrc} controls muted playsInline loop />
    </div>
  )
}

export default VideoScrubber
