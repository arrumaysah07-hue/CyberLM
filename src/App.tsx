import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  Globe,
  Layers3,
  Lock,
  Network,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from "lucide-react";

import Sidebar, {
  type Page,
} from "./components/Sidebar";

import CustomCursor from "./components/CustomCursor";

import KnowledgeMap from "./components/KnowledgeMap";

import PracticePage from "./pages/PracticePage";

import {
  resources,
  topics,
  type CyberResource,
  type ResourceDifficulty,
  type ResourceSource,
} from "./data/resources";

/* =========================================
   TYPES AND STORAGE
   ========================================= */

type LearningStatus =
  | "not-started"
  | "in-progress"
  | "completed";

const SAVED_KEY = "cyberlm-saved-resources";

const LEARNING_KEY =
  "cyberlm-learning-status";

function readStoredValue<T>(
  key: string,
  fallback: T
): T {
  try {
    const value =
      localStorage.getItem(key);

    return value
      ? (JSON.parse(value) as T)
      : fallback;
  } catch {
    return fallback;
  }
}

/* =========================================
   MAIN APPLICATION
   ========================================= */

function App() {
  const [activePage, setActivePage] =
    useState<Page>("overview");

  const [savedIds, setSavedIds] =
    useState<string[]>(() =>
      readStoredValue<string[]>(
        SAVED_KEY,
        []
      )
    );

  const [learningStatus, setLearningStatus] =
    useState<
      Record<string, LearningStatus>
    >(() =>
      readStoredValue<
        Record<string, LearningStatus>
      >(LEARNING_KEY, {})
    );

  const [
    selectedResource,
    setSelectedResource,
  ] = useState<CyberResource | null>(
    null
  );

  /* Persist saved resources locally. */

  useEffect(() => {
    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(savedIds)
    );
  }, [savedIds]);

  /* Persist learning progress locally. */

  useEffect(() => {
    localStorage.setItem(
      LEARNING_KEY,
      JSON.stringify(learningStatus)
    );
  }, [learningStatus]);

  /* Save or remove a resource. */

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter(
            (savedId) =>
              savedId !== id
          )
        : [...current, id]
    );
  }

  /* Update learning status. */

  function updateLearningStatus(
    id: string,
    status: LearningStatus
  ) {
    setLearningStatus((current) => ({
      ...current,
      [id]: status,
    }));
  }

  /* Open resource details. */

  function openResource(
    resource: CyberResource
  ) {
    setSelectedResource(resource);
  }

  /* Close resource details. */

  function closeResource() {
    setSelectedResource(null);
  }

  /* Get the saved resource objects. */

  const savedResources = useMemo(
    () =>
      resources.filter((resource) =>
        savedIds.includes(resource.id)
      ),
    [savedIds]
  );

  /* Calculate progress statistics. */

  const completedCount =
    resources.filter(
      (resource) =>
        learningStatus[resource.id] ===
        "completed"
    ).length;

  const inProgressCount =
    resources.filter(
      (resource) =>
        learningStatus[resource.id] ===
        "in-progress"
    ).length;

  return (
    <>
      {/* Custom mouse cursor */}

      <CustomCursor />

      {/* Main navigation */}

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main workspace */}

      <main className="main-content">
        <TopBar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {/* OVERVIEW */}

        {activePage === "overview" && (
          <Overview
            onNavigate={setActivePage}
            onOpenResource={openResource}
            savedIds={savedIds}
            learningStatus={learningStatus}
            toggleSaved={toggleSaved}
          />
        )}

        {/* EXPLORE */}

        {activePage === "explore" && (
          <ExplorePage
            onOpenResource={openResource}
            savedIds={savedIds}
            toggleSaved={toggleSaved}
          />
        )}

        {/* SAVED RESOURCES */}

        {activePage === "saved" && (
          <SavedPage
            resources={savedResources}
            savedIds={savedIds}
            onOpenResource={openResource}
            toggleSaved={toggleSaved}
          />
        )}

        {/* CYBER TOOLS */}

        {activePage === "tools" && (
          <ToolsPage />
        )}

        {/* PRACTICE */}

        {activePage === "practice" && (
          <PracticePage />
        )}

        {/* PROGRESS */}

        {activePage === "progress" && (
          <ProgressPage
            completedCount={completedCount}
            inProgressCount={inProgressCount}
            savedCount={savedIds.length}
            learningStatus={learningStatus}
            onOpenResource={openResource}
          />
        )}

        {/* SETTINGS */}

        {activePage === "settings" && (
          <SimplePage
            eyebrow="WORKSPACE"
            title="Settings"
            description="Workspace preferences will live here as CyberLM grows."
            icon={<Wrench size={19} />}
          />
        )}
      </main>

      {/* RESOURCE DETAILS MODAL */}

      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          saved={savedIds.includes(
            selectedResource.id
          )}
          status={
            learningStatus[
              selectedResource.id
            ] ?? "not-started"
          }
          onClose={closeResource}
          onToggleSaved={() =>
            toggleSaved(
              selectedResource.id
            )
          }
          onUpdateStatus={(status) =>
            updateLearningStatus(
              selectedResource.id,
              status
            )
          }
          onOpenRelatedResource={
            openResource
          }
        />
      )}
    </>
  );
}

