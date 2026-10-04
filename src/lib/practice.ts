export type Practice = {
  briefEn: string;
  briefGu: string;
  storyEn: string;
  storyGu: string;
  pujaEn: string[];
  pujaGu: string[];
  foodEn: string[];
  foodGu: string[];
  avoidEn: string[];
  avoidGu: string[];
};

const NAVADURGA: [string, string][] = [
  ["Shailputri", "શૈલપુત્રી"],
  ["Brahmacharini", "બ્રહ્મચારિણી"],
  ["Chandraghanta", "ચંદ્રઘંટા"],
  ["Kushmanda", "કૂષ્માંડા"],
  ["Skandamata", "સ્કંદમાતા"],
  ["Katyayani", "કાત્યાયની"],
  ["Kalaratri", "કાલરાત્રિ"],
  ["Mahagauri", "મહાગૌરી"],
  ["Siddhidatri", "સિદ્ધિદાત્રી"],
];

function practice(input: Practice): Practice {
  return input;
}

const EKADASHI_FAST: Pick<Practice, "pujaEn" | "pujaGu" | "foodEn" | "foodGu" | "avoidEn" | "avoidGu"> = {
  pujaEn: [
    "Decide in the morning that this day is a Vishnu fast. A photo or a small murti is enough. Offer water, a tulsi leaf if you have one, and a lamp.",
    "Eat nothing made from grain. Most Gujarati homes break the fast the next morning, after sunrise, not at midnight.",
    "If a full fast is too much, keep the food rule and skip the hunger. The vrat is the grain, not a contest.",
  ],
  pujaGu: [
    "સવારે નક્કી કરો કે આજે વિષ્ણુનો ઉપવાસ છે. ફોટો કે નાની મૂર્તિ બસ છે. જળ, હોય તો તુલસી, અને દીવો ધરાવો.",
    "અનાજમાંથી બનેલું કાંઈ ખાશો નહીં. મોટાભાગના ગુજરાતી ઘરે બીજા દિવસે સૂર્યોદય પછી પારણું કરે છે, મધરાતે નહીં.",
    "આખો ઉપવાસ ભારે પડે તો ખોરાકનો નિયમ રાખો. વ્રત અનાજનો છે, સ્પર્ધાનો નહીં.",
  ],
  foodEn: [
    "Farali food: potato, peanut, sabudana, milk, fruit, rajgira, and sendha namak if your house avoids ordinary salt.",
    "One simple meal is a common way. Fruit and milk alone is also a complete fast.",
  ],
  foodGu: [
    "ફરાળ: બટાકા, સિંગ, સાબુદાણા, દૂધ, ફળ, રાજગરો, અને ઘરે રિવાજ હોય તો સેંધા મીઠું.",
    "એક સાદું જમવાનું ચાલે. માત્ર ફળ અને દૂધ પણ પૂરો ઉપવાસ ગણાય.",
  ],
  avoidEn: [
    "Rice, wheat, millet, and ordinary dal. Onion and garlic too, if the house is keeping the fast strictly.",
    "Do not break the fast tonight because the calendar date is about to change. Wait for the next morning.",
  ],
  avoidGu: [
    "ભાત, ઘઉં, બાજરી અને રોજિંદી દાળ. કડક વ્રત હોય તો ડુંગળી અને લસણ પણ નહીં.",
    "તારીખ બદલાય એટલે આજે રાત્રે પારણું ન કરો. બીજા દિવસની સવારની રાહ જુઓ.",
  ],
};

const EKADASHI_STORY: Record<string, Pick<Practice, "briefEn" | "briefGu" | "storyEn" | "storyGu">> = {
  "kamada-ekadashi": {
    briefEn: "A Vishnu fast for a wish you can say out loud. No grain today.",
    briefGu: "જે મનોકામના કહી શકાય તે માટે વિષ્ણુનો ઉપવાસ. આજે અનાજ નહીં.",
    storyEn: "Kamada Ekadashi falls in Chaitra, the first month of the year. The name means the fast that grants a wish. Homes treat it as the first big ekadashi after the new year season.",
    storyGu: "કામદા એકાદશી ચૈત્રમાં આવે છે, વર્ષના પહેલા મહિને. નામનો અર્થ મનોકામના પૂરી કરનાર ઉપવાસ. નવા વર્ષની ઋતુ પછીની પહેલી મોટી એકાદશી તરીકે ઘરે રાખવામાં આવે છે.",
  },
  "varuthini-ekadashi": {
    briefEn: "A Krishna-paksha Vishnu fast. No grain today, break it tomorrow morning.",
    briefGu: "વદ પક્ષની વિષ્ણુ એકાદશી. આજે અનાજ નહીં, કાલે સવારે પારણું.",
    storyEn: "Varuthini is the dark-fortnight ekadashi of Chaitra. The household rule is the same as every ekadashi: the day belongs to Vishnu, and grain waits.",
    storyGu: "વરૂથિની ચૈત્ર વદની એકાદશી છે. ઘરનો નિયમ દરેક એકાદશી જેવો છે: દિવસ વિષ્ણુનો, અનાજ રાહ જુએ.",
  },
  "mohini-ekadashi": {
    briefEn: "Vaishakh's bright-fortnight fast. No grain, and a lamp for Vishnu.",
    briefGu: "વૈશાખ સુદની એકાદશી. અનાજ નહીં, અને વિષ્ણુનો દીવો.",
    storyEn: "Mohini Ekadashi is the bright-fortnight fast of Vaishakh. Families who keep every ekadashi do not treat this one as optional just because it has a softer name.",
    storyGu: "મોહિની એકાદશી વૈશાખ સુદનો ઉપવાસ છે. દરેક એકાદશી રાખનાર ઘર આને નામ નરમ છે એટલે છોડતા નથી.",
  },
  "apara-ekadashi": {
    briefEn: "Vaishakh's dark-fortnight fast. No grain until tomorrow morning.",
    briefGu: "વૈશાખ વદની એકાદશી. કાલે સવાર સુધી અનાજ નહીં.",
    storyEn: "Apara Ekadashi is the dark fortnight of Vaishakh. Keep the ordinary ekadashi fast. There is no separate festival meal.",
    storyGu: "અપરા એકાદશી વૈશાખ વદની છે. સામાન્ય એકાદશીનો ઉપવાસ રાખો. અલગ તહેવારનું જમવાનું નથી.",
  },
  "nirjala-ekadashi": {
    briefEn: "The waterless fast, if your health allows it. Otherwise keep the grain fast and drink water.",
    briefGu: "તબિયત સાથ આપે તો નિર્જળ ઉપવાસ. નહીં તો અનાજનો ઉપવાસ રાખો અને પાણી પીઓ.",
    storyEn: "Nirjala Ekadashi, in Jyeshtha, is the strict one. The old rule is no food and no water until the next morning. It is also kept as a stand-in by people who cannot fast on every ekadashi. Skip the waterless part if you are ill, pregnant, or on medicine. The grain fast is still the vrat.",
    storyGu: "નિર્જળા એકાદશી જેઠમાં આવે છે, અને કડક છે. જૂનો નિયમ બીજા દિવસની સવાર સુધી અન્ન નહીં અને પાણી નહીં. જે દરેક એકાદશી ન રાખી શકે તે આ એક રાખે છે. બીમારી, સગર્ભાવસ્થા કે દવા હોય તો પાણી વગરનો ભાગ છોડો. અનાજનો ઉપવાસ તો વ્રત છે.",
  },
  "yogini-ekadashi": {
    briefEn: "Jyeshtha's dark-fortnight fast. No grain today.",
    briefGu: "જેઠ વદની એકાદશી. આજે અનાજ નહીં.",
    storyEn: "Yogini Ekadashi is the dark fortnight of Jyeshtha, a few days after the waterless fast. Keep the ordinary grain fast. You do not repeat Nirjala's rules.",
    storyGu: "યોગિની એકાદશી જેઠ વદની છે, નિર્જળા પછીના થોડા દિવસે. સામાન્ય અનાજનો ઉપવાસ રાખો. નિર્જળાના નિયમ ફરી લાગુ નથી.",
  },
  "devshayani-ekadashi": {
    briefEn: "Chaturmas begins. No grain today, and new weddings and new ventures wait for four months.",
    briefGu: "ચાતુર્માસ શરૂ. આજે અનાજ નહીં, અને લગ્ન તથા નવા કામ ચાર મહિના રાહ જુએ.",
    storyEn: "Devshayani Ekadashi, in Ashadh, is the day Vishnu is said to sleep. Chaturmas begins. The fast is an ordinary ekadashi fast, and the household also pauses auspicious new starts: weddings, housewarmings, and opening a shop, until Devutthana in Kartak.",
    storyGu: "દેવશયની એકાદશી અષાઢમાં આવે છે. વિષ્ણુ શયન કરે છે એમ કહેવાય. ચાતુર્માસ શરૂ થાય. ઉપવાસ સામાન્ય એકાદશીનો છે, અને ઘર નવા શુભ કામ રોકે છે: લગ્ન, ગૃહપ્રવેશ અને દુકાન શરૂ કરવી, કારતકની દેવઉત્થાન સુધી.",
  },
  "kamika-ekadashi": {
    briefEn: "Ashadh's dark-fortnight fast, inside Chaturmas. No grain today.",
    briefGu: "અષાઢ વદની એકાદશી, ચાતુર્માસની અંદર. આજે અનાજ નહીં.",
    storyEn: "Kamika Ekadashi is the dark fortnight of Ashadh, soon after Devshayani. Keep the grain fast. Chaturmas has already begun, so this is not a day for a new auspicious start either.",
    storyGu: "કામિકા એકાદશી અષાઢ વદની છે, દેવશયની પછી તરત. અનાજનો ઉપવાસ રાખો. ચાતુર્માસ શરૂ થઈ ચૂક્યો છે, એટલે નવા શુભ કામનો દિવસ પણ નથી.",
  },
  "shravana-putrada-ekadashi": {
    briefEn: "Shravan's bright-fortnight fast, kept by people hoping for a child and by everyone else as a Vishnu fast.",
    briefGu: "શ્રાવણ સુદની એકાદશી. સંતાનની ઇચ્છા હોય તે રાખે, અને બાકીના વિષ્ણુના ઉપવાસ તરીકે.",
    storyEn: "Shravana Putrada Ekadashi is kept with a wish for a child in many tellings. You do not need that wish to keep the fast. It is still the bright-fortnight ekadashi of Shravan, in the middle of Chaturmas.",
    storyGu: "શ્રાવણ પુત્રદા એકાદશી ઘણી કથામાં સંતાનની ઇચ્છાથી રાખાય છે. એ ઇચ્છા વગર પણ ઉપવાસ રાખી શકાય. આ શ્રાવણ સુદની એકાદશી છે, ચાતુર્માસની વચ્ચે.",
  },
  "aja-ekadashi": {
    briefEn: "Shravan's dark-fortnight fast. No grain today.",
    briefGu: "શ્રાવણ વદની એકાદશી. આજે અનાજ નહીં.",
    storyEn: "Aja Ekadashi is the dark fortnight of Shravan. Keep the ordinary fast. Shravan is already a month of Monday Shiva fasts, and this day stays a Vishnu day.",
    storyGu: "અજા એકાદશી શ્રાવણ વદની છે. સામાન્ય ઉપવાસ રાખો. શ્રાવણમાં સોમવારે શિવના વ્રત ચાલે છે, પણ આ દિવસ વિષ્ણુનો રહે છે.",
  },
  "parsva-ekadashi": {
    briefEn: "Vishnu is said to turn on his side. No grain today. Chaturmas continues.",
    briefGu: "વિષ્ણુ બાજુ બદલે છે એમ કહેવાય. આજે અનાજ નહીં. ચાતુર્માસ ચાલુ રહે.",
    storyEn: "Parsva, or Parivartini, Ekadashi is the bright fortnight of Bhadarvo. The story says Vishnu turns from one side to the other while he sleeps. The fast is the usual ekadashi fast. Nothing else in the house has to change.",
    storyGu: "પાર્શ્વ અથવા પરિવર્તિની એકાદશી ભાદરવા સુદની છે. કથા એ છે કે ઊંઘતા વિષ્ણુ એક બાજુથી બીજી બાજુ વળે છે. ઉપવાસ સામાન્ય એકાદશીનો છે. ઘરમાં બીજું બદલવાનું નથી.",
  },
  "indira-ekadashi": {
    briefEn: "Bhadarvo's dark-fortnight fast, often kept with ancestors in mind. No grain today.",
    briefGu: "ભાદરવા વદની એકાદશી, ઘણી વાર પિતૃઓને યાદ કરીને. આજે અનાજ નહીં.",
    storyEn: "Indira Ekadashi is the dark fortnight of Bhadarvo, near pitru paksha. Some families remember ancestors on this fast. The food rule does not change: no grain, and break it the next morning.",
    storyGu: "ઇન્દિરા એકાદશી ભાદરવા વદની છે, પિતૃ પક્ષની નજીક. કેટલાક ઘર આ ઉપવાસે પિતૃઓને યાદ કરે છે. ખોરાકનો નિયમ એ જ: અનાજ નહીં, અને બીજા દિવસે સવારે પારણું.",
  },
  "papankusha-ekadashi": {
    briefEn: "Aso's bright-fortnight fast, during Navratri season. No grain today.",
    briefGu: "આસો સુદની એકાદશી, નવરાત્રિની ઋતુમાં. આજે અનાજ નહીં.",
    storyEn: "Papankusha Ekadashi falls in Ashwin, around the Navratri season. If it lands in the nine nights, keep the fast and still light Amba's lamp in the evening. Garba and a grain fast can share a night.",
    storyGu: "પાપાંકુશા એકાદશી આસોમાં, નવરાત્રિની આસપાસ આવે છે. નવ રાત્રિમાં પડે તો ઉપવાસ રાખો અને સાંજે આંબાનો દીવો પણ કરો. ગરબો અને અનાજનો ઉપવાસ એક જ રાત્રે ચાલે.",
  },
  "rama-ekadashi": {
    briefEn: "Aso's dark-fortnight fast, in the Diwali run-up. No grain today.",
    briefGu: "આસો વદની એકાદશી, દિવાળીની તૈયારીમાં. આજે અનાજ નહીં.",
    storyEn: "Rama Ekadashi is the dark fortnight of Ashwin, as the Diwali days approach. It is a Vishnu fast, not a Diwali rite. Keep grain aside for the day.",
    storyGu: "રમા એકાદશી આસો વદની છે, દિવાળીના દિવસો નજીક આવે ત્યારે. આ વિષ્ણુનો ઉપવાસ છે, દિવાળીની વિધિ નહીં. આજે અનાજ બાજુએ રાખો.",
  },
  "devutthana-ekadashi": {
    briefEn: "Chaturmas ends. No grain today. Weddings and new starts may begin again after this fast.",
    briefGu: "ચાતુર્માસ પૂરો. આજે અનાજ નહીં. આ ઉપવાસ પછી લગ્ન અને નવા કામ ફરી શરૂ થઈ શકે.",
    storyEn: "Devutthana, or Prabodhini, Ekadashi is in Kartak. Vishnu is said to wake, and Chaturmas ends. Keep the grain fast today. From the next day, weddings and other auspicious starts return to the calendar. Tulsi vivah season also opens.",
    storyGu: "દેવઉત્થાન અથવા પ્રબોધિની એકાદશી કારતકમાં આવે છે. વિષ્ણુ જાગે છે એમ કહેવાય, અને ચાતુર્માસ પૂરો થાય. આજે અનાજનો ઉપવાસ રાખો. બીજા દિવસથી લગ્ન અને બીજા શુભ કામ પાછા આવે. તુલસી વિવાહની ઋતુ પણ ખુલે છે.",
  },
  "utpanna-ekadashi": {
    briefEn: "Kartak's dark-fortnight fast, the one stories call the first ekadashi. No grain today.",
    briefGu: "કારતક વદની એકાદશી, જેને કથા પહેલી એકાદશી કહે છે. આજે અનાજ નહીં.",
    storyEn: "Utpanna Ekadashi, in Kartak's dark fortnight, is told as the ekadashi on which the fast itself was born. The household practice is still the ordinary grain fast.",
    storyGu: "ઉત્પન્ના એકાદશી કારતક વદની છે. કથા એ છે કે ઉપવાસ જ આ દિવસે જન્મ્યો. ઘરની રીત ફરી સામાન્ય અનાજનો ઉપવાસ છે.",
  },
  "mokshada-ekadashi": {
    briefEn: "Gita Jayanti. No grain today. Read a few verses if you can, or simply keep the fast.",
    briefGu: "ગીતા જયંતી. આજે અનાજ નહીં. થોડા શ્લોક વાંચી શકો તો વાંચો, નહીં તો ઉપવાસ બસ છે.",
    storyEn: "Mokshada Ekadashi is the bright fortnight of Magsar, kept as Gita Jayanti, the day the Bhagavad Gita was spoken. A fast, a lamp, and even one chapter or a few verses are the home observance. You do not need to finish the whole book.",
    storyGu: "મોક્ષદા એકાદશી માગશર સુદની છે, ગીતા જયંતી તરીકે. ભગવદ્ગીતા આ દિવસે કહેવાઈ એમ માનવામાં આવે છે. ઉપવાસ, દીવો, અને એક અધ્યાય કે થોડા શ્લોક ઘરની રીત છે. આખું પુસ્તક પૂરું કરવું જરૂરી નથી.",
  },
  "safala-ekadashi": {
    briefEn: "Magsar's dark-fortnight fast. No grain today.",
    briefGu: "માગશર વદની એકાદશી. આજે અનાજ નહીં.",
    storyEn: "Safala Ekadashi is the dark fortnight of Magsar. Keep the grain fast. There is no extra rite beyond the usual Vishnu day.",
    storyGu: "સફલા એકાદશી માગશર વદની છે. અનાજનો ઉપવાસ રાખો. સામાન્ય વિષ્ણુ દિવસ સિવાય અલગ વિધિ નથી.",
  },
  "pausha-putrada-ekadashi": {
    briefEn: "Posh's bright-fortnight fast, the second Putrada of the year. No grain today.",
    briefGu: "પોષ સુદની એકાદશી, વર્ષની બીજી પુત્રદા. આજે અનાજ નહીં.",
    storyEn: "Pausha Putrada Ekadashi is the bright fortnight of Posh, a second 'putrada' fast after the one in Shravan. The wish for a child is traditional. The practice, with or without that wish, is the grain fast.",
    storyGu: "પોષ પુત્રદા એકાદશી પોષ સુદની છે, શ્રાવણ પછીની બીજી પુત્રદા. સંતાનની ઇચ્છા પરંપરાની છે. ઇચ્છા હોય કે ન હોય, રીત અનાજનો ઉપવાસ છે.",
  },
  "shattila-ekadashi": {
    briefEn: "The sesame ekadashi. No grain, and til in the food you are allowed, or in a gift.",
    briefGu: "તલની એકાદશી. અનાજ નહીં, અને તલ ફરાળમાં અથવા દાનમાં.",
    storyEn: "Shattila Ekadashi is the dark fortnight of Posh, in the cold. Til, sesame, is the mark of the day: in farali food, in a lamp, or given away. The fast is still a grain fast. Sesame does not replace it.",
    storyGu: "ષટ્તિલા એકાદશી પોષ વદની છે, ઠંડીમાં. તલ આ દિવસની નિશાની છે: ફરાળમાં, દીવામાં, કે દાનમાં. ઉપવાસ ફરી અનાજનો છે. તલ તેની જગ્યા લેતા નથી.",
  },
  "jaya-ekadashi": {
    briefEn: "Maha's bright-fortnight fast. No grain today.",
    briefGu: "મહા સુદની એકાદશી. આજે અનાજ નહીં.",
    storyEn: "Jaya Ekadashi is the bright fortnight of Maha. Keep the ordinary Vishnu fast. It is separate from Maha Shivaratri, which comes later in the dark fortnight.",
    storyGu: "જયા એકાદશી મહા સુદની છે. સામાન્ય વિષ્ણુ ઉપવાસ રાખો. મહા શિવરાત્રિ પછી વદ પક્ષમાં આવે છે, એ અલગ દિવસ છે.",
  },
  "vijaya-ekadashi": {
    briefEn: "Maha's dark-fortnight fast. No grain today.",
    briefGu: "મહા વદની એકાદશી. આજે અનાજ નહીં.",
    storyEn: "Vijaya Ekadashi is the dark fortnight of Maha. The name means victory. The home rite is the grain fast and a lamp, not a celebration.",
    storyGu: "વિજયા એકાદશી મહા વદની છે. નામનો અર્થ જીત. ઘરની રીત અનાજનો ઉપવાસ અને દીવો છે, ઉજવણી નહીં.",
  },
  "amalaki-ekadashi": {
    briefEn: "Honour an amla tree if you have one. No grain today either way.",
    briefGu: "આમળાંનું વૃક્ષ હોય તો તેને વંદન. અનાજ તો આજે નહીં જ.",
    storyEn: "Amalaki Ekadashi is the bright fortnight of Fagan. The amla tree is worshipped where a household has one: water, a thread, and a lamp at its foot. A flat without a tree still keeps the grain fast.",
    storyGu: "આમલકી એકાદશી ફાગણ સુદની છે. ઘરે આમળાંનું વૃક્ષ હોય તો તેની પૂજા થાય: પાણી, દોરો, અને થડ પાસે દીવો. ફ્લેટમાં વૃક્ષ ન હોય તો પણ અનાજનો ઉપવાસ રહે.",
  },
  "papamochani-ekadashi": {
    briefEn: "Fagan's dark-fortnight fast, just before Holi. No grain today.",
    briefGu: "ફાગણ વદની એકાદશી, હોળીની તરત પહેલાં. આજે અનાજ નહીં.",
    storyEn: "Papamochani Ekadashi is the dark fortnight of Fagan, close to Holi. Keep the grain fast. The colours and the bonfire belong to the full-moon night and the day after, not to this fast.",
    storyGu: "પાપમોચની એકાદશી ફાગણ વદની છે, હોળીની નજીક. અનાજનો ઉપવાસ રાખો. રંગ અને હોળી પૂર્ણિમાની રાત્રે અને બીજા દિવસે છે, આ ઉપવાસે નહીં.",
  },
};

