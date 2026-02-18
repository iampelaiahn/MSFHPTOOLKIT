'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/hp-monthly-sitrep-flow.ts';
import '@/ai/flows/community-microplanner-ai-health-education-assistant-flow.ts';
import '@/ai/flows/master-supervisor-ai-risk-question-designer-flow.ts';
