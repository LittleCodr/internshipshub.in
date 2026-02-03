import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "content", "internships");
const ogDir = path.join(projectRoot, "public", "og", "internships");

const nitData = [
  { type: "NIT", name: "NIT Tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu", website: "https://www.nitt.edu", domains: ["Mechanical and manufacturing", "Electrical and electronics", "Computer science and AI", "Civil and infrastructure", "Materials and metallurgy", "Energy and sustainability"], stipendNote: "Expected: limited funded seats via grants; certificate + hostel typical" },
  { type: "NIT", name: "NIT Surathkal", city: "Surathkal", state: "Karnataka", website: "https://www.nitk.ac.in", domains: ["Ocean and coastal engineering", "Computer science and systems", "Power and energy", "Materials and corrosion", "Data science and AI", "Robotics and automation"], stipendNote: "Expected: select sponsored projects may fund; many certificate-only" },
  { type: "NIT", name: "NIT Warangal", city: "Warangal", state: "Telangana", website: "https://www.nitw.ac.in", domains: ["Computer science and AI", "Electronics and VLSI", "Mechanical and design", "Civil and water resources", "Materials and metallurgical", "Energy and environment"], stipendNote: "Expected: limited stipends via grants; certificate + hostel common" },
  { type: "NIT", name: "NIT Rourkela", city: "Rourkela", state: "Odisha", website: "https://www.nitrkl.ac.in", domains: ["Mining and mineral processing", "Metallurgy and materials", "Electronics and signal processing", "Mechanical and industrial design", "Data science and AI", "Energy and sustainability"], stipendNote: "Expected: grants fund few seats; certificate-only otherwise" },
  { type: "NIT", name: "NIT Calicut", city: "Kozhikode", state: "Kerala", website: "https://nitc.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Civil and coastal", "Mechanical and robotics", "Architecture and planning", "Energy and sustainability"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "MNIT Jaipur", city: "Jaipur", state: "Rajasthan", website: "https://www.mnit.ac.in", domains: ["Smart cities and infrastructure", "Electronics and VLSI", "Computer science and AI", "Mechanical design and robotics", "Materials and manufacturing", "Energy and environment"], stipendNote: "Expected: few sponsored stipends; certificate-only common" },
  { type: "NIT", name: "MNNIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", website: "https://www.mnnit.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Mechanical and industrial", "Electrical and power", "Civil and water resources", "Materials and metallurgical"], stipendNote: "Expected: select funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Kurukshetra", city: "Kurukshetra", state: "Haryana", website: "https://www.nitkkr.ac.in", domains: ["Power systems and smart grids", "Computer science and AI", "Mechanical and industrial design", "Civil and transportation", "Electronics and signal processing", "Materials and manufacturing"], stipendNote: "Expected: limited stipends via projects; certificate-only common" },
  { type: "NIT", name: "MANIT Bhopal", city: "Bhopal", state: "Madhya Pradesh", website: "https://www.manit.ac.in", domains: ["Smart infrastructure", "Electronics and VLSI", "Computer science and AI", "Mechanical and thermal", "Materials and additive manufacturing", "Energy and environment"], stipendNote: "Expected: some industry-funded seats; certificate-only otherwise" },
  { type: "NIT", name: "NIT Durgapur", city: "Durgapur", state: "West Bengal", website: "https://nitdgp.ac.in", domains: ["Metallurgy and materials", "Computer science and AI", "Electronics and signal processing", "Mechanical and manufacturing", "Civil and geotechnical", "Energy and environment"], stipendNote: "Expected: limited stipends; certificate + hostel common" },
  { type: "NIT", name: "NIT Jamshedpur", city: "Jamshedpur", state: "Jharkhand", website: "https://www.nitjsr.ac.in", domains: ["Manufacturing and industrial", "Metallurgy and materials", "Computer science and data", "Electronics and communications", "Mechanical design", "Energy and environment"], stipendNote: "Expected: select sponsored seats; certificate-only typical" },
  { type: "NIT", name: "VNIT Nagpur", city: "Nagpur", state: "Maharashtra", website: "https://vnit.ac.in", domains: ["Civil and transportation", "Electrical and power", "Computer science and AI", "Electronics and communications", "Mechanical and design", "Energy and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Srinagar", city: "Srinagar", state: "Jammu and Kashmir", website: "https://www.nitsri.ac.in", domains: ["Civil and water resources", "Electrical and renewable energy", "Computer science and AI", "Mechanical and design", "Metallurgy and materials", "Electronics and communications"], stipendNote: "Expected: few sponsored stipends; certificate-only common" },
  { type: "NIT", name: "NIT Silchar", city: "Silchar", state: "Assam", website: "https://www.nits.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Civil and geotechnical", "Mechanical and manufacturing", "Electrical and power", "Materials and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Patna", city: "Patna", state: "Bihar", website: "https://www.nitp.ac.in", domains: ["Computer science and AI", "Electronics and VLSI", "Civil and smart cities", "Mechanical and design", "Electrical and power", "Materials and environment"], stipendNote: "Expected: limited stipends; certificate-only common" },
  { type: "NIT", name: "NIT Raipur", city: "Raipur", state: "Chhattisgarh", website: "https://www.nitrr.ac.in", domains: ["Metallurgy and materials", "Computer science and data", "Electronics and communications", "Mechanical and thermal", "Civil and water resources", "Energy and sustainability"], stipendNote: "Expected: sponsored seats may fund; certificate-only otherwise" },
  { type: "NIT", name: "NIT Agartala", city: "Agartala", state: "Tripura", website: "https://www.nita.ac.in", domains: ["Electrical and power", "Computer science and AI", "Electronics and communications", "Mechanical and manufacturing", "Civil and earthquake engineering", "Materials and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Arunachal Pradesh", city: "Yupia", state: "Arunachal Pradesh", website: "https://www.nitap.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Civil and water resources", "Mechanical and design", "Energy and environment"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "NIT", name: "NIT Meghalaya", city: "Shillong", state: "Meghalaya", website: "https://www.nitm.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Mechanical and design", "Civil and water resources", "Electrical and power", "Energy and sustainability"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Sikkim", city: "Ravangla", state: "Sikkim", website: "https://nitsikkim.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Civil and geotechnical", "Mechanical and design", "Energy and environment"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "NIT", name: "NIT Goa", city: "Farmagudi", state: "Goa", website: "https://www.nitgoa.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and water resources", "Energy and sustainability"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Puducherry", city: "Karaikal", state: "Puducherry", website: "https://www.nitpy.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and structures", "Energy and environment"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "NIT", name: "NIT Uttarakhand", city: "Srinagar", state: "Uttarakhand", website: "https://www.nituk.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and geotechnical", "Energy and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Manipur", city: "Imphal", state: "Manipur", website: "https://www.nitmanipur.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and water resources", "Energy and environment"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "NIT", name: "NIT Mizoram", city: "Aizawl", state: "Mizoram", website: "https://www.nitmz.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and environment", "Energy and sustainability"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Nagaland", city: "Dimapur", state: "Nagaland", website: "https://www.nitnagaland.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and geotechnical", "Energy and environment"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "NIT", name: "NIT Delhi", city: "New Delhi", state: "Delhi", website: "https://nitdelhi.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Applied sciences and data", "Energy and sustainability"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Andhra Pradesh", city: "Tadepalligudem", state: "Andhra Pradesh", website: "https://www.nitandhra.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and water resources", "Energy and environment"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "NIT", name: "NIT Hamirpur", city: "Hamirpur", state: "Himachal Pradesh", website: "https://nith.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and design", "Civil and water resources", "Energy and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "NIT", name: "NIT Jalandhar", city: "Jalandhar", state: "Punjab", website: "https://www.nitj.ac.in", domains: ["Computer science and AI", "Electronics and communications", "Electrical and power", "Mechanical and industrial", "Civil and environment", "Materials and manufacturing"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "NIT", name: "SVNIT Surat", city: "Surat", state: "Gujarat", website: "https://www.svnit.ac.in", domains: ["Civil and structures", "Electrical and power", "Computer science and AI", "Electronics and communications", "Mechanical and design", "Energy and environment"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" }
];

const iiitData = [
  { type: "IIIT", name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana", website: "https://www.iiit.ac.in", domains: ["AI/ML and data science", "Computer vision and robotics", "Cybersecurity and systems", "Natural language processing", "IoT and edge computing", "Human-computer interaction"], stipendNote: "Expected: limited funded seats via grants/industry; many certificate-only" },
  { type: "IIIT", name: "IIIT Bangalore", city: "Bengaluru", state: "Karnataka", website: "https://www.iiitb.ac.in", domains: ["Data science and AI", "Cybersecurity and systems", "Networks and communications", "Product design and HCI", "Software engineering", "IoT and edge"], stipendNote: "Expected: select industry projects may fund; certificate-only common" },
  { type: "IIIT", name: "IIIT Delhi", city: "New Delhi", state: "Delhi", website: "https://www.iiitd.ac.in", domains: ["AI/ML and data", "Security and privacy", "Computational biology", "HCI and design", "Computer vision", "Systems and networking"], stipendNote: "Expected: limited stipends via sponsored work; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", website: "https://www.iiita.ac.in", domains: ["AI/ML and data", "Computer vision and graphics", "Cybersecurity", "Electronics and signal processing", "Software engineering", "Robotics and automation"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "IIIT", name: "ABV-IIITM Gwalior", city: "Gwalior", state: "Madhya Pradesh", website: "https://www.iiitm.ac.in", domains: ["Information security", "AI/ML and data", "Software engineering", "Embedded systems", "Networks and communications", "Analytics and optimization"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIITDM Jabalpur", city: "Jabalpur", state: "Madhya Pradesh", website: "https://www.iiitdmj.ac.in", domains: ["Product design and manufacturing", "Robotics and automation", "AI/ML and data", "Embedded systems and IoT", "Computer vision", "Sustainable engineering"], stipendNote: "Expected: select sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIITDM Kancheepuram", city: "Chennai", state: "Tamil Nadu", website: "https://www.iiitdm.ac.in", domains: ["Product design and manufacturing", "Robotics and mechatronics", "Embedded systems and IoT", "AI/ML and data", "Communications and signal processing", "Human-centered design"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIITDM Kurnool", city: "Kurnool", state: "Andhra Pradesh", website: "https://www.iiitdmkl.ac.in", domains: ["AI/ML and data", "Embedded systems and IoT", "Robotics and automation", "Product design", "Networks and communications", "Smart manufacturing"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Sri City", city: "Chittoor", state: "Andhra Pradesh", website: "https://www.iiits.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Software engineering", "IoT and systems", "Networks and communications"], stipendNote: "Expected: limited stipends via projects; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Naya Raipur", city: "Naya Raipur", state: "Chhattisgarh", website: "https://www.iiitnr.ac.in", domains: ["AI/ML and data", "Communication systems", "Embedded and IoT", "Computer vision", "Cyber-physical systems", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Guwahati", city: "Guwahati", state: "Assam", website: "https://www.iiitg.ac.in", domains: ["AI/ML and data", "Computer vision", "VLSI and embedded", "Networks and communications", "Cybersecurity", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Kota", city: "Kota", state: "Rajasthan", website: "https://www.iiitkota.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Lucknow", city: "Lucknow", state: "Uttar Pradesh", website: "https://www.iiitl.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Product design and HCI", "Computer vision", "Software engineering", "IoT and systems"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Kottayam", city: "Kottayam", state: "Kerala", website: "https://www.iiitkottayam.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Networks and communications", "Cloud and systems", "Software engineering", "IoT"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Una", city: "Una", state: "Himachal Pradesh", website: "https://www.iiitu.ac.in", domains: ["AI/ML and data", "Computer vision", "Networks and communications", "Cybersecurity", "Embedded systems", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Vadodara", city: "Gandhinagar", state: "Gujarat", website: "https://www.iiitvadodara.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Networks and communications", "Computer vision", "Software engineering", "Embedded systems"] , stipendNote: "Expected: few funded seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu", website: "https://www.iiitt.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Nagpur", city: "Nagpur", state: "Maharashtra", website: "https://www.iiitn.ac.in", domains: ["AI/ML and data", "Computer vision", "Embedded systems", "Networks and communications", "Cybersecurity", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Pune", city: "Pune", state: "Maharashtra", website: "https://www.iiitp.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Ranchi", city: "Ranchi", state: "Jharkhand", website: "https://www.iiitranchi.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Dharwad", city: "Dharwad", state: "Karnataka", website: "https://www.iiitdwd.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Manipur", city: "Imphal", state: "Manipur", website: "https://www.iiitmanipur.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Networks and communications", "Embedded systems", "Computer vision", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Sonepat", city: "Kundli", state: "Haryana", website: "https://www.iiitsonepat.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Bhopal", city: "Bhopal", state: "Madhya Pradesh", website: "https://www.iiitbhopal.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Bhubaneswar", city: "Bhubaneswar", state: "Odisha", website: "https://www.iiit-bh.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Kalyani", city: "Kalyani", state: "West Bengal", website: "https://www.iiitkalyani.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" },
  { type: "IIIT", name: "IIIT Bhagalpur", city: "Bhagalpur", state: "Bihar", website: "https://www.iiitbh.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: limited funded seats; certificate + hostel typical" },
  { type: "IIIT", name: "IIIT Raichur", city: "Raichur", state: "Karnataka", website: "https://www.iiitr.ac.in", domains: ["AI/ML and data", "Cybersecurity", "Computer vision", "Embedded systems", "Networks and communications", "Software engineering"], stipendNote: "Expected: few sponsored seats; certificate-only common" }
];

function typeLabelPlural(type) {
  if (type === "IIT") return "IITs";
  if (type === "NIT") return "NITs";
  return "IIITs";
}

function slugify(name) {
  return (
    name
      .toLowerCase()
      .replace(/[.']/g, "")
      .replace(/\s+/g, "-")
      .replace(/[()]/g, "")
      .replace(/--+/g, "-") + "-summer-internship-2026"
  );
}

function titleCase(text) {
  return text.replace(/\b\w/g, (m) => m.toUpperCase());
}

function svgContent(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${name} Summer Internship 2026</title>
  <desc id="desc">High contrast card for ${name} Summer Internship 2026</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#0b2442" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#bg)" />
  <g fill="#22d3ee">
    <circle cx="1040" cy="120" r="42" opacity="0.14" />
    <circle cx="160" cy="500" r="48" opacity="0.12" />
    <path d="M140 470c120-30 240-10 340 80s240 70 380-50" fill="none" stroke="#22d3ee" stroke-width="3" opacity="0.2" />
  </g>
  <text x="80" y="200" fill="#cbd5e1" font-family="'Segoe UI','Inter',system-ui,-apple-system,sans-serif" font-size="36" font-weight="600" letter-spacing="0.02em">
    internshipsHub.in
  </text>
  <text x="80" y="280" fill="#e2e8f0" font-family="'Segoe UI','Inter',system-ui,-apple-system,sans-serif" font-size="54" font-weight="700" letter-spacing="0.01em">
    ${name}
  </text>
  <text x="80" y="350" fill="#e2e8f0" font-family="'Segoe UI','Inter',system-ui,-apple-system,sans-serif" font-size="44" font-weight="600">
    Summer Internship 2026
  </text>
  <text x="80" y="420" fill="#94a3b8" font-family="'Segoe UI','Inter',system-ui,-apple-system,sans-serif" font-size="24" font-weight="500">
    Domains, timelines, selection, and funding expectations.
  </text>
</svg>`;
}

function bodyContent(inst) {
  const slug = slugify(inst.name);
  const short = inst.name.replace("National Institute of Technology ", "NIT ").replace("Indian Institute of Information Technology ", "IIIT ");
  const domainsList = inst.domains.map((d) => `- ${d}`).join("\n");
  const systemPlural = typeLabelPlural(inst.type);
  const related = `- Explore more guides at the [internships library](/internships/).
- Compare approaches with [IIT Bombay Summer Internship 2026](/internships/iit-bombay-summer-internship-2026/) and [IIT Delhi Summer Internship 2026](/internships/iit-delhi-summer-internship-2026/).`;

  const articleJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${inst.name} Summer Internship 2026`,
      description: `${inst.name} Summer Internship 2026 guide with domains, eligibility, expected dates, selection process, and action plan.`,
      author: { "@type": "Organization", name: "InternshipsHub Editorial" },
      publisher: { "@type": "Organization", name: "internshipshub.in" },
      datePublished: "2026-02-03",
      dateModified: "2026-02-03",
      mainEntityOfPage: `https://internshipshub.in/internships/${slug}`,
      image: `https://internshipshub.in/og/internships/${slug}.svg`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Internships", item: "https://internshipshub.in/internships" },
          { "@type": "ListItem", position: 2, name: inst.name, item: `https://internshipshub.in/internships/${slug}` }
        ]
      },
      mainEntity: {
        "@type": "EducationalOccupationalProgram",
        name: `${inst.name} Summer Internship 2026`,
        provider: { "@type": "CollegeOrUniversity", name: inst.name, url: inst.website },
        programType: "Internship",
        occupationalCategory: ["Engineering", "Research"],
        timeOfDay: "Summer",
        applicationStartDate: "2026-01-25",
        applicationDeadline: "2026-03-05",
        programPrerequisites: "Good CGPA, aligned projects, and faculty interest",
        startDate: "2026-05-15",
        endDate: "2026-07-15"
      }
    },
    null,
    2
  );

  const faqJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Is the ${inst.name} summer internship paid?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only some seats are funded through sponsored projects; many are certificate-only. Confirm stipend directly with your hosting faculty."
          }
        },
        {
          "@type": "Question",
          name: "Can non-home-institute students apply?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Strong CGPA and evidence of fit to the lab's current work are key selection drivers." }
        },
        {
          "@type": "Question",
          name: "Will there be a centralized application portal?",
          acceptedAnswer: {
            "@type": "Answer",
            "text": "Some departments post calls or forms; monitor official pages in February, but do not skip faculty outreach."
          }
        },
        {
          "@type": "Question",
          name: "Are hostels available for visiting interns?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Generally yes, on a paid basis. Apply early to secure rooms during peak summer occupancy."
          }
        },
        {
          "@type": "Question",
          name: "Can I work remotely?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Remote-only is uncommon. Hybrid may be allowed after initial on-campus alignment, subject to faculty approval."
          }
        },
        {
          "@type": "Question",
          name: "What CGPA should I target?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Past selections at peer institutes often considered 7.5-8.0+ (Expected/Indicative), adjusted for project strength and lab fit."
          }
        },
        {
          "@type": "Question",
          name: "Do I need an NOC from my college?",
          acceptedAnswer: { "@type": "Answer", text: "Usually requested after selection for campus access and hostel allotment." }
        },
        {
          "@type": "Question",
          name: "Can the internship extend into a semester project or RA role?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Strong performers are sometimes invited to continue as project staff or extend work into the semester."
          }
        }
      ]
    },
    null,
    2
  );

  return `# ${inst.name} Summer Internship 2026

> Alternate SEO titles (choose your intent):
> - ${inst.name} Summer Internship 2026: Selection Rigor, Acceptance Signals, and SOP Tactics
> - ${inst.name} Paid vs Certificate Internships (2026): Funding Reality, Hostel Steps, and Deadlines
> - ${short} Summer Research 2026: Domains, Faculty Outreach, and Deliverables

## Introduction
${inst.name} attracts summer applicants because its labs blend core engineering with translational work tied to industry and national missions. This playbook focuses on how to win a seat in 2026: where to look, when to outreach, and how to avoid the common mistakes that sink otherwise strong profiles. Any date or stipend notes marked as "Expected / Indicative" mirror recent cycles and help you move early; update your plan when official circulars post.

If you have limited time, prioritize three moves: (1) shortlist labs and write lab-specific pitches; (2) ship one fresh artifact or small reproduction per target lab; (3) prepare logistics (NOC, hostel plan, travel) so you can accept quickly. These three steps alone raise conversion dramatically versus generic CV blasts.

## About the Institute
${inst.name} operates in ${inst.city}, ${inst.state}, giving interns access to regional industries and research ecosystems. The campus hosts active centers spanning ${inst.domains.slice(0, 3).join(", ")} and collaborates with government and industry sponsors. If you are comparing across top public tech institutes, anchor your choices with labs, facilities, and sponsored work rather than brand alone.

Because the institute is embedded in ${inst.city}, interns can tap into nearby industry partners, field sites, and alumni-led startups. This often translates to problem statements with real datasets or hardware constraints rather than purely academic exercises.

## Overview of Summer Internship Programme 2026
Expect a 6–8 week engagement between mid-May and mid-July. Interns onboard with faculty mentors, align on a scoped problem in week one, and work toward a tangible output (prototype, dataset with analysis, or a technical paper draft). Certificates are standard; credit transfer is rare. High performers sometimes continue as project staff or convert the summer project into a semester-long engagement.

Typical intern experience across leading institutes: week 1 for scoping and baselines, week 2–5 for build/experiments with weekly demos, and week 6–8 for polish, documentation, and final presentation. Labs expect self-driven progress logs; come with a milestone plan so your mentor can quickly validate feasibility.

## Internship Domains / Research Areas Offered
${domainsList}

How to pick a domain: align with your prior artifacts and a professor’s active grant. Scan recent publications or lab news; if you cannot find a fresh result in the last 12–18 months, pick a different lab to improve responsiveness.

## Eligibility Criteria
- Degree: B.Tech/B.E./B.S./Dual/M.Tech/M.S students from accredited institutes.
- Year: Priority for 3rd/4th year undergraduates and early postgraduates.
- CGPA: Past selections at peer institutes often start near 7.5–8.0+ (Expected/Indicative); faculty flex for standout portfolios.
- Branches: Open across engineering and sciences; individual labs may set prerequisites.
- Nationality: Primarily Indian students; international applicants may be considered via MoUs.
- Availability: Ability to be on campus through May–July 2026; disclose exam windows early.

Competitive differentiators: a coherent theme across 2–3 projects, reproducible results (plots + code), and concise abstracts in your CV. Listing MOOCs without applied work rarely moves the needle.

## Who Should Apply
Apply if you can show alignment to a specific lab in one paragraph: a recent project or artifact, a clear deliverable for 6–8 weeks, and proof you work independently (clean repos, experiment logs, or hardware evidence). Hardware and systems labs value schematics, measurement logs, or CAD/BOM notes; AI/data labs prefer baselines, error analysis, and reproducibility; design/policy labs appreciate user research or field insights.

Signals that help: quantified outcomes (e.g., latency reductions, accuracy deltas, energy measurements), tidy repos with READMEs, and short Loom or YouTube clips for hardware or UX demos. If you lack prior research, a crisp replication of a lab paper with your own ablation is a strong opener.

## Stipend & Benefits
- **Monthly stipend (Expected/Indicative):** ${inst.stipendNote}. Clarify funding early with your mentor.
- **Accommodation:** Paid hostel rooms are typically offered; apply early because summer capacity tightens quickly.
- **Travel reimbursement:** Generally not provided; select industry or sponsored projects may reimburse partially—confirm per project.

If you need funding, state it transparently in your second email after demonstrating fit. Offer a certificate-only fallback so the professor can still proceed if budgets are tight.

## Duration & Important Dates
| Milestone | Expected window (based on peer ${systemPlural} timelines) | Notes |
| --- | --- | --- |
| Faculty outreach | Late January to mid-February 2026 | Tailor 6–8 mails; cite lab work directly. |
| Centralized calls (if any) | February 2026 | Department pages may host forms; still do faculty outreach. |
| Rolling confirmations | March 2026 | Reply fast with paperwork; delays hurt conversion. |
| Joining | Mid-May 2026 | Coordinate hostel check-in and ID creation. |
| Program end | Mid to late July 2026 | Plan demo/poster and documentation. |

Contingency planning: if your exam calendar slips, propose an adjusted start by a week but keep the end date. Offering a compressed plan with clear milestones shows respect for lab scheduling.

## Selection Process
1. **Shortlist:** Faculty scan CGPA, transcript fit, and artifacts.
2. **Interaction:** Short call or email thread; some assign a 48–72 hour task.
3. **Offer:** Email confirmation plus likely NOC/bonafide requirement.
4. **Onboarding:** Hostel allocation, campus passes, and lab safety in week one.

Interview prep cues: expect fundamentals (DSA for CS labs, circuits for EE, mechanics/thermo for Mech/Civil), a brief walkthrough of your strongest artifact, and a sanity check on the deliverable you propose. Keep answers concise and quantify results.

## How to Apply
1. **Target labs:** Pick 6–8 labs whose current work matches your skills. Read one recent paper per lab.
2. **Assemble materials:** One-page CV, transcript, 150–200 word SOP per lab, and 2–3 artifact links.
3. **Send focused emails:** 150–200 words, referencing a current problem in the lab and your 6–8 week deliverable.
4. **Monitor portals:** If the institute posts a summer form, submit immediately while continuing faculty outreach.
5. **Follow up:** One concise follow-up after a week, adding new evidence (improved plot, refined schematic, or benchmark).

**Week-by-week plan (expected):**
- Week 1: Choose labs, refresh CV/transcript, and reproduce a small result tied to your top choice.
- Week 2: Send tailored outreach with artifact links; prepare a 3–4 slide mini-brief if requested.
- Week 3: Follow up with incremental improvements; return any assigned task within 72 hours.
- Week 4: Draft NOC, plan hostel logistics, and outline weekly milestones to share post-selection.

Quality bar for outreach emails: 150–200 words, a one-line subject with domain + deliverable, a 2–3 line summary of your best artifact, a 1–2 line proposal for the lab’s current problem, and links (not heavy attachments). Avoid PDF CV attachments in the first mail; use lightweight links unless explicitly requested.

## Documents Required
- CV (one page, quantified outcomes).
- Latest transcript with CGPA and core courses.
- SOP tailored to the lab’s current direction.
- ID proof and recent photograph.
- NOC/bonafide (often requested post-offer).
- Artifact pack: code repos, experiments, schematics, or demo videos relevant to the lab.

Preferred formats: shared repos (GitHub), short slide decks (under 5 MB) when requested, and brief video demos (unlisted links) for hardware or UX work. Keep filenames clean and descriptive.

**SOP elements that work:**
- Open with the lab’s current focus and the exact problem slice you can tackle.
- Specify deliverables and metrics (throughput, accuracy, energy measurements, usability findings) for 6–8 weeks.
- Highlight how you operate: experiment tracking, meeting cadence, and how you will unblock yourself.

## Acceptance Rate / Competition Level
Popular AI/data/robotics labs are heavily contested; unsolicited acceptance can fall below 10%. Niche domains (e.g., ${inst.domains[0]}) may be more accessible if you present direct alignment. Funding availability shifts acceptance dynamics—sponsored projects prefer interns who can commit fully on campus.

**Common pitfalls to avoid:**
- Asking for remote-only work without proposing an initial on-campus phase.
- Sending long CVs without a sharp summary of results and metrics.
- Proposing deliverables unrelated to the lab’s current grants.
- Delaying replies after faculty responses; speed signals seriousness.

## Previous Year Insights (2024/2025)
- Faculty-led approvals dominated across ${systemPlural}; centralized calls supplemented, not replaced, outreach.
- Certificates were standard; stipends appeared mainly via industry-funded or grant-backed projects.
- Hybrid options occasionally opened after initial on-campus work.
- Candidates who shared a concrete 6–8 week plan with metrics saw higher response rates than broad interest emails.

Peer signals that helped last year: concise experiment logs, reproducibility (requirements.txt/env files), and willingness to align working hours with lab schedules. Candidates who declared their exam windows early faced fewer mid-project disruptions.

## FAQs
### Is the ${inst.name} summer internship paid?
Only some seats are funded through sponsored projects; many are certificate-only. Confirm stipend directly with your hosting faculty.

### Can non-home-institute students apply?
Yes. Strong CGPA and evidence of fit to the lab’s current work are key selection drivers.

### Will there be a centralized application portal?
Some departments post calls or forms; monitor official pages in February, but do not skip faculty outreach.

### Are hostels available for visiting interns?
Generally yes, on a paid basis. Apply early to secure rooms during peak summer occupancy.

### Can I work remotely?
Remote-only is uncommon. Hybrid may be allowed after initial on-campus alignment, subject to faculty approval.

### What CGPA should I target?
Past selections at peer institutes often considered 7.5–8.0+ (Expected/Indicative), adjusted for project strength and lab fit.

### Do I need an NOC from my college?
Usually requested after selection for campus access and hostel allotment.

### Can the internship extend into a semester project or RA role?
Yes. Strong performers are sometimes invited to continue as project staff or extend work into the semester.

## Final Advice
Lead with precision: cite a lab’s current project, propose a deliverable you can ship in 6–8 weeks, and attach artifacts that prove execution. Be transparent about funding needs but prepared for certificate-only offers. If you secure a slot, lock hostel accommodation early and align on weekly milestones with your mentor.

Keep your emails short, your artifacts sharp, and your timelines realistic. When in doubt, show rather than tell—plots, schematics, and small demos out-convert long prose every time.

## Related Internships
${related}

<script type="application/ld+json">
{\`
${articleJson}
\`}
</script>

<script type="application/ld+json">
{\`
${faqJson}
\`}
</script>`;
}