const GUIDES: Record<string, Practice> = {
  "chaitra-navratri": practice({
    briefEn: "A quieter Navratri. Light Amba's lamp. Garba is optional. Ram Navami ends it.",
    briefGu: "શાંત નવરાત્રિ. આંબાનો દીવો કરો. ગરબો જરૂરી નથી. રામ નવમીએ અંત આવે.",
    storyEn: "Chaitra Navratri is the spring nine nights, ending on Ram Navami. Gujarat does not treat it like the big garba Navratri of Aso. Homes that keep it install a kalash on the first night, or simply light a lamp, and tell the Ram story as the nights go on.",
    storyGu: "ચૈત્રી નવરાત્રિ વસંતની નવ રાત્રિ છે, અને રામ નવમીએ પૂરી થાય. ગુજરાત તેને આસોના મોટા ગરબા જેવી નથી માનતું. જે ઘર રાખે છે તે પહેલી રાત્રે કળશ સ્થાપે છે, અથવા માત્ર દીવો કરે છે, અને રાત્રિ વીતે એમ રામકથા કહે છે.",
    pujaEn: [
      "On the first night, set a kalash with water, mango leaves if you can get them, and a coconut. Leave it in a clean corner until Ram Navami.",
      "Each evening, light a lamp and offer a flower or kumkum. The form of the night can be remembered, but Amba is enough.",
      "Read or play a little of the Ramayan if that is your house. A few pages count.",
    ],
    pujaGu: [
      "પહેલી રાત્રે પાણી, મળે તો આંબાનાં પાન, અને નારિયેળ સાથે કળશ મૂકો. રામ નવમી સુધી સ્વચ્છ ખૂણામાં રહેવા દો.",
      "દર સાંજે દીવો કરો અને ફૂલ કે કુંકુમ ધરાવો. રાત્રિનું સ્વરૂપ યાદ રાખી શકાય, પણ આંબા બસ છે.",
      "ઘરનો રિવાજ હોય તો થોડી રામાયણ વાંચો અથવા સાંભળો. થોડાં પાનાં પણ ગણાય.",
    ],
    foodEn: [
      "A farali meal is common in homes that fast: potato, peanut, sabudana, fruit.",
      "People who are not fasting eat an ordinary meal. This Navratri does not require a fast.",
    ],
    foodGu: [
      "ઉપવાસ હોય તો ફરાળ: બટાકા, સિંગ, સાબુદાણા, ફળ.",
      "ઉપવાસ ન હોય તો રોજિંદું જમવાનું. આ નવરાત્રિએ ઉપવાસ ફરજ નથી.",
    ],
    avoidEn: [
      "Do not move a kalash once you have installed it.",
      "Do not expect the Aso garba grounds. This one is mostly at home.",
    ],
    avoidGu: [
      "કળશ સ્થાપ્યા પછી તેને ખસેડશો નહીં.",
      "આસોના ગરબા મેદાનની અપેક્ષા ન રાખો. આ મોટે ભાગે ઘરે છે.",
    ],
  }),
  "ram-navami": practice({
    briefEn: "Ram's birthday, and the end of Chaitra Navratri. A lamp, a story, and a sweet if you like.",
    briefGu: "રામજન્મ, અને ચૈત્રી નવરાત્રિનો અંત. દીવો, કથા, અને ગમે તો મીઠાઈ.",
    storyEn: "Ram Navami is Chaitra Shukla Navmi, kept as Ram's birth. In Gujarat it also closes the spring Navratri. The noon hours are the traditional time of birth. Homes read the birth passage, light a lamp, and share something sweet.",
    storyGu: "રામ નવમી ચૈત્ર સુદ નોમ છે, રામજન્મ તરીકે. ગુજરાતમાં તે વસંત નવરાત્રિ પણ પૂરી કરે છે. બપોરના કલાક જન્મનો પરંપરાગત સમય છે. ઘરે જન્મનો અંશ વાંચે છે, દીવો કરે છે, અને મીઠાઈ વહેંચે છે.",
    pujaEn: [
      "In the morning, light a lamp in front of a picture of Ram. A small set, with Sita and Lakshman and Hanuman, is the usual group.",
      "Around noon, read or play the janma passage. Offer panak, or sherbet, and a fruit.",
      "If a kalash was set on the first night, this is the day it is moved, with a short aarti.",
    ],
    pujaGu: [
      "સવારે રામના ફોટા આગળ દીવો કરો. સીતા, લક્ષ્મણ અને હનુમાન સાથેની નાની મૂર્તિ સામાન્ય છે.",
      "બપોરે જન્મનો અંશ વાંચો અથવા સાંભળો. પાનક અથવા શરબત અને ફળ ધરાવો.",
      "પહેલી રાત્રે કળશ મુકાયો હોય તો આજે ટૂંકી આરતી સાથે તેને ખસેડાય.",
    ],
    foodEn: [
      "Kheer, or panak made with buttermilk or water, roasted cumin, and a little ginger.",
      "A vegetarian meal. Many homes skip onion and garlic for the puja hours.",
    ],
    foodGu: [
      "ખીર, અથવા છાશ કે પાણી, જીરું અને થોડી આદુથી બનેલું પાનક.",
      "શાકાહારી જમવાનું. ઘણા ઘર પૂજાના કલાકે ડુંગળી અને લસણ રાખતા નથી.",
    ],
    avoidEn: [
      "Do not turn it into the Aso garba festival. The mood is Ram's birth, not nine nights of dance.",
      "A fast until noon is traditional for some. It is not required if nobody in the house was taught that.",
    ],
    avoidGu: [
      "તેને આસોના ગરબા જેવો ન બનાવો. મૂડ રામજન્મનો છે, નવ રાત્રિના નૃત્યનો નહીં.",
      "બપોર સુધીનો ઉપવાસ કેટલાકનો રિવાજ છે. ઘરે શીખવાયું ન હોય તો ફરજ નથી.",
    ],
  }),
  "akha-trij": practice({
    briefEn: "Akshaya Tritiya. Start a small good thing: a book, an account, gold if that is your means. Do not borrow for it.",
    briefGu: "અક્ષય તૃતીયા. નાનું સારું કામ શરૂ કરો: પુસ્તક, હિસાબ, અથવા પરવડે તો સોનું. તેના માટે ઉધાર ન લો.",
    storyEn: "Akha Trij is Vaishakh Shukla Trij, Akshaya Tritiya, a day when a beginning is said not to decay. Gujarati homes buy a little gold if they can, open a new ledger, or start reading something they mean to finish. Farmers have tied it to the season as well. The act can be tiny.",
    storyGu: "અખા ત્રીજ વૈશાખ સુદ ત્રીજ છે, અક્ષય તૃતીયા. જે શરૂ થાય તે ખૂટતું નથી એવી માન્યતા છે. ગુજરાતી ઘર પરવડે તો થોડું સોનું લે છે, નવી ચોપડી ખોલે છે, અથવા જે વાંચવું હોય તે શરૂ કરે છે. ખેડૂતો તેને ઋતુ સાથે પણ જોડે છે. કામ નાનું હોઈ શકે.",
    pujaEn: [
      "In the morning, light a lamp and write the first line of a book of accounts, or the first page of something you will keep.",
      "If you buy metal, buy what you can pay for today. A coin counts.",
      "Lakshmi and Vishnu, or simply the lamp, are the worship. There is no long vidhi.",
    ],
    pujaGu: [
      "સવારે દીવો કરો અને હિસાબની ચોપડીની પહેલી લીટી, અથવા જે રાખવું હોય તેનું પહેલું પાનું લખો.",
      "ધાતુ લો તો આજે જેની કિંમત ચૂકવી શકો તે લો. એક સિક્કો પણ ગણાય.",
      "લક્ષ્મી અને વિષ્ણુ, અથવા માત્ર દીવો. લાંબી વિધિ નથી.",
    ],
    foodEn: ["A normal festive vegetarian meal. Malpua or a sweet is enough to mark it.", "No special fast."],
    foodGu: ["સામાન્ય તહેવારનું શાકાહારી જમવાનું. માલપુઆ કે મીઠાઈ બસ છે.", "અલગ ઉપવાસ નથી."],
    avoidEn: [
      "Do not take a loan to buy gold because the day is called auspicious.",
      "Do not open a dispute, a court matter, or a fight and call it a beginning.",
    ],
    avoidGu: [
      "દિવસ શુભ છે એમ કહીને સોના માટે લોન ન લો.",
      "ઝઘડો, કોર્ટ કે લડાઈ શરૂ કરીને તેને શુભ આરંભ ન કહો.",
    ],
  }),
  "rath-yatra": practice({
    briefEn: "Jagannath's chariot day. Go to a procession if your town has one, or pull a small rath at home and share prasad.",
    briefGu: "જગન્નાથની રથયાત્રા. શહેરમાં શોભાયાત્રા હોય તો જાઓ, નહીં તો ઘરે નાનો રથ કાઢો અને પ્રસાદ વહેંચો.",
    storyEn: "Rath Yatra is Ashadh Shukla Bij, the day Jagannath, Balabhadra, and Subhadra ride out. Ahmedabad and other Gujarati cities hold large processions. The home version is the same idea at a small scale: the deities leave the shrine and are brought back later.",
    storyGu: "રથયાત્રા અષાઢ સુદ બીજ છે, જગન્નાથ, બળભદ્ર અને સુભદ્રા બહાર નીકળે છે. અમદાવાદ અને બીજાં ગુજરાતી શહેરોમાં મોટી શોભાયાત્રા નીકળે છે. ઘરની આવૃત્તિ એ જ વિચાર નાના પાયે છે: દેવતા ઘરમાંથી બહાર આવે અને પછી પાછા વળે.",
    pujaEn: [
      "If you can, go and touch the rope or walk with the local rath. Darshan from the side of the road is enough.",
      "At home, seat pictures of the three on a low board or cart, move them from one room to another, and bring them back with a lamp.",
      "Share whatever you cooked. Prasad is the point of the return.",
    ],
    pujaGu: [
      "શક્ય હોય તો સ્થાનિક રથનો દોરડો અડો અથવા સાથે ચાલો. રસ્તાની બાજુથી દર્શન પણ બસ છે.",
      "ઘરે ત્રણેયના ફોટા નીચા પાટિયા કે નાની ગાડી પર મૂકો, એક રૂમથી બીજા રૂમ લઈ જાઓ, અને દીવા સાથે પાછા લાવો.",
      "જે રાંધ્યું હોય તે વહેંચો. પાછા ફરવાનો અર્થ પ્રસાદ છે.",
    ],
    foodEn: ["Kansar, lapsi, or a simple sweet as prasad.", "A vegetarian meal. There is no fast."],
    foodGu: ["કંસાર, લાપસી, અથવા સાદી મીઠાઈ પ્રસાદ તરીકે.", "શાકાહારી જમવાનું. ઉપવાસ નથી."],
    avoidEn: [
      "Do not block the procession or treat the rope as a photo queue only.",
      "If you have no rath and no temple nearby, do not skip the day. The home circuit still counts.",
    ],
    avoidGu: [
      "શોભાયાત્રા રોકશો નહીં અને દોરડાને માત્ર ફોટાની લાઇન ન બનાવો.",
      "રથ કે નજીકમાં મંદિર ન હોય તો દિવસ છોડશો નહીં. ઘરનો ફેરો પણ ગણાય.",
    ],
  }),
  "nag-pancham": practice({
    briefEn: "Feed snakes only as an image. Offer milk to a picture or an anthill, never to a live snake you have cornered.",
    briefGu: "સાપને માત્ર આકૃતિ તરીકે ખવડાવો. ફોટા કે વામરિયાને દૂધ ધરાવો, ફસાયેલા જીવતા સાપને નહીં.",
    storyEn: "Nag Pancham is Shravan Shukla Pancham, a day for nag deities, the sisters and brothers of snakes in the old household cult. Gujarat offers milk, draw a nag in turmeric or kumkum, and thanks the unseen ones who live in fields and foundations. A live snake is not a murti.",
    storyGu: "નાગપંચમી શ્રાવણ સુદ પાંચમ છે, નાગ દેવતાઓનો દિવસ, જૂના ઘરસંસ્કારમાં સાપના ભાઈ-બહેન. ગુજરાત દૂધ ધરાવે છે, હળદર કે કુંકુમથી નાગ દોરે છે, અને ખેતર તથા પાયામાં રહેલા અદૃશ્યોનો આભાર માને છે. જીવતો સાપ મૂર્તિ નથી.",
    pujaEn: [
      "Draw two snakes with turmeric on a wooden board, or use a printed image. Offer milk, a flower, and a lamp.",
      "Farming families may offer milk at a known anthill or a field edge. Pour it on the ground. Do not wait for a snake to drink.",
      "Brothers and sisters sometimes exchange a sweet. That part is family custom, not a requirement.",
    ],
    pujaGu: [
      "લાકડાના પાટિયા પર હળદરથી બે નાગ દોરો, અથવા છાપેલી આકૃતિ રાખો. દૂધ, ફૂલ અને દીવો ધરાવો.",
      "ખેતી કરતા ઘર જાણીતા વામરિયા કે ખેતરની ધારે દૂધ ધરાવે. જમીન પર રેડો. સાપ પીવે તેની રાહ ન જુઓ.",
      "ભાઈ-બહેન ક્યારેક મીઠાઈ આપે. એ કુટુંબનો રિવાજ છે, ફરજ નહીં.",
    ],
    foodEn: ["Laddu, or milk sweets. A normal vegetarian lunch after the offering.", "No fast is required."],
    foodGu: ["લાડુ કે દૂધની મીઠાઈ. અર્પણ પછી સામાન્ય શાકાહારી બપોરનું.", "ઉપવાસ જરૂરી નથી."],
    avoidEn: [
      "Do not catch, corner, or pour milk into a snake's mouth. That injures the animal and is not the vrat.",
      "Do not kill a snake you find in the house today and call the rest worship. Call someone who can move it.",
    ],
    avoidGu: [
      "સાપને પકડશો નહીં, ફસાવશો નહીં, અને મોંમાં દૂધ ન રેડશો. તે જીવને નુકસાન કરે છે અને વ્રત નથી.",
      "ઘરમાં સાપ દેખાય એટલે આજે મારીને બાકીની પૂજા ન કરો. જે ખસેડી શકે તેને બોલાવો.",
    ],
  }),
  "janmashtami": practice({
    briefEn: "Krishna's birth at midnight on Shravan Vad Atham. Fast if you can, and break it after the midnight puja.",
    briefGu: "શ્રાવણ વદ આઠમે મધરાતે કૃષ્ણજન્મ. શક્ય હોય તો ઉપવાસ, અને મધરાતની પૂજા પછી પારણું.",
    storyEn: "Gujarat keeps Krishna Janmashtami on Shravan Krishna Ashtami, not on the Bhadarvo date used in some other regions. The birth is at midnight. Homes make a jhula, a small swing, for a picture of the child Krishna, and stay up for the aarti.",
    storyGu: "ગુજરાત કૃષ્ણ જન્માષ્ટમી શ્રાવણ વદ આઠમે રાખે છે, બીજા પ્રદેશોના ભાદરવાના દિવસે નહીં. જન્મ મધરાતે છે. ઘરે બાળ કૃષ્ણના ફોટા માટે ઝૂલો બાંધે છે, અને આરતી સુધી જાગે છે.",
    pujaEn: [
      "Through the day, a fast until midnight is the classic rule. Water is allowed. If you cannot fast, eat farali food and still come to the midnight aarti.",
      "Hang a small cradle. Place a picture or a bal Krishna murti in it. Bathe the murti with water or milk, and offer butter.",
      "At midnight, light the lamp, sing one birth song if you know it, and then eat.",
    ],
    pujaGu: [
      "દિવસભર મધરાત સુધીનો ઉપવાસ જૂનો નિયમ છે. પાણી ચાલે. ઉપવાસ ન થાય તો ફરાળ ખાઓ અને મધરાતની આરતીમાં તો આવો.",
      "નાનો ઝૂલો બાંધો. તેમાં ફોટો કે બાળ કૃષ્ણની મૂર્તિ મૂકો. પાણી કે દૂધથી સ્નાન કરાવો, અને માખણ ધરાવો.",
      "મધરાતે દીવો કરો, આવડે તો એક જન્મગીત કહો, અને પછી ખાઓ.",
    ],
    foodEn: [
      "Before midnight, fruit, milk, or farali food if you are not on a full fast.",
      "After the aarti: dahi, butter, panchamrit, or a simple sweet. The meal can be ordinary after that.",
    ],
    foodGu: [
      "મધરાત પહેલાં, પૂરો ઉપવાસ ન હોય તો ફળ, દૂધ અથવા ફરાળ.",
      "આરતી પછી: દહીં, માખણ, પંચામૃત, કે સાદી મીઠાઈ. પછી જમવાનું સામાન્ય હોઈ શકે.",
    ],
    avoidEn: [
      "Do not celebrate on the date another state uses if your house is Gujarati. Shravan Vad Atham is the day.",
      "Do not break the fast at dinner and still call midnight the birth puja. Eat after the aarti.",
    ],
    avoidGu: [
      "ઘર ગુજરાતી હોય તો બીજા રાજ્યની તારીખે ઉજવણી ન કરો. શ્રાવણ વદ આઠમ એ દિવસ છે.",
      "રાત્રે જમીને પણ મધરાતને જન્મપૂજા ન કહો. આરતી પછી ખાઓ.",
    ],
  }),
  "ganesh-chaturthi": practice({
    briefEn: "Bring Ganesh home for the day, or for ten days. A clay murti is the one you immerse. A photo can stay all year.",
    briefGu: "ગણેશને એક દિવસ કે દસ દિવસ ઘરે લાવો. માટીની મૂર્તિ વિસર્જન માટે છે. ફોટો આખું વર્ષ રહી શકે.",
    storyEn: "Ganesh Chaturthi is Bhadarvo Shukla Choth. Maharashtra keeps a long public festival. A Gujarati home often brings Ganesh for one day and a half, or up to Anant Chaturdashi, then immerses a clay image. The point is the welcome, the modak, and a clean goodbye.",
    storyGu: "ગણેશ ચતુર્થી ભાદરવા સુદ ચોથ છે. મહારાષ્ટ્ર લાંબો જાહેર તહેવાર રાખે છે. ગુજરાતી ઘર ઘણી વાર ગણેશને દોઢ દિવસ, અથવા અનંત ચતુર્દશી સુધી રાખે છે, અને માટીની મૂર્તિ વિસર્જિત કરે છે. અર્થ સ્વાગત, મોદક, અને સ્વચ્છ વિદાય છે.",
    pujaEn: [
      "In the morning, seat Ganesh facing into the house. Offer red flowers, durva grass if you can find it, and a lamp.",
      "Do the aarti once when he arrives and once before he leaves. Twenty-one leaves of durva is the classic offering. One sincere bunch is fine.",
      "Immerse only an unpainted or natural clay murti, in a bucket at home or at a city tank that asks for it. A plaster or plastic image stays on the shelf.",
    ],
    pujaGu: [
      "સવારે ગણેશને ઘરની અંદરની બાજુ મૂકો. લાલ ફૂલ, મળે તો દૂર્વા, અને દીવો ધરાવો.",
      "આવે ત્યારે એક આરતી અને જાય ત્યારે એક આરતી. એકવીસ દૂર્વા જૂનો અર્પણ છે. એક સાચો ઘેરો પણ ચાલે.",
      "માત્ર કુદરતી માટીની મૂર્તિ વિસર્જિત કરો, ઘરે વાદળીમાં અથવા શહેરના તળાવે જ્યાં કહે. પ્લાસ્ટર કે પ્લાસ્ટિકની મૂર્તિ અટારી પર રહે.",
    ],
    foodEn: ["Modak, or a simple steamed dumpling with jaggery and coconut.", "A vegetarian meal. A fast until the afternoon aarti is common, not compulsory."],
    foodGu: ["મોદક, અથવા ગોળ અને નારિયેળનું સાદું બાફેલું આટું.", "શાકાહારી જમવાનું. બપોરની આરતી સુધીનો ઉપવાસ સામાન્ય છે, ફરજ નહીં."],
    avoidEn: [
      "Do not immerse plaster of Paris. It does not dissolve, and it is not the rite.",
      "Do not leave a clay Ganesh drying in a cupboard because immersion felt awkward. Immerse at home in a bucket and pour the water onto a plant.",
    ],
    avoidGu: [
      "પ્લાસ્ટર ઓફ પેરિસ વિસર્જિત ન કરો. તે ઓગળતું નથી, અને તે વિધિ નથી.",
      "વિસર્જન અજુગું લાગ્યું એમ કહીને માટીના ગણેશને કબાટમાં સૂકવતા ન મૂકો. ઘરે વાદળીમાં વિસર્જન કરો અને પાણી છોડ પર રેડો.",
    ],
  }),
  "rishi-panchami": practice({
    briefEn: "The day after Ganesh. A fast, a bath, and thanks for the sages who carried the tradition.",
    briefGu: "ગણેશના બીજા દિવસે. ઉપવાસ, સ્નાન, અને જેમણે પરંપરા લઈ આવી તે ઋષિઓનો આભાર.",
    storyEn: "Rishi Panchami is Bhadarvo Shukla Pancham, the morning after Ganesh Chaturthi. It is kept as a fast in honour of the sages. Women in many Gujarati families were taught it as a day to bathe, wear something washed, and eat once, without grain.",
    storyGu: "ઋષિ પંચમી ભાદરવા સુદ પાંચમ છે, ગણેશ ચતુર્થીની બીજા દિવસની સવાર. ઋષિઓના માનમાં ઉપવાસ તરીકે રાખાય છે. ઘણાં ગુજરાતી ઘરે સ્ત્રીઓને સ્નાન, ધોયેલાં વસ્ત્ર, અને અનાજ વગરનું એક જમવાનું શીખવાયું છે.",
    pujaEn: [
      "Bathe in the morning. Offer water and a few grains of rice or flowers toward the sun, naming the sages in whatever words you have.",
      "One meal of farali food after the offering. A full fast until evening is the stricter house rule.",
      "If Ganesh is still in the house, do his aarti as well. The days overlap on purpose.",
    ],
    pujaGu: [
      "સવારે સ્નાન કરો. સૂર્ય તરફ જળ અને થોડા ચોખા કે ફૂલ ધરાવો, જે શબ્દ આવડે તેમાં ઋષિઓનું નામ લો.",
      "અર્પણ પછી ફરાળનું એક જમવાનું. સાંજ સુધીનો પૂરો ઉપવાસ કડક ઘરનો નિયમ છે.",
      "ગણેશ હજી ઘરે હોય તો તેમની આરતી પણ કરો. દિવસ જાણીને ભેગા પડે છે.",
    ],
    foodEn: ["One farali meal: potato, peanut, fruit, milk.", "Sendha namak if the house uses it on fasts."],
    foodGu: ["એક ફરાળ: બટાકા, સિંગ, ફળ, દૂધ.", "ઘર વ્રતે સેંધા મીઠું વાપરે તો તે."],
    avoidEn: [
      "Do not make it a second Ganesh party. The mood is quiet.",
      "Grain, ordinary dal, and a festive onion-heavy thali belong to another day.",
    ],
    avoidGu: [
      "તેને બીજી ગણેશ પાર્ટી ન બનાવો. મૂડ શાંત છે.",
      "અનાજ, રોજિંદી દાળ, અને ડુંગળીવાળો તહેવારી થાળી બીજા દિવસની છે.",
    ],
  }),
  "sharad-navratri": practice({
    briefEn: "Garba season. Light Amba's lamp, and dance if you can. A fast is common and not required.",
    briefGu: "ગરબાની ઋતુ. આંબાનો દીવો કરો, અને શક્ય હોય તો રમો. ઉપવાસ સામાન્ય છે, ફરજ નહીં.",
    storyEn: "Sharad Navratri is the nine nights of Aso, Gujarat's great public festival. Amba is welcomed into the home, and the garba ground is treated as the temple. Each night has a form of Durga in the navadurga list. Many homes never name the form and still keep the night fully.",
    storyGu: "શરદ નવરાત્રિ આસોની નવ રાત્રિ છે, ગુજરાતનો મોટો જાહેર તહેવાર. આંબાને ઘરે પધરાવાય છે, અને ગરબાનું મેદાન મંદિર ગણાય છે. દરેક રાત્રિનું નવદુર્ગાનું સ્વરૂપ છે. ઘણાં ઘર સ્વરૂપનું નામ ન લે અને છતાં રાત્રિ પૂરી રાખે.",
    pujaEn: [
      "On the first night, set a kalash if you are going to keep one for all nine nights. Otherwise a lamp each evening is the whole installation.",
      "Wear something you can move in. Go to garba, or play two songs at home. Both are the rite.",
      "Offer red flowers or kumkum when you leave and when you come back. Bow once. You do not need a priest.",
    ],
    pujaGu: [
      "પહેલી રાત્રે નવેય રાત્રિ રાખવો હોય તો કળશ મૂકો. નહીં તો દર સાંજે દીવો એ જ સ્થાપના છે.",
      "જેમાં હલનચલન થાય તે પહેરો. ગરબે જાઓ, અથવા ઘરે બે ગીત રમો. બંને વિધિ છે.",
      "નીકળતાં અને પાછાં આવતાં લાલ ફૂલ કે કુંકુમ ધરાવો. એક વાર નમો. પુરોહિત જરૂરી નથી.",
    ],
    foodEn: [
      "Fafda and jalebi in the morning is a Gujarat habit of the season, not a rule of the puja.",
      "Farali dinner if you are fasting: sabudana, potato, peanut. A normal meal if you are not.",
    ],
    foodGu: [
      "સવારે ફાફડા અને જલેબી ઋતુની ગુજરાતી ટેવ છે, પૂજાનો નિયમ નહીં.",
      "ઉપવાસ હોય તો ફરાળ: સાબુદાણા, બટાકા, સિંગ. ન હોય તો સામાન્ય જમવાનું.",
    ],
    avoidEn: [
      "Do not drink and call it garba. The ground is a puja, even when it is loud.",
      "Do not dismantle a kalash on night three because travel got inconvenient. Ask someone at home to light the lamp.",
    ],
    avoidGu: [
      "દારૂ પીને તેને ગરબો ન કહો. મેદાન પૂજા છે, ઘોંઘાટ હોય ત્યારે પણ.",
      "મુસાફરી અજુગી લાગી એટલે ત્રીજી રાત્રે કળશ ન તોડો. ઘરે કોઈને દીવો કરવા કહો.",
    ],
  }),
  "durga-ashtami": practice({
    briefEn: "The eighth night, Mahagauri. A fast is widely kept. Havan in the evening if your neighbourhood does one.",
    briefGu: "આઠમી રાત્રિ, મહાગૌરી. ઉપવાસ વ્યાપક છે. વિસ્તારમાં હવન હોય તો સાંજે જાઓ.",
    storyEn: "Durga Ashtami is Aso Shukla Atham, the eighth night, sacred to Mahagauri. In Gujarat this is often the strict fast of Navratri and the night of a communal havan. Garba still happens. The fast and the dance are not enemies.",
    storyGu: "દુર્ગા અષ્ટમી આસો સુદ આઠમ છે, આઠમી રાત્રિ, મહાગૌરીની. ગુજરાતમાં આ ઘણી વાર નવરાત્રિનો કડક ઉપવાસ અને સામૂહિક હવનની રાત્રિ છે. ગરબો ચાલુ રહે છે. ઉપવાસ અને નૃત્ય વિરોધી નથી.",
    pujaEn: [
      "Keep a grain fast if you can. Light the lamp before you leave for garba.",
      "Join a havan if one is organised. Standing at the back and offering a spoon of ghee, if asked, is full participation.",
      "Mahagauri is described as bright and calm. White flowers are a nice offering. Red still belongs to Amba.",
    ],
    pujaGu: [
      "શક્ય હોય તો અનાજનો ઉપવાસ રાખો. ગરબે જતાં પહેલાં દીવો કરો.",
      "હવન ગોઠવાયું હોય તો જોડાઓ. પાછળ ઊભા રહેવું અને કહે તો ઘીનો ચમચો ધરાવવો એ પૂરી ભાગીદારી છે.",
      "મહાગૌરી ઉજ્જ્વલ અને શાંત કહેવાય છે. સફેદ ફૂલ સારો અર્પણ છે. લાલ રંગ આંબાનો જ રહે.",
    ],
    foodEn: ["Farali food after the evening puja, or fruit through the day.", "Break fully, with a normal meal, only if your house ends the fast tonight. Many wait for Navmi."],
    foodGu: ["સાંજની પૂજા પછી ફરાળ, અથવા દિવસભર ફળ.", "ઘર આજે રાત્રે ઉપવાસ પૂરો કરે તો જ સામાન્ય જમવાનું. ઘણાં નોમ સુધી રાહ જુએ."],
    avoidEn: [
      "Do not skip the lamp because the havan is elsewhere. The house still needs its own light.",
      "A waterless fast is not the rule here. That belongs to Nirjala Ekadashi.",
    ],
    avoidGu: [
      "હવન બીજે છે એટલે દીવો ન છોડો. ઘરને પોતાનો અજવાળો જોઈએ.",
      "પાણી વગરનો ઉપવાસ અહીંનો નિયમ નથી. તે નિર્જળા એકાદશીનો છે.",
    ],
  }),
  "maha-navami": practice({
    briefEn: "The ninth night, Siddhidatri. A quieter aarti. Dussehra is tomorrow morning.",
    briefGu: "નવમી રાત્રિ, સિદ્ધિદાત્રી. શાંત આરતી. દશેરા કાલે સવારે છે.",
    storyEn: "Maha Navami is the ninth night. The goddess of the list is Siddhidatri. Garba may still run, but many homes turn quieter, do a last aarti, and prepare for Dussehra at sunrise. If a kalash was installed, tomorrow is when it goes.",
    storyGu: "મહા નવમી નવમી રાત્રિ છે. યાદીની દેવી સિદ્ધિદાત્રી છે. ગરબો ચાલુ હોઈ શકે, પણ ઘણાં ઘર શાંત થાય છે, છેલ્લી આરતી કરે છે, અને સૂર્યોદયે દશેરાની તૈયારી કરે છે. કળશ મુકાયો હોય તો કાલે તે વિસર્જિત થાય.",
    pujaEn: [
      "In the evening, a full aarti at home: lamp, incense, and a short song.",
      "Young girls are sometimes invited and fed, as a form of the goddess. A meal or a sweet for a child you know is the home-sized version.",
      "Lay out tomorrow's Dussehra things tonight if you need to: a lamp, flowers, and the implements of work you will bless in the morning.",
    ],
    pujaGu: [
      "સાંજે ઘરે પૂરી આરતી: દીવો, અગરબત્તી, અને ટૂંકું ગીત.",
      "ક્યારેક નાની દીકરીઓને બોલાવીને જમાડાય છે, દેવીના રૂપ તરીકે. જાણીતા બાળકને જમવાનું કે મીઠાઈ એ ઘર જેવડી આવૃત્તિ છે.",
      "જરૂર હોય તો કાલના દશેરાની વસ્તુઓ આજે રાત્રે કાઢી મૂકો: દીવો, ફૂલ, અને સવારે આશીર્વાદવાનાં કામનાં સાધન.",
    ],
    foodEn: ["A festive vegetarian dinner if the fast ended on Ashtami.", "Farali food if your house fasts through Navmi."],
    foodGu: ["આઠમે ઉપવાસ પૂરો થયો હોય તો તહેવારી શાકાહારી રાત્રિભોજન.", "ઘર નોમ સુધી વ્રત રાખે તો ફરાળ."],
    avoidEn: [
      "Do not immerse the kalash tonight. Dussehra morning is the goodbye.",
      "Do not start a noisy new party that ignores the people who fasted all week.",
    ],
    avoidGu: [
      "આજે રાત્રે કળશ વિસર્જિત ન કરો. દશેરાની સવાર વિદાય છે.",
      "આખું અઠવાડિયું વ્રત રાખનારને અવગણીને નવી ઘોંઘાટવાળી પાર્ટી ન શરૂ કરો.",
    ],
  }),
  "dussehra": practice({
    briefEn: "Vijaya Dashami. In the morning, bless the tools you work with. The garba season is over.",
    briefGu: "વિજયા દશમી. સવારે જેનાથી કામ કરો તેને આશીર્વાદો. ગરબાની ઋતુ પૂરી.",
    storyEn: "Dussehra is Aso Shukla Dasham, Vijaya Dashami, the day after the nine nights. Ram's victory is the story. In a Gujarati home the morning rite is practical: vehicles, books, shop shutters, and instruments are garlanded. Elders bless younger people. The Ramlila fire, where a town holds one, is the evening.",
    storyGu: "દશેરા આસો સુદ દશમ છે, વિજયા દશમી, નવ રાત્રિના બીજા દિવસે. રામની જીત કથા છે. ગુજરાતી ઘરે સવારની વિધિ વ્યવહારુ છે: વાહન, ચોપડી, દુકાનનું બારણું અને સાધનોને હાર પહેરાવાય. વડીલો નાનાને આશીર્વાદ આપે. શહેરમાં રામલીલા હોય તો સાંજે અગ્નિ છે.",
    pujaEn: [
      "In the morning, wash the car or the scooter, or wipe the laptop and the account book. Put a garland or a string of marigold. Light a lamp beside them.",
      "If a kalash is still set, do a short aarti and move it today.",
      "Ask an elder for a blessing, or give one to a child. A red thread or a simple tilak is the whole gesture.",
    ],
    pujaGu: [
      "સવારે ગાડી કે સ્કૂટર ધોવો, અથવા લેપટોપ અને હિસાબની ચોપડી લૂછો. હાર કે ગલગોટાનો દોરો મૂકો. બાજુમાં દીવો કરો.",
      "કળશ હજી મુકાયો હોય તો ટૂંકી આરતી કરીને આજે ખસેડો.",
      "વડીલ પાસે આશીર્વાદ માગો, અથવા બાળકને આપો. લાલ દોરો કે સાદું તિલક એ જ ઇશારો છે.",
    ],
    foodEn: ["A festive lunch. Some homes cook a slightly special dal or a sweet.", "No fast. Navratri fasting is over."],
    foodGu: ["તહેવારી બપોરનું. કેટલાંક ઘર થોડી ખાસ દાળ કે મીઠાઈ બનાવે.", "ઉપવાસ નથી. નવરાત્રિનો વ્રત પૂરો."],
    avoidEn: [
      "Do not keep the kalash 'one more night' and forget it. Today is the day it leaves.",
      "Do not light a private bonfire on a balcony. Go to an organised Ramlila if you want the fire.",
    ],
    avoidGu: [
      "કળશ 'એક રાત વધારે' રાખીને ભૂલશો નહીં. આજે તે જવાનો દિવસ છે.",
      "બાલ્કનીમાં અંગત હોળી ન સળગાવો. અગ્નિ જોઈતો હોય તો ગોઠવાયેલી રામલીલાએ જાઓ.",
    ],
  }),
  "dhanteras": practice({
    briefEn: "Buy one useful metal thing, light a yam lamp, and in the evening do Lakshmi's puja. This night is also Pradosh.",
    briefGu: "એક ઉપયોગી ધાતુની વસ્તુ લો, શેરડીના દીવા કરો, અને સાંજે લક્ષ્મીની પૂજા. આ રાત્રિ પ્રદોષ પણ છે.",
    storyEn: "Dhanteras is Aso Krishna Teras, the first day of the Diwali cluster. The story people tell is of a boy saved from death by lamps and coins piled at the door. Homes buy metal, light a row of lamps, and because the tithi is also Pradosh, Shiva is worshipped in the evening twilight before or with Lakshmi.",
    storyGu: "ધનતેરસ આસો વદ તેરસ છે, દિવાળીના સમૂહનો પહેલો દિવસ. કથા એ છે કે દીવા અને બારણે થઈને મુકાયેલા સિક્કાથી એક છોકરો મૃત્યુથી બચ્યો. ઘર ધાતુ ખરીદે છે, દીવાની હાર કરે છે, અને તિથિ પ્રદોષ પણ હોવાથી સાંજના સંધ્યાકાળે લક્ષ્મી પહેલાં કે સાથે શિવની પૂજા થાય છે.",
    pujaEn: [
      "During the day, buy a utensil, a coin, or a tool you will actually use. Pay for it. Do not finance a display.",
      "At twilight, bathe a Shiva linga or pour water on a picture of Shiva. Then turn to Lakshmi.",
      "Light lamps at the threshold. A yam diya, salt, and a coin in a small plate is the old door set. An ordinary clay lamp is enough.",
    ],
    pujaGu: [
      "દિવસે એક વાસણ, સિક્કો, અથવા જે સાધન વાપરશો તે લો. કિંમત ચૂકવો. દેખાવ માટે હપ્તે ન લો.",
      "સંધ્યાએ શિવલિંગને સ્નાન કરાવો અથવા શિવના ફોટા પર જળ રેડો. પછી લક્ષ્મી તરફ વળો.",
      "ઉંબરે દીવા કરો. રતાળુનો દીવો, મીઠું અને સિક્કો જૂની થાળી છે. સામાન્ય માટીનો દીવો બસ છે.",
    ],
    foodEn: ["A slightly festive vegetarian dinner after the puja.", "Farali food only if you are also keeping the Pradosh fast. Many houses do not fast today."],
    foodGu: ["પૂજા પછી થોડું તહેવારી શાકાહારી રાત્રિભોજન.", "પ્રદોષનો ઉપવાસ પણ રાખતા હો તો જ ફરાળ. ઘણાં ઘર આજે વ્રત નથી રાખતાં."],
    avoidEn: [
      "Do not buy gold you cannot afford. A steel pot is a complete Dhanteras purchase.",
      "Do not leave the lamps where a curtain can catch. The threshold lamp should be watched.",
    ],
    avoidGu: [
      "જે સોનું પરવડતું નથી તે ન લો. એક સ્ટીલનું વાસણ પૂરી ધનતેરસની ખરીદી છે.",
      "પડદો સળગે ત્યાં દીવા ન મૂકો. ઉંબરાના દીવા પર નજર રાખો.",
    ],
  }),
  "kali-chaudas": practice({
    briefEn: "Narak Chaturdashi. An early bath, an oil massage if that is your house, and lamps again in the evening.",
    briefGu: "નરક ચતુર્દશી. વહેલું સ્નાન, ઘરનો રિવાજ હોય તો તેલની માલિશ, અને સાંજે ફરી દીવા.",
    storyEn: "Kali Chaudas is Aso Krishna Chaudas, Narak Chaturdashi, the day Krishna is said to have freed the captives of Narakasura. The home rite is before sunrise or early: oil on the body, a bath, and then a normal day that turns into Diwali lamps by evening, because amavasya often begins that night.",
    storyGu: "કાળી ચૌદસ આસો વદ ચૌદસ છે, નરક ચતુર્દશી. કૃષ્ણે નરકાસુરના કેદીઓને છોડાવ્યા એ દિવસ કહેવાય છે. ઘરની વિધિ સૂર્યોદય પહેલાં કે વહેલી સવારે છે: શરીરે તેલ, સ્નાન, અને પછી સામાન્ય દિવસ જે સાંજે દિવાળીના દીવામાં વળે છે, કારણ કે અમાસ ઘણી વાર એ જ રાત્રે શરૂ થાય છે.",
    pujaEn: [
      "Before or around dawn, rub a little oil, then bathe. An uptan of flour and turmeric is the old mixture. Soap is a fair modern stand-in.",
      "Offer a lamp to Yama or simply at the door, with a short prayer for the household.",
      "In the evening, if Diwali's moonless night has begun, start the Diwali lamps. The two days share the dusk.",
    ],
    pujaGu: [
      "પરોઢિયે કે તેની આસપાસ થોડું તેલ લગાડીને સ્નાન કરો. લોટ અને હળદરનો ઉપટન જૂનો મિશ્રણ છે. સાબુ વાજબી આધુનિક વિકલ્પ છે.",
      "યમને અથવા માત્ર બારણે દીવો ધરાવો, ઘર માટે ટૂંકી પ્રાર્થના સાથે.",
      "સાંજે દિવાળીની અમાસ શરૂ થઈ હોય તો દિવાળીના દીવા શરૂ કરો. બે દિવસ સંધ્યા વહેંચે છે.",
    ],
    foodEn: ["A special breakfast after the bath is the treat: ghughra, or whatever the house fries once a year.", "Dinner can already be a Diwali thali."],
    foodGu: ["સ્નાન પછીનો ખાસ નાસ્તો ઇનામ છે: ઘુઘરા, અથવા ઘર વર્ષમાં એક વાર જે તળે તે.", "રાત્રે દિવાળીની થાળી હોઈ શકે."],
    avoidEn: [
      "Do not turn the oil bath into a dare or a joke that keeps people out of the bathroom. It is a blessing, and it is optional.",
      "Do not light firecrackers in a closed stairwell.",
    ],
    avoidGu: [
      "તેલના સ્નાનને એવો પડકાર કે મજાક ન બનાવો કે લોકો સ્નાનથી દૂર રહે. તે આશીર્વાદ છે, અને વૈકલ્પિક છે.",
      "બંધ દાદરમાં ફટાકડા ન સળગાવો.",
    ],
  }),
  diwali: practice({
    briefEn: "Lakshmi puja after sunset on the moonless night. Clean the doorway, light lamps, and keep the books open.",
    briefGu: "અમાસની રાત્રે સૂર્યાસ્ત પછી લક્ષ્મીપૂજન. બારણું સાફ કરો, દીવા કરો, અને ચોપડી ખુલ્લી રાખો.",
    storyEn: "Diwali in Gujarat is the evening when amavasya is running, usually the night of Kali Chaudas or the next night. Lakshmi is invited into a clean house. The next morning is a different festival, Bestu Varas. Do not fold them into one party.",
    storyGu: "ગુજરાતમાં દિવાળી એ સાંજ છે જ્યારે અમાસ ચાલતી હોય, સામાન્ય રીતે કાળી ચૌદસની રાત્રે કે બીજા દિવસે. સ્વચ્છ ઘરમાં લક્ષ્મીને બોલાવાય છે. બીજા દિવસની સવાર અલગ તહેવાર છે, બેસતું વર્ષ. તેને એક જ પાર્ટીમાં ન વાળો.",
    pujaEn: [
      "Before sunset, sweep the threshold and lay a simple rangoli. A line of chalk is enough.",
      "After dark, place a new account book or a fresh page, a coin, and a lamp on a low stool. Do Lakshmi's aarti. Leave the book open for the night.",
      "Light a row of lamps in the windows. Switch off nothing you need for safety. The point is welcome, not darkness.",
    ],
    pujaGu: [
      "સૂર્યાસ્ત પહેલાં ઉંબરો સાફ કરો અને સાદી રંગોળી કરો. ચાકની લીટી બસ છે.",
      "અંધારું થયે નીચી પાટ પર નવી ચોપડી કે નવું પાનું, સિક્કો અને દીવો મૂકો. લક્ષ્મીની આરતી કરો. ચોપડી રાત્રે ખુલ્લી રહેવા દો.",
      "બારીએ દીવાની હાર કરો. સલામતી માટે જે જોઈએ તે બંધ ન કરો. અર્થ સ્વાગત છે, અંધારું નહીં.",
    ],
    foodEn: ["A full vegetarian thali after the puja: a sweet, a salty snack, a dal.", "Farali food is not required tonight."],
    foodGu: ["પૂજા પછી પૂરી શાકાહારી થાળી: મીઠાઈ, ખારો નાસ્તો, દાળ.", "આ રાત્રે ફરાળ જરૂરી નથી."],
    avoidEn: [
      "Do not gamble because 'Diwali cards' are a habit. The puja does not need it.",
      "Do not set off fireworks from a flat window. Go to an open ground if the city still allows them.",
    ],
    avoidGu: [
      "'દિવાળીના પાન' ટેવ છે એટલે જુગાર ન રમો. પૂજાને તેની જરૂર નથી.",
      "ફ્લેટની બારીએથી ફટાકડા ન ફેંકો. શહેર મંજૂરી આપે તો ખુલ્લા મેદાને જાઓ.",
    ],
  }),
  "bestu-varas": practice({
    briefEn: "Gujarati new year, the morning after Diwali. Wear something fresh, open the year's books, and greet people.",
    briefGu: "ગુજરાતી નૂતન વર્ષ, દિવાળીના બીજા દિવસની સવાર. નવું પહેરો, વર્ષની ચોપડી ખોલો, અને લોકોને રામતેજ કરો.",
    storyEn: "Bestu Varas is the Gujarati new year, Kartak Shukla Padvo, the civil morning after the Diwali night. Businesses open their first entry of the year. Homes visit elders. It is a day of beginning, which is why Annakut's mountain of food shares the date but is its own puja.",
    storyGu: "બેસતું વર્ષ ગુજરાતી નૂતન વર્ષ છે, કારતક સુદ પડવો, દિવાળીની રાત્રિ પછીની સવાર. વેપાર પહેલી નોંધ ખોલે છે. ઘર વડીલોને મળવા જાય છે. આ શરૂઆતનો દિવસ છે, એટલે અન્નકૂટનો ખોરાકનો પર્વત તારીખ વહેંચે છે પણ પૂજા અલગ છે.",
    pujaEn: [
      "In the morning, bathe, wear washed or new clothes, and make the first sweet or savoury entry in the account book. Write a small credit, even a token one.",
      "Greet elders in person or by a call. 'Saal Mubarak' is the sentence.",
      "Hang a toran if you have not already. The doorway should look open for business and for guests.",
    ],
    pujaGu: [
      "સવારે સ્નાન કરો, ધોયેલાં કે નવાં વસ્ત્ર પહેરો, અને હિસાબની ચોપડીમાં પહેલી મીઠી કે સારી નોંધ લખો. નાની જમા, એક સાંકેતિક પણ, લખો.",
      "વડીલોને મળો અથવા ફોન કરો. 'સાલ મુબારક' એ વાક્ય છે.",
      "તોરણ ન લગાડ્યું હોય તો લગાડો. બારણું વેપાર અને મહેમાન માટે ખુલ્લું દેખાવું જોઈએ.",
    ],
    foodEn: ["A full festive lunch. Start the meal with something sweet.", "The Annakut spread, if you cook it, is shared today but belongs to Govardhan's puja."],
    foodGu: ["પૂરું તહેવારી બપોરનું. જમવાનું મીઠાથી શરૂ કરો.", "અન્નકૂટ રાંધો તો આજે વહેંચાય, પણ તે ગોવર્ધનની પૂજાનું છે."],
    avoidEn: [
      "Do not spend the morning only cleaning last night's lamps and miss the greeting. The new year is the people.",
      "Do not start the year with a debt entry as the first line if you can write a small credit instead.",
    ],
    avoidGu: [
      "સવાર માત્ર કાલ રાત્રિના દીવા સાફ કરવામાં કાઢીને રામતેજ ચૂકશો નહીં. નવું વર્ષ લોકો છે.",
      "નાની જમા લખી શકો તો વર્ષની પહેલી લીટી ઉધારની ન લખો.",
    ],
  }),
  annakut: practice({
    briefEn: "Govardhan puja, kept on Bestu Varas in Gujarat. Cook many small dishes and offer them before you eat.",
    briefGu: "ગોવર્ધન પૂજા, ગુજરાતમાં બેસતા વર્ષે. ઘણી નાની વાનગીઓ રાંધો અને ખાઓ તે પહેલાં ધરાવો.",
    storyEn: "Annakut remembers Krishna lifting Govardhan to shelter the village. Gujarat keeps it on the new-year morning, with Bestu Varas. The worship is a heap of food, as many dishes as the house can manage, offered and then eaten as a shared meal. Fifty dishes is a story. Seven is a real flat.",
    storyGu: "અન્નકૂટ કૃષ્ણે ગોવર્ધન ઉપાડીને ગામને આશરો આપ્યો તેની યાદ છે. ગુજરાત તેને નૂતન વર્ષની સવારે, બેસતા વર્ષ સાથે રાખે છે. પૂજા ખોરાકનો ઢગલો છે, ઘર જેટલી વાનગીઓ બનાવી શકે, અર્પણ કરીને પછી સાથે ખાવાનું. પચાસ વાનગી કથા છે. સાત એક સાચો ફ્લેટ છે.",
    pujaEn: [
      "Cook an odd number of dishes if you like the old count. Stack them, or a drawing of the hill, and place a Krishna picture behind.",
      "Offer the food with a lamp before anyone tastes it. Then eat it as lunch. Nothing is thrown away to 'complete' the offering.",
      "A small hill of flour or turmeric paste, with a cow picture, is enough if you cannot cook a spread.",
    ],
    pujaGu: [
      "જૂની ગણતરી ગમે તો એકી સંખ્યાની વાનગીઓ રાંધો. તેને, અથવા પર્વતનું ચિત્ર, ગોઠવો અને પાછળ કૃષ્ણનો ફોટો મૂકો.",
      "કોઈ ચાખે તે પહેલાં દીવા સાથે ખોરાક ધરાવો. પછી બપોરના જમવાના તરીકે ખાઓ. અર્પણ પૂરો કરવા કાંઈ ફેંકાતું નથી.",
      "રાંધી ન શકો તો લોટ કે હળદરના લૂગદાની નાની ટેકરી અને ગાયનો ફોટો બસ છે.",
    ],
    foodEn: ["The offering is the meal: vegetables, dal, rice, and at least one sweet.", "Include one thing made of milk, since Krishna's stories are full of it."],
    foodGu: ["અર્પણ જ જમવાનું છે: શાક, દાળ, ભાત, અને ઓછામાં ઓછી એક મીઠાઈ.", "દૂધની એક વાનગી રાખો, કારણ કે કૃષ્ણની કથા તેમાં ભરેલી છે."],
    avoidEn: [
      "Do not cook a mountain and then refuse to eat it the same day. Annakut is a meal, not a display.",
      "Do not fast. This is the opposite of an ekadashi.",
    ],
    avoidGu: [
      "પર્વત રાંધીને એ જ દિવસે ખાવાની ના ન પાડો. અન્નકૂટ જમવાનું છે, દેખાવ નહીં.",
      "ઉપવાસ ન રાખો. આ એકાદશીની ઊલટું છે.",
    ],
  }),
  "bhai-beej": practice({
    briefEn: "A sister feeds her brother and wishes him a long life. A meal together is the whole festival.",
    briefGu: "બહેન ભાઈને જમાડે છે અને લાંબી ઉંમરની ઇચ્છા રાખે છે. સાથે જમવાનું એ જ તહેવાર છે.",
    storyEn: "Bhai Beej is Kartak Shukla Bij, two days after Bestu Varas. Yami fed Yama, in the story people tell. A sister applies a tilak, and the brother gives a gift if he can. Where there is no brother or sister, cousins and close friends are invited. The relationship is the rite.",
    storyGu: "ભાઈ બીજ કારતક સુદ બીજ છે, બેસતા વર્ષના બે દિવસ પછી. કથામાં યમી યમને જમાડે છે. બહેન તિલક કરે છે, અને ભાઈ પરવડે તો ભેટ આપે છે. ભાઈ કે બહેન ન હોય ત્યાં પિતરાઈ અને નજીકના મિત્રોને બોલાવાય છે. સંબંધ જ વિધિ છે.",
    pujaEn: [
      "The sister puts a tilak on the brother's forehead and offers a sweet before the meal.",
      "She serves him lunch. He does not get up and serve himself first. That small order is the custom.",
      "If you are far away, do it on a video call: show the tilak, show the plate, and eat at the same time.",
    ],
    pujaGu: [
      "બહેન ભાઈના કપાળે તિલક કરે છે અને જમતાં પહેલાં મીઠાઈ ધરે છે.",
      "તે બપોરનું પીરસે છે. ભાઈ પહેલાં ઊભો થઈને પોતે નથી લેતો. એ નાનો ક્રમ રિવાજ છે.",
      "દૂર હો તો વીડિયો કોલ પર કરો: તિલક બતાવો, થાળી બતાવો, અને એક સાથે ખાઓ.",
    ],
    foodEn: ["A favourite meal of the brother, plus a sweet. There is no fixed menu.", "No fast."],
    foodGu: ["ભાઈને ગમતું જમવાનું, અને મીઠાઈ. નિશ્ચિત મેનુ નથી.", "ઉપવાસ નથી."],
    avoidEn: [
      "Do not turn the gift into a price list. A small present, or none, still leaves the meal intact.",
      "Do not exclude a sister who cannot cook. Buying the meal and serving it counts.",
    ],
    avoidGu: [
      "ભેટને ભાવપત્રક ન બનાવો. નાની ભેટ, કે ન હોય, તો પણ જમવાનું રહે છે.",
      "જે બહેન રાંધી ન શકે તેને બહાર ન રાખો. જમવાનું લાવીને પીરસવું ગણાય.",
    ],
  }),
  "labh-pancham": practice({
    briefEn: "Open the shop or the laptop and write a profit, even a small one. Greet customers.",
    briefGu: "દુકાન કે લેપટોપ ખોલો અને નફો લખો, નાનો હોય તો પણ. ગ્રાહકોને રામતેજ કરો.",
    storyEn: "Labh Pancham is Kartak Shukla Pancham, the fifth day of the new year, when Gujarati businesses traditionally reopen and take a first profit. Homes without a shop still mark it: a freelance invoice, a first sale, or a ledger line that says the year has started earning.",
    storyGu: "લાભ પાંચમ કારતક સુદ પાંચમ છે, નૂતન વર્ષનો પાંચમો દિવસ, જ્યારે ગુજરાતી વેપાર પરંપરાથી ફરી ખુલે છે અને પહેલો નફો લે છે. દુકાન વગરનું ઘર પણ તે રાખે છે: એક ઇન્વૉઇસ, પહેલું વેચાણ, અથવા ચોપડીની લીટી કે વર્ષ કમાવાનું શરૂ થયું.",
    pujaEn: [
      "Open the shutters, or the inbox, at a decent morning hour. Write the first transaction. A nominal sale to a family member is a known way to begin.",
      "Light a lamp in the shop or on the desk before the first customer.",
      "Greet whoever comes. Labh is the welcome as much as the number.",
    ],
    pujaGu: [
      "સારી સવારે બારણાં, અથવા ઇનબોક્સ, ખોલો. પહેલો વ્યવહાર લખો. ઘરના સભ્યને નામમાત્રનું વેચાણ શરૂઆતની જાણીતી રીત છે.",
      "પહેલા ગ્રાહક પહેલાં દુકાનમાં કે ટેબલ પર દીવો કરો.",
      "જે આવે તેને રામતેજ કરો. લાભ આંકડો છે એટલો જ સ્વાગત પણ છે.",
    ],
    foodEn: ["Sweets for customers or colleagues. A normal meal at home.", "No fast."],
    foodGu: ["ગ્રાહકો કે સાથીઓ માટે મીઠાઈ. ઘરે સામાન્ય જમવાનું.", "ઉપવાસ નથી."],
    avoidEn: [
      "Do not force a loss-making stunt to 'book profit'. A fair small sale is the rite.",
      "Do not spend the day only decorating and never open for a person.",
    ],
    avoidGu: [
      "નફો નોંધવા ખોટનો તમાશો ન કરો. વાજબી નાનું વેચાણ વિધિ છે.",
      "આખો દિવસ માત્ર શણગારમાં કાઢીને કોઈ માટે ખોલશો નહીં.",
    ],
  }),
  "tulsi-vivah": practice({
    briefEn: "Marry the tulsi plant to a shaligram or a Krishna picture. Any day from Devutthana to Kartak Purnima is acceptable.",
    briefGu: "તુલસીનાં લગ્ન શાલિગ્રામ કે કૃષ્ણના ફોટા સાથે. દેવઉત્થાનથી કારતક પૂર્ણિમા સુધીનો કોઈ પણ દિવસ ચાલે.",
    storyEn: "Tulsi Vivah is most often Kartak Shukla Dwadashi. The plant is the bride and Vishnu, as a shaligram or a picture, is the groom. Some families pick any day from Devutthana Ekadashi to Kartak full moon. A pot of tulsi on a balcony is a complete mandap.",
    storyGu: "તુલસી વિવાહ મોટે ભાગે કારતક સુદ બારસે થાય છે. છોડ વધુ છે અને વિષ્ણુ, શાલિગ્રામ કે ફોટા રૂપે, વર છે. કેટલાંક કુટુંબ દેવઉત્થાન એકાદશીથી કારતક પૂર્ણિમા સુધીનો કોઈ પણ દિવસ પસંદ કરે છે. બાલ્કનીમાં તુલસીનો કૂંડો પૂરો મંડપ છે.",
    pujaEn: [
      "Water the plant in the morning. Tie a string or a small cloth around the pot as a wedding thread.",
      "Place a shaligram or a Krishna picture beside it. Light a lamp. Walk around the pot once, or seven times if you have the room.",
      "Offer sugarcane, rice, and a fruit. Then share the prasad.",
    ],
    pujaGu: [
      "સવારે છોડને પાણી આપો. લગ્નના દોરા તરીકે કૂંડા પર દોરી કે નાનું કપડું બાંધો.",
      "બાજુમાં શાલિગ્રામ કે કૃષ્ણનો ફોટો મૂકો. દીવો કરો. જગ્યા હોય તો સાત વાર, નહીં તો એક વાર કૂંડાની પ્રદક્ષિણા કરો.",
      "શેરડી, ચોખા અને ફળ ધરાવો. પછી પ્રસાદ વહેંચો.",
    ],
    foodEn: ["Seasonal fruit, kanji or a light sweet, and a vegetarian meal.", "Sugarcane is the festive chew of Kartak."],
    foodGu: ["ઋતુનું ફળ, કાંજી કે હલકી મીઠાઈ, અને શાકાહારી જમવાનું.", "શેરડી કારતકનું તહેવારી ચાવવાનું છે."],
    avoidEn: [
      "Do not perform this during Chaturmas, before Devutthana. Wait.",
      "Do not cut the tulsi plant down as part of the wedding. You are marrying it, not harvesting it.",
    ],
    avoidGu: [
      "ચાતુર્માસમાં, દેવઉત્થાન પહેલાં, આ ન કરો. રાહ જુઓ.",
      "લગ્નના ભાગ રૂપે તુલસીનો છોડ ન કાપો. તમે તેના લગ્ન કરો છો, લણણી નહીં.",
    ],
  }),
  "vasant-panchami": practice({
    briefEn: "Wear yellow. Begin learning something, or bless the books and instruments you already use.",
    briefGu: "પીળું પહેરો. કંઈક શીખવાનું શરૂ કરો, અથવા જે ચોપડી અને સાધન વાપરો છો તેને આશીર્વાદો.",
    storyEn: "Vasant Panchami is Maha Shukla Pancham, the first colour of spring. Saraswati is worshipped, especially by students. Gujarati homes wear yellow, put books and instruments in front of a lamp, and sometimes start a child on the first letters.",
    storyGu: "વસંત પંચમી મહા સુદ પાંચમ છે, વસંતનો પહેલો રંગ. સરસ્વતીની પૂજા થાય છે, ખાસ કરીને વિદ્યાર્થીઓથી. ગુજરાતી ઘર પીળું પહેરે છે, ચોપડી અને સાધન દીવા આગળ મૂકે છે, અને ક્યારેક બાળકને પહેલા અક્ષર શરૂ કરાવે છે.",
    pujaEn: [
      "Place books, a pen, or an instrument in a clean spot. Light a lamp. Do not step over them today.",
      "Wear yellow if you have it. A scarf counts.",
      "If a child is starting school-learning, guide their hand to write one letter. An adult can start a course the same way, with one page.",
    ],
    pujaGu: [
      "ચોપડી, પેન અથવા સાધન સ્વચ્છ જગ્યાએ મૂકો. દીવો કરો. આજે તેની ઉપરથી પગ ન મૂકો.",
      "હોય તો પીળું પહેરો. એક સ્કાર્ફ ગણાય.",
      "બાળક અક્ષર શરૂ કરતું હોય તો હાથ પકડીને એક અક્ષર લખાવો. મોટું માણસ એ જ રીતે એક પાનાથી અભ્યાસ શરૂ કરી શકે.",
    ],
    foodEn: ["Yellow food if you can: saffron rice, or a simple sweet with saffron.", "A normal vegetarian meal. No fast."],
    foodGu: ["શક્ય હોય તો પીળું ખાવાનું: કેસરી ભાત, અથવા કેસરની સાદી મીઠાઈ.", "સામાન્ય શાકાહારી જમવાનું. ઉપવાસ નથી."],
    avoidEn: [
      "Do not shove every gadget into the puja and then ignore the studying. One real page matters more.",
      "White or black clothes are not wrong. Yellow is the sign, not a uniform.",
    ],
    avoidGu: [
      "દરેક સાધન પૂજામાં મૂકીને અભ્યાસ અવગણશો નહીં. એક સાચું પાનું વધારે મહત્વનું છે.",
      "સફેદ કે કાળાં વસ્ત્ર ખોટાં નથી. પીળો રંગ નિશાની છે, ગણવેશ નહીં.",
    ],
  }),
  "maha-shivaratri": practice({
    briefEn: "The great Shiva night in Maha. A fast, a linga or a picture, and at least one watch of the night if you can stay up.",
    briefGu: "મહાની મોટી શિવરાત્રિ. ઉપવાસ, લિંગ કે ફોટો, અને જાગી શકો તો રાત્રિનો ઓછામાં ઓછો એક પહોર.",
    storyEn: "Maha Shivaratri is Maha Krishna Chaudas, the long night of Shiva. The classic practice is a fast and four watches of the night, with abhishek each time. A household that cannot stay up all night still bathes a linga once, or pours water on a picture, and keeps a quiet fast.",
    storyGu: "મહા શિવરાત્રિ મહા વદ ચૌદસ છે, શિવની લાંબી રાત્રિ. જૂની રીત ઉપવાસ અને રાત્રિના ચાર પહોર છે, દર વખતે અભિષેક. આખી રાત જાગી ન શકે તે ઘર એક વાર લિંગને સ્નાન કરાવે છે, અથવા ફોટા પર જળ રેડે છે, અને શાંત ઉપવાસ રાખે છે.",
    pujaEn: [
      "Through the day, fruit or a full fast. Grain is avoided in strict houses.",
      "At night, pour water or milk over a linga, then bel leaves if you have them. A picture receives water beside it, not a soaking that ruins the frame.",
      "Stay for one stretch of quiet. Chant 'Om Namah Shivaya' if you want words. Silence is also the puja.",
    ],
    pujaGu: [
      "દિવસભર ફળ અથવા પૂરો ઉપવાસ. કડક ઘરે અનાજ ટાળાય છે.",
      "રાત્રે લિંગ પર જળ કે દૂધ રેડો, પછી હોય તો બિલીપત્ર. ફોટાની બાજુમાં જળ રાખો, ફ્રેમ બગાડે એટલું પલાળશો નહીં.",
      "થોડી વાર શાંત બેસો. શબ્દ જોઈતા હોય તો 'ૐ નમઃ શિવાય' કહો. મૌન પણ પૂજા છે.",
    ],
    foodEn: ["Fruit, milk, or a farali meal if you need strength for the night.", "Break the fast after the last watch you keep, or the next morning."],
    foodGu: ["ફળ, દૂધ, અથવા રાત્રિ માટે શક્તિ જોઈએ તો ફરાળ.", "જે છેલ્લો પહોર રાખો તે પછી, અથવા બીજા દિવસે સવારે, પારણું કરો."],
    avoidEn: [
      "Do not offer bel by stripping a tree bald. A few leaves, or none, is better.",
      "Do not treat the night as a fairground. Bhang and noise are not the household vrata.",
    ],
    avoidGu: [
      "વૃક્ષ ટાલું કરીને બિલીપત્ર ન ધરાવો. થોડાં પાન, કે એક પણ નહીં, સારું.",
      "રાત્રિને મેળો ન બનાવો. ભાંગ અને ઘોંઘાટ ઘરનો વ્રત નથી.",
    ],
  }),
  "hanuman-jayanti": practice({
    briefEn: "Hanuman's day on Chaitra Purnima. Visit a temple if you can, or light a lamp and read the Hanuman Chalisa once.",
    briefGu: "ચૈત્ર પૂર્ણિમાએ હનુમાનનો દિવસ. શક્ય હોય તો મંદિરે જાઓ, નહીં તો દીવો કરો અને હનુમાન ચાલીસા એક વાર વાંચો.",
    storyEn: "In the Gujarati calendar Hanuman Jayanti is Chaitra full moon, not the date some other regions use. Hanuman is the devotee who did the work. The home observance is a visit, a lamp, and the Chalisa. Strength, in this telling, looks like service.",
    storyGu: "ગુજરાતી પંચાંગમાં હનુમાન જયંતી ચૈત્ર પૂર્ણિમા છે, બીજા પ્રદેશોની તારીખ નહીં. હનુમાન કામ કરી બતાવનાર ભક્ત છે. ઘરની રીત મુલાકાત, દીવો અને ચાલીસા છે. આ કથામાં શક્તિ સેવા જેવી દેખાય છે.",
    pujaEn: [
      "Go to a Hanuman temple in the morning if one is nearby. Offer sindur and a laddu, or flowers.",
      "At home, light a lamp and recite the Chalisa once. Reading a translation beside it is fine if the Sanskrit is unfamiliar.",
      "Oil and sindur on the murti are traditional. A picture gets sindur beside it, not smeared across the glass.",
    ],
    pujaGu: [
      "નજીકમાં હનુમાન મંદિર હોય તો સવારે જાઓ. સિંદૂર અને લાડુ, અથવા ફૂલ, ધરાવો.",
      "ઘરે દીવો કરો અને ચાલીસા એક વાર બોલો. સંસ્કૃત અજાણી હોય તો બાજુમાં અનુવાદ વાંચવો ચાલે.",
      "મૂર્તિ પર તેલ અને સિંદૂર પરંપરા છે. ફોટાની બાજુમાં સિંદૂર રાખો, કાચ પર ઘસશો નહીં.",
    ],
    foodEn: ["Laddu as prasad, then a normal vegetarian meal.", "A fast until the temple visit is common and not required."],
    foodGu: ["પ્રસાદ તરીકે લાડુ, પછી સામાન્ય શાકાહારી જમવાનું.", "મંદિર સુધીનો ઉપવાસ સામાન્ય છે, ફરજ નહીં."],
    avoidEn: [
      "Do not keep the South Indian or North Indian date if your house follows this calendar. Chaitra Purnima is the Gujarati day.",
      "Do not skip the Chalisa because you think you need a priest. One reading at home is the festival.",
    ],
    avoidGu: [
      "ઘર આ પંચાંગ પ્રમાણે ચાલતું હોય તો દક્ષિણ કે ઉત્તરની તારીખ ન રાખો. ચૈત્ર પૂર્ણિમા ગુજરાતી દિવસ છે.",
      "પુરોહિત જોઈએ એમ સમજીને ચાલીસા ન છોડો. ઘરે એક વાર વાંચવી એ જ તહેવાર છે.",
    ],
  }),
  "guru-purnima": practice({
    briefEn: "Honour a teacher. A call, a visit, or a quiet thanks is the puja. A fast is traditional.",
    briefGu: "શિક્ષકનું માન. ફોન, મુલાકાત, અથવા શાંત આભાર એ પૂજા છે. ઉપવાસ પરંપરા છે.",
    storyEn: "Guru Purnima is Ashadh full moon, in the middle of Chaturmas. Vyasa is remembered, and so is whoever actually taught you. Gujarati homes visit a guru, a music teacher, or a parent who taught the tradition. The fast until evening, or until moonrise, is the older rule.",
    storyGu: "ગુરુ પૂર્ણિમા અષાઢની પૂનમ છે, ચાતુર્માસની વચ્ચે. વ્યાસ યાદ કરાય છે, અને જેણે ખરેખર શીખવ્યું તે પણ. ગુજરાતી ઘર ગુરુ, સંગીત શિક્ષક, અથવા પરંપરા શીખવનાર માતા-પિતાને મળે છે. સાંજ સુધી કે ચંદ્રોદય સુધીનો ઉપવાસ જૂનો નિયમ છે.",
    pujaEn: [
      "Name the person who taught you and thank them today, in person or by phone. A gift is optional.",
      "Light a lamp. If you have a guru's photo, put flowers. If you do not, the lamp and the phone call are complete.",
      "A grain fast until the evening puja is the strict form. Farali food is the milder one.",
    ],
    pujaGu: [
      "જેણે તમને શીખવ્યું તેમનું નામ લો અને આજે આભાર માનો, મળીને કે ફોને. ભેટ વૈકલ્પિક છે.",
      "દીવો કરો. ગુરુનો ફોટો હોય તો ફૂલ મૂકો. ન હોય તો દીવો અને ફોન પૂરાં છે.",
      "સાંજની પૂજા સુધી અનાજનો ઉપવાસ કડક રૂપ છે. ફરાળ હળવું રૂપ છે.",
    ],
    foodEn: ["Fruit or one farali meal if you are fasting.", "A normal dinner after the evening thanks."],
    foodGu: ["ઉપવાસ હોય તો ફળ અથવા એક ફરાળ.", "સાંજના આભાર પછી સામાન્ય રાત્રિભોજન."],
    avoidEn: [
      "Do not turn it into a public performance of gratitude that embarrasses the teacher.",
      "New weddings still wait. Chaturmas is on.",
    ],
    avoidGu: [
      "કૃતજ્ઞતાનો જાહેર તમાશો ન કરો જે શિક્ષકને શરમાવે.",
      "નવા લગ્ન હજી રાહ જુએ. ચાતુર્માસ ચાલુ છે.",
    ],
  }),
  "raksha-bandhan": practice({
    briefEn: "A sister ties a rakhi and the brother promises to stand by her. Feed each other a sweet.",
    briefGu: "બહેન રાખડી બાંધે છે અને ભાઈ સાથે ઊભા રહેવાનું વચન આપે છે. એકબીજાને મીઠાઈ ખવડાવો.",
    storyEn: "Raksha Bandhan is Shravan full moon. A sister ties a thread on a brother's wrist. He gives a gift if he can, and both of them eat something sweet. Cousins, friends, and soldiers have all been brought into this rite. The thread is the promise, not the price of the gift.",
    storyGu: "રક્ષાબંધન શ્રાવણની પૂનમ છે. બહેન ભાઈના હાથે દોરો બાંધે છે. તે પરવડે તો ભેટ આપે છે, અને બંને મીઠાઈ ખાય છે. પિતરાઈ, મિત્રો અને સૈનિકો આ રીતમાં આવ્યા છે. દોરો વચન છે, ભેટની કિંમત નહીં.",
    pujaEn: [
      "The sister ties the rakhi on the right wrist, puts a tilak, and offers a sweet.",
      "The brother gives what he has decided, without a negotiation at the table.",
      "Across cities, post the rakhi so it arrives today, or tie it on a call and wear it while you talk.",
    ],
    pujaGu: [
      "બહેન જમણા હાથે રાખડી બાંધે છે, તિલક કરે છે, અને મીઠાઈ ધરે છે.",
      "ભાઈ જે નક્કી કર્યું હોય તે આપે છે, ટેબલ પર સોદા વગર.",
      "શહેરો વચ્ચે રાખડી એવી મોકલો કે આજે પહોંચે, અથવા કોલ પર બાંધો અને વાત કરતાં પહેરો.",
    ],
    foodEn: ["Sweets first, then a normal festive meal.", "No fast is required. It is a full-moon day, so some houses still eat simply."],
    foodGu: ["પહેલાં મીઠાઈ, પછી સામાન્ય તહેવારી જમવાનું.", "ઉપવાસ જરૂરી નથી. પૂનમ છે, એટલે કેટલાંક ઘર સાદું જ ખાય છે."],
    avoidEn: [
      "Do not price the rakhi. A thread from a spool and a real promise outranks a catalogue.",
      "Do not leave out a cousin or a friend the house already counts as its own. The thread is the promise.",
    ],
    avoidGu: [
      "રાખડીને ભાવ ન આપો. વાટામાંથી દોરો અને સાચું વચન કેટલોગ કરતાં મોટું છે.",
      "જે પિતરાઈ કે મિત્રને ઘર પોતાનું ગણતું હોય તેને બહાર ન રાખો. દોરો વચન છે.",
    ],
  }),
  "sharad-purnima": practice({
    briefEn: "The full moon after Navratri. Set milk in the moonlight, then drink it. A fast until evening is common.",
    briefGu: "નવરાત્રિ પછીની પૂનમ. દૂધ ચાંદનીમાં મૂકો, પછી પીઓ. સાંજ સુધીનો ઉપવાસ સામાન્ય છે.",
    storyEn: "Sharad Purnima, or Kojagari, is Aso full moon. The moon is said to drip amrit. Homes cook a milk dish, leave it under the moon, and eat it later that night. Garba is over. This night is quiet and white.",
    storyGu: "શરદ પૂર્ણિમા, અથવા કોજાગરી, આસોની પૂનમ છે. ચંદ્ર અમૃત ટપકાવે છે એમ કહેવાય. ઘર દૂધની વાનગી બનાવે છે, ચાંદનીમાં મૂકે છે, અને રાત્રે ખાય છે. ગરબો પૂરો થઈ ચૂક્યો છે. આ રાત્રિ શાંત અને સફેદ છે.",
    pujaEn: [
      "Cook dudh-poha, kheer, or a plain bowl of milk with saffron and crushed poha.",
      "After moonrise, set it on a terrace or a windowsill where the moon actually falls. An hour is plenty. Then eat it.",
      "A fast until moonrise is the older rule. Farali food through the day is the milder one.",
    ],
    pujaGu: [
      "દૂધ-પૌઆ, ખીર, અથવા કેસર અને કૂટેલા પૌઆ સાથે દૂધની સાદી વાટકી બનાવો.",
      "ચંદ્રોદય પછી તેને અગાસી કે બારીમાં મૂકો જ્યાં ચાંદની ખરેખર પડે. એક કલાક બસ છે. પછી ખાઓ.",
      "ચંદ્રોદય સુધીનો ઉપવાસ જૂનો નિયમ છે. દિવસભર ફરાળ હળવો નિયમ છે.",
    ],
    foodEn: ["The moon-charged milk dish is the prasad and often the dinner.", "Add banana or dry fruit if you want it to feel like a meal."],
    foodGu: ["ચાંદનીવાળી દૂધની વાનગી પ્રસાદ છે અને ઘણી વાર રાત્રિભોજન પણ.", "જમવાનું લાગે એ માટે કેળાં કે સૂકો મેવો ઉમેરો."],
    avoidEn: [
      "Do not leave dairy out all night in the heat and then feed it to children. An hour of moonlight, then the fridge if you must wait.",
      "Do not restart full garba as if Navratri had not ended. A few songs at home are plenty.",
    ],
    avoidGu: [
      "ગરમીમાં દૂધની વાનગી આખી રાત બહાર મૂકીને બાળકોને ન ખવડાવો. એક કલાક ચાંદની, પછી રાહ જોવી હોય તો ફ્રિજ.",
      "નવરાત્રિ પૂરી ન થઈ હોય એમ સમજીને પૂરો ગરબો ફરી ન શરૂ કરો. ઘરે થોડાં ગીત બસ છે.",
    ],
  }),
  "dev-diwali": practice({
    briefEn: "The gods' Diwali, on Kartak full moon. Light lamps again, at the temple or the doorway. A fast until evening is traditional.",
    briefGu: "દેવોની દિવાળી, કારતકની પૂનમે. મંદિરે કે બારણે ફરી દીવા કરો. સાંજ સુધીનો ઉપવાસ પરંપરા છે.",
    storyEn: "Dev Diwali is Kartak Purnima, a month after the household Diwali. The story says the gods celebrated Rama's return, or Shiva's victory, with lamps. In Gujarat it is also the day of a morning pushya snan at a river or the sea, when people can travel. At home, lamps again are the festival.",
    storyGu: "દેવ દિવાળી કારતક પૂર્ણિમા છે, ઘરની દિવાળીના એક મહિના પછી. કથા એ છે કે દેવોએ રામના પાછા ફરવાની, કે શિવની જીતની, દીવાથી ઉજવણી કરી. ગુજરાતમાં જઈ શકે તે નદી કે સમુદ્રે સવારના પુષ્ય સ્નાનનો દિવસ પણ છે. ઘરે ફરી દીવા એ જ તહેવાર છે.",
    pujaEn: [
      "If you can reach a river or the sea at dawn, bathe and offer water to the sun. At home, an ordinary bath and a lamp are the same idea.",
      "In the evening, light a row of lamps as you did on Diwali, fewer if you like. The doorway is the altar.",
      "A fast until the evening lamps is the traditional shape. Farali food is the compromise.",
    ],
    pujaGu: [
      "પરોઢિયે નદી કે સમુદ્રે પહોંચી શકો તો સ્નાન કરો અને સૂર્યને જળ ધરાવો. ઘરે સામાન્ય સ્નાન અને દીવો એ જ વિચાર છે.",
      "સાંજે દિવાળીની જેમ દીવાની હાર કરો, ગમે તો ઓછા. બારણું જ વેદી છે.",
      "સાંજના દીવા સુધીનો ઉપવાસ પરંપરાનો આકાર છે. ફરાળ સમાધાન છે.",
    ],
    foodEn: ["After the lamps, a light festive dinner, often with a milk sweet.", "Sugarcane and ponk, if the season has them, belong to Kartak."],
    foodGu: ["દીવા પછી હલકું તહેવારી રાત્રિભોજન, ઘણી વાર દૂધની મીઠાઈ સાથે.", "શેરડી અને પૌંક, ઋતુમાં હોય તો, કારતકના છે."],
    avoidEn: [
      "Do not repeat the firecracker Diwali. This night is lamps and water.",
      "Do not skip it because 'we already did Diwali'. It is a second, quieter invitation.",
    ],
    avoidGu: [
      "ફટાકડાવાળી દિવાળી ફરી ન કરો. આ રાત્રિ દીવા અને જળની છે.",
      "'દિવાળી તો થઈ ગઈ' એમ કહીને છોડશો નહીં. આ બીજું, શાંત આમંત્રણ છે.",
    ],
  }),
  holi: practice({
    briefEn: "Holika Dahan on the Fagan full-moon night. A shared bonfire, grain and a coconut offered, not a private blaze.",
    briefGu: "ફાગણ પૂનમની રાત્રે હોળીદહન. સહિયારી હોળી, અનાજ અને નારિયેળ અર્પણ, અંગત આગ નહીં.",
    storyEn: "Holika Dahan is the bonfire on Fagan Purnima. The story is Prahlad saved and Holika burned. In Gujarat the fire is usually a neighbourhood one. People bring wheat ears, a coconut, and a written worry to drop in. Dhuleti, the colour day, is tomorrow, not tonight.",
    storyGu: "હોળીદહન ફાગણ પૂર્ણિમાની હોળી છે. કથા પ્રહ્લાદ બચ્યો અને હોલિકા બળી. ગુજરાતમાં આગ સામાન્ય રીતે વિસ્તારની હોય છે. લોકો ઘઉંની કણસલ, નારિયેળ, અને લખેલી ચિંતા નાખવા લાવે છે. ધુળેટી, રંગનો દિવસ, કાલે છે, આજે રાત્રે નહીં.",
    pujaEn: [
      "Go to the community fire. Take a coconut, a handful of wheat, and if you want, a scrap of paper with something you are finished carrying.",
      "Walk around the fire once it is steady. Offer the grain. Do not throw plastic or aerosol cans.",
      "Take home a little ash or warmth in the old telling. A safe distance and a washed face are the modern version.",
    ],
    pujaGu: [
      "વિસ્તારની હોળીએ જાઓ. નારિયેળ, મુઠ્ઠીભર ઘઉં, અને ગમે તો એવી ચિંતાનો કાગળ લો જે હવે રાખવી નથી.",
      "આગ સ્થિર થાય પછી એક ફેરો કરો. અનાજ ધરાવો. પ્લાસ્ટિક કે સ્પ્રેના ડબ્બા ન ફેંકો.",
      "જૂની કથામાં થોડી રાખ કે ઊષ્મા ઘરે લાવાય. સલામત અંતર અને ધોયેલો ચહેરો આધુનિક રૂપ છે.",
    ],
    foodEn: ["Puran poli, or a sweet stuffed bread, is a common festive food around these days.", "A normal dinner after you return. No fast is required."],
    foodGu: ["પૂરણપોળી, અથવા મીઠાઈ ભરેલી રોટલી, આ દિવસોની સામાન્ય તહેવારી વાનગી છે.", "પાછા આવ્યા પછી સામાન્ય રાત્રિભોજન. ઉપવાસ જરૂરી નથી."],
    avoidEn: [
      "Do not light a bonfire on a balcony, a terrace with furniture, or a dry field.",
      "Do not play with colours tonight. That is Dhuleti, tomorrow.",
    ],
    avoidGu: [
      "બાલ્કની, રાચરચીલવાળી અગાસી, કે સૂકા ખેતરમાં હોળી ન સળગાવો.",
      "આજે રાત્રે રંગ ન રમો. તે ધુળેટી છે, કાલે.",
    ],
  }),
  dhuleti: practice({
    briefEn: "The colour day, the morning after the bonfire. Ask before you put colour on someone. Water is enough.",
    briefGu: "રંગનો દિવસ, હોળીના બીજા દિવસની સવાર. કોઈને રંગ લગાડો તે પહેલાં પૂછો. પાણી બસ છે.",
    storyEn: "Dhuleti is the day after Holika Dahan, the Gujarati colour festival. Krishna and the gopis are the story people attach to the play. The morning is for colour and water. By afternoon, houses bathe and eat a festive meal. Consent is part of the rite now, and it always should have been.",
    storyGu: "ધુળેટી હોળીદહનના બીજા દિવસે છે, ગુજરાતી રંગોત્સવ. કૃષ્ણ અને ગોપીઓની કથા રમત સાથે જોડાય છે. સવાર રંગ અને પાણી માટે છે. બપોરે ઘર સ્નાન કરે છે અને તહેવારી જમવાનું ખાય છે. સંમતિ હવે વિધિનો ભાગ છે, અને હંમેશાં હોવી જોઈતી હતી.",
    pujaEn: [
      "Use colour that is meant for skin, or just water. Ask, and believe the answer.",
      "Visit family in the late morning. A tilak of dry colour, with permission, is the gentle form.",
      "Bathe properly afterwards. Oil before the bath helps the colour leave.",
    ],
    pujaGu: [
      "ચામડી માટે બનેલો રંગ વાપરો, અથવા માત્ર પાણી. પૂછો, અને જવાબ માનો.",
      "મોડી સવારે કુટુંબને મળો. પરવાનગી સાથે સૂકા રંગનું તિલક હળવું રૂપ છે.",
      "પછી બરાબર સ્નાન કરો. સ્નાન પહેલાં તેલ રંગ ઉતરવામાં મદદ કરે છે.",
    ],
    foodEn: ["Puran poli, gujiya or ghughra, and a cool drink.", "A full lunch. Nobody is fasting."],
    foodGu: ["પૂરણપોળી, ઘુઘરા, અને ઠંડું પીણું.", "પૂરું બપોરનું. કોઈ ઉપવાસે નથી."],
    avoidEn: [
      "Do not use chemical dyes, grease, or eggs. Do not colour someone's face after they have said no.",
      "Do not mix last night's bonfire ash into a paste and throw it at eyes.",
    ],
    avoidGu: [
      "રાસાયણિક રંગ, ગ્રીઝ કે ઈંડાં ન વાપરો. ના કહી હોય તેના ચહેરા પર રંગ ન લગાડો.",
      "કાલ રાત્રિની રાખનો લૂગદો બનાવીને આંખે ન ફેંકો.",
    ],
  }),
  uttarayan: practice({
    briefEn: "Kite day, when the sun enters Makara. Fly one kite if you can, and eat undhiyu or a winter meal.",
    briefGu: "પતંગનો દિવસ, સૂર્ય મકરમાં પ્રવેશે ત્યારે. શક્ય હોય તો એક પતંગ ઉડાડો, અને ઊંધિયું કે શિયાળાનું જમવાનું ખાઓ.",
    storyEn: "Uttarayan is Makar Sankranti, the day the sun turns north into Capricorn. Gujarat made it a kite festival. It is a solar day, so it does not move with the tithi. Terraces fill up. The food is the winter harvest: undhiyu, jalebi, and til sweets.",
    storyGu: "ઉત્તરાયણ મકર સંક્રાંતિ છે, સૂર્ય ઉત્તર તરફ મકરમાં વળે છે. ગુજરાતે તેને પતંગોત્સવ બનાવ્યો. તે સૌર દિવસ છે, એટલે તિથિ સાથે ખસતો નથી. અગાસીઓ ભરાય છે. ખોરાક શિયાળાની લણણી છે: ઊંધિયું, જલેબી અને તલની મીઠાઈ.",
    pujaEn: [
      "In the morning, offer til and a little jaggery to the sun, or eat them yourself as the offering.",
      "Fly a kite from a terrace with someone watching the edge. One kite and a reel is a complete Uttarayan.",
      "Call down 'kai po che' if you want the game. Losing the kite is part of the day, not a failure.",
    ],
    pujaGu: [
      "સવારે સૂર્યને તલ અને થોડો ગોળ ધરાવો, અથવા અર્પણ તરીકે પોતે ખાઓ.",
      "કોઈ ધાર જોતું હોય તેવી અગાસીએથી પતંગ ઉડાડો. એક પતંગ અને ફિરકી પૂરી ઉત્તરાયણ છે.",
      "રમત જોઈતી હોય તો 'કાઈ પો ચે' કહો. પતંગ કપાય તે દિવસનો ભાગ છે, નિષ્ફળતા નહીં.",
    ],
    foodEn: ["Undhiyu, or a simpler winter mix of beans and potato, with puri and jalebi.", "Til ladoo or tal-sankari. Sesame is the sun's food today."],
    foodGu: ["ઊંધિયું, અથવા કઠોળ અને બટાકાનું સાદું શિયાળુ મિશ્રણ, પૂરી અને જલેબી સાથે.", "તલના લાડુ કે તલ-સંકરી. આજે તલ સૂર્યનું ખાવાનું છે."],
    avoidEn: [
      "Do not fly from a roof without a parapet, and do not run backwards toward the edge.",
      "Do not leave cut kite string where birds and two-wheelers will meet it. Glass thread injures. Prefer cotton.",
    ],
    avoidGu: [
      "પાળી વગરની છત પરથી ન ઉડાડો, અને ધાર તરફ પીઠ બતાવીને ન દોડો.",
      "કપાયેલી દોરી ત્યાં ન મૂકો જ્યાં પક્ષી અને બે પૈડાં મળે. કાચની દોરી ઘાયલ કરે છે. સૂતર પસંદ કરો.",
    ],
  }),
  pradosh: practice({
    briefEn: "A Shiva fast broken at twilight. Pour water, offer a bel leaf if you have one, then eat.",
    briefGu: "સંધ્યાએ પૂરો થતો શિવનો ઉપવાસ. જળ રેડો, હોય તો બિલીપત્ર ધરાવો, પછી ખાઓ.",
    storyEn: "Pradosh is the thirteenth tithi, kept for Shiva at the evening junction, roughly the hour and a half around sunset. Both bright and dark fortnights have one. When it falls on Dhanteras, do this puja and then Lakshmi's. The fast, if you keep it, ends after the twilight worship, not the next day.",
    storyGu: "પ્રદોષ તેરસ છે, સૂર્યાસ્તની આસપાસના દોઢ કલાકે શિવ માટે રાખાય છે. સુદ અને વદ બંને પક્ષે આવે છે. ધનતેરસે પડે તો આ પૂજા કરો અને પછી લક્ષ્મીની. ઉપવાસ રાખો તો સંધ્યાપૂજા પછી પૂરો થાય, બીજા દિવસે નહીં.",
    pujaEn: [
      "Eat lightly or fast until sunset. Fruit is the usual allowance.",
      "At twilight, bathe a linga with water. Offer one bel leaf, or a flower if you have no bel. Light a lamp.",
      "Eat after the puja. Dinner is allowed tonight.",
    ],
    pujaGu: [
      "સૂર્યાસ્ત સુધી હલકું ખાઓ અથવા ઉપવાસ રાખો. ફળ સામાન્ય છૂટ છે.",
      "સંધ્યાએ લિંગને જળથી સ્નાન કરાવો. એક બિલીપત્ર, અથવા બિલીપત્ર ન હોય તો ફૂલ ધરાવો. દીવો કરો.",
      "પૂજા પછી ખાઓ. આજે રાત્રે જમવાનું ચાલે.",
    ],
    foodEn: ["Fruit through the day.", "A simple vegetarian dinner after the aarti. Farali food if you want the fast to feel strict."],
    foodGu: ["દિવસભર ફળ.", "આરતી પછી સાદું શાકાહારી રાત્રિભોજન. વ્રત કડક લાગે એ માટે ફરાળ."],
    avoidEn: [
      "Do not strip a bel tree. One leaf, or a flower, is the offering.",
      "Do not keep an ekadashi-style fast into tomorrow morning. Pradosh ends at night.",
    ],
    avoidGu: [
      "બિલીપત્રનું વૃક્ષ ટાલું ન કરો. એક પાન, અથવા ફૂલ, અર્પણ છે.",
      "એકાદશી જેવો ઉપવાસ કાલ સવાર સુધી ન લંબાવો. પ્રદોષ રાત્રે પૂરો થાય છે.",
    ],
  }),
  sankashti: practice({
    briefEn: "A Ganesh fast until moonrise. Look at the moon, then eat. Moonrise may be late.",
    briefGu: "ચંદ્રોદય સુધીનો ગણેશ ઉપવાસ. ચંદ્ર જુઓ, પછી ખાઓ. ચંદ્રોદય મોડો હોઈ શકે.",
    storyEn: "Sankashti Chaturthi is Krishna Paksha Choth, a monthly Ganesh fast. The rule that surprises people is the moon: you eat after you have seen it, and in the dark fortnight moonrise comes late. A picture of Ganesh and a modak or a laddu are the worship.",
    storyGu: "સંકષ્ટી ચતુર્થી વદ ચોથ છે, દર મહિને ગણેશનો ઉપવાસ. જે નિયમ લોકોને નવાઈ પમાડે છે તે ચંદ્ર છે: તે જોયા પછી ખાવાનું, અને વદ પક્ષે ચંદ્રોદય મોડો આવે. ગણેશનો ફોટો અને મોદક કે લાડુ પૂજા છે.",
    pujaEn: [
      "Fast from grain through the day, or fully, if you can. Note the moonrise time before you promise yourself an early dinner.",
      "When the moon is up, look at it once, then do a short Ganesh aarti. Offer durva or a flower and a sweet.",
      "Eat after that. If cloud hides the moon, your house can eat after the aarti at the published moonrise time.",
    ],
    pujaGu: [
      "શક્ય હોય તો દિવસભર અનાજનો કે પૂરો ઉપવાસ રાખો. વહેલું રાત્રિભોજન વચન આપો તે પહેલાં ચંદ્રોદયનો સમય જુઓ.",
      "ચંદ્ર ઊગે ત્યારે એક વાર જુઓ, પછી ટૂંકી ગણેશ આરતી કરો. દૂર્વા કે ફૂલ અને મીઠાઈ ધરાવો.",
      "પછી ખાઓ. વાદળ ચંદ્ર છુપાવે તો ઘર છપાયેલા ચંદ્રોદયના સમયે આરતી પછી ખાઈ શકે.",
    ],
    foodEn: ["A sweet for Ganesh, then a normal vegetarian dinner.", "Farali food only if you extended the fast by choice."],
    foodGu: ["ગણેશ માટે મીઠાઈ, પછી સામાન્ય શાકાહારી રાત્રિભોજન.", "ઉપવાસ જાતે લંબાવ્યો હોય તો જ ફરાળ."],
    avoidEn: [
      "Do not eat at your usual dinner hour and say you will 'count' the moon later.",
      "Do not stare at a bright moon looking for a ritual mark. One glance is the rite.",
    ],
    avoidGu: [
      "રોજિંદા જમવાના સમયે ખાઈને પછી ચંદ્ર 'ગણીશ' એમ ન કહો.",
      "વિધિની નિશાની શોધવા તેજ ચંદ્ર સામે ન જુઓ. એક નજર એ જ રીત છે.",
    ],
  }),
  "masik-shivaratri": practice({
    briefEn: "The monthly Shiva night. A simple fast and one abhishek. You do not have to stay up as on Maha Shivaratri.",
    briefGu: "દર મહિને શિવરાત્રિ. સાદો ઉપવાસ અને એક અભિષેક. મહા શિવરાત્રિ જેવી જાગરણ જરૂરી નથી.",
    storyEn: "Masik Shivaratri is Krishna Paksha Chaudas, the monthly echo of the great night. Homes that keep it fast and bathe a linga once in the evening. The four watches belong to Maha Shivaratri, not to every month.",
    storyGu: "માસિક શિવરાત્રિ વદ ચૌદસ છે, મોટી રાત્રિનો માસિક પડઘો. જે ઘર રાખે છે તે ઉપવાસ કરે છે અને સાંજે એક વાર લિંગને સ્નાન કરાવે છે. ચાર પહોર મહા શિવરાત્રિના છે, દર મહિના નહીં.",
    pujaEn: [
      "Skip grain for the day, or eat fruit. In the evening, pour water over a linga or beside a picture.",
      "Offer one bel leaf or a flower. Light a lamp. Sit for a few minutes.",
      "Eat a simple dinner afterwards.",
    ],
    pujaGu: [
      "દિવસે અનાજ છોડો, અથવા ફળ ખાઓ. સાંજે લિંગ પર કે ફોટાની બાજુમાં જળ રેડો.",
      "એક બિલીપત્ર કે ફૂલ ધરાવો. દીવો કરો. થોડી વાર બેસો.",
      "પછી સાદું રાત્રિભોજન ખાઓ.",
    ],
    foodEn: ["Fruit or farali food before the puja.", "An ordinary vegetarian dinner after it."],
    foodGu: ["પૂજા પહેલાં ફળ કે ફરાળ.", "પછી સામાન્ય શાકાહારી રાત્રિભોજન."],
    avoidEn: [
      "Do not feel you have failed because you slept. Once is the monthly rite.",
      "Do not pick a bel tree clean. One leaf is plenty.",
    ],
    avoidGu: [
      "ઊંઘી ગયા એટલે નિષ્ફળ ગણશો નહીં. એક વાર માસિક રીત છે.",
      "બિલીપત્રનું વૃક્ષ સાફ ન કરો. એક પાન બસ છે.",
    ],
  }),
  purnima: practice({
    briefEn: "Full-moon night. A lamp after moonrise, and a lighter meal. Satvik food is the usual choice.",
    briefGu: "પૂનમની રાત્રિ. ચંદ્રોદય પછી દીવો, અને હલકું જમવાનું. સાત્વિક ખોરાક સામાન્ય પસંદગી છે.",
    storyEn: "An ordinary purnima has no extra story. The moon is full, and households that keep the tithi eat simply, light a lamp, and sometimes fast until moonrise. Named full moons, such as Raksha Bandhan or Sharad Purnima, add their own rite on top of this.",
    storyGu: "સામાન્ય પૂનમની અલગ કથા નથી. ચંદ્ર પૂરો છે, અને તિથિ રાખનાર ઘર સાદું ખાય છે, દીવો કરે છે, અને ક્યારેક ચંદ્રોદય સુધી ઉપવાસ રાખે છે. રક્ષાબંધન કે શરદ પૂર્ણિમા જેવી નામવાળી પૂનમ આ ઉપર પોતાની વિધિ ઉમેરે છે.",
    pujaEn: [
      "After moonrise, light a lamp on a windowsill or in the courtyard.",
      "Offer water or milk in a small bowl if that is your habit. Pour it on a plant afterwards.",
      "A fast until moonrise is optional. A quieter evening is the real observance.",
    ],
    pujaGu: [
      "ચંદ્રોદય પછી બારી કે આંગણે દીવો કરો.",
      "ટેવ હોય તો નાની વાટકીમાં જળ કે દૂધ ધરાવો. પછી છોડ પર રેડો.",
      "ચંદ્રોદય સુધીનો ઉપવાસ વૈકલ્પિક છે. શાંત સાંજ એ જ વ્રત છે.",
    ],
    foodEn: ["Khichdi, milk, fruit, or one sweet. Less spice than a wedding meal.", "A full fast only if your house already keeps every purnima that way."],
    foodGu: ["ખીચડી, દૂધ, ફળ, કે એક મીઠાઈ. લગ્નના જમણ કરતાં ઓછો મસાલો.", "ઘર દરેક પૂનમ એમ જ રાખતું હોય તો જ પૂરો ઉપવાસ."],
    avoidEn: [
      "Do not start a wedding or a housewarming just because the moon is full. Check Chaturmas first.",
      "Do not leave milk out overnight.",
    ],
    avoidGu: [
      "ચંદ્ર પૂરો છે એટલે લગ્ન કે ગૃહપ્રવેશ ન શરૂ કરો. પહેલાં ચાતુર્માસ તપાસો.",
      "દૂધ આખી રાત બહાર ન મૂકો.",
    ],
  }),
  amavasya: practice({
    briefEn: "The moonless day. Be quiet. Remember ancestors with water if that is your house. Do not start a new auspicious thing.",
    briefGu: "અમાસ. શાંત રહો. ઘરનો રિવાજ હોય તો પિતૃઓને જળ ધરાવો. નવું શુભ કામ શરૂ ન કરો.",
    storyEn: "Amavasya is the dark moon. It is not automatically a shraddha day. Shraddha belongs to pitru paksha, except that many homes still offer water to ancestors on any amavasya. Diwali is the famous exception: that moonless night is a festival. Every other amavasya stays plain.",
    storyGu: "અમાસ ઘેરો ચંદ્ર છે. તે આપોઆપ શ્રાદ્ધનો દિવસ નથી. શ્રાદ્ધ પિતૃ પક્ષનો છે, છતાં ઘણાં ઘર દરેક અમાસે પિતૃઓને જળ ધરાવે છે. દિવાળી જાણીતો અપવાદ છે: એ અમાસ તહેવાર છે. બાકીની દરેક અમાસ સાદી રહે છે.",
    pujaEn: [
      "In the morning, offer a handful of water and black sesame, if you have it, facing south, naming the ancestors you knew.",
      "Light a lamp at dusk. Keep the house ordinary. No new account, no new vehicle, no engagement.",
      "If someone died recently and the house is still in mourning, follow what the family priest or elder already set. Do not invent a second rite.",
    ],
    pujaGu: [
      "સવારે દક્ષિણ તરફ મોં રાખીને મુઠ્ઠી જળ અને હોય તો કાળા તલ ધરાવો, જે પિતૃઓને ઓળખતા હો તેમના નામ લઈને.",
      "સંધ્યાએ દીવો કરો. ઘર સામાન્ય રાખો. નવો હિસાબ, નવું વાહન, નવી સગાઈ નહીં.",
      "તાજેતરમાં મૃત્યુ થયું હોય અને ઘર હજી શોકમાં હોય તો જે પુરોહિત કે વડીલે કહ્યું હોય તે પાળો. બીજી વિધિ શોધશો નહીં.",
    ],
    foodEn: ["A simple vegetarian meal. Many houses skip onion and garlic.", "No feast, and no fast unless your family already keeps one."],
    foodGu: ["સાદું શાકાહારી જમવાનું. ઘણાં ઘર ડુંગળી અને લસણ રાખતા નથી.", "મિજબાની નહીં, અને કુટુંબ પહેલેથી રાખતું હોય તો જ ઉપવાસ."],
    avoidEn: [
      "Do not schedule a wedding, a shop opening, or a housewarming.",
      "Do not confuse this with Diwali. Lamps of welcome belong only to that amavasya.",
    ],
    avoidGu: [
      "લગ્ન, દુકાનનો આરંભ કે ગૃહપ્રવેશ ન રાખો.",
      "તેને દિવાળી સાથે ભેળવશો નહીં. સ્વાગતના દીવા માત્ર એ અમાસના છે.",
    ],
  }),
  shraddha: practice({
    briefEn: "The tithi in pitru paksha for ancestors who died on this lunar day. Offer water, sesame, and a meal in their name.",
    briefGu: "પિતૃ પક્ષની એ તિથિ જેમના મૃત્યુ આ ચાંદ્ર દિવસે થયા હોય. તેમના નામે જળ, તલ અને જમવાનું ધરાવો.",
    storyEn: "Pitru paksha is the dark fortnight of Bhadarvo. Each tithi belongs to ancestors who left on that same tithi. A household offers tarpana, water with black sesame, and feeds someone in their name: a priest, a poor guest, or the family itself eating simply. You only need the tithi you know. Unknown tithis wait for Sarva Pitru Amavasya.",
    storyGu: "પિતૃ પક્ષ ભાદરવા વદ છે. દરેક તિથિ તે જ તિથિએ ગયેલા પિતૃઓની છે. ઘર તર્પણ કરે છે, કાળા તલ સાથે જળ, અને તેમના નામે કોઈને જમાડે છે: પુરોહિત, ગરીબ મહેમાન, અથવા કુટુંબ પોતે સાદું ખાય. જે તિથિ જાણો તે બસ. અજાણી તિથિ સર્વ પિતૃ અમાસની રાહ જુએ.",
    pujaEn: [
      "In the morning, face south. Offer water mixed with black sesame, naming the person. One ancestor is enough if that is all you can say.",
      "Cook a simple meal without festival luxury. Offer it before you eat. Feed a guest if you can, or set a portion aside and give it away the same day.",
      "Wear washed, plain clothes. A lamp at the end is enough worship. You do not have to hire a priest to be sincere.",
    ],
    pujaGu: [
      "સવારે દક્ષિણ તરફ મોં રાખો. કાળા તલવાળું જળ ધરાવો, વ્યક્તિનું નામ લઈને. એક પિતૃ બસ છે, જો એટલું જ કહી શકો.",
      "તહેવારની શાન વગર સાદું જમવાનું રાંધો. ખાઓ તે પહેલાં ધરાવો. મહેમાનને જમાડી શકો તો જમાડો, નહીં તો એક વાટકી અલગ રાખીને એ જ દિવસે આપી દો.",
      "ધોયેલાં સાદાં વસ્ત્ર પહેરો. અંતે દીવો બસ પૂજા છે. સાચા હોવા માટે પુરોહિત જરૂરી નથી.",
    ],
    foodEn: ["Rice, dal, a vegetable, and a small sweet if the house offers one. Keep it plain.", "The cook may taste for salt. The meal is eaten after the offering, not thrown away."],
    foodGu: ["ભાત, દાળ, શાક, અને ઘર ધરાવે તો નાની મીઠાઈ. સાદું રાખો.", "રાંધનાર મીઠું ચાખી શકે. જમવાનું અર્પણ પછી ખાવાય છે, ફેંકાતું નથી."],
    avoidEn: [
      "Do not start a wedding, engagement, housewarming, or shop opening in pitru paksha.",
      "Do not buy festival clothes or throw a party on a shraddha tithi. Grief and gratitude are the mood.",
    ],
    avoidGu: [
      "પિતૃ પક્ષમાં લગ્ન, સગાઈ, ગૃહપ્રવેશ કે દુકાનનો આરંભ ન કરો.",
      "શ્રાદ્ધની તિથિએ તહેવારી કપડાં ન લો અને પાર્ટી ન કરો. મૂડ શોક અને કૃતજ્ઞતાનો છે.",
    ],
  }),
  "sarva-pitru": practice({
    briefEn: "Mahalaya, for every ancestor, especially those whose tithi you do not know. Offer water and a meal.",
    briefGu: "મહાલય, દરેક પિતૃ માટે, ખાસ કરીને જેમની તિથિ ન જાણતા હો. જળ અને જમવાનું ધરાવો.",
    storyEn: "Sarva Pitru Amavasya ends pitru paksha. It covers ancestors whose death tithi was forgotten, and it repeats the offering for everyone else. After today, the fortnight of shraddha is over and ordinary auspicious work may return, within the rest of the calendar.",
    storyGu: "સર્વ પિતૃ અમાસ પિતૃ પક્ષ પૂરો કરે છે. જેમની મૃત્યુતિથિ ભૂલાઈ ગઈ હોય તેમને આવરી લે છે, અને બાકીના માટે અર્પણ ફરી કરે છે. આજ પછી શ્રાદ્ધનો પખવાડિયો પૂરો થાય અને સામાન્ય શુભ કામ, બાકીના પંચાંગની અંદર, પાછું આવી શકે.",
    pujaEn: [
      "Offer water and black sesame for the people you can name, and once more for those you cannot.",
      "Feed someone, or eat a plain meal as the family offering. Give a portion away the same day.",
      "In the evening, a lamp. Tomorrow the house may feel ordinary again. That is correct.",
    ],
    pujaGu: [
      "જેમના નામ જાણો તેમના માટે, અને જેમના ન જાણો તેમના માટે એક વાર વધારે, જળ અને કાળા તલ ધરાવો.",
      "કોઈને જમાડો, અથવા કુટુંબના અર્પણ તરીકે સાદું જમવાનું ખાઓ. એ જ દિવસે એક વાટકી આપી દો.",
      "સાંજે દીવો. કાલે ઘર ફરી સામાન્ય લાગે. એ બરાબર છે.",
    ],
    foodEn: ["The same plain meal as other shraddha days: rice, dal, one vegetable.", "No festival menu."],
    foodGu: ["બીજા શ્રાદ્ધના દિવસો જેવું સાદું જમવાનું: ભાત, દાળ, એક શાક.", "તહેવારી મેનુ નહીં."],
    avoidEn: [
      "Do not cram a wedding consultation into the evening because the paksha is 'almost' over. Wait for tomorrow.",
      "Do not skip this day because you already offered on a known tithi. The unknown ones are the point.",
    ],
    avoidGu: [
      "પક્ષ 'લગભગ' પૂરો થયો છે એમ કહીને સાંજે લગ્નની વાત ન ગોઠવો. કાલ સુધી રાહ જુઓ.",
      "જાણીતી તિથિએ અર્પણ કરી દીધું છે એટલે આ દિવસ ન છોડો. અજાણ્યા પિતૃઓ જ અર્થ છે.",
    ],
  }),
};

