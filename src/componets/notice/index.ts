/*
 * @Author: Jackstraw
 * @Date: 2021-05-30 21:33:39
 * @Description: 
 * @FilePath: /vite-react/src/componets/notice/index.ts
 * 好好学习、天天向上 >> 1432316105@qq.com
 */

import { message, notification } from "antd"
import {  ArgsProps,ConfigOnClose,MessageType } from "antd/es/message/index"

let message_duration:number = 10
let notice_duration:number = 10
 

declare type JointContent = React.ReactNode | string | ArgsProps;
declare type ConfigDuration = number | (() => void);

message.config({
    duration:message_duration,
    maxCount: 10,
})

notification.config({
    duration:notice_duration
})

class Box {
    // info=(content: JointContent, duration?:ConfigDuration, onClose?:ConfigOnClose): MessageType=>{
    //     return message.info(content,duration||message_duration,onClose)
    // };
    // success=(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType=>{
    //     return message.success(content,duration||message_duration,onClose)
    // };
    // error=(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType=>{
    //     return message.error(content,duration||message_duration,onClose)
    // };
    // warning = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType=>{
    //     return message.warning(content,duration||message_duration,onClose)
    // };
    // loading = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType => {
    //     return message.loading(content,duration||message_duration,onClose)
    // };
    // open = (args: ArgsProps): MessageType =>{
    //     return message.open(args);
    // };
    // destroy = (messageKey?: React.Key): void =>{
    //     message.destroy(messageKey)
    // }

    
}

export default notification;
export const box = message;
