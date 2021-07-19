/*
 * @Author: Jackstraw
 * @Date: 2021-07-19 21:13:27
 * @Description: 
 * 好好学习、天天向上 >> 1432316105@qq.com
 */
import React from 'react';
import {  FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';


const I18n:React.FC<MessageDescriptor> = (props:MessageDescriptor):React.ReactElement =>{
    return <FormattedMessage {...props}></FormattedMessage>
}
const getMessage = (props:MessageDescriptor):string =>{
   const intl = useIntl();
   return intl.formatMessage(props)
}

export {
    I18n,
    getMessage,
}