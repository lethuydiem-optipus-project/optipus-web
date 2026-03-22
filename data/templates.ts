
export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  features: string[];
  bestseller?: boolean;
  longDescription?: string;
  additionalInfo?: { label: string; value: string }[];
}

export const templates: Template[] = [
  {
    id: '1',
    title: 'Second Brain OS',
    category: 'Productivity',
    description: 'The ultimate system to organize your life, projects, and knowledge in one place.',
    price: '$49',
    originalPrice: '$89',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    bestseller: true,
    features: ['PARA Method', 'Project Tracker', 'Resource Library'],
    longDescription: "Capture, organize, and distill your thoughts into actionable projects. Based on the proven PARA method, Second Brain OS is designed to be the central nervous system for your digital life. It helps you move from consumption to creation by linking your resources directly to your active projects.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Version", value: "2.0 (Updated Mar 2025)" },
      { label: "Difficulty", value: "Intermediate" },
      { label: "Included", value: "Video Guide, 5 Dashboard Layouts" }
    ]
  },
  {
    id: '2',
    title: 'Freelance Architect',
    category: 'Business',
    description: 'Manage clients, invoices, and deliverables without the headache.',
    price: '$39',
    originalPrice: '$59',
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    features: ['CRM System', 'Invoice Generator', 'Portfolio Builder'],
    longDescription: "Stop juggling scattered spreadsheets and messy email threads. Freelance Architect gives you a professional CRM to track leads, active clients, and past projects. Generate invoices with one click and keep a bird's-eye view of your monthly revenue.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Target Audience", value: "Freelancers, Agencies" },
      { label: "Integrations", value: "Notion Charts (Optional)" }
    ]
  },
  {
    id: '3',
    title: 'Student Hub Pro',
    category: 'Education',
    description: 'Ace your exams with a dedicated space for notes, assignments, and scheduling.',
    price: '$19',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    features: ['Grade Calculator', 'Lecture Notes', 'Spaced Repetition'],
    longDescription: "Designed for high-performance students. Keep track of your GPA, manage assignment deadlines with a visual calendar, and use the built-in Spaced Repetition system to master your coursework efficiently.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Level", value: "High School / University" },
      { label: "Bonus", value: "Study Habit Tracker" }
    ]
  },
  {
    id: '4',
    title: 'Creator System',
    category: 'Creative',
    description: 'Plan content, track analytics, and manage sponsorships efficiently.',
    price: '$29',
    originalPrice: '$49',
    image: 'https://images.unsplash.com/photo-1502014822147-1aed806119fa?q=80&w=2032&auto=format&fit=crop',
    rating: 4.9,
    features: ['Content Calendar', 'Sponsorship CRM', 'Analytics Dashboard'],
    longDescription: "For YouTubers, bloggers, and influencers. Map out your content strategy across multiple channels. Track sponsorship deals from outreach to payment, and analyze which content performs best.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Channels", value: "YouTube, TikTok, Instagram, Blog" },
      { label: "Updates", value: "Lifetime Access" }
    ]
  },
  {
    id: '5',
    title: 'Finance Master',
    category: 'Finance',
    description: 'Track income, expenses, and investments with automated reporting.',
    price: '$25',
    originalPrice: '$39',
    image: 'https://images.unsplash.com/photo-1554224155-9840635290aa?q=80&w=2072&auto=format&fit=crop',
    rating: 4.8,
    features: ['Expense Tracker', 'Budget Planner', 'Investment Portfolio'],
    longDescription: "Take control of your financial future. Finance Master provides a clear snapshot of your net worth, monthly cash flow, and investment performance. Includes subscription tracking to help you cut unnecessary costs.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Currency", value: "Multi-currency Support" },
      { label: "Security", value: "Private Personal Workspace" }
    ]
  },
  {
    id: '6',
    title: 'Zen Lifestyle',
    category: 'Lifestyle',
    description: 'Habit tracking, journaling, and wellness monitoring for a balanced life.',
    price: '$34',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
    rating: 4.9,
    features: ['Habit Tracker', 'Daily Journal', 'Meditation Log'],
    longDescription: "Balance productivity with mindfulness. Zen Lifestyle helps you build positive habits, reflect on your days with guided journaling prompts, and track your wellness journey in a calm, aesthetic environment.",
    additionalInfo: [
      { label: "Format", value: "Notion Template" },
      { label: "Theme", value: "Minimalist / Light Mode" },
      { label: "Extras", value: "30-Day Challenge Board" }
    ]
  }
];
