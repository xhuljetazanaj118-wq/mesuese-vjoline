import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Performance from './components/Performance'
import MediaGallery from './components/MediaGallery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Performance />
        <MediaGallery />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
