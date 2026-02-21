// 威尔士语词汇库 - 50个核心单词
const welshVocabulary50 = [
  // 1-10: 基础问候和礼貌用语
  {
    id: 1,
    english: "hello",
    chinese: "你好",
    welsh: "helo",
    pronunciation: "HEH-lo",
    prefix: "",
    suffix: "-o (常见结尾)",
    memoryHint: "和英语 hello 几乎一样，只是发音更短促",
    extensions: {
      synonyms: ["hi", "greetings"],
      antonyms: ["goodbye"],
      collocations: ["say hello", "hello there"],
      sentence: "Helo, sut wyt ti? (Hello, how are you?)",
      sentenceTts: "Helo, sut wyt ti?"
    },
    ttsText: "helo",
    category: "greetings"
  },
  {
    id: 2,
    english: "thank you",
    chinese: "谢谢",
    welsh: "diolch",
    pronunciation: "DEE-olch",
    prefix: "di- (强调前缀)",
    suffix: "-olch (感谢后缀)",
    memoryHint: "联想：DEEp OLCH → 深深的感谢",
    extensions: {
      synonyms: ["thanks", "gratitude"],
      antonyms: ["ingratitude"],
      collocations: ["diolch yn fawr (非常感谢)"],
      sentence: "Diolch am eich help. (谢谢你的帮助。)",
      sentenceTts: "Diolch am eich help."
    },
    ttsText: "diolch",
    category: "courtesy"
  },
  {
    id: 3,
    english: "please",
    chinese: "请",
    welsh: "os gwelwch yn dda",
    pronunciation: "os GWELL-ooch un THAH",
    prefix: "os (如果)",
    suffix: "da (好)",
    memoryHint: "字面意思：'如果你觉得好'，比较正式的说法",
    extensions: {
      synonyms: ["if you please"],
      antonyms: ["demand"],
      collocations: ["please sit down", "please wait"],
      sentence: "Coffi, os gwelwch yn dda. (请给我咖啡。)",
      sentenceTts: "Coffi, os gwelwch yn dda."
    },
    ttsText: "os gwelwch yn dda",
    category: "courtesy"
  },
  {
    id: 4,
    english: "sorry",
    chinese: "对不起",
    welsh: "mae'n ddrwg gen i",
    pronunciation: "mine THROOG gen ee",
    prefix: "mae'n (是)",
    suffix: "gen i (我有)",
    memoryHint: "字面意思：'我有坏事'，表示歉意",
    extensions: {
      synonyms: ["apologies", "excuse me"],
      antonyms: ["thank you"],
      collocations: ["I'm sorry", "sorry for that"],
      sentence: "Mae'n ddrwg gen i, dw i'n hwyr. (对不起，我迟到了。)",
      sentenceTts: "Mae'n ddrwg gen i, dw i'n hwyr."
    },
    ttsText: "mae'n ddrwg gen i",
    category: "courtesy"
  },
  {
    id: 5,
    english: "excuse me",
    chinese: "打扰一下",
    welsh: "esgusodwch fi",
    pronunciation: "es-GUS-od-ooch vee",
    prefix: "esgus- (借口)",
    suffix: "-odwch (动词后缀)",
    memoryHint: "发音像'爱思古索奇费'，礼貌用语",
    extensions: {
      synonyms: ["pardon me"],
      antonyms: [""],
      collocations: ["excuse me please", "excuse me sir"],
      sentence: "Esgusodwch fi, lle mae'r tŷ bach? (打扰一下，洗手间在哪里？)",
      sentenceTts: "Esgusodwch fi, lle mae'r tŷ bach?"
    },
    ttsText: "esgusodwch fi",
    category: "courtesy"
  },
  {
    id: 6,
    english: "goodbye",
    chinese: "再见",
    welsh: "hwyl fawr",
    pronunciation: "HOO-eel vowr",
    prefix: "",
    suffix: "fawr (大)",
    memoryHint: "字面意思：'大乐趣'，告别时祝愿对方",
    extensions: {
      synonyms: ["bye", "farewell"],
      antonyms: ["hello"],
      collocations: ["goodbye for now", "say goodbye"],
      sentence: "Hwyl fawr, nos da! (再见，晚安！)",
      sentenceTts: "Hwyl fawr, nos da!"
    },
    ttsText: "hwyl fawr",
    category: "greetings"
  },
  {
    id: 7,
    english: "see you",
    chinese: "再见",
    welsh: "hwyl",
    pronunciation: "HOO-eel",
    prefix: "",
    suffix: "",
    memoryHint: "和'goodbye'的'hwyl'一样，更简短",
    extensions: {
      synonyms: ["bye", "see ya"],
      antonyms: ["hello"],
      collocations: ["see you later", "see you soon"],
      sentence: "Hwyl am y tro! (暂时再见！)",
      sentenceTts: "Hwyl am y tro!"
    },
    ttsText: "hwyl",
    category: "greetings"
  },
  {
    id: 8,
    english: "how are you",
    chinese: "你好吗",
    welsh: "sut wyt ti",
    pronunciation: "sit oo-it tee",
    prefix: "",
    suffix: "ti (你)",
    memoryHint: "发音像'sit oo-it tee'，问候常用语",
    extensions: {
      synonyms: ["how do you do"],
      antonyms: [""],
      collocations: ["how are you today", "how are you feeling"],
      sentence: "Sut wyt ti heddiw? (你今天好吗？)",
      sentenceTts: "Sut wyt ti heddiw?"
    },
    ttsText: "sut wyt ti",
    category: "greetings"
  },
  {
    id: 9,
    english: "I'm fine",
    chinese: "我很好",
    welsh: "dw i'n iawn",
    pronunciation: "doo een yown",
    prefix: "dw i'n (我是)",
    suffix: "iawn (好)",
    memoryHint: "发音像'杜因要恩'，表示状态良好",
    extensions: {
      synonyms: ["I'm okay", "I'm good"],
      antonyms: ["I'm not well"],
      collocations: ["I'm fine thanks", "I'm fine really"],
      sentence: "Dw i'n iawn, diolch. (我很好，谢谢。)",
      sentenceTts: "Dw i'n iawn, diolch."
    },
    ttsText: "dw i'n iawn",
    category: "greetings"
  },
  {
    id: 10,
    english: "nice to meet you",
    chinese: "很高兴认识你",
    welsh: "braf cwrdd â chi",
    pronunciation: "brahf koorth ah khee",
    prefix: "",
    suffix: "â chi (与你)",
    memoryHint: "发音像'布拉夫库尔兹阿奇'",
    extensions: {
      synonyms: ["pleased to meet you"],
      antonyms: [""],
      collocations: ["nice to meet you too"],
      sentence: "Braf cwrdd â chi. (很高兴认识你。)",
      sentenceTts: "Braf cwrdd â chi."
    },
    ttsText: "braf cwrdd â chi",
    category: "greetings"
  },

  // 11-20: 基础词汇
  {
    id: 11,
    english: "yes",
    chinese: "是",
    welsh: "ie",
    pronunciation: "YEH",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'耶'，表示肯定",
    extensions: {
      synonyms: ["yeah", "affirmative"],
      antonyms: ["no"],
      collocations: ["yes please", "yes indeed"],
      sentence: "Ie, dw i'n hapus. (是的，我很开心。)",
      sentenceTts: "Ie, dw i'n hapus."
    },
    ttsText: "ie",
    category: "basics"
  },
  {
    id: 12,
    english: "no",
    chinese: "不",
    welsh: "na",
    pronunciation: "NAH",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'那'，表示否定",
    extensions: {
      synonyms: ["nope", "negative"],
      antonyms: ["yes"],
      collocations: ["no thanks", "no problem"],
      sentence: "Na, diolch. (不，谢谢。)",
      sentenceTts: "Na, diolch."
    },
    ttsText: "na",
    category: "basics"
  },
  {
    id: 13,
    english: "water",
    chinese: "水",
    welsh: "dŵr",
    pronunciation: "door",
    prefix: "",
    suffix: "ŵr (液体后缀)",
    memoryHint: "发音像英语 door，想象水从门里流出来",
    extensions: {
      synonyms: ["liquid", "aqua"],
      antonyms: ["fire"],
      collocations: ["tap water", "mineral water"],
      sentence: "Mae'r dŵr yn oer. (水是冷的。)",
      sentenceTts: "Mae'r dŵr yn oer."
    },
    ttsText: "dŵr",
    category: "basics"
  },
  {
    id: 14,
    english: "good",
    chinese: "好",
    welsh: "da",
    pronunciation: "dah",
    prefix: "",
    suffix: "-a (形容词后缀)",
    memoryHint: "发音像中文'大'，想象'大的就是好的'",
    extensions: {
      synonyms: ["fine", "excellent"],
      antonyms: ["bad"],
      collocations: ["very good", "good morning"],
      sentence: "Mae'n dda iawn. (非常好。)",
      sentenceTts: "Mae'n dda iawn."
    },
    ttsText: "da",
    category: "basics"
  },
  {
    id: 15,
    english: "house",
    chinese: "房子",
    welsh: "tŷ",
    pronunciation: "tee",
    prefix: "",
    suffix: "ŷ (名词后缀)",
    memoryHint: "发音像英语 tea，想象在房子里喝茶",
    extensions: {
      synonyms: ["home", "dwelling"],
      antonyms: ["outside"],
      collocations: ["big house", "house number"],
      sentence: "Mae'r tŷ yn fawr. (房子很大。)",
      sentenceTts: "Mae'r tŷ yn fawr."
    },
    ttsText: "tŷ",
    category: "basics"
  },
  {
    id: 16,
    english: "morning",
    chinese: "早晨",
    welsh: "bore",
    pronunciation: "BOR-eh",
    prefix: "",
    suffix: "-e (名词后缀)",
    memoryHint: "发音像 'bore'（无聊），但早晨不无聊",
    extensions: {
      synonyms: ["dawn", "sunrise"],
      antonyms: ["evening"],
      collocations: ["good morning", "morning coffee"],
      sentence: "Bore da! (早上好！)",
      sentenceTts: "Bore da!"
    },
    ttsText: "bore",
    category: "time"
  },
  {
    id: 17,
    english: "night",
    chinese: "夜晚",
    welsh: "nos",
    pronunciation: "nohs",
    prefix: "",
    suffix: "-os (名词后缀)",
    memoryHint: "发音像 'nose'（鼻子），晚上睡觉鼻子要呼吸",
    extensions: {
      synonyms: ["evening", "darkness"],
      antonyms: ["day"],
      collocations: ["good night", "night time"],
      sentence: "Nos da! (晚安！)",
      sentenceTts: "Nos da!"
    },
    ttsText: "nos",
    category: "time"
  },
  {
    id: 18,
    english: "bread",
    chinese: "面包",
    welsh: "bara",
    pronunciation: "BAH-rah",
    prefix: "",
    suffix: "-a (名词后缀)",
    memoryHint: "发音像 'bar'（酒吧）+ 'ah'，想象在酒吧吃面包",
    extensions: {
      synonyms: ["loaf"],
      antonyms: [""],
      collocations: ["bara brith (威尔士水果面包)", "fresh bread"],
      sentence: "Dw i eisiau bara. (我想要面包。)",
      sentenceTts: "Dw i eisiau bara."
    },
    ttsText: "bara",
    category: "food"
  },
  {
    id: 19,
    english: "coffee",
    chinese: "咖啡",
    welsh: "coffi",
    pronunciation: "KOF-ee",
    prefix: "",
    suffix: "-i (名词后缀)",
    memoryHint: "和英语 coffee 几乎一样，只是发音更短",
    extensions: {
      synonyms: ["java", "brew"],
      antonyms: ["tea"],
      collocations: ["morning coffee", "coffee shop"],
      sentence: "Coffi, os gwelwch yn dda. (请给我咖啡。)",
      sentenceTts: "Coffi, os gwelwch yn dda."
    },
    ttsText: "coffi",
    category: "food"
  },
  {
    id: 20,
    english: "tea",
    chinese: "茶",
    welsh: "te",
    pronunciation: "tay",
    prefix: "",
    suffix: "",
    memoryHint: "发音像英语'tay'，和英语'tea'类似",
    extensions: {
      synonyms: ["brew"],
      antonyms: ["coffee"],
      collocations: ["cup of tea", "tea time"],
      sentence: "Dw i eisiau te gyda llefrith. (我想要加牛奶的茶。)",
      sentenceTts: "Dw i eisiau te gyda llefrith."
    },
    ttsText: "te",
    category: "food"
  },

  // 21-30: 疑问词和时间
  {
    id: 21,
    english: "what",
    chinese: "什么",
    welsh: "beth",
    pronunciation: "beth",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'贝斯'，但'th'发音",
    extensions: {
      synonyms: ["which"],
      antonyms: [""],
      collocations: ["what is", "what are"],
      sentence: "Beth ydy hwn? (这是什么？)",
      sentenceTts: "Beth ydy hwn?"
    },
    ttsText: "beth",
    category: "questions"
  },
  {
    id: 22,
    english: "where",
    chinese: "哪里",
    welsh: "lle",
    pronunciation: "thleh",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'thleh'，注意'l'的发音",
    extensions: {
      synonyms: ["whereabouts"],
      antonyms: [""],
      collocations: ["where is", "where are"],
      sentence: "Lle mae'r bws? (公交车在哪里？)",
      sentenceTts: "Lle mae'r bws?"
    },
    ttsText: "lle",
    category: "questions"
  },
  {
    id: 23,
    english: "when",
    chinese: "什么时候",
    welsh: "pryd",
    pronunciation: "prid",
    prefix: "",
    suffix: "",
    memoryHint: "发音像英语'pride'，但更短",
    extensions: {
      synonyms: ["what time"],
      antonyms: [""],
      collocations: ["when will", "when did"],
      sentence: "Pryd mae'r trên? (火车什么时候来？)",
      sentenceTts: "Pryd mae'r trên?"
    },
    ttsText: "pryd",
    category: "questions"
  },
  {
    id: 24,
    english: "why",
    chinese: "为什么",
    welsh: "pam",
    pronunciation: "pahm",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'帕姆'，和法语'pourquoi'类似",
    extensions: {
      synonyms: ["for what reason"],
      antonyms: [""],
      collocations: ["why not", "why do"],
      sentence: "Pam wyt ti'n hwyr? (你为什么迟到？)",
      sentenceTts: "Pam wyt ti'n hwyr?"
    },
    ttsText: "pam",
    category: "questions"
  },
  {
    id: 25,
    english: "how",
    chinese: "如何",
    welsh: "sut",
    pronunciation: "sit",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'sit'，和'how are you'中的'sut'一样",
    extensions: {
      synonyms: ["in what way"],
      antonyms: [""],
      collocations: ["how much", "how many"],
      sentence: "Sut mae hyn yn gweithio? (这个怎么工作？)",
      sentenceTts: "Sut mae hyn  },
    ttsText: "sut",
    category: "questions"
  },
  {
    id: 26,
    english: "who",
    chinese: "谁",
    welsh: "pwy",
    pronunciation: "poo-ee",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'普伊'，注意'wy'的发音",
    extensions: {
      synonyms: ["whom"],
      antonyms: [""],
      collocations: ["who is", "who are"],
      sentence: "Pwy ydy e? (他是谁？)",
      sentenceTts: "Pwy ydy e?"
    },
    ttsText: "pwy",
    category: "questions"
  },
  {
    id: 27,
    english: "which",
    chinese: "哪个",
    welsh: "pa",
    pronunciation: "pah",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'帕'，简短有力",
    extensions: {
      synonyms: ["what"],
      antonyms: [""],
      collocations: ["which one", "which way"],
      sentence: "Pa un? (哪一个？)",
      sentenceTts: "Pa un?"
    },
    ttsText: "pa",
    category: "questions"
  },
  {
    id: 28,
    english: "how much",
    chinese: "多少",
    welsh: "faint",
    pronunciation: "vaint",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'万特'，注意'f'发'v'音",
    extensions: {
      synonyms: ["how many"],
      antonyms: [""],
      collocations: ["how much is", "how much does"],
      sentence: "Faint ydy hwn? (这个多少钱？)",
      sentenceTts: "Faint ydy hwn?"
    },
    ttsText: "faint",
    category: "questions"
  },
  {
    id: 29,
    english: "today",
    chinese: "今天",
    welsh: "heddiw",
    pronunciation: "HETH-yoo",
    prefix: "",
    suffix: "-diw (天后缀)",
    memoryHint: "发音像'赫斯尤'，注意'dd'发'th'音",
    extensions: {
      synonyms: ["this day"],
      antonyms: ["tomorrow"],
      collocations: ["today is", "today we"],
      sentence: "Heddiw ydy dydd Llun. (今天是星期一。)",
      sentenceTts: "Heddiw ydy dydd Llun."
    },
    ttsText: "heddiw",
    category: "time"
  },
  {
    id: 30,
    english: "tomorrow",
    chinese: "明天",
    welsh: "yfory",
    pronunciation: "uh-VOR-ee",
    prefix: "y- (定冠词)",
    suffix: "-fory (明天后缀)",
    memoryHint: "发音像'乌佛里'，注意'f'发'v'音",
    extensions: {
      synonyms: ["the next day"],
      antonyms: ["yesterday"],
      collocations: ["see you tomorrow", "tomorrow morning"],
      sentence: "Bydd hi'n bwrw glaw yfory. (明天会下雨。)",
      sentenceTts: "Bydd hi'n bwrw glaw yfory."
    },
    ttsText: "yfory",
    category: "time"
  },

  // 31-40: 更多时间词汇和频率副词
  {
    id: 31,
    english: "yesterday",
    chinese: "昨天",
    welsh: "ddoe",
    pronunciation: "THOY",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'索伊'，注意'dd'发'th'音",
    extensions: {
      synonyms: ["the day before"],
      antonyms: ["tomorrow"],
      collocations: ["yesterday I", "yesterday we"],
      sentence: "Roedd hi'n braf ddoe. (昨天天气很好。)",
      sentenceTts: "Roedd hi'n braf ddoe."
    },
    ttsText: "ddoe",
    category: "time"
  },
  {
    id: 32,
    english: "now",
    chinese: "现在",
    welsh: "nawr",
    pronunciation: "nowr",
    prefix: "",
    suffix: "",
    memoryHint: "发音像英语'now'，但加'r'音",
    extensions: {
      synonyms: ["at present"],
      antonyms: ["later"],
      collocations: ["right now", "now and then"],
      sentence: "Dw i eisiau mynd nawr. (我现在想走。)",
      sentenceTts: "Dw i eisiau mynd nawr."
    },
    ttsText: "nawr",
    category: "time"
  },
  {
    id: 33,
    english: "later",
    chinese: "稍后",
    welsh: "yn nes ymlaen",
    pronunciation: "un ness um-LINE",
    prefix: "yn (在)",
    suffix: "ymlaen (向前)",
    memoryHint: "字面意思：'更向前'",
    extensions: {
      synonyms: ["afterwards"],
      antonyms: ["now"],
      collocations: ["see you later", "later on"],
      sentence: "Byddwn ni'n cwrdd yn nes ymlaen. (我们稍后见面。)",
      sentenceTts: "Byddwn ni'n cwrdd yn nes ymlaen."
    },
    ttsText: "yn nes ymlaen",
    category: "time"
  },
  {
    id: 34,
    english: "always",
    chinese: "总是",
    welsh: "bob amser",
    pronunciation: "bob AM-ser",
    prefix: "bob (每个)",
    suffix: "amser (时间)",
    memoryHint: "字面意思：'每个时间'",
    extensions: {
      synonyms: ["forever", "constantly"],
      antonyms: ["never"],
      collocations: ["always happy", "always there"],
      sentence: "Rwy'n dy garu di bob amser. (我总是爱你。)",
      sentenceTts: "Rwy'n dy garu di bob amser."
    },
    ttsText: "bob amser",
    category: "time"
  },
  {
    id: 35,
    english: "never",
    chinese: "从不",
    welsh: "byth",
    pronunciation: "beeth",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'比斯'，但'th'发音",
    extensions: {
      synonyms: ["not ever"],
      antonyms: ["always"],
      collocations: ["never again", "never mind"],
      sentence: "Dw i byth yn hwyr. (我从不迟到。)",
      sentenceTts: "Dw i byth yn hwyr."
    },
    ttsText: "byth",
    category: "time"
  },
  {
    id: 36,
    english: "sometimes",
    chinese: "有时",
    welsh: "weithiau",
    pronunciation: "WAY-thee-eye",
    prefix: "",
    suffix: "-iau (复数后缀)",
    memoryHint: "发音像'威西艾'，注意'th'发音",
    extensions: {
      synonyms: ["occasionally"],
      antonyms: ["always"],
      collocations: ["sometimes I", "sometimes we"],
      sentence: "Weithiau, dw i'n mynd i'r sinema. (有时我去电影院。)",
      sentenceTts: "Weithiau, dw i'n mynd i'r sinema."
    },
    ttsText: "weithiau",
    category: "time"
  },
  {
    id: 37,
    english: "often",
    chinese: "经常",
    welsh: "yn aml",
    pronunciation: "un AM-ul",
    prefix: "yn (在)",
    suffix: "aml (频繁)",
    memoryHint: "发音像'乌南姆尔'",
    extensions: {
      synonyms: ["frequently"],
      antonyms: ["rarely"],
      collocations: ["very often", "often go"],
      sentence: "Dw i'n mynd i'r parc yn aml. (我经常去公园。)",
      sentenceTts: "Dw i'n mynd i'r parc yn aml."
    },
    ttsText: "yn aml",
    category: "time"
  },
  {
    id: 38,
    english: "time",
    chinese: "时间",
    welsh: "amser",
    pronunciation: "AM-ser",
    prefix: "",
    suffix: "-ser (时间后缀)",
    memoryHint: "发音像'安姆瑟'，注意's'发's'音",
    extensions: {
      synonyms: ["hour", "moment"],
      antonyms: [""],
      collocations: ["what time", "good time"],
      sentence: "Beth ydy'r amser? (现在几点了？)",
      sentenceTts: "Beth ydy'r amser?"
    },
    ttsText: "amser",
    category: "time"
  },
  {
    id: 39,
    english: "day",
    chinese: "天",
    welsh: "dydd",
    pronunciation: "deeth",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'迪斯'，但'dd'发'th'音",
    extensions: {
      synonyms: ["daytime"],
      antonyms: ["night"],
      collocations: ["every day", "good day"],
      sentence: "Mae'n dydd braf. (今天是美好的一天。)",
      sentenceTts: "Mae'n dydd braf."
    },
    ttsText: "dydd",
    category: "time"
  },
  {
    id: 40,
    english: "week",
    chinese: "周",
    welsh: "wythnos",
    pronunciation: "OO-ith-nos",
    prefix: "wyth (八)",
    suffix: "nos (夜晚)",
    memoryHint: "字面意思：'八个夜晚'，古代一周八天",
    extensions: {
      synonyms: ["seven days"],
      antonyms: [""],
      collocations: ["next week", "last week"],
      sentence: "Byddwn ni'n mynd wythnos nesaf. (我们下周去。)",
      sentenceTts: "Byddwn ni'n mynd wythnos nesaf."
    },
    ttsText: "wythnos",
    category: "time"
  },

  // 41-50: 食物和饮料
  {
    id: 41,
    english: "food",
    chinese: "食物",
    welsh: "bwyd",
    pronunciation: "boo-eed",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'布伊德'，注意'wy'发音",
    extensions: {
      synonyms: ["meal", "cuisine"],
      antonyms: [""],
      collocations: ["food and drink", "fast food"],
      sentence: "Mae'r bwyd yn flasus. (食物很美味。)",
      sentenceTts: "Mae'r bwyd yn flasus."
    },
    ttsText: "bwyd",
    category: "food"
  },
  {
    id: 42,
    english: "drink",
    chinese: "饮料",
    welsh: "diod",
    pronunciation: "DEE-od",
    prefix: "",
    suffix: "-od (液体后缀)",
    memoryHint: "发音像'迪奥德'",
    extensions: {
      synonyms: ["beverage"],
      antonyms: [""],
      collocations: ["food and drink", "soft drink"],
      sentence: "Dw i eisiau diod. (我想要饮料。)",
      sentenceTts: "Dw i eisiau diod."
    },
    ttsText: "diod",
    category: "food"
  },
  {
    id: 43,
    english: "milk",
    chinese: "牛奶",
    welsh: "llefrith",
    pronunciation: "THLEV-rith",
    prefix: "",
    suffix: "-frith (白色后缀)",
    memoryHint: "发音像'斯莱夫里斯'，注意'll'发音",
    extensions: {
      synonyms: ["dairy"],
      antonyms: [""],
      collocations: ["milk and sugar", "fresh milk"],
      sentence: "Mae'r llefrith yn oer. (牛奶是冷的。)",
      sentenceTts: "Mae'r llefrith yn oer."
    },
    ttsText: "llefrith",
    category: "food"
  },
  {
    id: 44,
    english: "sugar",
    chinese: "糖",
    welsh: "siwgr",
    pronunciation: "SHOO-gur",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'舒格尔'，注意'si'发'sh'音",
    extensions: {
      synonyms: ["sweetener"],
      antonyms: [""],
      collocations: ["sugar and milk", "brown sugar"],
      sentence: "Dw i eisiau siwgr yn fy nghoffi. (我想要糖在我的咖啡里。)",
      sentenceTts: "Dw i eisiau siwgr yn fy nghoffi."
    },
    ttsText: "siwgr",
    category: "food"
  },
  {
    id: 45,
    english: "meat",
    chinese: "肉",
    welsh: "cig",
    pronunciation: "keeg",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'基格'",
    extensions: {
      synonyms: ["flesh"],
      antonyms: ["vegetable"],
      collocations: ["red meat", "meat and potatoes"],
      sentence: "Dw i'n hoffi cig oen. (我喜欢羊肉。)",
      sentenceTts: "Dw i'n hoffi cig oen."
    },
    ttsText: "cig",
    category: "food"
  },
  {
    id: 46,
    english: "fish",
    chinese: "鱼",
    welsh: "pysgod",
    pronunciation: "PUS-god",
    prefix: "",
    suffix: "-god (动物后缀)",
    memoryHint: "发音像'普斯戈德'",
    extensions: {
      synonyms: ["seafood"],
      antonyms: [""],
      collocations: ["fish and chips", "fresh fish"],
      sentence: "Mae'r pysgod yn ffres. (鱼是新鲜的。)",
      sentenceTts: "Mae'r pysgod yn ffres."
    },
    ttsText: "pysgod",
    category: "food"
  },
  {
    id: 47,
    english: "vegetable",
    chinese: "蔬菜",
    welsh: "llysieuyn",
    pronunciation: "thluh-SYAY-win",
    prefix: "",
    suffix: "-yn (名词后缀)",
    memoryHint: "发音像'斯鲁赛温'，注意'll'发音",
    extensions: {
      synonyms: ["greens"],
      antonyms: ["meat"],
      collocations: ["fresh vegetables", "vegetable soup"],
      sentence: "Dw i'n bwyta llysieuyn bob dydd. (我每天吃蔬菜。)",
      sentenceTts: "Dw i'n bwyta llysieuyn bob dydd."
    },
    ttsText: "llysieuyn",
    category: "food"
  },
  {
    id: 48,
    english: "fruit",
    chinese: "水果",
    welsh: "ffrwyth",
    pronunciation: "FROO-eeth",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'弗鲁伊斯'，注意'ff'发'f'音",
    extensions: {
      synonyms: ["produce"],
      antonyms: [""],
      collocations: ["fresh fruit", "fruit salad"],
      sentence: "Mae'r ffrwythau'n felys. (水果很甜。)",
      sentenceTts: "Mae'r ffrwythau'n felys."
    },
    ttsText: "ffrwyth",
    category: "food"
  },
  {
    id: 49,
    english: "egg",
    chinese: "鸡蛋",
    welsh: "wy",
    pronunciation: "oo-ee",
    prefix: "",
    suffix: "",
    memoryHint: "发音像'乌伊'，注意'w'发'oo'音",
    extensions: {
      synonyms: [""],
      antonyms: [""],
      collocations: ["boiled egg", "egg and bacon"],
      sentence: "Dw i eisiau wy wedi'i ferwi. (我想要煮鸡蛋。)",
      sentenceTts: "Dw i eisiau wy wedi'i ferwi."
    },
    ttsText: "wy",
    category: "food"
  },
  {
    id: 50,
    english: "cheese",
    chinese: "奶酪",
    welsh: "caws",
    pronunciation: "cows",
    prefix: "",
    suffix: "",
    memoryHint: "发音像英语'cows'（牛），奶酪来自牛",
    extensions: {
      synonyms: ["dairy"],
      antonyms: [""],
      collocations: ["cheese and crackers", "cheddar cheese"],
      sentence: "Mae'r caws yn flasus. (奶酪很美味。)",
      sentenceTts: "Mae'r caws yn flasus."
    },
    ttsText: "caws",
    category: "food"
  }
];