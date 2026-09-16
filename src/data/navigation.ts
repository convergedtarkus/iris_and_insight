export interface RouteConfig {
  path: string;
  label: string;
}

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/history', label: 'History' },
  { path: '/equine-services', label: 'About EAL/EAP' },
  { path: '/services', label: 'Services' },
  { path: '/events', label: 'Events' },
  { path: '/horses', label: 'Meet the Horses' },
  { path: '/contact', label: 'Contact Us' },
];
