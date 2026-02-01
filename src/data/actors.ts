import { Actor } from '@/types/actor';

export const actors: Actor[] = [
  {
    id: '1',
    name: 'Emma Stone',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop',
    tagline: 'Academy Award-winning actress known for her versatile performances',
    birthDate: '1988-11-06',
    birthPlace: 'Scottsdale, Arizona, USA',
    biography: [
      "Emily Jean Stone, known professionally as Emma Stone, is an American actress who has established herself as one of Hollywood's most talented and sought-after performers. Her career began with her screen debut in the VH1 talent show In Search of the New Partridge Family in 2004.",
      "Stone rose to prominence with her breakthrough role in Superbad (2007), which showcased her impeccable comedic timing. She continued to build her reputation with memorable performances in Easy A (2010), for which she received her first Golden Globe nomination, and The Help (2011).",
      "Her collaboration with director Damien Chazelle in La La Land (2016) earned her the Academy Award for Best Actress, cementing her status as a leading lady in Hollywood. The film also won her a BAFTA and a Golden Globe.",
      "Stone's dedication to her craft has led her to take on challenging roles across various genres, from the dark comedy of Birdman (2014) to the period drama of The Favourite (2018), for which she received her third Oscar nomination. Her portrayal of Bella Baxter in Poor Things (2023) earned her a second Academy Award for Best Actress.",
      "Beyond her acting career, Stone is known for her philanthropic work, particularly her advocacy for mental health awareness. She has been open about her own experiences with anxiety, helping to destigmatize mental health discussions in the entertainment industry."
    ],
    knownFor: [
      { id: 'k1', title: 'La La Land', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', year: 2016, role: 'Mia Dolan', type: 'movie', rating: 8.0 },
      { id: 'k2', title: 'Poor Things', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', year: 2023, role: 'Bella Baxter', type: 'movie', rating: 8.3 },
      { id: 'k3', title: 'Easy A', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop', year: 2010, role: 'Olive Penderghast', type: 'movie', rating: 7.0 },
      { id: 'k4', title: 'The Favourite', poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop', year: 2018, role: 'Abigail Masham', type: 'movie', rating: 7.5 },
      { id: 'k5', title: 'Birdman', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop', year: 2014, role: 'Sam Thomson', type: 'movie', rating: 7.7 }
    ],
    filmography: [
      { id: 'f1', title: 'Poor Things', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', year: 2023, role: 'Bella Baxter', type: 'movie', rating: 8.3 },
      { id: 'f2', title: 'The Curse', poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop', year: 2023, role: 'Whitney Siegel', type: 'tv', rating: 7.8 },
      { id: 'f3', title: 'Kinds of Kindness', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', year: 2024, role: 'Various', type: 'movie', rating: 7.2 },
      { id: 'f4', title: 'Battle of the Sexes', poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop', year: 2017, role: 'Billie Jean King', type: 'movie', rating: 6.7 },
      { id: 'f5', title: 'La La Land', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', year: 2016, role: 'Mia Dolan', type: 'movie', rating: 8.0 },
      { id: 'f6', title: 'The Favourite', poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop', year: 2018, role: 'Abigail Masham', type: 'movie', rating: 7.5 },
      { id: 'f7', title: 'Birdman', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop', year: 2014, role: 'Sam Thomson', type: 'movie', rating: 7.7 },
      { id: 'f8', title: 'The Amazing Spider-Man', poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop', year: 2012, role: 'Gwen Stacy', type: 'movie', rating: 6.9 },
      { id: 'f9', title: 'Easy A', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop', year: 2010, role: 'Olive Penderghast', type: 'movie', rating: 7.0 },
      { id: 'f10', title: 'Zombieland', poster: 'https://images.unsplash.com/photo-1509248961895-40c5268b7461?w=400&h=600&fit=crop', year: 2009, role: 'Wichita', type: 'movie', rating: 7.6 },
      { id: 'f11', title: 'The Help', poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop', year: 2011, role: 'Eugenia "Skeeter" Phelan', type: 'movie', rating: 8.0 },
      { id: 'f12', title: 'Superbad', poster: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=600&fit=crop', year: 2007, role: 'Jules', type: 'movie', rating: 7.6 },
      { id: 'f13', title: 'Cruella', poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', year: 2021, role: 'Estella / Cruella', type: 'movie', rating: 7.4 },
      { id: 'f14', title: 'Maniac', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop', year: 2018, role: 'Annie Landsberg', type: 'tv', rating: 7.7 }
    ],
    awards: [
      { id: 'a1', name: 'Academy Award', category: 'Best Actress', year: 2024, project: 'Poor Things', won: true },
      { id: 'a2', name: 'Academy Award', category: 'Best Actress', year: 2017, project: 'La La Land', won: true },
      { id: 'a3', name: 'Academy Award', category: 'Best Supporting Actress', year: 2019, project: 'The Favourite', won: false },
      { id: 'a4', name: 'Golden Globe', category: 'Best Actress - Musical or Comedy', year: 2017, project: 'La La Land', won: true },
      { id: 'a5', name: 'Golden Globe', category: 'Best Actress - Musical or Comedy', year: 2024, project: 'Poor Things', won: true },
      { id: 'a6', name: 'BAFTA', category: 'Best Actress in a Leading Role', year: 2017, project: 'La La Land', won: true },
      { id: 'a7', name: 'BAFTA', category: 'Best Actress in a Leading Role', year: 2024, project: 'Poor Things', won: true },
      { id: 'a8', name: 'Screen Actors Guild Award', category: 'Outstanding Performance by a Female Actor', year: 2017, project: 'La La Land', won: true }
    ],
    trivia: [
      "She was born with a baby rasp in her voice, which has become one of her signature traits.",
      "Stone learned to tap dance for her role in La La Land, practicing for three months before filming began.",
      "She was the highest-paid actress in the world in 2017.",
      "Originally wanted to be on Saturday Night Live before pursuing film acting.",
      "She has heterochromia - her eyes are different shades of green.",
      "Changed her stage name from Emily Stone to Emma Stone because another actress had already registered the name.",
      "She's a natural blonde but has become known for her red hair in Hollywood.",
      "Suffered from severe anxiety and panic attacks as a child, which she's spoken openly about.",
      "Her first professional acting gig was in a VH1 talent show searching for a new Partridge Family.",
      "She's a huge fan of The Beatles and has a large collection of their memorabilia."
    ],
    didYouKnow: [
      { id: 'd1', fact: "She made her professional debut at 16 by convincing her parents with a PowerPoint presentation titled 'Project Hollywood'", icon: 'star' },
      { id: 'd2', fact: "She and Ryan Gosling have appeared in three films together: La La Land, Crazy Stupid Love, and Gangster Squad", icon: 'film' },
      { id: 'd3', fact: "She's been open about using therapy to manage her anxiety since she was 7 years old", icon: 'heart' },
      { id: 'd4', fact: "She's won two Academy Awards before the age of 36", icon: 'trophy' },
      { id: 'd5', fact: "She trained with a dialect coach for 6 months to perfect her British accent in Poor Things", icon: 'sparkles' }
    ],
    relationships: [
      { id: 'r1', name: 'Dave McCary', type: 'spouse', startYear: 2020, description: 'Writer and segment director for SNL. They welcomed their first child in 2021.' },
      { id: 'r2', name: 'Andrew Garfield', type: 'ex-partner', startYear: 2011, endYear: 2015, description: 'Met on the set of The Amazing Spider-Man.' },
      { id: 'r3', name: 'Kieran Culkin', type: 'ex-partner', startYear: 2010, endYear: 2011, description: 'Briefly dated after meeting at a party.' }
    ]
  },
  {
    id: '2',
    name: 'Timothée Chalamet',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop',
    tagline: 'Acclaimed actor known for his intense and nuanced performances',
    birthDate: '1995-12-27',
    birthPlace: 'New York City, New York, USA',
    biography: [
      "Timothée Hal Chalamet is an American actor who has emerged as one of his generation's most talented performers. Born and raised in Manhattan's Hell's Kitchen neighborhood, he began his acting career in short films and on the stage.",
      "Chalamet's breakthrough came with his role in the coming-of-age drama Call Me by Your Name (2017), for which he became the youngest Best Actor nominee at the Academy Awards in almost 80 years. His portrayal of Elio Perlman earned him widespread critical acclaim and numerous award nominations.",
      "He continued to impress with his performance in Lady Bird (2017), directed by Greta Gerwig, and as the lead in Denis Villeneuve's epic science fiction film Dune (2021). His nuanced portrayal of Paul Atreides has been praised for bringing depth and vulnerability to the iconic character.",
      "Chalamet's filmography showcases his remarkable range, from the period drama Beautiful Boy (2018) to the whimsical musical Wonka (2023). His commitment to choosing complex, character-driven projects has established him as a serious artist in Hollywood.",
      "Beyond acting, Chalamet is known for his distinctive fashion sense, often making bold statements on red carpets. He has become a style icon for his generation and has been featured on numerous best-dressed lists."
    ],
    knownFor: [
      { id: 'k1', title: 'Dune', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop', year: 2021, role: 'Paul Atreides', type: 'movie', rating: 8.0 },
      { id: 'k2', title: 'Call Me by Your Name', poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop', year: 2017, role: 'Elio Perlman', type: 'movie', rating: 7.9 },
      { id: 'k3', title: 'Little Women', poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop', year: 2019, role: 'Laurie', type: 'movie', rating: 7.8 },
      { id: 'k4', title: 'Wonka', poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', year: 2023, role: 'Willy Wonka', type: 'movie', rating: 7.1 }
    ],
    filmography: [
      { id: 'f1', title: 'Dune: Part Two', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', year: 2024, role: 'Paul Atreides', type: 'movie', rating: 8.6 },
      { id: 'f2', title: 'Wonka', poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', year: 2023, role: 'Willy Wonka', type: 'movie', rating: 7.1 },
      { id: 'f3', title: 'Bones and All', poster: 'https://images.unsplash.com/photo-1509248961895-40c5268b7461?w=400&h=600&fit=crop', year: 2022, role: 'Lee', type: 'movie', rating: 6.9 },
      { id: 'f4', title: 'Dune', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop', year: 2021, role: 'Paul Atreides', type: 'movie', rating: 8.0 },
      { id: 'f5', title: "Don't Look Up", poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', year: 2021, role: 'Quentin', type: 'movie', rating: 7.2 },
      { id: 'f6', title: 'The French Dispatch', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop', year: 2021, role: 'Zeffirelli', type: 'movie', rating: 7.1 },
      { id: 'f7', title: 'Little Women', poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop', year: 2019, role: 'Laurie', type: 'movie', rating: 7.8 },
      { id: 'f8', title: 'The King', poster: 'https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=400&h=600&fit=crop', year: 2019, role: 'King Henry V', type: 'movie', rating: 7.3 },
      { id: 'f9', title: 'Beautiful Boy', poster: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop', year: 2018, role: 'Nic Sheff', type: 'movie', rating: 7.3 },
      { id: 'f10', title: 'Call Me by Your Name', poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop', year: 2017, role: 'Elio Perlman', type: 'movie', rating: 7.9 },
      { id: 'f11', title: 'Lady Bird', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop', year: 2017, role: 'Kyle Scheible', type: 'movie', rating: 7.4 },
      { id: 'f12', title: 'Interstellar', poster: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop', year: 2014, role: 'Young Tom Cooper', type: 'movie', rating: 8.6 }
    ],
    awards: [
      { id: 'a1', name: 'Academy Award', category: 'Best Actor', year: 2018, project: 'Call Me by Your Name', won: false },
      { id: 'a2', name: 'Golden Globe', category: 'Best Actor - Drama', year: 2018, project: 'Call Me by Your Name', won: false },
      { id: 'a3', name: 'BAFTA', category: 'Best Actor in a Leading Role', year: 2018, project: 'Call Me by Your Name', won: false },
      { id: 'a4', name: 'Venice Film Festival', category: 'Marcello Mastroianni Award', year: 2017, project: 'Call Me by Your Name', won: true },
      { id: 'a5', name: 'Independent Spirit Award', category: 'Best Male Lead', year: 2018, project: 'Call Me by Your Name', won: true },
      { id: 'a6', name: 'Gotham Award', category: 'Breakthrough Actor', year: 2017, project: 'Call Me by Your Name', won: true }
    ],
    trivia: [
      "He is fluent in French and spent summers in France with his grandmother.",
      "Was a member of the La Guardia High School drama program in NYC.",
      "He was the third-youngest Best Actor nominee in Oscar history.",
      "His first acting gig was in a commercial for Sweet Tarts candy when he was a child.",
      "Played guitar and learned to play piano for his role in Call Me by Your Name.",
      "His father is of French descent, and his mother is of Russian Jewish and Austrian Jewish ancestry.",
      "He initially studied at Columbia University before pursuing acting full-time.",
      "Named after French actor Timothée Chalamet from the 1960s French New Wave."
    ],
    didYouKnow: [
      { id: 'd1', fact: "He attended the same high school as Jennifer Aniston, Adrien Brody, and Nicki Minaj", icon: 'star' },
      { id: 'd2', fact: "He was the youngest Best Actor nominee since 1939", icon: 'trophy' },
      { id: 'd3', fact: "He made $100,000 from his role in Interstellar - his first major film", icon: 'film' },
      { id: 'd4', fact: "He's a huge fan of Kid Cudi and has referenced him in interviews", icon: 'heart' }
    ],
    relationships: [
      { id: 'r1', name: 'Kylie Jenner', type: 'partner', startYear: 2023, description: 'Relationship became public in 2023.' },
      { id: 'r2', name: 'Eiza González', type: 'ex-partner', startYear: 2020, endYear: 2020, description: 'Brief relationship during the pandemic.' },
      { id: 'r3', name: 'Lily-Rose Depp', type: 'ex-partner', startYear: 2018, endYear: 2020, description: 'Met at a party in Paris and dated for about two years.' }
    ]
  },
  {
    id: '3',
    name: 'Florence Pugh',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
    tagline: 'British actress known for her fierce and emotionally powerful performances',
    birthDate: '1996-01-03',
    birthPlace: 'Oxford, England, UK',
    biography: [
      "Florence Pugh is a British actress who has rapidly risen to prominence with her fierce talent and commanding screen presence. Born in Oxford, England, she began her professional acting career as a teenager, making her film debut in the mystery film The Falling (2014).",
      "Pugh gained international recognition for her starring role in the independent drama Lady Macbeth (2016), which earned her a BIFA Award for Best Actress. Her portrayal of a young bride in 19th-century England was praised for its intensity and emotional depth.",
      "Her breakthrough to mainstream audiences came with Midsommar (2019), Ari Aster's unsettling folk horror film, where she delivered a career-defining performance. The same year, she appeared in Greta Gerwig's Little Women, earning her first Academy Award nomination for Best Supporting Actress.",
      "Pugh made her Marvel Cinematic Universe debut as Yelena Belova in Black Widow (2021), a role she has continued in subsequent Marvel projects. Her action chops combined with her dramatic abilities have made her one of the most versatile young actresses in Hollywood.",
      "Known for her outspoken personality and refusal to conform to industry standards, Pugh has become an advocate for body positivity and has been vocal about double standards in the entertainment industry."
    ],
    knownFor: [
      { id: 'k1', title: 'Midsommar', poster: 'https://images.unsplash.com/photo-1509248961895-40c5268b7461?w=400&h=600&fit=crop', year: 2019, role: 'Dani Ardor', type: 'movie', rating: 7.1 },
      { id: 'k2', title: 'Little Women', poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop', year: 2019, role: 'Amy March', type: 'movie', rating: 7.8 },
      { id: 'k3', title: 'Black Widow', poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop', year: 2021, role: 'Yelena Belova', type: 'movie', rating: 6.7 },
      { id: 'k4', title: 'Oppenheimer', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', year: 2023, role: 'Jean Tatlock', type: 'movie', rating: 8.4 }
    ],
    filmography: [
      { id: 'f1', title: 'Dune: Part Two', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop', year: 2024, role: 'Princess Irulan', type: 'movie', rating: 8.6 },
      { id: 'f2', title: 'Oppenheimer', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop', year: 2023, role: 'Jean Tatlock', type: 'movie', rating: 8.4 },
      { id: 'f3', title: 'A Good Person', poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop', year: 2023, role: 'Allison', type: 'movie', rating: 6.8 },
      { id: 'f4', title: "Don't Worry Darling", poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop', year: 2022, role: 'Alice', type: 'movie', rating: 6.2 },
      { id: 'f5', title: 'The Wonder', poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop', year: 2022, role: 'Lib Wright', type: 'movie', rating: 6.7 },
      { id: 'f6', title: 'Hawkeye', poster: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop', year: 2021, role: 'Yelena Belova', type: 'tv', rating: 7.5 },
      { id: 'f7', title: 'Black Widow', poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop', year: 2021, role: 'Yelena Belova', type: 'movie', rating: 6.7 },
      { id: 'f8', title: 'Little Women', poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=600&fit=crop', year: 2019, role: 'Amy March', type: 'movie', rating: 7.8 },
      { id: 'f9', title: 'Midsommar', poster: 'https://images.unsplash.com/photo-1509248961895-40c5268b7461?w=400&h=600&fit=crop', year: 2019, role: 'Dani Ardor', type: 'movie', rating: 7.1 },
      { id: 'f10', title: 'Fighting with My Family', poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop', year: 2019, role: 'Paige', type: 'movie', rating: 7.1 },
      { id: 'f11', title: 'Lady Macbeth', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop', year: 2016, role: 'Katherine', type: 'movie', rating: 6.8 }
    ],
    awards: [
      { id: 'a1', name: 'Academy Award', category: 'Best Supporting Actress', year: 2020, project: 'Little Women', won: false },
      { id: 'a2', name: 'BAFTA', category: 'Best Supporting Actress', year: 2020, project: 'Little Women', won: false },
      { id: 'a3', name: 'BAFTA', category: 'Rising Star Award', year: 2020, project: 'Career Achievement', won: true },
      { id: 'a4', name: 'BIFA', category: 'Best Actress', year: 2017, project: 'Lady Macbeth', won: true },
      { id: 'a5', name: 'Saturn Award', category: 'Best Supporting Actress', year: 2022, project: 'Black Widow', won: true }
    ],
    trivia: [
      "She has three siblings, including actor Toby Sebastian.",
      "Started posting cooking videos during the COVID-19 lockdown which became hugely popular.",
      "She trained in wrestling for three months for Fighting with My Family.",
      "Was discovered by a talent scout at age 17.",
      "She has synesthesia and experiences sounds as colors.",
      "Her grandmother was a dancer at the Moulin Rouge.",
      "She almost gave up acting after her first film due to the industry's treatment of women."
    ],
    didYouKnow: [
      { id: 'd1', fact: "She created her own cooking show during lockdown called 'Cooking with Flo' that went viral", icon: 'star' },
      { id: 'd2', fact: "She performed her own stunts in Black Widow after extensive martial arts training", icon: 'film' },
      { id: 'd3', fact: "She was only 17 when she filmed The Falling, her first movie", icon: 'sparkles' },
      { id: 'd4', fact: "She's been vocal about not getting Botox or changing her appearance for Hollywood", icon: 'heart' }
    ],
    relationships: [
      { id: 'r1', name: 'Zach Braff', type: 'ex-partner', startYear: 2019, endYear: 2022, description: 'Dated for three years; defended the relationship against age-gap criticism.' },
      { id: 'r2', name: 'Will Poulter', type: 'ex-partner', startYear: 2016, endYear: 2017, description: 'Rumored relationship during early career.' }
    ]
  }
];

export const getActorById = (id: string): Actor | undefined => {
  return actors.find(actor => actor.id === id);
};

export const getActorByName = (name: string): Actor | undefined => {
  return actors.find(actor => actor.name.toLowerCase() === name.toLowerCase());
};

export const getAllActors = (): Actor[] => {
  return actors;
};

// News related to actors
export const getActorRelatedNews = (actorId: string) => {
  // Return mock news articles related to the actor
  const actor = getActorById(actorId);
  if (!actor) return [];
  
  return [
    {
      id: `news-${actorId}-1`,
      title: `${actor.name} Signs on for New Thriller Project`,
      excerpt: `The acclaimed actor is set to star in an upcoming psychological thriller from a visionary director.`,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop',
      publishedAt: '2026-01-28T10:00:00Z',
      source: 'Variety'
    },
    {
      id: `news-${actorId}-2`,
      title: `${actor.name}'s Latest Film Breaks Box Office Records`,
      excerpt: `The star's recent release has exceeded all expectations, becoming one of the year's biggest hits.`,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
      publishedAt: '2026-01-25T14:30:00Z',
      source: 'The Hollywood Reporter'
    },
    {
      id: `news-${actorId}-3`,
      title: `Behind the Scenes: ${actor.name}'s Method Acting Approach`,
      excerpt: `An exclusive look at the intense preparation process that goes into every role.`,
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop',
      publishedAt: '2026-01-22T09:15:00Z',
      source: 'Entertainment Weekly'
    },
    {
      id: `news-${actorId}-4`,
      title: `${actor.name} to Produce New Documentary Series`,
      excerpt: `The star is expanding into production with a groundbreaking documentary project.`,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop',
      publishedAt: '2026-01-20T16:00:00Z',
      source: 'Deadline'
    }
  ];
};