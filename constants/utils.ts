export const breeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Boxer",
  "Dachshund",
  "Siberian Husky",
  "Great Dane",
  "Doberman Pinscher",
  "Australian Shepherd",
  "Shih Tzu",
  "French Bulldog",
  "Chihuahua",
  "Border Collie",
  "Cocker Spaniel",
  "Pomeranian",
  "Boston Terrier",
  "Basset Hound",
  "Akita",
  "Maltese",
  "Cavalier King Charles Spaniel",
  "Pug",
  "Bernese Mountain Dog",
  "Shiba Inu",
  "Alaskan Malamute",
  "Samoyed",
];

export const yangonTownships = [
  "Ahlone",
  "Bahan",
  "Dagon Myothit",
  "Dawbon",
  "Dagon Seikkan",
  "Hlaingthayar",
  "Insein",
  "Kamaryut",
  "Latha",
  "Mayangone",
  "Mingaladon",
  "North Dagon",
  "North Okkalapa",
  "Pazundaung",
  "Sanchaung",
  "Seikgyi",
  "South Dagon",
  "South Okkalapa",
  "Tamwe",
  "Thingangyun",
  "Thwante",
  "Yankin",
];

export const mandalayTownships = [
  "Aungmyethazan",
  "Chanayethazan",
  "Chanmyathazi",
  "Kyaukpadaung",
  "Kyaukse",
  "Madaya",
  "Mahlaing",
  "Maha Aungmye",
  "Meiktila",
  "Mogok",
  "Myingyan",
  "Natogyi",
  "Ngazun",
  "Nyaung-U",
  "Patheingyi",
  "Pyawbwe",
  "Pyigyidagun",
  "Pyinoolwin",
  "Singu",
  "Sintgaing",
  "Tada-U",
  "Taungtha",
  "Thabeikkyin",
  "Thazi",
  "Wundwin",
  "Yamethin",
];

export const filterOptions = (type: string, selectedCity: string) => {
  if (type === "patients") {
    return {
      status: ["picky_eater", "allergy"],
      breed: breeds,
    };
  }
  if (type === "owners") {
    return {
      city: ["Yangon", "Mandalay"],
      township: selectedCity
        ? selectedCity === "Yangon"
          ? yangonTownships
          : mandalayTownships
        : [],
    };
  }
  return {}
};
