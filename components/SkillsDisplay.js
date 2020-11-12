const SkillsDisplay = ({ skills }) => {
    return (
        <div className="w-4/6 border-2 border-blue-600 justify-center p-4">
            <h2 className="text-bold underline text-2xl text-center">Your skills</h2>
            <div className="grid grid-cols-2 gap-6 justify-center p-2">
                {skills.map((skill) => {
                    const barcss = `font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-${((skill.level * 12) / 10)}/12`
                    return (
                        <div>
                            <p className="text-center"> {skill.skill}</p>
                            <div className="mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
                                <div className="w-full h-full bg-white absolute"></div>
                                <div id="bar" className={barcss} >
                                    {skill.level}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SkillsDisplay