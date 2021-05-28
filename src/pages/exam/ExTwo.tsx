import React from "react"

interface TwoProps{
    children?:React.ReactChild,
}

function One(props:TwoProps) {  
    return <div>ExTwo {props.children}</div>
}


export default One;