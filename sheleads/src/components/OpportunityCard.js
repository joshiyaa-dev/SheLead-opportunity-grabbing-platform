// components/OpportunityCard.js — Individual opportunity card with glassmorphism
import { getReadinessColor } from "../utils/matchLogic";

const TYPE_COLORS = {
  Internship: { bg: "rgba(242,175,188,0.3)", accent: "#9E182B", icon: "🏢" },
  Job:        { bg: "rgba(158,24,43,0.08)",  accent: "#7a1a2e", icon: "💼" },
  Hackathon:  { bg: "rgba(249,203,214,0.3)", accent: "#C45070", icon: "⚡" },
  Scholarship:{ bg: "rgba(242,224,210,0.4)", accent: "#8B3A52", icon: "🎓" },
};

export default function OpportunityCard({ opportunity, matchData, applied, onApply }) {
  const { score, missing, level } = matchData;
  const typeStyle = TYPE_COLORS[opportunity.type] || TYPE_COLORS["Job"];
  const readinessColor = getReadinessColor(level);

  const daysLeft = Math.ceil(
    (new Date(opportunity.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const deadlineUrgent = daysLeft <= 14;

  return (
    <div style={styles.card}>
      {/* Top accent bar */}
      <div style={{ ...styles.accentBar, background: `linear-gradient(90deg, ${typeStyle.accent}, transparent)` }} />

      {/* Header Row */}
      <div style={styles.header}>
        <span style={{ ...styles.typeBadge, background: typeStyle.bg, color: typeStyle.accent }}>
          {typeStyle.icon} {opportunity.type}
        </span>
        <span style={{ ...styles.scoreBadge, borderColor: readinessColor, color: readinessColor }}>
          {score}% match
        </span>
      </div>

      {/* Title & Org */}
      <h3 style={styles.title}>{opportunity.title}</h3>
      <p style={styles.org}>{opportunity.org} · {opportunity.location}</p>

      {/* Readiness Level */}
      <div style={{ ...styles.readinessPill, background: `${readinessColor}18`, borderColor: `${readinessColor}40` }}>
        <div style={{ ...styles.readinessDot, background: readinessColor }} />
        <span style={{ color: readinessColor, fontWeight: 700, fontSize: 13 }}>{level}</span>
      </div>

      {/* Score Bar */}
      <div style={styles.barTrack}>
        <div
          style={{
            ...styles.barFill,
            width: `${score}%`,
            background: score >= 70
              ? "linear-gradient(90deg, #9E182B, #C45070)"
              : score >= 40
              ? "linear-gradient(90deg, #C45070, #F2AFBC)"
              : "linear-gradient(90deg, #F2AFBC, #F9CBD6)",
          }}
        />
      </div>

      {/* Missing Skills */}
      {missing.length > 0 && (
        <div style={styles.missingSection}>
          <p style={styles.missingLabel}>Skills to develop:</p>
          <div style={styles.missingTags}>
            {missing.slice(0, 4).map((skill) => (
              <span key={skill} style={styles.missingTag}>+ {skill}</span>
            ))}
            {missing.length > 4 && (
              <span style={styles.missingTag}>+{missing.length - 4} more</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <div>
          <p style={styles.stipend}>{opportunity.stipend}</p>
          <p style={{ ...styles.deadline, color: deadlineUrgent ? "#9E182B" : "#b0738a" }}>
            {deadlineUrgent ? "⚠️ " : "📅 "}
            {daysLeft > 0 ? `${daysLeft}d left` : "Deadline passed"} — {opportunity.deadline}
          </p>
        </div>
        <button
          onClick={() => onApply(opportunity.id)}
          style={{ ...styles.applyBtn, ...(applied ? styles.appliedBtn : {}) }}
        >
          {applied ? "Applied ✅" : "Apply Now →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "rgba(255,245,248,0.55)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(249,203,214,0.6)",
    borderRadius: 20,
    padding: "20px 22px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxShadow: "0 4px 30px rgba(158,24,43,0.07), 0 1px 0 rgba(255,255,255,0.8) inset",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    overflow: "hidden",
    cursor: "default",
  },
  accentBar: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "20px 20px 0 0",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  typeBadge: {
    padding: "4px 12px", borderRadius: 20,
    fontSize: 12, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", letterSpacing: 0.5,
  },
  scoreBadge: {
    border: "1.5px solid", borderRadius: 20,
    padding: "3px 10px", fontSize: 12, fontWeight: 800,
    fontFamily: "'Cormorant Garamond', serif",
  },
  title: {
    margin: 0, fontSize: 17, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif",
    color: "#4a0e1a", lineHeight: 1.3,
  },
  org: {
    margin: 0, fontSize: 13, color: "#9a6070",
    fontFamily: "'Cormorant Garamond', serif",
  },
  readinessPill: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 12px", borderRadius: 20, border: "1px solid",
    alignSelf: "flex-start",
  },
  readinessDot: { width: 7, height: 7, borderRadius: "50%" },
  barTrack: {
    height: 5, background: "rgba(249,203,214,0.4)", borderRadius: 10, overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 10, transition: "width 0.8s ease" },
  missingSection: { display: "flex", flexDirection: "column", gap: 5 },
  missingLabel: { margin: 0, fontSize: 12, color: "#b0738a", fontFamily: "'Cormorant Garamond', serif" },
  missingTags: { display: "flex", flexWrap: "wrap", gap: 5 },
  missingTag: {
    background: "rgba(242,224,210,0.6)", color: "#7a4050",
    padding: "2px 10px", borderRadius: 10, fontSize: 12,
    fontFamily: "'Cormorant Garamond', serif",
  },
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
    paddingTop: 8, borderTop: "1px solid rgba(249,203,214,0.4)", marginTop: 4,
  },
  stipend: {
    margin: 0, fontSize: 14, fontWeight: 700, color: "#5a1a24",
    fontFamily: "'Cormorant Garamond', serif",
  },
  deadline: {
    margin: "2px 0 0", fontSize: 12,
    fontFamily: "'Cormorant Garamond', serif",
  },
  applyBtn: {
    padding: "9px 20px", borderRadius: 12, border: "none",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(158,24,43,0.25)",
  },
  appliedBtn: {
    background: "linear-gradient(135deg, #3d9e18, #45a826)",
    boxShadow: "0 4px 15px rgba(61,158,24,0.25)",
  },
};
