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

// TO DO: CONDITIONALS FOR INSTURMENTS so other show up if returns null.

"use client";
import React, { useRef, useEffect, useState } from "react";

export default function Visualizer({
  audioUrl,
  isPlaying,
  mute,
  onMouseDown,
  onMouseUp,
}: {
  audioUrl: string;

  mute: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}) {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [scale, setScale] = useState(1);

  const initAudioAndPlay = async () => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    audioRef.current.play();
    visualize();
  };

  useEffect(() => {
    if (isPlaying) {
      initAudioAndPlay();
    }
  }, [isPlaying]);

  const visualize = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    const draw = () => {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      let maxVolume = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        if (dataArrayRef.current[i] > maxVolume) {
          maxVolume = dataArrayRef.current[i];
        }
      }

      const maxScaleCap = 1.5;
      const baseScale = 1;
      const newScale = Math.min(maxScaleCap, baseScale + maxVolume / 256);

      setScale(newScale);

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  };

  const handleInteraction = (event) => {
    event.preventDefault();
    initAudioAndPlay();
  };

  const backgroundClass = audioUrl
    ? mute
      ? "bg-muted-foreground"
      : "bg-primary"
    : "bg-muted";

  return (
    <div
      style={{
        transition: "transform 0.05s ease-in-out, background-color 0.3s ease",
        transform: `scale(${scale})`,
      }}
      className={`w-[50px] h-[50px] cursor-pointer rounded-full ${backgroundClass}`}
      onClick={handleInteraction}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        src={audioUrl}
        muted={mute}
      />
    </div>
  );
}
