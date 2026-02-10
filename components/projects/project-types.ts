export type ProjectStatus = 'active' | 'trialing' | 'paused';

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  updatedAt: string;
  members: number;
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p_001',
    name: 'Acme Workspace',
    status: 'active',
    updatedAt: '2h ago',
    members: 5,
  },
  {
    id: 'p_002',
    name: 'FinOps Console',
    status: 'trialing',
    updatedAt: 'Yesterday',
    members: 2,
  },
  {
    id: 'p_003',
    name: 'Internal Tools',
    status: 'paused',
    updatedAt: '5 days ago',
    members: 9,
  },
];
