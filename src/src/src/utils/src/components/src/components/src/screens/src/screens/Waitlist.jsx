import { useState, useRef } from 'react'
import { C, inp, cardStyle, darkHdr, PrimaryBtn, SectionLabel, BackBtn, Toast } from '../components/ui.jsx'
import { sanitise, isValidEmail, isValidPhone, getSubmitAttempts, incrementSubmitAttempts, submitWaitlist } from '../utils/security.js'

const GAS_PRICE = 1015

export default function Waitlist({ goTo, onSuccess }) {
  const [form, setForm] = useState({ name:'', email:'', whatsapp:'', location:'', usage:'', source:'' })
  const [kg,      setKg]      = useState(12)
  const [loading, setLoading] = useState(false)
  const [toast,   setToast]   = useState('')
  const honeypot = useRef('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const showToast = m => { setToast(m); setTimeout(() => setToast(''), 3500) }

  const monthlyCost   = Math.round(kg * 0.833 * GAS_PRICE)
  const equivalentLPG = Math.round(kg * 1.2)

  const handleSubmit = async () => {
    if (honeypot.current) return
    if (getSubmitAttempts() >= 3) {
      showToast('⚠️ Too many attempts — please wait 15 minutes')
      return
    }
    const name     = sanitise(form.name)
    const email    = sanitise(form.email).toLowerCase()
    const whatsapp = sanitise(form.whatsapp)
    const location = sanitise(form.location)
    const usage    = sanitise(form.usage)
    const source   = sanitise(form.source)

    if (!name || name.length < 2)         return showToast('⚠️ Please enter your full name')
    if (!isValidEmail(email))              return showToast('⚠️ Please enter a valid email address')
    if (!isValidPhone(whatsapp))           return showToast('⚠️ Please enter a valid WhatsApp number')
    if (!location || location.length < 2)  return showToast('⚠️ Please enter your location')

    incrementSubmitAttempts()
    setLoading(true)

    const payload = {
      Name:         name,
      Email:        email,
      WhatsApp:     '+234' + whatsapp,
      Location:     location,
      'Gas Usage':  usage  || 'Not specified',
      'Heard From': source || 'Not specified',
      'Est kg/mo':  kg + 'kg',
      'Est Cost':   '₦' + monthlyCost.toLocaleString() + '/month',
      Submitted:    new Date().toISOString(),
    }

    try {
      const ok = await submitWaitlist(payload)
      if (ok) {
        const prev = parseInt(localStorage.getItem('tf_count') || '0', 10)
        localStorage.setItem('tf_count', String(prev + 1))
        onSuccess(prev + 1)
      } else {
        showToast('⚠️ Something went wrong — please try again')
      }
    } catch {
      showToast('⚠️ Network error — please check your connection')
    } finally {
      setLoading(false)
    }
  }

  const focusOn  = e => { e.target.style.borderColor = '#3da83d'; e.target.style.background = '#fff' }
  const focusOff = e => { e.target.style.borderColor = '#d6f5d6'; e.target.style.background = '#f0faf0' }

  return (
    <div style={{ minHeight:'100vh', background:'#f7f5f0', display:'flex', flexDirection:'column' }}>
      <div style={darkHdr}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 65% 100% at 92% 50%, rgba(46,139,46,.25) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <BackBtn onClick={() => goTo('welcome')} />
          <h2 style={{ fontSize:26, fontWeight:900, color:'#fff', letterSpacing:-.6, marginBottom:6 }}>Join the Waitlist</h2>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.5)', fontWeight:300 }}>Be first when we launch in your area.</p>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'22px 20px 60px', maxWidth:480, margin:'0 auto', width:'100%' }}>

        <div style={{ display:'flex', alignItems:'flex-start', gap:10, background:'#dcfc
