// Recommendations from LinkedIn, quoted exactly as written. Each links to the recommendations on
// Huzaifa's profile, where the full text lives. `photo` is a small square under /public/people.
export type Word = { name: string; role: string; text: string; url: string; photo: string };
const recs = 'https://www.linkedin.com/in/hratlam/details/recommendations/';
export const words: Word[] = [
  {
    name: 'Ivan Aleksic',
    role: 'Product & Experience Leader, TAMM',
    text: 'Huzaifa worked in my team for over a year. Throughout this time, he was consistent in his performance, able to take ownership and deliver tasks in a timely and high quality. Based on the experience we had together, I would highly recommend Huzaifa for any team that needs design, prototyping and research.',
    url: recs,
    photo: '/people/ivan.jpg',
  },
  {
    name: 'Adam Neiland',
    role: 'Head of Design, Banque Saudi Fransi',
    text: 'Huzaifa is brilliant at creating and managing design systems that seamlessly span across various products. His meticulous approach ensures that design systems are highly functional and so smooth to use. What sets him apart is his foresight in considering how engineers will align and contribute to the design system, demonstrating a holistic understanding of the product development process.',
    url: recs,
    photo: '/people/adam.jpg',
  },
  {
    name: 'April Naoe',
    role: 'Digital Strategy, Innovation and Design Lead, Banque Saudi Fransi',
    text: 'I’ve always referred to Huzaifa as the ‘Dark Horse’ of our design team. He quietly works on the sidelines, yet his skills are remarkably formidable. Whatever requirements come up, Huzaifa possesses the perfect skill set to meet the project’s demands.',
    url: recs,
    photo: '/people/april.jpg',
  },
];
