// @ts-nocheck
/*
{
  bass: 'https://replicate.delivery/pbxt/f09dTehfTTV9uJviVHapWUKky5Hf0EFVOgjrhfzpZPBicIPVC/bass.mp3',
  drums: 'https://replicate.delivery/pbxt/Xqt3j7IlM0Z4O9Z273YfOW7WSDZ9A6oT3Db3qCCjfY7lD5pSA/drums.mp3',
  other: 'https://replicate.delivery/pbxt/MYXzWwLSbrZvORueS3FPj8NyisPIlQNe9T3JHHfZ7l5LHyTlA/other.mp3',
  vocals: 'https://replicate.delivery/pbxt/LhbfIVeFEVt83kQfEUQTU8DUwJ6AVfl2aau3IfaFKjyhcIPVC/vocals.mp3'
}

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
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Guide } from "@/components/guide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "https://stemr-production.up.railway.app/?audioUrl=https://vyzfg1hdiv0uevlh.public.blob.vercel-storage.com/1MXMOVF-dqGavlr9FKG31NHHeUwerO0G3uRKHY.mpeg",
      {
        method: "POST",
        body: JSON.stringify({
          audioUrl: uploadedUrl,
        }),
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
    // <div className="bg-background">
    //   <div className="relative isolate px-6 pt-14 lg:px-8">
    //     <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    //       <div className="text-center">
    //         <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
    //           Web Stem Player
    //         </h1>
    //         <p className="mt-6 text-lg leading-8 text-gray-600">
    //           web stem player is a web application that allows you to separate
    //           the vocals, drums, bass, and other instruments from a song.
    //         </p>
    //         <div className="mt-10 flex items -center justify-center">
    // <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
    //   <DrawerTrigger asChild>
    //     <Button>Upload Song</Button>
    //   </DrawerTrigger>
    //   <DrawerContent className="h-2/3">
    //     <DrawerHeader>
    //       <DrawerTitle>Upload a song to split stems</DrawerTitle>
    //       <DrawerDescription>
    //         Accepted file types: mp3, wav
    //       </DrawerDescription>
    //       <Uploader
    //         onUploadComplete={(url) => {
    //           setDrawerOpen(false);
    //           setUploadedUrl(url);
    //         }}
    //       />{" "}
    //     </DrawerHeader>
    //     <DrawerFooter>
    //       <DrawerClose>
    //         <Button variant="outline">Cancel</Button>
    //       </DrawerClose>
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
    //         </div>

    //         {loading && (
    //           <p>Loading your stems &rparr; this may take a while...</p>
    //         )}
    //         <Button onClick={() => setIsPlaying(!isPlaying)}>
    //           {isPlaying ? "Pause" : "Play"}
    //         </Button>

    //         <Visualizer
    //           audioUrl={genData.other}
    //           mute={isOtherMuted}
    //           onToggleMute={() => setOtherMuted(!isOtherMuted)}
    //           isPlaying={isPlaying}
    //         />
    //         <Visualizer
    //           audioUrl={genData.bass}
    //           mute={isBassMuted}
    //           onToggleMute={() => setBassMuted(!isBassMuted)}
    //           isPlaying={isPlaying}
    //         />
    // <Visualizer
    //   audioUrl={genData.vocals}
    //   mute={isVocalsMuted}
    //   onToggleMute={() => setVocalsMuted(!isVocalsMuted)}
    //   isPlaying={isPlaying}
    // />
    //         <Visualizer
    //           audioUrl={genData.drums}
    //           mute={isDrumsMuted}
    //           onToggleMute={() => setDrumsMuted(!isDrumsMuted)}
    //           isPlaying={isPlaying}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stemmer
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Deconstruct your favorite songs into stems and remix them.
            </p>
          </div>
          {/* <Link
          className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#"
        >
          Download Now
        </Link> */}
          <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button>
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
                />{" "}
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <div className="mt-12" />
          {/* VISUALIZER LAYOUT */}

          <h1>vocals</h1>
          <Visualizer
            audioUrl={genData.vocals}
            mute={isVocalsMuted}
            onToggleMute={() => setVocalsMuted(!isVocalsMuted)}
            isPlaying={isPlaying}
          />

          <div className="flex items-center space-x-20 mt-14 mb-14">
            <div className="flex items-center space-x-4">
              <h1>bass</h1>
              <Visualizer
                audioUrl={genData.bass}
                mute={isBassMuted}
                onToggleMute={() => setBassMuted(!isBassMuted)}
                isPlaying={isPlaying}
              />
            </div>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="icon"
              variant="secondary"
            >
              {isPlaying ? (
                <PauseIcon className="w-[1.2rem] h-[1.2rem]" />
              ) : (
                <PlayIcon className="w-[1.2rem] h-[1.2rem]" />
              )}
            </Button>
            <div className="flex items-center space-x-4">
              <Visualizer
                audioUrl={genData.other}
                mute={isOtherMuted}
                onToggleMute={() => setOtherMuted(!isOtherMuted)}
                isPlaying={isPlaying}
              />
              <h1>other</h1>
            </div>
          </div>
          <Visualizer
            audioUrl={genData.drums}
            mute={isDrumsMuted}
            onToggleMute={() => setDrumsMuted(!isDrumsMuted)}
            isPlaying={isPlaying}
          />
          <h1>drums</h1>
        </div>
      </section>
      {/* <Guide /> */}

      <div className="p-2">
        <Guide />
      </div>
    </>
  );
}
