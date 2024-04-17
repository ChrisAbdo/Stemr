import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MousePointer, MousePointerClick } from "lucide-react";

export default function UsageGuide() {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      <Alert className="w-1/2 md:w-1/4 border-none">
        <MousePointer className="h-4 w-4" />
        <AlertTitle>Click</AlertTitle>
        <AlertDescription>
          Mute and unmute the stems by clicking on the visualizer.
        </AlertDescription>
      </Alert>
      <Alert className="w-1/2 md:w-1/4 border-none">
        <MousePointerClick className="h-4 w-4" />
        <AlertTitle>Click and hold</AlertTitle>
        <AlertDescription>
          Isolate the stem by clicking and holding on the visualizer.
        </AlertDescription>
      </Alert>
    </div>
  );
}
