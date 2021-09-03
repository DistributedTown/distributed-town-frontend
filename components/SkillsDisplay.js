import { useState } from 'react';
import Card from './Card';

const SkillsDisplay = () => {
    let userInfo = {};
    useState(() => {
      if (typeof window !== "undefined") {
        userInfo  = JSON.parse(localStorage.getItem('userInfo'));
      }
    }, []);
      
  return (
    <Card>
      <h2 className="text-2xl text-center text-bold">Your skills</h2>
      <div className="grid justify-center grid-cols-2 gap-6 p-2">
        {userInfo.skills.map((skill, i) => {
          const barcss = `font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative`;
          return (
            <div key={i}>
              <p className="text-center"> {skill.name}</p>
              <div className="relative w-full h-8 mb-3 overflow-hidden border-2 rounded-full border-denim">
                <div className="absolute w-full h-full bg-white" />
                <div
                  id="bar"
                  className={barcss}
                  style={{ width: `${skill.value * 10}%` }}
                >
                  {skill.value}
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
