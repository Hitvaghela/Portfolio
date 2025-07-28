import { Container } from ".."
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { AiFillMail } from "react-icons/ai"
import socialsData from "../../data/socials.json"
const socials = socialsData.socials;
import usersInfo from "../../data/usersInfo.json"
import { useContext } from "react"
import DataContext from "../../context/DataContext"

function Footer() {
  const { openContactForm } = useContext(DataContext)

  return (
    <footer className="w-full bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200 py-8 mt-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-8 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>

      <Container>
        <div className="relative z-10 flex flex-col items-center space-y-6">
          {/* Interactive Name Section */}
          <div className="text-center group">
            <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
              {usersInfo.full_name}
            </h3>
            <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Ready to collaborate on amazing projects!
            </p>
          </div>

          {/* Interactive Hi Button */}
          <div className="relative group">
            <button 
              onClick={openContactForm}
              className="relative px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full shadow-lg   border-2 border-white/20 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2 ">👋</span>
                Say Hi!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 duration-300"></div>
            </button>
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-30 blur-lg  transition-opacity duration-300"></div>
          </div>

          {/* Interactive Social Icons */}
          <div className="flex flex-row items-center space-x-6">
            {socials["github"] && (
              <div className="group relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <SocialLink url={socials["github"]} label="GitHub">
                  <FaGithub />
                </SocialLink>
              </div>
            )}
            
            {socials["Linkdin"] && (
              <div className="group relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <SocialLink url={socials["Linkdin"]} label="LinkedIn">
                  <FaLinkedin />
                </SocialLink>
              </div>
            )}
            
            {socials["email"] && (
              <div className="group relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <SocialLink url={`mailto:${socials["email"]}`} label="Email">
                  <AiFillMail />
                </SocialLink>
              </div>
            )}
          </div>

          {/* Interactive Status */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-dark-100/50 backdrop-blur-sm rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">Available for opportunities</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

function SocialLink({ url, label, children }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 text-green-200 hover:text-white border border-green-400/30 hover:border-green-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-green-400/25 group"
    >
      {children}
    </a>
  )
}
