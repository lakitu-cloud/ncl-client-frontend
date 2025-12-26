// Icons
export const PieIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    <path d="M12 2v20" strokeDasharray="2,2" />
    <path d="M2 12h20" strokeDasharray="2,2" />
  </svg>
);

export const TrendIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M21 9v8H13" />
  </svg>
);

export const RankIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 7h4l1.5 8H15l1.5-8h4" />
    <path d="M3 17h18" />
  </svg>
);


/* -------------------------------------------------------------------------- */
/*                         Revenue & Volume Cards (8 Cards)                   */
/* -------------------------------------------------------------------------- */

/* Icons matching the image */
export const HomeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const CalendarIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const MonthIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 7V3v4zm8 0V3v4zM5 9h14M5 9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2H5z" />
  </svg>
);

export const YearIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const WaterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" />
    <path d="M3 18s3-6 9-6 9 6 9 6" />
  </svg>
);

export const GridIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);


/* -------------------------------------------------------------------------- */
/*                               Trend Arrows                                 */
/* -------------------------------------------------------------------------- */
export const TrendingUp = () => (
  <svg className="w-3 h-3 text-green-100" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);

export const TrendingDown = () => (
  <svg className="w-3 h-3 text-red-100 rotate-180" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);
