'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddExisting from './addExisting'
import AddNewTab from './addNew'

export function UploadTabs() {
  return (
    <Tabs defaultValue="addexisting" className="w-3/4">
      <TabsList className="grid w-full grid-cols-2 border border-red-400 bg-slate-900">
        <TabsTrigger value="addexisting">Add Existing</TabsTrigger>
        <TabsTrigger value="addnew">Add New</TabsTrigger>
      </TabsList>
      <TabsContent value="addexisting">
        < AddExisting />
      </TabsContent>
      <TabsContent value="addnew">
        < AddNewTab />
      </TabsContent>
    </Tabs>
  )
}
