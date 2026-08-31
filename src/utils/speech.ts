// Web Speech API helper for reading Arabic and American English educational text aloud

/**
 * Normalizes and enhances Arabic text phonetics for Web Speech API synthesis:
 * 1. Replaces 'سم' and 'cm' unit abbreviations with 'سَنْتِيمِتْراً' / 'سَنْتِيمِتْرَنْ'
 * 2. Enhances Tanween bil-fath (e.g., ـاً, ةً, ءً) into explicit phonetic noonation (ـَنْ, ـتَنْ, ءَنْ)
 *    which guarantees clear, natural pronunciation across all browser Arabic TTS voices.
 * 3. Translates math operations (+, -, ×, ÷, =) to spoken Arabic words.
 */
export function prepareArabicSpeechText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Math symbols to spoken Arabic words for children
  text = text
    .replace(/\+/g, ' زَائِد ')
    .replace(/÷/g, ' تَقْسِيم ')
    .replace(/×/g, ' ضَرْب ')
    .replace(/=/g, ' يُسَاوِي ')
    .replace(/([0-9])\s*-\s*([0-9])/g, '$1 نَاقِص $2');

  // 2. Units: 'سم' and 'cm' -> 'سَنْتِيمِتْراً'
  text = text
    .replace(/(\d+(?:\.\d+)?)\s*(?:سم|سـم|cm)/gi, '$1 سَنْتِيمِتْراً')
    .replace(/(^|[\s،,؛;.\-–—()\[\]{}!?؟])سم([\s،,؛;.\-–—()\[\]{}!?؟]|$)/g, '$1سَنْتِيمِتْراً$2')
    .replace(/(^|[\s،,؛;.\-–—()\[\]{}!?؟])cm([\s،,؛;.\-–—()\[\]{}!?؟]|$)/gi, '$1سَنْتِيمِتْراً$2');

  // 3. Tanween bil-Fath on Ta Marbuta (ةً / ـةً): -> تَنْ
  text = text.replace(/([^\s\d])ة[\u064B]/g, '$1َتَنْ');
  text = text.replace(/([^\s\d])[\u064B]ة/g, '$1َتَنْ');

  // 4. Tanween bil-Fath on Hamza (ءً): -> ءَنْ
  text = text.replace(/ء[\u064B]/g, 'ءَنْ');
  text = text.replace(/[\u064B]ء/g, 'ءَنْ');

  // 5. Tanween bil-Fath with Alif (ـاً / ـًا): -> ـَنْ
  text = text.replace(/([\u0621-\u064A])[\u064E\u064F\u0650\u0651\u0652]*[\u064B]ا/g, '$1َنْ');
  text = text.replace(/([\u0621-\u064A])[\u064E\u064F\u0650\u0651\u0652]*ا[\u064B]/g, '$1َنْ');
  text = text.replace(/([\u0621-\u064A])[\u064B]/g, '$1َنْ');

  // 6. Clean extra spaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Normalizes American English educational text for 8-year-old children:
 * 1. Expands units like "cm" -> "centimeters" (or "1 centimeter")
 * 2. Translates mathematical operations (+, -, *, /, =) into spoken English words
 * 3. Ensures clear, slow enunciated phrasing.
 */
export function prepareEnglishSpeechText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Math symbols to spoken English words for children
  text = text
    .replace(/\+/g, ' plus ')
    .replace(/÷/g, ' divided by ')
    .replace(/\//g, ' divided by ')
    .replace(/×|\*/g, ' times ')
    .replace(/=/g, ' equals ')
    .replace(/([0-9])\s*-\s*([0-9])/g, '$1 minus $2');

  // 2. Units: 1 cm -> 1 centimeter, >1 cm -> centimeters
  text = text
    .replace(/\b1\s*cm\b/gi, '1 centimeter')
    .replace(/(\d+(?:\.\d+)?)\s*cm\b/gi, '$1 centimeters');

  // 3. Clean extra spaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Speaks Arabic text with accurate diacritics and slow child-friendly cadence
 */
export function speakArabicText(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const spokenText = prepareArabicSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.82; // slightly slower for primary school children
    utterance.pitch = 1.05;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Try to find an Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('Arabic Speech synthesis error:', e);
    return false;
  }
}

/**
 * Speaks American English text with slow, clear, child-friendly pronunciation suitable for 8-year-olds
 */
export function speakEnglishText(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const spokenText = prepareEnglishSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'en-US';
    utterance.rate = 0.78; // Slow, articulate, gentle speed tailored for 8-year-old pupils
    utterance.pitch = 1.05; // Slightly cheerful and friendly tone

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Prioritize natural US English voices
    const voices = window.speechSynthesis.getVoices();
    const usVoice = 
      voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Jenny')) && (v.lang === 'en-US' || v.lang === 'en_US')) ||
      voices.find(v => v.lang === 'en-US' || v.lang === 'en_US') ||
      voices.find(v => v.lang.startsWith('en'));

    if (usVoice) {
      utterance.voice = usVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('English Speech synthesis error:', e);
    return false;
  }
}

/**
 * Stop any active speech synthesis
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export const stopArabicSpeech = stopSpeech;
