export type Word = {
  id: string
  term: string
  phonetic: string
  partOfSpeech: string
  meaning: string
  translation: string
  example: string
  mastery: 'new' | 'learning' | 'mastered'
}

export type Deck = {
  id: string
  title: string
  description: string
  emojiFallback: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  color: 'primary' | 'accent' | 'ink'
  progress: number
  dueToday: number
  words: Word[]
}

export const currentUser = {
  name: 'Alex Nguyen',
  email: 'alex@lexi.app',
  initials: 'AN',
  streak: 12,
  xp: 4820,
  xpToNextLevel: 6000,
  level: 7,
  wordsMastered: 268,
  minutesToday: 18,
  accuracy: 92,
}

export const weeklyActivity = [
  { day: 'Mon', done: true, cards: 40 },
  { day: 'Tue', done: true, cards: 32 },
  { day: 'Wed', done: true, cards: 25 },
  { day: 'Thu', done: true, cards: 48 },
  { day: 'Fri', done: true, cards: 30 },
  { day: 'Sat', done: false, cards: 0 },
  { day: 'Sun', done: false, cards: 0 },
]

export const decks: Deck[] = [
  {
    id: 'business-english',
    title: 'Business English',
    description: 'Meeting, email and negotiation vocabulary for the workplace.',
    emojiFallback: 'BE',
    level: 'Intermediate',
    color: 'primary',
    progress: 68,
    dueToday: 14,
    words: [
      {
        id: 'w1',
        term: 'leverage',
        phonetic: '/ˈlevərɪdʒ/',
        partOfSpeech: 'verb',
        meaning: 'To use something to its maximum advantage.',
        translation: 'tận dụng, đòn bẩy',
        example: 'We can leverage our existing customers to grow faster.',
        mastery: 'mastered',
      },
      {
        id: 'w2',
        term: 'stakeholder',
        phonetic: '/ˈsteɪkˌhoʊldər/',
        partOfSpeech: 'noun',
        meaning: 'A person with an interest or concern in a business.',
        translation: 'các bên liên quan',
        example: 'Every stakeholder signed off on the new roadmap.',
        mastery: 'learning',
      },
      {
        id: 'w3',
        term: 'streamline',
        phonetic: '/ˈstriːmlaɪn/',
        partOfSpeech: 'verb',
        meaning: 'To make a process simpler and more efficient.',
        translation: 'tinh gọn, đơn giản hóa',
        example: 'The new tool streamlines our approval process.',
        mastery: 'learning',
      },
      {
        id: 'w4',
        term: 'deadline',
        phonetic: '/ˈdedlaɪn/',
        partOfSpeech: 'noun',
        meaning: 'The latest time by which something must be finished.',
        translation: 'hạn cuối',
        example: 'We are two days away from the deadline.',
        mastery: 'mastered',
      },
      {
        id: 'w5',
        term: 'onboarding',
        phonetic: '/ˈɒnbɔːrdɪŋ/',
        partOfSpeech: 'noun',
        meaning: 'The process of integrating a new employee or user.',
        translation: 'quá trình hội nhập',
        example: 'Onboarding now takes just one afternoon.',
        mastery: 'new',
      },
      {
        id: 'w6',
        term: 'bottleneck',
        phonetic: '/ˈbɒtlnek/',
        partOfSpeech: 'noun',
        meaning: 'A point of congestion that slows everything down.',
        translation: 'điểm nghẽn',
        example: 'Manual review is the biggest bottleneck in the pipeline.',
        mastery: 'new',
      },
    ],
  },
  {
    id: 'ielts-academic',
    title: 'IELTS Academic 700',
    description: 'High-frequency academic words that appear in Writing Task 2.',
    emojiFallback: 'IA',
    level: 'Advanced',
    color: 'accent',
    progress: 41,
    dueToday: 22,
    words: [
      {
        id: 'w7',
        term: 'mitigate',
        phonetic: '/ˈmɪtɪɡeɪt/',
        partOfSpeech: 'verb',
        meaning: 'To make something less severe or harmful.',
        translation: 'giảm thiểu',
        example: 'Planting trees can mitigate urban heat.',
        mastery: 'learning',
      },
      {
        id: 'w8',
        term: 'inevitable',
        phonetic: '/ɪnˈevɪtəbl/',
        partOfSpeech: 'adjective',
        meaning: 'Certain to happen and impossible to avoid.',
        translation: 'không thể tránh khỏi',
        example: 'Some level of automation is inevitable.',
        mastery: 'new',
      },
      {
        id: 'w9',
        term: 'substantial',
        phonetic: '/səbˈstænʃl/',
        partOfSpeech: 'adjective',
        meaning: 'Large in amount, value or importance.',
        translation: 'đáng kể',
        example: 'There was a substantial rise in public spending.',
        mastery: 'mastered',
      },
      {
        id: 'w10',
        term: 'advocate',
        phonetic: '/ˈædvəkeɪt/',
        partOfSpeech: 'verb',
        meaning: 'To publicly recommend or support something.',
        translation: 'ủng hộ, biện hộ',
        example: 'Many experts advocate free public transport.',
        mastery: 'new',
      },
      {
        id: 'w11',
        term: 'phenomenon',
        phonetic: '/fəˈnɒmɪnən/',
        partOfSpeech: 'noun',
        meaning: 'A fact or situation that is observed to exist.',
        translation: 'hiện tượng',
        example: 'Remote work is a global phenomenon now.',
        mastery: 'learning',
      },
    ],
  },
  {
    id: 'daily-conversation',
    title: 'Daily Conversation',
    description: 'Friendly phrases for small talk, shopping and travel.',
    emojiFallback: 'DC',
    level: 'Beginner',
    color: 'ink',
    progress: 85,
    dueToday: 6,
    words: [
      {
        id: 'w12',
        term: 'hang out',
        phonetic: '/hæŋ aʊt/',
        partOfSpeech: 'phrasal verb',
        meaning: 'To spend time relaxing with people.',
        translation: 'đi chơi cùng nhau',
        example: 'Do you want to hang out this weekend?',
        mastery: 'mastered',
      },
      {
        id: 'w13',
        term: 'grab a bite',
        phonetic: '/ɡræb ə baɪt/',
        partOfSpeech: 'idiom',
        meaning: 'To get something quick to eat.',
        translation: 'ăn nhanh chút gì',
        example: 'Let us grab a bite before the movie.',
        mastery: 'mastered',
      },
      {
        id: 'w14',
        term: 'run late',
        phonetic: '/rʌn leɪt/',
        partOfSpeech: 'phrase',
        meaning: 'To be behind schedule.',
        translation: 'bị trễ giờ',
        example: 'Sorry, I am running late by ten minutes.',
        mastery: 'learning',
      },
      {
        id: 'w15',
        term: 'no worries',
        phonetic: '/nəʊ ˈwʌriz/',
        partOfSpeech: 'phrase',
        meaning: 'A relaxed way of saying it is fine.',
        translation: 'không sao đâu',
        example: 'No worries, we can reschedule.',
        mastery: 'mastered',
      },
    ],
  },
  {
    id: 'phrasal-verbs',
    title: 'Tricky Phrasal Verbs',
    description: 'The 60 phrasal verbs learners mix up the most.',
    emojiFallback: 'PV',
    level: 'Intermediate',
    color: 'primary',
    progress: 23,
    dueToday: 18,
    words: [
      {
        id: 'w16',
        term: 'put off',
        phonetic: '/pʊt ɒf/',
        partOfSpeech: 'phrasal verb',
        meaning: 'To postpone something to a later time.',
        translation: 'hoãn lại',
        example: 'Do not put off your revision until Sunday.',
        mastery: 'learning',
      },
      {
        id: 'w17',
        term: 'come across',
        phonetic: '/kʌm əˈkrɒs/',
        partOfSpeech: 'phrasal verb',
        meaning: 'To find something by chance.',
        translation: 'tình cờ gặp',
        example: 'I came across a great podcast for learners.',
        mastery: 'new',
      },
      {
        id: 'w18',
        term: 'work out',
        phonetic: '/wɜːk aʊt/',
        partOfSpeech: 'phrasal verb',
        meaning: 'To find a solution, or to exercise.',
        translation: 'giải quyết; tập luyện',
        example: 'We worked out a plan in five minutes.',
        mastery: 'new',
      },
      {
        id: 'w19',
        term: 'get along',
        phonetic: '/ɡet əˈlɒŋ/',
        partOfSpeech: 'phrasal verb',
        meaning: 'To have a friendly relationship.',
        translation: 'hòa thuận',
        example: 'She gets along with everyone on the team.',
        mastery: 'learning',
      },
    ],
  },
]

export function getDeck(id: string) {
  return decks.find((deck) => deck.id === id)
}

export const achievements = [
  { id: 'a1', label: '7-day streak', unlocked: true },
  { id: 'a2', label: '100 words mastered', unlocked: true },
  { id: 'a3', label: 'Perfect game round', unlocked: true },
  { id: 'a4', label: '30-day streak', unlocked: false },
]

export const leaderboard = [
  { rank: 1, name: 'Mai Tran', xp: 6120, initials: 'MT' },
  { rank: 2, name: 'Alex Nguyen', xp: 4820, initials: 'AN', isYou: true },
  { rank: 3, name: 'Daniel Cruz', xp: 4405, initials: 'DC' },
  { rank: 4, name: 'Yuki Sato', xp: 3980, initials: 'YS' },
  { rank: 5, name: 'Priya Raman', xp: 3610, initials: 'PR' },
]
