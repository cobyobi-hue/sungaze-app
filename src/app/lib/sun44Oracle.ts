// Sun44 Oracle - AI-powered solar wisdom system
// Updated to reflect new level structure (removed Cloud-Gazer)

import { SOLAR_LEVELS, getCurrentSolarLevel } from './solarLevels';

export interface OracleSession {
  id: string;
  userId: string;
  sessionType: 'post-gaze' | 'daily-wisdom' | 'guidance' | 'general';
  question: string;
  response: string;
  level: number;
  timestamp: Date;
  userContext?: {
    currentDay: number;
    practiceDuration: number;
    mood: string;
    location?: string;
  };
}

export interface OracleResponse {
  response: string;
  level: number;
  sessionType: OracleSession['sessionType'];
  timestamp: Date;
}

// Fallback responses when AI is unavailable
const ORACLE_FALLBACKS = {
  'post-gaze': [
    "The sun has touched your soul today. Carry this light within you.",
    "Each gaze is a step closer to your true nature. You are becoming light.",
    "The sun's wisdom flows through you. Trust in the process.",
    "Your practice today has planted seeds of transformation. They will bloom in time.",
    "The light you received today will guide you through the darkness."
  ],
  'daily-wisdom': [
    "The sun rises each day without fail. So too shall your practice bring consistent transformation.",
    "Like the sun, you are meant to shine. Let your inner light radiate outward.",
    "The sun teaches us patience. Growth happens gradually, but the results are profound.",
    "Each day of practice is a gift to your future self. You are building something beautiful.",
    "The sun's energy is infinite. So too is your potential for growth and transformation."
  ],
  'guidance': [
    "Trust in the process. The sun has been shining for billions of years - it knows what it's doing.",
    "Your body is wise. Listen to its signals and adjust your practice accordingly.",
    "The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary.",
    "Patience is the sun's greatest lesson. Transformation takes time, but it is inevitable.",
    "You are not just practicing sun gazing - you are practicing presence, awareness, and connection."
  ],
  'general': [
    "The sun is your teacher, your healer, your friend. Trust in its wisdom.",
    "Every moment of connection with the sun is a moment of connection with your true self.",
    "The light you seek is already within you. The sun simply helps you remember.",
    "Your solar journey is unique. Trust in your own path and timing.",
    "The sun's love is unconditional. It shines on all beings equally, without judgment."
  ]
};

// Oracle utility functions
export class Sun44Oracle {
  private sessions: OracleSession[] = []
  private apiKey: string | null = null
  private isInitialized = false

