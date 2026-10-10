export type PracticeCategory =
  | "Web Security"
  | "Networking"
  | "Authentication"
  | "Defensive Security";

export type PracticeDifficulty = "Beginner" | "Intermediate";

export interface PracticeQuestion {
  id: string;
  category: PracticeCategory;
  difficulty: PracticeDifficulty;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  takeaway: string;
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "web-001",
    category: "Web Security",
    difficulty: "Beginner",
    question: "What is the primary purpose of parameterized SQL queries?",
    scenario: "A login form sends a username to a database query.",
    options: [
      "To make database queries run without a network connection",
      "To separate user input from SQL query instructions",
      "To encrypt every value stored in the database",
      "To automatically back up the database",
    ],
    correctAnswer: 1,
    explanation:
      "Parameterized queries keep supplied values separate from SQL syntax, helping prevent user input from changing the meaning of a query.",
    takeaway:
      "Use parameterized queries instead of building SQL by concatenating user input.",
  },
  {
    id: "web-002",
    category: "Web Security",
    difficulty: "Intermediate",
    question:
      "Which vulnerability can occur when an application displays untrusted input as executable browser code?",
    scenario:
      "A comment containing a script is stored and later displayed to other visitors.",
    options: [
      "Cross-site scripting (XSS)",
      "ARP spoofing",
      "Directory traversal",
      "Brute-force authentication",
    ],
    correctAnswer: 0,
    explanation:
      "Cross-site scripting occurs when untrusted content is interpreted as executable script in a user's browser. Stored XSS persists in the application and may affect multiple visitors.",
    takeaway:
      "Context-aware output encoding and safe rendering practices help prevent XSS.",
  },
  {
    id: "net-001",
    category: "Networking",
    difficulty: "Beginner",
    question: "What does DNS normally do?",
    options: [
      "Encrypt all traffic between two computers",
      "Translate domain names into records such as IP addresses",
      "Assign file permissions on a server",
      "Detect every malicious file on a device",
    ],
    correctAnswer: 1,
    explanation:
      "The Domain Name System helps clients locate services by resolving domain names to records, commonly IP addresses.",
    takeaway:
      "DNS resolution helps a device find the destination associated with a domain name.",
  },
  {
    id: "net-002",
    category: "Networking",
    difficulty: "Intermediate",
    question:
      "A network analyst sees many unsolicited connection attempts to different ports on one host. What activity could this indicate?",
    options: [
      "Port scanning",
      "Routine DNS resolution only",
      "Disk defragmentation",
      "Password hashing",
    ],
    correctAnswer: 0,
    explanation:
      "Port scanning probes ports to identify which services may be listening. It can be part of authorised assessment or reconnaissance by an attacker, so context matters.",
    takeaway:
      "Correlate port-scan patterns with asset ownership, timing, and other logs before drawing conclusions.",
  },
  {
    id: "auth-001",
    category: "Authentication",
    difficulty: "Beginner",
    question:
      "Which option adds a second verification factor beyond a password?",
    options: [
      "Using the same password on two websites",
      "Multi-factor authentication (MFA)",
      "Disabling account lockout",
      "Sharing a recovery code with a colleague",
    ],
    correctAnswer: 1,
    explanation:
      "MFA requires evidence from more than one factor category, such as something you know and something you possess.",
    takeaway:
      "Enable MFA, protect recovery methods, and never share one-time codes.",
  },
  {
    id: "auth-002",
    category: "Authentication",
    difficulty: "Intermediate",
    question:
      "Why should passwords be stored using a password-hashing algorithm with a unique salt?",
    options: [
      "So the original password can be displayed to support staff",
      "So every password becomes reversible encryption",
      "To make offline guessing harder and prevent identical passwords from producing identical stored hashes when salts differ",
      "To remove the need for access controls",
    ],
    correctAnswer: 2,
    explanation:
      "Password-hashing algorithms such as Argon2id, scrypt, or bcrypt are designed to make guessing costly. A unique salt prevents precomputed tables and makes identical passwords hash differently.",
    takeaway:
      "Use a modern, purpose-built password-hashing function with a unique salt per password.",
  },
  {
    id: "def-001",
    category: "Defensive Security",
    difficulty: "Beginner",
    question:
      "What is the main benefit of applying security patches promptly?",
    options: [
      "It guarantees that a system can never be compromised",
      "It fixes known vulnerabilities and reduces exposure to known attacks",
      "It removes the need for backups",
      "It makes every application run faster",
    ],
    correctAnswer: 1,
    explanation:
      "Security updates often remediate publicly known weaknesses. Patching reduces risk, although configuration, monitoring, and other controls are still needed.",
    takeaway:
      "Prioritise patches by severity, exposure, exploitability, and the importance of the affected asset.",
  },
  {
    id: "def-002",
    category: "Defensive Security",
    difficulty: "Intermediate",
    question:
      "A workstation suddenly contacts an unfamiliar external host and creates an unusual volume of outbound traffic. What is the best first response for an analyst?",
    options: [
      "Immediately delete all logs from the workstation",
      "Assume it is harmless and ignore it",
      "Validate the alert, review endpoint and network evidence, and follow the incident-response procedure",
      "Publish the workstation's credentials so others can investigate",
    ],
    correctAnswer: 2,
    explanation:
      "Analysts should preserve evidence, validate the alert using available telemetry, and follow the organisation's incident-response process. Isolation may be appropriate when justified by the risk and policy.",
    takeaway:
      "Investigate methodically, preserve evidence, and escalate according to the incident-response plan.",
  },
];