"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  Brain,
  Zap,
  Cpu,
  Network,
  User,
  Info,
  ChevronDown,
  Sparkles,
  Database,
  Shield,
  Rocket,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    title: "Neural Architecture",
    subtitle: "Advanced AI Processing",
    description: "Revolutionary neural networks that adapt and evolve with unprecedented learning capabilities",
    icon: <Brain className="w-20 h-20" />,
    gradient: "from-purple-500/40 via-pink-500/30 to-purple-600/40",
    stats: { accuracy: "99.7%", speed: "2.3ms", nodes: "10M+" },
  },
  {
    id: 2,
    title: "Quantum Computing",
    subtitle: "Next-Gen Processing",
    description: "Harness quantum mechanics for exponentially faster computational problem solving",
    icon: <Zap className="w-20 h-20" />,
    gradient: "from-cyan-500/40 via-blue-500/30 to-teal-600/40",
    stats: { qubits: "1024", coherence: "100μs", gates: "99.9%" },
  },
  {
    id: 3,
    title: "Distributed Intelligence",
    subtitle: "Scalable AI Network",
    description: "Seamlessly distributed AI architecture that scales across global infrastructure",
    icon: <Network className="w-20 h-20" />,
    gradient: "from-emerald-500/40 via-green-500/30 to-teal-600/40",
    stats: { nodes: "50K+", latency: "<1ms", uptime: "99.99%" },
  },
  {
    id: 4,
    title: "Cognitive Synthesis",
    subtitle: "Human-Like Reasoning",
    description: "Advanced reasoning systems that mirror human cognitive processes and intuition",
    icon: <Cpu className="w-20 h-20" />,
    gradient: "from-orange-500/40 via-red-500/30 to-pink-600/40",
    stats: { reasoning: "95%", memory: "∞", learning: "Real-time" },
  },
]

const features = [
  { icon: <Database className="w-6 h-6" />, title: "Unlimited Data", desc: "Process datasets of any size" },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "Military-grade encryption" },
  { icon: <Rocket className="w-6 h-6" />, title: "Lightning Fast", desc: "Sub-millisecond response times" },
  { icon: <Sparkles className="w-6 h-6" />, title: "Auto-Optimization", desc: "Self-improving algorithms" },
]

// Transformer Architecture Visualization Components
const AttentionHead = ({ delay = 0, position }: { delay?: number; position: { x: number; y: number } }) => (
  <motion.div
    className="absolute w-3 h-3 rounded-full bg-cyan-400/60"
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay,
    }}
  />
)

