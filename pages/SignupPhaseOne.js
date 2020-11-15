import {
  MagicContext,
  LoggedInContext,
  UserInfoContext,
  TokenContext
} from "../components/Store";
import Layout from "../components/Layout";

import { useContext, useState, useEffect } from "react";
import SkillsCard from "../components/SkillsCard";

import Button from "../components/Button";
import { useRouter } from "next/router";
import NicknameSelection from "../components/NicknameSelection";

function SignupPhaseOne(props) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  //const [categories, setCategories] = useState([]);
  const [skillTree, setSkillTree] = useState([]);
  const [token, setToken] = useContext(TokenContext);
  const [selectedSkillsIndexes, setSelectedSkillsIndexes] = useState([]);
  const backgroundImageStyle = {
    backgroundImage: `url(${userInfo.background})`
    //filter: 'blur(8px)',
    // WebkitFilter: 'blur(8px)',
  };

  useEffect(() => {
    const getSkillTree = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/skill?skill=${userInfo.category}`,
          { method: "GET" }
        );
        const skillTree = await response.json();
        const skillTreeCategories = skillTree.categories;
        setSkillTree(skillTreeCategories);
      } catch (err) {
        console.log(err);
      }
    };
    getSkillTree();
  }, []);

  const selectSkill = (categoryIndex, selectedSkillIndex) => {
    const updateSkills = category =>
      category.skills.map((skill, skillIndex) => {
        if (skillIndex === selectedSkillIndex) {
          const newSkill =
            typeof skill === "string"
              ? { skill, selected: !skill.selected }
              : { ...skill, selected: !skill.selected };
          return { ...newSkill };
        }

        return typeof skill === "string" ? { skill } : { ...skill };
      });

    const copySkills = category =>
      category.skills.map(skill => {
        return typeof skill === "string" ? { skill } : { ...skill };
      });

    const updateSkillTree = _skillTree =>
      _skillTree.map((category, i) => {
        if (i === categoryIndex) {
          return { ...category, skills: updateSkills(category) };
        }
        return {
          ...category,
          skills: copySkills(category)
        };
      });

    setSkillTree(updateSkillTree(skillTree));
  };

  function setSkillLevel(catIndex, skillIndex, level) {
    const updateSkills = category =>
      category.skills.map((skill, skIndex) => {
        if (skIndex === skillIndex) {
          return { ...skill, level };
        }
        return { ...skill };
      });

    const copySkills = category =>
      category.skills.map(skill => {
        return { ...skill };
      });

    const updateSkillTree = _skillTree =>
      _skillTree.map((category, categoryIndex) => {
        if (categoryIndex === catIndex) {
          return {
            ...category,
            skills: updateSkills(category)
          };
        }
        return {
          ...category,
          skills: copySkills(category)
        };
      });
    setSkillTree(updateSkillTree(skillTree));
  }

  function getSelectedSkills() {
    let skills = [];

    if (skillTree.length === 0) return <></>;

    for (let category of skillTree) {
      for (let skill of category.skills) {
        if (skill) {
          if (typeof skill.selected !== "undefined" && skill.selected) {
            skills.push({
              skill: skill.skill,
              level: typeof skill.level === "undefined" ? 0 : skill.level
            });
          }
        }
      }
    }

    if (skills.length > 0) {
      return skills.map((skill, i) => {
        return (
          <div className="flex justify-between text-xs" key={i}>
            <p>{skill.skill}</p>
            <p>{`${skill.level}%`}</p>
          </div>
        );
      });
    }
    return "";
  }

  function getTotalSelected() {
    let skills = [];

    if (skillTree.length === 0) return <></>;

    for (let category of skillTree) {
      for (let skill of category.skills) {
        if (skill) {
          if (typeof skill.selected !== "undefined" && skill.selected) {
            skills.push({
              skill: skill.skill,
              level: typeof skill.level === "undefined" ? 0 : skill.level
            });
          }
        }
      }
    }
    return skills.length;
  }

  function setUserSkills() {
    let skills = [];

    for (let category of skillTree) {
      for (let skill of category.skills) {
        if (skill.selected)
          skills.push({
            ...skill,
            redeemableDitos: Math.floor(skill.level / 10) * category.credits
          });
      }
    }

    setUserInfo(userInfo => {
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
    <Layout
      navBar={{ hideNav: true }}
      flex
      splash={{
        color: "blue",
        variant: "default",
        alignment: "left"
      }}
      logo
      bgImage={{ src: "/background-image.svg", alignment: "left", size: 40 }}
    >
      <div className="flex flex-wrap justify-between h-full w-full">
        <div
          className="flex w-1/2 justify-center items-center space-y-8 p-8 flex-grow-0 h-full"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <NicknameSelection
            setUserInfo={setUserInfo}
            value={userInfo.username}
            title="Welcome to Distributed Town!"
            subtitle="This is the first step to join a global community of local people or the other way around :)"
            placeholderText="Please choose a nickname"
            userInfo={userInfo}
          />
        </div>
        <div className="flex flex-col justify-center align-center text-center space-y-1 p-8 flex-grow w-1/2">
          <h1 className="font-bold text-xl">Tell us about you!</h1>
          <p>
            Pick your Skills (<span className="underline">between 1 and 3</span>
            )
          </p>
          <p>Select what you’re the best at, and receive Credits for it.</p>
          {skillTree.map((category, i) => {
            return (
              <SkillsCard
                key={i}
                title={category.subCat}
                skills={category.skills}
                totalSelected={getTotalSelected()}
                selectSkill={skillSelectedIndex =>
                  selectSkill(i, skillSelectedIndex)
                }
                setSkillLevel={(skillIndex, skillLevel) =>
                  setSkillLevel(i, skillIndex, skillLevel)
                }
              />
            );
          })}
          <div className="bg-denim flex flex-row  items-center justify-between p-4 text-white">
            <p className=" flex md:h-16 lg:h-24 xl:h-28 w-1/2 items-center justify-center">
              Your selection
            </p>
            <div className="w-1/2">{getSelectedSkills()}</div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-0 p-4 bg-white">
          <Button className="font-black" onClick={() => setUserSkills()}>
            Next: choose your first community!
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default SignupPhaseOne;
