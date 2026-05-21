export const C = {
  g900:'#0d3b0d', g800:'#1a5c1a', g700:'#226e22', g600:'#2e8b2e',
  g500:'#3da83d', g400:'#56c456', g300:'#7dd87d', g200:'#aeeaae',
  g100:'#d6f5d6', g50:'#f0faf0',
  ink:'#0e1a0e', ink80:'rgba(14,26,14,0.8)', ink50:'rgba(14,26,14,0.5)',
  cream:'#f7f5f0', white:'#ffffff', amber:'#d97706', amberL:'#fef3c7',
}

export const inp = {
  width:'100%', background:'#f0faf0', border:'1.5px solid #d6f5d6',
  borderRadius:10, padding:'13px 15px', fontSize:15,
  color:'#0e1a0e', outline:'none', boxSizing:'border-box',
  transition:'border-color .15s, background .15s', fontFamily:'inherit',
}

export const cardStyle = {
  background:'#ffffff', border:'1px solid rgba(0,0,0,.07)',
  borderRadius:16, padding:20, boxShadow:'0 2px 10px rgba(0,0,0,.05)',
}

export const darkHdr = {
  background:'#0e1a0e', padding:'24px 22px 40px',
  position:'relative', overflow:'hidden',
}

export function Spinner() {
  return (
    <div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin .7s linear infinite', flexShrink:0 }} />
  )
}

export function Toast({ msg }) {
  if (!msg) return null
  return (
    <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#0e1a0e', color:'#fff', borderRadius:10, padding:'13px 22px', fontSize:13.5, fontWeight:500, boxShadow:'0 8px 32px rgba(0,0,0,.22)', zIndex:9999, whiteSpace:'nowrap' }}>
      {msg}
    </div>
  )
}

export function PrimaryBtn({ children, onClick, disabled, loading, style:s={} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{ width:'100%', background:disabled?'#c8e6c9':'linear-gradient(135deg,#226e22,#3da83d)', color:'#fff', border:'none', borderRadius:14, padding:'17px 20px', fontSize:15, fontWeight:700, cursor:disabled?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:disabled?'none':'0 6px 20px rgba(46,139,46,.35)', transition:'transform .15s', fontFamily:'inherit', ...s }}
      onMouseEnter={e => { if (!disabled && !loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {loading ? <><Spinner />&nbsp;Saving…</> : children}
    </button>
  )
}

export function GhostBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ width:'100%', background:'rgba(255,255,255,.07)', color:'rgba(255,255,255,.85)', border:'1px solid rgba(255,255,255,.14)', borderRadius:14, padding:'16px 20px', fontSize:14, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'background .15s', fontFamily:'inherit' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)' }}
    >
      {children}
    </button>
  )
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:1.8, textTransform:'uppercase', color:'rgba(14,26,14,0.5)', marginBottom:10 }}>
      {children}
    </div>
  )
}

export function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background:'none', border:'none', color:'rgba(255,255,255,.5)', fontFamily:'inherit', fontSize:13, cursor:'pointer', padding:0, marginBottom:18 }}>
      ← Back
    </button>
  )
              }
