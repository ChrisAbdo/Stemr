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
import Uploader from "./uploader";
import { Button } from "./ui/button";
import { AudioLines } from "lucide-react";

export default function UploadSong({
  isDrawerOpen,
  setDrawerOpen,
  setUploadedUrl,
}: {
  isDrawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  setUploadedUrl: (url: string) => void;
}) {
  return (
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
          <DrawerDescription>Accepted file types: mp3, wav</DrawerDescription>
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
  );
}
