import { create } from 'zustand';
import { AnimationState, Project, Service } from '../types';

interface AppState extends AnimationState {
  projects: Project[];
  services: Service[];
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: string) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  initializeData: () => void;
}

export const useStore = create<AppState>((set) => ({
  isLoading: true,
  currentPage: 'home',
  reducedMotion: false,
  isDarkMode: true,
  projects: [],
  services: [],
  
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  
  initializeData: () => set({
    projects: [
      {
        id: '1',
        title: 'Brand Revolution Campaign',
        description: 'Complete brand transformation with 300% engagement increase',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'brand-development',
        tags: ['Branding', 'Strategy', 'Digital'],
      },
      {
        id: '2',
        title: 'Social Media Mastery',
        description: 'Viral content strategy delivering 2M+ impressions',
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'social-media',
        tags: ['Content', 'Engagement', 'Growth'],
      },
      {
        id: '3',
        title: 'E-commerce Excellence',
        description: 'Modern web platform with 150% conversion boost',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'web-design',
        tags: ['Web Design', 'UX/UI', 'Development'],
      },
      {
        id: '4',
        title: 'Visual Identity Package',
        description: 'Comprehensive graphic design system for startup',
        image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'graphic-design',
        tags: ['Graphics', 'Identity', 'Print'],
      },
    ],
    
    services: [
      {
        id: '1',
        title: 'Brand Development',
        description: 'Complete brand strategy, identity design, and positioning that converts prospects into loyal customers.',
        icon: 'branding',
        features: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Market Research'],
        isPrimary: true,
      },
      {
        id: '2',
        title: 'Social Media Marketing',
        description: 'Data-driven social media campaigns that build communities and drive engagement across all platforms.',
        icon: 'social',
        features: ['Content Strategy', 'Community Management', 'Paid Advertising', 'Analytics'],
        isPrimary: true,
      },
      {
        id: '3',
        title: 'Web Designing',
        description: 'Modern, responsive websites that deliver exceptional user experiences and drive conversions.',
        icon: 'web',
        features: ['UI/UX Design', 'Responsive Development', 'Performance Optimization'],
        isPrimary: false,
      },
      {
        id: '4',
        title: 'Graphic Designing',
        description: 'Creative visual solutions that communicate your brand message effectively across all mediums.',
        icon: 'graphics',
        features: ['Print Design', 'Digital Graphics', 'Packaging Design'],
        isPrimary: false,
      },
      {
        id: '5',
        title: 'Video Editing',
        description: 'Professional video content that tells your story and engages your audience effectively.',
        icon: 'video',
        features: ['Video Production', 'Motion Graphics', 'Social Media Videos'],
        isPrimary: false,
      },
    ],
  }),
}));