import { useState } from 'react'
import { C, cardStyle, darkHdr, PrimaryBtn, SectionLabel, Toast } from '../components/ui.jsx'

const STATIONS = [
  { id:1, name:'Trashformas Hub — Yaba',          lat:6.5158, lng:3.3724, address:'14 Herbert Macaulay Way, Yaba' },
  { id:2, name:'Trashformas Hub — Surulere',      lat:6.4969, lng:3.3481, address:'22 Bode Thomas St, Surulere' },
  { id:3, name:'Trashformas Hub — Ikeja',         lat:6.5954, lng:3.3378, address:'7 Adeniyi Jones Ave, Ikeja' },
  { id:4, name:'Trashformas Hub — Lekki Phase 1', lat:6.4314, lng:3.4748, address:'5 Admiralty Way, Lekki' },
  { id:5, name:'Trashformas Hub — Ikorodu',       lat:6.6188, lng:3.5091, address:'Ikorodu Rd, Junction Bus Stop' },
]

function haversineKm(a,b,c,d){
  const R=6371,dL=(c-a)*Math.PI/180,dl=(d-b)*Math.PI/180
  const x=Math.sin(dL/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dl/2)**2
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))
}
function travelMins(km){ return Math.round((km/25)*60)+5 }
function fmtMins(m){ return m<60?`${m} min`:`${Math.floor(m/60)}h ${m%60}min` }

const PRICES    = { '6kg':6090, '12.5kg':12688, '25kg':25375 }
const MAX_DAILY = 2
const RES_KEY   = 'tf_reservations'

function todayCount(){
  try{
    const d=JSON.parse(localStorage.getItem(RES_KEY)||'{}')
    return d[new Date().toDateString()]||0
  }catch{return 0}
}
function incRes(){
  const t=new Date().toDateString()
  const d=JSON.parse(localStorage.getItem(RES_KEY)||'{}')
  d[t]=(d[t]||0)+1
  localStorage.setItem(RES_KEY,JSON.stringify(d))
}

function ReservationDemo() {
  const [step,     setStep]    = useState('for
