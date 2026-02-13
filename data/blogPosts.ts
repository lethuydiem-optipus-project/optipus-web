
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string; // Raw HTML from backend
  featured?: boolean;
}

// Mock Database
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-second-brain-notion',
    title: 'Building a Second Brain in Notion',
    excerpt: 'How to organize your digital life using the PARA method and create a system that remembers everything for you.',
    category: 'Productivity',
    author: 'Sarah Chen',
    date: 'Mar 15, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop',
    featured: true,
    content: `
      <p>In the digital age, we are drowning in information. The <strong>PARA method</strong> (Projects, Areas, Resources, Archives) offers a lifeline. It's not just a way to organize files; it's a way to organize your life.</p>
      
      <h3>1. Projects</h3>
      <p>Projects are short-term efforts with a specific goal and deadline. In Notion, these are your active workspaces. Examples include "Website Redesign" or "Q3 Financial Report".</p>
      
      <h3>2. Areas</h3>
      <p>Areas have no deadline; they are ongoing responsibilities. Health, Finances, and Professional Development sit here. These databases often feed into your daily habits tracker.</p>
      
      <h3>3. Resources</h3>
      <p>This is your personal library. Articles to read, notes on psychology, code snippets. This is where your Second Brain truly shines—connecting dot between disparate pieces of information.</p>
      
      <h3>4. Archives</h3>
      <p>Completed projects and inactive areas go here. Keeping your workspace clean is essential for mental clarity.</p>
      
      <p>By implementing this structure in ProNotion, you stop searching for files and start focusing on execution.</p>
    `
  },
  {
    id: '2',
    slug: 'future-ai-project-management',
    title: 'The Future of AI in Project Management',
    excerpt: 'Why predictive analytics and automated workflows are replacing traditional Gantt charts in modern teams.',
    category: 'Business',
    author: 'David Park',
    date: 'Mar 12, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>Traditional project management is reactive. You set a deadline, you miss it, you adjust. <strong>AI changes the game to proactive management.</strong></p>
      <p>With tools like ProNotion, we aren't just logging tasks; we are feeding a prediction engine.</p>
      <ul>
        <li><strong>Automated Risk Detection:</strong> The system analyzes velocity and flags delays before they happen.</li>
        <li><strong>Resource Allocation:</strong> AI suggests who is overworked and who has capacity based on historical output.</li>
      </ul>
      <p>The Gantt chart isn't dead, but it is no longer static. It's a living organism that evolves with your team's data.</p>
    `
  },
  {
    id: '3',
    slug: '5-essential-templates-startups',
    title: '5 Essential Templates for Startups',
    excerpt: 'From fundraising trackers to equity management—here are the must-have systems for early-stage founders.',
    category: 'Templates',
    author: 'Michael Ross',
    date: 'Mar 10, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    content: `
      <p>Startups die from chaos, not lack of product. Here are the five systems every founder needs to install immediately:</p>
      <ol>
        <li><strong>Investor CRM:</strong> Track every conversation, follow-up, and term sheet.</li>
        <li><strong>Cap Table Management:</strong> Don't use Excel for equity. Use a relational database.</li>
        <li><strong>OKRs Dashboard:</strong> Align the team on what actually matters this quarter.</li>
        <li><strong>Recruiting Pipeline:</strong> Talent is your #1 asset. Treat hiring like sales.</li>
        <li><strong>Company Wiki:</strong> If it's not written down, it doesn't exist.</li>
      </ol>
      <p>All of these are available in our "Startup OS" bundle.</p>
    `
  },
  {
    id: '4',
    slug: 'mastering-notion-formulas-2',
    title: 'Mastering Notion Formulas 2.0',
    excerpt: 'A comprehensive guide to the new formula engine. Learn how to build progress bars, date calculations, and more.',
    category: 'Tutorials',
    author: 'Jessica Wu',
    date: 'Mar 08, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>Notion Formulas 2.0 brings the power of JavaScript-like logic to your databases. Here is how to build a dynamic progress bar:</p>
      <p><code>if(prop("Status") == "Done", "🟢", "🔴")</code></p>
      <p>But we can go deeper. By using the <code>style()</code> function, we can create visual indicators for overdue tasks, budget overruns, and more without leaving the database view.</p>
    `
  },
  {
    id: '5',
    slug: 'pronotion-v2-release',
    title: 'ProNotion v2.4 Release Notes',
    excerpt: 'Introducing real-time collaboration updates, faster load times, and new API integrations for Enterprise users.',
    category: 'Updates',
    author: 'Team ProNotion',
    date: 'Mar 05, 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    content: `
      <p>We've listened to your feedback. Speed is a feature. In v2.4, we've rewritten our caching layer.</p>
      <h3>Highlights:</h3>
      <ul>
        <li><strong>2x Faster Load Times:</strong> Large databases now open instantly.</li>
        <li><strong>Real-time Cursors:</strong> See where your team is working in the document.</li>
        <li><strong>API v2:</strong> Deeper integrations with Slack and GitHub.</li>
      </ul>
    `
  },
  {
    id: '6',
    slug: 'switched-jira-to-notion',
    title: 'Why We Switched from Jira to Notion',
    excerpt: 'The story behind our migration. The challenges we faced, the tools we built, and why we never looked back.',
    category: 'Business',
    author: 'Alex Rivera',
    date: 'Mar 01, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>Jira is powerful, but it's rigid. Notion is flexible, but unstructured. We needed both.</p>
      <p>By building a custom "Engineering OS" on top of Notion, we replicated the sprint planning features of Jira while maintaining the documentation capabilities of a wiki. The result? Developers actually <em>enjoy</em> updating their tickets.</p>
    `
  }
];

// Backend Service Mock
export const BlogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(blogPosts), 300);
    });
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    // Simulate network delay and DB lookup
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(blogPosts.find(post => post.slug === slug));
      }, 300);
    });
  }
};
