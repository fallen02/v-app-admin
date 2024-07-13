"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavSidebar from "@/components/nav";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  const router = useRouter()
  const signOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    router.push('/login')
  }



  return (
    <div className="">
      Hello
    </div>

  );
}
