
// Mock Backend Service
// TODO: Replace these local operations with fetch() calls to your real backend API.

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string; // Only used internally for mock validation
}

const STORAGE_KEY = 'pronotion_users_db';
const SESSION_KEY = 'pronotion_user_session';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Seed an admin if database is empty
const seedDatabase = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  if (!users) {
    const adminUser: User = {
      id: 'admin_001',
      name: 'Admin User',
      email: 'admin@pronotion.com',
      password: 'admin', // In real app, never store plain text
      role: 'admin'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([adminUser]));
  }
};

export const AuthService = {
  // Initialize
  init: () => {
    seedDatabase();
  },

  // POST /api/auth/login
  login: async (email: string, password: string): Promise<User> => {
    await delay(800); // Simulate network

    const usersRaw = localStorage.getItem(STORAGE_KEY);
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Don't return password in session
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  // POST /api/auth/register
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(800);

    const usersRaw = localStorage.getItem(STORAGE_KEY);
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password, // In real backend, hash this!
      role: 'user' // Default role
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  // POST /api/auth/logout
  logout: async (): Promise<void> => {
    localStorage.removeItem(SESSION_KEY);
  },

  // GET /api/auth/me
  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};

// Initialize on load
AuthService.init();
