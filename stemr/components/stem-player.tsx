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
  const isolationTimeoutRef = React.useRef(null);

  const handleIsolate = (type: string, isIsolating: boolean) => {
    setIsIsolating(isIsolating);
    setVocalsMuted(isIsolating && type !== "vocals");
    setDrumsMuted(isIsolating && type !== "drums");
    setBassMuted(isIsolating && type !== "bass");
    setOtherMuted(isIsolating && type !== "other");
  };
  return (
    // const extractedStems = {
    //   vocals:
    //     "https://replicate.delivery/pbxt/1gSfimMQQXUjJq0cvf9SF75brz4dAjamrv2dSIop77KyKfUlA/vocals.mp3",
    //   drums:
    //     "https://replicate.delivery/pbxt/heGVOwwfnpueRocVAZJnid05blF5exIawzaehBwxNfgisynqE/drums.mp3",
    //   bass: "https://replicate.delivery/pbxt/f8MYlycITaS2X68pMxfL2fCZr0JHNb5IjeAVf8jGfOZssynqE/bass.mp3",
    //   other:
    //     "https://replicate.delivery/pbxt/V9NLOgeGpV2hG6RYXuNJma8DZ8wAnLRpA6DjrKopnkeyKfUlA/other.mp3",
    // };
    <>
      <h1 className="text-sm">vocals</h1>
      <Visualizer
        // audioUrl={genData.vocals}
        audioUrl="https://replicate.delivery/pbxt/1gSfimMQQXUjJq0cvf9SF75brz4dAjamrv2dSIop77KyKfUlA/vocals.mp3"
        mute={isVocalsMuted}
        onToggleMute={() => setVocalsMuted(!isVocalsMuted)}
        isPlaying={isPlaying}
        onMouseDown={(e) => {
          e.preventDefault();
          isolationTimeoutRef.current = setTimeout(
            () => handleIsolate("vocals", true),
            1000
          );
        }}
        onMouseUp={() => {
          clearTimeout(isolationTimeoutRef.current);
          if (isIsolating) {
            handleIsolate("vocals", false);
          }
          setVocalsMuted(false);
        }}
      />

      <div className="flex items-center space-x-20 mt-14 mb-14">
        <div className="flex items-center space-x-4">
          <h1 className="text-sm">bass</h1>
          <Visualizer
            // audioUrl={genData.bass}
            audioUrl="https://replicate.delivery/pbxt/f8MYlycITaS2X68pMxfL2fCZr0JHNb5IjeAVf8jGfOZssynqE/bass.mp3"
            mute={isBassMuted}
            onToggleMute={() => setBassMuted(!isBassMuted)}
            isPlaying={isPlaying}
            onMouseDown={() => {
              isolationTimeoutRef.current = setTimeout(
                () => handleIsolate("vocals", true),
                1000
              );
            }}
            onMouseUp={() => {
              clearTimeout(isolationTimeoutRef.current);
              if (isIsolating) {
                handleIsolate("vocals", false);
              }
            }}
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
            // audioUrl={genData.other}
            audioUrl="https://replicate.delivery/pbxt/V9NLOgeGpV2hG6RYXuNJma8DZ8wAnLRpA6DjrKopnkeyKfUlA/other.mp3"
            mute={isOtherMuted}
            onToggleMute={() => setOtherMuted(!isOtherMuted)}
            isPlaying={isPlaying}
            onMouseDown={() => {
              isolationTimeoutRef.current = setTimeout(
                () => handleIsolate("vocals", true),
                1000
              );
            }}
            onMouseUp={() => {
              clearTimeout(isolationTimeoutRef.current);
              if (isIsolating) {
                handleIsolate("vocals", false);
              }
            }}
          />
          <h1 className="text-sm">other</h1>
        </div>
      </div>
      <Visualizer
        // audioUrl={genData.drums}
        audioUrl="https://replicate.delivery/pbxt/heGVOwwfnpueRocVAZJnid05blF5exIawzaehBwxNfgisynqE/drums.mp3"
        mute={isDrumsMuted}
        onToggleMute={() => setDrumsMuted(!isDrumsMuted)}
        isPlaying={isPlaying}
        onMouseDown={() => {
          isolationTimeoutRef.current = setTimeout(
            () => handleIsolate("vocals", true),
            1000
          );
        }}
        onMouseUp={() => {
          clearTimeout(isolationTimeoutRef.current);
          if (isIsolating) {
            handleIsolate("vocals", false);
          }
        }}
      />
      <h1 className="text-sm">drums</h1>
    </>
  );
}
