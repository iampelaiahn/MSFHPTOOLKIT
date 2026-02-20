import type { LucideIcon } from 'lucide-react';
import { Baby, Droplets, HeartHandshake, Shield, Stethoscope, Users, BrainCircuit, MessageSquare, HandHelping, BookOpen, UserCheck, HeartPulse, Scale, Zap } from 'lucide-react';

export type CurriculumUnit = {
  title: string;
  unit: string;
  description: string;
  icon: LucideIcon;
  interactiveElement?: 'myth-fact' | 'scenario-tree' | 'body-map' | 'method-matcher';
};

export type LearningCluster = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  units: CurriculumUnit[];
};

export const healthCurriculum: LearningCluster[] = [
  {
    id: 'cluster-a',
    title: 'Cluster A: Body & Autonomy',
    subtitle: 'The Basics',
    icon: Baby,
    units: [
      { unit: 'Unit 3', title: 'Growth & Development', description: 'Interactive timeline showing physical and emotional changes during adolescence.', icon: UserCheck, interactiveElement: 'body-map' },
      { unit: 'Unit 4', title: 'Menstrual Hygiene Management', description: 'Visual guides on period tracking, hygiene products, and breaking stigma.', icon: Droplets },
      { unit: 'Unit 12', title: 'Water, Sanitation, and Hygiene (WASH)', description: 'Integrating basic hygiene into overall sexual health.', icon: HandHelping },
    ],
  },
  {
    id: 'cluster-b',
    title: 'Cluster B: Safe Sex & Prevention',
    subtitle: 'The Core CSE',
    icon: Shield,
    units: [
      { unit: 'Unit 5', title: 'Sexual and Reproductive Health (SRH)', description: 'Core concepts of consent, bodily autonomy, and healthy relationships.', icon: HeartHandshake, interactiveElement: 'scenario-tree' },
      { unit: 'Unit 8', title: 'Contraception', description: 'A "Method Matcher" tool for Pills, Condoms, Implants, etc.', icon: Scale, interactiveElement: 'method-matcher' },
      { unit: 'Unit 6', title: 'HIV and AIDS', description: 'Visual breakdown of transmission, prevention (PrEP/PEP), and U=U.', icon: HeartPulse, interactiveElement: 'myth-fact' },
      { unit: 'Unit 7', title: 'Sexually Transmitted Infections (STIs)', description: 'Symptom checkers and treatment pathways.', icon: Stethoscope, interactiveElement: 'myth-fact' },
    ],
  },
  {
    id: 'cluster-c',
    title: 'Cluster C: Safety, Mind, & Society',
    subtitle: 'Holistic Health',
    icon: Users,
    units: [
      { unit: 'Unit 10', title: 'Intimate Partner Violence (IPV)', description: 'Red flags vs. Green flags, safety planning, and reporting mechanisms.', icon: Shield, interactiveElement: 'scenario-tree' },
      { unit: 'Unit 11', title: 'Mental Health', description: 'Coping mechanisms, stress, and intersection with HIV/SRH.', icon: BrainCircuit },
      { unit: 'Unit 9', title: 'Working with Key Populations', description: 'Empathy, reducing stigma, and understanding diverse identities.', icon: Users },
    ],
  },
    {
    id: 'cluster-d',
    title: "Cluster D: Peer Educator's Dashboard",
    subtitle: 'Trainer Tools (Facilitator Only)',
    icon: BookOpen,
    units: [
      { unit: 'Units 1, 2 & 16', title: 'MSF & Peer Education Methods', description: 'Intro to MSF, methodologies, and tool usage.', icon: BookOpen },
      { unit: 'Units 13, 14 & 15', title: 'Core Facilitator Skills', description: 'Communication, Self-Care, and Behavioral Commitments.', icon: MessageSquare },
    ],
  },
];

export const mythFactData = {
    'hiv-aids': [
        {
            statement: 'You can get HIV from kissing.',
            isMyth: true,
            explanation: 'HIV is not transmitted through saliva. It is transmitted through specific body fluids like blood, semen, and vaginal fluids.',
        },
        {
            statement: 'If my partner and I are both HIV positive, we don\'t need to use condoms.',
            isMyth: true,
            explanation: 'Using condoms is still important to prevent other STIs and to avoid transmitting different strains of HIV, which can affect treatment.',
        },
        {
            statement: 'Undetectable = Untransmittable (U=U).',
            isMyth: false,
            explanation: 'This is a fact. People with HIV who take their medication daily as prescribed and achieve and maintain an undetectable viral load have effectively no risk of sexually transmitting the virus to an HIV-negative partner.',
        },
    ],
    'stis': [
        {
            statement: 'You can always tell if someone has an STI.',
            isMyth: true,
            explanation: 'Many STIs have no symptoms (asymptomatic), so you can have one and not know it. Regular testing is the only way to be sure.',
        },
        {
            statement: 'You can\'t get an STI from oral sex.',
            isMyth: true,
            explanation: 'STIs like herpes, gonorrhea, syphilis, and chlamydia can all be transmitted through oral sex. Using barriers like condoms or dental dams can reduce the risk.',
        }
    ]
}
