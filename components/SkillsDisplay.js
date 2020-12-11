import Card from './Card';

const SkillsDisplay = ({ skills }) => {
  return (
    <Card>
      <h2 className="text-bold underline text-2xl text-center">Your skills</h2>
      <div className="grid grid-cols-2 gap-6 justify-center p-2">
        {skills.map((skill, i) => {
          const barcss = `font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative`;
          return (
            <div key={i}>
              <p className="text-center"> {skill.skill}</p>
              <div className="w-full mb-3 relative rounded-full h-8 border-2 border-denim overflow-hidden">
                <div className="w-full h-full bg-white absolute" />
                <div
                  id="bar"
                  className={barcss}
                  style={{ width: `${skill.level}%` }}
                >
                  {skill.level}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SkillsDisplay;
