import React from 'react';

interface StoriesTabProps {
  onOpenStory: (storyId: string) => void;
  onOpenActivity: (activityId: string) => void;
}

export const StoriesTab: React.FC<StoriesTabProps> = ({ onOpenStory, onOpenActivity }) => {
  const stories = [
    {
      id: 'forest-guardian',
      title: 'The Last Forest Guardian',
      description: 'Follow Maya\'s journey as she discovers the secrets of the forest and learns about deforestation\'s impact on wildlife.',
      icon: 'fas fa-tree',
      color: 'text-success',
      badge: 'Adventure',
      badgeColor: 'bg-success',
      progress: 75,
      chapters: { completed: 3, total: 4 },
      buttonText: 'Continue Reading',
      buttonColor: 'btn-outline-warning'
    },
    {
      id: 'oceans-cry',
      title: 'Ocean\'s Cry',
      description: 'Dive deep with Aqua the dolphin to understand marine pollution and its effects on ocean life.',
      icon: 'fas fa-fish',
      color: 'text-info',
      badge: 'Educational',
      badgeColor: 'bg-info',
      progress: 40,
      chapters: { completed: 2, total: 5 },
      buttonText: 'Start Reading',
      buttonColor: 'btn-outline-info'
    },
    {
      id: 'clean-energy-heroes',
      title: 'The Clean Energy Heroes',
      description: 'Join a group of young inventors creating sustainable solutions for their community\'s energy needs.',
      icon: 'fas fa-solar-panel',
      color: 'text-primary',
      badge: 'Innovation',
      badgeColor: 'bg-primary',
      progress: 16,
      chapters: { completed: 1, total: 6 },
      buttonText: 'Begin Adventure',
      buttonColor: 'btn-outline-primary'
    },
    {
      id: 'climate-champions',
      title: 'Climate Champions',
      description: 'Experience how climate change affects different regions through the eyes of children worldwide.',
      icon: 'fas fa-globe',
      color: 'text-danger',
      badge: 'Drama',
      badgeColor: 'bg-danger',
      progress: 60,
      chapters: { completed: 3, total: 5 },
      buttonText: 'Continue Story',
      buttonColor: 'btn-outline-danger'
    }
  ];

  const activities = [
    {
      id: 'ecosystem-builder',
      title: 'Ecosystem Builder Game',
      description: 'Build and balance your own ecosystem by placing different species and environmental elements.',
      icon: 'fas fa-puzzle-piece',
      buttonColor: 'btn-success'
    },
    {
      id: 'carbon-footprint',
      title: 'Carbon Footprint Calculator',
      description: 'Calculate your daily carbon footprint and discover ways to reduce your environmental impact.',
      icon: 'fas fa-calculator',
      buttonColor: 'btn-info'
    }
  ];

  return (
    <div className="section-card">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-book-open me-3 text-warning"></i>
        Environmental Stories & Adventures
      </h3>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {stories.map((story) => (
          <div key={story.id} className="story-card" onClick={() => onOpenStory(story.id)}>
            <div className="flex items-center mb-3">
              <i className={`${story.icon} ${story.color} text-3xl me-3`}></i>
              <div>
                <h5 className="text-lg font-semibold mb-1">{story.title}</h5>
                <span className={`badge ${story.badgeColor} text-white px-2 py-1 rounded-full text-sm`}>
                  {story.badge}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{story.description}</p>
            <div className="story-progress-bar bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="story-progress-fill h-full rounded-full transition-all duration-300"
                style={{ width: `${story.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <small className="text-gray-500">
                {story.chapters.completed}/{story.chapters.total} chapters completed
              </small>
              <button className={`btn btn-sm ${story.buttonColor} px-4 py-2 rounded-lg transition-colors`}>
                {story.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Video */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-video me-2 text-primary"></i>
          Featured Educational Video
        </h4>
        <div className="video-embed rounded-2xl overflow-hidden shadow-lg">
          <iframe 
            width="100%" 
            height="315"   
            src="https://www.youtube.com/embed/oMhzCwVi0Kg"
            title="Environmental Conservation" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full"
          />
        </div>
        <div className="mt-4">
          <h6 className="font-semibold">The Power of Small Actions</h6>
          <p className="text-gray-600">Learn how individual actions can make a collective impact on environmental conservation.</p>
        </div>
      </div>

      {/* Interactive Activities */}
      <div>
        <h4 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-gamepad me-2 text-success"></i>
          Interactive Activities
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card" onClick={() => onOpenActivity(activity.id)}>
              <h6 className="font-semibold mb-2 flex items-center">
                <i className={`${activity.icon} me-2`}></i>
                {activity.title}
              </h6>
              <p className="text-gray-600 mb-3">{activity.description}</p>
              <button className={`btn btn-sm ${activity.buttonColor} px-4 py-2 text-white rounded-lg transition-colors`}>
                {activity.id === 'ecosystem-builder' ? 'Play Now' : 'Calculate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};