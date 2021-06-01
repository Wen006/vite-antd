import { Button } from "antd";
import React from "react"

interface OneProps{
    children?:React.ReactChild,
}

function One(props:OneProps) {  
    return  <>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </>
}


export default One;