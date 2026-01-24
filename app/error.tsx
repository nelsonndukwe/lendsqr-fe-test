'use client'

import { useEffect } from "react"

interface ErrorStateProps{
    error?: Error
}

const ErrorState = ({error}:ErrorStateProps) =>{
   useEffect(()=>{
console.log(error);

   },[error])

   return <div>Error</div>
}

export default ErrorState