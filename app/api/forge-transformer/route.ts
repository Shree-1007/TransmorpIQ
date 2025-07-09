import { type NextRequest, NextResponse } from "next/server";

// This should be the URL of the "Manager" service you deployed
const MANAGER_SERVICE_URL = "https://manager-service-513450512212.us-central1.run.app"; 

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "File details are required" }, { status: 400 });
    }

    // Call our Python backend to generate a signed URL
    const signedUrlResponse = await fetch(`${MANAGER_SERVICE_URL}/generate-upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, fileType }),
    });

    if (!signedUrlResponse.ok) {
      const errorText = await signedUrlResponse.text();
      console.error("Backend error:", errorText);
      return NextResponse.json({ error: "Could not create upload session." }, { status: 500 });
    }

    // Pass the secure URL back to the frontend
    const { signedUrl, gcsUri, jobId } = await signedUrlResponse.json();
    return NextResponse.json({ success: true, signedUrl, gcsUri, jobId });

  } catch (error) {
    console.error("Error in forge-transformer API route:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}