
import React from 'react';

export type Language = 'en' | 'jp';

export interface Command {
  input: string;
  output: React.ReactNode;
  type: 'input' | 'output' | 'error' | 'system';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  link?: string;
}

export interface Skill {
  name: string;
  category: string;
}
