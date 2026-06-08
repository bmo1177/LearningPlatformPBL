import { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import Image from 'next/image';

export default function ArtifactCapture({ stepId, type, prompt }: { stepId: number, type: string, prompt: string }) {
  const { artifacts, saveArtifact } = useProgress();
  const [preview, setPreview] = useState<string | null>(artifacts[stepId] || null);
  const [textInput, setTextInput] = useState(artifacts[stepId] || '');
  const [saved, setSaved] = useState(!!artifacts[stepId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        saveArtifact(stepId, base64String);
        setSaved(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      saveArtifact(stepId, textInput);
      setPreview(textInput);
      setSaved(true);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-7 shadow-sm mt-8">
      <h3 className="text-base font-bold text-foreground mb-2 font-poppins">Artifact Capture</h3>
      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{prompt}</p>

      {type === 'image' ? (
        <div className="border-2 border-dashed border-border/60 rounded-2xl p-8 text-center hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300">
          {preview ? (
            <div className="relative max-h-64 w-full flex justify-center">
              <Image src={preview} alt="Artifact preview" width={500} height={256} className="rounded-xl shadow-sm object-contain" />
              <label className="mt-4 inline-block px-4 py-2 bg-card border border-border rounded-xl cursor-pointer text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
                Replace Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <UploadCloud className="w-7 h-7 text-muted-foreground" />
              </div>
              <span className="text-foreground font-medium text-sm">Click to upload screenshot</span>
              <span className="text-muted-foreground text-xs mt-1">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-32 p-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground placeholder:text-muted-foreground text-sm leading-relaxed transition-all duration-200"
            placeholder="Type your explanation here..."
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            {saved ? 'Update Answer' : 'Save Answer'}
          </button>
        </div>
      )}

      {saved && (
        <div className="mt-6 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <span className="text-foreground font-medium text-sm">Artifact securely captured for this step.</span>
        </div>
      )}
    </div>
  );
}
