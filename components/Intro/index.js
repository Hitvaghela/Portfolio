

import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import skills from "../../data/skills.json"
import usersInfo from "../../data/usersInfo.json"

export default function Intro() {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Column - Skills Cards */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-8">
                            My Skills
                        </h2>
                        
                        <div className="space-y-4">
                            <IntroCards data={skills.skill} />
                        </div>
                    </div>
                    
                    {/* Right Column - Introduction */}
                    <div className="m-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {usersInfo.greeting_type} I'm {usersInfo.full_name}
                        </h1>
                        
                        <div className="mb-6 p-4 bg-dark-100 border-l-4 border-green-500">
                            <p className="text-gray-300 italic">
                                {usersInfo.intro_tagline}
                            </p>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-8">
                            {usersInfo.bio_desc[0]}
                        </p>
                        
                        <Link href="/about">
                            <a className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors">
                                <span>Read More</span>
                                <FaArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

function IntroCards({ data }) {
    return (
        <>
            {data.length > 0 ? (
                data.map((skill, i) => (
                    <div 
                        data-aos="fade-up" 
                        key={i} 
                        className="p-4 bg-dark-100 border border-gray-700 rounded-lg hover:border-green-500 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {skill.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    {skill.description}
                                </p>
                                <div className="text-green-400 font-medium text-sm">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </>
    )
}