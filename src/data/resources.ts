export type ResourceSource =
  | "OWASP"
  | "PortSwigger"
  | "TryHackMe"
  | "NIST";

export type ResourceDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type ResourceType =
  | "Guide"
  | "Learning Path"
  | "Lab"
  | "Framework"
  | "Reference";

export interface CyberResource {
  id: string;
  title: string;
  description: string;

  source: ResourceSource;
  type: ResourceType;
  difficulty: ResourceDifficulty;

  topic: string;
  tags: string[];

  url: string;

  featured?: boolean;

  connections: string[];
}

export const resources: CyberResource[] = [
  {
    id: "owasp-top-10-2025",
    title: "OWASP Top 10: 2025",
    description:
      "A current awareness document covering the most critical security risks to web applications.",
    source: "OWASP",
    type: "Reference",
    difficulty: "Beginner",
    topic: "Web Security",
    tags: [
      "web security",
      "application security",
      "vulnerabilities",
      "OWASP",
    ],
    url: "https://top10.owasp.org/",
    featured: true,
    connections: [
      "Broken Access Control",
      "Security Misconfiguration",
      "Injection",
      "Authentication",
      "Logging",
    ],
  },

  {
    id: "portswigger-web-security-academy",
    title: "Web Security Academy",
    description:
      "Free interactive web-security training with learning materials, practical labs, and progress tracking.",
    source: "PortSwigger",
    type: "Learning Path",
    difficulty: "Beginner",
    topic: "Web Security",
    tags: [
      "web security",
      "Burp Suite",
      "pentesting",
      "labs",
    ],
    url: "https://portswigger.net/web-security",
    featured: true,
    connections: [
      "SQL Injection",
      "XSS",
      "Authentication",
      "CSRF",
      "API Testing",
    ],
  },

  {
    id: "portswigger-sql-injection",
    title: "SQL Injection",
    description:
      "Learn how SQL injection vulnerabilities arise, how they can be tested in controlled labs, and how to prevent them.",
    source: "PortSwigger",
    type: "Guide",
    difficulty: "Intermediate",
    topic: "Web Security",
    tags: [
      "SQL injection",
      "SQLi",
      "databases",
      "web security",
    ],
    url: "https://portswigger.net/web-security/sql-injection",
    featured: true,
    connections: [
      "Databases",
      "Authentication",
      "Input Validation",
      "Web Security",
    ],
  },

  {
    id: "portswigger-xss",
    title: "Cross-Site Scripting",
    description:
      "Understand reflected, stored, and DOM-based XSS and explore how these vulnerabilities can be prevented.",
    source: "PortSwigger",
    type: "Guide",
    difficulty: "Intermediate",
    topic: "Web Security",
    tags: [
      "XSS",
      "cross-site scripting",
      "JavaScript",
      "DOM",
    ],
    url: "https://portswigger.net/web-security/cross-site-scripting",
    featured: true,
    connections: [
      "JavaScript",
      "DOM",
      "Input Validation",
      "Web Security",
    ],
  },

  {
    id: "portswigger-authentication",
    title: "Authentication Vulnerabilities",
    description:
      "Study common weaknesses in authentication mechanisms, including password-based authentication and flawed verification logic.",
    source: "PortSwigger",
    type: "Guide",
    difficulty: "Intermediate",
    topic: "Web Security",
    tags: [
      "authentication",
      "access control",
      "passwords",
      "web security",
    ],
    url: "https://portswigger.net/web-security/authentication",
    connections: [
      "Authorization",
      "Session Management",
      "Brute Force",
      "Web Security",
    ],
  },

  {
    id: "portswigger-labs",
    title: "PortSwigger Web Security Labs",
    description:
      "Hands-on deliberately vulnerable web applications designed to let you practise web-security concepts safely.",
    source: "PortSwigger",
    type: "Lab",
    difficulty: "Intermediate",
    topic: "Practice",
    tags: [
      "labs",
      "Burp Suite",
      "web hacking",
      "practice",
    ],
    url: "https://portswigger.net/web-security/all-labs",
    connections: [
      "SQL Injection",
      "XSS",
      "Authentication",
      "SSRF",
      "API Testing",
    ],
  },

  {
    id: "tryhackme-cyber-security-101",
    title: "Cyber Security 101",
    description:
      "A beginner-friendly path covering networking, cryptography, operating systems, offensive security, defensive security, and web hacking.",
    source: "TryHackMe",
    type: "Learning Path",
    difficulty: "Beginner",
    topic: "Foundations",
    tags: [
      "networking",
      "cryptography",
      "Linux",
      "Windows",
      "web security",
    ],
    url: "https://tryhackme.com/path/outline/cybersecurity101",
    featured: true,
    connections: [
      "Networking",
      "Cryptography",
      "Linux",
      "Web Security",
      "Defensive Security",
    ],
  },

  {
    id: "tryhackme-pre-security",
    title: "Pre Security",
    description:
      "A current beginner path covering computer basics, coding, networking, web fundamentals, and introductory security concepts.",
    source: "TryHackMe",
    type: "Learning Path",
    difficulty: "Beginner",
    topic: "Foundations",
    tags: [
      "beginner",
      "networking",
      "web",
      "computer basics",
    ],
    url: "https://tryhackme.com/path/outline/presecurity",
    connections: [
      "Networking",
      "Web Fundamentals",
      "Operating Systems",
      "Cybersecurity Basics",
    ],
  },

  {
    id: "tryhackme-web-hacking",
    title: "Web Hacking Fundamentals",
    description:
      "Hands-on material covering how websites work, HTTP, Burp Suite, APIs, and common web vulnerabilities.",
    source: "TryHackMe",
    type: "Learning Path",
    difficulty: "Intermediate",
    topic: "Web Security",
    tags: [
      "HTTP",
      "Burp Suite",
      "web hacking",
      "APIs",
    ],
    url: "https://tryhackme.com/module/web-hacking-1",
    featured: true,
    connections: [
      "HTTP",
      "Burp Suite",
      "APIs",
      "Web Vulnerabilities",
    ],
  },

  {
    id: "tryhackme-intro-web-hacking",
    title: "Introduction to Web Hacking",
    description:
      "A practical introduction to identifying, exploiting, and preventing common web application vulnerabilities.",
    source: "TryHackMe",
    type: "Learning Path",
    difficulty: "Intermediate",
    topic: "Web Security",
    tags: [
      "web hacking",
      "vulnerabilities",
      "pentesting",
      "web applications",
    ],
    url: "https://tryhackme.com/module/intro-to-web-hacking",
    connections: [
      "Web Applications",
      "SQL Injection",
      "XSS",
      "Authentication",
    ],
  },

  {
    id: "nist-csf-2",
    title: "NIST Cybersecurity Framework 2.0",
    description:
      "A framework for helping organizations understand, assess, prioritize, and communicate cybersecurity risk.",
    source: "NIST",
    type: "Framework",
    difficulty: "Intermediate",
    topic: "Defensive Security",
    tags: [
      "NIST",
      "risk management",
      "governance",
      "security framework",
    ],
    url: "https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20",
    featured: true,
    connections: [
      "Risk Management",
      "Governance",
      "Incident Response",
      "Security Operations",
    ],
  },

  {
    id: "nist-frameworks",
    title: "NIST Cybersecurity Frameworks",
    description:
      "Explore NIST's collection of cybersecurity and risk-management frameworks, including CSF, RMF, Privacy, and NICE.",
    source: "NIST",
    type: "Reference",
    difficulty: "Intermediate",
    topic: "Governance",
    tags: [
      "NIST",
      "frameworks",
      "risk",
      "governance",
    ],
    url: "https://www.nist.gov/frameworks",
    connections: [
      "Risk Management",
      "Cybersecurity Framework",
      "Privacy",
      "Workforce",
    ],
  },
];

export const topics = [
  {
    name: "Web Security",
    description: "Applications, APIs and browser-side vulnerabilities.",
    icon: "globe",
  },
  {
    name: "Networking",
    description: "Protocols, traffic, infrastructure and network defence.",
    icon: "network",
  },
  {
    name: "Cryptography",
    description: "Hashing, encryption, keys and secure communication.",
    icon: "lock",
  },
  {
    name: "Defensive Security",
    description: "Detection, response, monitoring and security operations.",
    icon: "shield",
  },
  {
    name: "Foundations",
    description: "Core concepts for building cybersecurity knowledge.",
    icon: "layers",
  },
  {
    name: "Governance",
    description: "Risk, frameworks, standards and security strategy.",
    icon: "scale",
  },
];

export const sources: ResourceSource[] = [
  "OWASP",
  "PortSwigger",
  "TryHackMe",
  "NIST",
];