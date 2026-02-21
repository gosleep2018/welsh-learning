#!/usr/bin/env node

/**
 * 威尔士学习数据生成脚本
 * 生成学习用的词汇数据
 */

const fs = require('fs');
const path = require('path');

// 项目根目录
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

// 威尔士语词汇数据
const welshWords = [
  // 问候与寒暄
  {
    english: "hello",
    welsh: "helo",
    pronunciation: "HEH-lo",
    prefix: "",
    suffix: "-o (常见结尾)",
    memoryHint: "和英语 hello 几乎一样，只是发音更短促",
    extensions: {
      synonyms: ["hi", "greetings"],
      antonyms: ["goodbye"],
      collocations: ["say hello", "hello there"],
      sentence: "Helo, sut wyt ti? (Hello, how are you?)"
    },
    ttsText: "helo",
    category: "greetings",
    difficulty: "beginner"
  },
  {
    english: "good morning",
    welsh: "bore da",
    pronunciation: "BOR-eh dah",
    prefix: "bore (早晨)",
    suffix: "da (好)",
    memoryHint: "bore 发音像 'bore'（无聊），但早上不无聊，是'好早晨'",
    extensions: {
      synonyms: ["morning"],
      antonyms: ["good night"],
      collocations: ["bore da i chi (早上好，对您)"],
      sentence: "Bore da! Sut wyt ti heddiw? (早上好！你今天怎么样？)"
    },
    ttsText: "bore da",
    category: "greetings",
    difficulty: "beginner"
  },
  {
    english: "good night",
    welsh: "nos da",
    pronunciation: "nohs dah",
    prefix: "nos (夜晚)",
    suffix: "da (好)",
    memoryHint: "nos 发音像 'nose'（鼻子），晚上睡觉鼻子要呼吸",
    extensions: {
      synonyms: ["good evening"],
      antonyms: ["good morning"],
      collocations: ["nos da, cysga'n dda (晚安，睡得好)"],
      sentence: "Nos da, pawb! (大家晚安！)"
    },
    ttsText: "nos da",
    category: "greetings",
    difficulty: "beginner"
  },
  {
    english: "thank you",
    welsh: "diolch",
    pronunciation: "DEE-olch",
    prefix: "di- (强调前缀)",
    suffix: "-olch (感谢后缀)",
    memoryHint: "联想：DEEp OLCH → 深深的感谢",
    extensions: {
      synonyms: ["thanks", "gratitude"],
      antonyms: ["ingratitude"],
      collocations: ["diolch yn fawr (非常感谢)", "diolch o galon (衷心感谢)"],
      sentence: "Diolch am eich help. (谢谢你的帮助。)"
    },
    ttsText: "diolch",
    category: "courtesy",
    difficulty: "beginner"
  },
  {
    english: "please",
    welsh: "os gwelwch yn dda",
    pronunciation: "os GWELL-ooch un THAH",
    prefix: "os (如果)",
    suffix: "da (好)",
    memoryHint: "字面意思：'如果你觉得好'，比较正式的说法",
    extensions: {
      synonyms: ["if you please"],
      antonyms: ["demand"],
      collocations: ["os gwelwch yn dda (请)", "plîs (非正式，来自英语please)"],
      sentence: "Coffi, os gwelwch yn dda. (请给我咖啡。)"
    },
    ttsText: "os gwelwch yn dda",
    category: "courtesy",
    difficulty: "intermediate"
  },
  
  // 基础词汇
  {
    english: "water",
    welsh: "dŵr",
    pronunciation: "door",
    prefix: "",
    suffix: "ŵr (液体后缀)",
    memoryHint: "发音像英语 door，想象水从门里流出来",
    extensions: {
      synonyms: ["liquid", "aqua"],
      antonyms: ["fire"],
      collocations: ["tap water (自来水)", "mineral water (矿泉水)"],
      sentence: "Mae'r dŵr yn oer. (水是冷的。)"
    },
    ttsText: "dŵr",
    category: "basics",
    difficulty: "beginner"
  },
  {
    english: "bread",
    welsh: "bara",
    pronunciation: "BAH-rah",
    prefix: "",
    suffix: "-a (名词后缀)",
    memoryHint: "发音像 'bar'（酒吧）+ 'ah'，想象在酒吧吃面包",
    extensions: {
      synonyms: ["loaf"],
      antonyms: [""],
      collocations: ["bara brith (威尔士水果面包)", "bara lawr (海藻面包)"],
      sentence: "Dw i eisiau bara. (我想要面包。)"
    },
    ttsText: "bara",
    category: "food",
    difficulty: "beginner"
  },
  {
    english: "house",
    welsh: "tŷ",
    pronunciation: "tee",
    prefix: "",
    suffix: "ŷ (名词后缀)",
    memoryHint: "发音像英语 tea，想象在房子里喝茶",
    extensions: {
      synonyms: ["home", "dwelling"],
      antonyms: ["outside"],
      collocations: ["big house (大房子)", "house number (门牌号)"],
      sentence: "Mae'r tŷ yn fawr. (房子很大。)"
    },
    ttsText: "tŷ",
    category: "basics",
    difficulty: "beginner"
  },
  {
    english: "good",
    welsh: "da",
    pronunciation: "dah",
    prefix: "",
    suffix: "-a (形容词后缀)",
    memoryHint: "发音像中文'大'，想象'大的就是好的'",
    extensions: {
      synonyms: ["fine", "excellent"],
      antonyms: ["bad"],
      collocations: ["very good (非常好)", "good morning (早上好)"],
      sentence: "Mae'n dda iawn. (非常好。)"
    },
    ttsText: "da",
    category: "basics",
    difficulty: "beginner"
  },
  {
    english: "bad",
    welsh: "drwg",
    pronunciation: "droog",
    prefix: "",
    suffix: "-wg (形容词后缀)",
    memoryHint: "发音像 'drug'（药物），想象坏的药物",
    extensions: {
      synonyms: ["poor", "terrible"],
      antonyms: ["good"],
      collocations: ["very bad (非常坏)", "bad weather (坏天气)"],
      sentence: "Mae'n ddrwg iawn. (非常坏。)"
    },
    ttsText: "drwg",
    category: "basics",
    difficulty: "beginner"
  },
  
  // 数字
  {
    english: "one",
    welsh: "un",
    pronunciation: "een",
    prefix: "",
    suffix: "",
    memoryHint: "发音像英语 'een' 在 'teen' 中，想象十几岁的一岁",
    extensions: {
      synonyms: ["single"],
      antonyms: ["many"],
      collocations: ["un deg (十)", "un ar hugain (二十一)"],
      sentence: "Mae gen i un ci. (我有一只狗。)"
    },
    ttsText: "un",
    category: "numbers",
    difficulty: "beginner"
  },
  {
    english: "two",
    welsh: "dau (阳性) / dwy (阴性)",
    pronunciation: "die / doo-ee",
    prefix: "",
    suffix: "",
    memoryHint: "dau 发音像 'die'（死），但两个人不会死",
    extensions: {
      synonyms: ["pair", "couple"],
      antonyms: ["one"],
      collocations: ["dau berson (两个人)", "dwy ferch (两个女孩)"],
      sentence: "Mae dau gi gen i. (我有两只狗。)"
    },
    ttsText: "dau",
    category: "numbers",
    difficulty: "beginner"
  },
  {
    english: "three",
    welsh: "tri (阳性) / tair (阴性)",
    pronunciation: "tree / tire",
    prefix: "",
    suffix: "",
    memoryHint: "tri 发音像 'tree'（树），想象三棵树",
    extensions: {
      synonyms: ["trio"],
      antonyms: ["two"],
      collocations: ["tri dyn (三个男人)", "tair merch (三个女孩)"],
      sentence: "Mae tri llyfr ar y bwrdd. (桌子上有三本书。)"
    },
    ttsText: "tri",
    category: "numbers",
    difficulty: "beginner"
  }
];

