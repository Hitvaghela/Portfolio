import React from "react";
import internshipsData from "../../data/internships.json";
const internships = internshipsData.internships;
import Link from "next/link";

function Internship() {
    return (
        <section className="w-full bg-dark-200 py-16 px-4 md:px-16 lg:px-32 mb-20" id="internships">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-green-200 mb-12 text-center" data-aos="fade-up">Internship Experience</h2>
                <div className="flex flex-col gap-16">
                    {internships.length > 0 && internships.map((intern, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-dark-100 rounded-xl shadow-lg p-6 md:p-10" data-aos="fade-up">
                            <div className="flex-shrink-0 w-full md:w-56 flex justify-center md:justify-start mb-4 md:mb-0">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                                    <img src={intern.imageUrl} alt={intern.company} className="object-cover w-full h-full" />
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white-200 mb-1">{intern.role}</h3>
                                        <p className="text-lg text-green-200 font-medium mb-1">{intern.company}</p>
                                        <span className="text-sm text-white-100">{intern.duration}</span>
                                    </div>
                                    {intern.internship_url && (
                                        <a href={intern.internship_url} target="_blank" rel="noopener noreferrer" className="text-green-200 underline hover:text-green-100 text-sm mt-2 md:mt-0">Company Site</a>
                                    )}
                                </div>
                                <p className="text-white-100 mb-4">{intern.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {intern.tags && intern.tags.map((tag, j) => (
                                        <span key={j} className="text-xs py-1 px-3 bg-dark-200 rounded-full text-green-200 border border-green-200">{tag}</span>
                                    ))}
                                </div>
                                {intern.projects && intern.projects.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-white-200 text-base font-semibold mb-1">Projects:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {intern.projects.map((proj, k) => (
                                                <li key={k}>
                                                    <a href={proj.project_url} target="_blank" rel="noopener noreferrer" className="text-green-200 underline hover:text-green-100 text-base font-medium">{proj.title}</a>
                                                    <span className="text-white-100 text-sm ml-2">{proj.description}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Internship;