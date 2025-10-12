export interface EventInfo {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  link?: string;
  description: string;
  host?: string;
  sourceLink?: string;
  imageUrl?: string;
}
