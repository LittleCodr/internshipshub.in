import fs from "node:fs";
import path from "node:path";

const internships = [
  { name: "IISc Bangalore", title: "IISc Bangalore Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "university", website: "https://iisc.ac.in", industry: "Advanced science and engineering research" },
  { name: "TIFR", title: "TIFR Summer Internship 2026", city: "Mumbai", state: "Maharashtra", companyType: "government", website: "https://tifr.res.in", industry: "Fundamental science research" },
  { name: "CSIR", title: "CSIR Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "government", website: "https://www.csir.res.in", industry: "Government research and development" },
  { name: "DRDO", title: "DRDO Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "government", website: "https://www.drdo.gov.in", industry: "Defense research" },
  { name: "ICMR", title: "ICMR Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "government", website: "https://www.icmr.nic.in", industry: "Medical research" },
  { name: "BARC", title: "BARC Summer Internship 2026", city: "Mumbai", state: "Maharashtra", companyType: "government", website: "https://www.barc.gov.in", industry: "Nuclear science and engineering" },
  { name: "ISI Kolkata", title: "ISI Kolkata Summer Internship 2026", city: "Kolkata", state: "West Bengal", companyType: "university", website: "https://www.isical.ac.in", industry: "Statistics and mathematics" },
  { name: "IMSc Chennai", title: "IMSc Chennai Summer Internship 2026", city: "Chennai", state: "Tamil Nadu", companyType: "government", website: "https://www.imsc.res.in", industry: "Mathematics and theoretical science" },
  { name: "NCL Pune", title: "NCL Pune Summer Internship 2026", city: "Pune", state: "Maharashtra", companyType: "government", website: "https://www.ncl-india.org", industry: "Chemical sciences" },
  { name: "NPL Delhi", title: "NPL Delhi Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "government", website: "https://www.nplindia.org", industry: "Physical sciences and standards" },
  { name: "Microsoft Research India", title: "Microsoft Research India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://www.microsoft.com/en-us/research/lab/microsoft-research-india/", industry: "AI and computing research" },
  { name: "Google Research India", title: "Google Research India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://research.google", industry: "AI and computing research" },
  { name: "IBM Research India", title: "IBM Research India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://research.ibm.com/labs/india", industry: "AI and computing research" },
  { name: "Adobe Research", title: "Adobe Research Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://research.adobe.com", industry: "AI and digital media research" },
  { name: "Intel Research India", title: "Intel Research India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://www.intel.com/content/www/us/en/research/overview.html", industry: "Computing systems and hardware research" },
  { name: "Samsung R&D India", title: "Samsung R&D India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://research.samsung.com", industry: "Electronics and software research" },
  { name: "Siemens Research India", title: "Siemens Research India Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://www.siemens.com/innovation/en.html", industry: "Industrial technology research" },
  { name: "TCS Research", title: "TCS Research Summer Internship 2026", city: "Pune", state: "Maharashtra", companyType: "mnc", website: "https://www.tcs.com/research", industry: "Applied computing research" },
  { name: "Infosys Research", title: "Infosys Research Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://www.infosys.com", industry: "Technology research" },
  { name: "Wipro Research", title: "Wipro Research Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "mnc", website: "https://www.wipro.com", industry: "Technology research" },
  { name: "IIST Thiruvananthapuram", title: "IIST Thiruvananthapuram Summer Internship 2026", city: "Thiruvananthapuram", state: "Kerala", companyType: "university", website: "https://www.iist.ac.in", industry: "Space and aerospace engineering" },
  { name: "NISER Bhubaneswar", title: "NISER Bhubaneswar Summer Internship 2026", city: "Bhubaneswar", state: "Odisha", companyType: "university", website: "https://www.niser.ac.in", industry: "Science and engineering research" },
  { name: "IACS Kolkata", title: "IACS Kolkata Summer Internship 2026", city: "Kolkata", state: "West Bengal", companyType: "university", website: "https://www.iacs.res.in", industry: "Chemical and physical sciences" },
  { name: "JNCASR", title: "JNCASR Bangalore Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "university", website: "https://www.jncasr.ac.in", industry: "Science and engineering research" },
  { name: "HRI Prayagraj", title: "HRI Prayagraj Summer Internship 2026", city: "Prayagraj", state: "Uttar Pradesh", companyType: "government", website: "https://www.hri.res.in", industry: "Mathematics and physics research" },
  { name: "RRI Bangalore", title: "RRI Bangalore Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "government", website: "https://www.rri.res.in", industry: "Physics and astronomy" },
  { name: "NCBS Bangalore", title: "NCBS Bangalore Summer Internship 2026", city: "Bengaluru", state: "Karnataka", companyType: "government", website: "https://www.ncbs.res.in", industry: "Life sciences research" },
  { name: "THSTI", title: "THSTI Summer Internship 2026", city: "Faridabad", state: "Haryana", companyType: "government", website: "https://thsti.res.in", industry: "Translational health science" },
  { name: "CCMB", title: "CCMB Summer Internship 2026", city: "Hyderabad", state: "Telangana", companyType: "government", website: "https://www.ccmb.res.in", industry: "Cellular and molecular biology" },
  { name: "IGIB", title: "IGIB Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "government", website: "https://www.igib.res.in", industry: "Genomics and integrative biology" },
  { name: "Brookings India", title: "Brookings India Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "ngo", website: "https://www.brookings.edu", industry: "Policy and economics research" },
  { name: "ORF", title: "ORF Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "ngo", website: "https://www.orfonline.org", industry: "Policy and strategic studies" },
  { name: "NCAER", title: "NCAER Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "ngo", website: "https://www.ncaer.org", industry: "Economic research" },
  { name: "CPR", title: "CPR Summer Internship 2026", city: "New Delhi", state: "Delhi", companyType: "ngo", website: "https://cprindia.org", industry: "Public policy research" },
  { name: "Government Research Internships in India", title: "Government Research Internships in India Summer 2026", city: "Remote", state: "India", companyType: "government", website: "https://internshipshub.in", industry: "Government research opportunities", remote: true },
  { name: "Top Research Internships in India for BTech Students", title: "Top Research Internships in India for BTech Students Summer 2026", city: "Remote", state: "India", companyType: "university", website: "https://internshipshub.in", industry: "STEM research opportunities", remote: true },
  { name: "Paid Summer Research Internships in India 2026 for Engineering Students", title: "Paid Summer Research Internships in India 2026 for Engineering Students", city: "Remote", state: "India", companyType: "university", website: "https://internshipshub.in", industry: "STEM research opportunities", remote: true },
  { name: "AI and Machine Learning Research Internships in India", title: "AI & Machine Learning Research Internships in India Summer 2026", city: "Remote", state: "India", companyType: "startup", website: "https://internshipshub.in", industry: "AI and machine learning research", remote: true }
];

const today = "2026-02-11";
const defaultDeadline = "2026-03-20";
const startDate = "2026-05-20";
const endDate = "2026-07-15";

const internshipsDir = path.resolve("content/internships");
fs.mkdirSync(internshipsDir, { recursive: true });

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatYamlValue(value, indent) {
  const pad = " ".repeat(indent);
  return value.map((entry) => `${pad}- "${String(entry).replace(/"/g, '\\"')}"`).join("\n");
}

function toYaml(data) {
  const lines = [];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      lines.push(formatYamlValue(value, 2));
    } else if (typeof value === "boolean" || typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: "${String(value).replace(/"/g, '\\"')}"`);
    }
  }
  return lines.join("\n");
}

function buildFrontmatter(item) {
  const slug = slugify(item.title);
  const applyLink = `https://rentits.in/blog/${slug}`;
  const canonicalUrl = `https://internshipshub.in/internships/${slug}`;
  const location = item.remote ? "Remote, India" : `${item.city}, ${item.state}`;

  const payload = {
    title: item.title,
    slug,
    metaTitle: `${item.title} Guide`,
    metaDescription: `${item.title} with eligibility, dates, how to apply, and selection process.`,
    year: 2026,
    description: `${item.title} guide covering eligibility, deadlines, selection, and preparation tips for 2026 applicants.`,
    company: item.name,
    companyLogo: "",
    companyWebsite: item.website,
    companyType: item.companyType,
    type: "internship",
    role: "Summer Research Intern",
    industry: item.industry,
    employmentType: "INTERN",
    workHours: "Full-time summer (approx. 40 hrs/week)",
    experienceRequired: "Relevant coursework and project evidence aligned to the host lab or team.",
    location,
    city: item.city,
    state: item.state,
    country: "India",
    remote: Boolean(item.remote),
    hybrid: false,
    stipend: "Varies by lab; some paid, some certificate-only",
    stipendCurrency: "INR",
    salaryMin: 0,
    salaryMax: 0,
    salaryPeriod: "MONTH",
    paid: false,
    duration: "6-8 weeks (expected)",
    startDate,
    endDate,
    deadline: defaultDeadline,
    postedAt: today,
    publishedAt: today,
    validThrough: defaultDeadline,
    eligibility: "Open to students with strong academic record, relevant skills, and ability to commit for summer 2026.",
    education: "B.Tech/B.E./B.S./M.Tech/M.S./M.Sc or related fields",
    skills: [
      "Research writing and documentation",
      "Data analysis and visualization",
      "Programming in Python or relevant tools",
      "Literature review",
      "Communication and presentation"
    ],
    branchesAllowed: [
      "Computer Science",
      "Electronics and Communication",
      "Electrical",
      "Mechanical",
      "Physics",
      "Mathematics",
      "Biotechnology",
      "Economics",
      "Interdisciplinary"
    ],
    yearOfStudy: "3rd/4th year UG or PG students",
    ageLimit: "18+",
    applyLink,
    applyMethod: "external",
    applicationFee: 0,
    numberOfOpenings: 0,
    keywords: [
      `${item.title.toLowerCase()}`,
      `${item.name.toLowerCase()} research internship 2026`,
      "how to apply"
    ],
    canonicalUrl,
    index: true,
    priority: 0.66,
    author: "InternshipsHub Editorial",
    source: `${item.name} official communications and prior cycles`,
    lastUpdated: today
  };

  return `---\n${toYaml(payload)}\n---`;
}

function buildBody(item) {
  const slug = slugify(item.title);
  const applyLink = `https://rentits.in/blog/${slug}`;
  const availability = item.remote ? "remotely" : `in ${item.city}`;

  return [
    `# ${item.title}`,
    "",
    `## Overview`,
    `${item.title} is designed for students who want hands-on research experience at ${item.name}. Expect a focused 6-8 week summer project where you align with a mentor, scope a problem, and deliver a measurable outcome.`,
    "",
    `## Eligibility`,
    "- Strong academic record in a relevant discipline",
    "- Evidence of project work, publications, or competition results",
    `- Availability to work ${availability} during May-July 2026`,
    "- Ability to communicate progress through weekly updates",
    "",
    "## Important dates",
    `- Application deadline: ${defaultDeadline}`,
    `- Expected start: ${startDate}`,
    `- Expected end: ${endDate}`,
    "",
    "## How to apply",
    "1. Shortlist a lab or team and align your interests",
    "2. Prepare a one-page pitch plus CV highlighting relevant work",
    "3. Apply through the official portal or email channel noted by the host",
    "4. Follow up respectfully with any supporting artifact or demo",
    "",
    "## Selection process",
    "- Screening based on alignment, CGPA, and evidence of skills",
    "- Possible technical interview or statement of purpose",
    "- Mentor discussion on scope, deliverables, and availability",
    "",
    "## Tips to stand out",
    `- Build a small artifact or analysis tailored to ${item.name} labs or teams`,
    "- Keep repos clean with READMEs, results, and reproducibility steps",
    "- Ask for recommendations early and highlight concrete outcomes",
    "",
    "## FAQ",
    "**Is the internship paid?** Stipend varies by host; many research roles are certificate-first with limited funded seats.",
    `**Can non-local students apply?** Yes, provided you can be available ${availability} and arrange institute approvals.`,
    "",
    `Ready to apply? Use the Apply button on this page or open ${applyLink}.`
  ].join("\n");
}

for (const item of internships) {
  const slug = slugify(item.title);
  const filePath = path.join(internshipsDir, `${slug}.mdx`);
  const frontmatter = buildFrontmatter(item);
  const body = buildBody(item);
  const content = `${frontmatter}\n\n${body}\n`;
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created ${filePath}`);
}
