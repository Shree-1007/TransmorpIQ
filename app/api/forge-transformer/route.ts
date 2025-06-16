import { type NextRequest, NextResponse } from "next/server"

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024 // 2GB in bytes

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const description = formData.get("description") as string
    const email = formData.get("email") as string
    const timestamp = new Date().toISOString()

    // Validate description
    if (!description || description.trim().length === 0) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }

    if (description.length > 500) {
      return NextResponse.json({ error: "Description must be 500 characters or less" }, { status: 400 })
    }

    // Validate email
    if (!email || email.trim().length === 0) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate file if provided
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size must be 2GB or less" }, { status: 400 })
      }

      // Check if file is empty
      if (file.size === 0) {
        return NextResponse.json({ error: "File cannot be empty" }, { status: 400 })
      }

      console.log("File received:", {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      })
    }

    console.log("Email received:", email)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Here you would typically:
    // 1. Save the file to cloud storage (AWS S3, Google Cloud, etc.)
    // 2. Process the file and description
    // 3. Start the transformer training process
    // 4. Send confirmation email to the user
    // 5. Return a job ID or status

    const response = {
      success: true,
      message: "🚀 Transformer forging initiated successfully! We'll send updates to your email.",
      jobId: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      data: {
        description: description.trim(),
        email: email.trim(),
        file: file
          ? {
              name: file.name,
              size: file.size,
              type: file.type,
              sizeFormatted: formatFileSize(file.size),
            }
          : null,
        estimatedTime: "15-30 minutes",
        status: "processing",
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 })
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
