"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function UploadVideoPage() {
  const supabase = createClientComponentClient();

  return <>Upload Video</>;
}
