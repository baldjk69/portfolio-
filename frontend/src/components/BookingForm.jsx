import { useEffect, useState } from "react";

function BookingForm() {
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState({
    service: '',
    customer_name: '',
    customer_email: '',
    date: '',
    start_time: ''
  })
  const [status, setStatus] = useState(null) // 'success' | 'conflict' |'error' |'null'
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVICES_API_URL)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => setServices([]))
  }, [])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setMessage('')

    try {
      const res = await fetch(import.meta.env.VITE_BOOKING_CREATE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(res.status == 201) {
        setStatus('success')
        setMessage(data.message)
        setFormData({service: '', customer_name: '', customer_email: '', date: '', start_time: ''})
      }  
      else if(res.status == 409) {
        setStatus('conflict')
        setMessage(data.message)
      }
      else {
        setStatus('error')
        setMessage('Please check your details and try again.')
        console.log(message)
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6">Book a service</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <select 
            name="service" 
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg"
          >
            <option value="">Select a service...</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} - {s.duration_minutes} min - ${s.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input 
            type="text"
            name="customer_name"
            value={formData.customer_name} 
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email"
            name="customer_email"
            value={formData.customer_email} 
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input 
              type="date"
              name="date"
              value={formData.date} 
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg"
            />
          </div>
        
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input 
              type="time"
              name="start_time"
              value={formData.start_time} 
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>

        {status === 'success' && (
          <p className="text-center text-emerald-600 bg-emerald-50 p-3 rounded-lg">{message}</p>
        )}
        {status === 'conflict' && (
          <p className="text-center text-amber-600 bg-amber-50 p-3 rounded-lg">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-center text-red-600 bg-red-50 p-3 rounded-lg">{message}</p>
        )}
      </form>
    </div>
  )
}

export default BookingForm