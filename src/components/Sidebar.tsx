import {
  Compass,
  LayoutDashboard,
  Wrench,
  Brain,
  Bookmark,
  Activity,
  Settings,
} from "lucide-react";

export type Page =
  | "overview"
  | "explore"
  | "saved"
  | "tools"
  | "practice"
  | "progress"
  | "settings";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

function Sidebar({ activePage, onNavigate }: SidebarProps) {
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

          <NavButton
            icon={<LayoutDashboard size={17} />}
            label="Overview"
            active={activePage === "overview"}
            onClick={() => onNavigate("overview")}
          />

          <NavButton
            icon={<Compass size={17} />}
            label="Explore"
            active={activePage === "explore"}
            onClick={() => onNavigate("explore")}
          />

          <NavButton
            icon={<Bookmark size={17} />}
            label="Saved"
            active={activePage === "saved"}
            onClick={() => onNavigate("saved")}
          />
        </div>

        <div className="nav-section">
          <span>LAB</span>

          <NavButton
            icon={<Wrench size={17} />}
            label="Cyber Tools"
            active={activePage === "tools"}
            onClick={() => onNavigate("tools")}
          />

          <NavButton
            icon={<Brain size={17} />}
            label="Practice"
            active={activePage === "practice"}
            onClick={() => onNavigate("practice")}
          />

          <NavButton
            icon={<Activity size={17} />}
            label="Progress"
            active={activePage === "progress"}
            onClick={() => onNavigate("progress")}
          />
        </div>
      </nav>

      <div className="sidebar-bottom">
        <NavButton
          icon={<Settings size={17} />}
          label="Settings"
          active={activePage === "settings"}
          onClick={() => onNavigate("settings")}
        />

        <div className="system-status">
          <span className="status-dot" />
          <span>Workspace online</span>
        </div>
      </div>
    </aside>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
      data-cursor
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;