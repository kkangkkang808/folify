export type FolifyVersion = '1.0';

export type FolifyMeta = {
  version: FolifyVersion;
  generatedAt?: string;
  locale?: string;
};

export type FolifyLink = {
  label: string;
  url: string;
};

export type FolifyProfile = {
  name: string;
  role: string;
  summary: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
  links?: FolifyLink[];
};

export type FolifyExperience = {
  company: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  highlights: string[];
};

export type FolifyProject = {
  name: string;
  description: string;
  stack?: string[];
  link?: string;
  highlights?: string[];
};

export type FolifyEducation = {
  school: string;
  degree: string;
  start?: string;
  end?: string;
  details?: string;
};

export type FolifySkillGroup = {
  category: string;
  items: string[];
};

export type FolifyExtraSection = {
  title: string;
  items: string[];
};

export type FolifyDoc = {
  meta: FolifyMeta;
  profile: FolifyProfile;
  skills?: FolifySkillGroup[];
  experience?: FolifyExperience[];
  projects?: FolifyProject[];
  education?: FolifyEducation[];
  extras?: FolifyExtraSection[];
};

export type RenderOptions = {
  title?: string;
};

export type PdfOptions = {
  pageSize?: 'A4' | 'Letter';
  margin?: string;
};

export type BuildOptions = RenderOptions &
  PdfOptions & {
    outDir?: string;
    pdf?: boolean;
  };

export type BuildResult = {
  outDir: string;
  htmlPath: string;
  cssPath: string;
  pdfPath?: string;
};
