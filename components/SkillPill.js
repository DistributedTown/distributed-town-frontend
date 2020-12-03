function SkillPill({ selected, text, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded rounded-full flex items-center justify-center p-2 ${
        selected ? 'bg-blue-400' : 'bg-gray-200'
      }`}
    >
      {text}
    </button>
  );
}

export default SkillPill;
