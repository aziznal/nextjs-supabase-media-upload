"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";

export default function UploadImagePage() {
  const supabase = createClientComponentClient();

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const uploadImage = async (imageFile: File) => {
    setIsUploading(true);

    const uploadRes = await supabase.storage
      .from("images")
      .upload(`test/${imageFile.name}`, imageFile, {
        upsert: true,
      })
      .finally(() => {
        setIsUploading(false);
      });

    console.log("Upload Result: ", uploadRes);

    if (!uploadRes.data) {
      return;
    }

    const publicAccessUrl = supabase.storage
      .from("images")
      .getPublicUrl(uploadRes.data?.path).data.publicUrl;

    console.log("Public Access URL: ", publicAccessUrl);
  };

  return (
    <div className="items-center justify-center flex min-h-full gap-24">
      <div className="w-[400px] flex flex-col gap-4 items-center">
        <Input
          type="file"
          accept=".jpg,.png"
          value={currentFile ? undefined : ""}
          ref={ref}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;

            if (!file) {
              return;
            }

            setCurrentFile(file);
          }}
        />

        {currentFile && (
          <Button
            className="w-fit"
            variant="destructive"
            onClick={() => {
              setCurrentFile(null);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {currentFile && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">File Details</h1>

          <div className="grid grid-cols-2 w-[300px]">
            <span className="font-bold">Name:</span>{" "}
            <span>{currentFile.name}</span>
            <span className="font-bold">Type: </span>{" "}
            <span>{currentFile.type}</span>
            <span className="font-bold">Size: </span>{" "}
            <span>{currentFile.size / 1000}KB</span>
          </div>

          <Button
            disabled={isUploading}
            onClick={() => uploadImage(currentFile)}
          >
            {isUploading ? <>Uploading...</> : <>Upload to Supabase</>}
          </Button>
        </div>
      )}
    </div>
  );
}
