"use client"

import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

function ThemeSwitcher() {
    const {theme,setTheme} = useTheme();
    const [mounted,setMounted] = React.useState(false)

    useEffect(()=>{
        setMounted(true)
    }, [])

    if(!mounted) return null;

    return (
        <Tabs defaultValue={theme}>
            <TabsList className='border dark:border-neutral-700 dark:bg-[#030303]'>
                <TabsTrigger value="light" onClick={(e) => setTheme("light")}>
                    <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-90
                    transition-all dark:rotate-0' />
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}>
                    <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90
                    transition-all dark:rotate-0' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ThemeSwitcher