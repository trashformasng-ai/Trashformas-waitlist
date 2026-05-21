import { C, PrimaryBtn, GhostBtn } from '../components/ui.jsx'

export default function Welcome({ goTo }) {
  return (
    <div style={{ minHeight:'100vh', background:'#0e1a0e', color:'#fff', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 75% 55% at 12% 22%, rgba(46,139,46,.38) 0%, transparent 55%), radial-gradient(ellipse 55% 65% at 88% 78%, rgba(26,92,26,.32) 0%, transparent 55%)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, flex:1, display:'flex', flexDirection:'column', padding:'0 22px', maxWidth:480, margin:'0 auto', width:'100%' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:26 }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <div style={{ width:36, height:36, background:'linear-gradient(135deg,#2e8b2e,#56c456)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>♻️</div>
            <span style={{ fontWeight:800, fontSize:18, letterSpacing:-.3 }}>Trashformas</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(76,175,80,.15)', border:'1px solid rgba(76,175,80,.3)', borderRadius:100, padding:'5px 11px', fontSize:11, color:'#7dd87d', fontWeight:500 }}>
            <div style={{ width:6, height:6, background:'#4caf50', borderRadius:'50%', animation:'pulse 2s infinite' }} />
            Launching Soon
          </div>
        </div>

        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'26px 0 14px' }}>
          <div style={{ fontSize:11, letterSpacing:2.5, textTransform:'uppercase', color:'#7dd87d', fontWeight:600, marginBottom:18, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:26, height:1, background:'#56c456' }} /> Rethinking Waste
          </div>

          <h1 style={{ fontSize:'clamp(32px,8vw,46px)', fontWeight:900, lineHeight:1.05, letterSpacing:-1.5, marginBottom:18 }}>
            Waste into<br />
            <span style={{ background:'linear-gradient(90deg,#56c456,#aeeaae)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>cooking gas.</span>
            <br />Cleaner & cheaper.
          </h1>

          <p style={{ fontSize:14, lineHeight:1.75, color:'rgba(255,255,255,.58)', marginBottom:24, fontWeight:300 }}>
            Biogas converted from organic waste — available at{' '}
            <strong style={{ color:'#7dd87d' }}>₦1,015/kg</strong>. Reserve a pre-filled
            cylinder via app, collect from your nearest station, and enjoy{' '}
            <strong style={{ color:'#7dd87d' }}>up to 20% more cook time</strong> per kg
            than traditional LPG.
          </p>

          <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(76,175,80,.18)', borderRadius:15, padding:18, marginBottom:22 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#7dd87d', marginBottom:12, opacity:.85 }}>⚡ Why Trashformas gas is better</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
              {[['₦1,015','per kg'],['+20%','more cook time'],['🌱','carbon-negative']].map(([v,d],i) => (
                <div key={i} style={{ background:'rgba(76,175,80,.09)', border:'1px solid rgba(76,175,80,.12)', borderRadius:11, padding:'13px 7px', textAlign:'center' }}>
                  <div style={{ fontWeight:900, fontSize:i===2?22:17, color:'#56c456', lineHeight:1, marginBottom:4 }}>{v}</div>
                  <div style={{ fontSize:9.5, color:'rgba(255,255,255,.42)', lineHeight:1.3 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:26 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#7dd87d', marginBottom:12, opacity:.85 }}>📱 How it works</div>
            {[
              'Reserve a pre-filled cylinder via the app (max 2/day)',
              'App finds your nearest pickup station via GPS',
              'See your estimated travel time + 5-min buffer',
              'Drive to the station & collect your cylinder',
            ].map((t,i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:11, marginBottom:9 }}>
                <div style={{ width:21, height:21, minWidth:21, background:'rgba(76,175,80,.18)', border:'1px solid rgba(76,175,80,.35)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9.5, fontWeight:800, color:'#56c456' }}>{i+1}</div>
                <span style={{ fontSize:13.5, color:'rgba(255,255,255,.62)', lineHeight:1.55 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingBottom:40, display:'flex', flexDirection:'column', gap:11 }}>
          <PrimaryBtn onClick={() => goTo('waitlist')}>
            <span>Join the Waitlist</span>
            <span style={{ fontSize:18 }}>→</span>
          </PrimaryBtn>
          <GhostBtn onClick={() => goTo('explore')}>
            <span>Explore the App</span>
            <span>↗</span>
          </GhostBtn>
        </div>
      </div>
    </div>
  )
                         }
