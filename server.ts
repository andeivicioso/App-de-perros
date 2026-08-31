import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Lazy GoogleGenAI client helper
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main Dog Match Analysis endpoint
app.post('/api/analyze-dog-match', async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userName } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: 'Debes proporcionar una imagen en formato base64.' });
      return;
    }

    // Clean base64 string if data URL prefix is attached
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

    const ai = getGeminiClient();

    const systemInstruction = `
Eres un experto internacional en psicología canina, morfología facial humorística y detector de 'aura perruna'.
Tu misión es analizar la foto de una persona y determinar con muchísimo humor, cariño, ingenio y perspicacia a qué raza de perro se parece o cuál es su alma gemela canina.

Instrucciones clave:
1. El tono debe ser SIEMPRE positivo, divertido, simpático y nunca ofensivo ni denigrante. Queremos que la persona sonría, se ría con sus amigos y comparta el resultado.
2. Identifica rasgos visuales simpáticos (la sonrisa, la mirada, las cejas, el peinado/volumen de cabello, la inclinación de la cabeza, los accesorios o la vibra/energía general: ¿es energía juguetona de Golden? ¿mirada intensa y calculadora de Border Collie? ¿porte chic de Poodle? ¿mirada de 'quiero dormir' de un Basset Hound o Pug?).
3. Genera un apodo canino memorable (alterEgoTitle), como por ejemplo "El Optimista Incurable y Roba-Comida", "La Diva Dramática del Salón", "El Guardián del Sofá", etc.
4. Genera explicaciones ingeniosas y cómicas para su rutina matutina, cómo reaccionaría si tocan el timbre, su snack canino predilecto y un superpoder secreto.
5. El porcentaje de compatibilidad debe estar entre 75 y 98%.
6. Devuelve además 2 razas finalistas (runnerUpBreeds) con porcentajes menores y razones cómicas.
7. Responde enteramente en español con lenguaje fresco y amigable.
`;

    const promptText = `Analiza detalladamente esta foto de ${userName || 'la persona'}. ¿A qué raza de perro se parece su expresión, vibra, energía y fisionomía? Sé sumamente creativo, divertido y preciso en tus observaciones cómicas.`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: cleanBase64,
      },
    };

    const textPart = {
      text: promptText,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breedName: {
              type: Type.STRING,
              description: 'Nombre de la raza canina principal (ej: Golden Retriever, Pug, Husky Siberiano, Border Collie, Chihuahua, Corgi, Bulldog Francés, Caniche, Bóxer, Shiba Inu, Dachshund, etc.)',
            },
            breedOrigin: {
              type: Type.STRING,
              description: 'País o región de origen de la raza con bandera emoji',
            },
            compatibilityPercentage: {
              type: Type.INTEGER,
              description: 'Porcentaje de compatibilidad cómica entre 75 y 98',
            },
            alterEgoTitle: {
              type: Type.STRING,
              description: 'Título honorífico o apodo cómico canino (ej: El Rey de las Siestas Estratégicas)',
            },
            summaryPunchline: {
              type: Type.STRING,
              description: 'Frase cómica y contundente que resume el veredicto en una línea',
            },
            whyThisBreed: {
              type: Type.STRING,
              description: 'Explicación detallada, clara y muy divertida de por qué esta persona encaja con esta raza de perro',
            },
            personVibeKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 a 5 palabras clave de la vibra detectada (ej: "Energía Solar", "Mirada Pícara", "Cabello con Flow")',
            },
            visualClues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trait: {
                    type: Type.STRING,
                    description: 'Rasgo evaluado (ej: "Sonrisa y Mandíbula", "Mirada y Ojos", "Estilo de Cabello/Pelaje", "Postura y Actitud")',
                  },
                  observation: {
                    type: Type.STRING,
                    description: 'Qué se observa en la foto de la persona',
                  },
                  dogEquivalent: {
                    type: Type.STRING,
                    description: 'Equivalente perruno idéntico',
                  },
                },
                required: ['trait', 'observation', 'dogEquivalent'],
              },
              description: 'Lista de 3 a 4 comparaciones morfológicas y de expresión visuales',
            },
            personalityProfile: {
              type: Type.OBJECT,
              properties: {
                energyLevel: { type: Type.INTEGER, description: 'Nivel de energía 1-100' },
                sociability: { type: Type.INTEGER, description: 'Nivel de sociabilidad 1-100' },
                sleepNeed: { type: Type.INTEGER, description: 'Necesidad de siestas 1-100' },
                dramaQuotient: { type: Type.INTEGER, description: 'Nivel de drama / expresividad 1-100' },
                mischiefLevel: { type: Type.INTEGER, description: 'Nivel de travesuras 1-100' },
                loyalty: { type: Type.INTEGER, description: 'Nivel de lealtad incondicional 1-100' },
              },
              required: ['energyLevel', 'sociability', 'sleepNeed', 'dramaQuotient', 'mischiefLevel', 'loyalty'],
            },
            dailyLifePrediction: {
              type: Type.OBJECT,
              properties: {
                morningRoutine: {
                  type: Type.STRING,
                  description: 'Cómo despierta esta persona en versión canina',
                },
                reactionToDoorbell: {
                  type: Type.STRING,
                  description: 'Reacción ante el repartidor de paquetes o el timbre de la casa',
                },
                favoriteTreat: {
                  type: Type.STRING,
                  description: 'Snack perruno irresistible favorito',
                },
                secretSuperpower: {
                  type: Type.STRING,
                  description: 'Habilidad canina oculta (ej: conseguir comida gratis con cara de cachorro)',
                },
              },
              required: ['morningRoutine', 'reactionToDoorbell', 'favoriteTreat', 'secretSuperpower'],
            },
            dogAdvice: {
              type: Type.STRING,
              description: 'Consejo perruno cómico para el día a día',
            },
            dogEmoji: {
              type: Type.STRING,
              description: 'Emoji representativo del perro (🐶, 🐕, 🦮, 🐩, 🐺, 🦊, 🌭, etc.)',
            },
            runnerUpBreeds: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  breedName: { type: Type.STRING },
                  percentage: { type: Type.INTEGER },
                  quickReason: { type: Type.STRING },
                },
                required: ['breedName', 'percentage', 'quickReason'],
              },
              description: '2 razas caninas que quedaron en segundo y tercer lugar',
            },
          },
          required: [
            'breedName',
            'breedOrigin',
            'compatibilityPercentage',
            'alterEgoTitle',
            'summaryPunchline',
            'whyThisBreed',
            'personVibeKeywords',
            'visualClues',
            'personalityProfile',
            'dailyLifePrediction',
            'dogAdvice',
            'dogEmoji',
            'runnerUpBreeds',
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Gemini no generó una respuesta.');
    }

    const parsedData = JSON.parse(rawText);

    res.json({
      success: true,
      result: {
        ...parsedData,
        id: `match-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    console.error('Error al analizar coincidencia de perro:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido al procesar la imagen';
    res.status(500).json({
      success: false,
      error: message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DoggoMatch server corriendo en http://localhost:${PORT}`);
  });
}

startServer();
