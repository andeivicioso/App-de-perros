import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Share2, Sparkles, Award } from 'lucide-react';
import { DogMatchResult } from '../types';
import { findDogBreedInfo } from '../data/dogBreeds';

interface DogIdBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DogMatchResult | null;
  userName: string;
}

export const DogIdBadgeModal: React.FC<DogIdBadgeModalProps> = ({
  isOpen,
  onClose,
  result,
  userName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isOpen || !result) return;

    const generateBadge = async () => {
      setIsGenerating(true);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card Dimensions (High-res 2:3 card format: 800 x 500)
      const width = 800;
      const height = 500;
      canvas.width = width;
      canvas.height = height;

      // Helper function to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = src;
        });
      };

      try {
        // 1. Background gradient
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#fffbeb'); // warm amber-50
        bgGrad.addColorStop(1, '#fef3c7'); // amber-100
        ctx.fillStyle = bgGrad;
        ctx.roundRect(0, 0, width, height, 28);
        ctx.fill();

        // 2. Gold Border
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#f59e0b';
        ctx.roundRect(4, 4, width - 8, height - 8, 24);
        ctx.stroke();

        // 3. Top Header Bar
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.roundRect(20, 20, width - 40, 70, [18, 18, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px "Outfit", sans-serif';
        ctx.fillText('🐾 REPÚBLICA CANINA INTERNACIONAL', 40, 56);

        ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#fef3c7';
        ctx.fillText('CARNET OFICIAL DE IDENTIDAD CANINA (DNI-DOG)', 40, 78);

        // Header Badge Number
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`ID: CAN-${result.id.slice(-6).toUpperCase()}`, width - 180, 60);

        // 4. Draw Human Photo (Left Frame)
        const userImg = await loadImage(result.userImageBase64);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(40, 110, 190, 190, 16);
        ctx.clip();
        ctx.drawImage(userImg, 40, 110, 190, 190);
        ctx.restore();

        // Frame Border Human
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#d97706';
        ctx.strokeRect(40, 110, 190, 190);

        ctx.fillStyle = '#78350f';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('HUMANO TITULAR', 40, 320);

        // 5. Draw Dog Photo (Right Frame)
        const breedInfo = findDogBreedInfo(result.breedName);
        const dogImgUrl = result.dogBreedPhotoUrl || breedInfo.imageUrl;
        let dogImg: HTMLImageElement | null = null;
        try {
          dogImg = await loadImage(dogImgUrl);
        } catch {
          // Fallback if CORS blocked
          dogImg = null;
        }

        if (dogImg) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(40, 340, 190, 130, 14);
          ctx.clip();
          ctx.drawImage(dogImg, 40, 340, 190, 130);
          ctx.restore();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#f59e0b';
          ctx.strokeRect(40, 340, 190, 130);
        }

        // 6. Identity Details in Main Panel
        const startX = 260;
        let currentY = 135;

        // Name
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('NOMBRE DEL TITULAR:', startX, currentY);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 22px "Outfit", sans-serif';
        ctx.fillText(userName.toUpperCase() || 'AMIGO CANINO', startX, currentY + 22);

        currentY += 55;

        // Raza
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('RAZA ASIGNADA:', startX, currentY);
        ctx.fillStyle = '#d97706';
        ctx.font = 'bold 24px "Outfit", sans-serif';
        ctx.fillText(`${result.breedName} ${result.dogEmoji}`, startX, currentY + 24);

        currentY += 55;

        // Apodo / Alter Ego
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('TÍTULO HONORÍFICO:', startX, currentY);
        ctx.fillStyle = '#334155';
        ctx.font = 'italic bold 16px sans-serif';
        ctx.fillText(`"${result.alterEgoTitle}"`, startX, currentY + 20);

        currentY += 50;

        // Compatibility & Loyalty
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('NIVEL DE COMPATIBILIDAD:', startX, currentY);
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(`⭐ ${result.compatibilityPercentage}% AUTÉNTICO`, startX, currentY + 22);

        // Snack favorito
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('SNACK FAVORITO:', startX + 260, currentY);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`🥩 ${result.dailyLifePrediction.favoriteTreat.slice(0, 24)}...`, startX + 260, currentY + 20);

        currentY += 55;

        // Official Stamp / Golden Seal
        ctx.beginPath();
        ctx.arc(width - 90, height - 80, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#b45309';
        ctx.stroke();

        ctx.fillStyle = '#78350f';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SELLO OFICIAL', width - 90, height - 95);
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('🐾 100%', width - 90, height - 75);
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('PERRO APROBADO', width - 90, height - 58);
        ctx.textAlign = 'left';

        // Bottom footer
        ctx.fillStyle = '#92400e';
        ctx.font = '11px sans-serif';
        ctx.fillText('DoggoMatch IA • Generado con Inteligencia Artificial Canina', startX, height - 25);

        // Save data URL for download
        const url = canvas.toDataURL('image/png');
        setDownloadUrl(url);
      } catch (err) {
        console.error('Error al generar el carnet:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateBadge();
  }, [isOpen, result, userName]);

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-amber-300 shadow-2xl relative">
        {/* Close Button */}
        <button
          id="btn-close-badge-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs mb-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Documento Oficial Certificado</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Carnet Oficial de Identidad Canina 🪪
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Descárgalo y compártelo en tus estados, redes sociales o con tus amigos.
          </p>
        </div>

        {/* Hidden Canvas for High Res Rendering */}
        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-amber-300 shadow-lg mb-6 bg-amber-50">
          <canvas
            ref={canvasRef}
            className="w-full h-auto object-contain block"
          />
          {isGenerating && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
              <span className="text-xs font-bold text-slate-700">Imprimiendo carnet canino...</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {downloadUrl && (
            <a
              id="btn-download-badge"
              href={downloadUrl}
              download={`Carnet-Canino-${userName || 'Doggo'}-${result.breedName}.png`}
              className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Imagen PNG</span>
            </a>
          )}

          <button
            id="btn-dismiss-badge-modal"
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
