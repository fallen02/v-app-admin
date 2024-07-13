"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { LoginUserType } from "@/types/type"
import { createClient } from "@/lib/client"





export default function CardWithForm() {
  const router = useRouter()
  const { toast } = useToast()

  const initDATA = {
    email: '',
    password: ''
  }
  const [user, setUser] = useState<LoginUserType>(initDATA)
  const [subError, setSubError] = useState<boolean>(false)

  const showToast = (title: string, description: string, variant: "destructive" | "default") => {
    toast({
      title: title,
      description: description,
      variant: variant,
      duration: 2000,
    })
  }

  const handleInputChage = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async () => {    
    const supabase =  createClient()
   
     const { error, data } = await supabase.auth.signInWithPassword(user)
    if(error) showToast("Authentication Failed!", "Check email or password", "destructive")
    else{
      showToast("Welcome Back", "Authentication Successfull", "default")
      router.push("/")
    }
    
  }
  return (
    <div className="h-dvh flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-center text-xl text-pretty">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Enter email" type="email" className={subError ? 'border-red-400' : ''} onChange={handleInputChage} onClickCapture={() => setSubError(false)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" placeholder="Enter password" className={subError ? 'border-red-400' : ''} type="password" onChange={handleInputChage} onClickCapture={() => setSubError(false)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}