import { Court, BirthdayPackage, SchoolProgram, Tournament, BuffetCategory, Booking } from '../types';

export const COMPLEX_INFO = {
  name: "Complejo Arena",
  city: "City Bell",
  province: "Buenos Aires, Argentina",
  address: "Calle 21 A e/ 464 y 465",
  fullAddress: "Calle 21 A entre 464 y 465, City Bell, La Plata, Buenos Aires",
  phone1: "221 617-1026",
  phone2: "221 670-7180",
  whatsapp1: "5492216171026",
  whatsapp2: "5492216707180",
  instagram: "complejo.arena",
  instagramUrl: "https://www.instagram.com/complejo.arena/",
  linktreeUrl: "https://linktr.ee/complejoarenacb",
  cbuAlias: "ARENA.CITYBELL.MP",
  cbuNumber: "0000003100084920491823",
  cuit: "30-71829304-8",
  openingHours: "Lunes a Domingos de 08:00 a 00:30 hs",
  coordinates: {
    lat: -34.8698,
    lng: -58.0495,
  }
};

export const COURTS: Court[] = [
  {
    id: "f6-1",
    name: "Cancha Fútbol 6 - Principal",
    sport: "futbol6",
    sportLabel: "Fútbol 6",
    surface: "Césped Sintético Forbex 50mm Pro",
    size: "34 x 20 mts",
    lighting: "Iluminación LED Estadio 1000W",
    priceDay: 28000,
    priceNight: 34000,
    maxPlayers: 12,
    description: "Césped sintético premium Forbex 50mm con caucho amortiguado, redes perimetrales de alta resistencia y reflectores LED de máxima potencia.",
    image: "./canchas/futbol1.jpg",
    galleryImages: [
      "./canchas/futbol1.jpg",
      "./canchas/futbol4.jpg",
      "./canchas/futbol5.jpg",
      "./canchas/futbol6.jpg"
    ],
    features: ["Césped sintético pro", "Redes perimetrales", "Tablero marcador", "Vestuarios con ducha"],
    badges: ["Más Popular", "Torneos Oficiales"]
  },
  {
    id: "h7-1",
    name: "Cancha Hockey 7",
    sport: "hockey7",
    sportLabel: "Hockey 7",
    surface: "Césped Sintético con Arena Fina de Sílice",
    size: "45 x 28 mts",
    lighting: "Torres LED perimetrales",
    priceDay: 32000,
    priceNight: 38000,
    maxPlayers: 14,
    description: "Excelente drenaje y pique de bocha nivel federación. Arcos reglamentarios acolchados para seguridad total y juego dinámico.",
    image: "./canchas/hockey1.jpg",
    galleryImages: [
      "./canchas/hockey1.jpg",
      "./canchas/hockey2.jpg",
      "./canchas/hockey3.jpg",
      "./canchas/hockey4.jpg",
      "./canchas/hockey5.jpg",
      "./canchas/hockey6.jpg",
      "./canchas/hockey7.jpg"
    ],
    features: ["Superficie rápida nivel pro", "Arcos reglamentarios acolchados", "División para entrenamiento", "Sector técnico"],
    badges: ["Cancha Exclusiva City Bell"]
  },
  {
    id: "h5-1",
    name: "Cancha Hockey 5 - Cancha A",
    sport: "hockey5",
    sportLabel: "Hockey 5",
    surface: "Césped Sintético Profesional",
    size: "26 x 15 mts",
    lighting: "Iluminación LED",
    priceDay: 22000,
    priceNight: 26000,
    maxPlayers: 10,
    description: "Ideal para partidos rápidos, entrenamientos de técnica individual y partidos recreativos de hockey con tablas laterales.",
    image: "./canchas/hockey2.jpg",
    galleryImages: [
      "./canchas/hockey2.jpg",
      "./canchas/hockey3.jpg",
      "./canchas/hockey4.jpg",
      "./canchas/hockey1.jpg"
    ],
    features: ["Césped sintético", "Tablas laterales de contención", "Arcos cerrados"],
    badges: ["2 Canchas Disponibles"]
  },
  {
    id: "h5-2",
    name: "Cancha Hockey 5 - Cancha B",
    sport: "hockey5",
    sportLabel: "Hockey 5",
    surface: "Césped Sintético Profesional",
    size: "26 x 15 mts",
    lighting: "Iluminación LED",
    priceDay: 22000,
    priceNight: 26000,
    maxPlayers: 10,
    description: "Cancha gemela equipada con vallas de contención perimetral, ideal para entrenamientos de menores y partidos dinámicos.",
    image: "./canchas/hockey5.jpg",
    galleryImages: [
      "./canchas/hockey5.jpg",
      "./canchas/hockey6.jpg",
      "./canchas/hockey7.jpg",
      "./canchas/hockey3.jpg"
    ],
    features: ["Tablas de contención", "Bocha rápida", "Redes altas"],
    badges: ["Ideal Escuelita y Mami Hockey"]
  },
  {
    id: "tenis-1",
    name: "Cancha de Tenis Sintético",
    sport: "tenis",
    sportLabel: "Tenis Sintético",
    surface: "Césped Sintético de Pelo Corto con Arena",
    size: "Reglamentaria Singles / Dobles",
    lighting: "LED Focalizada 4 Torres",
    priceDay: 20000,
    priceNight: 24000,
    maxPlayers: 4,
    description: "Cancha de tenis de bajo impacto articular con pique parejo, flejes reglamentarios de alta visibilidad y red profesional.",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Bajo impacto articular", "Flejes enrasados", "Banco de descanso sombreado", "Red profesional"],
    badges: ["Singles y Dobles", "Iluminación LED"]
  }
];

