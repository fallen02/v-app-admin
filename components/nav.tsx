'use client'
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import {
  ArchiveX,
  File,
  Wrench,
  House,
  CloudUpload
} from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { usePathname } from "next/navigation"

interface LinkProps {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
    link: string
  
}

interface navProps{
  isCollapsed: boolean
}
export default function NavSidebar({isCollapsed}:navProps) {
  const links: LinkProps[] = [
    {
      title: "Dahboard",
      label: "",
      icon: House,
      variant: "ghost" as "default" | "ghost",
      link: "/"
    },
    {
      title: "Manage",
      label: "",
      icon: Wrench,
      variant: "ghost" as "default" | "ghost",
      link: "/manage"
    },
    {
      title: "Upload",
      label: "",
      icon: CloudUpload,
      variant: "ghost" as "default" | "ghost",
      link: "/upload"
    },
    {
      title: "Issues",
      label: "",
      icon: ArchiveX,
      variant: "ghost" as "default" | "ghost",
      link: "/issues"
    },
    
  ]

  const Defaultlinks = {

  }

  // Temporary Solution
  const path = usePathname()
  if(path === '/') links[0].variant = 'default'
  if(path.includes('/manage')) links[1].variant = 'default'
  if(path.includes('/upload')) links[2].variant = 'default'
  if(path.includes('/issues')) links[3].variant = 'default'
  console.log(path)



  return(
    <div
      data-collapsed={ isCollapsed }
      className="group flex flex-col gap-4 py-2 data-[collapsed = true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {
          links.map((link, index) => isCollapsed? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.link}
                  className={cn(
                    buttonVariants({variant: link.variant, size: "icon"}),
                    "h-9 w-9",
                    link.variant === 'default' &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                 <link.icon className="h-5 w-5" />
                 <span className="sr-only">{link.title}</span> 
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.link}
              className={cn(
                buttonVariants({ variant: link.variant, size: "lg" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}