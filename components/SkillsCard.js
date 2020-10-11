function SkillsCard({ title, skills }) {
  return (
    <div className="flex flex-col border border-blue-600">
      <h2>{title}</h2>
      <div className="grid grid-cols-2">
        {skills.map((skill, i) => {
          return (
            <div className="flex flex-row items-start" key={i}>
              <input type="checkbox" />
              <div className="flex flex-col">
                <p>{skill.name}</p>
                <input type="range" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsCard;
