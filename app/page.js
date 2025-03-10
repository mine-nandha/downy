"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef(null);

  const handleGetLink = async () => {
    if (inputValue.trim()) {
      const response = await fetch(
        "https://mine-ytdlp.onrender.com/get-url?video_url=" +
          inputValue +
          "&format_id=best"
      );
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        setVideoUrl(data.url);
      }
      setVideoUrl(inputValue);
      setInputValue("");
    }
  };

  const handleDownload = () => {
    if (videoUrl && videoRef.current) {
      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = "video.mp4"; // Default filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleGetLink();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with only site name */}
      <nav className="flex items-center px-4 py-3 bg-background border-b">
        <div className="text-xl font-bold">Downy</div>
      </nav>

      {/* Input field and button below navbar */}
      <div className="flex items-center justify-center gap-2 p-4 border-b">
        <Input
          type="text"
          placeholder="Enter video URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-w-xs"
        />
        <Button onClick={handleGetLink}>Get Link</Button>
      </div>

      {/* Video Player Space */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 gap-4">
        <div className="w-full max-w-3xl aspect-video bg-muted rounded-lg overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full h-full"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              Enter a video URL above to load a video
            </div>
          )}
        </div>

        <Button
          onClick={handleDownload}
          disabled={!videoUrl}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Video
        </Button>
      </div>
    </div>
  );
}
