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
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Artifact Capture</h3>
      <p className="text-slate-600 mb-6">{prompt}</p>

      {type === 'image' ? (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Artifact preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
              <label className="mt-4 inline-block px-4 py-2 bg-white border border-slate-300 rounded-lg cursor-pointer text-sm font-medium text-slate-600 hover:bg-slate-50">
                Replace Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <UploadCloud className="w-12 h-12 text-slate-500 mb-4" />
              <span className="text-slate-900 font-medium">Click to upload screenshot</span>
              <span className="text-slate-600 text-sm mt-1">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
            placeholder="Type your explanation here..."
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {saved ? 'Update Answer' : 'Save Answer'}
          </button>
        </div>
      )}

      {saved && (
        <div className="mt-6 bg-slate-50 border border-slate-300 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <span className="text-slate-900 font-medium">Artifact securely captured for this step.</span>
        </div>
      )}
    </div>
  );
}