export const BIRTHDAY_PACKAGES: BirthdayPackage[] = [
  {
    id: "arena-clasico",
    name: "Cumple Deportivo Clásico",
    tagline: "El combo ideal para jugar y festejar sin parar",
    basePrice: 140000,
    minKids: 15,
    durationHours: 2.5,
    includedFeatures: [
      "2 horas y media de complejo exclusivo",
      "1 Cancha de Fútbol / Hockey a elección",
      "Profesor de Educación Física / Animador deportivo",
      "Sector Quincho / Buffet techado con mesas y sillas",
      "Parrilla disponible para los adultos",
      "Vajilla básica, heladeras y freezer",
      "Música y sonido ambiente"
    ]
  },
  {
    id: "arena-full",
    name: "Cumple Full Arena + Catering",
    tagline: "Todo resuelto: deporte, profes, menú infantil y quincho",
    basePrice: 220000,
    minKids: 20,
    durationHours: 3,
    popular: true,
    includedFeatures: [
      "3 horas completas de fiesta y deporte",
      "2 Canchas simultáneas (Fútbol + Hockey)",
      "2 Profesores coordinadores para torneos y juegos recreativos",
      "Menú Infantil completo (Snacks, Panchos / Nuggets, Gaseosas y Aguas libres)",
      "Sector Quincho con Parrillero / Fogón para asados de adultos",
      "Invitación digital personalizada Complejo Arena",
      "Torta decorada o mesa dulce con velita",
      "Regalo sorpresa para el cumpleañero/a"
    ]
  },
  {
    id: "arena-mega-torneo",
    name: "Cumple Mega Torneo & Inflables",
    tagline: "La experiencia deportiva definitiva con trofeos y medallas",
    basePrice: 290000,
    minKids: 25,
    durationHours: 3,
    includedFeatures: [
      "Complejo completo para el evento",
      "Torneo oficial con árbitro, pecheras personalizadas y planillero",
      "Copa y medallas para todos los invitados",
      "Inflable gigante deportivo opcional",
      "Catering infantil premium + tabla de bienvenida para adultos",
      "Servicio de limpieza integral pre y post evento",
      "Cobertura fotográfica digital"
    ]
  }
];

export const BIRTHDAY_EXTRAS = [
  { id: "inflable", name: "Inflable Deportivo Gigante", price: 35000 },
  { id: "profe-extra", name: "Profesor / Coordinador Extra", price: 25000 },
  { id: "hamburguesas", name: "Menú Hamburguesas Caseras (por chico)", price: 4500 },
  { id: "tabla-adultos", name: "Picada y Asado para Adultos (Pack 10 personas)", price: 55000 },
  { id: "fotos", name: "Cobertura de Fotos HD del Cumple", price: 30000 },
  { id: "hora-extra", name: "Hora Adicional de Complejo", price: 40000 }
];

