// pages/Home.js — Landing page
export default function Home({ onNavigate }) {
  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>✦ Women-First Opportunity Platform</div>
        <h1 style={styles.heroTitle}>
          She <span style={styles.heroAccent}>Leads.</span>
          <br />You Discover.
        </h1>
        <p style={styles.heroSub}>
          SheLeads matches your skills with the world's best jobs, internships,
          hackathons, and scholarships — then tells you exactly how ready you are.
        </p>
        <div style={styles.heroBtns}>
          <button onClick={() => onNavigate("profile")} style={styles.primaryBtn}>
            Build Your Profile →
          </button>
          <button onClick={() => onNavigate("dashboard")} style={styles.ghostBtn}>
            Explore Opportunities
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {[
          { num: "102+", label: "Opportunities" },
          { num: "4", label: "Categories" },
          { num: "AI", label: "Match Engine" },
          { num: "0", label: "Cost to You" },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <span style={styles.statNum}>{s.num}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={styles.featuresGrid}>
        {[
          { icon: "🎯", title: "Smart Matching", desc: "Our engine compares your skills against every opportunity and scores your readiness instantly." },
          { icon: "📈", title: "Readiness Score", desc: "Know exactly where you stand — Ready, Partially Ready, or Not Ready — for each opportunity." },
          { icon: "💡", title: "Skill Suggestions", desc: "Get personalized tips on which skills to learn to unlock more doors." },
          { icon: "⚡", title: "One-Click Apply", desc: "Track what you've applied for, all in one place, no account required." },
        ].map((f) => (
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={styles.ctaBox}>
        <h2 style={styles.ctaTitle}>Ready to discover your path? 💜</h2>
        <p style={styles.ctaSub}>Set up your profile in under 2 minutes.</p>
        <button onClick={() => onNavigate("profile")} style={styles.primaryBtn}>
          Get Started — It's Free
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: 60, paddingBottom: 60 },
  hero: {
    textAlign: "center", padding: "60px 20px 40px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
  },
  heroBadge: {
    padding: "6px 18px", borderRadius: 20,
    background: "rgba(249,203,214,0.5)", color: "#9E182B",
    fontSize: 13, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif",
    border: "1px solid rgba(158,24,43,0.2)", letterSpacing: 1,
  },
  heroTitle: {
    margin: 0, fontSize: "clamp(44px, 8vw, 80px)",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700, color: "#3a0a14", lineHeight: 1.1,
  },
  heroAccent: {
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  heroSub: {
    maxWidth: 560, margin: 0, fontSize: 18, lineHeight: 1.7,
    color: "#7a4050", fontFamily: "'Cormorant Garamond', serif",
  },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  primaryBtn: {
    padding: "14px 28px", borderRadius: 14, border: "none",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 17, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 8px 30px rgba(158,24,43,0.3)",
    transition: "transform 0.2s",
  },
  ghostBtn: {
    padding: "14px 28px", borderRadius: 14,
    border: "2px solid rgba(158,24,43,0.4)",
    background: "rgba(255,245,248,0.5)", backdropFilter: "blur(10px)",
    color: "#9E182B", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 17, fontWeight: 700, cursor: "pointer",
  },
  statsRow: {
    display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
  },
  statCard: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 4, padding: "20px 36px",
    background: "rgba(255,245,248,0.55)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(249,203,214,0.6)", borderRadius: 20,
    boxShadow: "0 4px 20px rgba(158,24,43,0.07)",
  },
  statNum: {
    fontSize: 36, fontWeight: 800, fontFamily: "'Cormorant Garamond', serif",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  statLabel: {
    fontSize: 14, color: "#9a6070", fontFamily: "'Cormorant Garamond', serif",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20, padding: "0 10px",
  },
  featureCard: {
    padding: "28px 24px",
    background: "rgba(255,245,248,0.55)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(249,203,214,0.5)", borderRadius: 20,
    display: "flex", flexDirection: "column", gap: 10,
    boxShadow: "0 4px 20px rgba(158,24,43,0.05)",
  },
  featureIcon: { fontSize: 32 },
  featureTitle: {
    margin: 0, fontSize: 20, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#4a0e1a",
  },
  featureDesc: {
    margin: 0, fontSize: 15, color: "#7a4050", lineHeight: 1.6,
    fontFamily: "'Cormorant Garamond', serif",
  },
  ctaBox: {
    textAlign: "center", padding: "50px 20px",
    background: "linear-gradient(135deg, rgba(158,24,43,0.08), rgba(242,175,188,0.2))",
    borderRadius: 24, border: "1px solid rgba(249,203,214,0.5)",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
  },
  ctaTitle: {
    margin: 0, fontSize: 36, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#3a0a14",
  },
  ctaSub: {
    margin: 0, fontSize: 17, color: "#7a4050",
    fontFamily: "'Cormorant Garamond', serif",
  },
};