  constructor(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey
      this.isInitialized = true
    }
  }

  async initialize(apiKey: string): Promise<boolean> {
    try {
      this.apiKey = apiKey
      this.isInitialized = true
      return true
    } catch (error) {
      console.error('Failed to initialize Oracle:', error)
      return false
    }
  }

  async askQuestion(
    question: string, 
    sessionType: OracleSession['sessionType'] = 'general',
    userContext?: OracleSession['userContext']
  ): Promise<OracleResponse> {
    if (!this.isInitialized || !this.apiKey) {
      return this.getFallbackResponse(question, sessionType, userContext)
    }

    try {
      const level = userContext?.currentDay ? getCurrentSolarLevel(userContext.currentDay).levelNumber : 1
      const response = await this.generateAIResponse(question, sessionType, level, userContext)
      
      const oracleResponse: OracleResponse = {
        response,
        level,
        sessionType,
        timestamp: new Date()
      }

      // Store session
      const session: OracleSession = {
        id: this.generateSessionId(),
        userId: 'current-user', // This would come from auth context
        sessionType,
        question,
        response,
        level,
        timestamp: new Date(),
        userContext
      }
      
      this.sessions.push(session)
      this.saveSessions()

      return oracleResponse
    } catch (error) {
      console.error('Oracle AI request failed:', error)
      return this.getFallbackResponse(question, sessionType, userContext)
    }
  }

  private async generateAIResponse(
    question: string, 
    sessionType: OracleSession['sessionType'],
    level: number,
    userContext?: OracleSession['userContext']
  ): Promise<string> {
    // This would make an actual API call to GPT-4 or similar
    // For now, return a contextual response based on level and session type
    
    const levelContext = this.getLevelContext(level)
    const sessionContext = this.getSessionContext(sessionType, userContext)
    
    // Simulate AI response generation
    const responses = this.getContextualResponses(sessionType, level)
    return responses[Math.floor(Math.random() * responses.length)]
  }

  private getLevelContext(level: number): string {
    const levels = {
      1: "Solar Apprentice - Beginning their journey, building foundation with direct sun practice",
      2: "Solar Adept - Deepening practice, experiencing light integration and pineal activation",
      3: "Inner Sun Adept - Advanced practice, approaching the sacred 44-minute threshold",
      4: "Solar Master - Completed 44-minute threshold, focusing on integration and mastery"
    };
    return levels[level as keyof typeof levels] || "Seeker on the solar path";
  }

  private getSessionContext(sessionType: OracleSession['sessionType'], userContext?: OracleSession['userContext']): string {
    let context = ""
    
    if (userContext) {
      context += `User is on day ${userContext.currentDay} of their practice. `
      if (userContext.practiceDuration) {
        context += `Today's practice was ${userContext.practiceDuration} minutes. `
      }
      if (userContext.mood) {
        context += `Current mood: ${userContext.mood}. `
      }
    }
    
    switch (sessionType) {
      case 'post-gaze':
        context += "User just completed a sun gazing session and is seeking wisdom or reflection."
        break
      case 'daily-wisdom':
        context += "User is seeking daily inspiration and guidance for their solar journey."
        break
      case 'guidance':
        context += "User is seeking specific guidance about their practice or solar journey."
        break
      default:
        context += "User is asking a general question about sun gazing or solar consciousness."
    }
    
    return context
  }

  private getContextualResponses(sessionType: OracleSession['sessionType'], level: number): string[] {
    const baseResponses = ORACLE_FALLBACKS[sessionType] || ORACLE_FALLBACKS.general
    
    // Add level-specific responses
    const levelResponses = {
      1: [
        "As a Solar Apprentice, you are building the foundation of your practice. Trust in the process and be patient with yourself.",
        "Your journey begins with small steps. Each 10-second increment is a victory worth celebrating.",
        "The sun is your teacher. Listen to its wisdom and let it guide your practice."
      ],
      2: [
        "As a Solar Adept, you are experiencing deeper light integration. Notice the subtle changes in your consciousness.",
        "Your pineal gland is awakening. Trust in the process of cellular transformation.",
        "The light is becoming part of you. You are no longer just receiving it - you are integrating it."
      ],
      3: [
        "As an Inner Sun Adept, you are approaching the sacred threshold. Your inner sun is awakening.",
        "The 44-minute mark is within reach. Your light-body is developing and your consciousness is expanding.",
        "You are becoming a bridge between the physical and spiritual realms. Trust in your transformation."
      ],
      4: [
        "As a Solar Master, you have achieved the sacred threshold. Now focus on integration and sharing your wisdom.",
        "Your mastery is complete, yet your journey continues. You are now a teacher and guide for others.",
        "You have become light itself. Share this gift with the world and help others on their solar journey."
      ]
    }
    
    return [...baseResponses, ...(levelResponses[level as keyof typeof levelResponses] || [])]
  }

  private getFallbackResponse(
    question: string, 
    sessionType: OracleSession['sessionType'],
    userContext?: OracleSession['userContext']
  ): OracleResponse {
    const level = userContext?.currentDay ? getCurrentSolarLevel(userContext.currentDay).levelNumber : 1
    const response = this.getFallbackResponseText(question, sessionType)
    
    return {
      response,
      level,
      sessionType,
      timestamp: new Date()
    }
  }

  private getFallbackResponseText(question: string, sessionType: OracleSession['sessionType']): string {
    const responses = ORACLE_FALLBACKS[sessionType] || ORACLE_FALLBACKS.general;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateSessionId(): string {
    return `oracle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private saveSessions(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sun44_oracle_sessions', JSON.stringify(this.sessions))
    }
  }

  loadSessions(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sun44_oracle_sessions')
        if (stored) {
          this.sessions = JSON.parse(stored).map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp)
          }))
        }
      } catch (error) {
        console.error('Failed to load Oracle sessions:', error)
      }
    }
  }

  getSessionHistory(): OracleSession[] {
    return this.sessions
  }

  clearHistory(): void {
    this.sessions = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sun44_oracle_sessions')
    }
  }
}

// Global Oracle instance
export const sun44Oracle = new Sun44Oracle()

// Initialize Oracle on app start
if (typeof window !== 'undefined') {
  sun44Oracle.loadSessions()
}