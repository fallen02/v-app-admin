'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'



export default function AddExisting() {
    interface TitleType {
        english?: string
        romanji?: string
    }
    interface selectAnimeType {
        id: string
        title: TitleType
    }
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [animeId, setAnimeID] = useState<string | null>(null)
    const [anilist, setAnilist] = useState<Array<selectAnimeType> | null>(null)
    const [t_episodes, setT_episodes] = useState<number | null>(null)



    const supabase = createClient()
    useEffect(() => {
        const getData = async () => {

            let { data:titleAndId, error } = await supabase.from('anihub').select('id, title')

            setAnilist(titleAndId)
            console.log(titleAndId)
        }
        getData()

    }, [!anilist])

    const getTotalEp = async (id: string) => {
        const {data:tEpisodes, error} = await supabase.from('anihub').select('totalEpisodes').eq('id', id)
        if(!tEpisodes) return
        console.log(tEpisodes[0].totalEpisodes)
        setT_episodes(parseInt(tEpisodes[0].totalEpisodes))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Existing one</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? anilist?.find((anime) => anime.title.english === value)?.title.english
                                    : "Select Anime..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-1">
                            <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No anime found.</CommandEmpty>
                                    {/* <CommandGroup> */}
                                        {anilist?.map((anime) => (
                                            <CommandItem
                                                key={anime.title.english}
                                                value={anime.title.english}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setAnimeID(anime.id == animeId ? null : anime.id)
                                                    getTotalEp(anime.id)
                                                    setOpen(false)
                                                    
                                                }}
                                            
                                            >
                                                {anime.title.english}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === anime.title.english ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    {/* </CommandGroup> */}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {t_episodes && t_episodes}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
