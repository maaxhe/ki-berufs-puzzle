// Signet des KI-Berufs-Puzzles: zwei Puzzleteile auf der violetten Linienfarbe (Linie P).
// Auch als app/icon.svg.
export function PuzzleSignet({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="7" fill="#9a86dc" />
      <rect x="16.5" y="8" width="10.5" height="16" rx="2.5" fill="#faf8ff" />
      <circle cx="17.5" cy="16" r="4.6" fill="#9a86dc" />
      <rect x="5" y="8" width="10.5" height="16" rx="2.5" fill="#231c4a" />
      <circle cx="17.5" cy="16" r="3.2" fill="#231c4a" />
    </svg>
  );
}

// Signet von coxilab.de (Dachmarke aller Werkzeuge).
export function CoxilabSignet({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="7" fill="#efece5" />
      <path d="M22 10.5A8 8 0 1 0 22 21.5" fill="none" stroke="#262019" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="22.5" cy="16" r="3.2" fill="#8a3a2c" />
    </svg>
  );
}
