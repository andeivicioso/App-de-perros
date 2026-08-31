import { DogBreedCatalogItem } from '../types';

export const DOG_BREEDS_CATALOG: Record<string, DogBreedCatalogItem> = {
  'golden-retriever': {
    name: 'Golden Retriever',
    commonNames: ['golden', 'retriever', 'cobrador dorado', 'golden retriever'],
    origin: 'Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=800&q=80',
    emoji: '🦮',
    personalityKeywords: ['Amigable', 'Siempre Feliz', 'Leal', 'Entusiasta'],
    description: 'Puro optimismo con patas. Haría amigos hasta con una tostadora.'
  },
  'pug': {
    name: 'Pug (Carlino)',
    commonNames: ['pug', 'carlino', 'mops'],
    origin: 'China 🇨🇳',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1529927015588-32a8ba7ec746?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Dramático', 'Ronquidos', 'Amoroso', 'Comelón'],
    description: 'Ojos saltones llenos de emoción y respiración ruidosa. Rey del sofá.'
  },
  'husky-siberiano': {
    name: 'Husky Siberiano',
    commonNames: ['husky', 'siberiano', 'husky siberiano', 'siberian husky'],
    origin: 'Siberia (Rusia) 🇷🇺',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80',
    emoji: '🐺',
    personalityKeywords: ['Dramático', 'Cantante', 'Independiente', 'Energético'],
    description: 'La diva de la ópera canina. Discute contigo por absolutamente todo.'
  },
  'border-collie': {
    name: 'Border Collie',
    commonNames: ['border collie', 'collie', 'pastor'],
    origin: 'Reino Unido 🇬🇧',
    imageUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    emoji: '🐕',
    personalityKeywords: ['Superdotado', 'Hiperactivo', 'Estratega', 'Ágil'],
    description: 'Probablemente sabe resolver integrales y organizar tu agenda mejor que tú.'
  },
  'chihuahua': {
    name: 'Chihuahua',
    commonNames: ['chihuahua', 'chihuahueño', 'chihua'],
    origin: 'México 🇲🇽',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1604543781294-818fa8603613?auto=format&fit=crop&w=800&q=80',
    emoji: '🐕',
    personalityKeywords: ['90% Valentía', '10% Temblor', 'Territorial', 'Fiel'],
    description: 'Cuerpo de ardilla, actitud de león africano enfadado.'
  },
  'corgi': {
    name: 'Welsh Corgi',
    commonNames: ['corgi', 'welsh corgi', 'pembroke', 'corgi galés'],
    origin: 'Gales 🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=80',
    emoji: '🦊',
    personalityKeywords: ['Patas Cortas', 'Encantador', 'Real', 'Pillo'],
    description: 'Realeza de trasero esponjoso. Conquistará a cualquiera con su caminar.'
  },
  'pastor-aleman': {
    name: 'Pastor Alemán',
    commonNames: ['pastor aleman', 'pastor alemán', 'german shepherd'],
    origin: 'Alemania 🇩🇪',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80',
    emoji: '🐕‍🦺',
    personalityKeywords: ['Guardián', 'Noble', 'Disciplinado', 'Protector'],
    description: 'El hermano mayor responsable que siempre está alerta y cuida de todos.'
  },
  'bulldog-frances': {
    name: 'Bulldog Francés',
    commonNames: ['bulldog frances', 'bulldog francés', 'frenchie', 'french bulldog'],
    origin: 'Francia 🇫🇷',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Orejas de Murciélago', 'Chic', 'Perezoso', 'Simpático'],
    description: 'Moda parisina combinada con la pasión por dormir 18 horas diarias.'
  },
  'shiba-inu': {
    name: 'Shiba Inu',
    commonNames: ['shiba', 'shiba inu', 'doge'],
    origin: 'Japón 🇯🇵',
    imageUrl: 'https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1617895153857-82fe79adc7bc?auto=format&fit=crop&w=800&q=80',
    emoji: '🦊',
    personalityKeywords: ['Much Wow', 'Juicioso', 'Elegante', 'Independiente'],
    description: 'El meme legendario hecho perro. Te juzga en silencio con cariño.'
  },
  'beagle': {
    name: 'Beagle',
    commonNames: ['beagle', 'sabueso'],
    origin: 'Reino Unido 🇬🇧',
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Detective', 'Curioso', 'Orejas Caídas', 'Goloso'],
    description: 'Sigue su olfato hasta el fin del mundo, especialmente si hay jamón.'
  },
  'poodle': {
    name: 'Caniche / Poodle',
    commonNames: ['caniche', 'poodle', 'french poodle'],
    origin: 'Francia / Alemania 🐩',
    imageUrl: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    emoji: '🐩',
    personalityKeywords: ['Glamuroso', 'Inteligente', 'Rizos', 'Sofisticado'],
    description: 'Cabello impecable, alta inteligencia y porte digno de pasarela.'
  },
  'dachshund': {
    name: 'Dachshund (Perro Salchicha)',
    commonNames: ['salchicha', 'dachshund', 'teckel', 'perro salchicha'],
    origin: 'Alemania 🇩🇪',
    imageUrl: 'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
    emoji: '🌭',
    personalityKeywords: ['Curioso', 'Determinado', 'Largo', 'Tenaz'],
    description: 'Medio perro de alto y perro y medio de largo. Con actitud de titán.'
  },
  'san-bernardo': {
    name: 'San Bernardo',
    commonNames: ['san bernardo', 'saint bernard'],
    origin: 'Alpes Suizos 🇨🇭',
    imageUrl: 'https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    emoji: '🏔️',
    personalityKeywords: ['Gigante Bueno', 'Tranquilo', 'Abrazable', 'Salvavidas'],
    description: 'Un oso de peluche andante con un corazón del tamaño de los Alpes.'
  },
  'boxer': {
    name: 'Bóxer',
    commonNames: ['boxer', 'bóxer'],
    origin: 'Alemania 🇩🇪',
    imageUrl: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    emoji: '🥊',
    personalityKeywords: ['Payaso', 'Atlético', 'Expresivo', 'Amante del Juego'],
    description: 'Eterno cachorro de 30 kilos que salta de alegría como un resorte.'
  },
  'samoyedo': {
    name: 'Samoyedo',
    commonNames: ['samoyedo', 'samoyed'],
    origin: 'Rusia / Siberia 🇷🇺',
    imageUrl: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80',
    emoji: '☁️',
    personalityKeywords: ['Nube Sonriente', 'Algodón', 'Cariñoso', 'Radiante'],
    description: 'Literalmente una nube con lengua rosa y sonrisa permanente.'
  },
  'jack-russell': {
    name: 'Jack Russell Terrier',
    commonNames: ['jack russell', 'russell', 'jack russell terrier'],
    origin: 'Inglaterra 🇬🇧',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    emoji: '⚡',
    personalityKeywords: ['Batería Infinita', 'Audaz', 'Saltarín', 'Incombustible'],
    description: 'Generador nuclear de energía portátil. La calma no está en su diccionario.'
  },
  'labrador-retriever': {
    name: 'Labrador Retriever',
    commonNames: ['labrador', 'labrador retriever', 'lab'],
    origin: 'Canadá 🇨🇦',
    imageUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Glotón Feliz', 'Familiar', 'Nadador', 'Noble'],
    description: 'Devorador profesional de croquetas y el mejor amigo de toda la familia.'
  },
  'akita-inu': {
    name: 'Akita Inu',
    commonNames: ['akita', 'akita inu', 'hachiko'],
    origin: 'Japón 🇯🇵',
    imageUrl: 'https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    emoji: '🐕',
    personalityKeywords: ['Lealtad Legendaria', 'Estoico', 'Digno', 'Guardián'],
    description: 'El alma de Hachiko: lealtad inquebrantable, serenidad y porte samurái.'
  },
  'basset-hound': {
    name: 'Basset Hound',
    commonNames: ['basset hound', 'basset', 'sabueso basset'],
    origin: 'Francia / Reino Unido 🇫🇷',
    imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Orejas Gigantes', 'Mirada Triste', 'Pacífico', 'Experto en Siestas'],
    description: 'La cara más tierna y melancólica del universo canino.'
  },
  'maltes': {
    name: 'Bichón Maltés',
    commonNames: ['bichon maltes', 'maltes', 'maltés', 'bichón maltés'],
    origin: 'Mediterráneo 🇮🇹',
    imageUrl: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=800&q=80',
    emoji: '🤍',
    personalityKeywords: ['Copito de Nieve', 'Afectuoso', 'Juguetón', 'Mimado'],
    description: 'Una mota de algodón dulce que te seguirá de habitación en habitación.'
  }
};

export function findDogBreedInfo(breedName: string): DogBreedCatalogItem {
  const normalized = breedName.toLowerCase().trim();
  
  // Direct key lookup
  for (const [key, breed] of Object.entries(DOG_BREEDS_CATALOG)) {
    if (normalized.includes(key.replace('-', ' ')) || key.replace('-', ' ').includes(normalized)) {
      return breed;
    }
    if (breed.commonNames.some(c => normalized.includes(c) || c.includes(normalized))) {
      return breed;
    }
  }

  // Fallback generic friendly dog
  return {
    name: breedName || 'Perro Encantador',
    commonNames: [breedName.toLowerCase()],
    origin: 'Tierra de Canes 🌍',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    emoji: '🐶',
    personalityKeywords: ['Encantador', 'Único', 'Fiel', 'Especial'],
    description: 'Una raza única con un carisma inigualable.'
  };
}