export const SCHOOL_PROGRAMS: SchoolProgram[] = [
  {
    id: "escuela-futbol-infantil",
    title: "Escuelita de Fútbol Infantil",
    sport: "futbol",
    ageRange: "4 a 12 años (Categorías divididas por edad)",
    schedule: ["Martes y Jueves 17:30 a 19:00 hs", "Sábados 10:30 a 12:00 hs"],
    priceMonthly: 28000,
    description: "Espacio formativo y recreativo con foco en la técnica, compañerismo, motricidad y diversión guiada por profesores de Educación Física.",
    instructor: "Prof. Matías Navarro & Staff Técnico",
    features: ["Pelotas y materiales oficiales", "Encuentros amistosos mensuales", "Seguro médico deportivo"],
    badge: "Inscripciones Abiertas"
  },
  {
    id: "centro-entrenamiento-futbol",
    title: "Centro de Entrenamiento de Fútbol",
    sport: "entrenamiento",
    ageRange: "13 a 20 años y Adultos",
    schedule: ["Lunes, Miércoles y Viernes 18:00 a 19:30 hs", "Turno Noche: 20:00 a 21:15 hs"],
    priceMonthly: 34000,
    description: "Preparación física específica de fútbol, técnica individual, circuitos de coordinación, potencia y tecnificación para jugadores de campo y arqueros.",
    instructor: "Prof. Lucas Giménez (Prep. Físico)",
    features: ["GPS y monitoreo", "Entrenamiento de arqueros específico", "Testings de rendimiento periódico"],
    badge: "Alto Rendimiento"
  },
  {
    id: "escuela-hockey",
    title: "Escuela de Hockey (Infantiles & Juveniles)",
    sport: "hockey",
    ageRange: "5 a 16 años",
    schedule: ["Lunes y Miércoles 17:30 a 19:00 hs"],
    priceMonthly: 28000,
    description: "Iniciación y perfeccionamiento en hockey sobre césped sintético. Conducción, pases, tiros al arco y juego en equipo.",
    instructor: "Prof. Sofía Alvarez",
    features: ["Bocha y conos provistos", "Partidos y encuentros intercolegiales", "Grupos reducidos"],
    badge: "Todas las Edades"
  },
  {
    id: "mami-hockey",
    title: "Mami Hockey & Hockey Adultas Recreativo",
    sport: "hockey",
    ageRange: "Mayores de 18 años",
    schedule: ["Martes y Jueves 19:30 a 21:00 hs"],
    priceMonthly: 30000,
    description: "Entrenamiento dinámico para mujeres de todas las edades. Combina actividad física, técnica de hockey y el mejor tercer tiempo en el buffet.",
    instructor: "Prof. Sofía Alvarez & Lucía Rossi",
    features: ["No requiere experiencia previa", "Tercer tiempo en buffet incluido", "Torneos de fin de semana"],
    badge: "Muy Concurrido"
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: "torneo-futbol-masc",
    title: "Torneo Nocturno de Fútbol 6 Masculino",
    sport: "Fútbol 6",
    category: "Libre (+18) y Senior (+35)",
    days: "Lunes a Jueves desde las 20:30 hs",
    totalTeams: 16,
    prize: "$600.000 en Premios + Asado para el campeón + Trofeos",
    status: "En Curso",
    standings: [
      { pos: 1, team: "La Cantera FC", played: 6, won: 5, drawn: 1, lost: 0, gf: 24, ga: 10, points: 16 },
      { pos: 2, team: "City Bell City", played: 6, won: 4, drawn: 2, lost: 0, gf: 19, ga: 9, points: 14 },
      { pos: 3, team: "El Rejunte 464", played: 6, won: 4, drawn: 0, lost: 2, gf: 22, ga: 14, points: 12 },
      { pos: 4, team: "Galácticos F6", played: 6, won: 3, drawn: 1, lost: 2, gf: 18, ga: 15, points: 10 },
      { pos: 5, team: "Deportivo Gonnet", played: 6, won: 2, drawn: 1, lost: 3, gf: 15, ga: 17, points: 7 },
      { pos: 6, team: "Los Mismos de Siempre", played: 6, won: 1, drawn: 1, lost: 4, gf: 12, ga: 21, points: 4 }
    ],
    nextMatches: [
      { id: "m1", teamA: "La Cantera FC", teamB: "El Rejunte 464", date: "Jueves", time: "21:00 hs", court: "Cancha F6 Principal", status: "upcoming" },
      { id: "m2", teamA: "City Bell City", teamB: "Galácticos F6", date: "Jueves", time: "22:00 hs", court: "Cancha F6 Principal", status: "upcoming" }
    ]
  },
  {
    id: "torneo-futbol-fem",
    title: "Liga Femenina Fútbol 6 Arena",
    sport: "Fútbol 6 Femenino",
    category: "Libre Femenina",
    days: "Viernes y Domingos desde las 19:00 hs",
    totalTeams: 12,
    prize: "$450.000 + Juego de camisetas + Medallas",
    status: "Inscripciones Abiertas",
    standings: [
      { pos: 1, team: "Las Leonas de City Bell", played: 4, won: 4, drawn: 0, lost: 0, gf: 16, ga: 3, points: 12 },
      { pos: 2, team: "Gambeta Femenina", played: 4, won: 3, drawn: 0, lost: 1, gf: 14, ga: 6, points: 9 },
      { pos: 3, team: "Las Pibas del 21", played: 4, won: 2, drawn: 1, lost: 1, gf: 10, ga: 8, points: 7 },
      { pos: 4, team: "Pura Garra", played: 4, won: 1, drawn: 1, lost: 2, gf: 7, ga: 11, points: 4 }
    ],
    nextMatches: [
      { id: "mf1", teamA: "Las Leonas de City Bell", teamB: "Gambeta Femenina", date: "Viernes", time: "20:00 hs", court: "Cancha F6 Principal", status: "upcoming" }
    ]
  },
  {
    id: "torneo-hockey-relampago",
    title: "Torneo de Hockey 7 Arena Cup",
    sport: "Hockey 7",
    category: "Mami Hockey y Categoría Libre (+18)",
    days: "Sábados y Domingos desde las 17:30 hs",
    totalTeams: 10,
    prize: "$400.000 + Trofeos + Tercer Tiempo Premium en el Quincho",
    status: "En Curso",
    standings: [
      { pos: 1, team: "Vikingas Hockey Club", played: 5, won: 5, drawn: 0, lost: 0, gf: 18, ga: 4, points: 15 },
      { pos: 2, team: "City Bell Hockey 7", played: 5, won: 3, drawn: 1, lost: 1, gf: 12, ga: 7, points: 10 },
      { pos: 3, team: "Palo & Bocha FC", played: 5, won: 3, drawn: 0, lost: 2, gf: 14, ga: 9, points: 9 },
      { pos: 4, team: "Las Panteras de Gonnet", played: 5, won: 2, drawn: 1, lost: 2, gf: 9, ga: 11, points: 7 },
      { pos: 5, team: "Mami Power 465", played: 5, won: 1, drawn: 0, lost: 4, gf: 6, ga: 16, points: 3 },
      { pos: 6, team: "Hockey Recreativo City", played: 5, won: 0, drawn: 0, lost: 5, gf: 3, ga: 15, points: 0 }
    ],
    nextMatches: [
      { id: "mh1", teamA: "Vikingas Hockey Club", teamB: "City Bell Hockey 7", date: "Sábado", time: "18:00 hs", court: "Cancha Hockey 7", status: "upcoming" },
      { id: "mh2", teamA: "Palo & Bocha FC", teamB: "Las Panteras de Gonnet", date: "Sábado", time: "19:00 hs", court: "Cancha Hockey 7", status: "upcoming" }
    ]
  }
];

