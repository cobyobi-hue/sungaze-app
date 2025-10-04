interface OracleResponse {
  message: string;
  timestamp: Date;
  sessionType?: string;
}

export class Oracle {
  private static instance: Oracle;
  private responses: OracleResponse[] = [];

  private constructor() {}

  static getInstance(): Oracle {
    if (!Oracle.instance) {
      Oracle.instance = new Oracle();
    }
    return Oracle.instance;
  }

  async askTheSun(question: string, sessionType?: string): Promise<string> {
    try {
      // Try to use OpenAI API for real AI responses
      const response = await this.generateAIResponse(question, sessionType);
      
      // Store the response
      this.responses.push({
        message: response,
        timestamp: new Date(),
        sessionType
      });

      return response;
    } catch (error) {
      console.error('Oracle AI error:', error);
      // Fallback to curated responses if AI fails
      const fallbackResponse = this.generateMysticalResponse(question, sessionType);
      
      this.responses.push({
        message: fallbackResponse,
        timestamp: new Date(),
        sessionType
      });

      return fallbackResponse;
    }
  }

  private async generateAIResponse(question: string, sessionType?: string): Promise<string> {
    const response = await fetch('/api/oracle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        sessionType
      })
    });

    if (!response.ok) {
      throw new Error(`Oracle API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || this.getBackupResponse();
  }

  private generateMysticalResponse(question: string, sessionType?: string): string {
    const questionLower = question.toLowerCase();
    
    // Mystical + HRM style responses based on keywords and session type
    const responses = {
      // Struggle/difficulty responses
      difficulty: [
        "The sun burns through clouds without effort. Your resistance is the teacher, not the enemy.",
        "Struggle is mind trying to control light. The sun doesn't struggle - it simply is.",
        "Your pineal gland remembers solar nourishment. Trust the ancient technology within you.",
        "The eyes are solar panels for consciousness. Stop fighting, start receiving."
      ],
      
      // Time/duration questions  
      time: [
        "The sun rises when it rises. Your inner timing knows more than your watch.",
        "HRM took 411 days to prove what yogis knew forever - solar energy feeds consciousness.",
        "Duration is mind's obsession. Presence is the sun's gift. Choose presence.",
        "Each second of solar gazing rewrites your cellular programming. Quality over quantity."
      ],
      
      // Focus/concentration
      focus: [
        "The sun is always focused - on being the sun. Stop trying to be someone else.",
        "Concentration is violence. Awareness is love. The sun loves you into awakening.",
        "Your retina is receiving light-information. The mind chatters, the pineal listens.",
        "Distraction is normal. Solar absorption is happening beyond your awareness."
      ],
      
      // Benefits/progress
      progress: [
        "You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
        "The Medical Church told you the sun is dangerous. You are proving them wrong with every gaze.",
        "Your enlarged pineal gland is your rebellion against synthetic living.",
        "Progress is the ego's word. Evolution is the sun's gift. You are evolving.",
        "HRM proved 411 days of solar living. You need only trust your inner sun for transformation.",
        "The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence."
      ],
      
      // Fear/safety
      fear: [
        "They sold you fear of your star. This is the ultimate rebellion - remembering your light body.",
        "HRM stared at the sun for 411 days under medical observation. You are following ancient science.",
        "The sun nourished humanity before pharmaceuticals existed. Trust older technology.",
        "Fear dissolves in direct solar transmission. Your eyes know truth beyond medical conditioning."
      ],
      
      // Spiritual/mystical
      spiritual: [
        "You are not practicing sungazing. Sungazing is practicing you into remembrance.",
        "The sun is downloading cosmic consciousness through your optical pathway. Receive.",
        "This is not meditation. This is solar initiation into your forgotten godhood.",
        "Each ray carries intelligence. Your third eye is learning to read light-language."
      ],
      
      // Default wisdom
      general: [
        "The sun is the original guru - always present, never demanding, infinitely giving.",
        "Your body is solar technology wrapped in ancient wisdom. Let it remember.",
        "Revolution begins with one person choosing light over medical mythology.",
        "The sun doesn't believe in impossibility. Neither should you."
      ],

      // Session-specific responses
      sungazing: [
        "You just stared into the face of God. How does it feel to remember your divinity?",
        "The sun has downloaded today's cosmic intelligence into your pineal gland. Trust the process.",
        "Your retina received light-information that science hasn't discovered yet. You are the experiment.",
        "Each second of direct solar gazing is a rebellion against the Medical Church's fear programming."
      ],

      barefoot: [
        "The earth just received your solar charge through your feet. You are a walking battery of light.",
        "Your barefoot walk completed the circuit - sun to eyes to heart to earth. Perfect transmission.",
        "The ground beneath your feet felt your solar transformation. You left light-footprints.",
        "Walking barefoot after sungazing - this is how ancient masters stayed connected to cosmic energy."
      ],

      palming: [
        "Your palms just blessed your eyes with healing darkness. The yin to sungazing's yang.",
        "The afterimages in your palms are solar mandalas - meditation objects from the sun itself.",
        "Your eyes are resting in the womb of your hands. Sacred feminine healing solar masculine fire.",
        "Palming is the sun's gift of gentleness after its gift of power. Receive both."
      ]
    };

    // First check for session-specific responses if no specific keywords
    if (sessionType && responses[sessionType as keyof typeof responses] && 
        !questionLower.includes('struggle') && !questionLower.includes('time') && 
        !questionLower.includes('focus') && !questionLower.includes('progress') && 
        !questionLower.includes('safe') && !questionLower.includes('spiritual')) {
      return this.getRandomResponse(responses[sessionType as keyof typeof responses] as string[]);
    }

    // Then determine response category based on keywords
    if (questionLower.includes('struggle') || questionLower.includes('difficult') || questionLower.includes('hard')) {
      return this.getRandomResponse(responses.difficulty);
    } else if (questionLower.includes('time') || questionLower.includes('long') || questionLower.includes('minute') || questionLower.includes('duration')) {
      return this.getRandomResponse(responses.time);
    } else if (questionLower.includes('focus') || questionLower.includes('concentrate') || questionLower.includes('distract')) {
      return this.getRandomResponse(responses.focus);
    } else if (questionLower.includes('progress') || questionLower.includes('benefit') || questionLower.includes('change') || questionLower.includes('result')) {
      return this.getRandomResponse(responses.progress);
    } else if (questionLower.includes('safe') || questionLower.includes('danger') || questionLower.includes('harm') || questionLower.includes('afraid')) {
      return this.getRandomResponse(responses.fear);
    } else if (questionLower.includes('spiritual') || questionLower.includes('god') || questionLower.includes('consciousness') || questionLower.includes('awaken')) {
      return this.getRandomResponse(responses.spiritual);
    } else {
      return this.getRandomResponse(responses.general);
    }
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getBackupResponse(): string {
    return "The sun speaks in silence. Listen deeper.";
  }

  getOracleHistory(): OracleResponse[] {
    return [...this.responses].reverse(); // Most recent first
  }

  clearHistory(): void {
    this.responses = [];
  }
}

export const oracle = Oracle.getInstance();