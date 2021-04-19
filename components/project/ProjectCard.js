const ProjectCard = ({ key, project }) => {
  return (
    <div key={key} className="border-2 border-blue-600 h-auto">
      <div className="flex justify-between border-b-2 border-gray-400 p-2">
        <p>{project.title}</p>
      </div>
      <p className="p-2">{project.description}</p>
      <div className="flex justify-between border-t-2 border-gray-400 p-2">
        <div>
          <p className="font-bold text-lg">Skills needed: </p>
          {(project.skills || []).map((skill, j) => (
            <span key={j} className=" text-red-500">{`#${skill}  `}</span>
          ))}
        </div>
        <div>
          <span className="text-carrot">Funds needed:</span>{' '}
          <p className=" font-bold">{project.funds} DAI</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
