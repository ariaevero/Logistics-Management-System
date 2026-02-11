'use client';

import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface Props {
  value?: string;
  onChange: (dataUrl: string, signedAt: string) => void;
}

export function SignaturePad({ value, onChange }: Props) {
  const sigRef = useRef<SignatureCanvas | null>(null);
  const [penColor, setPenColor] = useState('black');
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (value && !sigRef.current?.isEmpty()) return;
    if (value && sigRef.current) {
      sigRef.current.fromDataURL(value);
    }
  }, [value]);

  const handleClear = () => {
    sigRef.current?.clear();
    setSignedAt(null);
    onChange('', '');
  };

  const handleSave = () => {
    if (!sigRef.current) return;
    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png');
    const stamp = new Date().toISOString();
    setSignedAt(stamp);
    onChange(dataUrl, stamp);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <label>Pen color:</label>
        {['black', 'blue', 'green', 'red'].map((c) => (
          <button
            key={c}
            type="button"
            className={`w-6 h-6 rounded-full border ${penColor === c ? 'ring-2 ring-navy-500' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setPenColor(c)}
            aria-label={`Select ${c}`}
          />
        ))}
        <button
          type="button"
          className="ml-auto px-3 py-1 text-sm rounded-md border"
          onClick={() => setShowModal(true)}
        >
          Full-screen
        </button>
      </div>
      <div className="border rounded-md bg-white">
        <SignatureCanvas
          ref={sigRef}
          penColor={penColor}
          canvasProps={{ width: 600, height: 180, className: 'signature-canvas w-full' }}
          onEnd={handleSave}
        />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={handleClear} className="px-3 py-1 rounded-md border">Clear</button>
        <button type="button" onClick={handleSave} className="px-3 py-1 rounded-md bg-navy-500 text-white">Save</button>
        {signedAt && <span className="text-sm text-gray-600">Signed: {new Date(signedAt).toLocaleString()}</span>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Full-screen signature</h3>
              <button onClick={() => setShowModal(false)} className="text-sm">Close</button>
            </div>
            <div className="border rounded-md">
              <SignatureCanvas
                penColor={penColor}
                ref={sigRef}
                canvasProps={{ width: 900, height: 360, className: 'signature-canvas w-full' }}
                onEnd={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