/* =========================================
   TOP BAR
   ========================================= */

function TopBar({
  activePage,
  onNavigate,
}: {
  activePage: Page;
  onNavigate: (page: Page) => void;
}) {
  const pageNames: Record<Page, string> = {
    overview: "Overview",
    explore: "Explore",
    saved: "Saved",
    tools: "Cyber Tools",
    practice: "Practice",
    progress: "Progress",
    settings: "Settings",
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-path">
          WORKSPACE
        </span>

        <ChevronRight
          size={13}
          className="topbar-chevron"
        />

        <span className="topbar-current">
          {pageNames[activePage]}
        </span>
      </div>

      <button
        className="topbar-command"
        onClick={() =>
          onNavigate("explore")
        }
        data-cursor
      >
        <Search size={14} />

        <span>
          Explore resources
        </span>

        <kbd>⌘ K</kbd>
      </button>
    </header>
  );
}

/* =========================================
   OVERVIEW
   ========================================= */

interface OverviewProps {
  onNavigate: (page: Page) => void;

  onOpenResource: (
    resource: CyberResource
  ) => void;

  savedIds: string[];

  learningStatus: Record<
    string,
    LearningStatus
  >;

  toggleSaved: (id: string) => void;
}

function Overview({
  onNavigate,
  onOpenResource,
  savedIds,
  learningStatus,
  toggleSaved,
}: OverviewProps) {
  const featuredResources =
    resources.filter(
      (resource) => resource.featured
    );

  const recentResources =
    resources.slice(0, 5);

  const completedCount =
    Object.values(
      learningStatus
    ).filter(
      (status) =>
        status === "completed"
    ).length;

  const startedCount =
    Object.values(
      learningStatus
    ).filter(
      (status) =>
        status !== "not-started"
    ).length;

  return (
    <div className="page-container">
      <section className="overview-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            CYBERSECURITY WORKSPACE
          </span>

          <h1>
            Learn security
            <br />
            <em>
              through connection.
            </em>
          </h1>

          <p>
            CyberLM brings trusted
            cybersecurity resources,
            concepts and practical tools
            into one focused workspace.
          </p>

          <div className="hero-actions">
            <button
              className="button-primary"
              onClick={() =>
                onNavigate("explore")
              }
              data-cursor
            >
              Explore resources
              <ArrowUpRight size={15} />
            </button>

            <button
              className="button-secondary"
              onClick={() =>
                onNavigate("tools")
              }
              data-cursor
            >
              Open Cyber Tools
            </button>
          </div>
        </div>

        <div className="hero-graphic">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-orbit orbit-three" />

          <div className="hero-core">
            <span />
            <strong>CYBER</strong>
            <small>LM</small>
          </div>

          <div className="hero-node hero-node-one">
            <Shield size={14} />
          </div>

          <div className="hero-node hero-node-two">
            <Globe size={14} />
          </div>

          <div className="hero-node hero-node-three">
            <Lock size={14} />
          </div>

          <div className="hero-node hero-node-four">
            <Network size={14} />
          </div>
        </div>
      </section>

      <section className="overview-stats">
        <Stat
          label="Resources"
          value={resources.length}
          detail="trusted sources"
        />

        <Stat
          label="Saved"
          value={savedIds.length}
          detail="your library"
        />

        <Stat
          label="Started"
          value={startedCount}
          detail="learning items"
        />

        <Stat
          label="Completed"
          value={completedCount}
          detail="finished"
        />
      </section>

      <section className="overview-grid">
        <div className="section-block">
          <SectionHeading
            eyebrow="FEATURED"
            title="Start somewhere useful."
            action="View all"
            onAction={() =>
              onNavigate("explore")
            }
          />

          <div className="resource-grid">
            {featuredResources
              .slice(0, 4)
              .map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  saved={savedIds.includes(
                    resource.id
                  )}
                  onOpen={() =>
                    onOpenResource(resource)
                  }
                  onToggleSaved={() =>
                    toggleSaved(resource.id)
                  }
                />
              ))}
          </div>
        </div>

        <aside className="overview-side">
          <div className="side-panel">
            <div className="side-panel-heading">
              <span className="eyebrow">
                LEARNING
              </span>

              <ActivityIndicator />
            </div>

            <div className="learning-summary">
              <strong>
                {completedCount}
              </strong>

              <span>
                completed resources
              </span>
            </div>

            <div className="learning-bar">
              <span
                style={{
                  width: `${
                    resources.length
                      ? Math.min(
                          100,
                          (completedCount /
                            resources.length) *
                            100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <button
              className="side-link"
              onClick={() =>
                onNavigate("progress")
              }
              data-cursor
            >
              View progress
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="side-panel compact">
            <span className="eyebrow">
              QUICK ACCESS
            </span>

            <button
              className="quick-link"
              onClick={() =>
                onNavigate("explore")
              }
              data-cursor
            >
              <Search size={15} />

              <span>
                Explore resources
              </span>

              <ChevronRight size={14} />
            </button>

            <button
              className="quick-link"
              onClick={() =>
                onNavigate("tools")
              }
              data-cursor
            >
              <Terminal size={15} />

              <span>
                Cyber Tools
              </span>

              <ChevronRight size={14} />
            </button>

            <button
              className="quick-link"
              onClick={() =>
                onNavigate("practice")
              }
              data-cursor
            >
              <CircleHelp size={15} />

              <span>
                Practice questions
              </span>

              <ChevronRight size={14} />
            </button>

            <button
              className="quick-link"
              onClick={() =>
                onNavigate("saved")
              }
              data-cursor
            >
              <Bookmark size={15} />

              <span>
                Saved resources
              </span>

              <ChevronRight size={14} />
            </button>
          </div>
        </aside>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="KNOWLEDGE GRAPH"
          title="See how concepts connect."
          action="Explore"
          onAction={() =>
            onNavigate("explore")
          }
        />

        <KnowledgeMap
          onOpenResource={onOpenResource}
        />
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="RECENT RESOURCES"
          title="Keep learning."
          action="View all"
          onAction={() =>
            onNavigate("explore")
          }
        />

        <div className="resource-list">
          {recentResources.map(
            (resource) => (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                saved={savedIds.includes(
                  resource.id
                )}
                onOpen={() =>
                  onOpenResource(resource)
                }
                onToggleSaved={() =>
                  toggleSaved(resource.id)
                }
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}

/* =========================================
   EXPLORE
   ========================================= */

function ExplorePage({
  onOpenResource,
  savedIds,
  toggleSaved,
}: {
  onOpenResource: (
    resource: CyberResource
  ) => void;

  savedIds: string[];

  toggleSaved: (id: string) => void;
}) {
  const [query, setQuery] =
    useState("");

  const [selectedSource, setSelectedSource] =
    useState<ResourceSource | "All">(
      "All"
    );

  const [
    selectedDifficulty,
    setSelectedDifficulty,
  ] = useState<
    ResourceDifficulty | "All"
  >("All");

  const filteredResources =
    useMemo(() => {
      const normalized =
        query.trim().toLowerCase();

      return resources.filter(
        (resource) => {
          const searchableText = [
            resource.title,
            resource.description,
            resource.topic,
            resource.source,
            ...resource.tags,
          ]
            .join(" ")
            .toLowerCase();

          const matchesQuery =
            !normalized ||
            searchableText.includes(
              normalized
            );

          const matchesSource =
            selectedSource === "All" ||
            resource.source ===
              selectedSource;

          const matchesDifficulty =
            selectedDifficulty ===
              "All" ||
            resource.difficulty ===
              selectedDifficulty;

          return (
            matchesQuery &&
            matchesSource &&
            matchesDifficulty
          );
        }
      );
    }, [
      query,
      selectedSource,
      selectedDifficulty,
    ]);

  return (
    <div className="page-container">
      <PageIntro
        eyebrow="RESOURCE EXPLORER"
        title="Explore cybersecurity."
        description="Search trusted learning resources and references from one focused workspace."
      />

      <div className="explore-toolbar">
        <div className="search-field">
          <Search size={16} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search resources, topics, tags..."
          />

          {query && (
            <button
              onClick={() =>
                setQuery("")
              }
              data-cursor
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={selectedSource}
          onChange={(event) =>
            setSelectedSource(
              event.target.value as
                | ResourceSource
                | "All"
            )
          }
          data-cursor
        >
          <option value="All">
            All sources
          </option>

          <option value="OWASP">
            OWASP
          </option>

          <option value="PortSwigger">
            PortSwigger
          </option>

          <option value="TryHackMe">
            TryHackMe
          </option>

          <option value="NIST">
            NIST
          </option>
        </select>

        <select
          value={selectedDifficulty}
          onChange={(event) =>
            setSelectedDifficulty(
              event.target.value as
                | ResourceDifficulty
                | "All"
            )
          }
          data-cursor
        >
          <option value="All">
            All levels
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>
        </select>
      </div>

      <div className="explore-results-meta">
        <span>
          {filteredResources.length} resources
        </span>

        {query && (
          <span>
            Matching "{query}"
          </span>
        )}
      </div>

      {filteredResources.length > 0 ? (
        <div className="resource-grid explore-grid">
          {filteredResources.map(
            (resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                saved={savedIds.includes(
                  resource.id
                )}
                onOpen={() =>
                  onOpenResource(resource)
                }
                onToggleSaved={() =>
                  toggleSaved(resource.id)
                }
              />
            )
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Search size={20} />}
          title="No matching resources."
          description="Try another search term or reset the filters."
          action={
            <button
              className="button-secondary"
              onClick={() => {
                setQuery("");
                setSelectedSource("All");
                setSelectedDifficulty("All");
              }}
              data-cursor
            >
              Reset filters
            </button>
          }
        />
      )}

      <section className="section-block explore-topics">
        <SectionHeading
          eyebrow="TOPICS"
          title="Browse by concept."
        />

        <div className="topic-grid">
          {topics.map((topic) => (
            <button
              key={topic.name}
              className="topic-card"
              onClick={() => {
                setQuery(topic.name);
                setSelectedSource("All");
                setSelectedDifficulty("All");
              }}
              data-cursor
            >
              <div className="topic-icon">
                {getTopicIcon(topic.icon)}
              </div>

              <div>
                <strong>
                  {topic.name}
                </strong>

                <p>
                  {topic.description}
                </p>
              </div>

              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================
   SAVED RESOURCES
   ========================================= */

function SavedPage({
  resources: savedResources,
  savedIds,
  onOpenResource,
  toggleSaved,
}: {
  resources: CyberResource[];

  savedIds: string[];

  onOpenResource: (
    resource: CyberResource
  ) => void;

  toggleSaved: (id: string) => void;
}) {
  return (
    <div className="page-container">
      <PageIntro
        eyebrow="YOUR LIBRARY"
        title="Saved resources."
        description="Keep useful resources close at hand. Your saved list stays in this browser."
      />

      {savedResources.length > 0 ? (
        <div className="resource-list">
          {savedResources.map(
            (resource) => (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                saved={savedIds.includes(
                  resource.id
                )}
                onOpen={() =>
                  onOpenResource(resource)
                }
                onToggleSaved={() =>
                  toggleSaved(resource.id)
                }
              />
            )
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark size={20} />}
          title="Your library is empty."
          description="Save resources from Explore and they will appear here."
          action={null}
        />
      )}
    </div>
  );
}

/* =========================================
   CYBER TOOLS
   ========================================= */

function ToolsPage() {
  const [text, setText] =
    useState("");

  const [result, setResult] =
    useState<string | null>(null);

  function inspectUrl() {
    if (!text.trim()) {
      setResult(
        "Enter a URL or domain to inspect its structure."
      );

      return;
    }

    try {
      const input =
        /^https?:\/\//i.test(text)
          ? text
          : `https://${text}`;

      const parsed = new URL(input);

      setResult(
        [
          `Protocol: ${parsed.protocol.replace(
            ":",
            ""
          )}`,
          `Hostname: ${parsed.hostname}`,
          `Port: ${
            parsed.port || "default"
          }`,
          `Path: ${parsed.pathname || "/"}`,
        ].join("\n")
      );
    } catch {
      setResult(
        "That does not appear to be a valid URL or domain."
      );
    }
  }

  return (
    <div className="page-container">
      <PageIntro
        eyebrow="CYBER TOOLS"
        title="Small tools. Useful output."
        description="A deliberately small toolkit that can grow through independent contributions."
      />

      <div className="tool-layout">
        <section className="tool-card">
          <div className="tool-card-header">
            <div className="tool-icon">
              <Globe size={18} />
            </div>

            <div>
              <span className="eyebrow">
                TOOL 01
              </span>

              <h2>
                URL Structure Inspector
              </h2>
            </div>
          </div>

          <p>
            Inspect the basic structure of
            a URL without sending it anywhere.
          </p>

          <div className="tool-input-row">
            <input
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              placeholder="example.com/login"
              onKeyDown={(event) => {
                if (
                  event.key === "Enter"
                ) {
                  inspectUrl();
                }
              }}
            />

            <button
              className="button-primary"
              onClick={inspectUrl}
              data-cursor
            >
              Inspect
              <ArrowUpRight size={14} />
            </button>
          </div>

          {result && (
            <pre className="tool-result">
              {result}
            </pre>
          )}
        </section>

        <aside className="tool-note">
          <Sparkles size={17} />

          <span className="eyebrow">
            LOCAL ONLY
          </span>

          <p>
            This tool processes the URL
            locally in your browser.
            Nothing is sent to a server.
          </p>
        </aside>
      </div>
    </div>
  );
}

