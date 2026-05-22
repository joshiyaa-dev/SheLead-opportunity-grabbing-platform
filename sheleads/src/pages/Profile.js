// pages/Profile.js — User profile setup
import SkillSelector from "../components/SkillSelector";

export default function Profile({ profile, setProfile, onNavigate }) {
  const { name, skills } = profile;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <div style={styles.avatar}>
            {name ? name[0].toUpperCase() : "✦"}
          </div>
          <div>
            <h2 style={styles.cardTitle}>Your Profile</h2>
            <p style={styles.cardSub}>Tell us about yourself to get personalized matches</p>
          </div>
        </div>

        {/* Name Input */}
        <div style={styles.field}>
          <label style={styles.label}>Your Name</label>
          <input
            style={styles.input}
            placeholder="e.g. Priya Sharma"
            value={name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        {/* Skills */}
        <div style={styles.field}>
          <label style={styles.label}>
            Your Skills
            <span style={styles.skillCount}>
              {skills.length} selected
            </span>
          </label>
          <SkillSelector
            selected={skills}
            onChange={(newSkills) => setProfile({ ...profile, skills: newSkills })}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => onNavigate("dashboard")}
          style={styles.btn}
          disabled={!name || skills.length === 0}
        >
          {name && skills.length > 0
            ? `Find My Opportunities (${skills.length} skills) →`
            : "Add your name & skills to continue"}
        </button>

        {/* Tip */}
        <p style={styles.tip}>
          💡 Add more skills to increase your match scores. You can update your profile anytime.
        </p>
      </div>

      {/* Preview Panel */}
      {(name || skills.length > 0) && (
        <div style={styles.previewCard}>
          <h3 style={styles.previewTitle}>Profile Preview</h3>
          {name && <p style={styles.previewName}>👤 {name}</p>}
          {skills.length > 0 && (
            <>
              <p style={styles.previewSkillLabel}>🛠 Skills ({skills.length})</p>
              <div style={styles.previewTags}>
                {skills.map((s) => (
                  <span key={s} style={styles.previewTag}>{s}</span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 24, maxWidth: 700, margin: "0 auto",
  },
  card: {
    background: "rgba(255,245,248,0.65)", backdropFilter: "blur(24px)",
    border: "1px solid rgba(249,203,214,0.6)", borderRadius: 24,
    padding: 32, display: "flex", flexDirection: "column", gap: 24,
    boxShadow: "0 8px 40px rgba(158,24,43,0.08)",
  },
  cardHeader: { display: "flex", gap: 16, alignItems: "center" },
  avatar: {
    width: 56, height: 56, borderRadius: "50%",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, color: "#fff", fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700, flexShrink: 0,
  },
  cardTitle: {
    margin: 0, fontSize: 26, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#3a0a14",
  },
  cardSub: {
    margin: "4px 0 0", fontSize: 15, color: "#9a6070",
    fontFamily: "'Cormorant Garamond', serif",
  },
  field: { display: "flex", flexDirection: "column", gap: 10 },
  label: {
    fontSize: 16, fontWeight: 700, color: "#5a1a24",
    fontFamily: "'Cormorant Garamond', serif",
    display: "flex", alignItems: "center", gap: 10,
  },
  skillCount: {
    fontSize: 13, fontWeight: 400, color: "#9E182B",
    background: "rgba(249,203,214,0.4)", padding: "2px 10px", borderRadius: 10,
  },
  input: {
    padding: "12px 16px", borderRadius: 14,
    border: "1.5px solid rgba(158,24,43,0.25)",
    background: "rgba(249,203,214,0.1)",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
    color: "#3a0a14", outline: "none", transition: "border-color 0.2s",
  },
  btn: {
    padding: "14px 24px", borderRadius: 14, border: "none",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 17, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 6px 24px rgba(158,24,43,0.25)",
    opacity: 1, transition: "opacity 0.2s",
  },
  tip: {
    margin: 0, fontSize: 14, color: "#9a6070", textAlign: "center",
    fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.6,
  },
  previewCard: {
    background: "rgba(255,245,248,0.55)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(249,203,214,0.5)", borderRadius: 20,
    padding: 24, display: "flex", flexDirection: "column", gap: 12,
  },
  previewTitle: {
    margin: 0, fontSize: 18, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#4a0e1a",
  },
  previewName: {
    margin: 0, fontSize: 16, color: "#5a1a24",
    fontFamily: "'Cormorant Garamond', serif",
  },
  previewSkillLabel: {
    margin: 0, fontSize: 14, color: "#9a6070",
    fontFamily: "'Cormorant Garamond', serif",
  },
  previewTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  previewTag: {
    background: "linear-gradient(135deg, rgba(249,203,214,0.6), rgba(242,175,188,0.6))",
    color: "#5a1a24", padding: "4px 12px", borderRadius: 12,
    fontSize: 13, fontFamily: "'Cormorant Garamond', serif",
    border: "1px solid rgba(158,24,43,0.15)",
  },
};
