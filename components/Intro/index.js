

import Link from "next/link"
import { FaArrowRight, FaTrophy, FaCode, FaLaptopCode, FaBrain } from "react-icons/fa"
import { SiCodeforces } from "react-icons/si"
import skills from "../../data/skills.json"
import usersInfo from "../../data/usersInfo.json"

export default function Intro() {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Simple Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {usersInfo.greeting_type} I'm {usersInfo.full_name}
                    </h1>
                    
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                        {usersInfo.bio_desc[0]}
                    </p>
                    
                    <Link href="/about">
                        <a className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
                            <span>Read More</span>
                            <FaArrowRight className="ml-2 w-4 h-4" />
                        </a>
                    </Link>
                </div>

                {/* Simple Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Skills Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <FaCode className="mr-3 text-green-400" />
                            My Skills
                        </h2>
                        
                        <div className="space-y-4">
                            {skills.skill.map((skill, i) => (
                                <div 
                                    key={i}
                                    className="p-4 bg-dark-100 border border-gray-700 rounded-lg hover:border-green-500 transition-colors"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            {skill.name === "DSA Problem Solving" && <FaBrain className="text-green-400" />}
                                            {skill.name === "Web Development" && <FaCode className="text-green-400" />}
                                            {skill.name === "ML Engineer" && <FaBrain className="text-green-400" />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {skill.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {skill.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Competitive Programming Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <FaLaptopCode className="mr-3 text-blue-400" />
                            Competitive Programming
                        </h2>
                        
                        {/* Simple Codolio Card */}
                        <div className="p-6 bg-dark-100 border border-gray-700 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                                    <SiCodeforces className="text-orange-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Codolio Profile
                                    </h3>
                                    <p className="text-gray-400 text-sm">@Hit_vaghela</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center text-gray-300">
                                    <FaTrophy className="text-yellow-400 mr-2" />
                                    <span className="text-sm">650+ Problems Solved</span>
                                </div>
                                
                                <div className="flex items-center text-gray-300">
                                    <FaCode className="text-green-400 mr-2" />
                                    <span className="text-sm">Active Competitive Programmer</span>
                                </div>
                            </div>
                            
                            <a 
                                href="https://codolio.com/profile/Hit_vaghela"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-2 px-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-medium rounded-lg transition-colors"
                            >
                                <span>View Profile</span>
                                <FaArrowRight className="ml-2 w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}