const ProjectCard = ({ key, project }) => {
    return (
        <div
            key={key}
            className="border-2 border-blue-600 h-auto"
        >
            <div className="flex justify-between border-b-2 border-gray-400 p-2">
                <p>{project.projectTitle}</p>
                <p><span className="text-carrot">Funds needed:</span> {project.fundsNeeded}</p>
            </div>
            <p className="p-2">{project.projectDescription}</p>
            <div className="grid grid-cols-2 border-t-2 border-gray-400 p-2">
                <p className=" font-bold text-lg">Skills needed: </p>
                {project.skillsNeeded.map((skill, j) => (
                    <span key={j} className=" text-red-500">{`#${skill}`}</span>
                ))}
            </div>
        </div>
    )
}

export default ProjectCard