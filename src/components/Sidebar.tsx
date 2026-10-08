import {
  Compass,
  LayoutDashboard,
  Wrench,
  Brain,
  Bookmark,
  Activity,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">C</div>

        <div>
          <div className="brand-name">CyberLM</div>
          <div className="brand-subtitle">Cybersecurity workspace</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span>WORKSPACE</span>

          <button className="nav-item active" data-cursor>
            <LayoutDashboard size={17} />
            <span>Overview</span>
          </button>

          <button className="nav-item" data-cursor>
            <Compass size={17} />
            <span>Explore</span>
          </button>

          <button className="nav-item" data-cursor>
            <Bookmark size={17} />
            <span>Saved</span>
          </button>
        </div>

        <div className="nav-section">
          <span>LAB</span>

          <button className="nav-item" data-cursor>
            <Wrench size={17} />
            <span>Cyber Tools</span>
          </button>

          <button className="nav-item" data-cursor>
            <Brain size={17} />
            <span>Practice</span>
          </button>

          <button className="nav-item" data-cursor>
            <Activity size={17} />
            <span>Progress</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item" data-cursor>
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <div className="system-status">
          <span className="status-dot" />
          <span>Workspace online</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;