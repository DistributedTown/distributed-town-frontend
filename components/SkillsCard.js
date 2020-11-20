function SkillsCard({
  title,
  skills,
  selectSkill,
  setSkillLevel,
  totalSelected
}) {
  return (
    <div className="flex flex-col border border-denim px-3 py-2 text-xs">
      <h2 className="text-center font-bold pb-2">{title}</h2>
      <div className="flex flex-wrap">
        {skills.map((skill, i) => {
          return (
            <div className="flex flex-row w-1/2 h-1/2" key={i}>
              <input
                type="checkbox"
                onClick={() => selectSkill(i)}
                checked={skill.selected}
                disabled={!skill.selected && totalSelected === 3}
              />
              <div className="flex flex-col p-2">
                <p>{typeof skill === "string" ? skill : skill.skill}</p>
                <input
                  type="range"
                  value={
                    typeof skill === "string"
                      ? 0
                      : skill.selected
                      ? skill.level
                      : 0
                  }
                  onChange={e => setSkillLevel(i, e.target.value)}
                  disabled={!skill.selected}
                  step={10}
                  className="lg:w-32 md:w-24"
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
