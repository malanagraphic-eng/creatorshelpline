export interface Project {
  id: string;
  title: string;
  description: string;
  category:
    | "brand-development"
    | "social-media"
    | "web-design"
    | "graphic-design"
    | "graphics"
    | "video"
    | "web";
  tags: string[];
  link?: string;
  image?: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  thumbnail?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isPrimary: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface ThreeJSProps {
  children?: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface AnimationState {
  isLoading: boolean;
  currentPage: string;
  reducedMotion: boolean;
  isDarkMode: boolean;
}
