import React from 'react';
import { useUser } from '../context/UserContext';

export const ProverbsTab: React.FC = () => {
  const { dispatch } = useUser();

  const proverbs = [
    {
      text: "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family.",
      author: "Chief Seattle"
    },
    {
      text: "In every walk with nature, one receives far more than they seek.",
      author: "John Muir"
    },
    {
      text: "Vasudhaiva Kutumbakam - The world is one family, including all living beings and nature.",
      author: "Sanskrit Wisdom"
    },
    {
      text: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
      author: "Native American Proverb"
    },
    {
      text: "Pahaad se darya behta hai, darya se samundar bharta hai. Prakriti ka ye chakra hai, ise samjhna zaroori hai.",
      author: "Hindi Wisdom",
      translation: "Rivers flow from mountains, oceans are filled by rivers. This is nature's cycle, understanding it is essential."
    },
    {
      text: "जैसा बीज बोते हैं, वैसा फल काटते हैं। प्रकृति के साथ यही न्याय है।",
      author: "Hindi Proverb",
      translation: "As you sow, so shall you reap. This is justice with nature."
    }
  ];

  const actions = [
    {
      id: 'plant-tree',
      title: 'Plant a Tree',
      description: 'Make a difference in your local environment',
      icon: 'fas fa-seedling',
      color: 'text-success',
      buttonColor: 'btn-success',
      points: 100
    },
    {
      id: 'recycle',
      title: 'Recycle Waste',
      description: 'Properly sort and recycle your waste',
      icon: 'fas fa-recycle',
      color: 'text-info',
      buttonColor: 'btn-info',
      points: 25
    },
    {
      id: 'eco-transport',
      title: 'Use Eco Transport',
      description: 'Walk, cycle, or use public transport',
      icon: 'fas fa-bicycle',
      color: 'text-warning',
      buttonColor: 'btn-warning',
      points: 15
    },
    {
      id: 'save-energy',
      title: 'Save Energy',
      description: 'Turn off lights and unplug devices',
      icon: 'fas fa-lightbulb',
      color: 'text-danger',
      buttonColor: 'btn-outline-danger',
      points: 10
    }
  ];

  const logAction = (actionType: string) => {
    const action = actions.find(a => a.id === actionType);
    if (action) {
      dispatch({ type: 'ADD_ECO_POINTS', payload: action.points });
      
      // Show points animation
      const animation = document.createElement('div');
      animation.className = 'points-animation';
      animation.textContent = `+${action.points} Points!`;
      document.body.appendChild(animation);
      
      setTimeout(() => {
        if (document.body.contains(animation)) {
          document.body.removeChild(animation);
        }
      }, 2000);

      alert(`${action.title} logged! You earned ${action.points} eco points!`);
    }
  };

  return (
    <div className="section-card">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-leaf me-3 text-success"></i>
        Eco Wisdom: Environmental Proverbs & Sayings
      </h3>
      
      <div className="proverb-container grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {proverbs.map((proverb, index) => (
          <div key={index} className="proverb-card">
            <div className="proverb-text text-lg leading-relaxed mb-4">
              "{proverb.text}"
            </div>
            <div className="proverb-author text-right font-semibold text-orange-600">
              - {proverb.author}
            </div>
            {proverb.translation && (
              <div className="proverb-translation bg-orange-50 border-l-4 border-orange-400 p-4 mt-4 rounded-r-lg italic">
                Translation: {proverb.translation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Take Action Section */}
      <div>
        <h4 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-hand-holding-heart me-2 text-success"></i>
          Take Action Today
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <div key={action.id} className="activity-card text-center" onClick={() => logAction(action.id)}>
              <i className={`${action.icon} ${action.color} text-4xl mb-3`}></i>
              <h6 className="font-semibold mb-2">{action.title}</h6>
              <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              <button className={`btn btn-sm ${action.buttonColor} px-4 py-2 rounded-lg transition-colors`}>
                Log Action
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};