"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>();
  const [checkingSession, setCheckingSession] = useState(true);

  const supabase = createClientComponentClient();

  // set session
  useEffect(() => {
    supabase.auth
      .getSession()
      .then((session) => setSession(session.data.session))
      .then(() => setCheckingSession(false));
  }, [supabase]);

  // check session is valid
  useEffect(() => {
    if (checkingSession) return;

    if (!session) {
      alert("You must be logged in to view this page");
      redirect("/login");
    }
  }, [session, checkingSession]);

  if (checkingSession) {
    return (
      <div>
        <h1>Checking session...</h1>
      </div>
    );
  }

  return <>{children}</>;
}
