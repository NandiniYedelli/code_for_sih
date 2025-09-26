import React from 'react';
import { useUser } from '../context/UserContext';

interface LessonModalProps {
  isOpen: boolean;
  lessonType: string;
  onClose: () => void;
}

const lessonData: Record<string, { title: string; content: JSX.Element }> = {
  chemistry: {
    title: "Chemistry of Pollution",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <i className="fas fa-flask me-2"></i>Chemistry of Pollution
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-xl font-semibold mb-3">Chapter 1: Understanding Pollutants</h4>
            <p className="mb-4">Pollution occurs when harmful substances are introduced into the environment. Let's explore the molecular level of how pollutants interact with our ecosystem.</p>
            
            <h5 className="text-lg font-semibold mb-3">Types of Chemical Pollutants:</h5>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Heavy Metals:</strong> Lead, Mercury, Cadmium</li>
              <li><strong>Organic Compounds:</strong> Pesticides, PCBs</li>
              <li><strong>Gases:</strong> CO₂, SO₂, NOₓ</li>
              <li><strong>Particulates:</strong> PM2.5, PM10</li>
            </ul>

            <div className="activity-card mb-4">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-microscope me-2"></i>Interactive Molecular Model
              </h6>
              <p className="mb-3">Explore how CO₂ molecules trap heat in our atmosphere</p>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <i className="fas fa-atom text-4xl text-blue-600 mb-2"></i>
                <p>Interactive 3D Molecular Model<br />
                <small className="text-gray-500">Click to explore molecular structures</small></p>
              </div>
            </div>

            <h5 className="text-lg font-semibold mb-3">Chemical Reactions in Pollution</h5>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              SO₂ + H₂O → H₂SO₃ (Sulfurous Acid)<br />
              2SO₂ + O₂ → 2SO₃<br />
              SO₃ + H₂O → H₂SO₄ (Sulfuric Acid - Acid Rain)
            </div>
          </div>

          <div>
            <div className="video-embed mb-4">
              <iframe 
                width="100%" 
                height="200" 
                src="https://www.youtube.com/embed/TXSK7Qvmlps"
                title="Chemistry of Air Pollution" 
                frameBorder="0" 
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <h6 className="font-semibold mb-3">Educational Video: Air Pollution Chemistry</h6>
            
            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-gamepad me-2"></i>Pollution Chemistry Game
              </h6>
              <p className="mb-3">Match pollutants with their chemical formulas</p>
              <button className="btn btn-primary btn-sm">Play Game</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  ecosystem: {
    title: "Ecosystem Science",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <i className="fas fa-microscope me-2"></i>Ecosystem Science
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-xl font-semibold mb-3">Chapter 1: Understanding Ecosystems</h4>
            <p className="mb-4">An ecosystem is a biological community of interacting organisms and their physical environment. Let's explore how these complex systems maintain balance.</p>
            
            <h5 className="text-lg font-semibold mb-3">Components of an Ecosystem:</h5>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Producers:</strong> Plants, algae (autotrophs)</li>
              <li><strong>Primary Consumers:</strong> Herbivores</li>
              <li><strong>Secondary Consumers:</strong> Carnivores</li>
              <li><strong>Decomposers:</strong> Bacteria, fungi</li>
            </ul>

            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-tree me-2"></i>Build Your Own Food Web
              </h6>
              <p className="mb-3">Create connections between different organisms in an ecosystem</p>
              <div className="bg-green-100 rounded-lg p-8 text-center">
                <i className="fas fa-network-wired text-4xl text-green-600 mb-2"></i>
                <p>Interactive Food Web Builder<br />
                <small className="text-gray-500">Drag and connect organisms to create food chains</small></p>
                <button className="btn btn-success mt-3">Start Building</button>
              </div>
            </div>
          </div>

          <div>
            <div className="video-embed mb-4">
              <iframe 
                width="100%" 
                height="200" 
                src="https://www.youtube.com/embed/eGG7hyx_HlA"
                title="Ecosystem Interactions" 
                frameBorder="0" 
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <h6 className="font-semibold mb-3">Video: Ecosystem Interactions</h6>
            
            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-leaf me-2"></i>Biodiversity Counter
              </h6>
              <p className="mb-3">Count species in different habitats</p>
              <button className="btn btn-success btn-sm">Start Activity</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  climate: {
    title: "Climate Change",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <i className="fas fa-thermometer-half me-2"></i>Climate Change
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-xl font-semibold mb-3">Chapter 1: The Greenhouse Effect</h4>
            <p className="mb-4">Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, human activities have accelerated these changes since the 1800s.</p>
            
            <h5 className="text-lg font-semibold mb-3">Key Greenhouse Gases:</h5>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Carbon Dioxide (CO₂):</strong> 76% of emissions</li>
              <li><strong>Methane (CH₄):</strong> 16% of emissions</li>
              <li><strong>Nitrous Oxide (N₂O):</strong> 6% of emissions</li>
              <li><strong>Fluorinated Gases:</strong> 2% of emissions</li>
            </ul>

            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-globe-americas me-2"></i>Climate Simulator
              </h6>
              <p className="mb-3">See how different factors affect global temperature</p>
              <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-lg p-8 text-center">
                <i className="fas fa-temperature-high text-4xl text-red-600 mb-2"></i>
                <p className="text-gray-700">Interactive Climate Simulator<br />
                <small>Adjust CO₂ levels and see temperature changes</small></p>
                <button className="btn btn-warning mt-3">Launch Simulator</button>
              </div>
            </div>
          </div>

          <div>
            <div className="video-embed mb-4">
              <iframe 
                width="100%" 
                height="200" 
                src="https://www.youtube.com/embed/7o3EFSFAEFM"
                title="Understanding Climate Change" 
                frameBorder="0" 
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <h6 className="font-semibold mb-3">Video: Understanding Climate Change</h6>
            
            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-chart-line me-2"></i>Temperature Trends
              </h6>
              <p className="mb-3">Analyze global temperature data</p>
              <button className="btn btn-danger btn-sm">View Data</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export const LessonModal: React.FC<LessonModalProps> = ({ isOpen, lessonType, onClose }) => {
  const { dispatch } = useUser();

  if (!isOpen || !lessonData[lessonType]) return null;

  const lesson = lessonData[lessonType];

  const completeLesson = () => {
    dispatch({ type: 'ADD_ECO_POINTS', payload: 50 });
    
    // Show points animation
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = '+50 Points!';
    document.body.appendChild(animation);
    
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 2000);

    alert('Congratulations! You\'ve completed this lesson and earned 50 eco points!');
    onClose();
  };

  return (
    <div className="lesson-modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="lesson-content bg-white rounded-2xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto relative">
        <button 
          className="close-modal absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        
        {lesson.content}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h5 className="text-lg font-semibold mb-3">Progress Tracker</h5>
          <div className="bg-gray-200 rounded-full h-3 mb-3">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Lesson progress: 60% complete</span>
            <button 
              className="btn btn-success px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={completeLesson}
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};