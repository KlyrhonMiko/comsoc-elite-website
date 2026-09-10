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
    [{ role: "President", name: "John Doe", image: "/images/officers/placeholder1.jpeg" }],
    [
      { role: "VP Internal", name: "Juan dela Cruz", image: "/images/officers/placeholder1.jpeg" },
      { role: "VP External", name: "Alice Smith", image: "/images/officers/placeholder1.jpeg" },
    ],
    [
      { role: "Secretary", name: "Jane Doe", image: "/images/officers/placeholder1.jpeg"   },
      { role: "Treasurer", name: "Robert Fox", image: "/images/officers/placeholder1.jpeg" },
      { role: "Auditor", name: "Maria Garcia", image: "/images/officers/placeholder1.jpeg" },
      { role: "PRO", name: "David Chen", image: "/images/officers/placeholder1.jpeg" },
    ],
  ],
};

export const ccsElites: Team = {
  name: "CCS ELITES",
  tiers: [
    [{ role: "President", name: "———", image: "/images/officers/placeholder3.JPG"}],
    [
      { role: "VP Internal", name: "———", image: "/images/officers/placeholder3.JPG"},
      { role: "VP External", name: "———", image: "/images/officers/placeholder3.JPG" },
    ],
    [
      { role: "Secretary", name: "———", image: "/images/officers/placeholder3.JPG" },
      { role: "Treasurer", name: "———", image: "/images/officers/placeholder3.JPG" },
      { role: "Auditor", name: "———", image: "/images/officers/placeholder3.JPG" },
      { role: "PRO", name: "———", image: "/images/officers/placeholder3.JPG" },
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
