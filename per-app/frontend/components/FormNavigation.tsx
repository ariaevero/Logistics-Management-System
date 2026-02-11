'use client';

import clsx from 'clsx';

interface Props {
  totalPages: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  disableNext?: boolean;
}

export function FormNavigation({ totalPages, currentPage, onPrev, onNext, isLast, disableNext }: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="page-indicator">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span key={idx} className={clsx('page-dot', { active: idx === currentPage })} />
        ))}
      </div>
      <div className="space-x-3">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 rounded-md bg-white border border-navy-500 text-navy-700 disabled:opacity-50"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          className="px-4 py-2 rounded-md bg-navy-500 text-white disabled:opacity-50"
        >
          {isLast ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
