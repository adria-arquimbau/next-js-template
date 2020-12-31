import {useEffect, useState} from "react";

const DATE_UNITS = [
    ['year', 2419200*12],
    ['month', 604800*4],
    ['week', 86400*7],
    ['day', 3600*24],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
]

const getDateDiffs = timestamp => {
    const now = Date.now()
    const elapsed = (timestamp - now) / 1000

    for (const [unit, secondsInUnit] of DATE_UNITS){
        if(Math.abs(elapsed) > secondsInUnit || unit === 'second'){
            const value = Math.round(elapsed / secondsInUnit);
            return {value, unit}
        }
    }
}

export default function useTimeAgo(timeStamp){
    const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timeStamp))

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeAgo = getDateDiffs(timeStamp)
            setTimeAgo(newTimeAgo)
        }, 1000)

        return () => clearInterval(interval)
    }, [timeStamp])
    const rtf = new Intl.RelativeTimeFormat('en', {
        style: "short"
    })
    const { value, unit } = timeAgo

    return rtf.format(value, unit)
}