function frontmatter(inst) {
  const slug = slugify(inst.name);
  const short = titleCase(inst.name.replace("National Institute of Technology ", "NIT ").replace("Indian Institute of Information Technology ", "IIIT "));
  return `---
title: "${inst.name} Summer Internship 2026"
slug: "${slug}"
metaTitle: "${inst.name} Summer Internship 2026 Guide"
metaDescription: "${inst.name} Summer Internship 2026 guide with domains, eligibility, expected dates, selection process, and action plan."
instituteType: "${inst.type}"
year: 2026
description: "${inst.name} Summer Internship 2026 guide covering domains, dates, selection steps, and application strategy."
company: "${inst.name}"
companyLogo: "/og/internships/${slug}.svg"
companyWebsite: "${inst.website}"
companyType: "university"
type: "internship"
role: "Summer Research Intern"
industry: "Higher Education"
employmentType: "INTERN"
workHours: "Full-time summer (approx. 40 hrs/week)"
experienceRequired: "Project evidence or coursework aligned to the chosen lab"
location: "${inst.name}, ${inst.city}"
city: "${inst.city}"
state: "${inst.state}"
country: India
remote: false
hybrid: true
stipend: "${inst.stipendNote}"
stipendCurrency: INR
salaryMin: 0
salaryMax: 0
salaryPeriod: MONTH
paid: false
duration: "6–8 weeks (expected)"
startDate: "2026-05-15"
endDate: "2026-07-15"
deadline: "2026-03-05"
postedAt: "2026-02-03"
publishedAt: "2026-02-03"
validThrough: "2026-03-05"
eligibility: "B.Tech/B.E./Dual/M.Tech/M.S students with good CGPA, lab-aligned projects, and availability in May–July"
education: "B.Tech/B.E./Dual/M.Tech/M.S in engineering or sciences"
skills:
  - "Programming or simulation in the chosen domain"
  - "Data analysis or lab measurement skills"
  - "Technical writing"
  - "Foundational math and physics"
branchesAllowed:
  - "Computer Science"
  - "Electrical"
  - "Mechanical"
  - "Civil"
  - "Chemical"
  - "Materials"
  - "Interdisciplinary"
yearOfStudy: "3rd/4th year UG or 1st year PG"
ageLimit: "No formal limit; typical 18+"
applyLink: "https://rentits.in/blog/${slug}"
applyMethod: external
applicationFee: 0
numberOfOpenings: 0
keywords:
  - "${inst.name} summer internship 2026"
  - "${short} research internship"
  - "${short} SIP 2026"
canonicalUrl: "https://internshipshub.in/internships/${slug}"
index: true
priority: 0.86
author: "InternshipsHub Editorial"
source: "${inst.name} faculty communications and prior cycles"
lastUpdated: "2026-02-03"
---
`;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeInstitute(inst) {
  const slug = slugify(inst.name);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  const svgPath = path.join(ogDir, `${slug}.svg`);

  const fm = frontmatter(inst);
  const body = bodyContent(inst);
  const article = `${fm}\n${body}\n`;

  await ensureDir(contentDir);
  await ensureDir(ogDir);
  await fs.writeFile(mdxPath, article, "utf8");
  await fs.writeFile(svgPath, svgContent(inst.name), "utf8");
}

async function main() {
  const institutes = [...nitData, ...iiitData];
  for (const inst of institutes) {
    await writeInstitute(inst);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
