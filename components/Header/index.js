import { useState, useEffect } from "react"
import { Container } from ".."
import userAvatar from "../../public/images/avatar/avatar.png"

import usersInfo from "../../data/usersInfo.json"
import languages from "../../data/languages.json"

export default function Header({ children }) {

    const [resumeActive, setResumeActive] = useState(false)
    const [reposcount, setReposCount] = useState(0)
    const [avatar, setAvatar] = useState("")
    const [isAvatarLoading, setIsAvatarLoading] = useState(true)
    const [avatarError, setAvatarError] = useState(false)

    const userName = usersInfo.github_username;

    function openResume() {
        setResumeActive(!resumeActive)
    }

    // fetch github repos count
    async function getReposCount() {
        try {
            let res;
            if (localStorage.getItem("repo_counts") === null) {
                res = await fetch(`https://api.github.com/users/${userName}`)
                let data = await res.json()

                if (data && data.public_repos !== undefined) {
                    const { public_repos, avatar_url } = data;
                    localStorage.setItem("repo_counts", JSON.stringify(public_repos))
                    // store github user avatar
                    localStorage.setItem("github_avatar", JSON.stringify(avatar_url))
                    setReposCount(public_repos)
                    setAvatar(avatar_url)
                }
            } else {
                // get data from cached localStorage
                let data = JSON.parse(localStorage.getItem("repo_counts"))
                let useravatar = JSON.parse(localStorage.getItem("github_avatar"))

                setReposCount(data)
                setAvatar(useravatar)
            }
        } catch (error) {
            console.error("Error fetching GitHub data:", error)
            setAvatarError(true)
        } finally {
            setIsAvatarLoading(false)
        }
    }

    // Handle avatar image load error
    const handleAvatarError = () => {
        setAvatarError(true)
        setAvatar("")
    }

    // Handle avatar image load success
    const handleAvatarLoad = () => {
        setIsAvatarLoading(false)
        setAvatarError(false)
    }

    useEffect(() => {
        (async () => {
            await getReposCount()
        })()
    }, [])




    return (
        <header className={`header w-full min-h-screen relative bg-gradient-to-br from-dark-200 via-dark-300 to-dark-400 md:h-auto overflow-hidden`}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>
            
            <Container>
                {children}

                {/* Main content */}
                <div className={`relative z-10 w-full min-h-[80vh] flex items-center justify-center flex-row p-8 flex-wrap`}>

                    <div className={`w-full mb-12 relative md:w-[50%] md:mb-0`}>
                        <div className={`space-y-6`}>
                            {/* Skill badge */}
                            <div data-aos="fade-up" className="inline-block">
                                <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium shadow-lg border border-green-400/20`}>
                                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                    {usersInfo.user_skill}
                                </span>
                            </div>
                            
                            {/* Main heading */}
                            <h1 data-aos="fade-right" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
                                {usersInfo.tag_line}
                            </h1>
                            
                            {/* Subtitle */}
                            <p data-aos="fade-in" className={`text-xl md:text-2xl text-gray-300 leading-relaxed max-w-lg`}>
                                {usersInfo.subTitle}
                            </p>
                        </div>
                        
                        {/* Stats section */}
                        <div className={`mt-12 flex flex-col sm:flex-row gap-8`}>
                            <div data-aos="zoom-in-left" className={`flex items-center space-x-4 p-4 bg-dark-100/50 backdrop-blur-sm rounded-xl border border-white/10`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl font-bold">{(new Date().getFullYear() - parseInt(usersInfo.tech_year))+1}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">Years of</p>
                                    <p className="text-lg font-semibold text-white">Experience</p>
                                </div>
                            </div>
                            
                            <div data-aos="zoom-in-right" className={`flex items-center space-x-4 p-4 bg-dark-100/50 backdrop-blur-sm rounded-xl border border-white/10`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl font-bold">{reposcount}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">Projects &</p>
                                    <p className="text-lg font-semibold text-white">Contributions</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="mt-12">
                            <button 
                                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-400/20 overflow-hidden" 
                                onClick={openResume}
                            >
                                <span className="relative z-10 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    View Resume
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        {resumeActive && <ResumeViewer openResume={openResume} />}
                    </div>
                    
                    {/* Avatar section */}
                    <div data-aos="fade-left" className={`w-full hidden md:flex md:w-[50%] justify-center items-center relative`}>
                        <div className={`relative`}>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            
                            {/* Avatar container */}
                            <div className={`relative avatar-container w-[350px] h-[350px] flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 shadow-2xl transition-all duration-500 hover:shadow-green-500/25 hover:scale-110 border-4 border-white/10`}>
                                {isAvatarLoading && !avatarError && (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                                    </div>
                                )}
                                
                                {avatar && !avatarError ? (
                                    <img 
                                        data-aos="zoom-in-up"
                                        src={avatar}
                                        alt={`${userName} GitHub Avatar`}
                                        className="w-full h-full object-cover rounded-full transition-all duration-500 hover:scale-110"
                                        onLoad={handleAvatarLoad}
                                        onError={handleAvatarError}
                                    />
                                ) : (
                                    <img 
                                        data-aos="zoom-in-up"
                                        src={userAvatar.src}
                                        alt="Default Avatar"
                                        className="w-full h-full object-cover rounded-full transition-all duration-500 hover:scale-110"
                                    />
                                )}
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

function ResumeViewer({ openResume }) {

    function dowloadCv() {
        let link = document.createElement("a")
        link.href = resume;
        link.download = "resume.pdf"
        link.click()
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-dark-400 z-[1500] flex flex-row items-center justify-center">
            <div id="box" className="w-[100%] h-[99%] mx-auto bg-dark-100 overflow-hidden rounded-md md:w-[70%]">
                <div id="head" className="w-full h-auto p-3 bg-dark-200 flex items-start justify-start">
                    <h2>My Resume / CV</h2>
                    <button className="px-3 py-1 flex flex-row items-center justify-center bg-green-300 ml-4 text-[12px] text-dark-300 font-bold rounded-[5px] scale-[.90] transition-all hover:scale-[.95]  " onClick={dowloadCv}>Download</button>
                    <button className="px-3 py-1 flex flex-row items-center justify-center bg-red-500 ml-4 text-[12px] text-dark-300 font-bold rounded-[5px] scale-[.90] transition-all hover:scale-[.95] " onClick={openResume}>Close</button>
                </div>
                <iframe src={"/CV/resume.pdf"} frameborder="0" className="w-full h-full overflow-scroll bg-white-200 mt-0"></iframe>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}


