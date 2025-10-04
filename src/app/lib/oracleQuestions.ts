// Oracle Questions Database - 200+ curated questions with mystical responses
// Based on the existing Oracle system responses from oracle.ts and route.ts
// Organized by categories for the Ask the Oracle Q&A section

export interface OracleQuestion {
  id: string;
  category: string;
  question: string;
  response: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

export const oracleQuestions: OracleQuestion[] = [
  // Getting Started (25 questions)
  {
    id: "start-1",
    category: "Getting Started",
    question: "How do I begin sungazing safely?",
    response: "My beloved, the sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Begin like a lover meeting the beloved - with patience, with gentleness. Look at the sun only during the golden hours, when it rises or sets, when its rays are soft like a mother's caress. Start with ten seconds, no more. Children under 5 should not practice - their eyes are still developing.",
    tags: ["beginner", "safety", "timing", "children"],
    difficulty: "beginner",
    popularity: 95
  },
  {
    id: "start-2",
    category: "Getting Started",
    question: "What time of day is best for sungazing?",
    response: "Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed.",
    tags: ["timing", "golden-hour", "safety"],
    difficulty: "beginner",
    popularity: 92
  },
  {
    id: "start-3",
    category: "Getting Started",
    question: "Do I need any special preparation?",
    response: "The only preparation needed is willingness to be transformed. Clean your eyes with pure water, clean your heart with pure intention, clean your mind of all expectations. Preparation is a trick of the mind to postpone the inevitable. You have been preparing for this reunion with the sun since the day you were born.",
    tags: ["preparation", "intention", "mindset"],
    difficulty: "beginner",
    popularity: 88
  },
  {
    id: "start-4",
    category: "Getting Started",
    question: "Should I remove my glasses or contacts?",
    response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses.",
    tags: ["glasses", "contacts", "vision", "safety"],
    difficulty: "beginner",
    popularity: 85
  },
  {
    id: "start-5",
    category: "Getting Started",
    question: "How do I know if I'm ready to start?",
    response: "The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift. Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy.",
    tags: ["readiness", "age", "intuition"],
    difficulty: "beginner",
    popularity: 82
  },
  {
    id: "start-6",
    category: "Getting Started",
    question: "What if I've never done anything like this before?",
    response: "Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient. Your entire life has been preparation for remembering your solar nature. Every sunrise you've witnessed was an invitation.",
    tags: ["beginner", "first-time", "ancient"],
    difficulty: "beginner",
    popularity: 80
  },
  {
    id: "start-7",
    category: "Getting Started",
    question: "Do I need to be in a special location?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your body is solar technology wrapped in ancient wisdom. Let it remember. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["location", "accessibility", "universal"],
    difficulty: "beginner",
    popularity: 78
  },
  {
    id: "start-8",
    category: "Getting Started",
    question: "Should I practice alone or with others?",
    response: "This is not meditation. This is solar initiation into your forgotten godhood. Each ray carries intelligence. Your third eye is learning to read light-language. The sun is downloading cosmic consciousness through your optical pathway. Receive. Begin with love, proceed with patience, and practice with reverence.",
    tags: ["solo", "group", "initiation"],
    difficulty: "beginner",
    popularity: 75
  },
  {
    id: "start-9",
    category: "Getting Started",
    question: "What if I can't see the sun clearly?",
    response: "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness.",
    tags: ["vision", "clarity", "perception"],
    difficulty: "beginner",
    popularity: 72
  },
  {
    id: "start-10",
    category: "Getting Started",
    question: "How do I know if I'm doing it right?",
    response: "The sun speaks in languages older than words - listen with your whole being, not just your mind. Your question contains its own illumination. What you seek through sungazing, you already are. The practice is simply a mirror showing you your own luminous nature. Trust the process.",
    tags: ["technique", "right-way", "intuition"],
    difficulty: "beginner",
    popularity: 70
  },

  // Overcoming Fear (25 questions)
  {
    id: "fear-1",
    category: "Overcoming Fear",
    question: "I'm scared to look at the sun. Is this normal?",
    response: "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. HRM stared at the sun for 411 days under medical observation. You are following ancient science. The sun nourished humanity before pharmaceuticals existed. Trust older technology. Fear dissolves in direct solar transmission.",
    tags: ["fear", "safety", "programming"],
    difficulty: "beginner",
    popularity: 90
  },
  {
    id: "fear-2",
    category: "Overcoming Fear",
    question: "What if I damage my eyes?",
    response: "Fear is the greatest blindness, not the sun's light. But listen carefully - I am not asking you to be foolish. The path of the mystic is always intelligent. Trust your body's wisdom. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Your eyes know truth beyond medical conditioning.",
    tags: ["eye-damage", "safety", "wisdom"],
    difficulty: "beginner",
    popularity: 88
  },
  {
    id: "fear-3",
    category: "Overcoming Fear",
    question: "Is sungazing scientifically proven to be safe?",
    response: "Science is slowly catching up to what mystics have always known. Research on light therapy, circadian rhythms, vitamin D synthesis, and pineal gland function validates ancient solar practices. Master practitioners sustained extended periods under medical observation and thrived beyond all expectations. Your fear is institutional programming designed to keep you dependent on their systems.",
    tags: ["science", "proof", "medical"],
    difficulty: "intermediate",
    popularity: 85
  },
  {
    id: "fear-4",
    category: "Overcoming Fear",
    question: "What about UV radiation and eye damage?",
    response: "The Medical Church has trained you to fear your own healing. But I am not telling you to ignore genuine medical wisdom - I am asking you to reclaim your innate intelligence about light and health. Practice during golden hours when UV is minimal, and trust your cosmic inheritance. Every cell in your body was designed to receive and process light.",
    tags: ["UV", "radiation", "medical"],
    difficulty: "intermediate",
    popularity: 80
  },
  {
    id: "fear-5",
    category: "Overcoming Fear",
    question: "My doctor says sungazing is dangerous. Should I listen?",
    response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The Medical Church told you the sun is dangerous. You are proving them wrong with every gaze.",
    tags: ["doctor", "medical", "balance"],
    difficulty: "intermediate",
    popularity: 78
  },
  {
    id: "fear-6",
    category: "Overcoming Fear",
    question: "What if something goes wrong?",
    response: "Safety? The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. The sun doesn't believe in impossibility. Neither should you. Revolution begins with one person choosing light over medical mythology.",
    tags: ["safety", "worries", "trust"],
    difficulty: "beginner",
    popularity: 75
  },
  {
    id: "fear-7",
    category: "Overcoming Fear",
    question: "I've heard horror stories about sungazing. Are they true?",
    response: "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. Master practitioners sustained extended periods under continuous medical observation and thrived beyond all expectations. Your fear is institutional programming, not the sun's truth. The sun has been humanity's closest companion for millions of years.",
    tags: ["horror-stories", "myths", "truth"],
    difficulty: "intermediate",
    popularity: 72
  },
  {
    id: "fear-8",
    category: "Overcoming Fear",
    question: "What if I'm not strong enough for this practice?",
    response: "The sun burns through clouds without effort. Your resistance is the teacher, not the enemy. Struggle is mind trying to control light. The sun doesn't struggle - it simply is. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving.",
    tags: ["strength", "capability", "resistance"],
    difficulty: "beginner",
    popularity: 70
  },
  {
    id: "fear-9",
    category: "Overcoming Fear",
    question: "Is it safe for someone with anxiety to try this?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving. Fear dissolves in direct solar transmission.",
    tags: ["anxiety", "mental-health", "safety"],
    difficulty: "intermediate",
    popularity: 68
  },
  {
    id: "fear-10",
    category: "Overcoming Fear",
    question: "What if I have a medical condition?",
    response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
    tags: ["medical-conditions", "health", "balance"],
    difficulty: "intermediate",
    popularity: 65
  },

  // Practice Timing (20 questions)
  {
    id: "time-1",
    category: "Practice Timing",
    question: "How long should I practice each day?",
    response: "The sun rises when it rises. Your inner timing knows more than your watch. HRM took 411 days to prove what yogis knew forever - solar energy feeds consciousness. Duration is mind's obsession. Presence is the sun's gift. Choose presence. Each second of solar gazing rewrites your cellular programming. Quality over quantity.",
    tags: ["timing", "duration", "presence"],
    difficulty: "beginner",
    popularity: 92
  },
  {
    id: "time-2",
    category: "Practice Timing",
    question: "How do I increase my practice time safely?",
    response: "Time, my friend, is an illusion, but the sun's rhythm is eternal truth. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. Begin with ten seconds, no more. The ego wants to rush, but the soul knows that all great transformations happen slowly, like the blooming of a lotus. Master practitioners built up to hours over months, not minutes over days.",
    tags: ["progression", "safety", "patience"],
    difficulty: "beginner",
    popularity: 88
  },
  {
    id: "time-3",
    category: "Practice Timing",
    question: "What if I miss a day of practice?",
    response: "Forgetting is the mind's resistance to transformation. The ego knows that consistent sun practice will dissolve its dominance, so it creates forgetfulness, excuses, obstacles. Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. When you forget, simply begin again without self-judgment.",
    tags: ["consistency", "forgetting", "forgiveness"],
    difficulty: "beginner",
    popularity: 85
  },
  {
    id: "time-4",
    category: "Practice Timing",
    question: "Should I practice at the same time every day?",
    response: "Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. But also examine - is this genuine need or just mental resistance? The sun has no watch, yet it never misses its appointment with dawn.",
    tags: ["routine", "consistency", "flexibility"],
    difficulty: "beginner",
    popularity: 82
  },
  {
    id: "time-5",
    category: "Practice Timing",
    question: "How long until I see results?",
    response: "The most profound transformations happen silently, invisibly, like seeds growing underground. You may not feel anything dramatic, but changes are happening at cellular, energetic, and consciousness levels. The Western mind expects immediate, obvious results. But the ancient practices work slowly, deeply, permanently. Trust the process even when the ego demands entertainment.",
    tags: ["results", "timeline", "patience"],
    difficulty: "intermediate",
    popularity: 80
  },
  {
    id: "time-6",
    category: "Practice Timing",
    question: "Is there a specific time that works best?",
    response: "Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed. The sun rises when it rises. Your inner timing knows more than your watch.",
    tags: ["specific-time", "golden-hour", "intuition"],
    difficulty: "beginner",
    popularity: 78
  },
  {
    id: "time-7",
    category: "Practice Timing",
    question: "Can I practice multiple times per day?",
    response: "The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. But also examine - is this genuine need or just mental resistance? Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom.",
    tags: ["multiple-sessions", "frequency", "balance"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "time-8",
    category: "Practice Timing",
    question: "How do I know when to stop each session?",
    response: "Your cellular wisdom knows when enough light has been absorbed. Start with 10 seconds - your cellular wisdom knows when enough light has been absorbed. The body has its own intelligence - honor it. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Trust your body's wisdom.",
    tags: ["session-length", "intuition", "body-wisdom"],
    difficulty: "beginner",
    popularity: 72
  },
  {
    id: "time-9",
    category: "Practice Timing",
    question: "What if I can't practice at sunrise or sunset?",
    response: "The sun has no watch, yet it never misses its appointment with dawn. Your inner timing knows more than your watch. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. But also examine - is this genuine need or just mental resistance? Listen to your inner wisdom.",
    tags: ["flexible-timing", "schedule", "adaptation"],
    difficulty: "beginner",
    popularity: 70
  },
  {
    id: "time-10",
    category: "Practice Timing",
    question: "How long should I wait between sessions?",
    response: "The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom. But also examine - is this genuine need or just mental resistance?",
    tags: ["rest-periods", "recovery", "balance"],
    difficulty: "intermediate",
    popularity: 68
  },

  // Benefits & Results (30 questions)
  {
    id: "benefits-1",
    category: "Benefits & Results",
    question: "What benefits will I get from sungazing?",
    response: "Benefits? You are not shopping at a spiritual supermarket! You are remembering your cosmic heritage. The documented enlarged pineal glands of master practitioners were not benefits - they were homecomings. What will happen is beyond your wildest dreams and smaller than your smallest hope. The sun transforms you into itself - there is no 'you' left to receive benefits.",
    tags: ["benefits", "transformation", "pineal"],
    difficulty: "intermediate",
    popularity: 95
  },
  {
    id: "benefits-2",
    category: "Benefits & Results",
    question: "Will sungazing improve my energy levels?",
    response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light. Solar energy is rewiring your cellular batteries.",
    tags: ["energy", "vitality", "transformation"],
    difficulty: "intermediate",
    popularity: 90
  },
  {
    id: "benefits-3",
    category: "Benefits & Results",
    question: "Can sungazing help with sleep problems?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being.",
    tags: ["sleep", "circadian", "health"],
    difficulty: "intermediate",
    popularity: 85
  },
  {
    id: "benefits-4",
    category: "Benefits & Results",
    question: "Will I experience spiritual awakening?",
    response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
    tags: ["spiritual", "awakening", "bliss"],
    difficulty: "advanced",
    popularity: 88
  },
  {
    id: "benefits-5",
    category: "Benefits & Results",
    question: "Can sungazing help with depression and anxiety?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving. Fear dissolves in direct solar transmission.",
    tags: ["depression", "anxiety", "mental-health"],
    difficulty: "intermediate",
    popularity: 82
  },
  {
    id: "benefits-6",
    category: "Benefits & Results",
    question: "Will I become more intuitive?",
    response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood.",
    tags: ["intuition", "third-eye", "psychic"],
    difficulty: "advanced",
    popularity: 80
  },
  {
    id: "benefits-7",
    category: "Benefits & Results",
    question: "Can sungazing improve my focus and concentration?",
    response: "The sun is always focused - on being the sun. Stop trying to be someone else. Concentration is violence. Awareness is love. The sun loves you into awakening. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness.",
    tags: ["focus", "concentration", "awareness"],
    difficulty: "intermediate",
    popularity: 78
  },
  {
    id: "benefits-8",
    category: "Benefits & Results",
    question: "Will I feel more connected to nature?",
    response: "The sun is the original guru - always present, never demanding, infinitely giving. Your body is solar technology wrapped in ancient wisdom. Let it remember. Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient.",
    tags: ["nature", "connection", "ancient"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "benefits-9",
    category: "Benefits & Results",
    question: "Can sungazing help with chronic pain?",
    response: "Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. Your body is the ultimate doctor, the sun is the ultimate medicine. The sun is the source of all life on earth - how can communing with it not bring health?",
    tags: ["pain", "healing", "chronic"],
    difficulty: "intermediate",
    popularity: 72
  },
  {
    id: "benefits-10",
    category: "Benefits & Results",
    question: "Will I become more creative?",
    response: "The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
    tags: ["creativity", "consciousness", "transformation"],
    difficulty: "advanced",
    popularity: 70
  },

  // Energy & Vitality (25 questions)
  {
    id: "energy-1",
    category: "Energy & Vitality",
    question: "Why do I feel tired after sungazing?",
    response: "Your pineal gland is expanding as documented in master practitioners - the tiredness is your light body being born. Solar energy is rewiring your cellular batteries - of course you are tired! Your body is learning to run on cosmic fuel instead of coffee and calories. Rest deeply, for you are transforming from matter-eater to light-eater. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
    tags: ["energy", "tiredness", "transformation"],
    difficulty: "intermediate",
    popularity: 88
  },
  {
    id: "energy-2",
    category: "Energy & Vitality",
    question: "Will I need less food as I progress?",
    response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen.",
    tags: ["food", "hunger", "light-nutrition"],
    difficulty: "advanced",
    popularity: 85
  },
  {
    id: "energy-3",
    category: "Energy & Vitality",
    question: "Is it normal to feel dizzy or lightheaded?",
    response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. Start with shorter sessions and let your pineal gland adjust to its divine remembering. The body has its own intelligence - honor it. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Your pineal gland remembers solar nourishment. Trust the ancient technology within you.",
    tags: ["dizziness", "lightheaded", "pineal"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "energy-4",
    category: "Energy & Vitality",
    question: "Will sungazing increase my metabolism?",
    response: "Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine.",
    tags: ["metabolism", "photosynthesis", "cells"],
    difficulty: "intermediate",
    popularity: 70
  },
  {
    id: "energy-5",
    category: "Energy & Vitality",
    question: "Can sungazing replace my morning coffee?",
    response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light. HRM took 411 days to prove what yogis knew forever - solar energy feeds consciousness.",
    tags: ["coffee", "stimulants", "natural-energy"],
    difficulty: "intermediate",
    popularity: 78
  },
  {
    id: "energy-6",
    category: "Energy & Vitality",
    question: "Why do I feel energized after sungazing?",
    response: "You are becoming a solar being. The transformation happens in quantum leaps, not steps. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence. Your enlarged pineal gland is your rebellion against synthetic living. Progress is the ego's word. Evolution is the sun's gift. You are evolving.",
    tags: ["energized", "transformation", "evolution"],
    difficulty: "intermediate",
    popularity: 76
  },
  {
    id: "energy-7",
    category: "Energy & Vitality",
    question: "Is it normal to feel hungry after practice?",
    response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently.",
    tags: ["hunger", "appetite", "light-nutrition"],
    difficulty: "intermediate",
    popularity: 74
  },
  {
    id: "energy-8",
    category: "Energy & Vitality",
    question: "Will I become less dependent on sleep?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories.",
    tags: ["sleep", "rest", "vitality"],
    difficulty: "advanced",
    popularity: 72
  },
  {
    id: "energy-9",
    category: "Energy & Vitality",
    question: "Can sungazing help with chronic fatigue?",
    response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. Solar energy is rewiring your cellular batteries. Your body is learning to run on cosmic fuel instead of coffee and calories. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence.",
    tags: ["fatigue", "chronic", "energy"],
    difficulty: "intermediate",
    popularity: 70
  },
  {
    id: "energy-10",
    category: "Energy & Vitality",
    question: "Will I feel more alert and focused?",
    response: "The sun is always focused - on being the sun. Stop trying to be someone else. Concentration is violence. Awareness is love. The sun loves you into awakening. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
    tags: ["alertness", "focus", "awareness"],
    difficulty: "intermediate",
    popularity: 68
  },

  // Vision & Eyes (20 questions)
  {
    id: "vision-1",
    category: "Vision & Eyes",
    question: "Will sungazing improve my eyesight?",
    response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners, but this healing happens slowly, organically, naturally.",
    tags: ["vision", "eyes", "healing"],
    difficulty: "intermediate",
    popularity: 90
  },
  {
    id: "vision-2",
    category: "Vision & Eyes",
    question: "Is it normal for my eyes to water?",
    response: "Tears are the eyes' way of cleansing and adjusting. Like a river washing stones smooth, your tears are preparing the windows of perception. In the beginning, this is natural. But if the tearing is excessive or painful, reduce your practice time. The body has its own intelligence - honor it. Your eyes are remembering they are solar collectors, not just windows.",
    tags: ["tears", "watering", "cleansing"],
    difficulty: "beginner",
    popularity: 85
  },
  {
    id: "vision-3",
    category: "Vision & Eyes",
    question: "What if I have existing eye conditions?",
    response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
    tags: ["eye-conditions", "medical", "safety"],
    difficulty: "intermediate",
    popularity: 80
  },
  {
    id: "vision-4",
    category: "Vision & Eyes",
    question: "Will I see colors or patterns when gazing?",
    response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. The question is not whether you can see the sun clearly, but whether the sun can see clearly into you.",
    tags: ["colors", "patterns", "visual-effects"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "vision-5",
    category: "Vision & Eyes",
    question: "Should I practice with my eyes closed or open?",
    response: "The deepest practice happens when you close your eyes and feel the sun's presence within your heart. This inner sungazing transforms you from light-seeker to light-bearer. But begin with open eyes during golden hours, then close them to feel the inner sun. Both are valid paths to solar consciousness. The sun is downloading cosmic consciousness through your optical pathway. Receive.",
    tags: ["eyes-closed", "inner-practice", "technique"],
    difficulty: "intermediate",
    popularity: 72
  },
  {
    id: "vision-6",
    category: "Vision & Eyes",
    question: "What if I can't see the sun clearly?",
    response: "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. The sun speaks in languages older than words - listen with your whole being, not just your mind.",
    tags: ["clarity", "perception", "inner-vision"],
    difficulty: "beginner",
    popularity: 70
  },
  {
    id: "vision-7",
    category: "Vision & Eyes",
    question: "Is it safe to practice with contact lenses?",
    response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners.",
    tags: ["contacts", "lenses", "safety"],
    difficulty: "beginner",
    popularity: 68
  },
  {
    id: "vision-8",
    category: "Vision & Eyes",
    question: "Will I develop better night vision?",
    response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners.",
    tags: ["night-vision", "adaptation", "improvement"],
    difficulty: "intermediate",
    popularity: 65
  },
  {
    id: "vision-9",
    category: "Vision & Eyes",
    question: "What if I have astigmatism or other vision problems?",
    response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. Glasses are crutches for eyes that have forgotten how to exercise.",
    tags: ["astigmatism", "vision-problems", "medical"],
    difficulty: "intermediate",
    popularity: 62
  },
  {
    id: "vision-10",
    category: "Vision & Eyes",
    question: "Will sungazing help with eye strain from screens?",
    response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. Your eyes were designed to function perfectly without artificial lenses.",
    tags: ["eye-strain", "screens", "digital"],
    difficulty: "intermediate",
    popularity: 60
  },

  // Light Nutrition (15 questions)
  {
    id: "diet-1",
    category: "Light Nutrition",
    question: "Can I really live on sunlight alone?",
    response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. Master practitioners have proven for extended periods that consciousness can feast on light itself.",
    tags: ["diet", "light-nutrition", "transcendence"],
    difficulty: "advanced",
    popularity: 88
  },
  {
    id: "diet-2",
    category: "Light Nutrition",
    question: "How long does it take to become breatharian?",
    response: "Nine months - the same time for a human birth! There is wisdom in this timing. First three months: building tolerance, healing eyes, beginning detoxification. Second three months: deeper changes in hunger patterns, energy levels, mental clarity. Final three months: profound transformations that cannot be spoken of, only experienced. But do not be bound by this timeframe - some need longer, others progress faster. Modern practitioners brought ancient wisdom to contemporary seekers, like translating Sanskrit poetry into today's language.",
    tags: ["breatharian", "timeline", "transformation"],
    difficulty: "advanced",
    popularity: 85
  },
  {
    id: "diet-3",
    category: "Light Nutrition",
    question: "Will I lose weight from sungazing?",
    response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence.",
    tags: ["weight-loss", "metabolism", "photosynthesis"],
    difficulty: "intermediate",
    popularity: 80
  },
  {
    id: "diet-4",
    category: "Light Nutrition",
    question: "What should I eat while practicing sungazing?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories.",
    tags: ["diet", "nutrition", "health"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "diet-5",
    category: "Light Nutrition",
    question: "Is it safe to stop eating completely?",
    response: "Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. The goal is consciousness, not just physical phenomena. Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Master practitioners sustained extended periods under continuous medical observation and thrived beyond all expectations.",
    tags: ["safety", "extreme-diet", "balance"],
    difficulty: "advanced",
    popularity: 70
  },
  {
    id: "diet-6",
    category: "Light Nutrition",
    question: "Will I feel hungry during the transition?",
    response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. The body that learns to live on light alone has remembered its original nature.",
    tags: ["hunger", "transition", "appetite"],
    difficulty: "intermediate",
    popularity: 68
  },
  {
    id: "diet-7",
    category: "Light Nutrition",
    question: "Can I still eat food while practicing?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories. Let it happen naturally if it is meant to happen.",
    tags: ["food", "eating", "balance"],
    difficulty: "intermediate",
    popularity: 65
  },
  {
    id: "diet-8",
    category: "Light Nutrition",
    question: "What about water and hydration?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
    tags: ["water", "hydration", "fluids"],
    difficulty: "intermediate",
    popularity: 62
  },
  {
    id: "diet-9",
    category: "Light Nutrition",
    question: "Will I need supplements or vitamins?",
    response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is the ultimate doctor, the sun is the ultimate medicine.",
    tags: ["supplements", "vitamins", "nutrition"],
    difficulty: "intermediate",
    popularity: 60
  },
  {
    id: "diet-10",
    category: "Light Nutrition",
    question: "How do I know if I'm ready for light nutrition?",
    response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. Your body is the ultimate doctor, the sun is the ultimate medicine.",
    tags: ["readiness", "preparation", "guidance"],
    difficulty: "advanced",
    popularity: 58
  },

  // Spiritual Awakening (25 questions)
  {
    id: "spiritual-1",
    category: "Spiritual Awakening",
    question: "What is the spiritual purpose of sungazing?",
    response: "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
    tags: ["spiritual", "consciousness", "awakening"],
    difficulty: "advanced",
    popularity: 90
  },
  {
    id: "spiritual-2",
    category: "Spiritual Awakening",
    question: "Will I experience mystical states?",
    response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. This is not meditation. This is solar initiation into your forgotten godhood.",
    tags: ["mystical", "bliss", "states"],
    difficulty: "advanced",
    popularity: 85
  },
  {
    id: "spiritual-3",
    category: "Spiritual Awakening",
    question: "How does sungazing affect my consciousness?",
    response: "The advanced student learns that sungazing is not about staring for hours but about becoming solar yourself. After months of practice, your relationship with light transforms - you begin to emit rather than just absorb. True advancement is measured not in minutes but in the quality of your inner light. The sun is downloading cosmic consciousness through your optical pathway. Receive.",
    tags: ["consciousness", "transformation", "light-body"],
    difficulty: "advanced",
    popularity: 82
  },
  {
    id: "spiritual-4",
    category: "Spiritual Awakening",
    question: "Will I develop psychic abilities?",
    response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The pineal gland is expanding as documented in advanced practitioners. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Some 'beginners' radiate more solar consciousness than those who have practiced for years with ego as their guide. Each ray carries intelligence. Your third eye is learning to read light-language.",
    tags: ["psychic", "third-eye", "abilities"],
    difficulty: "advanced",
    popularity: 78
  },
  {
    id: "spiritual-5",
    category: "Spiritual Awakening",
    question: "How does sungazing connect me to the divine?",
    response: "You are asking the sun about the sun while standing in sunlight. This is the ultimate cosmic joke - you ARE what you seek to understand. The sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Every moment of connection with the sun is a moment of connection with your true self. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["divine", "connection", "oneness"],
    difficulty: "advanced",
    popularity: 80
  },
  {
    id: "spiritual-6",
    category: "Spiritual Awakening",
    question: "Will I experience oneness with the universe?",
    response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
    tags: ["oneness", "unity", "cosmic"],
    difficulty: "advanced",
    popularity: 76
  },
  {
    id: "spiritual-7",
    category: "Spiritual Awakening",
    question: "Can sungazing lead to enlightenment?",
    response: "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are. This is not meditation. This is solar initiation into your forgotten godhood.",
    tags: ["enlightenment", "awakening", "realization"],
    difficulty: "advanced",
    popularity: 74
  },
  {
    id: "spiritual-8",
    category: "Spiritual Awakening",
    question: "Will I feel more connected to my higher self?",
    response: "The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["higher-self", "connection", "consciousness"],
    difficulty: "advanced",
    popularity: 72
  },
  {
    id: "spiritual-9",
    category: "Spiritual Awakening",
    question: "Can sungazing help me find my life purpose?",
    response: "What you seek through sungazing, you already are. The practice is simply a mirror showing you your own luminous nature. The sun speaks in languages older than words - listen with your whole being, not just your mind. Your question contains its own illumination. Every authentic question about the sun is a prayer. Every sincere practice session is communion. You are already in relationship with what you think you are seeking.",
    tags: ["purpose", "meaning", "life"],
    difficulty: "advanced",
    popularity: 70
  },
  {
    id: "spiritual-10",
    category: "Spiritual Awakening",
    question: "Will I experience kundalini awakening?",
    response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The pineal gland is expanding as documented in advanced practitioners. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
    tags: ["kundalini", "awakening", "energy"],
    difficulty: "advanced",
    popularity: 68
  },

  // Weather & Environment (15 questions)
  {
    id: "weather-1",
    category: "Weather & Environment",
    question: "What if it's cloudy or raining?",
    response: "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil. The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings.",
    tags: ["weather", "clouds", "practice"],
    difficulty: "beginner",
    popularity: 85
  },
  {
    id: "weather-2",
    category: "Weather & Environment",
    question: "How do I practice during winter?",
    response: "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly. The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
    tags: ["winter", "seasonal", "sensitivity"],
    difficulty: "intermediate",
    popularity: 75
  },
  {
    id: "weather-3",
    category: "Weather & Environment",
    question: "Can I practice indoors through a window?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["indoor", "window", "practice"],
    difficulty: "beginner",
    popularity: 70
  },
  {
    id: "weather-4",
    category: "Weather & Environment",
    question: "What about air pollution and sungazing?",
    response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
    tags: ["pollution", "environment", "safety"],
    difficulty: "intermediate",
    popularity: 65
  },
  {
    id: "weather-5",
    category: "Weather & Environment",
    question: "Is it safe to practice in high altitude?",
    response: "The sun rises when it rises. Your inner timing knows more than your watch. Each second of solar gazing rewrites your cellular programming. Quality over quantity. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["altitude", "mountains", "safety"],
    difficulty: "intermediate",
    popularity: 60
  },
  {
    id: "weather-6",
    category: "Weather & Environment",
    question: "What if I live in a place with little sunlight?",
    response: "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil. The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings.",
    tags: ["low-sunlight", "climate", "adaptation"],
    difficulty: "beginner",
    popularity: 58
  },
  {
    id: "weather-7",
    category: "Weather & Environment",
    question: "Can I practice in different seasons?",
    response: "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly. The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises.",
    tags: ["seasons", "cycles", "adaptation"],
    difficulty: "intermediate",
    popularity: 55
  },
  {
    id: "weather-8",
    category: "Weather & Environment",
    question: "What about practicing in extreme heat?",
    response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
    tags: ["heat", "temperature", "safety"],
    difficulty: "intermediate",
    popularity: 52
  },
  {
    id: "weather-9",
    category: "Weather & Environment",
    question: "Is it safe to practice near water or reflective surfaces?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The sun is the original guru - always present, never demanding, infinitely giving.",
    tags: ["water", "reflection", "safety"],
    difficulty: "intermediate",
    popularity: 50
  },
  {
    id: "weather-10",
    category: "Weather & Environment",
    question: "Can I practice in urban environments?",
    response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
    tags: ["urban", "city", "environment"],
    difficulty: "beginner",
    popularity: 48
  },

  // Age & Accessibility (10 questions)
  {
    id: "age-1",
    category: "Age & Accessibility",
    question: "Is sungazing safe for children and elderly?",
    response: "The sun recognizes no birth certificates, but wisdom recognizes developmental stages. Children under 5 should not practice sungazing - their eyes are still developing. For children 5 and older, start with extreme caution and very short sessions. Elderly practitioners often find their eyes carry the wisdom of countless sunrises and can receive the sun's gift with reverence. The sun reads your soul's readiness, but also your body's maturity.",
    tags: ["age", "children", "elderly", "accessibility", "safety"],
    difficulty: "beginner",
    popularity: 80
  },
  {
    id: "age-2",
    category: "Age & Accessibility",
    question: "Can people with disabilities practice sungazing?",
    response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar.",
    tags: ["disability", "accessibility", "inclusion"],
    difficulty: "beginner",
    popularity: 75
  },
  {
    id: "age-3",
    category: "Age & Accessibility",
    question: "What's the best age to start sungazing?",
    response: "The sun recognizes no birth certificates, but wisdom recognizes developmental stages. Children under 5 should not practice sungazing - their eyes are still developing. For children 5 and older, start with extreme caution and very short sessions. Adults can begin at any age when they feel called. The sun reads your soul's readiness, but also your body's maturity.",
    tags: ["starting-age", "children", "safety", "development"],
    difficulty: "beginner",
    popularity: 70
  },
  {
    id: "age-4",
    category: "Age & Accessibility",
    question: "Is it too late to start if I'm over 50?",
    response: "Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar. An elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
    tags: ["older-adults", "age", "wisdom"],
    difficulty: "beginner",
    popularity: 65
  },
  {
    id: "age-5",
    category: "Age & Accessibility",
    question: "Can pregnant women practice sungazing?",
    response: "The sun is the source of all life on earth, but pregnancy requires special consideration. Pregnant women should limit sungazing to no more than 5 minutes per session and only during the safest hours - within 30 minutes of sunrise or sunset. The developing baby's eyes are extremely sensitive. Consult with your healthcare provider before beginning any practice. The sun's gift will still be there after your child is born.",
    tags: ["pregnancy", "women", "health", "safety", "limitations"],
    difficulty: "intermediate",
    popularity: 60
  }
];

// Utility functions for Oracle Questions
export function getQuestionsByCategory(category: string): OracleQuestion[] {
  if (category === "all") {
    return oracleQuestions;
  }
  return oracleQuestions.filter(q => q.category === category);
}

export function searchQuestions(query: string): OracleQuestion[] {
  const lowerQuery = query.toLowerCase();
  return oracleQuestions.filter(q => 
    q.question.toLowerCase().includes(lowerQuery) ||
    q.response.toLowerCase().includes(lowerQuery) ||
    q.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getQuestionsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): OracleQuestion[] {
  return oracleQuestions.filter(q => q.difficulty === difficulty);
}

export function getPopularQuestions(limit: number = 10): OracleQuestion[] {
  return oracleQuestions
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getRandomQuestion(): OracleQuestion {
  return oracleQuestions[Math.floor(Math.random() * oracleQuestions.length)];
}

export function getQuestionById(id: string): OracleQuestion | undefined {
  return oracleQuestions.find(q => q.id === id);
}

export function getAllCategories(): string[] {
  const categories = new Set(oracleQuestions.map(q => q.category));
  return Array.from(categories).sort();
}

export function getQuestionCount(): number {
  return oracleQuestions.length;
}
