import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  Brain,
  CircleDot,
  Compass,
  FileSearch,
  Hash,
  Network,
  Search,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";

import CustomCursor from "./components/CustomCursor";
import Sidebar from "./components/Sidebar";

const concepts = [
  { name: "HTTP", x: "50%", y: "20%", type: "core" },
  { name: "XSS", x: "27%", y: "42%", type: "normal" },
  { name: "APIs", x: "72%", y: "39%", type: "normal" },
  { name: "AUTH", x: "20%", y: "70%", type: "normal" },
  { name: "SQL", x: "51%", y: "72%", type: "core" },
  { name: "DOM", x: "79%", y: "68%", type: "normal" },
];

function App() {
  return (
    <>
      <CustomCursor />

      <div className="app-shell">
        <Sidebar />

        <main className="main-content">
          <header className="topbar">
            <div className="breadcrumb">
              <span>Workspace</span>
              <span>/</span>
              <strong>Overview</strong>
            </div>

            <div className="topbar-actions">
              <div className="global-search" data-cursor>
                <Search size={15} />
                <span>Search CyberLM</span>
                <kbd>⌘ K</kbd>
              </div>

              <button className="icon-button" data-cursor>
                <Bell size={17} />
              </button>

              <div className="profile" data-cursor>
                <div className="profile-avatar">R</div>
                <span>Researcher</span>
              </div>
            </div>
          </header>

          <section className="workspace">

            {/* HERO */}

            <div className="hero-section">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  CYBERSECURITY WORKSPACE
                </div>

                <h1>
                  Learn the system.
                  <br />
                  <span>See the connections.</span>
                </h1>

                <p>
                  Explore cybersecurity concepts, investigate relationships,
                  practise real scenarios, and build your own security
                  knowledge map.
                </p>

                <div className="quick-actions">
                  <button className="primary-action" data-cursor>
                    <Compass size={16} />
                    Explore resources
                    <ArrowUpRight size={16} />
                  </button>

                  <button className="secondary-action" data-cursor>
                    <Sparkles size={16} />
                    Start a challenge
                  </button>
                </div>
              </div>

              {/* GRAPH */}

              <div className="knowledge-map" data-cursor>
                <div className="map-header">
                  <div>
                    <span className="map-kicker">KNOWLEDGE CONSTELLATION</span>
                    <strong>Web Security</strong>
                  </div>

                  <div className="map-live">
                    <span />
                    INTERACTIVE
                  </div>
                </div>

                <svg
                  className="map-connections"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line x1="50" y1="20" x2="27" y2="42" />
                  <line x1="50" y1="20" x2="72" y2="39" />
                  <line x1="27" y1="42" x2="20" y2="70" />
                  <line x1="27" y1="42" x2="51" y2="72" />
                  <line x1="72" y1="39" x2="79" y2="68" />
                  <line x1="72" y1="39" x2="51" y2="72" />
                  <line x1="51" y1="72" x2="79" y2="68" />
                </svg>

                {concepts.map((concept) => (
                  <button
                    key={concept.name}
                    className={`concept-node ${concept.type}`}
                    style={{
                      left: concept.x,
                      top: concept.y,
                    }}
                    data-cursor
                  >
                    <span className="node-pulse" />
                    <span>{concept.name}</span>
                  </button>
                ))}

                <div className="map-orbit orbit-one" />
                <div className="map-orbit orbit-two" />
              </div>
            </div>

            {/* LOWER GRID */}

            <div className="dashboard-grid">

              {/* PROGRESS */}

              <div className="dashboard-card progress-card">
                <div className="card-heading">
                  <div>
                    <span className="card-label">KNOWLEDGE</span>
                    <h2>Security profile</h2>
                  </div>

                  <Brain size={18} />
                </div>

                <div className="progress-layout">
                  <div className="progress-ring">
                    <svg viewBox="0 0 120 120">
                      <circle
                        className="ring-background"
                        cx="60"
                        cy="60"
                        r="48"
                      />

                      <circle
                        className="ring-progress"
                        cx="60"
                        cy="60"
                        r="48"
                      />
                    </svg>

                    <div className="progress-value">
                      <strong>42</strong>
                      <span>%</span>
                    </div>
                  </div>

                  <div className="progress-details">
                    <div>
                      <strong>Web security</strong>
                      <span>Good foundation</span>
                    </div>

                    <div>
                      <strong>Networking</strong>
                      <span>Needs practice</span>
                    </div>

                    <div>
                      <strong>Cryptography</strong>
                      <span>Exploring</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}

              <div className="dashboard-card activity-card">
                <div className="card-heading">
                  <div>
                    <span className="card-label">RECENT ACTIVITY</span>
                    <h2>Your workspace</h2>
                  </div>

                  <Activity size={18} />
                </div>

                <div className="activity-list">
                  <ActivityItem
                    icon={<BookOpen size={15} />}
                    title="HTTP fundamentals"
                    detail="Resource explored"
                    time="09:42"
                  />

                  <ActivityItem
                    icon={<FileSearch size={15} />}
                    title="XSS investigation"
                    detail="Case opened"
                    time="09:31"
                  />

                  <ActivityItem
                    icon={<Network size={15} />}
                    title="Network analyzer"
                    detail="Tool launched"
                    time="09:18"
                  />

                  <ActivityItem
                    icon={<Shield size={15} />}
                    title="OWASP reference"
                    detail="Resource saved"
                    time="08:56"
                  />
                </div>
              </div>

              {/* TOOLS */}

              <div className="dashboard-card tools-card">
                <div className="card-heading">
                  <div>
                    <span className="card-label">CYBER TOOLS</span>
                    <h2>Work with the data</h2>
                  </div>

                  <Terminal size={18} />
                </div>

                <div className="tool-grid">
                  <button className="tool-tile" data-cursor>
                    <FileSearch size={19} />
                    <span>IOC Analyzer</span>
                    <small>Inspect indicators</small>
                  </button>

                  <button className="tool-tile" data-cursor>
                    <Network size={19} />
                    <span>Network Lab</span>
                    <small>Explore networks</small>
                  </button>

                  <button className="tool-tile" data-cursor>
                    <Hash size={19} />
                    <span>Hash Lab</span>
                    <small>Transform data</small>
                  </button>

                  <button className="tool-tile" data-cursor>
                    <CircleDot size={19} />
                    <span>HTTP Explorer</span>
                    <small>Inspect requests</small>
                  </button>
                </div>
              </div>

            </div>

            {/* BOTTOM STATUS */}

            <div className="bottom-strip">
              <div>
                <span className="strip-dot" />
                CYBERLM SYSTEM READY
              </div>

              <span>
                06 concepts connected · 04 tools available · 00 alerts
              </span>
            </div>

          </section>
        </main>
      </div>
    </>
  );
}

function ActivityItem({
  icon,
  title,
  detail,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="activity-item">
      <div className="activity-icon">{icon}</div>

      <div className="activity-copy">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>

      <time>{time}</time>
    </div>
  );
}

export default App;