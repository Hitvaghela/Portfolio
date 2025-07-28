import React, { useState } from "react";
import certificatesData from "../../data/certificates.json";
const certificates = certificatesData.certificates;

function Certificate() {
    const [hovered, setHovered] = useState(null);
    return (
        <section className="w-full bg-dark-100 py-16 px-4 md:px-16 lg:px-32 mb-20 overflow-visible" id="certificates">
            <div className="max-w-4xl mx-auto overflow-visible">
                <h2 className="text-3xl md:text-4xl font-bold text-green-200 mb-12 text-center" data-aos="fade-up">Certificates</h2>
                <div className="relative border-l-4 border-green-200/30 pl-8 overflow-visible z-0">
                    {certificates.length > 0 && certificates.map((cert, i) => (
                        <div
                            key={i}
                            className={`group mb-12 flex flex-col md:flex-row items-start relative transition-all duration-300 z-10`}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            data-aos="fade-up"
                        >
                            {/* Timeline icon */}
                            <span className={`absolute -left-6 top-2 w-8 h-8 rounded-full flex items-center justify-center border-4 border-green-200 bg-dark-200 shadow-lg transition-all duration-300`}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                            </span>
                            {/* Timeline connecting line (except last) */}
                            {i !== certificates.length - 1 && (
                                <span className="absolute left-0 top-10 w-1 h-full bg-green-200/20 z-0"></span>
                            )}
                            {/* Certificate content */}
                            <div className={`ml-4 md:ml-0 md:pl-12 flex-1 bg-dark-200 rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border-2 border-transparent transition-all duration-300`}>
                                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <img src={cert.imageUrl} alt={cert.title} className="object-cover w-full h-full" />
                                </div>
                                <div className="flex-1 flex flex-col items-center md:items-start">
                                    <h3 className="text-xl font-semibold text-white-200 mb-1 text-center md:text-left">{cert.title}</h3>
                                    <p className="text-green-200 text-sm font-medium mb-1 text-center md:text-left">{cert.issuer}</p>
                                    <span className="text-xs text-white-100 mb-2 text-center md:text-left">{cert.date}</span>
                                    <p className="text-white-100 text-sm mb-3 text-center md:text-left">{cert.description}</p>
                                    <a
                                        href={cert.certificate_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 bg-green-200 text-dark-200 font-bold rounded-lg shadow hover:bg-green-100 transition-all text-sm"
                                    >
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certificate;