import React from 'react';
import { useUser } from '../context/UserContext';

interface StoryModalProps {
  isOpen: boolean;
  storyId: string;
  onClose: () => void;
}

const storyData: Record<string, { title: string; content: JSX.Element }> = {
  'forest-guardian': {
    title: "The Last Forest Guardian",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <i className="fas fa-tree me-2 text-success"></i>The Last Forest Guardian
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="story-card">
              <h4 className="text-xl font-semibold mb-3">Chapter 3: The Ancient Oak</h4>
              <p className="text-lg mb-4">Maya approached the massive oak tree that stood at the heart of the forest. Its bark was scarred, but its presence commanded respect from all the woodland creatures.</p>
              
              <p className="mb-4">"This tree has been here for over 300 years," whispered the wise old owl, Hoot, who had become Maya's guide. "It has seen the forest grow and watched it shrink as humans expanded their cities."</p>
              
              <p className="mb-4">Maya placed her hand on the rough bark and felt a strange warmth. Suddenly, she could see the forest as it once was - vast and endless, teeming with life. Then the vision shifted, showing her the present day forest, now just a fraction of its former size.</p>
              
              <div className="activity-card my-6">
                <h6 className="font-semibold mb-3 flex items-center">
                  <i className="fas fa-question me-2"></i>Interactive Question
                </h6>
                <p className="mb-4">What do you think Maya should do to help save the remaining forest?</p>
                <div className="space-y-2">
                  <button className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    A) Organize her school to plant new trees
                  </button>
                  <button className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    B) Start a petition to protect the forest
                  </button>
                  <button className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    C) Learn more about the ecosystem first
                  </button>
                </div>
              </div>

              <p className="mb-6">"The forest needs champions," Hoot continued, "young people who understand that every tree cut down affects countless creatures that call this place home."</p>
              
              <div className="flex justify-between">
                <button className="btn btn-secondary px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <i className="fas fa-arrow-left me-1"></i>Previous Chapter
                </button>
                <button className="btn btn-success px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Next Chapter <i className="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="video-embed mb-4">
              <iframe 
                width="100%" 
                height="200" 
                src="https://www.youtube.com/embed/6x8IuJlcXTk"
                title="Deforestation Impact" 
                frameBorder="0" 
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <h6 className="font-semibold mb-3">Educational Video: Deforestation Impact</h6>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-info-circle me-2"></i>Did You Know?
              </h6>
              <p className="text-sm">A single large tree can provide oxygen for up to 4 people per day and can absorb 22kg of CO₂ annually.</p>
            </div>

            <div className="activity-card">
              <h6 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-users me-2"></i>Story Discussion
              </h6>
              <p className="mb-3">Share your thoughts about Maya's journey</p>
              <button className="btn btn-warning btn-sm">Join Discussion</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'oceans-cry': {
    title: "Ocean's Cry",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <i className="fas fa-fish me-2 text-info"></i>Ocean's Cry
        </h2>
        
        <div className="story-card">
          <h4 className="text-xl font-semibold mb-3">Chapter 2: The Plastic Island</h4>
          <p className="text-lg mb-4">Aqua the dolphin swam through what her grandmother once called the "crystal waters." But today, the water was murky, filled with floating debris.</p>
          
          <p className="mb-4">"What happened to our beautiful ocean?" Aqua asked her friend, Coral the sea turtle, who was struggling to swim with a plastic ring caught around her fin.</p>
          
          <p className="mb-4">"Humans on land create things that don't belong in water," Coral replied sadly. "This plastic will take hundreds of years to disappear, but we sea creatures suffer from it every day."</p>
          
          <div className="activity-card my-6">
            <h6 className="font-semibold mb-3 flex items-center">
              <i className="fas fa-trash-alt me-2"></i>Ocean Cleanup Challenge
            </h6>
            <p className="mb-4">Help Aqua clean the ocean by identifying recyclable items</p>
            <div className="bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg p-8 text-center text-white">
              <i className="fas fa-fish text-4xl mb-2"></i>
              <p>Ocean Cleanup Game</p>
              <button className="btn btn-info mt-3">Start Cleaning</button>
            </div>
          </div>

          <p className="mb-6">As they swam deeper, they discovered a coral reef that was slowly turning white. "The water is getting warmer," explained an old wise whale. "When the water temperature changes, the coral gets sick and loses its color."</p>
          
          <div className="flex justify-between">
            <button className="btn btn-secondary px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <i className="fas fa-arrow-left me-1"></i>Previous Chapter
            </button>
            <button className="btn btn-info px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Next Chapter <i className="fas fa-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
};

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, storyId, onClose }) => {
  const { dispatch } = useUser();

  if (!isOpen || !storyData[storyId]) return null;

  const story = storyData[storyId];

  const selectStoryChoice = (choice: number) => {
    dispatch({ type: 'ADD_ECO_POINTS', payload: 10 });
    
    // Show points animation
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = '+10 Points!';
    document.body.appendChild(animation);
    
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 2000);

    alert(`You chose option ${choice}. Great thinking! You earned 10 eco points.`);
  };

  const nextChapter = () => {
    dispatch({ type: 'ADD_ECO_POINTS', payload: 25 });
    
    // Show points animation
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = '+25 Points!';
    document.body.appendChild(animation);
    
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation);
      }
    }, 2000);

    alert('Chapter completed! You earned 25 eco points. Next chapter loading...');
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
        
        {story.content}
      </div>
    </div>
  );
};