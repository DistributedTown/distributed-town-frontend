import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
} from "../components/Store";

import { useContext, useState, useEffect } from "react";
import SkillsCard from "../components/SkillsCard";

import Button from "../components/Button";
import { useRouter } from "next/router";

function SignupPhaseOne(props) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [categories, setCategories] = useState([]);

  const [selectedSkillsIndexes, setSelectedSkillsIndexes] = useState([]);

  const categories1 = [
    {
      name: "Blockchain & DLT",
      skills: [
        { name: "DeFi", selected: false, disabled: false, level: 60 },
        { name: "Architecture", selected: false, disabled: false, level: 60 },
        {
          name: "Smart Contracts",
          selected: false,
          disabled: false,
          level: 60,
        },
        {
          name: "Blockchain Infrastructure",
          selected: false,
          disabled: false,
          level: 60,
        },
      ],
    },
    {
      name: "Tech",
      skills: [
        { name: "Backend", selected: false, disabled: false, level: 60 },
        { name: "Mobile Dev", selected: false, disabled: false, level: 60 },
        { name: "Web Dev", selected: false, disabled: false, level: 60 },
        { name: "Frontend", selected: false, disabled: false, level: 60 },
      ],
    },
    {
      name: "Protocol",
      skills: [
        { name: "Network Design", selected: false, disabled: false, level: 60 },
        {
          name: "Governance & Consensus",
          selected: false,
          disabled: false,
          level: 60,
        },
        { name: "Game Theory", selected: false, disabled: false, level: 60 },
        { name: "Tokenomics", selected: false, disabled: false, level: 60 },
      ],
    },
  ];
  const categories2 = [
    {
      name: "Creative Arts",
      skills: ["Music", "Painting", "Photography", "Video-making"],
    },
    {
      name: "Lifestyle",
      skills: ["Training & Sport", "Hiking", "Biking", "Writing"],
    },
    {
      name: "Activities",
      skills: [
        "Performance & Theather",
        "Project Management",
        "Production",
        "Gaming",
      ],
    },
  ];
  const categories3 = [
    {
      name: "Community Life",
      skills: [
        "Fun & Entertainment",
        "Administration & Management",
        "Community Life",
        "Leadership & Public Speaking",
      ],
    },
    {
      name: "Professional",
      skills: ["Teaching", "Art, Music & Creativity", "Accounting", "Legal"],
    },
    {
      name: "At Home",
      skills: ["Cooking", "Gardening", "Householding", "Company"],
    },
  ];

  useEffect(() => {
    fetch("http://3.250.29.111:3005/api/skill", { method: "GET" })
      .then((response) => response.json())
      .then((skills) => {
        let skillsByCats = new Map();
        for (let skill of skills) {
          if (skillsByCats.has(skill.subcategory)) {
            let subCategory = skillsByCats.get(skill.subcategory);
            skillsByCats.set(skill.subcategory, {
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
        for (let [name, { skills }] of skillsByCats.entries()) {
          categories.push({ name, skills });
        }

        setCategories(categories);
      })
      .catch((error) => console.error(error.message));
  }, []);

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     let newCategories = categories;

  //     for (let { cat: catIndex, skill: skillIndex } of selectedSkillsIndexes) {
  //       newCategories = newCategories.map((category, categoryIndex) => {
  //         if (categoryIndex === catIndex) {
  //           return {
  //             ...category,
  //             skills: category.skills.map((skill, skIndex) => {
  //               if (skIndex === skillIndex) {
  //                 return { ...skill, selected: true };
  //               }

  //               return {
  //                 ...skill,
  //                 selected: false,
  //                 disabled:
  //                   !skill.selected && selectedSkillsIndexes.length === 3,
  //               };
  //             }),
  //           };
  //         }

  //         return {
  //           ...category,
  //           skills: category.skills.map((skill) => {
  //             return {
  //               ...skill,
  //               disabled: !skill.selected && selectedSkillsIndexes.length === 3,
  //             };
  //           }),
  //         };
  //       });
  //     }

  //     setCategories(newCategories);
  //   }
  // }, [selectedSkillsIndexes.length]);

  // function selectSkill(categoryIndex, skillIndex) {
  //   let wasChkSelected =
  //     selectedSkillsIndexes.filter(
  //       ({ cat, skill }) => cat === categoryIndex && skill === skillIndex
  //     ).length === 0;

  //   console.log(wasChkSelected);

  //   if (wasChkSelected)
  //     setSelectedSkillsIndexes((selectedSkillsIndexes) =>
  //       [
  //         ...selectedSkillsIndexes,
  //         { cat: categoryIndex, skill: skillIndex },
  //       ].sort((a, b) => a.cat - b.cat)
  //     );
  //   else
  //     setSelectedSkillsIndexes((selectedSkillsIndexes) =>
  //       selectedSkillsIndexes
  //         .filter(
  //           ({ cat, skill }) => cat !== categoryIndex && skill !== skillIndex
  //         )
  //         .sort((a, b) => a.cat - b.cat)
  //     );
  // }

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
          skills.push({ skill: skill.name, level: skill.level / 10 });
      }
    }

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
        <div className="flex flex-col space-y-8 p-8 flex-grow-0 bg-blue-100 h-full">
          <h1>Welcome to Distributed Town!</h1>
          <p>
            This will be a “congrats” message + summary / story about
            Distributed Town, the reasons and benefits in joining it etc.
          </p>

          <div>
            <label htmlFor="nickname">nickname</label>
            <input
              value={userInfo.nickname}
              onChange={(e) =>
                setUserInfo({ ...userInfo, nickname: e.target.value })
              }
              className="border border-green-600 ml-2"
              id="nickname"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-8 p-8 flex-grow">
          <h1>Tell us about you!</h1>
          <p>Pick your Skills (between 1 and 3) Description of the process</p>
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
