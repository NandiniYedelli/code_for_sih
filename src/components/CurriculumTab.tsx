import React from 'react';

interface CurriculumTabProps {
  onOpenLesson: (lessonType: string) => void;
}

export const CurriculumTab: React.FC<CurriculumTabProps> = ({ onOpenLesson }) => {
  const lessons = [
    {
      id: 'chemistry',
      title: 'Chemistry of Pollution',
      description: 'Understand how pollutants affect our environment at molecular level',
      icon: 'fas fa-flask',
      color: 'text-primary',
      badgeColor: 'bg-primary',
      progressColor: 'bg-primary',
      lessons: 12,
      completed: 5,
      progress: 40
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem Science',
      description: 'Explore biodiversity, food chains, and ecological balance',
      icon: 'fas fa-microscope',
      color: 'text-success',
      badgeColor: 'bg-success',
      progressColor: 'bg-success',
      lessons: 8,
      completed: 6,
      progress: 75
    },
    {
      id: 'climate',
      title: 'Climate Change',
      description: 'Learn about greenhouse gases and global warming effects',
      icon: 'fas fa-thermometer-half',
      color: 'text-danger',
      badgeColor: 'bg-warning',
      progressColor: 'bg-danger',
      lessons: 15,
      completed: 9,
      progress: 60
    }
  ];

  return (
    <div className="section-card">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-graduation-cap me-3 text-success"></i>
        Environmental Science Curriculum
      </h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card" onClick={() => onOpenLesson(lesson.id)}>
            <h5 className="text-lg font-semibold mb-2 flex items-center">
              <i className={`${lesson.icon} me-2 ${lesson.color}`}></i>
              {lesson.title}
            </h5>
            <p className="text-gray-600 mb-4">{lesson.description}</p>
            <div className="flex justify-between items-center mb-3">
              <span className={`badge ${lesson.badgeColor} text-white px-3 py-1 rounded-full text-sm`}>
                {lesson.lessons} Lessons
              </span>
              <button className="btn btn-sm btn-success px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Explore
              </button>
            </div>
            <div className="progress bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`progress-bar ${lesson.progressColor} h-full rounded-full transition-all duration-300`}
                style={{ width: `${lesson.progress}%` }}
              ></div>
            </div>
            <small className="text-gray-500">
              {lesson.completed}/{lesson.lessons} lessons completed
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};