export const BUFFET_MENU: BuffetCategory[] = [
  {
    category: "Parrilla & Especialidades",
    items: [
      { name: "Sándwich de Bondiola a la Parrilla", description: "En pan ciabatta con salsa criolla y chimichurri casero", price: 7800, badge: "Recomendado" },
      { name: "Sándwich de Vacío Braseado", description: "Carne tierna cocida a fuego lento con queso derretido", price: 8900 },
      { name: "Choripán Bombón con Salsa Criolla", description: "Chorizo puro de cerdo con pan artesanal", price: 4900, badge: "Clásico del 3er Tiempo" },
      { name: "Hamburguesa Completa Arena", description: "Doble medallón 100% carne, queso cheddar, panceta crocante y huevo", price: 7500, badge: "Top Ventas" },
      { name: "Alquiler de Parrilla + Quincho (Por Turno)", description: "Incluye parrilla limpia, carbón, cubiertos y mesa reservada para el equipo", price: 18000 }
    ]
  },
  {
    category: "Minutas & Snacks",
    items: [
      { name: "Porción de Papas Fritas Rústicas", description: "Con salsa cheddar y verdeo picado", price: 4200 },
      { name: "Picada para el Equipo (4 personas)", description: "Salame de colonia, queso gouda, aceitunas, maní, papas y bastones", price: 16500 },
      { name: "Pizzas Caseras a la Piedra", description: "Muzzarella con aceitunas y orégano", price: 8200 },
      { name: "Tostados de Jamón y Queso", description: "En pan de miga tostado a punto", price: 4500 }
    ]
  },
  {
    category: "Bebidas & Tercer Tiempo",
    items: [
      { name: "Gatorade / Powerade 500ml", description: "Todos los sabores bien fríos", price: 2400 },
      { name: "Cerveza Patagonia / Stella Artois 1L", description: "Envase retornable bien helada", price: 5200, badge: "Post Partido" },
      { name: "Lata de Cerveza Artesanal 473ml", description: "IPA, APA, Honey, Golden", price: 3800 },
      { name: "Gaseosas Línea Coca-Cola 1.5L", description: "Coca-Cola, Sprite, Fanta", price: 3500 },
      { name: "Agua Mineral sin gas / con gas", description: "Botella 500ml", price: 1500 }
    ]
  }
];

