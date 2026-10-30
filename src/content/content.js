/* ==========================================================
   CONTENT — every piece of text on the site lives here.
   Edit this file to change wording, add a project, or add a
   certification. Nothing else needs to change.
   ========================================================== */

import {
  Code2, Database, Layers3, Workflow, Terminal,
} from 'lucide-react';

export const profile = {
  name: 'Muhammad Usman',
  monogram: 'MU',
  role: 'Oracle APEX Developer',
  roles: ['Oracle APEX Developer', 'SQL & PL/SQL Developer', 'Database-driven Web Apps'],
  status: 'Open to opportunities',
  location: 'Pakistan',
  tagline:
    'I build practical, data-driven web applications with Oracle APEX, SQL and PL/SQL, turning everyday business workflows into clean and reliable tools.',
  email: 'muhammadusman.tech8@gmail.com',
  github: 'https://github.com/musmantech8',
  linkedin: 'https://www.linkedin.com/in/muhmmad-usman-364108401/',
  // Put your CV at public/cv.pdf (the file name is what this path points to).
  cv: '/cv.pdf',
  siteUrl: 'https://muhammad-usman-portfolio-one.vercel.app',
  photo: {
    webp: '/usman-headshot.webp',
    jpg: '/usman-headshot.jpg',
    width: 640,
    height: 800,
  },
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  heading: ['Curious by nature.', 'Developer by practice.'],
  paragraphs: [
    'I enjoy turning real-world needs into organised, easy-to-use applications. My focus is Oracle APEX, SQL and Oracle PL/SQL, building a strong foundation in database-driven development while completing my degree.',
    'I care about clean data models, clear workflows and interfaces that make everyday work simpler.',
  ],
};

// `value` is the real number shown on the page; `suffix` is appended to it.
export const stats = [
  { value: 5, suffix: '+', label: 'Core technologies' },
  { value: 3, suffix: '', label: 'Applications' },
  { value: 1, suffix: '', label: 'Degree in progress' },
];

export const skills = [
  {
    name: 'Oracle APEX',
    detail: 'Pages, forms, interactive reports and dashboards.',
    icon: Layers3,
    wide: true,
  },
  { name: 'SQL', detail: 'Joins, aggregations and reporting queries.', icon: Database },
  { name: 'Oracle PL/SQL', detail: 'Procedures, functions, triggers and business logic.', icon: Terminal },
  { name: 'HTML & CSS', detail: 'Responsive, accessible interfaces.', icon: Code2 },
  { name: 'JavaScript', detail: 'Dynamic actions and interactive behaviour.', icon: Workflow },
];

// Shown in the scrolling strip under the skills.
export const techStrip = [
  'Oracle APEX', 'SQL', 'Oracle PL/SQL', 'HTML & CSS', 'JavaScript',
  'Oracle Database', 'Database Design', 'Reporting', 'Dashboards',
];

export const processSteps = [
  { step: '01', title: 'Understand', text: 'Learn the real workflow and the data behind it first.' },
  { step: '02', title: 'Model', text: 'Design tables and relationships that keep data reliable.' },
  { step: '03', title: 'Build', text: 'Create pages, reports and PL/SQL logic around user tasks.' },
  { step: '04', title: 'Refine', text: 'Test, polish and improve based on feedback.' },
];

/*
  PROJECTS
  - visual:  which mock UI preview to draw ('employees' | 'dashboard' | 'inventory')
  - demo:    set to a URL to show a "Live demo" button, or leave null to hide it
  - code:    a short, illustrative PL/SQL excerpt for the "code peek" toggle
*/
export const projects = [
  {
    number: '01',
    title: 'Employee Management System',
    type: 'HR web application',
    description:
      'Employee records, departments and salaries with a dashboard, search, filters and CSV export. Oracle schema with triggers, a salary audit trail and a PL/SQL package for raises, transfers and terminations.',
    tags: ['Oracle SQL', 'PL/SQL', 'JavaScript'],
    visual: 'employees',
    repo: 'https://github.com/musmantech8/employee-management-system',
    demo: null,
    code: {
      caption: 'ems_emp_pkg.give_raise — validates input, then updates salary',
      snippet: `PROCEDURE give_raise (
  p_employee_id IN ems_employees.employee_id%TYPE,
  p_percent     IN NUMBER
) IS
BEGIN
  IF p_percent NOT BETWEEN 0 AND 50 THEN
    RAISE_APPLICATION_ERROR(-20004,
      'Raise must be between 0 and 50 percent.');
  END IF;

  assert_exists(p_employee_id);

  UPDATE ems_employees
     SET salary = ROUND(salary * (1 + p_percent / 100), 2)
   WHERE employee_id = p_employee_id;
END give_raise;`,
    },
  },
  {
    number: '02',
    title: 'Project Tracking Dashboard',
    type: 'Dashboard',
    description:
      'Projects, owners, tasks and deadlines with KPI cards, status charts and overdue alerts. A PL/SQL package keeps each project status in sync with its tasks.',
    tags: ['Oracle SQL', 'PL/SQL', 'Charts'],
    visual: 'dashboard',
    repo: 'https://github.com/musmantech8/project-tracking-dashboard',
    demo: null,
    code: {
      caption: 'ptd_project_pkg.project_progress — share of tasks completed',
      snippet: `FUNCTION project_progress (
  p_project_id IN ptd_projects.project_id%TYPE
) RETURN NUMBER IS
  l_total NUMBER;
  l_done  NUMBER;
BEGIN
  SELECT COUNT(*),
         COUNT(CASE WHEN is_done = 'Y' THEN 1 END)
    INTO l_total, l_done
    FROM ptd_tasks
   WHERE project_id = p_project_id;

  RETURN CASE WHEN l_total = 0 THEN 0
              ELSE ROUND(l_done / l_total * 100) END;
END project_progress;`,
    },
  },
  {
    number: '03',
    title: 'Inventory & Stock Manager',
    type: 'Business application',
    description:
      'Products, stock in/out and low-stock alerts. A database trigger keeps quantities correct and blocks negative stock; reports include stock value and a running balance.',
    tags: ['Oracle SQL', 'PL/SQL', 'Database Design'],
    visual: 'inventory',
    repo: 'https://github.com/musmantech8/inventory-stock-manager',
    demo: null,
    code: {
      caption: 'inv_stock_movements_bi — blocks stock going below zero',
      snippet: `CREATE OR REPLACE TRIGGER inv_stock_movements_bi
  BEFORE INSERT ON inv_stock_movements
  FOR EACH ROW
DECLARE
  l_qty inv_products.qty_on_hand%TYPE;
BEGIN
  SELECT qty_on_hand INTO l_qty
    FROM inv_products
   WHERE product_id = :NEW.product_id
     FOR UPDATE;

  IF :NEW.movement_type = 'OUT' AND :NEW.quantity > l_qty THEN
    RAISE_APPLICATION_ERROR(-20201,
      'Not enough stock for this movement.');
  END IF;
END;`,
    },
  },
];

