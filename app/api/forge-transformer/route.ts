// New handleSubmit function
const handleSubmit = async () => {
  // --- (Keep your existing validation checks for email/description here) ---
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

  try {
    // STEP 1: Get the secure upload URL from our Next.js backend
    setSubmitStatus({ type: "success", message: "🚀 Initializing secure upload..." });
    const getUrlResponse = await fetch("/api/forge-transformer", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        email: email.trim(),
        description: description.trim(),
      }),
    });

    const { success, signedUrl, gcsUri } = await getUrlResponse.json();

    if (!success) {
      throw new Error("Could not initialize upload.");
    }

    // STEP 2: Upload the file DIRECTLY to Google Cloud Storage
    setSubmitStatus({ type: "success", message: "⬆️ Uploading dataset to Google Cloud..." });
    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      body: selectedFile,
      headers: { 'Content-Type': selectedFile.type },
    });

    if (!uploadResponse.ok) {
      throw new Error("File upload to Google Cloud failed.");
    }
    
    // STEP 3: Tell our backend to start the training job
    // IMPORTANT: This will call your future Cloud Run URL directly
    setSubmitStatus({ type: "success", message: "✅ Starting transformer training job..." });
    const startJobResponse = await fetch("https://your-manager-service-url-uc.a.run.app/start-training-job", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.trim(),
            description: description.trim(),
            gcsUri: gcsUri, // The GCS path of the uploaded file
        }),
    });
    
    const result = await startJobResponse.json();
    
    if (!startJobResponse.ok) {
        throw new Error(result.error || "Failed to start training job.");
    }

    // Show the processing modal with the job ID from the backend
    setSubmitStatus({
      type: "success",
      message: result.message,
      jobId: result.jobId,
    });
    setShowProcessingModal(true);
    
  } catch (error: any) {
    console.error("Submission error:", error);
    setSubmitStatus({
      type: "error",
      message: error.message || "An unknown error occurred.",
    });
  } finally {
    setIsSubmitting(false);
  }
};