export type Officer = {
  role: string;
  name: string;
  image?: string;
};

export type Team = {
  name: string;
  tiers: Officer[][];
};

export const comsocOfficers: Team = {
  name: "COMSOC Officers",
  tiers: [
    [{ role: "President", name: "John Doe" }],
    [
      { role: "VP Internal", name: "Juan dela Cruz" },
      { role: "VP External", name: "Alice Smith" },
    ],
    [
      { role: "Secretary", name: "Jane Doe" },
      { role: "Treasurer", name: "Robert Fox" },
      { role: "Auditor", name: "Maria Garcia" },
      { role: "PRO", name: "David Chen" },
    ],
  ],
};

export const ccsElites: Team = {
  name: "CCS ELITES",
  tiers: [
    [{ role: "President", name: "———" }],
    [
      { role: "VP Internal", name: "———" },
      { role: "VP External", name: "———" },
    ],
    [
      { role: "Secretary", name: "———" },
      { role: "Treasurer", name: "———" },
      { role: "Auditor", name: "———" },
      { role: "PRO", name: "———" },
    ],
  ],
};

export const facultyAdviser = {
  role: "Faculty Adviser",
  name: "Dr. Robert Smith",
  department: "College of Computer Studies",
};

export const orgContact = {
  label: "Official Page",
  url: "https://www.facebook.com/PLPCOMSOC",
  handle: "@college_of_computer_studies",
};
