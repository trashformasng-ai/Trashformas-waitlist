import { PrimaryBtn, GhostBtn } from '../components/ui.jsx'

export default function Success({ goTo, position }) {
  return (
      <div style={{ minHeight:'100vh', background:'#0e1a0e', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 22px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 55% at 15% 28%, rgba(46,139,46,.38) 0%, transparent 55%)', pointerEvents:'none' }} />

                  <div style={{ position:'relative', zIndex:1, maxWidth:360, width:'100%', textAlign:'center', color:'#fff' }}>

                          <div style={{ width:78, height:78, background:'linear-gradient(135deg,#226e22,#3da83d)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:35, margin:'0 auto 26px', boxShadow:'0 12px 40px rgba(46,139,46,.45)' }}>✅</div>

                                  <h2 style={{ fontSize:30, fontWeight:900, letterSpacing:-.8, marginBottom:11 }}>You're on the list!</h2>

                                          <p style={{ fontSize:14, color:'rgba(255,255,255,.56)', lineHeight:1.75, marginBottom:28, fontWeight:300 }}>
                                                    Welcome to the Trashformas family. We'll reach out via WhatsApp as soon as we launch in your area — get ready to reserve your first pre-filled biogas cylinder!
                                                            </p>

                                                                    {position && (
                                                                              <div style={{ background:'rgba(76,175,80,.1)', border:'1px solid rgba(76,175,80,.22)', borderRadius:14, padding:'17px 22px', marginBottom:16 }}>
                                                                                          <div style={{ fontSize:10.5, letterSpacing:2, textTransform:'uppercase', color:'#7dd87d', marginBottom:7, fontWeight:600 }}>Your Waitlist Position</div>
                                                                                                      <div style={{ fontWeight:900, fontSize:38, lineHeight:1 }}>#{position}</div>
                                                                                                                </div>
                                                                                                                        )}

                                                                                                                                <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:13, padding:'13px 17px', marginBottom:28, fontSize:13, color:'rgba(255,255,255,.5)', lineHeight:1.65 }}>
                                                                                                                                          📬 Saved to Forminit. Confirmation email sent via Web3Forms.
                                                                                                                                                  </div>

                                                                                                                                                          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                                                                                                                                                    <PrimaryBtn onClick={() => goTo('explore')}>
                                                                                                                                                                                <span>Explore the App</span><span>→</span>
                                                                                                                                                                                          </PrimaryBtn>
                                                                                                                                                                                                    <GhostBtn onClick={() => goTo('welcome')}>
                                                                                                                                                                                                                <span>← Back to Home</span><span />
                                                                                                                                                                                                                          </GhostBtn>
                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                              }