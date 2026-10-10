import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Globe,
  Lock,
  Network,
  Shield,
} from "lucide-react";

import {
  resources,
  type CyberResource,
} from "../data/resources";

interface KnowledgeNode {
  id: string;
  name: string;
  description: string;
  x: string;
  y: string;
  connections: string[];
  topic: string;
  keywords: string[];
  main?: boolean;
}

const nodes: KnowledgeNode[] = [
  {
    id: "web",
    name: "Web",
    description:
      "Applications, browsers and web attack surfaces.",
    x: "19%",
    y: "38%",
    connections: ["http", "xss", "sql"],
    topic: "Web Security",
    keywords: [
      "website",
      "browser",
      "web application",
      "attack surface",
    ],
  },
  {
    id: "http",
    name: "HTTP",
    description:
      "Requests, responses, methods and web communication.",
    x: "50%",
    y: "20%",
    connections: ["web", "apis", "auth"],
    topic: "Web Security",
    keywords: [
      "request",
      "response",
      "headers",
      "methods",
      "status codes",
    ],
    main: true,
  },
  {
    id: "apis",
    name: "APIs",
    description:
      "Interfaces that allow applications and services to communicate.",
    x: "81%",
    y: "38%",
    connections: ["http", "auth"],
    topic: "Web Security",
    keywords: [
      "api security",
      "endpoints",
      "rest",
      "authorization",
      "access control",
    ],
  },
  {
    id: "xss",
    name: "XSS",
    description:
      "Client-side injection through unsafe handling of browser content.",
    x: "28%",
    y: "72%",
    connections: ["web", "sql"],
    topic: "Web Security",
    keywords: [
      "cross-site scripting",
      "javascript",
      "injection",
      "browser",
      "input validation",
    ],
  },
  {
    id: "sql",
    name: "SQL",
    description:
      "Databases, queries and the security risks around input handling.",
    x: "52%",
    y: "76%",
    connections: ["web", "xss", "auth"],
    topic: "Web Security",
    keywords: [
      "sql injection",
      "database",
      "queries",
      "input validation",
      "parameterized queries",
    ],
    main: true,
  },
  {
    id: "auth",
    name: "Auth",
    description:
      "Authentication, sessions, identity and access.",
    x: "78%",
    y: "72%",
    connections: ["http", "apis", "sql"],
    topic: "Web Security",
    keywords: [
      "authentication",
      "authorization",
      "sessions",
      "identity",
      "access control",
      "passwords",
    ],
  },
];

const lines = [
  ["web", "http"],
  ["http", "apis"],
  ["web", "xss"],
  ["http", "sql"],
  ["apis", "auth"],
  ["xss", "sql"],
  ["sql", "auth"],
];

interface KnowledgeMapProps {
  onOpenResource?: (
    resource: CyberResource
  ) => void;
}

