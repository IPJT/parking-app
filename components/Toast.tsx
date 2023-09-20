import * as RadixToast from '@radix-ui/react-toast'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export const Toast = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const eventDateRef = useRef(new Date())
  const timerRef = useRef(0)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <RadixToast.Provider swipeDirection='right'>
      <RadixToast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
        <RadixToast.Title className='ToastTitle'>Scheduled: Catch up</RadixToast.Title>
        <RadixToast.Description asChild>
          <time className='ToastDescription' dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
        </RadixToast.Description>
        <RadixToast.Action className='ToastAction' asChild altText='Goto schedule to undo'>
          <button className='Button small green'>Undo</button>
        </RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport className='ToastViewport' />
    </RadixToast.Provider>
  )
}

function oneWeekAway() {
  const now = new Date()
  const inOneWeek = now.setDate(now.getDate() + 7)
  return new Date(inOneWeek)
}

function prettyDate(date: any) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}
