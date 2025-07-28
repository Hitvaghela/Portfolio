import React, { useRef } from "react";
import { certificates } from "../../data/certificates.json";

function Certificate() {
    const scrollRef = useRef(null);

    // Optional: Scroll left/right handlers for carousel
    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -350 : 350,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="w-full bg-dark-100 py-16 px-4 md:px-16 lg:px-32 mb-20" id="certificates">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-green-200 mb-12 text-center" data-aos="fade-up">Certificates</h2>
                <div className="relative">
                    {/* Carousel navigation buttons (desktop only) */}
                    <button
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark-200 hover:bg-green-200 hover:text-dark-200 text-green-200 rounded-full p-2 shadow-lg transition-all"
                        onClick={() => scroll("left")}
                        aria-label="Scroll Left"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex flex-row gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {certificates.length > 0 && certificates.map((cert, i) => (
                            <div
                                key={i}
                                className="min-w-[320px] max-w-xs bg-dark-200 rounded-2xl shadow-xl p-5 flex flex-col items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-green-200/40 border-2 border-transparent hover:border-green-200 snap-center"
                                data-aos="zoom-in"
                            >
                                <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center mb-4">
                                    <img src={cert.imageUrl} alt={cert.title} className="object-contain w-full h-full" />
                                </div>
                                <h3 className="text-xl font-semibold text-white-200 mb-1 text-center">{cert.title}</h3>
                                <p className="text-green-200 text-sm font-medium mb-1 text-center">{cert.issuer}</p>
                                <span className="text-xs text-white-100 mb-2 text-center">{cert.date}</span>
                                <p className="text-white-100 text-sm mb-3 text-center">{cert.description}</p>
                                <a
                                    href={cert.certificate_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-auto px-4 py-2 bg-green-200 text-dark-200 font-bold rounded-lg shadow hover:bg-green-100 transition-all text-sm"
                                >
                                    View Certificate
                                </a>
                            </div>
                        ))}
                    </div>
                    <button
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark-200 hover:bg-green-200 hover:text-dark-200 text-green-200 rounded-full p-2 shadow-lg transition-all"
                        onClick={() => scroll("right")}
                        aria-label="Scroll Right"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Certificate; 