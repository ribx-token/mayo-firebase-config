import { NativeModules } from 'react-native';
import { Logger } from 'mayo-logger';

interface FirebaseConfig {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    measurementId?: string;
    databaseURL?: string;
    webClientId?: string; // Add this line
    [key: string]: string | undefined; // To cater for any other properties that might be added
}  

const { FirebaseConfigExtractor } = NativeModules;

export const extractFirebaseConfig = (): FirebaseConfig => {
  Logger.info('Starting Firebase config extraction...', null, { tag: 'mayo-firebase-config-extractor' });

  const config: FirebaseConfig = FirebaseConfigExtractor.extractConfig();

  if (config && typeof config === 'object' && Object.keys(config).length > 0) {
    Logger.info('Successfully extracted Firebase config', null, { tag: 'mayo-firebase-config-extractor' });
  } else {
    Logger.warn('Failed to extract valid Firebase config or the config is empty', null, { tag: 'mayo-firebase-config-extractor' });
  }

  // This log may expose sensitive information, so be cautious about using it in a production environment
  Logger.info('Extracted Firebase config:', { config }, { tag: 'mayo-firebase-config-extractor' });

  return config;
};
