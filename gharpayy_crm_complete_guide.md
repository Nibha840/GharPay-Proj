# GharPayy CRM — Complete Interview & Concept Guide

> **From Absolute Beginner to Advanced** — Every concept explained step-by-step.

---

## Table of Contents

1. [What is a CRM?](#1-what-is-a-crm)
2. [Project Overview — GharPayy](#2-project-overview--gharpayy)
3. [Tech Stack Explained](#3-tech-stack-explained)
4. [React Fundamentals Used in This Project](#4-react-fundamentals)
5. [Component-by-Component Deep Dive](#5-component-deep-dive)
6. [State Management with Context API](#6-state-management-with-context-api)
7. [Drag & Drop — PipelineBoard](#7-drag--drop--pipelineboard)
8. [Regex & Text Parsing — Smart Input](#8-regex--text-parsing--smart-input)
9. [Interview Questions & Answers](#9-interview-questions--answers)
10. [Common Beginner Mistakes](#10-common-beginner-mistakes)

---

## 1. What is a CRM?

### Simple Analogy
Imagine you run a **property business**. Every day, 50 people call asking about houses. You write each person's name, phone number, and what house they want on a sticky note. After a week, you have 350 sticky notes — total chaos!

A **CRM (Customer Relationship Management)** system is like a **digital notebook** that:
- **Stores** all customer info in one place
- **Tracks** where each customer is in the buying process
- **Reminds** you to follow up
- **Shows** you which salesperson is performing best

### Technical Definition
> A CRM is software that manages a company's interactions with current and potential customers. It uses data analysis to improve business relationships, focusing on customer retention and driving sales growth.

### Key CRM Terms (used in GharPayy)

| Term | Simple Meaning | Example |
|------|---------------|---------|
| **Lead** | A potential customer who showed interest | "Rahul called asking about 2BHK in Koramangala" |
| **Pipeline** | The stages a lead goes through | New → Contacted → Visit Scheduled → Booked |
| **Agent** | A salesperson who handles leads | "Priya handles 15 leads this month" |
| **Conversion** | When a lead becomes a paying customer | Rahul books the 2BHK — CONVERTED! |
| **Source** | Where the lead came from | Website, WhatsApp, Phone call, Social media |

### Summary
- CRM = Digital system to track customers
- Lead = Potential customer
- Pipeline = Journey of a lead from "new" to "booked"
- Goal = Convert maximum leads into customers

---

## 2. Project Overview — GharPayy

**GharPayy** is a **property CRM** designed for real estate businesses. It helps track people who enquire about renting/buying properties.

### System Architecture

```
┌─────────────────┐       API Calls        ┌──────────────────┐       Queries       ┌──────────────┐
│   FRONTEND      │  ←─── REST API ───→    │    BACKEND       │  ←──────────────→   │   DATABASE   │
│  React + Vite   │                        │  Node + Express  │                     │   MongoDB    │
│  TailwindCSS    │                        │                  │                     │              │
│  shadcn/ui      │                        │  Controllers     │                     │  Leads       │
│                 │                        │  Services        │                     │  Agents      │
│  Port: 5173     │                        │  Routes          │                     │  Visits      │
└─────────────────┘                        └──────────────────┘                     └──────────────┘
```

**What does each layer do?**

| Layer | What it does | Real-life analogy |
|-------|------------|-------------------|
| **Frontend** | What the user sees and clicks (buttons, forms, tables) | The counter at a bank where you interact |
| **Backend** | Processes requests, applies business logic | The bank staff behind the counter doing the actual work |
| **Database** | Stores all data permanently | The bank vault where all records are kept |
| **REST API** | The "language" frontend and backend use to talk | The intercom system between counter and back office |

### The Sales Pipeline

```
NEW → CONTACTED → REQUIREMENT_COLLECTED → PROPERTY_SUGGESTED → VISIT_SCHEDULED → VISIT_COMPLETED → BOOKED
                                                                                                     ↘ LOST
```

**Each stage explained:**

| Stage | What happens | Example |
|-------|-------------|---------|
| **New** | Lead just arrived, nobody contacted them yet | Rahul filled a form on the website |
| **Contacted** | Agent called/messaged the lead | Agent Priya called Rahul |
| **Requirement** | Agent understood what the lead wants | Rahul wants 2BHK, ₹15K budget, Koramangala |
| **Suggested** | Agent suggested matching properties | "Here are 3 properties matching your needs" |
| **Visit Scheduled** | Property visit date is fixed | "Visit on Saturday 2 PM at Green Residency" |
| **Visit Done** | Lead visited the property | Rahul liked the flat |
| **Booked** | Lead confirmed and paid! ✅ | Rahul signed the agreement |
| **Lost** | Lead is no longer interested ❌ | Rahul found a better deal elsewhere |

### Summary
- GharPayy = Property CRM for managing leads
- Full-stack: React frontend + Node.js backend + MongoDB database
- 8-stage pipeline tracks each lead's journey

---

## 3. Tech Stack Explained

### Frontend Technologies

#### React
**Simple analogy:** Think of a website as made of LEGO blocks. Each block is a **component**. React lets you build websites by snapping together small, reusable blocks.

**What is it?** A JavaScript library for building user interfaces. Instead of writing one giant HTML file, you write small pieces (components) like `StatCard`, `LeadCard`, `PipelineBoard`.

**Why use it?**
- **Reusable components** — Build a card once, use it 100 times
- **Fast updates** — Only changes what's needed (Virtual DOM)
- **Huge community** — Lots of libraries, tutorials, help available

#### Vite
**Simple analogy:** When you write code on your computer, you need a "translator" to convert it into something the browser understands. Vite is a super-fast translator.

**What is it?** A build tool that:
- Starts your development server in milliseconds
- Instantly shows code changes (Hot Module Replacement)
- Bundles your code for production

#### TailwindCSS
**Simple analogy:** Instead of writing separate CSS files, you add tiny styling labels directly to your HTML. Like labelling a box: "color-red", "size-large", "border-round".

**Example from the codebase:**
```jsx
// Instead of writing CSS separately:
className="text-2xl font-bold tracking-tight text-slate-900"
```
This means:
- `text-2xl` → Text size is 2x large
- `font-bold` → Bold text
- `tracking-tight` → Letters are close together
- `text-slate-900` → Very dark grey color

#### shadcn/ui
**What is it?** A collection of pre-built, beautiful UI components (Card, Table, Button, Dialog). Think of it as a "furniture catalog" — you pick ready-made furniture instead of building from scratch.

**Used in GharPayy:** `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Table`, `TableRow`, etc.

### Backend Technologies

#### Node.js + Express.js
- **Node.js** = Lets you run JavaScript on the server (not just in the browser)
- **Express.js** = A framework ON TOP of Node.js that makes building APIs easy (like Rails for Ruby or Flask for Python)

#### MongoDB
**Simple analogy:** A filing cabinet where each drawer (collection) holds folders (documents) with information. Unlike SQL databases, you don't need to decide the folder structure beforehand — it's flexible.

- **Collection** = A group of similar things (like a table in SQL). Example: `leads`, `agents`, `visits`
- **Document** = One record (like a row in SQL). Example: one lead's info `{ name: "Rahul", phone: "9876543210" }`

### Summary
- React = Build UI with reusable components
- Vite = Fast development server & bundler
- TailwindCSS = Styling with utility classes directly in HTML
- shadcn/ui = Pre-built beautiful UI components
- Node.js + Express = Backend server & API
- MongoDB = Flexible NoSQL database

---

## 4. React Fundamentals Used in This Project

### 4.1 Components
**What?** A component is a **reusable piece of UI**. Think of it like a cookie cutter — one shape, many cookies.

**Two types in this project:**

```jsx
// FUNCTIONAL COMPONENT (the modern way — used everywhere in GharPayy)
const StatCard = ({ title, value }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
```

> [!IMPORTANT]
> GharPayy uses ONLY functional components. Class components are the older style. Interviewers will ask about the difference!

### 4.2 Props (Properties)
**Simple analogy:** Props are like **arguments you pass to a function**. When someone asks you to make a birthday card, they tell you the name and age — those are "props."

```jsx
// PARENT passes props
<StatCard title="Total Leads" value={42} icon={Users} variant="primary" />

// CHILD receives props
const StatCard = ({ title, value, icon: Icon, variant = "default" }) => {
  // title = "Total Leads"
  // value = 42
  // icon is renamed to Icon (capital I — because React components must be uppercase)
  // variant = "primary" (or "default" if not provided)
};
```

**Key points:**
- Props flow **ONE WAY**: parent → child (like water flowing downhill)
- Props are **read-only**: the child CANNOT change them
- `variant = "default"` is a **default prop** — used if parent doesn't provide one

### 4.3 State (`useState`)
**Simple analogy:** If props are instructions given TO you, state is your **personal notepad** — something you track yourself and can change.

```jsx
const [search, setSearch] = useState("");
//      ↑            ↑                ↑
//  current value   function to      initial value
//                  update it         (empty string)
```

**From the codebase — [AddLead.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/pages/AddLead.jsx):**
```jsx
const [form, setForm] = useState({ name: '', phone: '', source: 'website', notes: '' });
const [submitting, setSubmitting] = useState(false);
const [smartInput, setSmartInput] = useState('');
const [parsedExtras, setParsedExtras] = useState({ budget: '', location: '' });
```

**Why so many states?**
| State | What it tracks | Why needed |
|-------|---------------|------------|
| `form` | Name, phone, source, notes | Core form data the user fills |
| `submitting` | Is the form being submitted right now? | To disable the button and show "Creating..." |
| `smartInput` | Raw text the user pasted | To keep the textarea's value |
| `parsedExtras` | Auto-detected budget & location | Extracted from smart input, shown separately |

### 4.4 `useEffect` — Side Effects
**Simple analogy:** `useEffect` is like setting an alarm. You say: "When I wake up (component loads), do these things."

```jsx
// From Leads.jsx
useEffect(() => {
  fetchLeads();   // Go get all leads from the server
  fetchAgents();  // Go get all agents from the server
}, []);           // [] means "only run this ONCE, when the page first loads"
```

**The `[]` empty array is crucial:**
- `[]` → Run ONCE when component appears
- `[search]` → Run every time `search` changes
- No array → Run on EVERY re-render (usually a mistake!)

### 4.5 `useMemo` — Performance Optimization
**Simple analogy:** Imagine you calculate a hard math problem. Instead of recalculating it every time someone asks, you write the answer on paper and just read it. That's `useMemo`.

```jsx
// From PipelineBoard.jsx
const leadsByStage = useMemo(() => {
  const map = new Map();
  PIPELINE_STAGES.forEach(s => map.set(s.key, []));
  (leads || []).forEach(l => {
    const arr = map.get(l.status);
    if (arr) arr.push(l);
  });
  return map;
}, [leads]);  // Only recalculate when "leads" changes
```

**What this does:**
1. Creates a Map (like a dictionary) with stage names as keys
2. Groups each lead into its correct stage
3. Only recalculates when `leads` data changes

### 4.6 `useCallback` — Memoizing Functions
**Simple analogy:** Every time a component re-renders, it creates new copies of all functions inside it. `useCallback` says "don't create a new copy; reuse the old one."

```jsx
// From CrmContext.jsx
const fetchLeads = useCallback(async () => {
  try {
    const res = await api.getLeads();
    setLeads(res.data || []);
  } catch (err) {
    console.error("Error fetching leads:", err);
  }
}, []);  // [] = this function's logic never changes
```

### 4.7 `useNavigate` — Routing
**What?** React apps are **Single Page Applications (SPA)** — there's only ONE HTML page. `useNavigate` lets you "move" between pages WITHOUT reloading.

```jsx
const navigate = useNavigate();

navigate('/leads');        // Go to leads page
navigate('/leads/new');    // Go to add lead page
navigate(-1);              // Go BACK (like pressing browser back button)
navigate(`/leads/${id}`);  // Go to specific lead's detail page
```

### Summary
| Hook | Purpose | Analogy |
|------|---------|---------|
| `useState` | Track changing data | Your personal notepad |
| `useEffect` | Do something on load/change | Setting an alarm |
| `useMemo` | Cache expensive calculations | Writing answer on paper |
| `useCallback` | Cache function references | Keeping same recipe card |
| `useContext` | Share data across components | Office bulletin board |
| `useNavigate` | Move between pages | Walking between rooms |

---

## 5. Component-by-Component Deep Dive

### 5.1 StatCard — [StatCard.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/components/dashboard/StatCard.jsx)

**Purpose:** A small card that shows ONE metric (like "Total Leads: 42").

**The VARIANTS pattern:**
```jsx
const VARIANTS = {
  default: { card: "bg-white border-slate-200", icon: "bg-slate-100 text-slate-600" },
  primary: { card: "bg-white border-blue-100",  icon: "bg-blue-50 text-blue-600" },
  accent:  { card: "bg-white border-teal-100",  icon: "bg-teal-50 text-teal-600" },
  warning: { card: "bg-white border-amber-100", icon: "bg-amber-50 text-amber-600" },
};
```

**Why use a VARIANTS object?**
- Instead of writing 4 `if-else` statements, you use a **lookup table**
- This is a **design pattern** called **configuration-driven styling**
- Easy to add new variants — just add another key

**The `??` operator (Nullish Coalescing):**
```jsx
const styles = VARIANTS[variant] ?? VARIANTS.default;
```
- If `VARIANTS[variant]` is `null` or `undefined`, use `VARIANTS.default`
- Different from `||` — the `||` treats `0`, `""`, `false` as falsy too

**Conditional rendering:**
```jsx
{Icon ? (
  <div><Icon className="h-4 w-4" /></div>
) : null}
```
- If `Icon` exists → show it
- If `Icon` doesn't exist → show nothing (`null`)
- This is the **ternary operator**: `condition ? trueResult : falseResult`

**Key points for interviews:**
- ✅ The component is **pure** — same props always produce same output
- ✅ Uses **default props** (`variant = "default"`)
- ✅ Uses **prop renaming** (`icon: Icon` — renamed to uppercase for JSX)

---

### 5.2 AddLead — [AddLead.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/pages/AddLead.jsx)

**Purpose:** A form page to add new leads with a **Smart Input** feature that auto-parses pasted text.

**Key concepts:**

#### Controlled Components
```jsx
<input
  value={form.name}                                    // Value comes FROM state
  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}  // Updates state on typing
/>
```

**Simple analogy:** A "controlled" input is like a remote-controlled car. The React state holds the steering wheel. The input box just shows what state tells it to show.

**Why controlled?**
- React is the "single source of truth"
- You can validate, transform, or block input changes
- Easy to clear or reset the form

#### The Spread Operator `...f`
```jsx
setForm(f => ({ ...f, name: e.target.value }))
```
- `...f` copies ALL existing form fields
- Then `name: e.target.value` OVERRIDES just the name field
- Without `...f`, you'd lose phone, source, and notes!

**Note:** This is called **updating state immutably** — you never modify the old state directly, you create a new copy.

#### Form Submission Flow
```
User clicks "Create Lead"
        ↓
handleSubmit(e) fires
        ↓
e.preventDefault()  ← Stops page from reloading (default HTML behavior)
        ↓
Validates: name & phone must exist
        ↓
Sets submitting = true  ← Disables button, shows "Creating..."
        ↓
Appends budget & location to notes
        ↓
Calls addLead() from Context  ← API call to backend
        ↓
On success: toast("Lead created") + navigate to /leads
On failure: toast("Failed")
        ↓
Sets submitting = false  ← Re-enables button
```

#### Toast Notifications
```jsx
import { toast } from 'sonner';
toast.success('Lead created successfully');
toast.error('Failed to create lead');
```
- `sonner` is a notification library
- Shows a brief popup message at the corner of the screen
- `success` = green, `error` = red

---

### 5.3 PipelineBoard — [PipelineBoard.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/components/leads/PipelineBoard.jsx)

**Purpose:** A **Kanban-style board** (like Trello) where leads appear as cards in columns. You can drag leads between stages.

**Kanban board analogy:** Imagine a whiteboard with 8 columns (New, Contacted, etc.). Each sticky note is a lead. You physically pick up a note and move it to the next column. That's exactly what this does digitally!

**Drag & Drop explained in detail → See [Section 7](#7-drag--drop--pipelineboard)**

**The `Map` data structure:**
```jsx
const map = new Map();
PIPELINE_STAGES.forEach(s => map.set(s.key, []));
```
- A `Map` is like a dictionary: key → value
- Here: `"NEW" → []`, `"CONTACTED" → []`, etc.
- Then each lead gets pushed into its stage's array

**Why Map instead of plain object?**
- Map preserves insertion order (objects don't guarantee it)
- Map has better performance for frequent additions/deletions
- Map's `.get()` and `.set()` are clearer than `obj[key]`

---

### 5.4 Leads Page — [Leads.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/pages/Leads.jsx)

**Purpose:** A page that shows ALL leads in a **table** with search and filter capabilities.

**The Filtering Logic:**
```jsx
const filtered = leads.filter((l) => {
  // Search filter — check if name or phone matches
  if (search && !name.includes(search.toLowerCase()) && !phone.includes(search))
    return false;

  // Stage filter — check pipeline stage
  if (stageFilter !== "ALL" && l.status !== stageFilter) return false;

  // Source filter — check where lead came from
  if (sourceFilter !== "ALL" && l.source !== sourceFilter) return false;

  return true;  // Passes all filters!
});
```

**How `.filter()` works (step by step):**
1. Takes an array: `[lead1, lead2, lead3, ...]`
2. Runs a function on each item
3. If function returns `true` → keep the item
4. If function returns `false` → remove the item
5. Returns a NEW array with only the kept items

**Real example:**
```
leads = [
  { name: "Rahul", status: "NEW", source: "website" },
  { name: "Priya", status: "CONTACTED", source: "phone" },
  { name: "Amit",  status: "NEW", source: "whatsapp" }
]

stageFilter = "NEW", sourceFilter = "ALL", search = ""

Result: [Rahul, Amit]  ← Only "NEW" leads pass
```

**Populated vs Non-populated agent:**
```jsx
const agent = typeof lead.assignedAgent === "object" ? lead.assignedAgent : null;
```
- In MongoDB, `assignedAgent` might be:
  - An **ObjectId** (just a string like `"65a1b2c3..."`) — not populated
  - A full **object** like `{ name: "Priya", _id: "65a1b2c3..." }` — populated (joined)
- This check ensures we only try to read `.name` when we have the full object

---

## 6. State Management with Context API

### The Problem Context Solves

**Without Context (Prop Drilling):**
```
App → Dashboard → StatsRow → StatCard  (pass leads 3 levels down!)
App → LeadsPage → LeadTable → LeadRow  (pass leads 3 levels down again!)
```

Every component in the middle has to pass props it doesn't even use! This is called **prop drilling** — messy and hard to maintain.

**With Context:**
```
CrmProvider (holds ALL data)
    ↓ (any child can access directly)
    ├── StatCard     → useCrm() → gets leads
    ├── PipelineBoard → useCrm() → gets leads, updateStatus
    ├── AddLead      → useCrm() → gets addLead
    └── Leads        → useCrm() → gets leads, fetchLeads
```

### How [CrmContext.jsx](file:///c:/Users/pr057/OneDrive/Desktop/crm-Gh/pg-lead-hub-main/src/context/CrmContext.jsx) Works

**Step 1 — Create a Context:**
```jsx
const CrmContext = createContext();
```
Think of this as creating an empty **bulletin board** in your office.

**Step 2 — Create a Provider (fills the board):**
```jsx
export const CrmProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  // ... more state ...
  return (
    <CrmContext.Provider value={{ leads, fetchLeads, addLead, ... }}>
      {children}
    </CrmContext.Provider>
  );
};
```
The Provider is like the **office manager** who pinnes information on the bulletin board. `value` is everything that's shared.

**Step 3 — Create a custom hook:**
```jsx
export const useCrm = () => useContext(CrmContext);
```
This is a shortcut. Instead of writing `useContext(CrmContext)` everywhere, components just call `useCrm()`.

**Step 4 — Use it in any component:**
```jsx
const { leads, addLead } = useCrm();
```
Any component under `<CrmProvider>` can grab data like reaching for info on the bulletin board.

### Data Flow Diagram
```
User clicks "Create Lead"
        ↓
AddLead component calls addLead(formData)
        ↓
CrmContext.addLead() runs:
  1. Sends POST request to backend API
  2. Backend saves to MongoDB
  3. Backend returns the new lead object
  4. setLeads(prev => [newLead, ...prev])  ← adds to front of array
        ↓
All components using useCrm() automatically re-render
        ↓
Leads page shows the new lead! PipelineBoard shows it in "NEW" column!
```

### Summary
- Context = Shared state accessible by any component
- Provider = Wrapper that supplies the shared state
- Custom hook (`useCrm`) = Shortcut to access the context
- Avoids **prop drilling** — no need to pass data through every level

---

## 7. Drag & Drop — PipelineBoard

### How HTML5 Drag & Drop Works

**Real-life analogy:** Imagine you're playing a card game. You pick up a card (dragStart), move it over a pile (dragOver), and put it down (drop).

**Three key events:**

| Event | When it fires | What happens in code |
|-------|-------------|---------------------|
| `onDragStart` | You pick up a card | Store the lead's ID: `e.dataTransfer.setData('leadId', id)` |
| `onDragOver` | You hover over a column | `e.preventDefault()` — tells browser "dropping is allowed here" |
| `onDrop` | You release the card | Read the ID, update the lead's status |

**The code flow:**

```jsx
// 1. LeadCard (not shown but implied) sets drag data:
<div draggable onDragStart={e => e.dataTransfer.setData('leadId', lead._id)}>

// 2. PipelineBoard column allows dropping:
onDragOver={e => {
  e.preventDefault();          // CRUCIAL — without this, drop won't work!
  setDragOverStage(stage.key); // Highlight the column (visual feedback)
}}

// 3. When dropped:
const handleDrop = (e, status) => {
  e.preventDefault();
  const leadId = e.dataTransfer.getData('leadId');  // Read which lead was dragged
  if (leadId) updateStatus(leadId, status);          // Update in backend + state
  setDragOverStage(null);                            // Remove highlight
};
```

> [!IMPORTANT]
> `e.preventDefault()` in `onDragOver` is **MANDATORY**. By default, browsers do NOT allow dropping. This is the #1 beginner mistake with drag-and-drop!

**Visual feedback pattern:**
```jsx
className={isDragOver
  ? 'bg-blue-50 ring-2 ring-blue-200'   // Highlighted when dragging over
  : 'bg-slate-50 ring-1 ring-slate-200' // Normal state
}
```

### Summary
- Drag & Drop uses 3 events: `dragStart`, `dragOver`, `drop`
- `dataTransfer` carries data between drag and drop
- `preventDefault()` on `dragOver` is mandatory
- Visual feedback (highlighting) improves UX

---

## 8. Regex & Text Parsing — Smart Input

### What is Regex?
**Simple analogy:** Regex (Regular Expression) is like a **search pattern**. If you tell someone "find all words that start with 'R'" — that's a regex! But regex can be much more powerful.

### Phone Number Regex Breakdown

```
/\b(?:\+91[\s-]?)?([5-9]\d{9})\b/
```

Let's break it character by character:

| Part | Meaning | Example match |
|------|---------|---------------|
| `\b` | Word boundary (edge of a word) | Prevents matching inside `123456789012` |
| `(?:...)` | Non-capturing group | Groups without saving |
| `\+91` | Literal `+91` (India country code) | `+91` |
| `[\s-]?` | Optional space or dash | `+91 ` or `+91-` |
| `?` (after the group) | The whole `+91` part is optional | Works with or without +91 |
| `(...)` | Capturing group — saves this part | This is what we extract |
| `[5-9]` | First digit must be 5, 6, 7, 8, or 9 | Indian mobile numbers start with these |
| `\d{9}` | Exactly 9 more digits | `876543210` |
| `\b` | Word boundary again | Prevents partial matches |

**Example matches:**
- ✅ `9876543210` → captures `9876543210`
- ✅ `+91 9876543210` → captures `9876543210`
- ✅ `+91-5554443210` → captures `5554443210`
- ❌ `1234567890` → rejected (starts with 1, not 5-9)
- ❌ `12345678901234` → rejected (word boundary prevents partial match)

### Budget Regex Breakdown

```
/(?:₹\s*)?(\d[\d,]*\.?\d*)\s*(lakhs?|lacs?|l|crores?|cr|k)?\b/gi
```

| Part | Meaning |
|------|---------|
| `(?:₹\s*)?` | Optional ₹ symbol with spaces |
| `(\d[\d,]*\.?\d*)` | Number with optional commas and decimal |
| `\s*` | Optional spaces |
| `(lakhs?\|lacs?\|l\|crores?\|cr\|k)?` | Optional suffix (lakh, lac, crore, k) |
| `gi` | `g` = find all matches, `i` = case-insensitive |

**Suffix conversion:**
```jsx
if (suffix.startsWith('l')) value = num * 100000;     // 5L = 5,00,000
else if (suffix.startsWith('cr')) value = num * 10000000;  // 2Cr = 2,00,00,000
else if (suffix === 'k') value = num * 1000;            // 50K = 50,000
```

### The Position-Based Parsing Strategy

```
Input: "Rahul Sharma 9876543210 2BHK Koramangala 1200000"
         ↑ BEFORE phone ↑    ↑ phone ↑     ↑ AFTER phone ↑

Step 1: Find phone number → "9876543210"
Step 2: Split text at phone position
        Before: "Rahul Sharma"      → NAME
        After:  "2BHK Koramangala 1200000" → search for budget & location
Step 3: Extract budget from after → "1200000"
Step 4: Remaining words after → "2BHK Koramangala" → LOCATION
```

### Summary
- Regex = Pattern matching for text
- Phone regex validates Indian mobile numbers (5-9 start, 10 digits)
- Budget regex handles ₹ symbol, commas, and suffixes (L, Cr, K)
- Position-based parsing: words before phone = name, words after = location

---

## 9. Interview Questions & Answers

### React & Component Design

**Q1: What is the difference between `props` and `state`?**

| Aspect | Props | State |
|--------|-------|-------|
| Who controls it? | Parent component | Component itself |
| Can it change? | Read-only (immutable) | Yes, via setter function |
| Direction | Parent → Child | Internal to component |
| Re-render trigger? | Yes, when parent passes new props | Yes, when setState is called |

> **Example from code:** In `StatCard`, `title` and `value` are **props** (parent decides). In `AddLead`, `form` is **state** (AddLead tracks it internally).

---

**Q2: What are controlled components? Why use them?**

**Answer:** A controlled component has its value managed by React state, not by the DOM.

```jsx
// CONTROLLED (React state is the boss)
<input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

// UNCONTROLLED (DOM is the boss — uses ref)
<input ref={inputRef} />
```

**Why controlled?**
1. Single source of truth — React always knows the current value
2. Easy validation (can block invalid characters in `onChange`)
3. Easy to reset form: `setForm({ name: '', phone: '' })`
4. Can conditionally transform input

---

**Q3: Explain `useEffect` with examples from this codebase.**

**Answer:**
```jsx
// From Leads.jsx — runs ONCE on mount
useEffect(() => {
  fetchLeads();
  fetchAgents();
}, []);
```
- The empty `[]` means "run only when the component first appears"
- Used for **data fetching** — go get leads from the API when page loads
- Without `[]`, it would run on every render = infinite API calls!

---

**Q4: What is Context API and when would you use it instead of Redux?**

**Answer:**
- Context API is React's built-in solution for sharing state across components without prop drilling.
- **Use Context when:** State is simple (few values, few updates), small app, don't need middleware
- **Use Redux when:** Complex state logic, many state updates, need middleware (logging, async), large team, need devtools and time-travel debugging

> **In GharPayy:** Context is perfect because the state is straightforward (leads array, agents array, few functions).

---

**Q5: What is `useMemo`? When should you NOT use it?**

**Answer:** `useMemo` caches the result of an expensive calculation and only recalculates when dependencies change.

**DON'T use it when:**
- The calculation is simple (adding two numbers)
- The component rarely re-renders
- The cost of memoization itself outweighs the savings

**DO use it when:**
- Filtering/sorting large arrays (like grouping 500 leads by stage)
- Creating derived data from props/state

---

### Architecture & Design

**Q6: Explain the architecture of this CRM system.**

**Answer:**
> "GharPayy follows a **3-tier architecture**:
> 1. **Presentation Layer** (React frontend) — Shows UI, handles user interactions
> 2. **Business Logic Layer** (Express backend) — Processes requests, validates data, applies rules
> 3. **Data Access Layer** (MongoDB) — Stores and retrieves data
>
> The frontend communicates with the backend via **RESTful APIs**. The frontend uses **React Context** for state management, avoiding prop drilling. The component structure separates **pages** (full views like `Leads`, `AddLead`) from **components** (reusable pieces like `StatCard`, `PipelineBoard`)."

---

**Q7: What is a REST API? Name the HTTP methods used.**

| Method | Purpose | Example in GharPayy |
|--------|---------|-------------------|
| `GET` | Retrieve data | `GET /api/leads` — fetch all leads |
| `POST` | Create new data | `POST /api/leads` — create a new lead |
| `PUT/PATCH` | Update existing data | `PATCH /api/leads/:id/status` — update lead status |
| `DELETE` | Remove data | `DELETE /api/leads/:id` — delete a lead |

---

### Practical / Scenario Questions

**Q8: A user reports that dragging a lead to a new stage doesn't update. How would you debug?**

**Answer (Step by step):**
1. **Check browser console** for errors (network tab, console errors)
2. **Verify `onDragOver` has `e.preventDefault()`** — without it, drop doesn't work
3. **Check `dataTransfer.getData('leadId')`** — is the ID being passed correctly?
4. **Check network tab** — is the API call being made? What's the response?
5. **Check `updateStatus` function** — is setLeads correctly updating the state?
6. **Check MongoDB** — did the status actually change in the database?

---

**Q9: How would you add a "filter by date range" feature to the Leads page?**

**Answer:**
1. Add two new state variables: `startDate` and `endDate`
2. Add two date input fields in the filter bar
3. Update the `filtered` logic:
   ```jsx
   if (startDate && new Date(l.createdAt) < new Date(startDate)) return false;
   if (endDate && new Date(l.createdAt) > new Date(endDate)) return false;
   ```
4. Consider debouncing the filter for performance with large datasets

---

**Q10: How does the `parseLeadInput` function handle edge cases?**

**Answer:**
- **No input:** Returns empty fields (checks `!text.trim()`)
- **No phone number:** Treats entire text as before-phone = name
- **Budget looks like a phone:** Skips numbers with 10+ digits (`rawNum.length >= 10`)
- **Very small numbers:** Skips numbers < 1000 unless they have suffixes (L, Cr, K)
- **Multiple budgets:** Takes the first valid one (breaks after finding)

---

## 10. Common Beginner Mistakes

### Mistake 1: Forgetting `e.preventDefault()`
```jsx
// ❌ WRONG — form submits and page reloads!
const handleSubmit = async (e) => {
  const res = await addLead(form);
};

// ✅ CORRECT
const handleSubmit = async (e) => {
  e.preventDefault();  // Stop default HTML form behavior
  const res = await addLead(form);
};
```

### Mistake 2: Mutating State Directly
```jsx
// ❌ WRONG — React won't detect the change, no re-render!
form.name = "Rahul";

// ✅ CORRECT — Create a NEW object
setForm(f => ({ ...f, name: "Rahul" }));
```
**Why?** React compares old state vs new state by **reference** (memory address). If you change the same object, the address hasn't changed, so React thinks nothing happened.

### Mistake 3: Missing `key` Prop in Lists
```jsx
// ❌ WARNING in console
{leads.map(lead => <LeadCard lead={lead} />)}

// ✅ CORRECT
{leads.map(lead => <LeadCard key={lead._id} lead={lead} />)}
```
**Why?** React uses `key` to efficiently track which items changed, were added, or removed. Without it, React re-renders the ENTIRE list even if only one item changed.

### Mistake 4: `useEffect` Without Dependencies
```jsx
// ❌ INFINITE LOOP — runs on every render, fetches data,
//    which updates state, which causes re-render, which runs useEffect again...
useEffect(() => {
  fetchLeads();
});

// ✅ CORRECT — runs only once
useEffect(() => {
  fetchLeads();
}, []);
```

### Mistake 5: Not Handling Loading/Error States
```jsx
// ❌ BASIC — no feedback to user
const res = await api.createLead(form);

// ✅ PRODUCTION-READY
setSubmitting(true);
try {
  const res = await api.createLead(form);
  toast.success('Created!');
} catch (err) {
  toast.error('Failed!');
} finally {
  setSubmitting(false);
}
```

### Mistake 6: Using `||` Instead of `??`
```jsx
// ❌ PROBLEM — if value is 0, it shows "N/A" (0 is falsy!)
const count = value || "N/A";  // 0 || "N/A" = "N/A" 😱

// ✅ CORRECT — ?? only checks null/undefined
const count = value ?? "N/A";  // 0 ?? "N/A" = 0 ✅
```

---

> [!TIP]
> **For interviews**, focus on explaining WHY you made a choice, not just WHAT you did. Interviewers love hearing: "I used Context API instead of Redux because the state is simple and the app is small — adding Redux would be over-engineering."

---

> **You now have a complete understanding of:**
> - What a CRM is and how GharPayy works
> - Every React concept used in the codebase
> - How each component works line by line
> - State management with Context API
> - Drag & Drop internals
> - Regex parsing for smart input
> - 10 interview Q&As with practical scenarios
> - 6 common mistakes and how to avoid them
