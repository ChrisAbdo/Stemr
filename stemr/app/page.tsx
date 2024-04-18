// @ts-nocheck
/*

https://replicate.delivery/pbxt/LflQA55n3fgD30ZTeg9Pgj8FO2AZt4UV4A25TgKCGwiDIjTlA/drums.mp3
*/

// TODO: ADD A DEFAULT SONG TO PLAY WHEN NO SONG IS UPLOADED

"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Uploader from "@/components/uploader";
import Visualizer from "@/components/visualizer";
import { AudioLines, MousePointer, MousePointerClick } from "lucide-react";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

import { Loader } from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import StemPlayer from "@/components/stem-player";

export default function Home() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");
  const [audioUrlValue, setAudioUrlValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [genData, setGenData] = React.useState({} as any);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalsMuted, setVocalsMuted] = React.useState(false);
  const [isDrumsMuted, setDrumsMuted] = React.useState(false);
  const [isBassMuted, setBassMuted] = React.useState(false);
  const [isOtherMuted, setOtherMuted] = React.useState(false);

  // const extractedStems = {
  //   vocals:
  //     "https://replicate.delivery/pbxt/1gSfimMQQXUjJq0cvf9SF75brz4dAjamrv2dSIop77KyKfUlA/vocals.mp3",
  //   drums:
  //     "https://replicate.delivery/pbxt/heGVOwwfnpueRocVAZJnid05blF5exIawzaehBwxNfgisynqE/drums.mp3",
  //   bass: "https://replicate.delivery/pbxt/f8MYlycITaS2X68pMxfL2fCZr0JHNb5IjeAVf8jGfOZssynqE/bass.mp3",
  //   other:
  //     "https://replicate.delivery/pbxt/V9NLOgeGpV2hG6RYXuNJma8DZ8wAnLRpA6DjrKopnkeyKfUlA/other.mp3",
  // };

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
        audioElements[i].currentTime = 0; // Optionally reset the time to ensure all tracks start from the beginning
      }
    }

    if (isPlaying) {
      Promise.all(playPromises)
        .then(() => {
          // All audio tracks have started playing
          console.log("Playing");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          // Handle any errors (e.g., user hasn't interacted with the document yet)
        });
    }
  }, [isPlaying]);

  return (
    <>
      <section className="w-full mt-4">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 text-center md:px-6">
          <div>
            <h1 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Your music, deconstructed.
            </h1>
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="mt-6">
                <AudioLines className="h-[1.2rem] w-[1.2rem] mr-2" />
                Upload Song
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-2/3">
              <DrawerHeader>
                <DrawerTitle>Upload a song to split stems</DrawerTitle>
                <DrawerDescription>
                  Accepted file types: mp3, wav
                </DrawerDescription>
                <Uploader
                  onUploadComplete={(url) => {
                    setDrawerOpen(false);
                    setUploadedUrl(url);
                  }}
                />
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="flex flex-col mt-6 gap-2">
            <div className="flex gap-2">
              <MousePointer className="h-[1.2rem] w-[1.2rem]" />
              <p className="text-sm">Press to mute/unmute stems</p>
            </div>
            <div className="flex gap-2">
              <MousePointerClick className="h-[1.2rem] w-[1.2rem]" />
              <p className="text-sm">Press and hold to isolate stems</p>
            </div>
          </div>

          <div className="mt-6" />

          {loading && (
            <>
              <Loader />
              <p>Extracting stems. This may take a while...</p>
            </>
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
        </div>
      </section>
    </>
  );
}
