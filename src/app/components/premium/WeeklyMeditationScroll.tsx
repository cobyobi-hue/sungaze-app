"use client";

import { useState, useEffect } from 'react';
import { usePremiumFeatures } from '../../hooks/usePremiumFeatures';

export interface MeditationScrollEntry {
  id: string;
  week: number;
  title: string;
  theme: string;
  content: string;
  instruction: string;
  duration: number; // in minutes
  datePublished: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Sample meditation scrolls (in real app, would come from API/database)
const MEDITATION_SCROLLS: MeditationScrollEntry[] = [
  {
    id: 'week-1',
    week: 1,
    title: 'The First Dawn',
    theme: 'Beginning the Journey',
    content: `Welcome, seeker of light. This week, we begin our journey into the depths of awareness.

The path of meditation is like watching the dawn break over still waters. At first, there is only darkness, then gradually, the horizon begins to glow with the first hint of light.

Your practice this week is simple yet profound: 
- Sit in stillness each morning for 10 minutes
- Follow the breath as it enters and leaves your body
- When thoughts arise, acknowledge them like clouds passing across the sky
- Return gently to the breath, without judgment

Remember: every master was once a beginner. Every expert was once an amateur. Every accomplished meditator once sat for their first time, perhaps filled with doubt or distraction.

The only way to fail at meditation is to stop practicing.`,
    instruction: 'Sit comfortably, close your eyes, and focus on your natural breath for 10 minutes each day.',
    duration: 10,
    datePublished: '2024-01-01',
    tags: ['beginner', 'breath', 'awareness', 'foundation'],
    difficulty: 'beginner'
  },
  {
    id: 'week-2',
    week: 2,
    title: 'The Flame Within',
    theme: 'Cultivating Inner Light',
    content: `This week, we turn our attention inward to discover the flame that burns eternally within.

In ancient traditions, practitioners would gaze upon a candle flame, then close their eyes and hold that image in their mind's eye. This practice, called trataka, develops concentration and reveals the inner light of consciousness.

Your practice this week:
- Light a candle and place it at eye level, 3-4 feet away
- Gaze softly at the flame for 2-3 minutes without blinking
- Close your eyes and visualize the flame in your mind
- When the image fades, open your eyes and gaze again
- End with 5 minutes of sitting meditation

The flame you visualize is not just memory—it is the light of your own awareness becoming visible to itself. This inner flame is always present, waiting to be discovered beneath the noise of everyday thoughts.

As you practice, you may notice that the boundary between the observer and the observed begins to dissolve. This is a glimpse of your true nature.`,
    instruction: 'Practice candle gazing (trataka) for 10 minutes, followed by 5 minutes of breath meditation.',
    duration: 15,
    datePublished: '2024-01-08',
    tags: ['trataka', 'concentration', 'visualization', 'inner light'],
    difficulty: 'beginner'
  },
  {
    id: 'week-3',
    week: 3,
    title: 'Walking in Awareness',
    theme: 'Meditation in Motion',
    content: `Not all meditation happens in stillness. This week, we explore the ancient practice of walking meditation, where each step becomes a prayer, each breath a blessing.

The Buddha himself spent much of his time walking mindfully between villages, teaching that the path to awakening could be found in motion as well as stillness.

Your walking practice this week:
- Choose a quiet path, 10-20 steps long
- Walk very slowly, feeling each part of your foot touch the ground
- Coordinate your breath with your steps (in-breath for 2 steps, out-breath for 2 steps)
- At the end of your path, pause, breathe, and turn mindfully
- Walk back with the same awareness

Feel the connection between your feet and the earth. Notice how this ancient planet supports every step you take. With each footfall, you are joining the countless beings who have walked this path of awakening before you.

Walking meditation teaches us that enlightenment is not a destination—it is a way of traveling.`,
    instruction: 'Practice slow, mindful walking for 15 minutes daily, indoors or outdoors.',
    duration: 15,
    datePublished: '2024-01-15',
    tags: ['walking', 'mindfulness', 'movement', 'grounding'],
    difficulty: 'beginner'
  },
  {
    id: 'week-4',
    week: 4,
    title: 'The Sound of Silence',
    theme: 'Listening Deeply',
    content: `In the deepest meditation, we discover that silence is not empty—it is full of life, full of presence, full of the subtle sound that underlies all existence.

This week, we practice listening meditation, attuning our ears to the symphony of existence that is always playing, yet rarely heard.

Your listening practice:
- Sit in meditation posture and close your eyes
- Listen to the sounds around you without labeling them
- Notice sounds far away, then sounds nearby
- Listen to the sound of your own breath
- Finally, listen for the silence between sounds
- Rest in this silence as if it were the most precious music

The ancient traditions speak of the "unstruck sound"—the primordial vibration from which all sounds arise and into which they dissolve. As you deepen this practice, you may begin to hear this subtle sound, sometimes described as a high ringing, humming, or the sound of distant ocean waves.

This is the sound of your own life force, the frequency of your deepest being.`,
    instruction: 'Practice listening meditation for 20 minutes, focusing on layers of sound and silence.',
    duration: 20,
    datePublished: '2024-01-22',
    tags: ['listening', 'sound', 'silence', 'subtle energy'],
    difficulty: 'intermediate'
  }
];

interface WeeklyMeditationScrollProps {
  userId?: string;
  showUpgradePrompt?: (feature: string) => void;
}

export default function WeeklyMeditationScroll({ userId, showUpgradePrompt }: WeeklyMeditationScrollProps) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { checkFeatureAccess, isFreeTier } = usePremiumFeatures(userId);
  const featureAccess = checkFeatureAccess('weekly_meditation_scroll');
  
