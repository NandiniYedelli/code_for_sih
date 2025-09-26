import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface ActivityModalProps {
  isOpen: boolean;
  activityId: string;
  onClose: () => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, activityId, onClose }) => {
  const { dispatch } = useUser();
  const [footprintResults, setFootprintResults] = useState<any>(null);

  if (!isOpen) return null;

  const calculateFootprint = () => {
    const transport = (document.getElementById('transport-method') as HTMLSelectElement)?.value || 'walk';
    const distance = parseFloat((document.getElementById('distance') as HTMLInputElement)?.value || '0');
    const acUsage = (document.getElementById('ac-usage') as HTMLInputElement)?.checked || false;
    const computerUsage = (document.getElementById('computer-usage') as HTMLInputElement)?.checked || false;
    const dietType = (document.getElementById('diet-type') as HTMLSelectElement)?.value || 'vegetarian';
    
    let totalEmissions = 0;
    let breakdown: string[] = [];
    let tips: string[] = [];
    
    // Transport emissions (kg CO2 per km)
    const transportEmissions: Record<string, number> = {
      'walk': 0,
      'bus': 0.05,
      'car': 0.2,
      'motorbike': 0.1
    };
    
    const transportCO2 = distance * transportEmissions[transport];
    totalEmissions += transportCO2;
    breakdown.push(`Transport: ${transportCO2.toFixed(1)} kg CO₂`);
    
    if (transport !== 'walk') {
      tips.push('Consider walking or cycling for short distances');
    }
    
    // Energy usage
    if (acUsage) {
      totalEmissions += 3.5;
      breakdown.push('Air Conditioning: 3.5 kg CO₂');
      tips.push('Use fans instead of AC when possible');
    }
    
    if (computerUsage) {
      totalEmissions += 1.2;
      breakdown.push('Electronics: 1.2 kg CO₂');
      tips.push('Unplug devices when not in use');
    }
    
    // Diet emissions
    const dietEmissions: Record<string, number> = {
      'vegetarian': 2.5,
      'mixed': 4.0,
      'meat-heavy': 6.5
    };
    
    const dietCO2 = dietEmissions[dietType];
    totalEmissions += dietCO2;
    breakdown.push(`Diet: ${dietCO2} kg CO₂`);
    
    if (dietType === 'meat-heavy') {
      tips.push('Try having one meat-free day per week');
    }

    const accuracy = Math.round((totalEmissions / 15) * 100);
    
    setFootprintResults({
      totalEmissions: totalEmissions.toFixed(1),
      breakdown,
      tips,
      accuracy: Math.min(accuracy, 100)
    });

    // Award points for calculating footprint
    dispatch({ type: 'ADD_ECO_POINTS', payload: 20 });
    
    // Show points animation
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = '+20 Points!';
    document.body.appendChild(animation);
    
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 2000);
  };

  const renderEcosystemBuilder = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <i className="fas fa-puzzle-piece me-2"></i>Ecosystem Builder Game
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-gray-700">
              <i className="fas fa-leaf text-6xl mb-4"></i>
              <h4 className="text-xl font-semibold mb-2">Build Your Ecosystem</h4>
              <p className="mb-4">Drag and drop organisms to create a balanced ecosystem</p>
              <button className="btn btn-success btn-lg px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Start Building
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-3">Game Instructions:</h5>
            <ul className="list-disc list-inside space-y-1">
              <li>Place producers (plants) first to provide energy</li>
              <li>Add primary consumers (herbivores) that eat plants</li>
              <li>Include secondary consumers (carnivores) for balance</li>
              <li>Don't forget decomposers to recycle nutrients</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h5 className="text-lg font-semibold mb-3">Available Organisms:</h5>
          <div className="space-y-2">
            {[
              { icon: 'fas fa-seedling', name: 'Grass', color: 'text-success' },
              { icon: 'fas fa-tree', name: 'Oak Tree', color: 'text-success' },
              { icon: 'fas fa-rabbit', name: 'Rabbit', color: 'text-warning' },
              { icon: 'fas fa-deer', name: 'Deer', color: 'text-warning' },
              { icon: 'fas fa-wolf', name: 'Wolf', color: 'text-danger' },
              { icon: 'fas fa-bacteria', name: 'Bacteria', color: 'text-info' }
            ].map((organism, index) => (
              <div key={index} className="organism-item bg-gray-50 border-2 border-gray-200 rounded-lg p-3 cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-colors">
                <i className={`${organism.icon} ${organism.color} me-2`}></i>
                {organism.name}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h6 className="font-semibold mb-2">Ecosystem Health:</h6>
            <div className="bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-green-600 h-full rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
            </div>
            <small className="text-gray-500">Add organisms to improve ecosystem balance</small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCarbonCalculator = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <i className="fas fa-calculator me-2"></i>Carbon Footprint Calculator
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h5 className="text-lg font-semibold mb-4">Daily Activities</h5>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Transportation Method:</label>
              <select id="transport-method" className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="walk">Walking/Cycling</option>
                <option value="bus">Public Bus</option>
                <option value="car">Private Car</option>
                <option value="motorbike">Motorbike</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Distance Traveled (km):</label>
              <input type="number" id="distance" defaultValue="10" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Energy Usage:</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="ac-usage" className="mr-2" />
                  <label htmlFor="ac-usage" className="text-sm">Air Conditioning (8+ hours)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="computer-usage" className="mr-2" />
                  <label htmlFor="computer-usage" className="text-sm">Computer/TV (4+ hours)</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Diet Type:</label>
              <select id="diet-type" className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="vegetarian">Vegetarian</option>
                <option value="mixed">Mixed Diet</option>
                <option value="meat-heavy">Meat-Heavy</option>
              </select>
            </div>
            
            <button 
              onClick={calculateFootprint}
              className="w-full btn btn-primary px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate My Footprint
            </button>
          </div>
        </div>
        
        <div>
          {footprintResults ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold mb-2">Your Daily Carbon Footprint</h3>
                <div className="text-4xl font-bold text-red-600 mb-2">{footprintResults.totalEmissions} kg</div>
                <p className="text-gray-600">CO₂ equivalent per day</p>
                
                <div className="bg-gray-200 rounded-full h-3 my-4">
                  <div 
                    className="bg-red-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${footprintResults.accuracy}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="font-semibold mb-2">Breakdown:</h6>
                {footprintResults.breakdown.map((item: string, index: number) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">{item}</div>
                ))}
              </div>
              
              <div>
                <h6 className="font-semibold mb-2">Reduction Tips:</h6>
                <ul className="space-y-1">
                  {footprintResults.tips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm flex items-start">
                      <i className="fas fa-leaf text-green-600 me-2 mt-1 text-xs"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-info-circle me-2"></i>Did You Know?
              </h6>
              <p className="text-sm">The average person produces about 4 tons of CO₂ per year. Small daily changes can make a big difference!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="lesson-modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="lesson-content bg-white rounded-2xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto relative">
        <button 
          className="close-modal absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        
        {activityId === 'ecosystem-builder' && renderEcosystemBuilder()}
        {activityId === 'carbon-footprint' && renderCarbonCalculator()}
      </div>
    </div>
  );
};