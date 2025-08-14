
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

import projectsData from "../../data/projects.json"
const projects = projectsData.projects;
import userInfo from "../../data/usersInfo.json"

function Projects() {

    const [repo, setRepo] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchRepos() {
        let res;
        let url = `https://api.github.com/users/${userInfo.github_username}/repos`
        if (localStorage.getItem("user_repos") === null) {
            try {
                setLoading(true)
                res = await fetch(url)
                let data = await res.json()
                setLoading(false)
                if (data && data.length > 0) {
                    localStorage.setItem("user_repo", JSON.stringify(data))
                    setRepo(data)
                    return
                }
                setLoading(false)
                setError(`No github repos found.`)
            }
            catch (err) {
                console.error(`FAILED: ${err.message}`)
                setLoading(false)
                setError(`Failed fetching repo: ${err.message}`)
            }
        }

        let userReopos = JSON.parse(localStorage.getItem("user_repos"))

        setRepo(userReopos)
    }

    useEffect(() => {

        (async () => {
            await fetchRepos()
        })()

    }, [])

    return (
        <div className={`projectCont w-full h-auto relative top-[50px] p-10px flex flex-col items-center justify-center mb-[50px]`}>
            <div className={`w-full flex flex-row items-center justify-center`}>
                <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}></span>
                <p data-aos="fade-up" className={`text-white-200 text-[15px]`}>Latest Works</p>
                <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}></span>


                <Link href="/projects">
                    <a data-aos="zoom-in-up" className={`text-center text-green-200 underline absolute top-[50px] text-[14px]`}>All Projects</a>
                </Link>
            </div>

            <div className={`projects w-full h-auto p-5 flex flex-row flex-wrap items-center  mb-[50px] ml-5`}>
                {
                    projects.length > 0 ?
                        projects.slice(0, 6).map((list, i) => {
                            return (
                                <div data-aos="zoom-in" key={i} className={`box w-full h-auto mx-6 bg-dark-200 rounded-[5px] relative top-[50px] transition-all mb-[50px] mr-[5px] opacity-[.7] md:w-[250px] hover:opacity-[1]`} >
                                    <div className="imgCont"></div>
                                    <style jsx>{`
                                .imgCont{
                                    width: 100%;
                                    height: 190px;
                                    background-image: url(${list.imageUrl === "" || list.imageUrl === null ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg" : list.imageUrl});
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    // box-shadow: 0px 0px 3px #000;
                                    border-radius: 5px;
                                }
                            `}</style>
                                    <div className={`w-full p-[10px] bottom-[5px]`}>
                                        <div className="w-full h-auto">
                                            <p className={`text-[15px] text-white-200`}>{list.title === "" ? "Project Title" : list.title}</p>
                                            <br />
                                            <small>{list.description === "" ? "some dummy description" : list.description}</small>
                                        </div>
                                        <br />
                                        <div className={` bottom-[5px] left-[5px] p-0 flex items-start justify-start`}>
                                            {
                                                list.tags.length > 0 ?
                                                    list.tags.slice(0, 3).map((tag, i) => {
                                                        return (
                                                            <span key={i} className={`text-[10px] py-[3px] px-[9px] bg-dark-100 mr-[2px] rounded-[2px] text-white-100`}>{tag}</span>
                                                        )
                                                    })
                                                    :
                                                    ""
                                            }
                                        </div>
                                        <span className={`absolute  my-[-20px] right-[10px] text-[12px] flex items-center justify-start`}>
                                            {
                                                list.project_url !== "" ?
                                                    <>
                                                        <a href={list.project_url} className={`text-white-200 mr-[10px] hover:underline hover:text-white-100`}>
                                                            View
                                                        </a>
                                                        <ion-icon name="arrow-forward-outline" className={`ml-[10px] p-[10px]`}></ion-icon>
                                                    </>
                                                    :
                                                    ""
                                            }
                                        </span>

                                    </div>
                                </div>
                            )
                        })
                        :
                        ""
                }
            </div>
            
        </div>
    )
}

export default Projects

function StarRatings({ count = 1, size = 3, title = "star" }) {

    return (
        <>
            {
                title === "star" ?

                    Array(1).fill(1).map((i) => {
                        return (
                            <FaStar key={i * Math.floor(Math.random() * 1000)} className={`text-green-200 text-[${size}px] `} />
                        )
                    })
                    :
                    <AiFillGithub className={`text-green-200 text-[${size}px] `} />
            }
            <small className="ml-2 text-white-200 font-extrabold">{count}</small>
            <small className="ml-2 text-white-200">{title}</small>
        </>
    )
}
