// utils/matchLogic.js — Matching & Readiness Engine

/**
 * Calculate match score between user skills and opportunity required skills.
 * Returns match percentage, matched skills, and missing skills.
 */
export function calculateMatch(userSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { score: 100, matched: [], missing: [], level: "Ready" };
  }
  if (!userSkills || userSkills.length === 0) {
    return { score: 0, matched: [], missing: requiredSkills, level: "Not Ready" };
  }

  const userSkillsLower = userSkills.map((s) => s.toLowerCase());
  const matched = requiredSkills.filter((s) =>
    userSkillsLower.includes(s.toLowerCase())
  );
  const missing = requiredSkills.filter(
    (s) => !userSkillsLower.includes(s.toLowerCase())
  );
  const score = Math.round((matched.length / requiredSkills.length) * 100);

  let level;
  if (score >= 70) level = "Ready";
  else if (score >= 40) level = "Partially Ready";
  else level = "Not Ready";

  return { score, matched, missing, level };
}

/**
 * Generate smart suggestions based on user's missing skills across opportunities.
 */
export function generateSuggestions(userSkills, opportunities) {
  const allMissing = {};

  opportunities.forEach((opp) => {
    const { missing } = calculateMatch(userSkills, opp.skills);
    missing.forEach((skill) => {
      allMissing[skill] = (allMissing[skill] || 0) + 1;
    });
  });

  // Sort by frequency
  const sorted = Object.entries(allMissing)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const suggestions = sorted.map(([skill, count]) => ({
    skill,
    count,
    message: `Learn ${skill} to unlock ${count} more opportunit${count === 1 ? "y" : "ies"}`,
  }));

  // Add action-based suggestions
  const readyOpps = opportunities.filter((opp) => {
    const { level } = calculateMatch(userSkills, opp.skills);
    return level === "Ready";
  });

  const internships = readyOpps.filter((o) => o.type === "Internship").length;
  const hackathons = readyOpps.filter((o) => o.type === "Hackathon").length;

  if (internships > 0) {
    suggestions.push({
      skill: null,
      count: internships,
      message: `You're ready for ${internships} internship${internships > 1 ? "s" : ""}! Apply this week 🚀`,
    });
  }
  if (hackathons > 0) {
    suggestions.push({
      skill: null,
      count: hackathons,
      message: `Join ${hackathons} hackathon${hackathons > 1 ? "s" : ""} you're qualified for 💡`,
    });
  }

  return suggestions;
}

/**
 * Returns color class string based on readiness level.
 */
export function getReadinessColor(level) {
  switch (level) {
    case "Ready":
      return "#9E182B"; // red wine
    case "Partially Ready":
      return "#C45070";
    case "Not Ready":
      return "#b0738a";
    default:
      return "#b0738a";
  }
}
