import React from "react"

interface OneProps{
    children?:React.ReactChild,
}

function One(props:OneProps) {  
    return <div>ExOne {props.children}</div>
}


export default One;