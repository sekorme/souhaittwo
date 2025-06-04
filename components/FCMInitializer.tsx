'use client';

import { useEffect } from 'react';
import { useFCMToken } from '@/components/useFCMToken';

export default function FCMInitializer({userid}:any) {
    useFCMToken(userid); // Register FCM token logic
    return null;   // No UI to render
}
