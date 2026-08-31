import { ChallengePuzzle, EverydayItem, QuizQuestion, ConceptData } from '../types';

export const CONCEPTS_DATA: ConceptData[] = [
  {
    id: 'circle',
    title: 'الدَّائِرَةُ',
    titleEn: 'The Circle',
    subtitle: 'الْخَطُّ الْمُنْحَنِي الْمُغْلَقُ وَالْمُسْتَوِي',
    subtitleEn: 'The Closed Curved Line',
    color: 'emerald',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    definition: 'الدَّائِرَةُ هِيَ خَطٌّ مُنْحَنٍ مُغْلَقٌ وَمُسْتَوٍ، تَبْعُدُ جَمِيعُ نِقَاطِهِ بِنَفْسِ الْمَسَافَةِ عَنْ نُقْطَةٍ ثَابِتَةٍ فِي وَسَطِهِ تُسَمَّى الْمَرْكَزَ.',
    definitionEn: 'A circle is a round, flat curved line. Every single point on this line is at the exact same distance from a fixed point in the middle called the center.',
    keyPoints: [
      'الدَّائِرَةُ فَارِغَةٌ مِنَ الدَّاخِلِ (مِثْلَ السِّوَارِ أَوِ الْحَلَقَةِ أَوِ الْإِطَارِ).',
      'الْقُرْصُ هُوَ الدَّائِرَةُ مَعَ الْمِسَاحَةِ الدَّاخِلِيَّةِ الْمُمْتَلِئَةِ (مِثْلَ قِطْعَةِ النُّقُودِ).',
      'نَرْسُمُ الدَّائِرَةَ بِدِقَّةٍ هَنْدَسِيَّةٍ بِاسْتِعْمَالِ أَدَاةِ "الْمِدْوَرِ" (الْفِرْجَارِ) وَالْمِسْطَرَةِ الْمُدَرَّجَةِ.'
    ],
    keyPointsEn: [
      'A circle is empty inside (like a bracelet, ring, or bicycle tire).',
      'A disk is the circle plus the filled area inside it (like a coin or a plate).',
      'We draw a circle accurately using a compass and a ruler.'
    ],
    funFact: 'هَلْ تَعْلَمُ؟ إِذَا وَقَفْتَ مَعَ زُمَلَائِكَ فِي سَاحَةِ الْمَدْرَسَةِ وَأَمْسَكْتُمْ بِأَيْدِيكُمْ حَوْلَ الْمُعَلِّمِ بِنَفْسِ الْمَسَافَةِ، فَأَنْتُمْ تُشَكِّلُونَ دَائِرَةً كَامِلَةً!',
    funFactEn: 'Did you know? If you and your classmates hold hands in the schoolyard at equal distances from your teacher, you form a perfect circle!'
  },
  {
    id: 'center',
    title: 'الْمَرْكَزُ',
    titleEn: 'The Center',
    subtitle: 'نُقْطَةُ الْوَسَطِ الثَّابِتَةُ فِي قَلْبِ الدَّائِرَةِ',
    subtitleEn: 'The Fixed Middle Point',
    color: 'rose',
    borderColor: 'border-rose-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    badgeColor: 'bg-rose-100 text-rose-800',
    definition: 'الْمَرْكَزُ هُوَ نُقْطَةٌ وَحِيدَةٌ ثَابِتَةٌ تَقَعُ فِي وَسَطِ الدَّائِرَةِ تَمَاماً، وَيَبْعُدُ بِنَفْسِ الْمَسَافَةِ عَنْ كُلِّ نُقْطَةٍ تَقَعُ عَلَى الدَّائِرَةِ.',
    definitionEn: 'The center is the single, fixed point right in the middle of the circle. It is at the exact same distance from every point along the circle line.',
    keyPoints: [
      'نَضَعُ عَلَيْهِ دَائِماً إِبْرَةَ الْمِدْوَرِ (الْفِرْجَارِ) عِنْدَ بَدْءِ الرَّسْمِ.',
      'لَا يُوجَدُ لِلدَّائِرَةِ إِلَّا مَرْكَزٌ وَاحِدٌ فَقَطْ فِي قَلْبِهَا.',
      'يَبْعُدُ الْمَرْكَزُ عَنْ كُلِّ أَطْرَافِ الدَّائِرَةِ بِنَفْسِ الطُّولِ دَائِماً.'
    ],
    keyPointsEn: [
      'We always place the needle tip of the compass on the center point to start drawing.',
      'A circle has only one single center point at its very heart.',
      'The center is always at the exact same distance from all edges of the circle.'
    ],
    funFact: 'فِي عَجَلَةِ الدَّرَّاجَةِ الْهَوَائِيَّةِ، الْمَرْكَزُ هُوَ الْمِحْوَرُ الْحَدِيدِيُّ الثَّابِتُ الَّذِي تَدُورُ حَوْلَهُ الْعَجَلَةُ!',
    funFactEn: 'On a bicycle wheel, the center is the fixed metal hub around which the entire wheel turns!'
  },
  {
    id: 'radius',
    title: 'نِصْفُ الْقُطْرِ',
    titleEn: 'The Radius',
    subtitle: 'الْمَسَافَةُ مِنَ الْمَرْكَزِ إِلَى أَيِّ نُقْطَةٍ عَلَى الدَّائِرَةِ',
    subtitleEn: 'Distance from Center to Edge',
    color: 'amber',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800',
    definition: 'نِصْفُ الْقُطْرِ هُوَ كُلُّ قِطْعَةٍ مُسْتَقِيمَةٍ تَصِلُ بَيْنَ مَرْكَزِ الدَّائِرَةِ وَأَيِّ نُقْطَةٍ تَقَعُ عَلَى خَطِّ الدَّائِرَةِ.',
    definitionEn: 'The radius is any straight line connecting the center of the circle to any point on its outer boundary.',
    keyPoints: [
      'جَمِيعُ أَنْصَافِ الْأَقْطَارِ فِي الدَّائِرَةِ الْوَاحِدَةِ مُتَقَايِسَةٌ (لَهَا نَفْسُ الطُّولِ تَمَاماً).',
      'فَتْحَةُ الْمِدْوَرِ عَلَى الْمِسْطَرَةِ تُسَاوِي تَمَاماً طُولَ نِصْفِ الْقُطْرِ الْمُرَادِ رَسْمُهُ.',
      'طُولُ نِصْفِ الْقُطْرِ هُوَ نِصْفُ طُولِ الْقُطْرِ الْكَامِلِ.'
    ],
    keyPointsEn: [
      'All radii inside the same circle are equal in length in every direction.',
      'The compass opening measured on the ruler is exactly equal to the radius.',
      'The length of the radius is half the length of the diameter.'
    ],
    funFact: 'عَقَارِبُ سَاعَةِ الْحَائِطِ وَأَسْلَاكُ عَجَلَةِ الدَّرَّاجَةِ كُلُّهَا تُمَثِّلُ أَنْصَافَ أَقْطَارٍ تَدُورُ حَوْلَ الْمَرْكَزِ!',
    funFactEn: 'Clock hands and bicycle spokes are great examples of radii spinning around the center!'
  },
  {
    id: 'diameter',
    title: 'الْقُطْرُ',
    titleEn: 'The Diameter',
    subtitle: 'الْخَطُّ الَّذِي يَمُرُّ بِالْمَرْكَزِ وَيَقْسِمُ الدَّائِرَةَ إِلَى نِصْفَيْنِ',
    subtitleEn: 'Line Passing Through Center',
    color: 'blue',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    badgeColor: 'bg-blue-100 text-blue-800',
    definition: 'الْقُطْرُ هُوَ قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ نُقْطَتَيْنِ مِنَ الدَّائِرَةِ وَتَمُرُّ إِجْبَارِيّاً بِالْمَرْكَزِ، وَيَقْسِمُ الدَّائِرَةَ إِلَى نِصْفَيْنِ مُتَطَابِقَيْنِ.',
    definitionEn: 'The diameter is a straight line connecting two opposite points on the circle, passing directly through the center. It divides the circle into two equal halves.',
    keyPoints: [
      'الْقُطْرُ يَمُرُّ حَتْماً وَإِجْبَارِيّاً بِنُقْطَةِ الْمَرْكَزِ.',
      'طُولُ الْقُطْرِ = نِصْفُ الْقُطْرِ + نِصْفُ الْقُطْرِ (أَيْ ضِعْفُ نِصْفِ الْقُطْرِ = 2 × نِصْفُ الْقُطْرِ).',
      'الْقُطْرُ هُوَ أَطْوَلُ قِطْعَةٍ مُسْتَقِيمَةٍ يُمْكِنُ رَسْمُهَا دَاخِلَ الدَّائِرَةِ (أَطْوَلُ وَتَرٍ).'
    ],
    keyPointsEn: [
      'The diameter must always pass through the center point.',
      'Diameter = 2 × Radius (double the radius length).',
      'The diameter is the longest straight line you can draw inside a circle (the longest chord).'
    ],
    funFact: 'إِذَا كَانَ نِصْفُ الْقُطْرِ 3 سَنْتِيمِتْرَاتٍ، فَإِنَّ الْقُطْرَ يَكُونُ 6 سَنْتِيمِتْرَاتٍ (3 + 3 = 6 سم)!',
    funFactEn: 'If the radius is 3 centimeters, the diameter is 6 centimeters (3 + 3 = 6 cm)!'
  },
  {
    id: 'chord',
    title: 'الْوَتَرُ',
    titleEn: 'The Chord',
    subtitle: 'قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ أَيِّ نُقْطَتَيْنِ عَلَى الدَّائِرَةِ',
    subtitleEn: 'Line Connecting Any Two Points',
    color: 'purple',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    badgeColor: 'bg-purple-100 text-purple-800',
    definition: 'الْوَتَرُ هُوَ قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ أَيِّ نُقْطَتَيْنِ تَقَعَانِ عَلَى خَطِّ الدَّائِرَةِ، وَلَا يُشْتَرَطُ أَنْ يَمُرَّ بِالْمَرْكَزِ.',
    definitionEn: 'A chord is a straight line segment joining any two points on a circle. It does not have to pass through the center.',
    keyPoints: [
      'طَرَفَا الْوَتَرِ يَقَعَانِ دَائِماً عَلَى خَطِّ الدَّائِرَةِ.',
      'إِذَا مَرَّ الْوَتَرُ بِالْمَرْكَزِ فَإِنَّهُ يُسَمَّى "قُطْراً".',
      'الْقُطْرُ هُوَ وَتَرٌ خَاصٌّ وَمُتَمَيِّزٌ لِأَنَّهُ أَطْوَلُ الْأَوْتَارِ عَلَى الْإِطْلَاقِ.'
    ],
    keyPointsEn: [
      'Both endpoints of a chord always touch the circle line.',
      'If a chord happens to pass right through the center, it is called a diameter.',
      'The diameter is the longest chord possible in any circle.'
    ],
    funFact: 'سُمِّيَ "وَتَراً" لِأَنَّهُ يُشْبِهُ وَتَرَ الْقَوْسِ الَّذِي كَانَ يُسْتَخْدَمُ فِي الرِّمَايَةِ الْقَدِيمَةِ!',
    funFactEn: 'It is called a "chord" after musical strings and archery bowstrings that stretch between two points!'
  }
];