// 生成完整数据
function generateData() {
  console.log('🏴󠁧󠁢󠁷󠁬󠁳󠁿 生成威尔士学习数据...');
  
  // 确保数据目录存在
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  // 按类别分组
  const dataByCategory = {
    dailyWords: welshWords,
    categories: {
      greetings: welshWords.filter(w => w.category === 'greetings'),
      basics: welshWords.filter(w => w.category === 'basics'),
      food: welshWords.filter(w => w.category === 'food'),
      numbers: welshWords.filter(w => w.category === 'numbers'),
      courtesy: welshWords.filter(w => w.category === 'courtesy')
    },
    difficulty: {
      beginner: welshWords.filter(w => w.difficulty === 'beginner'),
      intermediate: welshWords.filter(w => w.difficulty === 'intermediate'),
      advanced: welshWords.filter(w => w.difficulty === 'advanced')
    },
    metadata: {
      totalWords: welshWords.length,
      categories: [...new Set(welshWords.map(w => w.category))],
      difficulties: [...new Set(welshWords.map(w => w.difficulty))],
      generatedAt: new Date().toISOString(),
      version: "1.0.0"
    }
  };
  
  // 写入JSON文件
  const dataFile = path.join(DATA_DIR, 'words.json');
  fs.writeFileSync(dataFile, JSON.stringify(dataByCategory, null, 2));
  
  console.log(`✅ 数据生成完成！`);
  console.log(`📊 统计:`);
  console.log(`  总词汇: ${welshWords.length}`);
  console.log(`  类别: ${dataByCategory.metadata.categories.join(', ')}`);
  console.log(`  难度: ${dataByCategory.metadata.difficulties.join(', ')}`);
  console.log(`  文件: ${dataFile}`);
  
  // 生成JavaScript数据文件（供前端使用）
  const jsDataFile = path.join(PUBLIC_DIR, 'js', 'data.js');
  const jsContent = `// 威尔士学习数据 - 自动生成
window.WELSH_DATA = ${JSON.stringify(dataByCategory, null, 2)};`;
  
  fs.writeFileSync(jsDataFile, jsContent);
  console.log(`📁 前端数据文件: ${jsDataFile}`);
  
  return dataByCategory;
}

