'use client';

import { useState } from 'react';

type FilterSortControlsProps = {
  onDifficultyChange: (filters: string[]) => void;
  onFeatureChange: (filters: string[]) => void;
  onSortChange: (sortBy: string) => void;
};

export default function FilterSortControls({ onDifficultyChange, onFeatureChange, onSortChange }: FilterSortControlsProps) {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    onDifficultyChange(
      checked
        ? (prev) => [...prev, value]
        : (prev) => prev.filter((item) => item !== value)
    );
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    onFeatureChange(
      checked
        ? (prev) => [...prev, value]
        : (prev) => prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Difficulty</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center">
              <input type="checkbox" value="Easy" onChange={handleDifficultyChange} className="form-checkbox" />
              <span className="ml-2">Easy</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" value="Moderate" onChange={handleDifficultyChange} className="form-checkbox" />
              <span className="ml-2">Moderate</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" value="Hard" onChange={handleDifficultyChange} className="form-checkbox" />
              <span className="ml-2">Hard</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Features</label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center">
              <input type="checkbox" value="Swimming" onChange={handleFeatureChange} className="form-checkbox" />
              <span className="ml-2">Swimming</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" value="Dog Friendly" onChange={handleFeatureChange} className="form-checkbox" />
              <span className="ml-2">Dog Friendly</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select id="sort-by" onChange={(e) => onSortChange(e.target.value)} className="form-select block w-full">
            <option>Recommended</option>
            <option>Hike Length: Shortest to Longest</option>
            <option>Hike Length: Longest to Shortest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
