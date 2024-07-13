'use client'
import { usePathname } from "next/navigation";
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


export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname()
    const router = useRouter()
    const signOut = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        router.push('/login')
    }

    if (path === '/login')
        return (children)

    return (
        <TooltipProvider delayDuration={0}>
            <main className="flex h-dvh items-center justify-center p-4">
                {/* <Button variant="outline" onClick={signOut}>Logout</Button> */}
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-screen w-dvw rounded-lg border"
                >
                    <ResizablePanel defaultSize={17} minSize={17} maxSize={17}>
                        <h1 className="text-2xl text-center py-3 tracking-wider">Welcome <span className="text-red-900 font-bold">Admin!</span></h1>
                        <Separator />
                        <NavSidebar isCollapsed={false} />
                        <Separator />

                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75}>
                            {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </TooltipProvider>
    );
}