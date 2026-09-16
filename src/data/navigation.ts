export interface RouteConfig {
  path: string;
  label: string;
}

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home' },
  { path: '/our-team', label: 'Our Team' },
  { path: '/history', label: 'History' },
  { path: '/equine-services', label: 'About EAL/EAP' },
  { path: '/services', label: 'Services' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact Us' },
];
