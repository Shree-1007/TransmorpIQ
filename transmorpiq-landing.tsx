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
  Mail,
  Clock,
  Key,
  MessageSquare,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- UPDATED SLIDES ---
const slides = [
  {
    id: 1,
    title: "1. Upload Your Data",
    subtitle: "Secure & Simple",
    description: "Start by uploading your private PDF dataset. Our platform ensures your data is handled securely, used only for your training job, and never stored long-term.",
    icon: <Upload className="w-20 h-20" />,
    gradient: "from-cyan-500/40 via-blue-500/30 to-teal-600/40",
    stats: { "Max Size": "2GB", "Format": "PDF", "Security": "Encrypted" },
  },
  {
    id: 2,
    title: "2. Describe Your Vision",
    subtitle: "AI-Powered Configuration",
    description: "Tell us what you want your model to do. Our advanced AI assistant will analyze your needs and automatically design the optimal transformer architecture for your task.",
    icon: <MessageSquare className="w-20 h-20" />,
    gradient: "from-purple-500/40 via-pink-500/30 to-purple-600/40",
    stats: { "Parameters": "Auto", "Tuning": "Automated", "Expertise": "None Needed" },
  },
  {
    id: 3,
    title: "3. Receive Your Model",
    subtitle: "Deployed & Ready",
    description: "Once training is complete, you'll receive an email with a link to your endpoint, fully-deployed model on Hugging Face. Ready to use, no extra steps required.",
    icon: <Rocket className="w-20 h-20" />,
    gradient: "from-emerald-500/40 via-green-500/30 to-teal-600/40",
    stats: { "Platform": "Hugging Face", "Notification": "Email", "Ownership": "100%" },
  },
]

// --- UPDATED FEATURES ---
const features = [
  { icon: <Brain className="w-6 h-6" />, title: "Custom Trained For You", desc: "Your model is built from scratch, exclusively on your data for your specific task." },
  { icon: <Shield className="w-6 h-6" />, title: "Your Data, Your Privacy", desc: "We use your data only for training, then it's deleted. Your privacy is paramount." },
  { icon: <Key className="w-6 h-6" />, title: "Full Model Ownership", desc: "Receive a link to your model on Hugging Face. You have full control." },
  { icon: <Zap className="w-6 h-6" />, title: "Completely Automated", desc: "No code, no DevOps. Just describe your needs and let our platform handle the rest." },
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

// Infinity Loading Component with actual ♾️ symbol
const InfinityLoader = () => (
  <motion.div className="relative flex items-center justify-center w-20 h-12 mx-auto mb-6">
    <motion.div
      className="text-6xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      animate={{
        rotateY: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotateY: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      ♾️
    </motion.div>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-xl"
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/80 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          rotate: { duration: 4 + i, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 },
        }}
        style={{
          transformOrigin: `${25 + i * 10}px center`,
        }}
      />
    ))}
  </motion.div>
)