/* =========================================
   PROGRESS
   ========================================= */

function ProgressPage({
  completedCount,
  inProgressCount,
  savedCount,
  learningStatus,
  onOpenResource,
}: {
  completedCount: number;
  inProgressCount: number;
  savedCount: number;

  learningStatus: Record<
    string,
    LearningStatus
  >;

  onOpenResource: (
    resource: CyberResource
  ) => void;
}) {
  const total = resources.length;

  const percentage =
    total > 0
      ? Math.round(
          (completedCount / total) * 100
        )
      : 0;

  return (
    <div className="page-container">
      <PageIntro
        eyebrow="PROGRESS"
        title="Your learning trail."
        description="Track your learning status. Your progress is stored locally in this browser."
      />

      <section className="progress-overview">
        <div className="progress-overview-main">
          <span className="eyebrow">
            COMPLETION
          </span>

          <strong>{percentage}%</strong>

          <div className="progress-large-bar">
            <span
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <p>
            {completedCount} of {total}{" "}
            resources completed.
          </p>
        </div>

        <div className="progress-overview-stat">
          <span>IN PROGRESS</span>
          <strong>{inProgressCount}</strong>
        </div>

        <div className="progress-overview-stat">
          <span>SAVED</span>
          <strong>{savedCount}</strong>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="RESOURCE STATUS"
          title="Learning trail."
        />

        <div className="resource-list">
          {resources.map((resource) => {
            const status =
              learningStatus[
                resource.id
              ] ?? "not-started";

            return (
              <div
                key={resource.id}
                className="resource-list-item"
              >
                <div className="resource-list-icon">
                  {status === "completed" ? (
                    <Check size={15} />
                  ) : status === "in-progress" ? (
                    <Clock3 size={15} />
                  ) : (
                    <CircleHelp size={15} />
                  )}
                </div>

                <button
                  className="resource-list-main"
                  onClick={() =>
                    onOpenResource(resource)
                  }
                  data-cursor
                >
                  <strong>
                    {resource.title}
                  </strong>

                  <span>
                    {resource.source} ·{" "}
                    {resource.topic}
                  </span>
                </button>

                <LearningStatusPill
                  status={status}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* =========================================
   SIMPLE PAGE
   ========================================= */

function SimplePage({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="page-container">
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="simple-placeholder">
        <div className="simple-placeholder-icon">
          {icon}
        </div>

        <span className="eyebrow">
          CYBERLM
        </span>

        <h2>
          This area is intentionally
          small for now.
        </h2>

        <p>
          The workspace is built from
          independent pieces so contributors
          can add functionality without
          turning the project into one giant
          component.
        </p>
      </div>
    </div>
  );
}

/* =========================================
   RESOURCE CARD
   ========================================= */

function ResourceCard({
  resource,
  saved,
  onOpen,
  onToggleSaved,
}: {
  resource: CyberResource;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <article className="resource-card">
      <div className="resource-card-top">
        <span className="resource-source">
          {resource.source}
        </span>

        <button
          className="save-button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleSaved();
          }}
          data-cursor
          aria-label={
            saved
              ? "Remove from saved"
              : "Save resource"
          }
        >
          {saved ? (
            <BookmarkCheck size={15} />
          ) : (
            <Bookmark size={15} />
          )}
        </button>
      </div>

      <button
        className="resource-card-content"
        onClick={onOpen}
        data-cursor
      >
        <div className="resource-type">
          {resource.type}
        </div>

        <h3>{resource.title}</h3>

        <p>{resource.description}</p>

        <div className="resource-card-footer">
          <span>
            {resource.difficulty}
          </span>

          <ArrowUpRight size={14} />
        </div>
      </button>
    </article>
  );
}

/* =========================================
   RESOURCE LIST ITEM
   ========================================= */

function ResourceListItem({
  resource,
  saved,
  onOpen,
  onToggleSaved,
}: {
  resource: CyberResource;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <div className="resource-list-item">
      <div className="resource-list-icon">
        {getTopicIcon(
          getTopicIconName(resource.topic)
        )}
      </div>

      <button
        className="resource-list-main"
        onClick={onOpen}
        data-cursor
      >
        <strong>{resource.title}</strong>

        <span>
          {resource.source} ·{" "}
          {resource.type} ·{" "}
          {resource.difficulty}
        </span>
      </button>

      <span className="resource-list-topic">
        {resource.topic}
      </span>

      <button
        className="save-button"
        onClick={onToggleSaved}
        data-cursor
        aria-label={
          saved
            ? "Remove from saved"
            : "Save resource"
        }
      >
        {saved ? (
          <BookmarkCheck size={15} />
        ) : (
          <Bookmark size={15} />
        )}
      </button>

      <button
        className="list-open-button"
        onClick={onOpen}
        data-cursor
        aria-label="Open resource"
      >
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

/* =========================================
   RESOURCE DETAILS MODAL
   ========================================= */

function ResourceModal({
  resource,
  saved,
  status,
  onClose,
  onToggleSaved,
  onUpdateStatus,
  onOpenRelatedResource,
}: {
  resource: CyberResource;
  saved: boolean;
  status: LearningStatus;
  onClose: () => void;
  onToggleSaved: () => void;

  onUpdateStatus: (
    status: LearningStatus
  ) => void;

  onOpenRelatedResource: (
    resource: CyberResource
  ) => void;
}) {
  const relatedResources =
    resources
      .filter(
        (candidate) =>
          candidate.id !== resource.id &&
          (
            candidate.topic ===
              resource.topic ||
            candidate.connections.some(
              (connection) =>
                resource.connections.includes(
                  connection
                )
            ) ||
            resource.connections.includes(
              candidate.title
            )
          )
      )
      .slice(0, 4);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="resource-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-modal-title"
      >
        <button
          className="modal-close"
          onClick={onClose}
          data-cursor
          aria-label="Close resource details"
        >
          <X size={17} />
        </button>

        <div className="modal-learning">
          <span className="eyebrow">
            LEARNING STATUS
          </span>

          <LearningStatusButton
            status={status}
            onChange={onUpdateStatus}
          />
        </div>

        <div className="resource-modal-header">
          <span className="resource-source">
            {resource.source}
          </span>

          <span className="resource-type">
            {resource.type}
          </span>
        </div>

        <h2 id="resource-modal-title">
          {resource.title}
        </h2>

        <p className="resource-modal-description">
          {resource.description}
        </p>

        <div className="resource-detail-meta">
          <div>
            <span>TOPIC</span>
            <strong>
              {resource.topic}
            </strong>
          </div>

          <div>
            <span>LEVEL</span>
            <strong>
              {resource.difficulty}
            </strong>
          </div>

          <div>
            <span>TYPE</span>
            <strong>
              {resource.type}
            </strong>
          </div>
        </div>

        <div className="resource-tags">
          {resource.tags.map((tag) => (
            <span key={tag}>
              {tag}
            </span>
          ))}
        </div>

        {resource.connections.length > 0 && (
          <div className="modal-connections">
            <span className="eyebrow">
              CONNECTED CONCEPTS
            </span>

            <div>
              {resource.connections
                .slice(0, 8)
                .map((connection) => (
                  <span key={connection}>
                    {connection}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className="resource-modal-actions">
          <button
            className="button-primary"
            onClick={() =>
              window.open(
                resource.url,
                "_blank",
                "noopener,noreferrer"
              )
            }
            data-cursor
          >
            Open source
            <ExternalLink size={14} />
          </button>

          <button
            className="button-secondary"
            onClick={onToggleSaved}
            data-cursor
          >
            {saved ? (
              <>
                <BookmarkCheck size={14} />
                Saved
              </>
            ) : (
              <>
                <Bookmark size={14} />
                Save resource
              </>
            )}
          </button>
        </div>

        {relatedResources.length > 0 && (
          <div className="related-resources">
            <span className="eyebrow related-heading">
              RELATED RESOURCES
            </span>

            <div className="related-list">
              {relatedResources.map(
                (related) => (
                  <button
                    key={related.id}
                    className="related-resource"
                    onClick={() =>
                      onOpenRelatedResource(
                        related
                      )
                    }
                    data-cursor
                  >
                    <div>
                      <span>
                        {related.source}
                      </span>

                      <strong>
                        {related.title}
                      </strong>
                    </div>

                    <ArrowUpRight size={14} />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================
   LEARNING STATUS
   ========================================= */

function LearningStatusButton({
  status,
  onChange,
}: {
  status: LearningStatus;

  onChange: (
    status: LearningStatus
  ) => void;
}) {
  const nextStatus: LearningStatus =
    status === "not-started"
      ? "in-progress"
      : status === "in-progress"
      ? "completed"
      : "not-started";

  const label =
    status === "not-started"
      ? "Not started"
      : status === "in-progress"
      ? "In progress"
      : "Completed";

  return (
    <button
      className={`learning-status ${status}`}
      onClick={() =>
        onChange(nextStatus)
      }
      data-cursor
    >
      <span />
      {label}
      <ChevronRight size={13} />
    </button>
  );
}

function LearningStatusPill({
  status,
}: {
  status: LearningStatus;
}) {
  const label =
    status === "not-started"
      ? "Not started"
      : status === "in-progress"
      ? "In progress"
      : "Completed";

  return (
    <span
      className={`learning-status ${status}`}
    >
      <span />
      {label}
    </span>
  );
}

/* =========================================
   SHARED UI
   ========================================= */

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <span className="eyebrow">
        {eyebrow}
      </span>

      <h1>{title}</h1>

      <p>{description}</p>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          {eyebrow}
        </span>

        <h2>{title}</h2>
      </div>

      {action && onAction && (
        <button
          className="section-action"
          onClick={onAction}
          data-cursor
        >
          {action}
          <ArrowUpRight size={14} />
        </button>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action}
    </div>
  );
}

function ActivityIndicator() {
  return (
    <span className="activity-indicator">
      <span />
      LOCAL
    </span>
  );
}

/* =========================================
   ICON HELPERS
   ========================================= */

function getTopicIcon(icon: string) {
  switch (icon) {
    case "globe":
      return <Globe size={17} />;

    case "network":
      return <Network size={17} />;

    case "lock":
      return <Lock size={17} />;

    case "shield":
      return <Shield size={17} />;

    case "layers":
      return <Layers3 size={17} />;

    case "scale":
      return <Sparkles size={17} />;

    default:
      return <Shield size={17} />;
  }
}

function getTopicIconName(topic: string) {
  switch (topic) {
    case "Web Security":
      return "globe";

    case "Networking":
      return "network";

    case "Cryptography":
      return "lock";

    case "Defensive Security":
      return "shield";

    case "Foundations":
      return "layers";

    case "Governance":
      return "scale";

    default:
      return "shield";
  }
}

export default App;