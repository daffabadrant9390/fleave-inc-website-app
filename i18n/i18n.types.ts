export type Language = 'id' | 'en';

export interface Translations {
  // Header
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
  };

  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
    getStarted: string;
    collaborate: string;
  };

  // About
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    readMore: string;
  };

  // Why Choose Us
  whyChoose: {
    title: string;
    description: string;
    feature1: {
      title: string;
      desc: string;
    };
    feature2: {
      title: string;
      desc: string;
    };
    feature3: {
      title: string;
      desc: string;
    };
    feature4: {
      title: string;
      desc: string;
    };
  };

  // Solutions
  solutions: {
    title: string;
    description: string;
    uiux: string;
    web: string;
    app: string;
    va: string;
    graphic: string;
  };

  // Recent Works
  works: {
    title: string;
    description: string;
    readMore: string;
    viewProject: string;
  };

  // Collaboration
  collab: {
    title: string;
    description: string;
    contact: string;
  };

  // Footer
  footer: {
    quickLinks: string;
    contactInfo: string;
    home: string;
    about: string;
    services: string;
    portfolio: string;
    email: string;
    phone: string;
    address: string;
    rights: string;
  };
}

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}
