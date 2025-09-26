import React from 'react';
import { useUser } from '../context/UserContext';

export const HeroSection: React.FC = () => {
  const { state } = useUser();

  const progressPercentage = Math.min(Math.floor((state.user.ecoPoints / 2000) * 100), 100);

  return (
    <div className="hero-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-bold mb-3">🌱 EcoQuest</h1>
            <p className="text-xl opacity-90">Discover, Learn, and Act for a Sustainable Future</p>
            <div className="flex flex-col md:flex-row mt-6 items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center">
                <div 
                  className="progress-circle mx-auto" 
                  style={{ '--progress': progressPercentage } as React.CSSProperties}
                >
                  <div className="progress-text">{progressPercentage}%</div>
                </div>
                <p className="text-center mt-2">Course Progress</p>
              </div>
              <div className="flex-1">
                <div className="eco-points">
                  <i className="fas fa-leaf me-2"></i>
                  Your Eco Points: <span>{state.user.ecoPoints}</span>
                  <div className="text-sm mt-1 opacity-80">
                    Rank: #{state.user.rank} in your school
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 text-center mt-6 lg:mt-0">
            <div className="badges-section">
              <h5 className="text-lg font-semibold mb-3">Recent Achievements</h5>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="badge-earned">
                  <i className="fas fa-recycle me-1"></i>Waste Warrior
                </span>
                <span className="badge-earned">
                  <i className="fas fa-seedling me-1"></i>Tree Hugger
                </span>
                <span className="badge-earned">
                  <i className="fas fa-water me-1"></i>Water Saver
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};