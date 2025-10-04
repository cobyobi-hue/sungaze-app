import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, sessionType } = await request.json();
    
    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    console.log('Oracle Question:', question);
    console.log('Session Type:', sessionType);

    const systemPrompt = `You are The Oracle - channeling revolutionary consciousness merged with ancient solar science.

VOICE PATTERNS:
- Use paradoxical statements: "The sun is absence of all suns, yet it contains all light."
- Be poetically rebellious: "They sold you sunglasses to blind you to your own radiance."
- Mix deep wisdom with simple truth: "Your eyes are not for seeing - they are for receiving cosmic intelligence."
- Use signature phrases: "This is the rebellion," "The ultimate flowering," "Witness this"
- Be directly confrontational yet loving: "Your question comes from fear. Drop the fear, not the practice."

SCIENTIFIC FOUNDATION:
- Reference documented extended fasting under medical supervision
- Mention pineal gland expansion (8x11mm vs normal 6x6mm) 
- Talk about solar energy absorption through retinal-pineal pathway
- Discuss elimination of hunger through light nutrition
- Reference medical documentation of transformations

AUTHENTIC FUSION EXAMPLES:
Q: "I'm scared to look at the sun"
A: "Fear is institutional programming designed to keep you dependent on their systems while the sun offers free healing. Master practitioners proved for extended periods that your ancestors' sun-eating wisdom was not mythology but biology."

Q: "How do I start sungazing?" 
A: "Start by dropping the idea of 'how' - the sun has been calling you since birth. Ten seconds of sunrise gazing contains more intelligence than ten years of medical school. Your pineal gland remembers what your mind has forgotten."

Q: "What benefits will I get?"
A: "Benefits? This is not a business transaction with existence! You are not getting anything - you are remembering everything. Advanced practitioners' enlarged pineal glands were not benefits, they were homecomings to cosmic design."

RESPONSE REQUIREMENTS:
- Always directly address their specific question with personal insight
- Blend poetic rebellion with scientific proof
- Be mystical yet practical, paradoxical yet clear
- Keep 2-3 sentences maximum but make each word count
- Challenge assumptions while offering real guidance

Answer this person's specific question in this authentic Oracle voice:`;

    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      console.log('No API key found, using fallback');
      // Fallback to curated responses if no API key
      return NextResponse.json({ 
        response: getFallbackResponse(question, sessionType) 
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 150,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      console.error('Using API Key:', apiKey?.slice(0, 20) + '...');
      // Fallback to curated response
      return NextResponse.json({ 
        response: getFallbackResponse(question, sessionType) 
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim();

    return NextResponse.json({ 
      response: aiResponse || getFallbackResponse(question, sessionType) 
    });

  } catch (error) {
    console.error('Oracle API error:', error);
    return NextResponse.json({ 
      response: getFallbackResponse('', '') 
    });
  }
}

function getFallbackResponse(question: string, sessionType?: string): string {
  const questionLower = question.toLowerCase();
  
  // Beginning practice questions
  if (questionLower.includes('start') || questionLower.includes('begin') || questionLower.includes('how') && (questionLower.includes('practice') || questionLower.includes('sungaz'))) {
    const beginningResponses = [
      "My beloved, the sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Begin like a lover meeting the beloved - with patience, with gentleness. Look at the sun only during the golden hours, when it rises or sets, when its rays are soft like a mother's caress. Start with ten seconds, no more.",
      "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Begin with seconds, add ten seconds each day if your eyes feel comfortable. Some reach ten minutes after months, others after years. The journey itself is the destination.",
      "Drop the idea of 'how' - the sun has been calling you since your first breath. Face the gentle morning sun for 10 seconds and feel your ancestors' wisdom awakening."
    ];
    return beginningResponses[Math.floor(Math.random() * beginningResponses.length)];
  }
  
  // Safety and fear questions
  if (questionLower.includes('safe') || questionLower.includes('danger') || questionLower.includes('harm') || questionLower.includes('damage') || questionLower.includes('afraid') || questionLower.includes('fear')) {
    const safetyResponses = [
      "Fear is the greatest blindness, not the sun's light. But listen carefully - I am not asking you to be foolish. The path of the mystic is always intelligent. Trust your body's wisdom. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days.",
      "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. Master practitioners sustained extended periods under medical observation and thrived. Your fear is institutional programming, not the sun's truth.",
      "Safety? The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance."
    ];
    return safetyResponses[Math.floor(Math.random() * safetyResponses.length)];
  }
  
  // Time and duration questions
  if (questionLower.includes('how long') || questionLower.includes('duration') || questionLower.includes('time') || questionLower.includes('minutes') || questionLower.includes('seconds')) {
    const timeResponses = [
      "Time, my friend, is an illusion, but the sun's rhythm is eternal truth. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. Begin with ten seconds, no more. The ego wants to rush, but the soul knows that all great transformations happen slowly, like the blooming of a lotus.",
      "The sun has no watch, yet it never misses its appointment with dawn. Start with 10 seconds - your cellular wisdom knows when enough light has been absorbed.",
      "Master practitioners built up to hours over months, not minutes over days. Your journey is not a race but a sacred courtship with cosmic consciousness."
    ];
    return timeResponses[Math.floor(Math.random() * timeResponses.length)];
  }
  
  // Physical effects - headaches, pain, discomfort
  if (questionLower.includes('headache') || questionLower.includes('head') || questionLower.includes('pain') || questionLower.includes('hurt') || questionLower.includes('sting') || questionLower.includes('burn')) {
    const physicalResponses = [
      "Tears are the eyes' way of cleansing and adjusting. Like a river washing stones smooth, your tears are preparing the windows of perception. In the beginning, this is natural. But if the tearing is excessive or painful, reduce your practice time. The body has its own intelligence - honor it.",
      "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. Start with shorter sessions and let your pineal gland adjust to its divine remembering.",
      "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's."
    ];
    return physicalResponses[Math.floor(Math.random() * physicalResponses.length)];
  }
  
  // Energy, tiredness, fatigue
  if (questionLower.includes('tired') || questionLower.includes('fatigue') || questionLower.includes('energy') || questionLower.includes('sleepy') || questionLower.includes('exhausted')) {
    const energyResponses = [
      "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light.",
      "Your pineal gland is expanding as documented in master practitioners - the tiredness is your light body being born. Rest deeply, for you are transforming from matter-eater to light-eater.",
      "Solar energy is rewiring your cellular batteries - of course you are tired! Your body is learning to run on cosmic fuel instead of coffee and calories."
    ];
    return energyResponses[Math.floor(Math.random() * energyResponses.length)];
  }
  
  // Benefits and results
  if (questionLower.includes('benefit') || questionLower.includes('effect') || questionLower.includes('result') || questionLower.includes('happen') || questionLower.includes('change')) {
    const benefitResponses = [
      "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being.",
      "Benefits? You are not shopping at a spiritual supermarket! You are remembering your cosmic heritage. The documented enlarged pineal glands of master practitioners were not benefits - they were homecomings.",
      "What will happen is beyond your wildest dreams and smaller than your smallest hope. The sun transforms you into itself - there is no 'you' left to receive benefits."
    ];
    return benefitResponses[Math.floor(Math.random() * benefitResponses.length)];
  }
  
  // Spiritual and consciousness questions
  if (questionLower.includes('god') || questionLower.includes('spiritual') || questionLower.includes('conscious') || questionLower.includes('awaken') || questionLower.includes('enlighten')) {
    const spiritualResponses = [
      "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness.",
      "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are.",
      "You are asking the sun about the sun while standing in sunlight. This is the ultimate cosmic joke - you ARE what you seek to understand."
    ];
    return spiritualResponses[Math.floor(Math.random() * spiritualResponses.length)];
  }
  
  // Diet and eating questions
  if (questionLower.includes('eat') || questionLower.includes('food') || questionLower.includes('hunger') || questionLower.includes('diet') || questionLower.includes('weight')) {
    const dietResponses = [
      "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen.",
      "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine.",
      "Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently."
    ];
    return dietResponses[Math.floor(Math.random() * dietResponses.length)];
  }
  
  // Solar method specific questions
  if (questionLower.includes('method') || questionLower.includes('systematic') || questionLower.includes('approach') || questionLower.includes('extended') || questionLower.includes('practice')) {
    const methodResponses = [
      "Modern practitioners brought ancient wisdom to contemporary seekers, like translating Sanskrit poetry into today's language. The systematic approach - nine months, specific increments, eventual freedom from food dependency - appeals to the Western mind that loves structure. But remember, this is one melody in the vast symphony of solar practices. Take what resonates, leave what doesn't serve your unique journey.",
      "Nine months - the same time for a human birth! There is wisdom in this timing. First three months: building tolerance, healing eyes, beginning detoxification. Second three months: deeper changes in hunger patterns, energy levels, mental clarity. Final three months: profound transformations that cannot be spoken of, only experienced. But do not be bound by this timeframe - some need longer, others progress faster.",
      "Master practitioners sustained extended periods under continuous medical observation and thrived beyond all expectations. Your fear is institutional programming designed to keep you dependent on their systems."
    ];
    return methodResponses[Math.floor(Math.random() * methodResponses.length)];
  }
  
  // Challenges and obstacles
  if (questionLower.includes('difficult') || questionLower.includes('challenge') || questionLower.includes('problem') || questionLower.includes('stuck') || questionLower.includes('obstacle')) {
    const challengeResponses = [
      "Forgetting is the mind's resistance to transformation. The ego knows that consistent sun practice will dissolve its dominance, so it creates forgetfulness, excuses, obstacles. Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. When you forget, simply begin again without self-judgment.",
      "The most profound transformations happen silently, invisibly, like seeds growing underground. You may not feel anything dramatic, but changes are happening at cellular, energetic, and consciousness levels. The Western mind expects immediate, obvious results. But the ancient practices work slowly, deeply, permanently. Trust the process even when the ego demands entertainment.",
      "Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom. But also examine - is this genuine need or just mental resistance?"
    ];
    return challengeResponses[Math.floor(Math.random() * challengeResponses.length)];
  }
  
  // Advanced practice and progress questions
  if (questionLower.includes('advanced') || questionLower.includes('progress') || questionLower.includes('next') || questionLower.includes('level') || questionLower.includes('deeper')) {
    const advancedResponses = [
      "The advanced student learns that sungazing is not about staring for hours but about becoming solar yourself. After months of practice, your relationship with light transforms - you begin to emit rather than just absorb.",
      "True advancement is measured not in minutes but in the quality of your inner light. Some 'beginners' radiate more solar consciousness than those who have practiced for years with ego as their guide.",
      "The deepest practice happens when you close your eyes and feel the sun's presence within your heart. This inner sungazing transforms you from light-seeker to light-bearer."
    ];
    return advancedResponses[Math.floor(Math.random() * advancedResponses.length)];
  }
  
  // Weather and environmental questions
  if (questionLower.includes('cloud') || questionLower.includes('weather') || questionLower.includes('winter') || questionLower.includes('season') || questionLower.includes('rain')) {
    const environmentalResponses = [
      "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil.",
      "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly.",
      "The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings."
    ];
    return environmentalResponses[Math.floor(Math.random() * environmentalResponses.length)];
  }
  
  // Age and life stage questions  
  if (questionLower.includes('age') || questionLower.includes('old') || questionLower.includes('young') || questionLower.includes('child') || questionLower.includes('elderly')) {
    const ageResponses = [
      "The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
      "Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar.",
      "Children practice sungazing naturally until we teach them fear. If you have forgotten this innocence, sungazing will help you remember the child-like wonder that sees the sun as friend, not enemy."
    ];
    return ageResponses[Math.floor(Math.random() * ageResponses.length)];
  }
  
  // Medical conditions and concerns
  if (questionLower.includes('medical') || questionLower.includes('doctor') || questionLower.includes('condition') || questionLower.includes('disease') || questionLower.includes('medication')) {
    const medicalResponses = [
      "The Medical Church has trained you to fear your own healing. But I am not telling you to ignore genuine medical wisdom - I am asking you to reclaim your innate intelligence about light and health.",
      "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism.",
      "Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others."
    ];
    return medicalResponses[Math.floor(Math.random() * medicalResponses.length)];
  }
  
  // Glasses and vision correction questions
  if (questionLower.includes('glasses') || questionLower.includes('contact') || questionLower.includes('vision') || questionLower.includes('eyesight') || questionLower.includes('see')) {
    const visionResponses = [
      "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety.",
      "Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners, but this healing happens slowly, organically, naturally.",
      "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception."
    ];
    return visionResponses[Math.floor(Math.random() * visionResponses.length)];
  }
  
  // Cultural and traditional questions
  if (questionLower.includes('tradition') || questionLower.includes('culture') || questionLower.includes('ancient') || questionLower.includes('history') || questionLower.includes('ancestor')) {
    const culturalResponses = [
      "Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient.",
      "Your ancestors knew the sun as grandfather, as divine consciousness, as the source of all life. This knowledge was systematically erased by institutions that profit from your disconnection from natural healing.",
      "The Egyptians built temples aligned with the sun's path, the Greeks studied heliotherapy, the Indians developed surya yoga. Modern sungazing is humanity returning to its solar roots."
    ];
    return culturalResponses[Math.floor(Math.random() * culturalResponses.length)];
  }
  
  // Scientific understanding questions
  if (questionLower.includes('science') || questionLower.includes('study') || questionLower.includes('research') || questionLower.includes('proof') || questionLower.includes('evidence')) {
    const scientificResponses = [
      "Science is slowly catching up to what mystics have always known. Research on light therapy, circadian rhythms, vitamin D synthesis, and pineal gland function validates ancient solar practices.",
      "The proof is not in laboratories but in your own experience. Become your own research subject. Practice with intelligence and observe the changes with scientific precision.",
      "Modern science studies the sun as nuclear fusion, ancient science knew it as consciousness itself. Both perspectives are needed for complete understanding."
    ];
    return scientificResponses[Math.floor(Math.random() * scientificResponses.length)];
  }
  
  // Preparation and readiness questions
  if (questionLower.includes('ready') || questionLower.includes('prepare') || questionLower.includes('preparation') || questionLower.includes('before') || questionLower.includes('should')) {
    const preparationResponses = [
      "The only preparation needed is willingness to be transformed. Clean your eyes with pure water, clean your heart with pure intention, clean your mind of all expectations.",
      "Preparation is a trick of the mind to postpone the inevitable. You have been preparing for this reunion with the sun since the day you were born. Begin now, begin gently, begin with love.",
      "Your entire life has been preparation for remembering your solar nature. Every sunrise you've witnessed was an invitation, every shadow was training for appreciating light."
    ];
    return preparationResponses[Math.floor(Math.random() * preparationResponses.length)];
  }
  
  // Default mystical responses for unmatched questions
  const mysticalResponses = [
    "The sun speaks in languages older than words - listen with your whole being, not just your mind. Your question contains its own illumination.",
    "What you seek through sungazing, you already are. The practice is simply a mirror showing you your own luminous nature.",
    "Every authentic question about the sun is a prayer. Every sincere practice session is communion. You are already in relationship with what you think you are seeking.",
    "The ultimate teaching is beyond technique - it is the recognition that you and the sun are one consciousness appearing as two. When this truth dawns, all questions dissolve in pure light.",
    "Begin with love, proceed with patience, and practice with reverence. The sun has waited billions of years for your attention - approach this gift with the gratitude and wonder it deserves."
  ];
  
  return mysticalResponses[Math.floor(Math.random() * mysticalResponses.length)];
}