// 生成学习计划
function generateLearningPlan() {
  console.log('\n📚 生成学习计划...');
  
  const plan = {
    week1: {
      title: "基础入门",
      goals: ["掌握50个高频词汇", "学习基本发音规则", "能进行简单问候"],
      words: welshWords.filter(w => w.difficulty === 'beginner').slice(0, 10),
      focus: ["greetings", "basics", "courtesy"]
    },
    week2: {
      title: "日常表达",
      goals: ["学习餐饮购物用语", "掌握数字和时间表达", "能进行基础对话"],
      words: welshWords.filter(w => w.category === 'food' || w.category === 'numbers'),
      focus: ["food", "numbers", "daily life"]
    },
    week3: {
      title: "深入交流",
      goals: ["学习出行问路表达", "掌握常用短语和句型", "能进行3分钟对话"],
      words: welshWords.filter(w => w.difficulty === 'intermediate'),
      focus: ["travel", "directions", "conversation"]
    },
    week4: {
      title: "文化融入",
      goals: ["了解威尔士文化", "学习文化艺术词汇", "能理解简单文化内容"],
      words: [],
      focus: ["culture", "arts", "history"]
    }
  };
  
  const planFile = path.join(DATA_DIR, 'learning-plan.json');
  fs.writeFileSync(planFile, JSON.stringify(plan, null, 2));
  
  console.log(`✅ 学习计划生成完成: ${planFile}`);
  return plan;
}

// 主函数
function main() {
  try {
    const data = generateData();
    const plan = generateLearningPlan();
    
    console.log('\n🎉 所有数据生成完成！');
    console.log('🚀 下一步:');
    console.log('  1. 运行本地测试: cd public && python3 -m http.server 8080');
    console.log('  2. 访问: http://localhost:8080');
    console.log('  3. 开始学习威尔士语！');
    
  } catch (error) {
    console.error('❌ 数据生成失败:', error.message);
    process.exit(1);
  }
}

// 执行
if (require.main === module) {
  main();
}

module.exports = { generateData, generateLearningPlan };