// Added after the first three; the alternating layout follows the order above.
projects.push(
  {
    number: '04',
    title: 'Library Management System',
    type: 'Business application  ·  Oracle APEX with PL/SQL business rules',
    description:
      'Books, members and loans with dashboard charts, self-service sign-up and role-based access. The database enforces a loan limit of five books, blocks borrowing when no copies are left or a member is suspended, and calculates fines automatically.',
    tags: ['Oracle APEX', 'PL/SQL', 'Oracle SQL', 'Authentication'],
    visual: 'inventory',
    repo: 'https://github.com/musmantech8/library-management-system',
    demo: 'https://oracleapex.com/ords/r/company_app/library-management-system/login',
    code: {
      caption: 'lms_loan_pkg.issue_book — checks limits and suspension before lending',
      snippet: `PROCEDURE issue_book (
  p_book_id   IN lms_books.book_id%TYPE,
  p_member_id IN lms_members.member_id%TYPE,
  p_loan_days IN NUMBER DEFAULT c_default_loan_days
) IS
BEGIN
  IF open_loans(p_member_id) >= c_max_open_loans THEN
    RAISE_APPLICATION_ERROR(-20303,
      'Loan limit reached: a member can hold 5 books at a time.');
  END IF;

  -- The trigger LMS_LOANS_BI locks the book and takes one copy off the shelf.
  INSERT INTO lms_loans (book_id, member_id, loan_date, due_date, status)
  VALUES (p_book_id, p_member_id, TRUNC(SYSDATE),
          TRUNC(SYSDATE) + p_loan_days, 'ISSUED');
END issue_book;`,
    },
  },
  {
    number: '05',
    title: 'Helpdesk Ticket Tracker',
    type: 'IT support  ·  Oracle APEX with a controlled ticket workflow',
    description:
      'Raise, assign and resolve IT tickets with SLA due dates based on priority, a strict status flow, a full status history and a dashboard of open, overdue and unassigned work. Normal users see only their own tickets; administrators see everything.',
    tags: ['Oracle APEX', 'PL/SQL', 'Oracle SQL', 'Authentication'],
    visual: 'dashboard',
    repo: 'https://github.com/musmantech8/helpdesk-ticket-tracker',
    demo: 'https://oracleapex.com/ords/r/company_app/helpdesk-ticket-tracker/login',
    code: {
      caption: 'hdk_ticket_pkg.is_valid_transition — the allowed status flow',
      snippet: `FUNCTION is_valid_transition (p_from IN VARCHAR2, p_to IN VARCHAR2)
  RETURN BOOLEAN IS
BEGIN
  IF p_from = 'NEW' THEN
    RETURN p_to IN ('IN_PROGRESS', 'ON_HOLD');
  ELSIF p_from = 'IN_PROGRESS' THEN
    RETURN p_to IN ('ON_HOLD', 'RESOLVED');
  ELSIF p_from = 'ON_HOLD' THEN
    RETURN p_to = 'IN_PROGRESS';
  ELSIF p_from = 'RESOLVED' THEN
    RETURN p_to IN ('CLOSED', 'IN_PROGRESS');
  END IF;
  RETURN FALSE;
END is_valid_transition;`,
    },
  },
);

export const education = [
  {
    label: 'Currently enrolled',
    title: 'Bachelor of Science in Information Technology',
    place: 'Virtual University of Pakistan',
    status: 'In progress',
  },
  {
    label: 'Self-directed',
    title: 'Oracle APEX, SQL & PL/SQL',
    place: 'Hands-on practice through real application builds',
    status: 'Ongoing',
  },
];

// Add certificates here as { title, issuer, year } objects. The slot shows
// a "coming soon" card while this list is empty.
export const certifications = [];

export const contact = {
  heading: 'Let’s build something useful.',
  text: 'I’m open to opportunities, collaborations and conversations about thoughtful applications.',
  // Web3Forms access key. Create one free at https://web3forms.com with your email;
  // the key is emailed to you. Messages from the form are then delivered to your inbox.
  accessKey: '5c0683a7-ffbd-455c-aa98-ddb811b51ca4',
};
