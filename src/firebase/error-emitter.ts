import { EventEmitter } from 'events';

// This is a simple event emitter to broadcast errors globally
export const errorEmitter = new EventEmitter();