  // Calculate current week based on date (simplified logic)
  useEffect(() => {
    const startDate = new Date('2024-01-01');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    setCurrentWeek(Math.min(diffWeeks, MEDITATION_SCROLLS.length));
  }, []);

  const currentScroll = MEDITATION_SCROLLS[currentWeek - 1] || MEDITATION_SCROLLS[0];

  const handleAccessAttempt = () => {
    if (!featureAccess.hasAccess) {
      showUpgradePrompt?.('weekly_meditation_scroll');
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl border border-orange-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📜</div>
            <div>
              <h3 className="font-semibold text-lg">Weekly Meditation Scroll</h3>
              <p className="text-orange-100 text-sm">Week {currentScroll.week}: {currentScroll.theme}</p>
            </div>
          </div>
          
          {!featureAccess.hasAccess && (
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
              🔒 Premium
            </div>
          )}
        </div>
      </div>

      {/* Content Preview */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{currentScroll.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="bg-orange-200 px-2 py-1 rounded-full text-orange-800 font-medium">
              {currentScroll.difficulty}
            </span>
            <span>⏱️ {currentScroll.duration} min</span>
            <span>🏷️ {currentScroll.tags.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Content Display */}
        {featureAccess.hasAccess ? (
          <div>
            <div className="prose prose-sm max-w-none text-gray-700 mb-6">
              {isExpanded ? (
                <div>
                  <div className="whitespace-pre-line leading-relaxed">{currentScroll.content}</div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">This Week's Practice</h5>
                    <p className="text-blue-800 text-sm">{currentScroll.instruction}</p>
                  </div>
                </div>
              ) : (
                <p className="leading-relaxed">
                  {currentScroll.content.split('\n')[0]}...
                </p>
              )}
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-500 hover:to-yellow-600 transition-all duration-200 shadow-sm"
            >
              {isExpanded ? 'Show Less' : 'Read Full Teaching'}
            </button>
          </div>
        ) : (
          <div>
            <div className="text-gray-600 mb-6 opacity-60">
              <p className="leading-relaxed">
                Welcome, seeker of light. This week, we begin our journey into the depths of awareness...
              </p>
              <div className="mt-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
                <p className="blur-sm">
                  The path of meditation is like watching the dawn break over still waters. At first, there is only darkness, then gradually...
                </p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-sm">
                Unlock weekly guided meditation teachings with Ritual Pack access.
              </p>
              
              <button
                onClick={handleAccessAttempt}
                className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-xl font-medium hover:from-orange-500 hover:to-yellow-600 transition-all duration-200 shadow-md"
              >
                Unlock Weekly Scrolls
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Week Navigation (for premium users) */}
      {featureAccess.hasAccess && (
        <div className="border-t border-orange-200 p-4 bg-white bg-opacity-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Previous Teachings:</span>
            <div className="flex space-x-2">
              {MEDITATION_SCROLLS.slice(0, currentWeek).map((scroll, index) => (
                <button
                  key={scroll.id}
                  onClick={() => {
                    setCurrentWeek(index + 1);
                    setIsExpanded(false);
                  }}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    currentWeek === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
                  }`}
                >
                  {scroll.week}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}