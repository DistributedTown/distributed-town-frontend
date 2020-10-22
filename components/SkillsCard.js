function SkillsCard({ title, skills, selectSkill, setSkillLevel }) {
  return (
    <div className="flex flex-col border border-denim px-3 py-2 text-xs">
      <h2>{title}</h2>
      <div className="grid grid-cols-1">
        {skills.map((skill, i) => {
          return (
            <div className="flex flex-row items-start" key={i}>
              <input
                type="checkbox"
                onClick={() => selectSkill(i)}
                defaultChecked={i === -1}
              />
              <div className="flex flex-col">
               
                 <p></p>
                <input
                  type="range"
                  value={typeof skill ==='string' ? 0 : skill.selected ? skill.level : 0}
                  onChange={(e) => setSkillLevel(i, e.target.value)}
                  disabled={!skill.selected}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsCard;