export const EVERYDAY_ITEMS: EverydayItem[] = [
  {
    id: 'bike-wheel',
    title: 'عَجَلَةُ الدَّرَّاجَةِ الْهَوَائِيَّةِ',
    titleEn: 'Bicycle Wheel',
    category: 'وَسَائِلُ النَّقْلِ وَالرِّيَاضَةُ',
    categoryEn: 'Sports and Transportation',
    description: 'الْعَجَلَةُ نَمُوذَجٌ حَقِيقِيٌّ رَائِعٌ لِلدَّائِرَةِ، حَيْثُ نَرَى فِيهَا كُلَّ عَنَاصِرِ الدَّائِرَةِ بِوُضُوحٍ.',
    descriptionEn: 'A bicycle wheel is a wonderful real-life model of a circle, showing every geometric part clearly.',
    circleRole: 'الْإِطَارُ الْمَطَّاطِيُّ الْخَارِجِيُّ يُمَثِّلُ الدَّائِرَةَ.',
    circleRoleEn: 'The outer rubber tire represents the circle circumference.',
    centerRole: 'الْمِحْوَرُ الْمَعْدِنِيُّ فِي الْمُنْتَصَفِ يُمَثِّلُ الْمَرْكَزَ.',
    centerRoleEn: 'The metal central axle represents the center point.',
    radiusRole: 'الْأَسْلَاكُ الْفُولَاذِيَّةُ الْمُمْتَدَّةُ مِنَ الْمِحْوَرِ إِلَى الْإِطَارِ تُمَثِّلُ أَنْصَافَ الْأَقْطَارِ.',
    radiusRoleEn: 'The steel spokes extending from the hub to the rim represent the radii.',
    iconName: 'Bike',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'wall-clock',
    title: 'سَاعَةُ الْحَائِطِ الدَّائِرِيَّةُ',
    titleEn: 'Wall Clock',
    category: 'أَدَوَاتُ قِيَاسِ الْوَقْتِ',
    categoryEn: 'Timekeeping Tools',
    description: 'سَاعَةُ الْحَائِطِ الدَّائِرِيَّةُ تُعَلِّمُنَا الْوَقْتَ وَتُجَسِّدُ مَفْهُومَ الدَّائِرَةِ وَالْمَرْكَزِ.',
    descriptionEn: 'A circular wall clock tells us time and beautifully illustrates the center and radius.',
    circleRole: 'الْإِطَارُ الْخَارِجِيُّ الْمَكْتُوبُ عَلَيْهِ الْأَرْقَامُ يُمَثِّلُ الدَّائِرَةَ.',
    circleRoleEn: 'The outer frame with numbered hours represents the circle.',
    centerRole: 'الْمِسْمَارُ الدَّائِرِيُّ الصَّغِيرُ الْمُثَبَّتُ فِي الْوَسَطِ يُمَثِّلُ الْمَرْكَزَ.',
    centerRoleEn: 'The small central pin holding the hands represents the center.',
    radiusRole: 'عَقْرَبُ السَّاعَاتِ وَعَقْرَبُ الدَّقَائِقِ يُمَثِّلَانِ أَنْصَافَ أَقْطَارٍ تَدُورُ بِانْتِظَامٍ.',
    radiusRoleEn: 'The hour hand and minute hand act as radii rotating smoothly.',
    iconName: 'Clock',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'coin',
    title: 'قِطْعَةُ الدِّينَارِ الْجَزَائِرِيِّ (الْقُرْصُ)',
    titleEn: 'Algerian Dinar Coin (The Disk)',
    category: 'النُّقُودُ وَالْمُبَادَلَاتُ',
    categoryEn: 'Money and Coins',
    description: 'تُوَضِّحُ الْفَرْقَ الْجَوْهَرِيَّ بَيْنَ مَفْهُومِ الدَّائِرَةِ وَالْقُرْصِ فِي الرِّيَاضِيَّاتِ.',
    descriptionEn: 'Coins demonstrate the key mathematical difference between a hollow circle and a solid disk.',
    circleRole: 'الْحَافَّةُ الْبَارِزَةُ الدَّائِرِيَّةُ الْخَارِجِيَّةُ تُمَثِّلُ الدَّائِرَةَ.',
    circleRoleEn: 'The raised circular outer rim represents the circle.',
    centerRole: 'نُقْطَةُ الْوَسَطِ تَمَاماً هِيَ الْمَرْكَزُ.',
    centerRoleEn: 'The exact center of the coin face is the center.',
    radiusRole: 'الْمِسَاحَةُ الْمَعْدِنِيَّةُ الصُّلْبَةُ وَالْمُمْتَلِئَةُ تُمَثِّلُ الْقُرْصَ.',
    radiusRoleEn: 'The entire solid metal surface represents the filled disk.',
    iconName: 'Coins',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'steering-wheel',
    title: 'عَجَلَةُ قِيَادَةِ السَّيَّارَةِ (الْمِقْوَدُ)',
    titleEn: 'Car Steering Wheel',
    category: 'الْمَرْكَبَاتُ وَالسَّيَّارَاتُ',
    categoryEn: 'Vehicles and Driving',
    description: 'يَسْتَخْدِمُهَا السَّائِقُ لِلتَّحَكُّمِ بِالسَّيَّارَةِ، وَتَعْتَمِدُ فِي تَصْمِيمِهَا عَلَى الدَّائِرَةِ وَأَقْطَارِهَا.',
    descriptionEn: 'Used by drivers to steer vehicles, designed around circular geometry and radiating spokes.',
    circleRole: 'الطَّوْقُ الدَّائِرِيُّ الْمُرِيحُ الَّذِي تُمْسِكُهُ الْيَدَانِ يُمَثِّلُ الدَّائِرَةَ.',
    circleRoleEn: 'The comfortable round ring held by hands represents the circle.',
    centerRole: 'زِرُّ بُوقِ التَّنْبِيهِ فِي الْمُنْتَصَفِ يُمَثِّلُ الْمَرْكَزَ.',
    centerRoleEn: 'The horn button in the middle is the center point.',
    radiusRole: 'الْأَذْرُعُ الْمُتَّصِلَةُ مِنَ الْمَرْكَزِ إِلَى الطَّوْقِ تُمَثِّلُ أَنْصَافَ الْأَقْطَارِ.',
    radiusRoleEn: 'The steering arms connecting the center to the ring represent radii.',
    iconName: 'Disc',
    color: 'from-rose-500 to-pink-600'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'مَا هُوَ الْعُنْصُرُ الَّذِي يَقَعُ فِي وَسَطِ الدَّائِرَةِ تَمَاماً وَتَبْعُدُ عَنْهُ جَمِيعُ نِقَاطِ الدَّائِرَةِ بِنَفْسِ الْمَسَافَةِ؟',
    questionEn: 'What is the point located right in the middle of a circle, at equal distance from all points on the circle?',
    imageType: 'center',
    options: ['الْوَتَرُ', 'الْمَرْكَزُ', 'الْقُطْرُ', 'نِصْفُ الْقُطْرِ'],
    optionsEn: ['The Chord', 'The Center', 'The Diameter', 'The Radius'],
    correctIndex: 1,
    explanation: 'أَحْسَنْتَ! الْمَرْكَزُ هُوَ النُّقْطَةُ الثَّابِتَةُ فِي وَسَطِ الدَّائِرَةِ، وَنَضَعُ عَلَيْهِ إِبْرَةَ الْمِدْوَرِ عِنْدَ الرَّسْمِ.',
    explanationEn: 'Well done! The center is the fixed point in the middle of the circle, where we place the compass needle.',
    hint: 'فَكِّرْ فِي النُّقْطَةِ الَّتِي نَغْرِسُ عَلَيْهَا إِبْرَةَ الْمِدْوَرِ.',
    hintEn: 'Think of the spot where you place the sharp tip of your compass.'
  },
  {
    id: 2,
    question: 'قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ مَرْكَزِ الدَّائِرَةِ وَنُقْطَةٍ عَلَى الدَّائِرَةِ، تُسَمَّى:',
    questionEn: 'A straight line segment connecting the center of the circle to any point on the circle is called:',
    imageType: 'radius',
    options: ['الْقُطْرُ', 'الْوَتَرُ', 'نِصْفُ الْقُطْرِ', 'الْمُثَلَّثُ'],
    optionsEn: ['The Diameter', 'The Chord', 'The Radius', 'The Triangle'],
    correctIndex: 2,
    explanation: 'مُمْتَازٌ! الْقِطْعَةُ الَّتِي تَرْبِطُ بَيْنَ الْمَرْكَزِ وَنُقْطَةٍ مِنَ الدَّائِرَةِ تُسَمَّى "نِصْفَ الْقُطْرِ"، مِثْلَ عَقْرَبِ السَّاعَةِ.',
    explanationEn: 'Excellent! The line connecting the center to a point on the circle is the radius, just like a clock hand.',
    hint: 'إِنَّهَا تَبْدَأُ مِنَ الْمَرْكَزِ وَتَنْتَهِي عِنْدَ حَافَّةِ الدَّائِرَةِ.',
    hintEn: 'It starts from the center and ends at the edge of the circle.'
  },
  {
    id: 3,
    question: 'قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ نُقْطَتَيْنِ مِنَ الدَّائِرَةِ وَتَمُرُّ إِجْبَارِيّاً بِالْمَرْكَزِ، تُسَمَّى:',
    questionEn: 'A straight line segment joining two points on the circle and passing directly through the center is called:',
    imageType: 'diameter',
    options: ['الْوَتَرُ الْعَادِيُّ', 'نِصْفُ الْقُطْرِ', 'الْمُحِيطُ', 'الْقُطْرُ'],
    optionsEn: ['A regular Chord', 'The Radius', 'The Perimeter', 'The Diameter'],
    correctIndex: 3,
    explanation: 'إِجَابَةٌ رَائِعَةٌ! الْقُطْرُ يَصِلُ بَيْنَ نُقْطَتَيْنِ مِنَ الدَّائِرَةِ وَيَمُرُّ بِالْمَرْكَزِ، وَهُوَ يَقْسِمُ الدَّائِرَةَ إِلَى نِصْفَيْنِ مُتَسَاوِيَيْنِ.',
    explanationEn: 'Awesome! The diameter joins two points on the circle and goes through the center, dividing it into two equal halves.',
    hint: 'يَصِلُ بَيْنَ طَرَفَيِ الدَّائِرَةِ وَيَمُرُّ مُبَاشَرَةً بِنُقْطَةِ الْمَرْكَزِ.',
    hintEn: 'It goes from one side of the circle to the other through the center.'
  },
  {
    id: 4,
    question: 'إِذَا كَانَ طُولُ نِصْفِ قُطْرِ دَائِرَةٍ هُوَ 4 سَنْتِيمِتْرَاتٍ، فَكَمْ يَكُونُ طُولُ قُطْرِهَا؟',
    questionEn: 'If the radius of a circle is 4 centimeters, what is the length of its diameter?',
    imageType: 'diameter_calc',
    radiusVal: 4,
    options: ['4 سَنْتِيمِتْرَاتٍ', '6 سَنْتِيمِتْرَاتٍ', '8 سَنْتِيمِتْرَاتٍ', '2 سَنْتِيمِتْرَيْنِ'],
    optionsEn: ['4 centimeters', '6 centimeters', '8 centimeters', '2 centimeters'],
    correctIndex: 2,
    explanation: 'بَطَلٌ! الْقُطْرُ يُسَاوِي ضِعْفَ نِصْفِ الْقُطْرِ (4 + 4 = 8 سَنْتِيمِتْرَاتٍ).',
    explanationEn: 'Great job! The diameter is twice the radius (4 + 4 = 8 centimeters).',
    hint: 'طُولُ الْقُطْرِ = نِصْفُ الْقُطْرِ + نِصْفُ الْقُطْرِ.',
    hintEn: 'Diameter = Radius + Radius.'
  },
  {
    id: 5,
    question: 'قِطْعَةٌ مُسْتَقِيمَةٌ تَصِلُ بَيْنَ نُقْطَتَيْنِ عَلَى الدَّائِرَةِ وَلَكِنَّهَا لَا تَمُرُّ بِالْمَرْكَزِ، تُسَمَّى:',
    questionEn: 'A straight line segment that joins two points on the circle without passing through the center is called:',
    imageType: 'chord',
    options: ['الْوَتَرُ', 'الْمَرْكَزُ', 'الْقُطْرُ', 'نِصْفُ الْقُطْرِ'],
    optionsEn: ['The Chord', 'The Center', 'The Diameter', 'The Radius'],
    correctIndex: 0,
    explanation: 'صَحِيحٌ جِدّاً! الْوَتَرُ يَصِلُ بَيْنَ أَيِّ نُقْطَتَيْنِ عَلَى الدَّائِرَةِ دُونَ أَنْ يُشْتَرَطَ مُرُورُهُ بِالْمَرْكَزِ.',
    explanationEn: 'That is right! A chord connects any two points on the circle without needing to cross through the center.',
    hint: 'تَصِلُ بَيْنَ نُقْطَتَيْنِ عَلَى الدَّائِرَةِ فَقَطْ دُونَ الْمُرُورِ بِالْوَسَطِ.',
    hintEn: 'It connects two edge points without going through the middle.'
  },
  {
    id: 6,
    question: 'مَا هِيَ الْأَدَاةُ الْهَنْدَسِيَّةُ الْأَسَاسِيَّةُ الَّتِي نَسْتَخْدِمُهَا لِرَسْمِ دَائِرَةٍ بِدِقَّةٍ؟',
    questionEn: 'What is the main geometry tool we use to draw an accurate circle?',
    imageType: 'radius',
    options: ['الْمِسْطَرَةُ فَقَطْ', 'الْكُوسُ', 'الْمِنْقَلَةُ', 'الْمِدْوَرُ (الْفِرْجَارُ)'],
    optionsEn: ['Ruler only', 'Set square', 'Protractor', 'Compass'],
    correctIndex: 3,
    explanation: 'رَائِعٌ! الْمِدْوَرُ (الْفِرْجَارُ) هُوَ الْأَدَاةُ الْمُخَصَّصَةُ لِرَسْمِ الدَّوَائِرِ وَالْأَقْوَاسِ الْهَنْدَسِيَّةِ بِدِقَّةٍ.',
    explanationEn: 'Wonderful! A compass is the tool specially made for drawing circles and arcs accurately.',
    hint: 'أَدَاةٌ لَهَا سَاقَانِ: سَاقٌ بِإِبْرَةٍ وَسَاقٌ فِيهَا قَلَمُ رَصَاصٍ.',
    hintEn: 'A tool with two legs: one with a sharp needle and one holding a pencil.'
  },
  {
    id: 7,
    question: 'إِذَا كَانَ طُولُ قُطْرِ دَائِرَةٍ هُوَ 10 سَنْتِيمِتْرَاتٍ، فَكَمْ يَكُونُ طُولُ نِصْفِ قُطْرِهَا؟',
    questionEn: 'If the diameter of a circle is 10 centimeters, what is its radius?',
    imageType: 'radius_calc',
    radiusVal: 5,
    options: ['5 سَنْتِيمِتْرَاتٍ', '10 سَنْتِيمِتْرَاتٍ', '20 سَنْتِيمِتْراً', '15 سَنْتِيمِتْراً'],
    optionsEn: ['5 centimeters', '10 centimeters', '20 centimeters', '15 centimeters'],
    correctIndex: 0,
    explanation: 'مُمْتَازٌ وَذَكِيٌّ! نِصْفُ الْقُطْرِ هُوَ نِصْفُ الْعَشَرَةِ (10 ÷ 2 = 5 سَنْتِيمِتْرَاتٍ).',
    explanationEn: 'Smart answer! The radius is half of ten (10 ÷ 2 = 5 centimeters).',
    hint: 'نِصْفُ الْعَدَدِ 10 هُوَ 5.',
    hintEn: 'Half of the number 10 is 5.'
  },
  {
    id: 8,
    question: 'مَا هُوَ الْفَرْقُ الْأَسَاسِيُّ بَيْنَ "الدَّائِرَةِ" وَ"الْقُرْصِ"؟',
    questionEn: 'What is the main difference between a "circle" and a "disk"?',
    imageType: 'disc_vs_circle',
    options: [
      'الدَّائِرَةُ لَهَا أَضْلَاعٌ وَالْقُرْصُ لَيْسَ لَهُ أَضْلَاعٌ',
      'الدَّائِرَةُ خَطٌّ خَارِجِيٌّ فَارِغٌ، وَالْقُرْصُ هُوَ الدَّائِرَةُ مَعَ مِسَاحَتِهَا الدَّاخِلِيَّةِ الْمُمْتَلِئَةِ',
      'الدَّائِرَةُ تُرْسَمُ بِالْمِسْطَرَةِ وَالْقُرْصُ يُرْسَمُ بِالْكُوسِ',
      'لَا يُوجَدُ أَيُّ فَرْقٍ بَيْنَهُمَا'
    ],
    optionsEn: [
      'A circle has sides and a disk has no sides',
      'A circle is an empty outer line, while a disk includes the filled area inside',
      'A circle is drawn with a ruler and a disk with a set square',
      'There is no difference between them'
    ],
    correctIndex: 1,
    explanation: 'عَبْقَرِيٌّ! الدَّائِرَةُ مِثْلَ الْخَاتَمِ أَوِ السِّوَارِ (فَارِغَةٌ)، بَيْنَمَا الْقُرْصُ مِثْلَ قِطْعَةِ النُّقُودِ أَوِ الصَّحْنِ (مُمْتَلِئٌ).',
    explanationEn: 'Genius! A circle is empty like a bracelet, while a disk is solid like a coin or a plate.',
    hint: 'تَذَكَّرْ مِثَالَ السِّوَارِ (الدَّائِرَةِ) وَقِطْعَةِ النُّقُودِ (الْقُرْصِ).',
    hintEn: 'Remember the bracelet (circle) and the coin (disk).'
  },
  {
    id: 9,
    question: 'مَا هُوَ أَطْوَلُ وَتَرٍ يُمْكِنُ رَسْمُهُ دَاخِلَ أَيِّ دَائِرَةٍ؟',
    questionEn: 'What is the longest possible chord that can be drawn in a circle?',
    imageType: 'diameter',
    options: ['نِصْفُ الْقُطْرِ', 'الْقُطْرُ', 'الْمُحِيطُ', 'الْمُسْتَقِيمُ'],
    optionsEn: ['The Radius', 'The Diameter', 'The Circumference', 'The Line'],
    correctIndex: 1,
    explanation: 'إِجَابَةٌ صَحِيحَةٌ وَمُتْقَنَةٌ! الْقُطْرُ هُوَ أَطْوَلُ وَتَرٍ فِي الدَّائِرَةِ لِأَنَّهُ يَمُرُّ بِالْمَرْكَزِ مُبَاشَرَةً.',
    explanationEn: 'Correct! The diameter is the longest chord because it goes directly through the center.',
    hint: 'هُوَ الْوَتَرُ الْمُمَيَّزُ الَّذِي يَمُرُّ بِنُقْطَةِ الْمَرْكَزِ.',
    hintEn: 'It is the special chord that passes right through the center.'
  },
  {
    id: 10,
    question: 'فِي عَجَلَةِ الدَّرَّاجَةِ الْهَوَائِيَّةِ، مَاذَا تُمَثِّلُ الْأَسْلَاكُ الْحَدِيدِيَّةُ الْمُنْطَلِقَةُ مِنَ الْمِحْوَرِ الْأَوْسَطِ إِلَى الْإِطَارِ؟',
    questionEn: 'In a bicycle wheel, what do the spokes radiating from the central axle to the outer rim represent?',
    imageType: 'wheel',
    options: ['أَنْصَافَ أَقْطَارٍ', 'أَوْتَاراً فَقَطْ', 'مُرَبَّعَاتٍ', 'مَرَاكِزَ'],
    optionsEn: ['Radii', 'Regular chords only', 'Squares', 'Centers'],
    correctIndex: 0,
    explanation: 'مُمْتَازٌ! كُلُّ سِلْكٍ حَدِيدِيٍّ يَنْطَلِقُ مِنَ الْمَرْكَزِ إِلَى حَافَّةِ الْعَجَلَةِ يُمَثِّلُ نِصْفَ قُطْرٍ.',
    explanationEn: 'Spot on! Each wire spoke going from the center to the wheel edge is a radius.',
    hint: 'يَرْبِطُ بَيْنَ الْمَرْكَزِ وَحَافَّةِ الْعَجَلَةِ.',
    hintEn: 'It connects the center to the edge.'
  }
];

