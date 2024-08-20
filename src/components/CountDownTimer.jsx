import { appStore } from "@/state/appState";
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const formatTime = (time) => 
{
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    
    if(minutes <=10) minutes = '0' + minutes;
    if(seconds <=10) seconds = '0' + seconds;

    return minutes + ': ' + seconds
}

const DisplayTime = () => {

}

export default function CountDownTimer({ seconds })
{
    const advertState = appStore((state) => state)
    const [countdown, setCountDown] = useState(seconds)
    const [theTime, setTheTime] = useState(0)
    const timerId = useRef()    
    const navigate = useNavigate()

    useEffect(() => 
    {
        timerId.current = setInterval(() => 
        {
            setCountDown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if(countdown <= 0)
        {
            clearInterval(timerId.current)
            advertState.setForce('yes')
            navigate('/dashboard/force-submit', { replace: true })
        }
    }, [countdown])

    const runningOut = (countdown < 300) ? 'bg-red-700' : 'bg-green-700'

    return (
        <div className="w-full flex jsutify-center items-center center">
            <h1 className={`font-bold md:text-lg text-sm text-white px-5 py-2 w-fit rounded-full ${runningOut}`}> { formatTime(countdown) }</h1>
            { (countdown < 300) && <span className="text-red-600 font-bold md:text-md text-md px-3">Upon Time Elapsed, Application will ask you to submit</span> }
        </div>
    )
}

