// Web Speech API helper for reading Arabic educational text aloud

/**
 * Normalizes and enhances Arabic text phonetics for Web Speech API synthesis:
 * 1. Replaces 'سم' and 'cm' unit abbreviations with 'سَنْتِمِتْراً' / 'سَنْتِمِتْرَنْ'
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

  // 2. Units: 'سم' and 'cm' -> 'سَنْتِمِتْراً'
  text = text
    .replace(/(\d+(?:\.\d+)?)\s*(?:سم|سـم|cm)/gi, '$1 سَنْتِمِتْراً')
    .replace(/(^|[\s،,؛;.\-–—()\[\]{}!?؟])سم([\s،,؛;.\-–—()\[\]{}!?؟]|$)/g, '$1سَنْتِمِتْراً$2')
    .replace(/(^|[\s،,؛;.\-–—()\[\]{}!?؟])cm([\s،,؛;.\-–—()\[\]{}!?؟]|$)/gi, '$1سَنْتِمِتْراً$2');

  // 3. Tanween bil-Fath on Ta Marbuta (ةً / ـةً): -> تَنْ
  text = text.replace(/([^\s\d])ة[\u064B]/g, '$1َتَنْ');
  text = text.replace(/([^\s\d])[\u064B]ة/g, '$1َتَنْ');

  // 4. Tanween bil-Fath on Hamza (ءً): -> ءَنْ
  text = text.replace(/ء[\u064B]/g, 'ءَنْ');
  text = text.replace(/[\u064B]ء/g, 'ءَنْ');

  // 5. Tanween bil-Fath with Alif (ـاً / ـًا): -> ـَنْ
  // Letter + \u064B + Alif
  text = text.replace(/([\u0621-\u064A])[\u064E\u064F\u0650\u0651\u0652]*[\u064B]ا/g, '$1َنْ');
  // Letter + Alif + \u064B
  text = text.replace(/([\u0621-\u064A])[\u064E\u064F\u0650\u0651\u0652]*ا[\u064B]/g, '$1َنْ');
  // Lone Tanween Fath on a letter without Alif
  text = text.replace(/([\u0621-\u064A])[\u064B]/g, '$1َنْ');

  // 6. Clean extra spaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function speakArabicText(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const spokenText = prepareArabicSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // slightly slower for primary school children
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
    console.warn('Speech synthesis error:', e);
    return false;
  }
}

export function stopArabicSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