// Simplified Processing Modal Component
const ProcessingModal = ({
  isOpen,
  onClose,
  jobId,
  estimatedTime,
}: {
  isOpen: boolean
  onClose: () => void
  jobId?: string
  estimatedTime: string
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <InfinityLoader />
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Forge in Progress
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <p className="text-green-400 leading-relaxed text-lg font-medium">
                Your request is submitted! We'll email you upon completion.
              </p>
            </div>
            
            {jobId && (
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-400 mb-1">Job ID</p>
                <p className="text-cyan-400 font-mono text-sm">{jobId}</p>
              </div>
            )}
            
            {estimatedTime && (
              <div className="bg-gray-800/50 rounded-lg p-3 mb-6 flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400"/>
                <p className="text-sm text-gray-400">Estimated Time:</p>
                <p className="text-cyan-400 font-mono text-sm">{estimatedTime}</p>
              </div>
            )}
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white"
            >
              Continue in Background
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// File size formatter
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Function to estimate training time
const estimateTrainingTime = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  if (mb < 100) return "30 - 60 Minutes";
  if (mb < 500) return "1 - 3 Hours";
  if (mb < 2048) return "4 - 8 Hours";
  return "8 - 12+ Hours";
};

export default function Component() {
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
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
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState("");

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
    if (typeof window !== "undefined") return

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
      setEstimatedTime(estimateTrainingTime(file.size));
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
  }

  // Form submission
  const handleSubmit = async () => {
    if (!description.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       setSubmitStatus({ type: "error", message: "Please fill out all fields correctly." });
       return;
    }
    if (!selectedFile) {
        setSubmitStatus({ type: "error", message: "Please select a file to upload." });
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    setShowProcessingModal(true);

    try {
      // Step 1: Get the secure upload URL
      const getUrlResponse = await fetch("/api/forge-transformer", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      });
      const { success, signedUrl, gcsUri, jobId } = await getUrlResponse.json();
      if (!success) throw new Error("Could not initialize upload session.");
      
      // Update the Job ID in the modal
      setSubmitStatus({ type: "success", message: "", jobId });

      // Step 2: Upload the file directly to GCS
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: { 'Content-Type': selectedFile.type },
      });
      if (!uploadResponse.ok) throw new Error("File upload failed.");
      
      // Step 3: Tell our backend to start the training job
      const startJobResponse = await fetch('https://manager-service-513450512212.us-central1.run.app/start-training-job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              jobId: jobId,
              email: email.trim(),
              description: description.trim(),
              gcsUri: gcsUri,
          }),
      });
      const result = await startJobResponse.json();
      if (!startJobResponse.ok) throw new Error(result.error || "Failed to start the training job.");

    } catch (error: any) {
      console.error("Submission error:", error);
      setShowProcessingModal(false);
      setSubmitStatus({
        type: "error",
        message: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Transformer Architecture Background */}
      <div className="absolute inset-0">
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
          {[...Array(6)].map((_, i) => ( <motion.rect key={`layer-${i}`} x="10%" y={`${15 + i * 12}%`} width="80%" height="8%" fill="none" stroke="url(#layerGradient)" strokeWidth="1" rx="4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 2, delay: i * 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", repeatDelay: 4, }} /> ))}
          {[...Array(12)].map((_, i) => { const startX = 20 + (i % 4) * 15; const startY = 20 + Math.floor(i / 4) * 20; const endX = 20 + ((i + 2) % 4) * 15; const endY = 40 + Math.floor(((i + 2) % 12) / 4) * 20; return ( <motion.path key={`attention-${i}`} d={`M ${startX}% ${startY}% Q ${(startX + endX) / 2}% ${(startY + endY) / 2 - 5}% ${endX}% ${endY}%`} stroke="url(#attentionGradient)" strokeWidth="1" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ duration: 3, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", repeatDelay: 2, }} /> ) })}
        </svg>
        {[...Array(8)].map((_, i) => ( <AttentionHead key={`head-${i}`} delay={i * 0.5} position={{ x: 15 + (i % 4) * 20, y: 25 + Math.floor(i / 4) * 30, }} /> ))}
        {[...Array(6)].map((_, i) => ( <TokenFlow key={`token-${i}`} startX={10} startY={20 + i * 10} endX={90} endY={20 + i * 10} delay={i * 0.8} /> ))}
        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20">
          <motion.path d="M 0 80 Q 20 60 40 45 Q 60 35 80 30 Q 100 28 120 27" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", repeatDelay: 2, }} />
          <text x="10" y="95" fill="rgba(34, 197, 94, 0.6)" fontSize="8"> Training Loss </text>
        </svg>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 opacity-10">
          {[...Array(20)].map((_, i) => ( <motion.div key={`embedding-${i}`} className="absolute w-2 h-2 bg-blue-400/60 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, }} animate={{ x: [0, Math.random() * 50 - 25], y: [0, Math.random() * 50 - 25], scale: [1, 1.2, 1], }} transition={{ duration: 6 + Math.random() * 4, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 3, }} /> ))}
        </div>
        <motion.div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)", }} animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 0.8, 1], }} transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", }} />
        {[...Array(15)].map((_, i) => ( <motion.div key={`data-stream-${i}`} className="absolute w-px bg-gradient-to-b from-transparent via-green-400/60 to-transparent" style={{ left: `${i * 6.67}%`, height: `${150 + Math.random() * 200}px`, }} animate={{ y: [-200, typeof window !== "undefined" ? window.innerHeight + 200 : 1000], opacity: [0, 0.8, 0], }} transition={{ duration: 6 + Math.random() * 4, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 5, ease: "linear", }} /> ))}
        {[...Array(25)].map((_, i) => ( <motion.div key={`node-${i}`} className="absolute w-1 h-1 bg-cyan-400/60 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, }} animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3], }} transition={{ duration: 4 + Math.random() * 3, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 3, }} /> ))}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs> <pattern id="positional" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"> <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.3" /> <path d="M0,4 L8,4 M4,0 L4,8" stroke="currentColor" strokeWidth="0.2" opacity="0.2" /> </pattern> </defs>
            <rect width="100%" height="100%" fill="url(#positional)" />
          </svg>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`, }} />
        </div>
      </div>

      <motion.nav
        className="relative z-20 flex justify-between items-center p-6 backdrop-blur-sm bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} >
          <div className="relative">
            <Brain className="w-12 h-12 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl" />
          </div>
          <span className="text-white text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> TransmorpIQ </span>
        </motion.div>
        <div className="flex items-center space-x-8">
          {[ { icon: <Info className="w-4 h-4" />, label: "About" }, { icon: <User className="w-4 h-4" />, label: "Profile" }, ].map((item) => ( <motion.button key={item.label} className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} > {item.icon} <span>{item.label}</span> <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" /> </motion.button> ))}
        </div>
      </motion.nav>

      <div className="relative z-10">
        <motion.div className="text-center py-16 px-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} >
          <motion.div className="inline-flex items-center justify-center mb-8 relative" animate={{ rotateY: [0, 5, 0, -5, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }} >
            <div className="relative">
              <Brain className="w-16 h-16 text-cyan-400 mr-4" />
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"> Forge a Mind from Scratch </h1>
          </motion.div>
          <motion.p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} >
            Train custom transformer models from the ground up with your data. Build, optimize, and deploy state-of-the-art AI architectures tailored to your specific needs.
          </motion.p>
          <motion.div className="flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} >
            <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce" />
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-16 max-w-6xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} >
          {features.map((feature, index) => ( <motion.div key={feature.title} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 text-center group hover:border-cyan-400/50 transition-all duration-300" whileHover={{ scale: 1.05, y: -5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + index * 0.1 }} > <div className="text-cyan-400 mb-3 flex justify-center group-hover:scale-110 transition-transform"> {feature.icon} </div> <h3 className="text-white font-semibold mb-2">{feature.title}</h3> <p className="text-gray-400 text-sm">{feature.desc}</p> </motion.div> ))}
        </motion.div>

        <motion.div className="mb-16" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, duration: 0.8 }} >
          <div className="relative h-[600px] mx-6 rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 1 }} >
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`} />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                <div className="relative z-10 h-full flex items-center justify-center p-12">
                  <div className="text-center max-w-4xl">
                    <motion.div className="inline-flex p-8 rounded-full bg-black/30 backdrop-blur-sm mb-8 relative" whileHover={{ scale: 1.1, rotateY: 15 }} transition={{ type: "spring", stiffness: 300 }} >
                      <div className="text-white relative z-10">{slides[currentSlide].icon}</div>
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                    </motion.div>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} >
                      <p className="text-cyan-300 text-lg mb-2 font-medium">{slides[currentSlide].subtitle}</p>
                      <h3 className="text-5xl md:text-6xl font-bold text-white mb-6">{slides[currentSlide].title}</h3>
                      <p className="text-gray-200 text-xl leading-relaxed mb-8 max-w-3xl mx-auto"> {slides[currentSlide].description} </p>
                    </motion.div>
                    <motion.div className="flex justify-center space-x-8 md:space-x-12" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} >
                      {Object.entries(slides[currentSlide].stats).map(([key, value]) => ( <div key={key} className="text-center"> <div className="text-2xl md:text-3xl font-bold text-cyan-300">{value}</div> <div className="text-gray-400 text-sm uppercase tracking-wider">{key}</div> </div> ))}
                    </motion.div>
                  </div>
                </div>
                <div className="absolute top-10 left-10 w-24 h-24 border border-white/20 rounded-full" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute top-1/3 right-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {slides.map((_, index) => ( <button key={index} onClick={() => setCurrentSlide(index)} className={`relative w-12 h-1 rounded-full transition-all duration-300 ${ index === currentSlide ? "bg-cyan-400" : "bg-white/30 hover:bg-white/50" }`} > {index === currentSlide && ( <motion.div className="absolute inset-0 bg-cyan-400 rounded-full" layoutId="activeSlide" /> )} </button> ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }} >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`relative border-2 border-dashed rounded-2xl p-16 text-center bg-gray-900/40 backdrop-blur-sm transition-all duration-500 cursor-pointer ${ isDragOver ? "border-cyan-400/80 bg-gray-900/60" : "border-gray-700/60 hover:border-cyan-400/60 hover:bg-gray-900/60" }`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => document.getElementById("file-input")?.click()} >
                <input id="file-input" type="file" onChange={handleFileChange} className="hidden" accept=".pdf" />
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  {selectedFile ? ( <div className="space-y-4"> <div className="flex items-center justify-center space-x-4"> <FileText className="w-12 h-12 text-green-400" /> <div className="text-left"> <div className="text-white text-lg font-semibold">{selectedFile.name}</div> <div className="text-gray-400">{formatFileSize(selectedFile.size)}</div> </div> <button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="text-red-400 hover:text-red-300 transition-colors" > <X className="w-6 h-6" /> </button> </div> <div className="text-green-400 text-sm">File ready for upload</div> </div> ) : ( <> <div className="relative inline-block mb-6"> <Upload className="w-16 h-16 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" /> <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" /> </div> <div className="text-white text-2xl font-semibold mb-3">Drop your training dataset here</div> <div className="text-gray-400 text-lg mb-6">or click to browse files</div> <div className="text-gray-500">PDF documents only • Max size 2GB</div> </> )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div className="mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }} >
            <h2 className="text-white text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Describe Your Transformer's Purpose </h2>
            <div className="relative">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, maxLength))} placeholder="e.g. Build a language model for legal document analysis with 12 transformer layers, 768 hidden dimensions, and multi-head attention for processing complex legal terminology and context..." className="bg-gray-900/60 backdrop-blur-sm border-gray-700/60 text-white placeholder-gray-400 min-h-[160px] resize-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 rounded-2xl text-lg p-8 transition-all duration-300" maxLength={maxLength} disabled={isSubmitting} />
              <div className="absolute bottom-6 right-6 text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-lg"> {description.length}/{maxLength} </div>
            </div>
          </motion.div>

          <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.8 }} >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"> <Mail className="w-5 h-5 text-gray-400" /> </div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="w-full bg-gray-900/60 backdrop-blur-sm border border-gray-700/60 text-white placeholder-gray-400 rounded-2xl text-lg pl-14 pr-8 py-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300" disabled={isSubmitting} />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center"> <span className="text-gray-500 text-sm">We'll send updates here</span> </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {submitStatus.type && !showProcessingModal && (
              <motion.div className={`mb-8 p-6 rounded-2xl backdrop-blur-sm border ${ submitStatus.type === "success" ? "bg-green-900/40 border-green-500/50 text-green-200" : "bg-red-900/40 border-red-500/50 text-red-200" }`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} >
                <div className="flex items-center space-x-3">
                  {submitStatus.type === "success" ? ( <CheckCircle className="w-6 h-6 text-green-400" /> ) : ( <AlertCircle className="w-6 h-6 text-red-400" /> )}
                  <div>
                    <div className="font-semibold">{submitStatus.message}</div>
                    {submitStatus.jobId && <div className="text-sm opacity-80 mt-1">Job ID: {submitStatus.jobId}</div>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="text-center pb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.8 }} >
            <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.05 }} whileTap={{ scale: isSubmitting ? 1 : 0.95 }}>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl border-0 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed" size="lg" >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  {isSubmitting ? ( <> <Loader2 className="w-8 h-8 mr-4 animate-spin" /> Forging... </> ) : ( <> <Brain className="w-8 h-8 mr-4" /> FORGE <Sparkles className="w-6 h-6 ml-4" /> </> )}
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ProcessingModal
        isOpen={showProcessingModal}
        onClose={() => setShowProcessingModal(false)}
        jobId={submitStatus.jobId}
        estimatedTime={estimatedTime}
      />
    </div>
  )
}
