export function sanitise(str) {
      return String(str).replace(/[<>'"]/g, '').trim().slice(0, 500)
      }

      export function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
        }

        export function isValidPhone(phone) {
          return /^\d{7,11}$/.test(phone)
          }

          const SUBMIT_KEY = 'tf_submit_attempts'

          export function getSubmitAttempts() {
            try {
                const d = JSON.parse(sessionStorage.getItem(SUBMIT_KEY) || '{}')
                    if (d.resetAt && Date.now() > d.resetAt) return 0
                        return d.count || 0
                          } catch { return 0 }
                          }

                          export function incrementSubmitAttempts() {
                            try {
                                const d = JSON.parse(sessionStorage.getItem(SUBMIT_KEY) || '{}')
                                    const now = Date.now()
                                        const resetAt = (d.resetAt && now < d.resetAt) ? d.resetAt : now + 15 * 60 * 1000
                                            sessionStorage.setItem(SUBMIT_KEY, JSON.stringify({ count: (d.count || 0) + 1, resetAt }))
                                              } catch {}
                                              }

                                              const FORMINIT_URL = 'https://forminit.com/f/463mmpz58h6'
                                              const WEB3_KEY     = '20e4afa7-ff1a-46e8-a900-8da9ddca94c5'

                                              export async function submitWaitlist(payload) {
                                                const [r1, r2] = await Promise.allSettled([
                                                    fetch(FORMINIT_URL, {
                                                          method: 'POST',
                                                                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                                                                      body: JSON.stringify(payload),
                                                                          }),
                                                                              fetch('https://api.web3forms.com/submit', {
                                                                                    method: 'POST',
                                                                                          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                                                                                                body: JSON.stringify({
                                                                                                        access_key: WEB3_KEY,
                                                                                                                subject: `New Trashformas Waitlist Signup — ${payload.Name}`,
                                                                                                                        from_name: 'Trashformas Waitlist',
                                                                                                                                ...payload,
                                                                                                                                      }),
                                                                                                                                          }),
                                                                                                                                            ])
                                                                                                                                              return (r1.status === 'fulfilled' && r1.value?.ok)
                                                                                                                                                    || (r2.status === 'fulfilled' && r2.value?.ok)
                                                                                                                                                    }
}