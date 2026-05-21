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
  const [step,     setStep]    = useState('form')
  const [size,     setSize]    = useState('6kg')
  const [qty,      setQty]     = useState(1)
  const [station,  setStation] = useState(null)
  const [distKm,   setDistKm]  = useState(null)
  const [travel,   setTravel]  = useState(null)
  const [resCount, setResCount]= useState(todayCount)
  const [toast,    setToast]   = useState('')

  const showToast = m => { setToast(m); setTimeout(()=>setToast(''),3500) }
  const remaining = MAX_DAILY - resCount
  const total     = PRICES[size] * qty

  const findStation = () => {
    if (remaining<=0){ showToast(`⛔ Daily limit — max ${MAX_DAILY} reservations/day`); return }
    setStep('locating')
    const resolve = (lat,lng) => {
      let nearest=null, minD=Infinity
      STATIONS.forEach(s=>{
        const d=haversineKm(lat,lng,s.lat,s.lng)
        if(d<minD){minD=d;nearest=s}
      })
      setStation(nearest)
      setDistKm(minD.toFixed(1))
      setTravel(travelMins(minD))
      setStep('result')
    }
    navigator.geolocation.getCurrentPosition(
      p => resolve(p.coords.latitude, p.coords.longitude),
      ()  => resolve(6.5244, 3.3792),
      { timeout:8000 }
    )
  }

  const confirm = () => { incRes(); setResCount(c=>c+1); setStep('confirmed') }

  return (
    <div style={{ padding:'20px 0 0' }}>
      <div style={{ display:'flex', gap:10, marginBottom:18 }}>
        {[...Array(MAX_DAILY)].map((_,i) => {
          const used = i < resCount
          return (
            <div key={i} style={{ flex:1, background:used?'#fee2e2':'#e8f5e9', border:`1px solid ${used?'#fca5a5':'#a7f3d0'}`, borderRadius:11, padding:'11px 9px', textAlign:'center' }}>
              <div style={{ fontSize:19, marginBottom:2 }}>{used?'🔴':'🟢'}</div>
              <div style={{ fontSize:10, fontWeight:700, color:used?'#b91c1c':'#166534' }}>{used?'Used':'Available'}</div>
            </div>
          )
        })}
        <div style={{ flex:2.5, ...cardStyle, padding:'11px 13px' }}>
          <div style={{ fontSize:11, color:'rgba(14,26,14,0.5)', marginBottom:2 }}>Today's reservations</div>
          <div style={{ fontWeight:900, fontSize:18 }}>{resCount} <span style={{ fontSize:12, opacity:.5 }}>/ {MAX_DAILY}</span></div>
          <div style={{ fontSize:10.5, color:remaining>0?'#226e22':'#b91c1c', marginTop:2 }}>
            {remaining>0?`${remaining} remaining`:'Resets tomorrow'}
          </div>
        </div>
      </div>

      {step==='form' && <>
        <SectionLabel>🔵 Cylinder Size</SectionLabel>
        <div style={{ display:'flex', gap:8, marginBottom:18 }}>
          {Object.entries(PRICES).map(([sz,pr]) => (
            <button key={sz} onClick={()=>setSize(sz)} style={{ flex:1, background:size===sz?'#1a5c1a':'#fff', color:size===sz?'#fff':'#0e1a0e', border:`2px solid ${size===sz?'#226e22':'#e0e0e0'}`, borderRadius:11, padding:'13px 6px', cursor:'pointer', textAlign:'center', fontFamily:'inherit', transition:'all .15s' }}>
              <div style={{ fontWeight:900, fontSize:16, marginBottom:3 }}>{sz}</div>
              <div style={{ fontSize:11, opacity:.7 }}>₦{pr.toLocaleString()}</div>
            </button>
          ))}
        </div>

        <SectionLabel>🔢 Quantity</SectionLabel>
        <div style={{ ...cardStyle, marginBottom:18, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={()=>setQty(q=>Math.max(1,q-1))} disabled={qty<=1} style={{ width:42, height:42, borderRadius:10, border:'1.5px solid #e0e0e0', background:'#f5f5f5', fontSize:21, cursor:qty>1?'pointer':'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', opacity:qty<=1?.4:1 }}>−</button>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontWeight:900, fontSize:30, lineHeight:1 }}>{qty}</div>
            <div style={{ fontSize:12, color:'rgba(14,26,14,0.5)' }}>cylinder{qty>1?'s':''}</div>
          </div>
          <button onClick={()=>setQty(q=>Math.min(remaining,q+1))} disabled={qty>=remaining} style={{ width:42, height:42, borderRadius:10, border:'1.5px solid #aeeaae', background:'#f0faf0', fontSize:21, cursor:qty<remaining?'pointer':'not-allowed', color:'#226e22', display:'flex', alignItems:'center', justifyContent:'center', opacity:qty>=remaining?.4:1 }}>+</button>
        </div>

        <div style={{ ...cardStyle, background:'#f0faf0', border:'1px solid #d6f5d6', marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:14 }}>
            <span style={{ color:'rgba(14,26,14,0.5)' }}>Cylinder</span>
            <span style={{ fontWeight:600 }}>{qty}× {size} @ ₦{PRICES[size].toLocaleString()}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid #d6f5d6' }}>
            <span style={{ fontWeight:700, fontSize:15 }}>Total</span>
            <span style={{ fontWeight:900, fontSize:19, color:'#1a5c1a' }}>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <PrimaryBtn onClick={findStation} disabled={remaining<=0}>
          <span>📍 Find Nearest Pickup Station</span><span>→</span>
        </PrimaryBtn>
      </>}

      {step==='locating' && (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'50px 0', textAlign:'center' }}>
          <div style={{ width:58, height:58, border:'4px solid #d6f5d6', borderTopColor:'#2e8b2e', borderRadius:'50%', animation:'spin 1s linear infinite', marginBottom:20 }} />
          <div style={{ fontWeight:800, fontSize:17, marginBottom:8 }}>Finding your location…</div>
          <div style={{ fontSize:13, color:'rgba(14,26,14,0.5)' }}>Locating your nearest pickup station</div>
        </div>
      )}

      {step==='result' && station && <>
        <div style={{ background:'linear-gradient(135deg,#0d3b0d,#226e22)', borderRadius:15, padding:20, color:'#fff', marginBottom:16 }}>
          <div style={{ fontSize:10, opacity:.6, textTransform:'uppercase', letterSpacing:1.2, marginBottom:11, fontWeight:700 }}>📍 Nearest Pickup Station</div>
          <div style={{ fontWeight:900, fontSize:17, marginBottom:3 }}>{station.name}</div>
          <div style={{ fontSize:13, opacity:.75, marginBottom:16 }}>{station.address}</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:9 }}>
            {[
              ['📏', distKm+' km', 'distance'],
              ['🚗', fmtMins(travel-5), 'drive time'],
              ['⏱️', fmtMins(travel), 'incl. 5-min buffer'],
            ].map(([icon,val,lbl]) => (
              <div key={lbl} style={{ background:'rgba(255,255,255,.12)', borderRadius:10, padding:'11px 7px', textAlign:'center' }}>
                <div style={{ fontSize:17, marginBottom:3 }}>{icon}</div>
                <div style={{ fontWeight:900, fontSize:13, lineHeight:1, marginBottom:2 }}>{val}</div>
                <div style={{ fontSize:9.5, opacity:.6 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:'#fef3c7', border:'1px solid #fcd34d', borderRadius:11, padding:'11px 15px', marginBottom:16, fontSize:13, color:'#78350f', lineHeight:1.65 }}>
          ⏱️ <strong>5-minute buffer included</strong> — accounts for holdups so your cylinder is ready when you arrive.
        </div>

        <div style={{ ...cardStyle, background:'#f0faf0', border:'1px solid #d6f5d6', marginBottom:18 }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>Reservation Summary</div>
          {[
            ['Cylinder',          `${qty}× ${size}`],
            ['Price per cylinder', `₦${PRICES[size].toLocaleString()}`],
            ['Total payable',      `₦${total.toLocaleString()}`],
            ['Pickup station',      station.name],
            ['Estimated arrival',  `${fmtMins(travel)} from now`],
          ].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:9, fontSize:13 }}>
              <span style={{ color:'rgba(14,26,14,0.5)' }}>{k}</span>
              <span style={{ fontWeight:600, textAlign:'right', maxWidth:'55%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <PrimaryBtn onClick={confirm}>✅ Confirm Reservation</PrimaryBtn>
          <button onClick={()=>setStep('form')} style={{ background:'none', border:'1px solid #e0e0e0', borderRadius:14, padding:15, fontSize:14, fontWeight:600, color:'rgba(14,26,14,0.5)', cursor:'pointer', width:'100%', fontFamily:'inherit' }}>← Change Order</button>
        </div>
      </>}

      {step==='confirmed' && (
        <div style={{ textAlign:'center', padding:'40px 18px' }}>
          <div style={{ width:70, height:70, background:'linear-gradient(135deg,#226e22,#3da83d)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:31, margin:'0 auto 20px', boxShadow:'0 10px 36px rgba(46,139,46,.45)' }}>⛽</div>
          <div style={{ fontWeight:900, fontSize:22, marginBottom:9 }}>Cylinder Reserved!</div>
          <p style={{ fontSize:14, color:'rgba(14,26,14,0.5)', lineHeight:1.7, marginBottom:22 }}>
            Your {qty}× {size} cylinder{qty>1?'s are':' is'} reserved at <strong>{station?.name}</strong>. Head over — estimated arrival <strong>{fmtMins(travel)} from now</strong>.
          </p>
          <div style={{ background:'#f0faf0', border:'1px solid #d6f5d6', borderRadius:11, padding:'13px 17px', marginBottom:20, fontSize:13, color:'rgba(14,26,14,0.5)' }}>
            🔁 Reservations used today: <strong style={{ color:'#1a5c1a' }}>{resCount} / {MAX_DAILY}</strong>
          </div>
          <button onClick={()=>setStep('form')} style={{ width:'100%', background:'#f0faf0', border:'1px solid #d6f5d6', borderRadius:14, padding:15, fontSize:14, fontWeight:600, cursor:'pointer', color:'#1a5c1a', fontFamily:'inherit' }}>
            Make Another Reservation
          </button>
        </div>
      )}
      <Toast msg={toast} />
    </div>
  )
}

export default function Explore({ goTo }) {
  const [tab, setTab] = useState('features')

  const features = [
    { icon:'📱', bg:'#e8f5e9', title:'Reserve a Cylinder',        desc:'Order a pre-filled biogas cylinder via the app — max 2 reservations per day.', live:true },
    { icon:'📍', bg:'#e0f2fe', title:'GPS Pickup Station Finder',  desc:'Your GPS locates the nearest station, calculates travel time + 5-minute buffer.', live:true },
    { icon:'📊', bg:'#fef9c3', title:'Usage Tracker',              desc:'Track monthly consumption and CO₂ savings vs traditional LPG.', live:false },
    { icon:'♻️', bg:'#ede9fe', title:'Waste Drop-off & Credits',   desc:'Find organic waste collection points and earn gas credits.', live:false },
    { icon:'💳', bg:'#fce7f3', title:'Subscription Plans',         desc:'Lock in ₦1,015/kg with a monthly plan — never run out of gas again.', live:false },
    { icon:'📣', bg:'#e8f5e9', title:'Refer & Earn',               desc:'Invite friends and earn free gas credits for every successful referral.', live:false },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f7f5f0', display:'flex', flexDirection:'column' }}>
      <div style={darkHdr}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 65% 100% at 92% 50%, rgba(46,139,46,.25) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <div style={{ width:34, height:34, background:'linear-gradient(135deg,#2e8b2e,#56c456)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>♻️</div>
              <span style={{ fontWeight:800, fontSize:16, color:'#fff' }}>Trashformas</span>
            </div>
            <button onClick={()=>goTo('welcome')} style={{ background:'none', border:'none', color:'rgba(255,255,255,.5)', fontFamily:'inherit', fontSize:12, cursor:'pointer' }}>← Home</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {[['₦1,015','per kg'],['+20%','cook time'],['2/day','max reserve']].map(([v,l]) => (
              <div key={l} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.09)', borderRadius:10, padding:'11px 7px', textAlign:'center' }}>
                <div style={{ fontWeight:900, fontSize:14, color:'#7dd87d', lineHeight:1, marginBottom:2 }}>{v}</div>
                <div style={{ fontSize:9.5, color:'rgba(255,255,255,.42)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:'#fff', borderBottom:'1px solid #ececec', padding:'0 22px' }}>
        <div style={{ display:'flex', maxWidth:480, margin:'0 auto' }}>
          {[['features','🛠 Features'],['reserve','📍 Reserve Demo']].map(([t,lbl]) => (
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, background:'none', border:'none', borderBottom:`2.5px solid ${tab===t?'#2e8b2e':'transparent'}`, padding:'14px 8px', fontSize:14, fontWeight:600, color:tab===t?'#226e22':'rgba(14,26,14,0.5)', cursor:'pointer', transition:'all .15s', fontFamily:'inherit' }}>{lbl}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'22px 20px 54px', maxWidth:480, margin:'0 auto', width:'100%' }}>
        {tab==='features' && <>
          <SectionLabel>⛽ Gas Pricing</SectionLabel>
          <div style={{ background:'linear-gradient(135deg,#0d3b0d,#226e22)', borderRadius:15, padding:20, color:'#fff', marginBottom:20 }}>
            <div style={{ fontSize:10, opacity:.6, textTransform:'uppercase', letterSpacing:.8, marginBottom:13, fontWeight:700 }}>Trashformas vs Traditional LPG</div>
            <div style={{ display:'flex', gap:18 }}>
              {[
                ['Trashformas Biogas','₦1,015','per kg · from organic waste'],
                ['Traditional LPG','~₦1,200+','market price (rising)'],
              ].map(([lbl,price,note]) => (
                <div key={lbl} style={{ flex:1 }}>
                  <div style={{ fontSize:10, opacity:.55, marginBottom:5, textTransform:'uppercase', letterSpacing:.4 }}>{lbl}</div>
                  <div style={{ fontWeight:900, fontSize:21, lineHeight:1, marginBottom:4 }}>{price}</div>
                  <div style={{ fontSize:11, opacity:.6, lineHeight:1.4 }}>{note}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'rgba(255,255,255,.13)', borderRadius:8, padding:'5px 11px', fontSize:11.5, fontWeight:600, display:'inline-block', marginTop:14 }}>
              💡 +20% more cook time = real savings beyond the price tag
            </div>
          </div>

          <SectionLabel>🛠 App Features</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:22 }}>
            {features.map(({icon,bg,title,desc,live}) => (
              <div key={title} style={{ ...cardStyle, display:'flex', gap:13, alignItems:'flex-start' }}>
                <div style={{ width:46, height:46, minWidth:46, background:bg, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight:800, fontSize:14, marginBottom:3 }}>{title}</div>
                  <div style={{ fontSize:13, color:'rgba(14,26,14,0.5)', lineHeight:1.55 }}>{desc}</div>
                  <span style={{ display:'inline-block', fontSize:10, fontWeight:700, background:live?'#dcfce7':'#fef3c7', color:live?'#166534':'#92400e', borderRadius:5, padding:'2px 7px', marginTop:7 }}>
                    {live?'✅ In Demo':'Coming Soon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={()=>goTo('waitlist')}>
            <span>Join the Waitlist</span><span>→</span>
          </PrimaryBtn>
        </>}
        {tab==='reserve' && <ReservationDemo />}
      </div>
    </div>
  )
}
