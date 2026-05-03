import { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

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
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-foreground mb-2">Artifact Capture</h3>
      <p className="text-muted-foreground mb-6">{prompt}</p>

      {type === 'image' ? (
        <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:bg-secondary transition-colors">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Artifact preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
              <label className="mt-4 inline-block px-4 py-2 bg-card border border-border rounded-lg cursor-pointer text-sm font-medium text-muted-foreground hover:bg-secondary">
                Replace Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
              <span className="text-foreground font-medium">Click to upload screenshot</span>
              <span className="text-muted-foreground text-sm mt-1">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-32 p-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground"
            placeholder="Type your explanation here..."
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {saved ? 'Update Answer' : 'Save Answer'}
          </button>
        </div>
      )}

      {saved && (
        <div className="mt-6 bg-secondary/50 border border-border rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-primary" />
          <span className="text-foreground font-medium">Artifact securely captured for this step.</span>
        </div>
      )}
    </div>
  );
}
