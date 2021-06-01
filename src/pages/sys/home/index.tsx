/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 18:13:45
 * @Description: 
 * @FilePath: /vite-react/src/pages/sys/home/index.tsx
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React from "react"

interface HomeProps{
    children?:React.ReactChild,
}

function Home(props:HomeProps) {  
    console.log(`home ===props`, props)
    return <div>ExHome {props.children}</div>
}


export default Home;