import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurriculumTab } from './components/CurriculumTab';
import { QuizzesTab } from './components/QuizzesTab';
import { StoriesTab } from './components/StoriesTab';
import { ProverbsTab } from './components/ProverbsTab';
import { LessonModal } from './components/LessonModal';
import { StoryModal } from './components/StoryModal';
import { ActivityModal } from './components/ActivityModal';
import { UserProvider } from './context/UserContext';
import './styles/EcoLearn.css';

function App() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [lessonModal, setLessonModal] = useState({ isOpen: false, lessonType: '' });
  const [storyModal, setStoryModal] = useState({ isOpen: false, storyId: '' });
  const [activityModal, setActivityModal] = useState({ isOpen: false, activityId: '' });

  const handleOpenLesson = (lessonType: string) => {
    setLessonModal({ isOpen: true, lessonType });
  };

  const handleOpenStory = (storyId: string) => {
    setStoryModal({ isOpen: true, storyId });
  };

  const handleOpenActivity = (activityId: string) => {
    setActivityModal({ isOpen: true, activityId });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'curriculum':
        return <CurriculumTab onOpenLesson={handleOpenLesson} />;
      case 'quizzes':
        return <QuizzesTab />;
      case 'stories':
        return <StoriesTab onOpenStory={handleOpenStory} onOpenActivity={handleOpenActivity} />;
      case 'proverbs':
        return <ProverbsTab />;
      default:
        return <CurriculumTab onOpenLesson={handleOpenLesson} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <HeroSection />
        
        <div className="container mx-auto px-4">
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>

        <LessonModal
          isOpen={lessonModal.isOpen}
          lessonType={lessonModal.lessonType}
          onClose={() => setLessonModal({ isOpen: false, lessonType: '' })}
        />

        <StoryModal
          isOpen={storyModal.isOpen}
          storyId={storyModal.storyId}
          onClose={() => setStoryModal({ isOpen: false, storyId: '' })}
        />

        <ActivityModal
          isOpen={activityModal.isOpen}
          activityId={activityModal.activityId}
          onClose={() => setActivityModal({ isOpen: false, activityId: '' })}
        />
      </div>
    </UserProvider>
  );
}

export default App;