const TokenFlow = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
}: { startX: number; startY: number; endX: number; endY: number; delay?: number }) => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      className="absolute w-1 h-1 bg-purple-400/80 rounded-full"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      animate={{
        x: [`0%`, `${((endX - startX) * windowSize.width) / 100}px`],
        y: [`0%`, `${((endY - startY) * windowSize.height) / 100}px`],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

// File size formatter
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function Component() {
  const [description, setDescription] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
    jobId?: string
  }>({ type: null, message: "" })
  const [isMounted, setIsMounted] = useState(false)

  const maxLength = 500
  const maxFileSize = 2 * 1024 * 1024 * 1024 // 2GB

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // File handling functions
  const handleFileSelect = useCallback(
    (file: File) => {
      if (file.size > maxFileSize) {
        setSubmitStatus({
          type: "error",
          message: "File size must be 2GB or less",
        })
        return
      }

      setSelectedFile(file)
      setSubmitStatus({ type: null, message: "" })
    },
    [maxFileSize],
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)

    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setSubmitStatus({ type: null, message: "" })
  }

  // Form submission
  const handleSubmit = async () => {
    if (!description.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please provide a description for your transformer architecture",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      formData.append("description", description.trim())

      if (selectedFile) {
        formData.append("file", selectedFile)
      }

      const response = await fetch("/api/forge-transformer", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message,
          jobId: result.jobId,
        })

        // Reset form after successful submission
        setTimeout(() => {
          setDescription("")
          setSelectedFile(null)
          setSubmitStatus({ type: null, message: "" })
        }, 5000)
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "An error occurred while processing your request",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Transformer Architecture Background */}
      <div className="absolute inset-0">
        {/* Multi-Head Attention Visualization */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <linearGradient id="attentionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
            </linearGradient>
            <linearGradient id="layerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
            </linearGradient>
          </defs>

          {/* Transformer Layers */}
          {[...Array(6)].map((_, i) => (
            <motion.rect
              key={`layer-${i}`}
              x="10%"
              y={`${15 + i * 12}%`}
              width="80%"
              height="8%"
              fill="none"
              stroke="url(#layerGradient)"
              strokeWidth="1"
              rx="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 4,
              }}
            />
          ))}

          {/* Attention Connections */}
          {[...Array(12)].map((_, i) => {
            const startX = 20 + (i % 4) * 15
            const startY = 20 + Math.floor(i / 4) * 20
            const endX = 20 + ((i + 2) % 4) * 15
            const endY = 40 + Math.floor(((i + 2) % 12) / 4) * 20

            return (
              <motion.path
                key={`attention-${i}`}
                d={`M ${startX}% ${startY}% Q ${(startX + endX) / 2}% ${(startY + endY) / 2 - 5}% ${endX}% ${endY}%`}
                stroke="url(#attentionGradient)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
              />
            )
          })}
        </svg>

        {/* Attention Heads */}
        {[...Array(8)].map((_, i) => (
          <AttentionHead
            key={`head-${i}`}
            delay={i * 0.5}
            position={{
              x: 15 + (i % 4) * 20,
              y: 25 + Math.floor(i / 4) * 30,
            }}
          />
        ))}

        {/* Token Flow Animation */}
        {[...Array(6)].map((_, i) => (
          <TokenFlow key={`token-${i}`} startX={10} startY={20 + i * 10} endX={90} endY={20 + i * 10} delay={i * 0.8} />
        ))}

        {/* Training Loss Curve Visualization */}
        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20">
          <motion.path
            d="M 0 80 Q 20 60 40 45 Q 60 35 80 30 Q 100 28 120 27"
            stroke="rgba(34, 197, 94, 0.8)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          />
          <text x="10" y="95" fill="rgba(34, 197, 94, 0.6)" fontSize="8">
            Training Loss
          </text>
        </svg>

        {/* Embedding Space Visualization */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`embedding-${i}`}
              className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Gradient Descent Visualization */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Data Processing Streams */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-green-400/60 to-transparent"
            style={{
              left: `${i * 6.67}%`,
              height: `${150 + Math.random() * 200}px`,
            }}
            animate={{
              y: [-200, typeof window !== "undefined" ? window.innerHeight + 200 : 1000],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}

        {/* Neural Network Nodes */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Positional Encoding Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="positional" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.3" />
                <path d="M0,4 L8,4 M4,0 L4,8" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#positional)" />
          </svg>
        </div>

        {/* Mouse-following Attention Mechanism */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="relative z-20 flex justify-between items-center p-6 backdrop-blur-sm bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <Brain className="w-12 h-12 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl" />
          </div>
          <span className="text-white text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            TransmorpIQ
          </span>
        </motion.div>

        <div className="flex items-center space-x-8">
          {[
            { icon: <Info className="w-4 h-4" />, label: "About" },
            { icon: <User className="w-4 h-4" />, label: "Profile" },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.label}</span>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.button>
          ))}
        </div>
      </motion.nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center py-16 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-8 relative"
            animate={{ rotateY: [0, 5, 0, -5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="relative">
              <Brain className="w-16 h-16 text-cyan-400 mr-4" />
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Forge a Mind from Scratch
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Train custom transformer models from the ground up with your data. Build, optimize, and deploy
            state-of-the-art AI architectures tailored to your specific needs.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 text-center group hover:border-cyan-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="text-cyan-400 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Slideshow */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="relative h-[600px] mx-6 rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
              >
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`} />

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center p-12">
                  <div className="text-center max-w-4xl">
                    {/* Icon with Holographic Effect */}
                    <motion.div
                      className="inline-flex p-8 rounded-full bg-black/30 backdrop-blur-sm mb-8 relative"
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-white relative z-10">{slides[currentSlide].icon}</div>
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                    </motion.div>

                    {/* Title and Subtitle */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-cyan-300 text-lg mb-2 font-medium">{slides[currentSlide].subtitle}</p>
                      <h3 className="text-5xl md:text-6xl font-bold text-white mb-6">{slides[currentSlide].title}</h3>
                      <p className="text-gray-200 text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                        {slides[currentSlide].description}
                      </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      className="flex justify-center space-x-8 md:space-x-12"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-cyan-300">{value}</div>
                          <div className="text-gray-400 text-sm uppercase tracking-wider">{key}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 border border-white/20 rounded-full" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute top-1/3 right-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse" />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-12 h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-cyan-400" : "bg-white/30 hover:bg-white/50"
                  }`}
                >
                  {index === currentSlide && (
                    <motion.div className="absolute inset-0 bg-cyan-400 rounded-full" layoutId="activeSlide" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Enhanced File Upload */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className={`relative border-2 border-dashed rounded-2xl p-16 text-center bg-gray-900/40 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  isDragOver
                    ? "border-cyan-400/80 bg-gray-900/60"
                    : "border-gray-700/60 hover:border-cyan-400/60 hover:bg-gray-900/60"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input id="file-input" type="file" onChange={handleFileChange} className="hidden" accept="*/*" />

                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-4">
                        <FileText className="w-12 h-12 text-green-400" />
                        <div className="text-left">
                          <div className="text-white text-lg font-semibold">{selectedFile.name}</div>
                          <div className="text-gray-400">{formatFileSize(selectedFile.size)}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile()
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="text-green-400 text-sm">File ready for upload</div>
                    </div>
                  ) : (
                    <>
                      <div className="relative inline-block mb-6">
                        <Upload className="w-16 h-16 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-white text-2xl font-semibold mb-3">Drop your training dataset here</div>
                      <div className="text-gray-400 text-lg mb-6">or click to browse files</div>
                      <div className="text-gray-500">All file types supported • Max size 2GB</div>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Vision Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <h2 className="text-white text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Describe Your Transformer Architecture
            </h2>
            <div className="relative">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, maxLength))}
                placeholder="e.g. Build a language model for legal document analysis with 12 transformer layers, 768 hidden dimensions, and multi-head attention for processing complex legal terminology and context..."
                className="bg-gray-900/60 backdrop-blur-sm border-gray-700/60 text-white placeholder-gray-400 min-h-[160px] resize-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 rounded-2xl text-lg p-8 transition-all duration-300"
                maxLength={maxLength}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-6 right-6 text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-lg">
                {description.length}/{maxLength}
              </div>
            </div>
          </motion.div>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus.type && (
              <motion.div
                className={`mb-8 p-6 rounded-2xl backdrop-blur-sm border ${
                  submitStatus.type === "success"
                    ? "bg-green-900/40 border-green-500/50 text-green-200"
                    : "bg-red-900/40 border-red-500/50 text-red-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center space-x-3">
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <div className="font-semibold">{submitStatus.message}</div>
                    {submitStatus.jobId && <div className="text-sm opacity-80 mt-1">Job ID: {submitStatus.jobId}</div>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Forge Button */}
          <motion.div
            className="text-center pb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.05 }} whileTap={{ scale: isSubmitting ? 1 : 0.95 }}>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl border-0 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-8 h-8 mr-4 animate-spin" />
                      Forging...
                    </>
                  ) : (
                    <>
                      <Brain className="w-8 h-8 mr-4" />
                      Forge Transformer
                      <Sparkles className="w-6 h-6 ml-4" />
                    </>
                  )}
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
