export default function calculateDitosFromSkills(skills = []) {
  let amountOfRedeemableDitos = 0;
  for (const { redeemableDitos, level } of skills) {
    amountOfRedeemableDitos +=
      redeemableDitos * (parseInt(level, 10) / 10) || 0;
  }
  const baseDitos = 2000;
  const totalDitos = amountOfRedeemableDitos + baseDitos;
  return totalDitos;
}
