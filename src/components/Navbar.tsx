import React from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'curriculum', label: 'Curriculum', icon: 'fas fa-book' },
    { id: 'quizzes', label: 'Quizzes', icon: 'fas fa-question-circle' },
    { id: 'stories', label: 'Stories', icon: 'fas fa-book-open' },
    { id: 'proverbs', label: 'Eco Wisdom', icon: 'fas fa-quote-right' },
  ];

  return (
    <ul className="nav nav-pills justify-content-center mb-4 flex flex-wrap justify-center gap-2 mb-6">
      {navItems.map(({ id, label, icon }) => (
        <li key={id} className="nav-item">
          <button
            className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === id
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
            onClick={() => onTabChange(id)}
          >
            <i className={`${icon} me-2`}></i>
            <span>{label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};