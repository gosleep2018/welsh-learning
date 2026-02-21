// 日常实用短语库 - 100个核心句子
// 涵盖日常生活各个场景

const commonPhrasesData = {
  categories: [
    {
      id: "greetings",
      name: {
        english: "Greetings & Basic Conversations",
        chinese: "问候与基本对话"
      },
      phrases: [
        {
          id: 1,
          english: "Hello!",
          chinese: "你好！",
          welsh: "Helo!",
          pronunciation: "HEH-lo!",
          ttsText: "Helo!"
        },
        {
          id: 2,
          english: "Good morning!",
          chinese: "早上好！",
          welsh: "Bore da!",
          pronunciation: "BOR-eh dah!",
          ttsText: "Bore da!"
        },
        {
          id: 3,
          english: "Good afternoon!",
          chinese: "下午好！",
          welsh: "Prynhawn da!",
          pronunciation: "PRUN-hown dah!",
          ttsText: "Prynhawn da!"
        },
        {
          id: 4,
          english: "Good evening!",
          chinese: "晚上好！",
          welsh: "Noswaith dda!",
          pronunciation: "NOS-waith thah!",
          ttsText: "Noswaith dda!"
        },
        {
          id: 5,
          english: "Good night!",
          chinese: "晚安！",
          welsh: "Nos da!",
          pronunciation: "nohs dah!",
          ttsText: "Nos da!"
        },
        {
          id: 6,
          english: "How are you?",
          chinese: "你好吗？",
          welsh: "Sut wyt ti?",
          pronunciation: "sit oo-it tee?",
          ttsText: "Sut wyt ti?"
        },
        {
          id: 7,
          english: "I'm fine, thank you.",
          chinese: "我很好，谢谢。",
          welsh: "Dw i'n iawn, diolch.",
          pronunciation: "doo een yown, DEE-olch.",
          ttsText: "Dw i'n iawn, diolch."
        },
        {
          id: 8,
          english: "And you?",
          chinese: "你呢？",
          welsh: "A ti?",
          pronunciation: "ah tee?",
          ttsText: "A ti?"
        },
        {
          id: 9,
          english: "What's your name?",
          chinese: "你叫什么名字？",
          welsh: "Beth ydy dy enw di?",
          pronunciation: "beth UH-dee dee EN-oo dee?",
          ttsText: "Beth ydy dy enw di?"
        },
        {
          id: 10,
          english: "My name is...",
          chinese: "我的名字是...",
          welsh: "Fy enw i ydy...",
          pronunciation: "vuh EN-oo ee UH-dee...",
          ttsText: "Fy enw i ydy"
        },
        {
          id: 11,
          english: "Nice to meet you.",
          chinese: "很高兴认识你。",
          welsh: "Braf cwrdd â chi.",
          pronunciation: "brahf koorth ah khee.",
          ttsText: "Braf cwrdd â chi."
        },
        {
          id: 12,
          english: "Where are you from?",
          chinese: "你来自哪里？",
          welsh: "O ble wyt ti'n dod?",
          pronunciation: "oh bleh oo-it teen dohd?",
          ttsText: "O ble wyt ti'n dod?"
        },
        {
          id: 13,
          english: "I'm from China.",
          chinese: "我来自中国。",
          welsh: "Dw i'n dod o Tsieina.",
          pronunciation: "doo een dohd oh chee-EYE-nah.",
          ttsText: "Dw i'n dod o Tsieina."
        },
        {
          id: 14,
          english: "How old are you?",
          chinese: "你多大了？",
          welsh: "Faint ydy dy oed di?",
          pronunciation: "vaint UH-dee dee oyd dee?",
          ttsText: "Faint ydy dy oed di?"
        },
        {
          id: 15,
          english: "I'm 30 years old.",
          chinese: "我30岁了。",
          welsh: "Dw i'n ddeg ar hugain oed.",
          pronunciation: "doo een theg ar HEE-gain oyd.",
          ttsText: "Dw i'n ddeg ar hugain oed."
        }
      ]
    },
    {
      id: "courtesy",
      name: {
        english: "Courtesy & Politeness",
        chinese: "礼貌用语"
      },
      phrases: [
        {
          id: 16,
          english: "Please.",
          chinese: "请。",
          welsh: "Os gwelwch yn dda.",
          pronunciation: "os GWELL-ooch un THAH.",
          ttsText: "Os gwelwch yn dda."
        },
        {
          id: 17,
          english: "Thank you.",
          chinese: "谢谢。",
          welsh: "Diolch.",
          pronunciation: "DEE-olch.",
          ttsText: "Diolch."
        },
        {
          id: 18,
          english: "Thank you very much.",
          chinese: "非常感谢。",
          welsh: "Diolch yn fawr.",
          pronunciation: "DEE-olch un vowr.",
          ttsText: "Diolch yn fawr."
        },
        {
          id: 19,
          english: "You're welcome.",
          chinese: "不客气。",
          welsh: "Croeso.",
          pronunciation: "KROY-so.",
          ttsText: "Croeso."
        },
        {
          id: 20,
          english: "Excuse me.",
          chinese: "打扰一下。",
          welsh: "Esgusodwch fi.",
          pronunciation: "es-GUS-od-ooch vee.",
          ttsText: "Esgusodwch fi."
        },
        {
          id: 21,
          english: "I'm sorry.",
          chinese: "对不起。",
          welsh: "Mae'n ddrwg gen i.",
          pronunciation: "mine THROOG gen ee.",
          ttsText: "Mae'n ddrwg gen i."
        },
        {
          id: 22,
          english: "That's okay.",
          chinese: "没关系。",
          welsh: "Mae'n iawn.",
          pronunciation: "mine yown.",
          ttsText: "Mae'n iawn."
        },
        {
          id: 23,
          english: "No problem.",
          chinese: "没问题。",
          welsh: "Dim problem.",
          pronunciation: "dim PROH-blem.",
          ttsText: "Dim problem."
        },
        {
          id: 24,
          english: "Pardon?",
          chinese: "请再说一遍？",
          welsh: "Beth?",
          pronunciation: "beth?",
          ttsText: "Beth?"
        },
        {
          id: 25,
          english: "Could you repeat that?",
          chinese: "你能重复一遍吗？",
          welsh: "Allwch chi ailadrodd hynny?",
          pronunciation: "AL-ooch khee eye-LAD-roth HUN-ee?",
          ttsText: "Allwch chi ailadrodd hynny?"
        },
        {
          id: 26,
          english: "Speak slowly, please.",
          chinese: "请说慢一点。",
          welsh: "Siaradwch yn araf, os gwelwch yn dda.",
          pronunciation: "SHAR-ad-ooch un AR-av, os GWELL-ooch un THAH.",
          ttsText: "Siaradwch yn araf, os gwelwch yn dda."
        },
        {
          id: 27,
          english: "I don't understand.",
          chinese: "我不明白。",
          welsh: "Dw i ddim yn deall.",
          pronunciation: "doo ee thim un THEE-all.",
          ttsText: "Dw i ddim yn deall."
        },
        {
          id: 28,
          english: "I understand.",
          chinese: "我明白了。",
          welsh: "Dw i'n deall.",
          pronunciation: "doo een THEE-all.",
          ttsText: "Dw i'n deall."
        },
        {
          id: 29,
          english: "Do you speak English?",
          chinese: "你会说英语吗？",
          welsh: "Ydych chi'n siarad Saesneg?",
          pronunciation: "UH-dich kheen SHAR-ad SIGH-sneg?",
          ttsText: "Ydych chi'n siarad Saesneg?"
        },
        {
          id: 30,
          english: "I speak a little Welsh.",
          chinese: "我会说一点威尔士语。",
          welsh: "Dw i'n siarad ychydig o Gymraeg.",
          pronunciation: "doo een SHAR-ad uh-CHUH-dig oh gum-RYE-g.",
          ttsText: "Dw i'n siarad ychydig o Gymraeg."
        }
      ]
    },
    {
      id: "directions",
      name: {
        english: "Directions & Locations",
        chinese: "方向与位置"
      },
      phrases: [
        {
          id: 31,
          english: "Where is...?",
          chinese: "...在哪里？",
          welsh: "Lle mae...?",
          pronunciation: "thleh mine...?",
          ttsText: "Lle mae"
        },
        {
          id: 32,
          english: "Where is the toilet?",
          chinese: "洗手间在哪里？",
          welsh: "Lle mae'r tŷ bach?",
          pronunciation: "thleh mine ur tee bahch?",
          ttsText: "Lle mae'r tŷ bach?"
        },
        {
          id: 33,
          english: "Where is the station?",
          chinese: "车站在哪里？",
          welsh: "Lle mae'r orsaf?",
          pronunciation: "thleh mine ur OR-sav?",
          ttsText: "Lle mae'r orsaf?"
        },
        {
          id: 34,
          english: "How do I get to...?",
          chinese: "我怎么去...？",
          welsh: "Sut alla i fynd i...?",
          pronunciation: "sit AL-ah ee vund ee...?",
          ttsText: "Sut alla i fynd i"
        },
        {
          id: 35,
          english: "Go straight ahead.",
          chinese: "直走。",
          welsh: "Ewch yn syth ymlaen.",
          pronunciation: "AY-ooch un sith um-LINE.",
          ttsText: "Ewch yn syth ymlaen."
        },
        {
          id: 36,
          english: "Turn left.",
          chinese: "左转。",
          welsh: "Trowch i'r chwith.",
          pronunciation: "TRO-ooch eer chwith.",
          ttsText: "Trowch i'r chwith."
        },
        {
          id: 37,
          english: "Turn right.",
          chinese: "右转。",
          welsh: "Trowch i'r dde.",
          pronunciation: "TRO-ooch eer theh.",
          ttsText: "Trowch i'r dde."
        },
        {
          id: 38,
          english: "It's on the left.",
          chinese: "在左边。",
          welsh: "Mae ar y chwith.",
          pronunciation: "mine ar uh chwith.",
          ttsText: "Mae ar y chwith."
        },
        {
          id: 39,
          english: "It's on the right.",
          chinese: "在右边。",
          welsh: "Mae ar y dde.",
          pronunciation: "mine ar uh theh.",
          ttsText: "Mae ar y dde."
        },
        {
          id: 40,
          english: "It's opposite.",
          chinese: "在对面。",
          welsh: "Mae gyferbyn.",
          pronunciation: "mine guh-VER-bin.",
          ttsText: "Mae gyferbyn."
        },
        {
          id: 41,
          english: "It's near here.",
          chinese: "在这附近。",
          welsh: "Mae'n agos i fan hyn.",
          pronunciation: "mine AG-os ee van hin.",
          ttsText: "Mae'n agos i fan hyn."
        },
        {
          id: 42,
          english: "It's far from here.",
          chinese: "离这里很远。",
          welsh: "Mae'n bell o fan hyn.",
          pronunciation: "mine bell oh van hin.",
          ttsText: "Mae'n bell o fan hyn."
        },
        {
          id: 43,
          english: "How far is it?",
          chinese: "有多远？",
          welsh: "Pa mor bell ydy e?",
          pronunciation: "pah mor bell UH-dee eh?",
          ttsText: "Pa mor bell ydy e?"
        },
        {
          id: 44,
          english: "Is it far?",
          chinese: "远吗？",
          welsh: "Ydy e'n bell?",
          pronunciation: "UH-dee en bell?",
          ttsText: "Ydy e'n bell?"
        },
        {
          id: 45,
          english: "Is it near?",
          chinese: "近吗？",
          welsh: "Ydy e'n agos?",
          pronunciation: "UH-dee en AG-os?",
          ttsText: "Ydy e'n agos?"
        }
      ]
    },
    {
      id: "shopping",
      name: {
        english: "Shopping & Money",
        chinese: "购物与金钱"
      },
      phrases: [
        {
          id: 46,
          english: "How much is this?",
          chinese: "这个多少钱？",
          welsh: "Faint ydy hwn?",
          pronunciation: "vaint UH-dee hoon?",
          ttsText: "Faint ydy hwn?"
        },
        {
          id: 47,
          english: "How much does it cost?",
          chinese: "这个多少钱？",
          welsh: "Faint mae'n costio?",
          pronunciation: "vaint mine KOS-tee-oh?",
          ttsText: "Faint mae'n costio?"
        },
        {
          id: 48,
          english: "That's too expensive.",
          chinese: "太贵了。",
          welsh: "Mae hwnna'n rhy ddrud.",
          pronunciation: "mine HOON-nahn ruh thrid.",
          ttsText: "Mae hwnna'n rhy ddrud."
        },
        {
          id: 49,
          english: "Do you have something cheaper?",
          chinese: "有便宜点的吗？",
          welsh: "Oes gennych chi rywbeth rhatach?",
          pronunciation: "oys GEN-nich khee ROOB-eth RHAH-tach?",
          ttsText: "Oes gennych chi rywbeth rhatach?"
        },
        {
          id: 50,
          english: "I'll take it.",
          chinese: "我要这个。",
          welsh: "Bydda i'n ei gymryd.",
          pronunciation: "BUH-thah een eye GUM-rid.",
          ttsText: "Bydda i'n ei gymryd."
        },
        {
          id: 51,
          english: "Just looking, thanks.",
          chinese: "只是看看，谢谢。",
          welsh: "Edrych yn unig, diolch.",
          pronunciation: "ED-rich un EE-nig, DEE-olch.",
          ttsText: "Edrych yn unig, diolch."
        },
        {
          id: 52,
          english: "Do you accept credit cards?",
          chinese: "接受信用卡吗？",
          welsh: "Ydych chi'n derbyn cardiau credyd?",
          pronunciation: "UH-dich kheen DER-bin KARD-yee-uh KRED-id?",
          ttsText: "Ydych chi'n derbyn cardiau credyd?"
        },
        {
          id: 53,
          english: "Cash only.",
          chinese: "只收现金。",
          welsh: "Arian parod yn unig.",
          pronunciation: "AR-yan PAR-od un EE-nig.",
          ttsText: "Arian parod yn unig."
        },
        {
          id: 54,
          english: "Can I have a receipt?",
          chinese: "可以给我收据吗？",
          welsh: "Ga i dderbynneb?",
          pronunciation: "gah ee ther-BUN-eb?",
          ttsText: "Ga i dderbynneb?"
        },
        {
          id: 55,
          english: "Where can I pay?",
          chinese: "在哪里付款？",
          welsh: "Lle galla i dalu?",
          pronunciation: "thleh GAL-ah ee DAL-ee?",
          ttsText: "Lle galla i dalu?"
        },
        {
          id: 56,
          english: "I'd like to return this.",
          chinese: "我想退货。",
          welsh: "Hoffwn i ddychwelyd hwn.",
          pronunciation: "HOF-oon ee thuh-CHWEL-id hoon.",
          ttsText: "Hoffwn i ddychwelyd hwn."
        },
        {
          id: 57,
          english: "It's broken.",
          chinese: "这个坏了。",
          welsh: "Mae wedi torri.",
          pronunciation: "mine WED-ee TOR-ree.",
          ttsText: "Mae wedi torri."
        },
        {
          id: 58,
          english: "Do you have it in another color?",
          chinese: "有其他颜色吗？",
          welsh: "Oes gennych chi ef mewn lliw arall?",
          pronunciation: "oys GEN-nich khee ef mewn thloo AR-all?",
          ttsText: "Oes gennych chi ef mewn lliw arall?"
        },
        {
          id: 59,
          english: "What size is this?",
          chinese: "这是什么尺码？",
          welsh: "Pa faint ydy hwn?",
          pronunciation: "pah vaint UH-dee hoon?",
          ttsText: "Pa faint ydy hwn?"
        },
        {
          id: 60,
          english: "Small/Medium/Large, please.",
          chinese: "请给我小/中/大号。",
          welsh: "Bach/Canolig/Mawr, os gwelwch yn dda.",
          pronunciation: "bach/kan-OL-ig/mowr, os GWELL-ooch un THAH.",
          ttsText: "Bach, Canolig, Mawr, os gwelwch yn dda."
        }
      ]
    },
    {
      id: "food",
      name: {
        english: "Food & Restaurants",
        chinese: "食物与餐厅"
      },
      phrases: [
        {
          id: 61,
          english: "I'm hungry.",
          chinese: "我饿了。",
          welsh: "Mae arna i eisiau bwyd.",
          pronunciation: "mine AR-nah ee EYE-shy boo-eed.",
          ttsText: "Mae arna i eisiau bwyd."
        },
        {
          id: 62,
          english: "I'm thirsty.",
          chinese: "我渴了。",
          welsh: "Mae arna i syched.",
          pronunciation: "mine AR-nah ee SUH-ched.",
          ttsText: "Mae arna i syched."
        },
        {
          id: 63,
          english: "A table for two, please.",
          chinese: "请给我两人桌。",
          welsh: "Bwrdd i ddau, os gwelwch yn dda.",
          pronunciation: "boorth ee thye, os GWELL-ooch un THAH.",
          ttsText: "Bwrdd i ddau, os gwelwch yn dda."
        },
        {
          id: 64,
          english: "The menu, please.",
          chinese: "请给我菜单。",
          welsh: "Y fwydlen, os gwelwch yn dda.",
          pronunciation: "uh VOOD-len, os GWELL-ooch un THAH.",
          ttsText: "Y fwydlen, os gwelwch yn dda."
        },
        {
          id: 65,
          english: "What do you recommend?",
          chinese: "你推荐什么？",
          welsh: "Beth ydych chi'n ei argymell?",
          pronunciation: "beth UH-dich kheen eye ar-GUH-mell?",
          ttsText: "Beth ydych chi'n ei argymell?"
        },
        {
          id: 66,
          english: "I'll have the same.",
          chinese: "我要一样的。",
          welsh: "Bydda i'n cael yr un peth.",
          pronunciation: "BUH-thah een kile ur een peth.",
          ttsText: "Bydda i'n cael yr un peth."
        },
        {
          id: 67,
          english: "Water, please.",
          chinese: "请给我水。",
          welsh: "Dŵr, os gwelwch yn dda.",
          pronunciation: "door, os GWELL-ooch un THAH.",
          ttsText: "Dŵr, os gwelwch yn dda."
        },
        {
          id: 68,
          english: "Coffee, please.",
          chinese: "请给我咖啡。",
          welsh: "Coffi, os gwelwch yn dda.",
          pronunciation: "KOF-ee, os GWELL-ooch un THAH.",
          ttsText: "Coffi, os gwelwch yn dda."
        },
        {
          id: 69,
          english: "Tea with milk, please.",
          chinese: "请给我加牛奶的茶。",
          welsh: "Te gyda llefrith, os gwelwch yn dda.",
          pronunciation: "tay GUH-dah THLEV-rith, os GWELL-ooch un THAH.",
          ttsText: "Te gyda llefrith, os gwelwch yn dda."
        },
        {
          id: 70,
          english: "The bill, please.",
          chinese: "请给我账单。",
          welsh: "Y bil, os gwelwch yn dda.",
          pronunciation: "uh beel, os GWELL-ooch un THAH.",
          ttsText: "Y bil, os gwelwch yn dda."
        },
        {
          id: 71,
          english: "Is service included?",
          chinese: "服务费包含了吗？",
          welsh: "Ydy gwasanaeth wedi'i gynnwys?",
          pronunciation: "UH-dee gwah-SAN-aye-th WED-ee ee GUN-noo-is?",
          ttsText: "Ydy gwasanaeth wedi'i gynnwys?"
        },
        {
          id: 72,
          english: "Keep the change.",
          chinese: "不用找零了。",
          welsh: "Cadwch y newid.",
          pronunciation: "KAD-ooch uh NAY-wid.",
          ttsText: "Cadwch y newid."
        },
        {
          id: 73,
          english: "It's delicious.",
          chinese: "很好吃。",
          welsh: "Mae'n flasus.",
          pronunciation: "mine FLAH-sis.",
          ttsText: "Mae'n flasus."
        },
        {
          id: 74,
          english: "It's too salty.",
          chinese: "太咸了。",
          welsh: "Mae'n rhy halen.",
          pronunciation: "mine ruh HAL-en.",
          ttsText: "Mae'n rhy halen."
        },
        {
          id: 75,
          english: "It's too sweet.",
          chinese: "太甜了。",
          welsh: "Mae'n rhy felys.",
          pronunciation: "mine ruh VEL-is.",
          ttsText: "Mae'n rhy felys."
        }
      ]
    },
    {
      id: "transport",
      name: {
        english: "Transportation",
        chinese: "交通"
      },
      phrases: [
        {
          id: 76,
          english: "A ticket to Cardiff, please.",
          chinese: "请给我一张去卡迪夫的车票。",
          welsh: "Tocyn i Gaerdydd, os gwelwch yn dda.",
          pronunciation: "TOK-in ee GIRE-dith, os GWELL-ooch un THAH.",
          ttsText: "Tocyn i Gaerdydd, os gwelwch yn dda."
        },
        {
          id: 77,
          english: "One way or return?",
          chinese: "单程还是往返？",
          welsh: "Un ffordd neu ddychwelyd?",
          pronunciation: "een forth nay thuh-CHWEL-id?",
          ttsText: "Un ffordd neu ddychwelyd?"
        },
        {
          id: 78,
          english: "Return, please.",
          chinese: "请给我往返票。",
          welsh: "Dychwelyd, os gwelwch yn dda.",
          pronunciation: "thuh-CHWEL-id, os GWELL-ooch un THAH.",
          ttsText: "Dychwelyd, os gwelwch yn dda."
        },
        {
          id: 79,
          english: "What time does the bus leave?",
          chinese: "公交车什么时候出发？",
          welsh: "Pryd mae'r bws yn gadael?",
          pronunciation: "prid mine ur boos un GAD-ile?",
          ttsText: "Pryd mae'r bws yn gadael?"
        },
        {
          id: 80,
          english: "What time does the train arrive?",
          chinese: "火车什么时候到达？",
          welsh: "Pryd mae'r trên yn cyrraedd?",
          pronunciation: "prid mine ur train un kuh-RYE-th?",
          ttsText: "Pryd mae'r trên yn cyrraedd?"
        },
        {
          id: 81,
          english: "Which platform?",
          chinese: "哪个站台？",
          welsh: "Pa blatfform?",
          pronunciation: "pah PLAT-form?",
          ttsText: "Pa blatfform?"
        },
        {
          id: 82,
          english: "Is this seat taken?",
          chinese: "这个座位有人吗？",
          welsh: "Ydy'r sedd hon yn cael ei defnyddio?",
          pronunciation: "UH-dee ur seth hon un kile eye dev-NUTH-ee-oh?",
          ttsText: "Ydy'r sedd hon yn cael ei defnyddio?"
        },
        {
          id: 83,
          english: "Excuse me, I need to get off.",
          chinese: "打扰一下，我要下车。",
          welsh: "Esgusodwch fi, mae angen i mi fynd oddi ar y bws.",
          pronunciation: "es-GUS-od-ooch vee, mine ANG-en ee mee vund OTH-ee ar uh boos.",
          ttsText: "Esgusodwch fi, mae angen i mi fynd oddi ar y bws."
        },
        {
          id: 84,
          english: "Where is the taxi stand?",
          chinese: "出租车站在哪里？",
          welsh: "Lle mae'r orsaf tacsi?",
          pronunciation: "thleh mine ur OR-sav TAK-see?",
          ttsText: "Lle mae'r orsaf tacsi?"
        },
        {
          id: 85,
          english: "To the airport, please.",
          chinese: "请去机场。",
          welsh: "I'r maes awyr, os gwelwch yn dda.",
          pronunciation: "eer mice OW-ir, os GWELL-ooch un THAH.",
          ttsText: "I'r maes awyr, os gwelwch yn dda."
        }
      ]
    },
    {
      id: "emergency",
      name: {
        english: "Emergency & Health",
        chinese: "紧急情况与健康"
      },
      phrases: [
        {
          id: 86,
          english: "Help!",
          chinese: "救命！",
          welsh: "Help!",
          pronunciation: "help!",
          ttsText: "Help!"
        },
        {
          id: 87,
          english: "Call an ambulance!",
          chinese: "叫救护车！",
          welsh: "Ffonio ambiwlans!",
          pronunciation: "FON-ee-oh am-BEE-oo-lans!",
          ttsText: "Ffonio ambiwlans!"
        },
        {
          id: 88,
          english: "Call the police!",
          chinese: "叫警察！",
          welsh: "Ffonio'r heddlu!",
          pronunciation: "FON-ee-oh ur HETH-lee!",
          ttsText: "Ffonio'r heddlu!"
        },
        {
          id: 89,
          english: "I need a doctor.",
          chinese: "我需要医生。",
          welsh: "Mae angen doctor arna i.",
          pronunciation: "mine ANG-en DOK-tor AR-nah ee.",
          ttsText: "Mae angen doctor arna i."
        },
        {
          id: 90,
          english: "Where is the hospital?",
          chinese: "医院在哪里？",
          welsh: "Lle mae'r ysbyty?",
          pronunciation: "thleh mine ur us-BUH-tee?",
          ttsText: "Lle mae'r ysbyty?"
        },
        {
          id: 91,
          english: "Where is the pharmacy?",
          chinese: "药店在哪里？",
          welsh: "Lle mae'r fferyllfa?",
          pronunciation: "thleh mine ur fer-UL-fah?",
          ttsText: "Lle mae'r fferyllfa?"
        },
        {
          id: 92,
          english: "I don't feel well.",
          chinese: "我感觉不舒服。",
          welsh: "Dw i ddim yn teimlo'n dda.",
          pronunciation: "doo ee thim un TIME-lon thah.",
          ttsText: "Dw i ddim yn teimlo'n dda."
        },
        {
          id: 93,
          english: "I have a headache.",
          chinese: "我头痛。",
          welsh: "Mae gen i ben tost.",
          pronunciation: "mine gen ee ben tost.",
          ttsText: "Mae gen i ben tost."
        },
        {
          id: 94,
          english: "I have a stomach ache.",
          chinese: "我胃痛。",
          welsh: "Mae gen i dostrwydd yn fy mol.",
          pronunciation: "mine gen ee DOS-troo-ith un vuh mol.",
          ttsText: "Mae gen i dostrwydd yn fy mol."
        },
        {
          id: 95,
          english: "I'm allergic to...",
          chinese: "我对...过敏。",
          welsh: "Mae gen i alergedd i...",
          pronunciation: "mine gen ee al-ER-gedd ee...",
          ttsText: "Mae gen i alergedd i"
        },
        {
          id: 96,
          english: "I'm lost.",
          chinese: "我迷路了。",
          welsh: "Dw i wedi colli.",
          pronunciation: "doo ee WED-ee KOL-lee.",
          ttsText: "Dw i wedi colli."
        },
        {
          id: 97,
          english: "My wallet was stolen.",
          chinese: "我的钱包被偷了。",
          welsh: "Cafodd fy ngwaled ei ddwyn.",
          pronunciation: "KAV-oth vuh NGWAH-led eye thooin.",
          ttsText: "Cafodd fy ngwaled ei ddwyn."
        },
        {
          id: 98,
          english: "Fire!",
          chinese: "着火了！",
          welsh: "Tân!",
          pronunciation: "tahn!",
          ttsText: "Tân!"
        },
        {
          id: 99,
          english: "Be careful!",
          chinese: "小心！",
          welsh: "Byddwch yn ofalus!",
          pronunciation: "BUH-thooch un oh-VAL-is!",
          ttsText: "Byddwch yn ofalus!"
        },
        {
          id: 100,
          english: "It's dangerous.",
          chinese: "很危险。",
          welsh: "Mae'n beryglus.",
          pronunciation: "mine ber-UG-lis.",
          ttsText: "Mae'n beryglus."
        }
      ]
    }
  ]
};

// 导出供前端使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = commonPhrasesData;
}