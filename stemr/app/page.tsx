"use client";
import React from "react";

import { MousePointer, MousePointerClick } from "lucide-react";

import { Loader } from "@/components/ui/loader";
import StemPlayer from "@/components/stem-player";
import UploadSong from "@/components/upload-song";
import { toast } from "sonner";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [genData, setGenData] = React.useState({} as any);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalsMuted, setVocalsMuted] = React.useState(false);
  const [isDrumsMuted, setDrumsMuted] = React.useState(false);
  const [isBassMuted, setBassMuted] = React.useState(false);
  const [isOtherMuted, setOtherMuted] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetch(
      `https://stemr-production-f0bf.up.railway.app/?audioUrl=${uploadedUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setLoading(false);
    setGenData(data);
    toast.success("Stems extracted successfully!");
  };

  React.useEffect(() => {
    if (uploadedUrl) {
      handleSubmit();
    }
  }, [uploadedUrl]);

  React.useEffect(() => {
    const audioElements = document.getElementsByTagName("audio");
    const playPromises = [];

    for (let i = 0; i < audioElements.length; i++) {
      if (isPlaying) {
        // Collect all play promises
        playPromises.push(audioElements[i].play());
      } else {
        audioElements[i].pause();
        audioElements[i].currentTime = 0;
      }
    }

    if (isPlaying) {
      Promise.all(playPromises)
        .then(() => {
          console.log("Playing");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  }, [isPlaying]);

  return (
    <>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
      />
      <section className="w-full mt-4 z-50">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
          <div>
            <h1 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              your music, deconstructed.
            </h1>
          </div>

          <UploadSong
            isDrawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            setUploadedUrl={setUploadedUrl}
          />

          <div className="mt-2" />
          <div className="space-x-2">
            <p className="text-sm text-muted-foreground mb-2">example tracks</p>
            <Badge variant="secondary">
              <span className="text-muted-foreground">J. Cole -</span>
              &nbsp;Applying Pressure
            </Badge>
            <Badge variant="secondary">
              <span className="text-muted-foreground">PinkPantheress -</span>
              &nbsp;Pain
            </Badge>
          </div>
          <div className="mb-2" />
          {loading && (
            <div className="bg-muted border p-4 rounded-lg space-y-2">
              <Loader />
              <p>Extracting stems. This may take a while...</p>
            </div>
          )}

          <StemPlayer
            genData={genData}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isVocalsMuted={isVocalsMuted}
            setVocalsMuted={setVocalsMuted}
            isDrumsMuted={isDrumsMuted}
            setDrumsMuted={setDrumsMuted}
            isBassMuted={isBassMuted}
            setBassMuted={setBassMuted}
            isOtherMuted={isOtherMuted}
            setOtherMuted={setOtherMuted}
          />

          <div className="flex flex-col md:flex-row items-center mt-6 gap-2 md:gap-6 bg-background border p-2 rounded-lg">
            <div className="flex gap-2">
              <MousePointer className="h-[1.2rem] w-[1.2rem]" />
              <p className="text-sm">press to mute/unmute stems</p>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-4 bg-muted/80"
            />
            <div className="flex gap-2">
              <MousePointerClick className="h-[1.2rem] w-[1.2rem]" />
              <p className="text-sm">press and hold to isolate stems</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
