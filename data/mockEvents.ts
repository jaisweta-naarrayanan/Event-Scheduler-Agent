import { EventInfo } from '../types';

export const mockEvents: Omit<EventInfo, 'id'>[] = [
  {
    name: "AI & The Future of Work Summit",
    date: "2024-08-15",
    time: "9:00 AM - 5:00 PM",
    location: "Metropolis Convention Center",
    link: "https://example.com/ai-work-summit",
    description: "Explore how artificial intelligence is reshaping industries and the workforce.",
    host: "TechConferences Inc.",
    sourceLink: "https://www.linkedin.com/posts/example/activity-123",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e6973bea12?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Advanced React Patterns Workshop",
    date: "2024-09-01",
    time: "10:00 AM - 1:00 PM",
    location: "Online",
    link: "https://example.com/react-workshop",
    description: "A deep dive into advanced hooks, state management, and performance optimization in React.",
    host: "Dev Education",
    sourceLink: "https://www.instagram.com/p/Cxyz/",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Data Science & Machine Learning Mixer",
    date: "2024-08-22",
    time: "6:00 PM - 8:00 PM",
    location: "The Innovation Hub",
    description: "Network with professionals and enthusiasts in the data science and ML fields.",
    host: "Data Enthusiasts Group",
    sourceLink: "https://www.linkedin.com/posts/example/activity-456",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Fireside Chat with a UX Design Leader",
    date: "2024-09-10",
    time: "7:30 PM",
    location: "Zoom",
    link: "https://example.com/ux-chat",
    description: "An intimate conversation about design thinking, career paths, and the future of user experience.",
    host: "Design Forward",
    sourceLink: "https://www.linkedin.com/posts/example/activity-789",
    imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=800&auto=format&fit=crop"
  }
];
