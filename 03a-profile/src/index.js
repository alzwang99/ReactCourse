

import React from "react";
import ReactDom from "react-dom/client";
import "./styles.css"

const skillList = [
    {
        name: "javaScript",
        level: "👌",
        color: "blue"
    },
    {
        name: "Node",
        level: "💀",
        color: "yellow"
    },
    {
        name: "React",
        level: "💀",
        color: "purple"
    },
    {
        name: "TypeScript",
        level: "💀",
        color: "orange"
    },
    {
        name: "Figma",
        level: "👍",
        color: "gray"
    },
]

const App = () => {
    return (
        <div className="card">
            <ProfileImg />
            <div className="data">
                <Info />
                <div className="skill-list">
                    {skillList.map((_, i) => (
                        <Skills num={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const ProfileImg = () => {
    return (
        <img className="avatar" src="logo512.png" alt="Bruhmoment" />
    )
}

const Info = () => {
    return (
        <>
            <h1>Albert Wang</h1>
            <body>I am currently trying my best to find a job as a software engineer.
                In my free time, I like to spend so many hours coding and watching anime all day.
                At night, I watch anime and code for many hours all night.
            </body>
        </>
    )
}

const Skills = (props) => {
    const skill = skillList[props.num];

    return (
        <p className="skill" style={{ backgroundColor: skill.color }}> {skill.name} {skill.level}</p >
    )
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
) 