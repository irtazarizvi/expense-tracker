import { useState } from 'react';

export default function Footer() {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-5">
        {imgError ? (
          <div className="grid h-11 w-11 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            IR
          </div>
        ) : (
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-100">
            {/* zoom in on the face of a portrait photo */}
            <img
              src="/profile.jpeg"
              alt="Irtaza Rizvi"
              onError={() => setImgError(true)}
              className="h-full w-full origin-[50%_42%] scale-[1.8] object-cover object-[50%_40%]"
            />
          </div>
        )}
        <p className="text-sm text-slate-500">
          Made by <span className="font-semibold text-slate-800">Irtaza Rizvi</span>
        </p>
      </div>
    </footer>
  );
}