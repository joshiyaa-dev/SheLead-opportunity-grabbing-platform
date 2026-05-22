// App.js — SheLeads root component with navigation and animated background
import { useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "✦" },
  { id: "profile", label: "My Profile", icon: "👤" },
  { id: "dashboard", label: "Opportunities", icon: "💼" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [profile, setProfile] = useState({ name: "", skills: [] });
  const [applied, setApplied] = useState([]);

  return (
    <div style={styles.root}>
      {/* Animated Background Blobs */}
      <div style={styles.bg}>
        <div style={{ ...styles.blob, ...styles.blob1 }} />
        <div style={{ ...styles.blob, ...styles.blob2 }} />
        <div style={{ ...styles.blob, ...styles.blob3 }} />
        <div style={{ ...styles.blob, ...styles.blob4 }} />
        <div style={styles.grain} />
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {/* Logo */}
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✦</span>
            <span style={styles.logoText}>She<span style={styles.logoAccent}>Leads</span></span>
          </div>

          {/* Nav Links */}
          <div style={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  ...styles.navBtn,
                  ...(page === item.id ? styles.navBtnActive : {}),
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Pill */}
          {profile.name && (
            <div style={styles.profilePill} onClick={() => setPage("profile")}>
              <div style={styles.profileDot}>{profile.name[0].toUpperCase()}</div>
              <span style={styles.profileName}>{profile.name}</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {page === "home" && <Home onNavigate={setPage} />}
        {page === "profile" && (
          <Profile profile={profile} setProfile={setProfile} onNavigate={setPage} />
        )}
        {page === "dashboard" && (
          <Dashboard
            profile={profile}
            applied={applied}
            setApplied={setApplied}
            onNavigate={setPage}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Made with 💜 for women who lead · SheLeads 2025
        </p>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 30px) scale(1.05); }
          66% { transform: translate(-20px, -20px) scale(0.97); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.1); }
        }

        .blob1 { animation: float1 12s ease-in-out infinite; }
        .blob2 { animation: float2 16s ease-in-out infinite; }
        .blob3 { animation: float3 10s ease-in-out infinite; }
        .blob4 { animation: float4 14s ease-in-out infinite; }

        button:hover { opacity: 0.88; }
        button { transition: opacity 0.2s, transform 0.15s; }
        button:active { transform: scale(0.97); }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(249,203,214,0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(158,24,43,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    fontFamily: "'Cormorant Garamond', serif",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "fixed", inset: 0, zIndex: 0,
    background: "linear-gradient(135deg, #FDF0F3 0%, #F9CBD6 30%, #F2E0D2 60%, #FAF0F5 100%)",
  },
  blob: {
    position: "absolute", borderRadius: "50%",
    filter: "blur(70px)", opacity: 0.55,
  },
  blob1: {
    width: 500, height: 500, top: "-100px", left: "-150px",
    background: "radial-gradient(circle, #F9CBD6, #F2AFBC)",
    className: "blob1",
    animation: "float1 12s ease-in-out infinite",
  },
  blob2: {
    width: 400, height: 400, bottom: "100px", right: "-100px",
    background: "radial-gradient(circle, #9E182B44, #F2AFBC66)",
    animation: "float2 16s ease-in-out infinite",
  },
  blob3: {
    width: 300, height: 300, top: "40%", left: "60%",
    background: "radial-gradient(circle, #F2E0D2, #F9CBD666)",
    animation: "float3 10s ease-in-out infinite",
  },
  blob4: {
    width: 350, height: 350, top: "20%", right: "25%",
    background: "radial-gradient(circle, #F2AFBC44, #9E182B22)",
    animation: "float4 14s ease-in-out infinite",
  },
  grain: {
    position: "absolute", inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    opacity: 0.4,
  },
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(255,245,248,0.72)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid rgba(249,203,214,0.6)",
    boxShadow: "0 2px 20px rgba(158,24,43,0.06)",
  },
  navInner: {
    maxWidth: 1100, margin: "0 auto",
    padding: "0 24px",
    height: 64,
    display: "flex", alignItems: "center", gap: 32,
  },
  logo: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0, cursor: "default" },
  logoIcon: {
    fontSize: 22, color: "#9E182B",
    filter: "drop-shadow(0 0 6px rgba(158,24,43,0.4))",
  },
  logoText: {
    fontSize: 22, fontWeight: 700, color: "#3a0a14",
    letterSpacing: "-0.5px",
  },
  logoAccent: {
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  navLinks: { display: "flex", gap: 4, flex: 1 },
  navBtn: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "8px 16px", borderRadius: 12, border: "none",
    background: "transparent", cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15, fontWeight: 600, color: "#7a4050",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "linear-gradient(135deg, rgba(249,203,214,0.6), rgba(242,175,188,0.4))",
    color: "#9E182B",
    boxShadow: "0 2px 10px rgba(158,24,43,0.1)",
  },
  profilePill: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "6px 14px 6px 6px", borderRadius: 24,
    background: "rgba(249,203,214,0.4)",
    border: "1px solid rgba(158,24,43,0.2)",
    cursor: "pointer", flexShrink: 0,
  },
  profileDot: {
    width: 28, height: 28, borderRadius: "50%",
    background: "linear-gradient(135deg, #9E182B, #C45070)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700,
  },
  profileName: { fontSize: 14, fontWeight: 700, color: "#5a1a24" },
  main: {
    position: "relative", zIndex: 1,
    maxWidth: 1100, margin: "0 auto",
    padding: "32px 24px",
  },
  footer: {
    position: "relative", zIndex: 1,
    textAlign: "center", padding: "24px",
    borderTop: "1px solid rgba(249,203,214,0.4)",
    background: "rgba(255,245,248,0.4)",
  },
  footerText: {
    margin: 0, fontSize: 14, color: "#b0738a",
    fontFamily: "'Cormorant Garamond', serif",
  },
};
