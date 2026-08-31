export interface SamplePhoto {
  id: string;
  name: string;
  vibe: string;
  thumbnailUrl: string;
  description: string;
}

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: 'sample-1',
    name: 'Mateo',
    vibe: 'Sonrisa gigante y buena onda',
    thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    description: 'Expresión radiante y cabello desenfadado'
  },
  {
    id: 'sample-2',
    name: 'Sofía',
    vibe: 'Súper alegre y rizos esponjosos',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    description: 'Mirada chispeante y peinado con volumen'
  },
  {
    id: 'sample-3',
    name: 'Carlos',
    vibe: 'Chico cool con barba y gafas de sol',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    description: 'Postura decidida y estilo elegante'
  },
  {
    id: 'sample-4',
    name: 'Valentina',
    vibe: 'Modo relax de fin de semana',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    description: 'Expresión dulce y tranquila'
  },
  {
    id: 'sample-5',
    name: 'Lucas',
    vibe: 'Pura energía y mueca traviesa',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    description: 'Mirada pícara y sonrisa de travesura'
  }
];
