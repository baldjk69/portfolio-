import { useState, useEffect } from 'react'
import BookingForm from './components/BookingForm'

function App() {
  const [projects, setProjects] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null) // 'success' | 'error' | null
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    // Fetch both projects and profile at the same time
    const projectUrl = import.meta.env.VITE_PROJECTS_API_URL
    const profileUrl = import.meta.env.VITE_PROFILE_API_URL
    
    Promise.all([
      fetch(projectUrl).then(res => {
        if(!res.ok) throw new Error('Failed to fetch projects')
        return res.json()
      }),
      fetch(profileUrl).then(res => {
        if(!res.ok) throw new Error('Failed to fetch profile')
        return res.json()
      })
    ])
      .then(([projectsData, profileData]) => {
        setProjects(projectsData),
        setProfile(profileData),
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormStatus(null)
  
    try {
      const contactUrl = import.meta.env.VITE_CONTACT_API_URL
      const res = await fetch(contactUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if(!res.ok) throw new Error('Failed to send message')      
      setFormStatus('success')
      setFormData({name: '', email: '', message: ''})
    } catch (err) {
      setFormStatus('error')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            My Portfolio
          </h1>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>
      
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm a Full-Stack Developer
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          I build modern web applications using React and Django.
          Here's some recent work.        
        </p>
        <a 
          href="#projects"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View Projects
        </a>
      </section>

      {/* About */}
      {profile && (
        <section id="about" className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h3 className="text-2xl font-bold mb-8">About Me</h3>
            
            <div className="grid md:grid-cols-3 gap-10">
              {/* Bio + Info */}
              <div className="md:col-span-2 space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {profile.bio}
                </p>

                <div className="space-y-2 text-sm">
                  {profile.location && (
                    <p><span className="font-medium text-slate-800">Location:</span> {profile.location}</p>
                  )}
                  {profile.email && (
                    <p>
                      <span className="font-medium text-slate-800">Email:</span>{' '}
                      <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                        {profile.email}
                      </a>
                    </p>
                  )}
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                        Github →
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                        LinkedIn →
                    </a>
                  )} 
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                        Twitter →
                    </a>
                  )}  
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                        Website →
                    </a>
                  )}                                                
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills_list?.map(skill => (
                    <span
                      key={skill}
                      className="bg-slate-100 text-slate-700 text-sm px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>  
        </section>
      )}

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 pb-20">
        <h3 className="text-2xl font-bold mb-8">Projects</h3>
        
        {loading && (
          <p className="text-slate-500">Loading...</p>
        )}
        {error && (
          <p className="text-red-600 bg-red-50 p-4 rounded-lg">
            Error: {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className={`bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition ${
                project.featured ? 'border-blue-200 ring-1 ring-blue-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-semibold">{project.title}</h4>
                {project.featured && (
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {project.description}
              </p>

              <p className="text-sm text-slate-500 mb-5">
                <span className="font-medium text-slate-700">Tech:</span> {project.technology}
              </p>
              
              <div className="flex gap-4 text-sm font-medium">
                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Github →
                  </a>
                )}
                {project.live_url && (
                  <a 
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-800 transition"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      
        {projects.length === 0 && !loading && !error && (
          <p className="text-slate-500">
            No projects yet. Add some in the Django Admin!
          </p>
        )}
      </section>
      
      {/* Contact Form */}
      <section id="contact" className="bg-white border-t border-slate-200">
        <div className="max-w-xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-bold mb-2 text-center">Get in Touch</h3>
          <p className="text-slate-600 text-center mb-8">
            Have a question or want to work together? Send me a message.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name} 
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your name"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email} 
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message} 
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={formLoading} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formLoading ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
              <p className="text-center text-emerald-600 bg-emerald-50 py-3 rounded-lg">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-center text-red-600 bg-red-50 py-3 rounded-lg">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Booking Form */}
      <section id='book' className="bg-white border-t border-slate-200">
        <BookingForm />
      </section>

      {/* Simple footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          Build with React + Django • {new Date().getFullYear()}
        </div>
      </footer>

    </div>

  )
}

export default App
