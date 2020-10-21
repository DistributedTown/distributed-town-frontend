import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
  TokenContext
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import SkillsCard from "../components/SkillsCard";

import Button from "../components/Button";
import { useRouter } from "next/router";
import NicknameSelection from "../components/NicknameSelection";

function SignupPhaseOne(props) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useContext(TokenContext);
  const [selectedSkillsIndexes, setSelectedSkillsIndexes] = useState([]);
  const backgroundImageStyle = {
    backgroundImage: `url(${userInfo.background})`,
    //filter: 'blur(8px)',
   // WebkitFilter: 'blur(8px)',
   
   
  };
  function getDitoMultFactor(category) {
    let mult = 0;
    switch (category) {
      case "At Home":
        mult = 6;
        break;
      case "Community":
        mult = 12;
        break;
      case "Professional":
        mult = 12;
        break;
    }

    return mult;
  }


  useEffect(() => {
    fetch("http://localhost:3005/api/skill", { method: "GET" })
      .then((response) => response.json())
      .then((skills) => {
        let skillsByCats = new Map();
        for (let skill of skills) {
          if (skillsByCats.has(skill.subcategory)) {
            let subCategory = skillsByCats.get(skill.subcategory);
            skillsByCats.set(skill.subcategory, {
              ditoMultFactor: getDitoMultFactor(skill.subcategory),
              skills: [
                ...subCategory.skills,
                {
                  name: skill.name,
                  selected: false,
                  disabled: false,
                  level: 60,
                },
              ],
            });
          } else {
            skillsByCats.set(skill.subcategory, {
              ditoMultFactor: getDitoMultFactor(skill.subcategory),
              skills: [
                {
                  name: skill.name,
                  selected: false,
                  disabled: false,
                  level: 60,
                },
              ],
            });
          }
        }

        let categories = [];
        for (let [name, { ditoMultFactor, skills }] of skillsByCats.entries()) {
          if (userInfo.category === name)
            categories.push({ name, ditoMultFactor, skills });
        }

        setCategories(categories);
      })
      .catch((error) => console.error(error.message));
  }, []);

  function selectSkill(catIndex, skillIndex) {
    setCategories((categories) =>
      categories.map((category, categoryIndex) => {
        if (categoryIndex === catIndex) {
          return {
            ...category,
            skills: category.skills.map((skill, skIndex) => {
              if (skIndex === skillIndex) {
                return { ...skill, selected: !skill.selected };
              }

              return {
                ...skill,
                // disabled: !skill.selected && selectedSkillsIndexes.length === 3,
              };
            }),
          };
        }

        return {
          ...category,
          skills: category.skills.map((skill) => {
            return {
              ...skill,
              // disabled: !skill.selected && selectedSkillsIndexes.length === 3,
            };
          }),
        };
      })
    );
  }

  function setSkillLevel(catIndex, skillIndex, level) {
    setCategories((categories) =>
      categories.map((category, categoryIndex) => {
        if (categoryIndex === catIndex) {
          return {
            ...category,
            skills: category.skills.map((skill, skIndex) => {
              if (skIndex === skillIndex) {
                return { ...skill, level };
              }

              return {
                ...skill,
                // disabled: !skill.selected && selectedSkillsIndexes.length === 3,
              };
            }),
          };
        }

        return {
          ...category,
          skills: category.skills.map((skill) => {
            return {
              ...skill,
              // disabled: !skill.selected && selectedSkillsIndexes.length === 3,
            };
          }),
        };
      })
    );
  }

  function getSelectedSkills() {
    let skills = [];

    if (categories.length === 0) return <></>;

    for (let category of categories) {
      for (let skill of category.skills) {
        if (skill.selected)
          skills.push({ skill: skill.name, level: skill.level });
      }
    }

    return skills.map(({ skill, level }, i) => {
      return (
        <div className="flex justify-between" key={i}>
          <p>{skill}</p>
          <p>{level}</p>
        </div>
      );
    });
  }

  function setUserSkills() {
    let skills = [];

    for (let category of categories) {
      for (let skill of category.skills) {
        if (skill.selected)
          skills.push({
            skill: skill.name,
            level: skill.level / 10,
            redeemableDitos: (skill.level / 10) * category.ditoMultFactor,
          });
      }
    }

    console.log(userInfo)
    setUserInfo((userInfo) => {
      return { ...userInfo, skills };
    });
    
  }

  const router = useRouter();

  useEffect(() => {
    if (userInfo.skills.length > 0) {
      
      router.push("/SignupPhaseTwo");
    }
  }, [userInfo.skills.length]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row min-h-screen">
        <div style={backgroundImageStyle} className="flex flex-col w-1/2 space-y-8 p-8 flex-grow-0  h-full">
            <NicknameSelection 
               setUserInfo={setUserInfo}
               value={userInfo.nickname}
               title="Welcome to Distributed Town!"
               subtitle="This is the first step to join a global community of local people or the other way around :)"
               placeholderText = "Please choose a nickname"
               userInfo = {userInfo}
            />
        </div>
        <div className="flex flex-col space-y-8 p-8 flex-grow">
          <h1>Tell us about you!</h1>
          <p>Pick your Skills (between 1 and 3)</p>
          <p>Select what you’re the best at, and receive Credits for it.</p>
          {categories.map((category, i) => {
            return (
              <SkillsCard
                key={i}
                title={category.name}
                skills={category.skills}
                selectSkill={(skillIndex) => selectSkill(i, skillIndex)}
                setSkillLevel={(skillIndex, skillLevel) =>
                  setSkillLevel(i, skillIndex, skillLevel)
                }
              />
            );
          })}
          <div className="bg-blue-600 flex flex-row items-center justify-between p-4 text-white">
            <p>Your selection</p>
            <div>{getSelectedSkills()}</div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 left-0 flex justify-center items-center">
        <Button onClick={() => setUserSkills()}>
          Next: choose your first community!
        </Button>
      </div>
    </div>
  );
}

export default SignupPhaseOne;