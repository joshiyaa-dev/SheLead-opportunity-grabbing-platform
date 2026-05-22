// components/SkillSelector.js — Multi-select skill picker
import { useState } from "react";
import { SKILLS_LIST } from "../data";

const CATEGORIES = {
  "💻 Tech": ["JavaScript","React","Python","Java","C++","C#","TypeScript","Node.js","HTML/CSS","SQL","MongoDB","Firebase","AWS","Docker","Machine Learning","Data Science","TensorFlow","Computer Vision","Cybersecurity","Blockchain","Flutter","Swift","Kotlin","Unity","REST APIs","GraphQL","Git","Linux","DevOps","Cloud Computing"],
  "📊 Business": ["Marketing","Finance","Accounting","Business Development","Project Management","Product Management","Strategy","Sales","Operations","Entrepreneurship","Leadership","Public Speaking","Business Analytics","Excel","PowerPoint","Market Research"],
  "🎨 Design": ["UI/UX Design","Figma","Adobe XD","Photoshop","Illustrator","Graphic Design","Motion Graphics","Branding","Typography","3D Modeling","Canva","Video Editing","Photography"],
  "🔬 Research & More": ["Research","Data Analysis","Statistics","Writing","Editing","Content Creation","Social Media","SEO","Communication","Critical Thinking","Problem Solving","Teamwork"],
};

export default function SkillSelector({ selected, onChange }) {
  const [search, setSearch] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [otherInput, setOtherInput] = useState("");
  const [activeTab, setActiveTab] = useState("💻 Tech");

  const toggle = (skill) => {
    if (skill === "Other") {
      setShowOther(!showOther);
      return;
    }
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  const addOther = () => {
    const trimmed = otherInput.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
      setOtherInput("");
    }
  };

  const removeSkill = (skill) => onChange(selected.filter((s) => s !== skill));

  const filteredSkills = search
    ? SKILLS_LIST.filter((s) => s.toLowerCase().includes(search.toLowerCase()) && s !== "Other")
    : CATEGORIES[activeTab] || [];

  return (
    <div style={styles.container}>
      {/* Selected Tags */}
      {selected.length > 0 && (
        <div style={styles.selectedWrap}>
          {selected.map((skill) => (
            <span key={skill} style={styles.tag}>
              {skill}
              <button onClick={() => removeSkill(skill)} style={styles.tagX}>×</button>
            </span>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <input
        style={styles.searchInput}
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Tabs */}
      {!search && (
        <div style={styles.tabs}>
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              style={{ ...styles.tab, ...(activeTab === cat ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Skills Grid */}
      <div style={styles.grid}>
        {filteredSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => toggle(skill)}
            style={{
              ...styles.skillBtn,
              ...(selected.includes(skill) ? styles.skillBtnActive : {}),
            }}
          >
            {skill}
          </button>
        ))}
        {!search && (
          <button
            onClick={() => toggle("Other")}
            style={{ ...styles.skillBtn, ...(showOther ? styles.skillBtnActive : {}) }}
          >
            + Other
          </button>
        )}
      </div>

      {/* Other Input */}
      {showOther && (
        <div style={styles.otherWrap}>
          <input
            style={styles.otherInput}
            placeholder="Type a custom skill..."
            value={otherInput}
            onChange={(e) => setOtherInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addOther()}
          />
          <button onClick={addOther} style={styles.addBtn}>Add</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: 12 },
  selectedWrap: { display: "flex", flexWrap: "wrap", gap: 8, padding: "8px 0" },
  tag: {
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 13,
    fontFamily: "'Cormorant Garamond', serif",
    display: "flex", alignItems: "center", gap: 6,
  },
  tagX: {
    background: "none", border: "none", color: "#fff",
    cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0,
  },
  searchInput: {
    width: "100%", padding: "10px 16px", borderRadius: 12,
    border: "1.5px solid rgba(158,24,43,0.25)",
    background: "rgba(249,203,214,0.15)",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15, color: "#5a1a24", outline: "none",
    boxSizing: "border-box",
  },
  tabs: { display: "flex", flexWrap: "wrap", gap: 8 },
  tab: {
    padding: "6px 14px", borderRadius: 20, border: "1.5px solid rgba(158,24,43,0.2)",
    background: "rgba(249,203,214,0.2)", cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#7a2035",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", borderColor: "transparent",
  },
  grid: { display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 200, overflowY: "auto", paddingRight: 4 },
  skillBtn: {
    padding: "6px 14px", borderRadius: 20,
    border: "1.5px solid rgba(158,24,43,0.25)",
    background: "rgba(249,203,214,0.15)",
    cursor: "pointer", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13, color: "#7a2035", transition: "all 0.2s",
  },
  skillBtnActive: {
    background: "linear-gradient(135deg, #F9CBD6, #F2AFBC)",
    borderColor: "#9E182B", color: "#5a1a24", fontWeight: 700,
  },
  otherWrap: { display: "flex", gap: 8 },
  otherInput: {
    flex: 1, padding: "10px 14px", borderRadius: 12,
    border: "1.5px solid rgba(158,24,43,0.3)",
    background: "rgba(249,203,214,0.2)",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
    color: "#5a1a24", outline: "none",
  },
  addBtn: {
    padding: "10px 20px", borderRadius: 12,
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", border: "none", cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
  },
};
