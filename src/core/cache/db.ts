/**
 * @description 简单的浏览器store操作
 * @author wennn
 * @time 20190624
 */
import cookie, { CookieOptions, CookieValues } from 'cookiejs'; 
import { conf } from '../conf';

const strify = (val:any) => {
  return JSON.stringify(val);
};
const parse = (val:string) =>{
  return JSON.parse(val);
};

export const perSetKey = (key:string):string => conf.appName + "_" + key;

export const setStoreItem = (key:string,val:any):any =>{
  localStorage.setItem(perSetKey(key),strify(val))
  return val;
}

export const getStoreItem = (key:string):any =>{
  const val = localStorage.getItem(perSetKey(key));
  if(val){
      return parse(val) 
  }
  return null;
}

export const rmStoreItem = (key:string) => localStorage.removeItem(key)

export const setSession = (key:string,val:any):any =>{
  sessionStorage.setItem(perSetKey(key),strify(val))
  return val;
}

export const getSession = (key:string):any =>{
  const val = sessionStorage.getItem(perSetKey(key));
  if(val){
      return parse(val) 
  }
  return null;
}
export const rmSession = (key:string) => sessionStorage.removeItem(key)


export function setCookie(name?: string | CookieValues, value?: string | null | CookieOptions, options?: CookieOptions | number){
  return cookie(name,value,options);
}

export function getCookie(key:string){
  return cookie.get(key);
}

export {
    cookie
}
