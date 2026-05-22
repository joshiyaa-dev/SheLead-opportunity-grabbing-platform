// pages/Dashboard.js — Main opportunity feed with filters, search, pagination
import { useState, useMemo } from "react";
import { opportunities } from "../data";
import { calculateMatch, generateSuggestions } from "../utils/matchLogic";
import OpportunityCard from "../components/OpportunityCard";

const TYPES = ["All", "Internship", "Job", "Hackathon", "Scholarship"];
const PAGE_SIZE = 9;

export default function Dashboard({ profile, applied, setApplied, onNavigate }) {
  const { name, skills } = profile;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [sortBy, setSortBy] = useState("match"); // match | deadline | recent
  const [page, setPage] = useState(1);
  const [showApplied, setShowApplied] = useState(false);

  // Compute matches for all opportunities
  const matched = useMemo(() =>
    opportunities.map((opp) => ({
      ...opp,
      matchData: calculateMatch(skills, opp.skills),
    })), [skills]
  );

  // Suggestions
  const suggestions = useMemo(() => generateSuggestions(skills, opportunities), [skills]);

  // Applied opportunities
  const appliedOpps = matched.filter((o) => applied.includes(o.id));

  // Unique skills for filter dropdown
  const allSkills = useMemo(() => {
    const set = new Set();
    opportunities.forEach((o) => o.skills.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  // Filter + Sort
  const filtered = useMemo(() => {
    let list = matched;
    if (typeFilter !== "All") list = list.filter((o) => o.type === typeFilter);
    if (skillFilter !== "All") list = list.filter((o) => o.skills.includes(skillFilter));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.org.toLowerCase().includes(q) ||
          o.type.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (sortBy === "match") list = [...list].sort((a, b) => b.matchData.score - a.matchData.score);
    else if (sortBy === "deadline") list = [...list].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return list;
  }, [matched, typeFilter, skillFilter, search, sortBy]);

  const paged = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paged.length < filtered.length;

  const handleApply = (id) => {
    if (!applied.includes(id)) setApplied([...applied, id]);
  };

  // Stats
  const readyCount = matched.filter((o) => o.matchData.level === "Ready").length;
  const partialCount = matched.filter((o) => o.matchData.level === "Partially Ready").length;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.dashHeader}>
        <div>
          <h2 style={styles.dashTitle}>
            {name ? `Welcome back, ${name} 💜` : "Opportunity Dashboard"}
          </h2>
          <p style={styles.dashSub}>
            {skills.length > 0
              ? `Showing matches based on your ${skills.length} skills`
              : "Set up your profile to get personalized matches"}
          </p>
        </div>
        {!name && (
          <button onClick={() => onNavigate("profile")} style={styles.setupBtn}>
            Set Up Profile →
          </button>
        )}
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {[
          { label: "Total Opportunities", val: opportunities.length, color: "#9E182B" },
          { label: "Ready to Apply", val: readyCount, color: "#3d9e60" },
          { label: "Partially Ready", val: partialCount, color: "#C45070" },
          { label: "Applied", val: applied.length, color: "#8B3A52" },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <span style={{ ...styles.statNum, color: s.color }}>{s.val}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div style={styles.suggestionsBox}>
          <h3 style={styles.suggestTitle}>💡 Smart Suggestions</h3>
          <div style={styles.suggestGrid}>
            {suggestions.slice(0, 4).map((s, i) => (
              <div key={i} style={styles.suggestCard}>
                <span style={styles.suggestIcon}>{s.skill ? "📚" : "🚀"}</span>
                <p style={styles.suggestMsg}>{s.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applied Section Toggle */}
      {applied.length > 0 && (
        <button
          onClick={() => setShowApplied(!showApplied)}
          style={styles.appliedToggle}
        >
          {showApplied ? "▼" : "▶"} Applied Opportunities ({applied.length})
        </button>
      )}

      {showApplied && (
        <div style={styles.appliedGrid}>
          {appliedOpps.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              matchData={opp.matchData}
              applied={true}
              onApply={() => {}}
            />
          ))}
        </div>
      )}

      {/* Search + Filters */}
      <div style={styles.controls}>
        <input
          style={styles.searchInput}
          placeholder="🔍  Search opportunities, skills, organizations..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <div style={styles.filterRow}>
          {/* Type Filter */}
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Type:</span>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setTypeFilter(t); setPage(1); }}
                style={{ ...styles.filterBtn, ...(typeFilter === t ? styles.filterBtnActive : {}) }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Sort:</span>
            {[["match", "Best Match"], ["deadline", "Deadline"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSortBy(val)}
                style={{ ...styles.filterBtn, ...(sortBy === val ? styles.filterBtnActive : {}) }}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Skill Filter */}
          <select
            value={skillFilter}
            onChange={(e) => { setSkillFilter(e.target.value); setPage(1); }}
            style={styles.select}
          >
            {allSkills.map((s) => <option key={s} value={s}>{s === "All" ? "All Skills" : s}</option>)}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p style={styles.resultCount}>
        Showing {Math.min(paged.length, filtered.length)} of {filtered.length} opportunities
      </p>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <span style={{ fontSize: 48 }}>🌸</span>
          <p>No opportunities match your filters. Try broadening your search!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {paged.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              matchData={opp.matchData}
              applied={applied.includes(opp.id)}
              onApply={handleApply}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div style={{ textAlign: "center", paddingTop: 10 }}>
          <button
            onClick={() => setPage((p) => p + 1)}
            style={styles.loadMoreBtn}
          >
            Load More Opportunities ({filtered.length - paged.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: 24 },
  dashHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    flexWrap: "wrap", gap: 12,
  },
  dashTitle: {
    margin: 0, fontSize: 28, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#3a0a14",
  },
  dashSub: {
    margin: "4px 0 0", fontSize: 15, color: "#9a6070",
    fontFamily: "'Cormorant Garamond', serif",
  },
  setupBtn: {
    padding: "10px 20px", borderRadius: 12, border: "none",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14,
  },
  statCard: {
    background: "rgba(255,245,248,0.6)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(249,203,214,0.5)", borderRadius: 16,
    padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4,
    boxShadow: "0 2px 12px rgba(158,24,43,0.06)",
  },
  statNum: {
    fontSize: 30, fontWeight: 800, fontFamily: "'Cormorant Garamond', serif",
  },
  statLabel: {
    fontSize: 13, color: "#9a6070", fontFamily: "'Cormorant Garamond', serif",
  },
  suggestionsBox: {
    background: "rgba(255,245,248,0.55)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(249,203,214,0.5)", borderRadius: 20,
    padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14,
  },
  suggestTitle: {
    margin: 0, fontSize: 19, fontWeight: 700,
    fontFamily: "'Cormorant Garamond', serif", color: "#4a0e1a",
  },
  suggestGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12,
  },
  suggestCard: {
    display: "flex", gap: 10, alignItems: "flex-start",
    background: "rgba(249,203,214,0.2)", borderRadius: 14,
    padding: "12px 14px", border: "1px solid rgba(249,203,214,0.4)",
  },
  suggestIcon: { fontSize: 20, flexShrink: 0 },
  suggestMsg: {
    margin: 0, fontSize: 14, color: "#5a1a24", lineHeight: 1.5,
    fontFamily: "'Cormorant Garamond', serif",
  },
  appliedToggle: {
    padding: "10px 20px", borderRadius: 12,
    background: "rgba(255,245,248,0.6)", backdropFilter: "blur(10px)",
    border: "1.5px solid rgba(249,203,214,0.6)", color: "#7a2035",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 700,
    cursor: "pointer", textAlign: "left",
  },
  appliedGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16,
  },
  controls: {
    display: "flex", flexDirection: "column", gap: 12,
    background: "rgba(255,245,248,0.55)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(249,203,214,0.5)", borderRadius: 20, padding: 20,
  },
  searchInput: {
    width: "100%", padding: "12px 18px", borderRadius: 14,
    border: "1.5px solid rgba(158,24,43,0.2)",
    background: "rgba(249,203,214,0.1)",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#3a0a14",
    outline: "none", boxSizing: "border-box",
  },
  filterRow: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" },
  filterGroup: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  filterLabel: {
    fontSize: 13, fontWeight: 700, color: "#9a6070",
    fontFamily: "'Cormorant Garamond', serif",
  },
  filterBtn: {
    padding: "6px 14px", borderRadius: 20, border: "1.5px solid rgba(158,24,43,0.2)",
    background: "rgba(249,203,214,0.15)", cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#7a2035",
    transition: "all 0.2s",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", borderColor: "transparent",
  },
  select: {
    padding: "7px 14px", borderRadius: 20, border: "1.5px solid rgba(158,24,43,0.2)",
    background: "rgba(249,203,214,0.15)", cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#7a2035",
    outline: "none",
  },
  resultCount: {
    margin: 0, fontSize: 14, color: "#b0738a",
    fontFamily: "'Cormorant Garamond', serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
    gap: 18,
  },
  empty: {
    textAlign: "center", padding: "60px 20px",
    color: "#9a6070", fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
    display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
  },
  loadMoreBtn: {
    padding: "14px 32px", borderRadius: 14,
    border: "2px solid rgba(158,24,43,0.3)",
    background: "rgba(255,245,248,0.6)", backdropFilter: "blur(10px)",
    color: "#9E182B", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16, fontWeight: 700, cursor: "pointer",
    transition: "all 0.2s",
  },
};