function KnowledgeMap({
  onOpenResource,
}: KnowledgeMapProps) {
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const selectedNode = nodes.find(
    (node) => node.id === selectedId
  );

  const connectedIds = useMemo(() => {
    if (!selectedNode) {
      return new Set<string>();
    }

    return new Set([
      selectedNode.id,
      ...selectedNode.connections,
    ]);
  }, [selectedNode]);

  const relatedResources = useMemo(() => {
    if (!selectedNode) {
      return [];
    }

    const nodeName =
      selectedNode.name.toLowerCase();

    const terms = [
      nodeName,
      ...selectedNode.keywords.map(
        (keyword) => keyword.toLowerCase()
      ),
    ];

    return resources
      .map((resource) => {
        const title =
          resource.title.toLowerCase();

        const description =
          resource.description.toLowerCase();

        const tags = resource.tags.map(
          (tag) => tag.toLowerCase()
        );

        const topic =
          resource.topic.toLowerCase();

        let score = 0;

        // Give the strongest weight to direct title matches.
        if (title.includes(nodeName)) {
          score += 5;
        }

        // Direct tag matches are also highly relevant.
        if (
          tags.some((tag) => tag === nodeName)
        ) {
          score += 5;
        }

        // Match additional concept-specific keywords.
        for (const term of terms.slice(1)) {
          if (title.includes(term)) {
            score += 3;
          }

          if (
            tags.some((tag) =>
              tag.includes(term)
            )
          ) {
            score += 3;
          }

          if (description.includes(term)) {
            score += 1;
          }
        }

        // Use the broad topic only as a fallback.
        if (
          score === 0 &&
          topic ===
            selectedNode.topic.toLowerCase()
        ) {
          score = 1;
        }

        return {
          resource,
          score,
        };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ resource }) => resource);
  }, [selectedNode]);

  // Press Escape to close the selected concept.
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  function handleNodeClick(nodeId: string) {
    setSelectedId((current) =>
      current === nodeId ? null : nodeId
    );
  }

  function nodeIsVisible(nodeId: string) {
    if (!selectedNode) {
      return true;
    }

    return connectedIds.has(nodeId);
  }

  function lineIsVisible(
    from: string,
    to: string
  ) {
    if (!selectedNode) {
      return true;
    }

    return (
      selectedNode.id === from ||
      selectedNode.id === to
    );
  }

  return (
    <section
      className="knowledge-map"
      aria-label="Interactive cybersecurity knowledge map"
    >
      <div className="map-title">
        <span>KNOWLEDGE MAP</span>

        <small aria-live="polite">
          {selectedNode
            ? `Exploring / ${selectedNode.name}`
            : "Select a concept"}
        </small>
      </div>

      <svg
        className="map-lines"
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {lines.map(([from, to]) => {
          const fromNode = nodes.find(
            (node) => node.id === from
          );

          const toNode = nodes.find(
            (node) => node.id === to
          );

          if (!fromNode || !toNode) {
            return null;
          }

          const fromX = parseFloat(fromNode.x);
          const fromY = parseFloat(fromNode.y);
          const toX = parseFloat(toNode.x);
          const toY = parseFloat(toNode.y);

          const visible = lineIsVisible(
            from,
            to
          );

          return (
            <line
              key={`${from}-${to}`}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              className={
                visible
                  ? "map-line-visible"
                  : "map-line-muted"
              }
            />
          );
        })}
      </svg>

      <div
        className={
          selectedNode
            ? "map-center selected"
            : "map-center"
        }
      >
        <span>CYBERLM</span>

        <strong>
          {selectedNode
            ? selectedNode.name
            : "CONNECT"}
        </strong>
      </div>

      {nodes.map((node) => {
        const visible = nodeIsVisible(node.id);
        const selected = selectedId === node.id;

        return (
          <button
            type="button"
            key={node.id}
            className={[
              "map-node",
              node.main ? "main" : "",
              selected ? "selected" : "",
              !visible ? "muted" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              left: node.x,
              top: node.y,
            }}
            onClick={() =>
              handleNodeClick(node.id)
            }
            data-cursor
            aria-pressed={selected}
            aria-label={`Explore ${node.name} concept`}
          >
            <span />
            {node.name}
          </button>
        );
      })}

      {selectedNode && (
        <div className="map-detail">
          <button
            type="button"
            className="map-detail-close"
            aria-label="Close concept details"
            onClick={() => setSelectedId(null)}
            data-cursor
          >
            ×
          </button>

          <div className="map-detail-icon">
            {getNodeIcon(selectedNode.name)}
          </div>

          <span className="map-detail-label">
            CONCEPT
          </span>

          <h3>{selectedNode.name}</h3>

          <p>{selectedNode.description}</p>

          <div className="map-detail-connections">
            <span>CONNECTED TO</span>

            <div>
              {selectedNode.connections.map(
                (connectionId) => {
                  const connection = nodes.find(
                    (node) =>
                      node.id === connectionId
                  );

                  if (!connection) {
                    return null;
                  }

                  return (
                    <button
                      type="button"
                      key={connection.id}
                      aria-label={`Explore ${connection.name} concept`}
                      aria-pressed={
                        selectedId === connection.id
                      }
                      onClick={() =>
                        setSelectedId(
                          connection.id
                        )
                      }
                      data-cursor
                    >
                      {connection.name}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {relatedResources.length > 0 && (
            <div className="map-resources">
              <span>RELATED RESOURCES</span>

              {relatedResources.map(
                (resource) => (
                  <button
                    type="button"
                    key={resource.id}
                    aria-label={`Open resource: ${resource.title}`}
                    onClick={() =>
                      onOpenResource?.(resource)
                    }
                    data-cursor
                  >
                    <span>{resource.source}</span>

                    <strong>
                      {resource.title}
                    </strong>

                    <ArrowUpRight size={12} />
                  </button>
                )
              )}
            </div>
          )}

          {relatedResources.length === 0 && (
            <p className="map-empty">
              No matching resources found for
              this concept yet.
            </p>
          )}
        </div>
      )}

      {!selectedNode && (
        <div className="map-footer">
          <span>06 concepts</span>
          <span>07 connections</span>
          <span>click a node</span>
        </div>
      )}
    </section>
  );
}

function getNodeIcon(name: string) {
  if (name === "Web" || name === "XSS") {
    return <Globe size={17} />;
  }

  if (name === "HTTP" || name === "APIs") {
    return <Network size={17} />;
  }

  if (name === "Auth") {
    return <Shield size={17} />;
  }

  return <Lock size={17} />;
}

export default KnowledgeMap;