function ekadashiPractice(id: string): Practice | null {
  const story = EKADASHI_STORY[id];
  if (!story) return null;
  return { ...story, ...EKADASHI_FAST };
}

function navratriPractice(kind: "sharad" | "chaitra", day: number): Practice {
  const base = GUIDES[kind === "sharad" ? "sharad-navratri" : "chaitra-navratri"];
  const form = NAVADURGA[day - 1];
  if (!form) return base;
  const [en, gu] = form;
  return {
    ...base,
    briefEn: `Night ${day}, ${en}. ${base.briefEn}`,
    briefGu: `રાત્રિ ${day}, ${gu}. ${base.briefGu}`,
    storyEn: `Tonight is ${en}, night ${day} of the nine. ${base.storyEn}`,
    storyGu: `આજે ${gu}, નવમાંથી રાત્રિ ${day}. ${base.storyGu}`,
  };
}

export function practiceFor(id: string): Practice | null {
  const bare = id.startsWith("adhik-") ? id.slice("adhik-".length) : id;
  const navratri = bare.match(/^(sharad|chaitra)-navratri-(\d+)$/);
  if (navratri) return navratriPractice(navratri[1] as "sharad" | "chaitra", Number(navratri[2]));
  if (bare.startsWith("shraddha-")) return GUIDES.shraddha;
  if (bare.startsWith("sankashti-")) return GUIDES.sankashti;
  if (bare.startsWith("masik-shivaratri-")) return GUIDES["masik-shivaratri"];
  if (bare.includes("pradosh")) return GUIDES.pradosh;
  if (bare.startsWith("purnima")) return GUIDES.purnima;
  if (bare.startsWith("amavasya")) return GUIDES.amavasya;
  if (bare.endsWith("-ekadashi")) return ekadashiPractice(bare);
  return GUIDES[bare] ?? null;
}