const today = new Date().toISOString().split('T')[0];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-9021",
    courtId: "f6-1",
    courtName: "Cancha Fútbol 6 - Principal",
    sport: "futbol6",
    sportLabel: "Fútbol 6",
    date: today,
    time: "20:00",
    duration: 1,
    totalPrice: 34000,
    depositAmount: 15000,
    depositPaid: true,
    status: "confirmed",
    customerName: "Federico Rossi",
    customerPhone: "2215551234",
    customerEmail: "fede.rossi@gmail.com",
    teamName: "Los Galácticos",
    paymentMethod: "mercadopago",
    paymentReference: "MP-8823901",
    bookingCode: "ARENA-F6-2000",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isFixedWeekly: true,
    splitCount: 12,
    withParrilla: true
  },
  {
    id: "BK-9022",
    courtId: "f6-1",
    courtName: "Cancha Fútbol 6 - Principal",
    sport: "futbol6",
    sportLabel: "Fútbol 6",
    date: today,
    time: "21:00",
    duration: 1,
    totalPrice: 34000,
    depositAmount: 15000,
    depositPaid: true,
    status: "confirmed",
    customerName: "Lucas Giménez",
    customerPhone: "2214441122",
    customerEmail: "lucas.g@gmail.com",
    teamName: "Torneo Nocturno F6",
    paymentMethod: "mercadopago",
    paymentReference: "MP-994102",
    bookingCode: "ARENA-F6-2100",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isFixedWeekly: true
  },
  {
    id: "BK-9023",
    courtId: "h7-1",
    courtName: "Cancha Hockey 7",
    sport: "hockey7",
    sportLabel: "Hockey 7",
    date: today,
    time: "19:00",
    duration: 1,
    totalPrice: 38000,
    depositAmount: 19000,
    depositPaid: true,
    status: "confirmed",
    customerName: "Camila Fernández",
    customerPhone: "2214449876",
    customerEmail: "camila.f@outlook.com",
    teamName: "Las Panteras CB",
    paymentMethod: "transfer",
    paymentReference: "TRF-3902198",
    bookingCode: "ARENA-H7-1900",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    splitCount: 14
  },
  {
    id: "BK-9024",
    courtId: "h7-1",
    courtName: "Cancha Hockey 7",
    sport: "hockey7",
    sportLabel: "Hockey 7",
    date: today,
    time: "20:00",
    duration: 1,
    totalPrice: 38000,
    depositAmount: 19000,
    depositPaid: true,
    status: "confirmed",
    customerName: "Sofía Alvarez",
    customerPhone: "2216663344",
    customerEmail: "mami.hockey@arena.com",
    teamName: "Mami Hockey Arena",
    paymentMethod: "transfer",
    paymentReference: "TRF-558291",
    bookingCode: "ARENA-H7-2000",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    isFixedWeekly: true
  },
  {
    id: "BK-9025",
    courtId: "f6-1",
    courtName: "Cancha Fútbol 6 - Principal",
    sport: "futbol6",
    sportLabel: "Fútbol 6",
    date: today,
    time: "18:00",
    duration: 1,
    totalPrice: 28000,
    depositAmount: 14000,
    depositPaid: true,
    status: "confirmed",
    customerName: "Mariano Díaz",
    customerPhone: "2219988776",
    customerEmail: "mariano.diaz@gmail.com",
    teamName: "Los Amigos FC",
    paymentMethod: "mercadopago",
    paymentReference: "MP-772183",
    bookingCode: "ARENA-F6-1800",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

export const FACILITY_GALLERY = [
  {
    id: "gal-1",
    title: "Canchas de Fútbol 6 - Césped Forbex 50mm",
    category: "Canchas",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
    description: "Césped sintético premium de última generación con caucho amortiguado, redes perimetrales y arcos oficiales."
  },
  {
    id: "gal-2",
    title: "Cancha de Hockey 7 con Arena Fina",
    category: "Canchas",
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80",
    description: "Excelente rodaje de bocha, drenaje rápido y arcos reglamentarios para partidos de liga y entrenamientos."
  },
  {
    id: "gal-3",
    title: "Cancha de Tenis Sintético Pro",
    category: "Canchas",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    description: "Pelo corto con arena fina para un pique parejo y bajo impacto en articulaciones. Singles y dobles."
  },
  {
    id: "gal-4",
    title: "Festejos y Cumpleaños Infantiles",
    category: "Cumpleaños",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    description: "Animación coordinada por profesores de educación física, torneos y juegos recreativos en cancha."
  },
  {
    id: "gal-5",
    title: "Inflables Deportivos Gigantes",
    category: "Cumpleaños",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    description: "Juegos inflables para que los más chicos disfruten a pleno durante todo el festejo."
  },
  {
    id: "gal-6",
    title: "Quincho y Parrillas para Tercer Tiempo",
    category: "Quincho y Asadores",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    description: "Espacio semicubierto equipado con asadores amplios, mesas, bancos y heladeras para asados con amigos."
  },
  {
    id: "gal-7",
    title: "Buffet y Parrillada Completa",
    category: "Quincho y Asadores",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description: "Sándwiches de bondiola, pizzas a la piedra, empanadas caseras y bebidas bien frías post partido."
  },
  {
    id: "gal-8",
    title: "Iluminación LED Nocturna 1000W",
    category: "Instalaciones",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    description: "Torres de reflectores LED de alta potencia que garantizan visibilidad perfecta sin zonas de sombra."
  },
  {
    id: "gal-9",
    title: "Torneos Nocturnos y Ligas de Fin de Semana",
    category: "Torneos",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    description: "Competencia de alto nivel, planilleros, arbitraje federado y premiación con trofeos y asados."
  },
  {
    id: "gal-10",
    title: "Escuelitas Formativas de Fútbol y Hockey",
    category: "Escuelitas",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    description: "Clases semanales por edades para chicos, jóvenes y adultos guiadas por profesores especializados."
  },
  {
    id: "gal-11",
    title: "Vestuarios con Duchas y Agua Caliente",
    category: "Instalaciones",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    description: "Comodidad total para antes y después del juego, lockers y sanitarios higienizados permanentemente."
  },
  {
    id: "gal-12",
    title: "Predio Integral en City Bell",
    category: "Instalaciones",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    description: "Excelente ubicación sobre Calle 21 A entre 464 y 465, entorno verde, seguro y con estacionamiento."
  }
];

export const TESTIMONIALS = [
  {
    name: "Martín Benítez",
    role: "Capitán en Torneo Nocturno F6",
    comment: "Las canchas están impecables, el césped no te rompe las rodillas y las luces LED de noche se ven de diez. Post partido nos quedamos siempre a comer asado en la parrilla.",
    stars: 5
  },
  {
    name: "Valeria Gómez",
    role: "Mamá de Mateo (Cumple 8 años)",
    comment: "El mejor cumpleaños que le hicimos a Mateo. Los profes mantuvieron a los 25 chicos jugando fútbol y juegos todo el tiempo, el quincho para los padres súper cómodo.",
    stars: 5
  },
  {
    name: "Luciana Carrizo",
    role: "Alumna Mami Hockey",
    comment: "El grupo humano de las escuelitas y la paciencia de las profes es genial. Se entrena con buena onda y las canchas de hockey tienen un piso rapidísimo.",
    stars: 5
  }
];
