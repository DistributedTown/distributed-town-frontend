import Card from './Card';

function SkillsCard({
  title,
  skills,
  selectSkill,
  setSkillLevel,
  totalSelected,
}) {
  return (
    <Card className="px-2 py-2 text-xs">
      <h2 className="text-center font-bold">{title}</h2>
      <div className="grid grid-cols-2">
        {skills.map((skill, i) => {
          return (
            <div className="flex items-center justify-center" key={i}>
              <input
                type="checkbox"
                className="mr-3"
                onClick={() => selectSkill(i)}
                checked={skill.selected}
                disabled={!skill.selected && totalSelected === 3}
              />
              <div className="p-2">
                <p>{typeof skill === 'string' ? skill : skill.skill}</p>
                <input
                  type="range"
                  value={
                    typeof skill === 'string'
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
    </Card>
  );
}

export default SkillsCard;
