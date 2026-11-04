import {useEffect,useId,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {Info} from 'lucide-react';

export function Tooltip({label,text,badge}:{label:string;text:string;badge?:string}){
 const id=useId(),trigger=useRef<HTMLButtonElement>(null),bubble=useRef<HTMLDivElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [open,setOpen]=useState(false),[pos,setPos]=useState({left:0,top:0,ready:false});
 const touch=useRef(false);
 const clear=()=>{if(timer.current)clearTimeout(timer.current)};
 const show=()=>{clear();document.dispatchEvent(new CustomEvent("jingxu-tooltip",{detail:id}));setOpen(true)};
 const hide=()=>{clear();timer.current=setTimeout(()=>setOpen(false),180)};
 useEffect(()=>{const other=(e:Event)=>{if((e as CustomEvent).detail!==id){clear();setOpen(false)}};document.addEventListener("jingxu-tooltip",other);return()=>{clear();document.removeEventListener("jingxu-tooltip",other)}},[id]);
 useLayoutEffect(()=>{if(!open)return;const place=()=>{const a=trigger.current?.getBoundingClientRect(),b=bubble.current?.getBoundingClientRect();if(!a||!b)return;setPos({left:Math.max(12,Math.min(a.left+a.width/2-b.width/2,window.innerWidth-b.width-12)),top:a.bottom+b.height+12<window.innerHeight?a.bottom+8:Math.max(12,a.top-b.height-8),ready:true})};place();window.addEventListener('resize',place);window.addEventListener('scroll',place,true);return()=>{window.removeEventListener('resize',place);window.removeEventListener('scroll',place,true)}},[open]);
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!trigger.current?.contains(e.target as Node)&&!bubble.current?.contains(e.target as Node)){clear();setOpen(false)}};const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){clear();setOpen(false)}};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)}},[open]);
 return <><button ref={trigger} type="button" className={badge?'tooltip-trigger prototype':'tooltip-trigger info-button'} aria-label={label} aria-describedby={open?id:undefined} onPointerDown={e=>{touch.current=e.pointerType==='touch'}} onPointerEnter={e=>{if(e.pointerType!=='touch')show()}} onPointerLeave={e=>{if(e.pointerType!=='touch')hide()}} onFocus={()=>{if(!touch.current)show()}} onBlur={hide} onClick={()=>{if(touch.current){if(open){clear();setOpen(false)}else show()}else show()}}>{badge||<Info size={15}/>}</button>{open&&createPortal(<div id={id} ref={bubble} role="tooltip" className="custom-tooltip" style={{left:pos.left,top:pos.top,visibility:pos.ready?'visible':'hidden'}} onPointerEnter={show} onPointerLeave={hide}>{text}</div>,document.body)}</>
}
