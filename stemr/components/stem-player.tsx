// @ts-nocheck
import React from "react";
import Visualizer from "@/components/visualizer";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

export default function StemPlayer({
  genData,
  isPlaying,
  setIsPlaying,
  isVocalsMuted,
  setVocalsMuted,
  isDrumsMuted,
  setDrumsMuted,
  isBassMuted,
  setBassMuted,
  isOtherMuted,
  setOtherMuted,
}: {
  genData: any;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  isVocalsMuted: boolean;
  setVocalsMuted: (value: boolean) => void;
  isDrumsMuted: boolean;
  setDrumsMuted: (value: boolean) => void;
  isBassMuted: boolean;
  setBassMuted: (value: boolean) => void;
  isOtherMuted: boolean;
  setOtherMuted: (value: boolean) => void;
}) {
  const [isIsolating, setIsIsolating] = React.useState(false);

  const handleIsolate = (type: string, isIsolating: boolean) => {
    setIsIsolating(isIsolating);
    setVocalsMuted(isIsolating && type !== "vocals");
    setDrumsMuted(isIsolating && type !== "drums");
    setBassMuted(isIsolating && type !== "bass");
    setOtherMuted(isIsolating && type !== "other");
  };

  let pressTimer: NodeJS.Timeout;

  function createHandlers(type: string) {
    const setMuted = {
      vocals: setVocalsMuted,
      drums: setDrumsMuted,
      bass: setBassMuted,
      other: setOtherMuted,
    }[type];

    return {
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        pressTimer = setTimeout(() => handleIsolate(type, true), 500);
      },
      onMouseUp: () => {
        if (pressTimer) {
          clearTimeout(pressTimer);
          setMuted((m) => !m);
        } else {
          if (isIsolating) {
            handleIsolate(type, false);
          }
          setMuted(false);
        }
      },
    };
  }

  return (
    <>
      <h1 className="text-sm">vocals</h1>
      <Visualizer
        // audioUrl={genData.vocals}
        audioUrl="https://replicate.delivery/czjl/fwK2HKmfGUmYmUvlwS0bCSL9jNea2GPWbb2YIO4TI95fYxyLB/vocals.mp3"
        mute={isVocalsMuted}
        isPlaying={isPlaying}
        {...createHandlers("vocals")}
      />

      <div className="flex items-center space-x-20 mt-14 mb-14">
        <div className="flex items-center space-x-4">
          <h1 className="text-sm">bass</h1>
          <Visualizer
             //audioUrl={genData.bass}
            audioUrl="https://replicate.delivery/czjl/S9bYTL5MFHKSHBQGwrLRLpPeKwPeA3bHZf5emqytnpXfxilXC/bass.mp3"
            mute={isBassMuted}
            isPlaying={isPlaying}
            {...createHandlers("bass")}
          />
        </div>
        <Button
           //disabled={
           //  !genData.vocals || !genData.drums || !genData.bass || !genData.other
           //}
          onClick={() => setIsPlaying(!isPlaying)}
          size="icon"
          variant="secondary"
          className="z-50"
        >
          {isPlaying ? (
            <PauseIcon className="w-[1.2rem] h-[1.2rem]" />
          ) : (
            <PlayIcon className="w-[1.2rem] h-[1.2rem]" />
          )}
        </Button>
        <div className="flex items-center space-x-4">
          <Visualizer
             //audioUrl={genData.other}
            audioUrl="https://replicate.delivery/czjl/qX92fjAaHmWUQKDRrBnxogURxY11BZrJdFYoYpsrjN0HLWeSA/other.mp3"
            mute={isOtherMuted}
            isPlaying={isPlaying}
            {...createHandlers("other")}
          />
          <h1 className="text-sm">other</h1>
        </div>
      </div>
      <Visualizer
         //audioUrl={genData.drums}
        audioUrl="https://replicate.delivery/czjl/2FB1fuNUHOzwWitzG1peveWreTt9aNKDzewDVaWOc1U6xilXC/drums.mp3"
        mute={isDrumsMuted}
        isPlaying={isPlaying}
        {...createHandlers("drums")}
      />
      <h1 className="text-sm">drums</h1>
    </>
  );
}
