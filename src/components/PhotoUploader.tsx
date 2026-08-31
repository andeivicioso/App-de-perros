import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Sparkles, X, RefreshCw, User, Image as ImageIcon, Smile, Zap } from 'lucide-react';
import { SAMPLE_PHOTOS, SamplePhoto } from '../data/samplePhotos';
import { playCameraShutterSound } from '../utils/soundEffects';

interface PhotoUploaderProps {
  onAnalyze: (imageBase64: string, userName: string) => void;
  isLoading: boolean;
  soundEnabled: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onAnalyze,
  isLoading,
  soundEnabled,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Convert File to Base64
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        if (soundEnabled) playCameraShutterSound();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      setIsCameraActive(true);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      setCameraError('No se pudo acceder a la cámara. Por favor permite los permisos o sube una foto desde tu galería.');
    }
  };

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Capture Snapshot from Camera
  const captureSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // If user camera, mirror it horizontally for natural selfie feel
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      if (soundEnabled) playCameraShutterSound();
      stopCamera();
    }
  };

  // Select Sample Photo
  const handleSelectSample = async (sample: SamplePhoto) => {
    try {
      // Fetch the sample image and convert to base64
      const response = await fetch(sample.thumbnailUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
          setUserName(sample.name);
          if (soundEnabled) playCameraShutterSound();
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Error loading sample photo:', err);
      // Fallback
      setSelectedImage(sample.thumbnailUrl);
      setUserName(sample.name);
    }
  };

  const handleStartAnalysis = () => {
    if (!selectedImage) return;
    onAnalyze(selectedImage, userName.trim() || 'Amigo');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Title & Introduction */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <span>✨ Escáner de Fisiognomía Canina con IA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-3">
          ¿A qué raza de perro te pareces? 🐶
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Sube tu foto o la de un amigo. Nuestro algoritmo perruno analizará tu sonrisa, vibra, mirada y cabello para descubrir tu verdadero alter ego canino.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-200/80 shadow-xl shadow-amber-900/5 mb-8">
        {!selectedImage && !isCameraActive ? (
          <div>
            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/80 scale-[1.01]'
                  : 'border-amber-300 hover:border-amber-400 bg-amber-50/30 hover:bg-amber-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                id="file-upload-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shadow-inner group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display">
                Arrastra tu foto aquí o haz clic para subir
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
                Acepta imágenes JPG, PNG o WebP de tu rostro de frente, sonriendo o con tu mejor mueca.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  id="btn-select-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  Elegir foto de galería
                </button>

                <button
                  type="button"
                  id="btn-open-camera"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCamera();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md shadow-slate-900/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  Tomar foto con cámara
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-amber-100 text-xs text-slate-600">
              <div className="flex items-center gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                <Smile className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Rostro visible con buena iluminación</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                <span>¡Las muecas y sonrisas dan resultados más cómicos!</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Análisis con IA en menos de 5 segundos</span>
              </div>
            </div>
          </div>
        ) : isCameraActive ? (
          /* Live Camera View */
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-md aspect-4/3 bg-slate-950 rounded-2xl overflow-hidden relative shadow-inner border border-slate-800">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Guiding Oval overlay */}
              <div className="absolute inset-0 border-2 border-dashed border-amber-400/40 rounded-full m-8 pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-bold text-amber-300/80 bg-slate-900/60 px-2 py-0.5 rounded-full">
                  Ubica tu rostro aquí 🐾
                </span>
              </div>

              {cameraError && (
                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-red-400 text-sm font-semibold mb-3">{cameraError}</p>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                  >
                    Volver a subir archivo
                  </button>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                type="button"
                id="btn-cancel-camera"
                onClick={stopCamera}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                id="btn-capture-shutter"
                onClick={captureSnapshot}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transform active:scale-95 transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-white animate-ping" />
                <span>Capturar Foto 📸</span>
              </button>

              <button
                type="button"
                id="btn-switch-camera"
                onClick={() => {
                  setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
                  startCamera();
                }}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Cambiar cámara"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Preview Selected Image Card */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-amber-50/50 p-4 sm:p-6 rounded-2xl border border-amber-200/70">
              {/* Image Thumbnail */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-slate-100">
                <img
                  src={selectedImage!}
                  alt="Foto seleccionada"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  id="btn-remove-image"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-md transition-transform hover:scale-110 cursor-pointer"
                  title="Cambiar foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details & Name Input */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <label htmlFor="user-name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    ¿Cómo te llamas o cómo se llama la persona? (Opcional)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="user-name-input"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Ej: Mateo, Lucía, Papá, Mi jefe..."
                      maxLength={40}
                      className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-amber-300 text-slate-800 font-semibold text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs placeholder:text-slate-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Esto personalizará el carnet canino oficial y la explicación con su nombre.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    id="btn-start-analysis"
                    disabled={isLoading}
                    onClick={handleStartAnalysis}
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    <Sparkles className="w-5 h-5 text-amber-100 animate-spin" />
                    <span>¡Descubrir mi Raza Canina! 🐾</span>
                  </button>

                  <button
                    type="button"
                    id="btn-change-photo"
                    onClick={() => setSelectedImage(null)}
                    className="px-4 py-3.5 rounded-2xl bg-white border border-amber-300 hover:bg-amber-100/50 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
                  >
                    Cambiar foto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Photos Gallery */}
      <div className="bg-amber-100/40 border border-amber-200/80 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🧪</span>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              ¿No tienes una foto a mano? Prueba con estas de ejemplo:
            </h4>
          </div>
          <span className="text-[11px] font-medium text-amber-800 hidden sm:inline">
            1 clic para probar al instante
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SAMPLE_PHOTOS.map((sample) => (
            <button
              key={sample.id}
              id={`btn-sample-${sample.id}`}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="group flex flex-col items-center bg-white p-2 rounded-xl border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all text-left cursor-pointer"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-slate-100 relative">
                <img
                  src={sample.thumbnailUrl}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1.5">
                  <span className="text-[10px] font-bold text-white bg-amber-600/90 px-1.5 py-0.5 rounded-md">
                    Probar 🐾
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-800 truncate w-full text-center">
                {sample.name}
              </span>
              <span className="text-[10px] text-slate-500 truncate w-full text-center">
                {sample.vibe}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