export const CHALLENGE_PUZZLES: ChallengePuzzle[] = [
  {
    id: 1,
    title: 'لُغْزُ الدَّائِرَتَيْنِ الْمُتَمَاسَّتَيْنِ',
    titleEn: 'The Touching Circles Puzzle',
    category: 'حِسَابُ الْمَسَافَةِ بَيْنَ الْمَرْكَزَيْنِ',
    categoryEn: 'Distance Between Centers',
    story: 'وَضَعَ حُسَامٌ قِطْعَتَيْ نُقُودٍ دَائِرِيَّتَيْنِ تَتَلَامَسَانِ فِي نُقْطَةٍ وَاحِدَةٍ دُونَ تَدَاخُلٍ.',
    storyEn: 'Hossam placed two circular coins touching side-by-side at a single point without overlapping.',
    question: 'دَائِرَةٌ أُولَى نِصْفُ قُطْرِهَا 4 سَنْتِيمِتْرَاتٍ، وَدَائِرَةٌ ثَانِيَةٌ نِصْفُ قُطْرِهَا 3 سَنْتِيمِتْرَاتٍ تَتَمَاسَّانِ. مَا هِيَ الْمَسَافَةُ بَيْنَ مَرْكَزَيْهِمَا؟',
    questionEn: 'Two circles with radii of 4 cm and 3 cm touch externally. What is the distance between their centers?',
    visualType: 'touching_circles',
    interactiveLabel: 'اِضْغَطْ لِعَرْضِ الْمَسَافَةِ بَيْنَ الْمَرْكَزَيْنِ',
    interactiveLabelEn: 'Click to measure the distance between centers',
    interactiveData: {
      radius1: 4,
      radius2: 3
    },
    options: ['7 سَنْتِيمِتْرَاتٍ', '12 سَنْتِيمِتْراً', '1 سَنْتِيمِتْرٌ وَاحِدٌ', '14 سَنْتِيمِتْراً'],
    optionsEn: ['7 cm', '12 cm', '1 cm', '14 cm'],
    correctIndex: 0,
    explanation: 'أَحْسَنْتَ يَا بَطَلَ التَّحَدِّي! عِنْدَمَا تَتَمَاسُّ دَائِرَتَانِ، تَكُونُ الْمَسَافَةُ بَيْنَ مَرْكَزَيْهِمَا هِيَ مَجْمُوعُ نِصْفَيِ الْقُطْرَيْنِ: 4 زَائِد 3 يُسَاوِي 7 سَنْتِيمِتْرَاتٍ.',
    explanationEn: 'Great job! When two circles touch externally, the distance between their centers equals the sum of both radii: 4 + 3 = 7 centimeters.',
    hint: 'اِجْمَعْ نِصْفَ قُطْرِ الدَّائِرَةِ الْأُولَى مَعَ نِصْفِ قُطْرِ الدَّائِرَةِ الثَّانِيَةِ (4 + 3 سم).',
    hintEn: 'Add the first radius to the second radius (4 + 3 cm).'
  },
  {
    id: 2,
    title: 'لُغْزُ الدَّائِرَةِ دَاخِلَ الْمُرَبَّعِ',
    titleEn: 'Circle Inside a Square',
    category: 'عَلَاقَةُ الْقُطْرِ بِضِلْعِ الْمُرَبَّعِ',
    categoryEn: 'Diameter and Square Side',
    story: 'رَسَمَتْ مَرْيَمُ دَائِرَةً كَبِيرَةً تَمَسُّ أَضْلَاعَ مُرَبَّعٍ طُولُ ضِلْعِهِ 10 سَنْتِيمِتْرَاتٍ.',
    storyEn: 'Mariam drew a large circle fitting snugly inside a square with side length of 10 cm.',
    question: 'إِذَا كَانَ طُولُ ضِلْعِ الْمُرَبَّعِ 10 سَنْتِيمِتْرَاتٍ، فَمَا هُوَ طُولُ نِصْفِ قُطْرِ هَذِهِ الدَّائِرَةِ؟',
    questionEn: 'If the side length of the square is 10 cm, what is the radius of this inscribed circle?',
    visualType: 'circle_in_square',
    interactiveLabel: 'اِضْغَطْ لِمُقَارَنَةِ ضِلْعِ الْمُرَبَّعِ مَعَ الْقُطْرِ',
    interactiveLabelEn: 'Click to compare square side with diameter',
    interactiveData: {
      squareSide: 10,
      radius1: 5
    },
    options: ['10 سَنْتِيمِتْرَاتٍ', '5 سَنْتِيمِتْرَاتٍ', '20 سَنْتِيمِتْراً', '2.5 سَنْتِيمِتْرٍ'],
    optionsEn: ['10 cm', '5 cm', '20 cm', '2.5 cm'],
    correctIndex: 1,
    explanation: 'عَبْقَرِيٌّ! قُطْرُ الدَّائِرَةِ يُسَاوِي تَمَاماً طُولَ ضِلْعِ الْمُرَبَّعِ وَهُوَ 10 سَنْتِيمِتْرَاتٍ. إِذَنْ نِصْفُ الْقُطْرِ هُوَ نِصْفُ الْعَشَرَةِ: 10 تَقْسِيم 2 يُسَاوِي 5 سَنْتِيمِتْرَاتٍ.',
    explanationEn: 'Genius! The diameter equals the side of the square (10 cm), so the radius is half of that: 10 ÷ 2 = 5 centimeters.',
    hint: 'قُطْرُ الدَّائِرَةِ يُطَابِقُ ضِلْعَ الْمُرَبَّعِ (10 سَنْتِيمِتْرَاتٍ)، فَكَمْ يَكُونُ نِصْفُهُ؟',
    hintEn: 'The diameter equals 10 cm. What is half of 10?'
  },
  {
    id: 3,
    title: 'لُغْزُ سِبَاقِ الْعَجَلَاتِ',
    titleEn: 'The Wheel Race Puzzle',
    category: 'مُقَارَنَةُ حَجْمِ الدَّوَائِرِ',
    categoryEn: 'Comparing Circle Sizes',
    story: 'فِي سِبَاقِ الدَّرَّاجَاتِ، لَدَيْنَا عَجَلَةٌ أُولَى قُطْرُهَا 16 سَنْتِيمِتْراً، وَعَجَلَةٌ ثَانِيَةٌ نِصْفُ قُطْرِهَا 8 سَنْتِيمِتْرَاتٍ.',
    storyEn: 'In a bicycle race, one bike has a wheel diameter of 16 cm, and another has a wheel radius of 8 cm.',
    question: 'أَيُّ الْعَجَلَتَيْنِ أَكْبَرُ حَجْماً وَمَحِيطاً؟',
    questionEn: 'Which of the two wheels is larger in size and circumference?',
    visualType: 'wheel_comparison',
    interactiveLabel: 'اِضْغَطْ لِمُطَابَقَةِ الْعَجَلَتَيْنِ مَعاً',
    interactiveLabelEn: 'Click to overlay both wheels',
    interactiveData: {
      diameter1: 16,
      radius2: 8
    },
    options: [
      'الْعَجَلَةُ الْأُولَى أَكْبَرُ',
      'الْعَجَلَةُ الثَّانِيَةُ أَكْبَرُ',
      'الْعَجَلَتَانِ مُتَسَاوِيَتَانِ تَمَاماً',
      'لَا يُمْكِنُ الْمُقَارَنَةُ'
    ],
    optionsEn: [
      'The first wheel is larger',
      'The second wheel is larger',
      'Both wheels are completely equal',
      'Cannot be compared'
    ],
    correctIndex: 2,
    explanation: 'رَائِعٌ جِدّاً! الْعَجَلَةُ الثَّانِيَةُ نِصْفُ قُطْرِهَا 8 سَنْتِيمِتْرَاتٍ، إِذَنْ قُطْرُهَا هُوَ 8 زَائِد 8 يُسَاوِي 16 سَنْتِيمِتْراً، وَهُوَ نَفْسُ قُطْرِ الْعَجَلَةِ الْأُولَى، لِذَا فَهُمَا مُتَسَاوِيَتَانِ تَمَاماً!',
    explanationEn: 'Awesome! A radius of 8 cm means a diameter of 16 cm (8 + 8 = 16 cm). Both wheels have the exact same size!',
    hint: 'اِحْسِبْ قُطْرَ الْعَجَلَةِ الثَّانِيَةِ (8 ضَرْب 2) وَقَارِنْهُ مَعَ قُطْرِ الْأُولَى (16 سَنْتِيمِتْراً).',
    hintEn: 'Multiply the radius by 2 (8 × 2 = 16 cm) and compare.'
  },
  {
    id: 4,
    title: 'لُغْزُ الدَّوَائِرِ الْمُتَّحِدَةِ فِي الْمَرْكَزِ',
    titleEn: 'Concentric Circles Puzzle',
    category: 'الْمَسَافَةُ بَيْنَ مَحِيطَيْنِ',
    categoryEn: 'Ring Width and Distance',
    story: 'رَسَمَ أَمِينٌ دَائِرَتَيْنِ لَهُمَا نَفْسُ الْمَرْكَزِ: الدَّائِرَةُ الْكُبْرَى قُطْرُهَا 12 سَنْتِيمِتْراً، وَالصُّغْرَى نِصْفُ قُطْرِهَا 4 سَنْتِيمِتْرَاتٍ.',
    storyEn: 'Amine drew two circles sharing the exact same center: the outer circle diameter is 12 cm, and the inner radius is 4 cm.',
    question: 'مَا هِيَ الْمَسَافَةُ بَيْنَ حَافَّتَيِ الدَّائِرَتَيْنِ (عَرْضُ الْحَلَقَةِ الدَّاخِلِيَّةِ)؟',
    questionEn: 'What is the gap distance between the two circles (width of the ring)?',
    visualType: 'concentric_circles',
    interactiveLabel: 'اِضْغَطْ لِقِيَاسِ عَرْضِ الْحَلَقَةِ',
    interactiveLabelEn: 'Click to measure the ring gap',
    interactiveData: {
      diameter1: 12,
      radius2: 4
    },
    options: ['8 سَنْتِيمِتْرَاتٍ', '2 سَنْتِيمِتْرَانِ', '6 سَنْتِيمِتْرَاتٍ', '16 سَنْتِيمِتْراً'],
    optionsEn: ['8 cm', '2 cm', '6 cm', '16 cm'],
    correctIndex: 1,
    explanation: 'مُمْتَازٌ! نِصْفُ قُطْرِ الْكُبْرَى هُوَ 12 تَقْسِيم 2 يُسَاوِي 6 سَنْتِيمِتْرَاتٍ. وَنِصْفُ قُطْرِ الصُّغْرَى هُوَ 4 سَنْتِيمِتْرَاتٍ. إِذَنْ عَرْضُ الْحَلَقَةِ هُوَ: 6 نَاقِص 4 يُسَاوِي 2 سَنْتِيمِتْرَيْنِ.',
    explanationEn: 'Superb! The outer radius is 12 ÷ 2 = 6 cm. The inner radius is 4 cm. The ring gap is 6 - 4 = 2 centimeters.',
    hint: 'اِحْسِبْ أَوَّلاً نِصْفَ قُطْرِ الْكُبْرَى (12 تَقْسِيم 2 = 6 سم) ثُمَّ اطْرَحْ مِنْهُ 4 سَنْتِيمِتْرَاتٍ.',
    hintEn: 'Find outer radius (12 ÷ 2 = 6 cm) and subtract 4 cm.'
  },
  {
    id: 5,
    title: 'لُغْزُ الْوَتَرِ السِّرِّيِّ وَالْمَرْكَزِ',
    titleEn: 'The Secret Chord and Center',
    category: 'اسْتِنْتَاجُ خَاصِّيَّةِ الْقُطْرِ',
    categoryEn: 'Chord Properties',
    story: 'دَائِرَةٌ نِصْفُ قُطْرِهَا 6 سَنْتِيمِتْرَاتٍ، رَسَمَ فِيهَا يُوسُفُ وَتَراً مُسْتَقِيماً طُولُهُ 12 سَنْتِيمِتْراً.',
    storyEn: 'A circle has a radius of 6 cm. Youcef drew a straight chord measuring 12 cm.',
    question: 'هَلْ يَمُرُّ هَذَا الْوَتَرُ حَتْماً بِمَرْكَزِ الدَّائِرَةِ؟',
    questionEn: 'Must this 12 cm chord pass directly through the center of the circle?',
    visualType: 'chord_as_diameter',
    interactiveLabel: 'اِضْغَطْ لِمُعَايَنَةِ مُرُورِ الْوَتَرِ بِالْمَرْكَزِ',
    interactiveLabelEn: 'Click to test chord through center',
    interactiveData: {
      radius1: 6,
      chordLength: 12
    },
    options: [
      'نَعَمْ، يَمُرُّ بِالْمَرْكَزِ لِأَنَّهُ قُطْرٌ كَامِلٌ (أَطْوَلُ وَتَرٍ)',
      'لَا، لَا يَمُرُّ بِالْمَرْكَزِ أَبَداً',
      'يَمُرُّ فَقَطْ إِذَا كَانَتِ الدَّائِرَةُ مُمْتَلِئَةً',
      'لَا يُمْكِنُ مَعْرِفَةُ ذَلِكَ'
    ],
    optionsEn: [
      'Yes, it passes through the center because it is a full diameter',
      'No, it never passes through the center',
      'Only if the circle is filled',
      'Cannot be known'
    ],
    correctIndex: 0,
    explanation: 'إِجَابَةٌ هَنْدَسِيَّةٌ عَبْقَرِيَّةٌ! بِمَا أَنَّ نِصْفَ الْقُطْرِ 6 سَنْتِيمِتْرَاتٍ، فَإِنَّ الْقُطْرَ هُوَ 12 سَنْتِيمِتْراً. وَأَيُّ وَتَرٍ طُولُهُ 12 سَنْتِيمِتْراً هُوَ قُطْرٌ حَتْماً، وَالْقُطْرُ يَمُرُّ إِجْبَارِيّاً بِالْمَرْكَزِ!',
    explanationEn: 'Genius geometry! Since the radius is 6 cm, the diameter is 12 cm. Any chord of length 12 cm is a diameter and must pass through the center!',
    hint: 'طُولُ الْقُطْرِ = 6 + 6 = 12 سَنْتِيمِتْراً. الْوَتَرُ الَّذِي يُسَاوِي الْقُطْرَ يَمُرُّ دَائِماً بِالْمَرْكَزِ.',
    hintEn: 'Diameter = 6 + 6 = 12 cm. A chord equal to the diameter always passes through the center.'
  },
  {
    id: 6,
    title: 'لُغْزُ فَتْحَةِ الْمِدْوَرِ فِي الْكُرَّاسِ',
    titleEn: 'Compass Opening on the Ruler',
    category: 'الضَّبْطُ الصَّحِيحُ لِلْمِدْوَرِ',
    categoryEn: 'Setting the Compass',
    story: 'طَلَبَ مُعَلِّمُ الرِّيَاضِيَّاتِ مِنْ كَرِيمٍ رَسْمَ دَائِرَةٍ قُطْرُهَا الْإِجْمَالِيُّ 14 سَنْتِيمِتْراً.',
    storyEn: 'The math teacher asked Karim to draw a circle with a total diameter of 14 cm.',
    question: 'كَمْ سَنْتِيمِتْراً يَجِبُ أَنْ يَفْتَحَ كَرِيمٌ الْمِدْوَرَ عَلَى الْمِسْطَرَةِ الْمُدَرَّجَةِ؟',
    questionEn: 'How many centimeters should Karim open his compass on the ruler?',
    visualType: 'compass_opening',
    interactiveLabel: 'اِضْغَطْ لِتَجْرِبَةِ فَتْحَةِ الْمِدْوَرِ عَلَى الْمِسْطَرَةِ',
    interactiveLabelEn: 'Click to test compass opening on ruler',
    interactiveData: {
      diameter1: 14,
      compassGap: 7
    },
    options: ['14 سَنْتِيمِتْراً', '7 سَنْتِيمِتْرَاتٍ', '28 سَنْتِيمِتْراً', '4 سَنْتِيمِتْرَاتٍ'],
    optionsEn: ['14 cm', '7 cm', '28 cm', '4 cm'],
    correctIndex: 1,
    explanation: 'بَطَلٌ نَابِغٌ! عِنْدَ الرَّسْمِ بِالْمِدْوَرِ، نَفْتَحُهُ دَائِماً عَلَى طُولِ "نِصْفِ الْقُطْرِ" وَلَيْسَ الْقُطْرَ. نِصْفُ 14 هُوَ 7 سَنْتِيمِتْرَاتٍ.',
    explanationEn: 'Clever champion! When setting a compass, we always adjust it to the radius (half the diameter). Half of 14 is 7 centimeters.',
    hint: 'فَتْحَةُ الْمِدْوَرِ = نِصْفُ الْقُطْرِ (14 تَقْسِيم 2 = 7 سم).',
    hintEn: 'Compass opening = Radius (14 ÷ 2 = 7 cm).'
  },
  {
    id: 7,
    title: 'لُغْزُ سَاعَةِ الْحَائِطِ وَالْعَقَارِبِ',
    titleEn: 'Clock Hands and Line Puzzle',
    category: 'تَشْكِيلُ الْقُطْرِ مِنَ الْعَقَارِبِ',
    categoryEn: 'Collinear Clock Hands',
    story: 'عِنْدَ السَّاعَةِ السَّادِسَةِ تَمَاماً (6:00)، يُشِيرُ عَقْرَبُ الدَّقَائِقِ إِلَى 12 (طُولُهُ 7 سَنْتِيمِتْرَاتٍ)، وَعَقْرَبُ السَّاعَاتِ إِلَى 6 (طُولُهُ 5 سَنْتِيمِتْرَاتٍ).',
    storyEn: 'At 6:00 sharp, the minute hand points to 12 (length 7 cm) and the hour hand points to 6 (length 5 cm).',
    question: 'كَمْ يَكُونُ الطُّولُ الْكُلِّيُّ لِلْخَطِّ الْمُسْتَقِيمِ الْوَاصِلِ بَيْنَ طَرَفَيِ الْعَقْرَبَيْنِ؟',
    questionEn: 'What is the total length of the straight line connecting the tips of both hands?',
    visualType: 'clock_diameter',
    interactiveLabel: 'اِضْغَطْ لِرُؤْيَةِ اسْتِقَامَةِ الْعَقْرَبَيْنِ عِنْدَ 6:00',
    interactiveLabelEn: 'Click to align hands at 6:00',
    interactiveData: {
      radius1: 7,
      radius2: 5
    },
    options: ['12 سَنْتِيمِتْراً', '2 سَنْتِيمِتْرَانِ', '35 سَنْتِيمِتْراً', '7 سَنْتِيمِتْرَاتٍ'],
    optionsEn: ['12 cm', '2 cm', '35 cm', '7 cm'],
    correctIndex: 0,
    explanation: 'مُمْتَازٌ وَذَكِيٌّ! عِنْدَ السَّاعَةِ السَّادِسَةِ يَكُونُ الْعَقْرَبَانِ عَلَى خَطٍّ مُسْتَقِيمٍ وَاحِدٍ يَمُرُّ بِالْمَرْكَزِ. الطُّولُ الْإِجْمَالِيُّ هُوَ: 7 زَائِد 5 يُسَاوِي 12 سَنْتِيمِتْراً.',
    explanationEn: 'Smart! At 6 o clock, both hands form a single straight line through the center: 7 + 5 = 12 centimeters.',
    hint: 'اِجْمَعْ طُولَ عَقْرَبِ الدَّقَائِقِ مَعَ طُولِ عَقْرَبِ السَّاعَاتِ (7 + 5 سم).',
    hintEn: 'Add the minute hand and hour hand lengths (7 + 5 cm).'
  },
  {
    id: 8,
    title: 'لُغْزُ جِذْعِ الشَّجَرَةِ الْمَقْطُوعِ',
    titleEn: 'Tree Trunk Cross-Section',
    category: 'تَطْبِيقَاتٌ مِنَ الطَّبِيعَةِ',
    categoryEn: 'Nature Geometry',
    story: 'قَاسَ حَارِسُ الْغَابَةِ قُطْرَ جِذْعِ شَجَرَةٍ دَائِرِيٍّ فَوَجَدَهُ 30 سَنْتِيمِتْراً، ثُمَّ حَدَّدَ مَرْكَزَهُ بِدِقَّةٍ.',
    storyEn: 'A forest ranger measured the circular tree trunk diameter to be 30 cm, then located its exact center.',
    question: 'كَمْ تَبْعُدُ نُقْطَةُ الْمَرْكَزِ عَنْ لِحَاءِ الشَّجَرَةِ الْخَارِجِيِّ؟',
    questionEn: 'How far is the center point from the outer tree bark?',
    visualType: 'tree_cross_section',
    interactiveLabel: 'اِضْغَطْ لِإِظْهَارِ نِصْفِ قُطْرِ جِذْعِ الشَّجَرَةِ',
    interactiveLabelEn: 'Click to reveal the tree radius',
    interactiveData: {
      diameter1: 30,
      radius1: 15
    },
    options: ['30 سَنْتِيمِتْراً', '15 سَنْتِيمِتْراً', '60 سَنْتِيمِتْراً', '10 سَنْتِيمِتْرَاتٍ'],
    optionsEn: ['30 cm', '15 cm', '60 cm', '10 cm'],
    correctIndex: 1,
    explanation: 'تَحِيَّةٌ لَكَ يَا عَبْقَرِيَّ الْهَنْدَسَةِ! الْمَسَافَةُ مِنَ الْمَرْكَزِ إِلَى اللَّحَاءِ الْخَارِجِيِّ هِيَ نِصْفُ الْقُطْرِ: 30 تَقْسِيم 2 يُسَاوِي 15 سَنْتِيمِتْراً.',
    explanationEn: 'Salute to you! The distance from the center to the outer bark is the radius: 30 ÷ 2 = 15 centimeters.',
    hint: 'الْمَسَافَةُ مِنَ الْمَرْكَزِ إِلَى الطَّرَفِ هِيَ نِصْفُ الْقُطْرِ (30 تَقْسِيم 2 = 15 سم).',
    hintEn: 'Distance from center to edge is the radius (30 ÷ 2 = 15 cm).'
  },
  {
    id: 9,
    title: 'لُغْزُ صُنْدُوقِ الْكُرَتَيْنِ الْمُتَطَابِقَتَيْنِ',
    titleEn: 'Two Circles in a Box',
    category: 'عَلَاقَةُ الْأَقْطَارِ بِأَبْعَادِ الْمُسْتَطِيلِ',
    categoryEn: 'Circles in a Rectangle',
    story: 'وَضَعَتْ سَلْمَى كُرَتَيْنِ دَائِرِيَّتَيْنِ مُتَمَاسَّتَيْنِ وَمُتَطَابِقَتَيْنِ تَمَاماً دَاخِلَ صُنْدُوقٍ مُسْتَطِيلٍ، قُطْرُ كُلِّ كُرَةٍ 8 سَنْتِيمِتْرَاتٍ.',
    storyEn: 'Salma placed two identical touching circular disks inside a rectangular box. Each disk has a diameter of 8 cm.',
    question: 'مَا هُوَ أَقَلُّ طُولٍ لِلصُّنْدُوقِ لِيَتَّسِعَ لِلْكُرَتَيْنِ جَنْباً إِلَى جَنْبٍ تَمَاماً؟',
    questionEn: 'What is the minimum length of the box to fit both disks side-by-side?',
    visualType: 'two_circles_in_rectangle',
    interactiveLabel: 'اِضْغَطْ لِحِسَابِ مَجْمُوعِ قُطْرَيِ الْكُرَتَيْنِ',
    interactiveLabelEn: 'Click to calculate combined diameters',
    interactiveData: {
      diameter1: 8,
      diameter2: 8,
      rectLength: 16,
      rectWidth: 8
    },
    options: ['8 سَنْتِيمِتْرَاتٍ', '16 سَنْتِيمِتْراً', '24 سَنْتِيمِتْراً', '4 سَنْتِيمِتْرَاتٍ'],
    optionsEn: ['8 cm', '16 cm', '24 cm', '4 cm'],
    correctIndex: 1,
    explanation: 'بَرَاعَةٌ هَنْدَسِيَّةٌ فَائِقَةٌ! طُولُ الصُّنْدُوقِ يَسْتَوْعِبُ قُطْرَيِ الْكُرَتَيْنِ مَعاً: 8 زَائِد 8 يُسَاوِي 16 سَنْتِيمِتْراً (أَوْ 8 ضَرْب 2 = 16 سم).',
    explanationEn: 'Brilliant! The length of the box holds both diameters side-by-side: 8 + 8 = 16 centimeters.',
    hint: 'اِجْمَعْ قُطْرَ الْكُرَةِ الْأُولَى مَعَ قُطْرِ الْكُرَةِ الثَّانِيَةِ (8 + 8 سم).',
    hintEn: 'Add the two diameters (8 + 8 cm).'
  },
  {
    id: 10,
    title: 'لُغْزُ نِصْفِ الدَّائِرَةِ وَأَقْصَى ارْتِفَاعٍ',
    titleEn: 'Semi-Circle Peak Height',
    category: 'ارْتِفَاعُ الْقَوْسِ وَنِصْفُ الْقُطْرِ',
    categoryEn: 'Semi-Circle Geometry',
    story: 'رَسَمَ زِيَادٌ نِصْفَ دَائِرَةٍ قَوْسِيَّةٍ جَمِيلَةً، طُولُ قَاعِدَتِهَا الْمُسْتَقِيمَةِ (الْقُطْرِ) 18 سَنْتِيمِتْراً.',
    storyEn: 'Ziad drew a semi-circle with a straight baseline diameter of 18 cm.',
    question: 'كَمْ يَبْلُغُ أَقْصَى ارْتِفَاعٍ لِقَوْسِ نِصْفِ الدَّائِرَةِ مِنَ الْمَرْكَزِ إِلَى قِمَّةِ الْقَوْسِ؟',
    questionEn: 'What is the maximum peak height of the arc from the center to the top?',
    visualType: 'semi_circle_diameter',
    interactiveLabel: 'اِضْغَطْ لِمُشَاهَدَةِ ارْتِفَاعِ الْقَوْسِ كَنِصْفِ قُطْرٍ',
    interactiveLabelEn: 'Click to see arc peak as radius',
    interactiveData: {
      diameter1: 18,
      radius1: 9
    },
    options: ['18 سَنْتِيمِتْراً', '9 سَنْتِيمِتْرَاتٍ', '36 سَنْتِيمِتْراً', '6 سَنْتِيمِتْرَاتٍ'],
    optionsEn: ['18 cm', '9 cm', '36 cm', '6 cm'],
    correctIndex: 1,
    explanation: 'إِجَابَةٌ ذَكِيَّةٌ وَمُبْهِرَةٌ! أَقْصَى ارْتِفَاعٍ يَنْطَلِقُ مِنَ الْمَرْكَزِ إِلَى حَافَّةِ الْقَوْسِ هُوَ نِصْفُ الْقُطْرِ: 18 تَقْسِيم 2 يُسَاوِي 9 سَنْتِيمِتْرَاتٍ.',
    explanationEn: 'Super clever! The line from the center to the top of the arc is a radius: 18 ÷ 2 = 9 centimeters.',
    hint: 'الْخَطُّ الْوَاصِلُ مِنَ الْمَرْكَزِ إِلَى قِمَّةِ الْقَوْسِ هُوَ نِصْفُ قُطْرٍ (18 تَقْسِيم 2 = 9 سم).',
    hintEn: 'The vertical line from center to top is the radius (18 ÷ 2 = 9 cm).'
  },
  {
    id: 11,
    title: 'لُغْزُ شَفَرَاتِ الْمَرْوَحَةِ الْهَوَائِيَّةِ',
    titleEn: 'Fan Blades Radius Puzzle',
    category: 'أَنْصَافُ الْأَقْطَارِ الْمُنْطَلِقَةُ مِنَ الْمَرْكَزِ',
    categoryEn: 'Radiating Fan Blades',
    story: 'مَرْوَحَةٌ دَائِرِيَّةٌ لَهَا 4 شَفَرَاتٍ مُتَسَاوِيَةٍ تَنْطَلِقُ كُلُّهَا مِنَ الْمِحْوَرِ الْمَرْكَزِيِّ إِلَى الْإِطَارِ. قُطْرُ إِطَارِ الْمَرْوَحَةِ 24 سَنْتِيمِتْراً.',
    storyEn: 'A circular fan has 4 equal blades extending from the central hub to the outer frame. The fan diameter is 24 cm.',
    question: 'كَمْ يَبْلُغُ طُولُ كُلِّ شَفْرَةٍ مِنَ الشَّفَرَاتِ الْأَرْبَعِ؟',
    questionEn: 'How long is each of the four fan blades?',
    visualType: 'fan_blades_circle',
    interactiveLabel: 'اِضْغَطْ لِقِيَاسِ طُولِ شَفْرَةِ الْمَرْوَحَةِ',
    interactiveLabelEn: 'Click to measure blade length',
    interactiveData: {
      diameter1: 24,
      bladeLength: 12
    },
    options: ['24 سَنْتِيمِتْراً', '12 سَنْتِيمِتْراً', '6 سَنْتِيمِتْرَاتٍ', '48 سَنْتِيمِتْراً'],
    optionsEn: ['24 cm', '12 cm', '6 cm', '48 cm'],
    correctIndex: 1,
    explanation: 'عَبْقَرِيٌّ جِدّاً! كُلُّ شَفْرَةٍ تَبْدَأُ مِنَ الْمَرْكَزِ وَتَنْتَهِي عِنْدَ الْإِطَارِ، إِذَنْ طُولُهَا يُسَاوِي نِصْفَ الْقُطْرِ: 24 تَقْسِيم 2 يُسَاوِي 12 سَنْتِيمِتْراً.',
    explanationEn: 'Spot on! Each blade goes from the center hub to the outer rim, so its length is the radius: 24 ÷ 2 = 12 centimeters.',
    hint: 'كُلُّ شَفْرَةٍ تُمَثِّلُ نِصْفَ قُطْرٍ كَامِلٍ (24 تَقْسِيم 2 = 12 سم).',
    hintEn: 'Each blade is a radius (24 ÷ 2 = 12 cm).'
  },
  {
    id: 12,
    title: 'لُغْزُ قِطْعَةِ الْبِيتْزَا الدَّائِرِيَّةِ',
    titleEn: 'Pizza Slice Sector Puzzle',
    category: 'أَضْلَاعُ الْقِطَاعِ الدَّائِرِيِّ',
    categoryEn: 'Sector Sides and Radius',
    story: 'قَسَّمَ سَامِي قُرْصَ بِيتْزَا دَائِرِيّاً قُطْرُهُ 20 سَنْتِيمِتْراً، ثُمَّ رَفَعَ قِطْعَةً مُثَلَّثِيَّةَ الشَّكْلِ قِمَّتُهَا عِنْدَ الْمَرْكَزِ تَمَاماً.',
    storyEn: 'Sami sliced a round pizza with a diameter of 20 cm, taking a triangular slice whose tip is right at the center.',
    question: 'مَا هُوَ طُولُ كُلِّ ضِلْعٍ مُسْتَقِيمٍ فِي قِطْعَةِ الْبِيتْزَا مِنَ الْمَرْكَزِ إِلَى الْحَافَّةِ؟',
    questionEn: 'What is the length of each straight side of the pizza slice from the center to the crust?',
    visualType: 'pizza_slice_sector',
    interactiveLabel: 'اِضْغَطْ لِمُعَايَنَةِ ضِلْعَيِ الْقِطْعَةِ كَنِصْفَيْ قُطْرٍ',
    interactiveLabelEn: 'Click to inspect slice sides as radii',
    interactiveData: {
      diameter1: 20,
      radius1: 10
    },
    options: ['20 سَنْتِيمِتْراً', '10 سَنْتِيمِتْرَاتٍ', '5 سَنْتِيمِتْرَاتٍ', '40 سَنْتِيمِتْراً'],
    optionsEn: ['20 cm', '10 cm', '5 cm', '40 cm'],
    correctIndex: 1,
    explanation: 'مُمْتَازٌ وَرَائِعٌ! ضِلْعَا قِطْعَةِ الْبِيتْزَا يَمْتَدَّانِ مِنَ الْمَرْكَزِ إِلَى الْحَافَّةِ، فَيُمَثِّلُ كُلٌّ مِنْهُمَا نِصْفَ قُطْرٍ: 20 تَقْسِيم 2 يُسَاوِي 10 سَنْتِيمِتْرَاتٍ.',
    explanationEn: 'Awesome! Both straight edges of a pizza slice extend from the center to the crust, making each of them a radius: 20 ÷ 2 = 10 centimeters.',
    hint: 'الضِّلْعُ الْمُسْتَقِيمُ يَصِلُ الْمَرْكَزَ بِالْمُحِيطِ، فَهوَ نِصْفُ قُطْرٍ (20 تَقْسِيم 2 = 10 سم).',
    hintEn: 'The straight side goes from center to edge, so it is a radius (20 ÷ 2 = 10 cm).'
  }
];
