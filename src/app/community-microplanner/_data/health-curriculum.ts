import type { LucideIcon } from 'lucide-react';
import { Baby, Droplets, HeartHandshake, Shield, Stethoscope, Users, BrainCircuit, MessageSquare, HandHelping, BookOpen, UserCheck, HeartPulse, Scale } from 'lucide-react';

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
    id: 'cluster-d',
    title: "Cluster 1: Foundations of Peer Education",
    subtitle: 'Trainer Tools (Facilitator Only)',
    icon: BookOpen,
    units: [
      { unit: 'Units 1 & 2', title: 'MSF & Peer Education', description: 'Role of a peer educator as an "Ambassador of Health" to build trust and promote behavior change.', icon: BookOpen },
      { unit: 'Unit 13', title: 'Communication Skills', description: 'Core skills like active listening, open-ended questions, empathy, and showing empathy without giving unsolicited advice.', icon: MessageSquare },
      { unit: 'Units 14 & 15', title: 'Self-Care & Commitments', description: 'Focus on avoiding burnout, managing stress, and maintaining strict confidentiality ("Do No Harm").', icon: HandHelping },
    ],
  },
  {
    id: 'cluster-a',
    title: 'Cluster 2: Body, Hygiene, & Development',
    subtitle: 'The Basics',
    icon: Baby,
    units: [
      { unit: 'Unit 3', title: 'Growth & Development', description: 'Explains puberty as a normal physical, emotional, and social transition. Covers body changes and emotions.', icon: UserCheck, interactiveElement: 'body-map' },
      { unit: 'Unit 4', title: 'Menstrual Hygiene Management', description: 'Facts on tracking cycles, hygiene, managing cramps, and debunking myths about menstruation.', icon: Droplets },
      { unit: 'Unit 12', title: 'Water, Sanitation, and Hygiene (WASH)', description: 'Connecting basic hygiene like handwashing to overall reproductive health and disease prevention.', icon: HandHelping },
    ],
  },
  {
    id: 'cluster-b',
    title: 'Cluster 3 & 4: SRH & Disease Prevention',
    subtitle: 'The Core CSE',
    icon: Shield,
    units: [
      { unit: 'Unit 5', title: 'Gender and SRH', description: 'Covers the difference between Sex and Gender, bodily autonomy, consent, and healthy relationships.', icon: HeartHandshake, interactiveElement: 'scenario-tree' },
      { unit: 'Unit 8', title: 'Contraception', description: 'A "Method Matcher" for short-acting and long-acting methods, focusing on effectiveness, side effects, and myths.', icon: Scale, interactiveElement: 'method-matcher' },
      { unit: 'Unit 6', title: 'HIV and AIDS', description: 'Explains transmission, prevention (Condoms, PrEP, PEP), and the core message of U=U (Undetectable = Untransmittable).', icon: HeartPulse, interactiveElement: 'myth-fact' },
      { unit: 'Unit 7', title: 'Sexually Transmitted Infections (STIs)', description: 'Information on common STIs, asymptomatic cases, and when to seek immediate clinic referral.', icon: Stethoscope, interactiveElement: 'myth-fact' },
    ],
  },
  {
    id: 'cluster-c',
    title: 'Cluster 5: Vulnerability, Violence, & Mental Health',
    subtitle: 'Holistic Health',
    icon: Users,
    units: [
      { unit: 'Unit 9', title: 'Working with Key Populations', description: 'How to provide stigma-free support for Sex Workers, Transgender individuals, MSM, and PWID.', icon: Users },
      { unit: 'Unit 10', title: 'IPV & Sexual Violence', description: 'Covers physical, emotional, and sexual abuse, plus psychological first aid and referral pathways.', icon: Shield, interactiveElement: 'scenario-tree' },
      { unit: 'Unit 11', title: 'Mental Health', description: 'Coping mechanisms for stress and anxiety, especially for youth living with HIV or facing stigma.', icon: BrainCircuit },
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
