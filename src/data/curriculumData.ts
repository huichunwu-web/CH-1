import { Flashcard, QuizQuestion, SituationCase, StudentRecord } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: 'Sanit 縮寫與寓意',
    frontKeyword: 'S.A.N.I.T.',
    backDetail: [
      'Sanit 是 Sanitation（衛生、清潔）的縮寫。',
      '拆開拆解寓意：Safety Always Needs I Targeting。',
      '中文核心意涵：餐飲安全永遠是我的目標！'
    ],
    keyTakeaway: 'Safety Always Needs I Targeting → 餐飲安全永遠是我的目標',
    slideRef: '教材第 2 頁'
  },
  {
    id: 'fc-2',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: 'Sanit + y = sanity 的哲理',
    frontKeyword: 'Sanity (明智/正經八百)',
    backDetail: [
      'Sanit（衛生）加上 y 成為 Sanity（正經八百、明智）。',
      '這告訴我們做好衛生一定要非常認真睿智、正經八百地去執行。',
      '絕對不可敷衍了事，衛生是沒有妥協的空間。'
    ],
    keyTakeaway: '衛生沒有妥協空間，做好衛生必須正經八百、認真睿智。',
    slideRef: '教材第 3-4 頁'
  },
  {
    id: 'fc-3',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: 'Saint (超凡入聖) 的永續期許',
    frontKeyword: 'Saint (超凡入聖)',
    backDetail: [
      '餐飲業者若將餐飲安全做到最徹底，就可以昇華轉成「Saint（超凡入聖）」。',
      '嚴謹的食安是餐飲品牌永續經營最堅實、最好的基石。'
    ],
    keyTakeaway: '食安做徹底即能超凡入聖，奠定品牌永續經營基石。',
    slideRef: '教材第 3 頁'
  },
  {
    id: 'fc-4',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: 'Sanitation 與 Hygiene 的區別',
    frontKeyword: '物體設備 vs 個人操作',
    backDetail: [
      'Sanitation：比較偏重「物體及設備」的衛生與環境清潔。',
      'Hygiene：較傾向於「人員個人操作」之個人衛生習慣。',
      '中文用法：衛生 ＝ 清潔 ＋ 人員操作；而「清潔」則不包含人員操作。'
    ],
    keyTakeaway: 'Sanitation偏物體設備，Hygiene偏個人操作；衛生＝清潔＋人員操作。',
    slideRef: '教材第 5 頁'
  },
  {
    id: 'fc-5',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: 'WHO 食品安全定義與轉變',
    frontKeyword: 'Farm to Plate (從農場到餐盤)',
    backDetail: [
      'WHO 定義：確保所有食品盡可能安全的行動，涵蓋從農場到餐盤整個食品鏈。',
      '2000年決議：採認「食品安全是公共衛生一項重要功能」。',
      '2015年4月7日：WHO 年慶訂該日為「世界食品安全日」。',
      '用語改變：由 From Farm to Table（農場到餐桌）改為 From Farm to Plate（農場到餐盤）。'
    ],
    keyTakeaway: '從農場到餐盤 (Farm to Plate) 完整食物鏈控管；2000採認公衛功能。',
    slideRef: '教材第 6-8 頁'
  },
  {
    id: 'fc-6',
    category: 'core',
    categoryName: '核心概念',
    frontTitle: '食品安全名詞演進歷史',
    frontKeyword: '911事件與我國法規更名',
    backDetail: [
      '安全：沒有危險，不受損害，不受威脅。食品安全 (food safety)：食物不帶有危險性。',
      '歷史分水嶺：美國 911 恐怖事件發生前，全球多用「食品衛生」；911後世界各國紛紛改稱「食品安全 (food safety)」。',
      '我國法規：沿用 40 年的「食品衛生管理法」，於民國 104 年 (2015年) 2 月 4 日更名為「食品安全衛生管理法」。'
    ],
    keyTakeaway: '911後全球改稱食品安全；我國104年2月4日更名為食品安全衛生管理法。',
    slideRef: '教材第 9-11 頁'
  },
  {
    id: 'fc-7',
    category: 'defense',
    categoryName: '食品防護',
    frontTitle: '食品防護 (Food Protection) 架構',
    frontKeyword: 'FP = FS + FD + FQ',
    backDetail: [
      'Food Protection（FP 食品防護）為最高境界，包含三大支柱：',
      '1. 食品安全 (Food Safety, FS) - 透過 HACCP 預防偶然/意外污染。',
      '2. 食品防禦 (Food Defense, FD) - 防範蓄意/有意的污染攻擊。',
      '3. 食品品質 (Food Quality, FQ) - 維持優良食味與品質水準。'
    ],
    keyTakeaway: '食品防護 (FP) 涵蓋：食品安全 (FS) + 食品防禦 (FD) + 食品品質 (FQ)。',
    slideRef: '教材第 12, 14 頁'
  },
  {
    id: 'fc-8',
    category: 'defense',
    categoryName: '食品防護',
    frontTitle: '食品安全 vs 食品防禦本質差異',
    frontKeyword: '意外污染 vs 蓄意污染',
    backDetail: [
      '食品安全 (Food Safety)：偶然 / 意外污染 (UNintentional contamination)，可根據加工類型合理預測，採用 HACCP 預防。',
      '食品防禦 (Food Defense)：蓄意 / 有意造成的食安污染 (INTENTIONAL contamination)，很難事先預測（如蓄意投毒、恐怖威脅）。'
    ],
    keyTakeaway: '安全＝意外偶發污染(可預測)；防禦＝蓄意人為破壞(難預測)。',
    slideRef: '教材第 13 頁'
  },
  {
    id: 'fc-9',
    category: 'defense',
    categoryName: '食品防護',
    frontTitle: '現在食品最高水準標章：SQF',
    frontKeyword: 'SQF Certified',
    backDetail: [
      'SQF（Safe Quality Food）是當前國際公認食品最高水準的權威標章。',
      'SQF 驗證不僅驗證傳統的安全與品質，更直接針對整體 Food Protection（食品防護）進行全面嚴格驗證。'
    ],
    keyTakeaway: 'SQF 是目前針對 Food Protection 驗證的最高水準標章。',
    slideRef: '教材第 15 頁'
  },
  {
    id: 'fc-10',
    category: 'defense',
    categoryName: '食品防護',
    frontTitle: 'Food Protection 四大涵蓋範疇',
    frontKeyword: 'FP 四大核心面向',
    backDetail: [
      '1. 食品要足夠且來源要穩定（供應鏈安全）。',
      '2. 食品品質要好且營養衛生與安全。',
      '3. 食品要防範可能遭受的恐怖攻擊（防禦蓄意下毒）。',
      '4. 食品與社會、經濟、物理等層面要具備關聯性。'
    ],
    keyTakeaway: '來源穩定、品質營養、防範恐怖攻擊、連結社會經濟四大維度。',
    slideRef: '教材第 16 頁'
  },
  {
    id: 'fc-11',
    category: 'regulations',
    categoryName: '法規比較',
    frontTitle: 'GHP 準則 vs 公共飲食場所辦法（法源與屬性）',
    frontKeyword: '中央法第8條 vs 地方法第14條',
    backDetail: [
      '食品良好衛生規範準則 (GHP)：',
      '• 法源依據：食安法第 8 條',
      '• 法規屬性：中央法（全國一致適用）',
      '公共飲食場所衛生之管理辦法：',
      '• 法源依據：食安法第 14 條',
      '• 法規屬性：地方法（由各地方主管機關訂定）'
    ],
    keyTakeaway: 'GHP為中央法(第8條)；公共飲食場所辦法為地方法(第14條)。',
    slideRef: '教材第 19 頁'
  },
  {
    id: 'fc-12',
    category: 'regulations',
    categoryName: '法規比較',
    frontTitle: '兩大衛生法規處罰方式與罰則對比',
    frontKeyword: '間接罰 6萬-2億 vs 直接罰 3-300萬',
    backDetail: [
      '【GHP 準則】（食安法第8條）：',
      '• 處罰方式：間接罰（先令限期改正）',
      '• 罰則：屆期未改善者，處罰 6 萬元 ~ 2 億元！',
      '【公共飲食場所衛生管理辦法】（食安法第14條）：',
      '• 處罰方式：直接罰（立即處罰，不可限期改正）',
      '• 罰則：罰款 3 萬 ~ 300 萬元！'
    ],
    keyTakeaway: 'GHP是間接罰(未限改罰6萬-2億)；公共飲食場所是直接罰(立即罰3-300萬)。',
    slideRef: '教材第 19 頁'
  },
  {
    id: 'fc-13',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '即食食品處理與金錢接觸限制',
    frontKeyword: '嚴禁接觸金錢及污染源',
    backDetail: [
      'GHP 修正規定：調理即食食品時，人員手部不得「同時」或「接續」接觸金錢或其他有污染之虞之物品。',
      '目的：防止流通幣券上的大量金黃色葡萄球菌、大腸桿菌等微生物傳染至熟食即食品。'
    ],
    keyTakeaway: '處理即食食品絕不能同時或接續摸錢或碰污染物品！',
    slideRef: '教材第 20 頁'
  },
  {
    id: 'fc-14',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '菜餚溫控管理：室溫與熱藏規定',
    frontKeyword: '常溫不得逾 2 小時 / 熱藏 60℃ 以上',
    backDetail: [
      '室溫限制：餐飲業製備菜餚，室溫下「不得存放超過 2 小時以上」。',
      '冷藏原則：熟食及易腐敗菜餚應及時冷藏貯存。',
      '熱藏規定：熟食若採熱藏保存，溫度必須始終維持在「攝氏 60℃ 以上」，避免落入危險溫度帶。'
    ],
    keyTakeaway: '室溫限2小時以內；熱藏菜餚務必保持60℃以上！',
    slideRef: '教材第 20 頁'
  },
  {
    id: 'fc-15',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '從業人員體檢項目修訂原因',
    frontKeyword: '刪除結核病檢查',
    backDetail: [
      '公告修正 GHP 體檢規定中，正式「刪除結核病檢查」。',
      '科學理由：結核病係透過「空氣 / 飛沫」在呼吸道傳染，並「非屬透過食品污染傳播之疾病」。',
      '因此體檢修正為聚焦於傷寒、A型肝炎等經由消化道與食品傳染的疾病。'
    ],
    keyTakeaway: '結核病為空氣傳染非食品傳染疾病，因此GHP體檢刪除該項。',
    slideRef: '教材第 20 頁'
  },
  {
    id: 'fc-16',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '從業人員口罩配戴與教育訓練時數',
    frontKeyword: '作業必戴口罩 / 每年至少 3 小時訓練',
    backDetail: [
      '口罩要求：作業場所工作「新增應戴口罩」之硬性規定。',
      '新進人員：新進食品從業人員（含管理衛生人員）應接受「至少 3 小時」訓練。',
      '在職員工：從業期間每年至少接受「3 小時」教育訓練，可由業者自辦或委託專業機構。'
    ],
    keyTakeaway: '廚房工作一律戴口罩；新進至少3小時、每年至少3小時教育訓練。',
    slideRef: '教材第 20 頁'
  },
  {
    id: 'fc-17',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '食品添加物「三專」管理',
    frontKeyword: '專區、專人、專冊',
    backDetail: [
      '強化食品添加物販售與使用管理，增訂落實「三專」法規：',
      '1. 專區：設置專門隔離之添加物儲放區域與儲櫃，避免誤用。',
      '2. 專人：指派專責指定人員負責保管領用。',
      '3. 專冊：詳實建立進出貨記錄專冊與使用秤量日誌。'
    ],
    keyTakeaway: '食品添加物務必嚴格落實「專區、專人、專冊」三專管理！',
    slideRef: '教材第 21 頁'
  },
  {
    id: 'fc-18',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '外送平台與車輛物流衛生管制',
    frontKeyword: '外送平台業者納管 / 抽測車廂溫度',
    backDetail: [
      '物流外送：食品物流業增訂「外送平台業者」提供外送服務時，其外送員及外送過程應遵循衛生管理規定。',
      '倉儲運輸：抽測運輸車廂體內環境溫度；改變原設定倉儲運輸條件者，應有合理原因及佐證依據。'
    ],
    keyTakeaway: '外送平台全面納入GHP規範，並嚴密抽測車廂內部溫度。',
    slideRef: '教材第 21 頁'
  },
  {
    id: 'fc-19',
    category: 'ghp_practice',
    categoryName: 'GHP準則實務',
    frontTitle: '製程品質管制適用對象擴大',
    frontKeyword: '由製造業擴大為所有食品業者',
    backDetail: [
      '修正製程及品質管制、檢驗與量測管制、文件與紀錄保存等規定。',
      '過去主要要求食品製造工廠，新版 GHP 已將適用對象正式由「製造業」擴大為「所有食品業者」（包含餐飲、通路與外燴）。'
    ],
    keyTakeaway: '製程及品質管理規範適用對象由「製造業」擴大為「所有食品業者」。',
    slideRef: '教材第 21 頁'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '教材中將「Sanit」拆開來做為餐飲安全座右銘，其代表的英文字句為何？',
    options: [
      'Safe and nutrition in tasty food',
      'Safety always needs I targeting（餐飲安全永遠是我的目標）',
      'Standard action never ignores time',
      'Sanitation and nature is tomorrow'
    ],
    correctAnswer: 1,
    explanation: '依教材第2頁，「Sanit」拆開來看即代表「Safety always needs I targeting」，意指「餐飲安全永遠是我的目標」。',
    slideRef: '教材第 2 頁',
    category: '核心概念'
  },
  {
    id: 2,
    question: '關於英文「Sanitation」與「Hygiene」的意義偏向，下列敘述何者最正確？',
    options: [
      'Sanitation 偏重個人操作衛生，Hygiene 偏重環境設備',
      '兩者完全相同且在中文完全代表清潔，不含人員操作',
      'Sanitation 比較偏重物體及設備的衛生，Hygiene 較傾向個人操作的衛生',
      'Hygiene 偏重食品法規，Sanitation 偏重化學清洗劑'
    ],
    correctAnswer: 2,
    explanation: '依教材第5頁：Sanitation 比較偏重物體及設備的衛生；Hygiene 較傾向個人操作的衛生。中文用法上「衛生＝清潔＋人員操作」。',
    slideRef: '教材第 5 頁',
    category: '核心概念'
  },
  {
    id: 3,
    question: '世界衛生組織 (WHO) 在食品安全策略用字上，由過去的何種詞彙轉變為現今的用字？',
    options: [
      'From Factory to Consumer → From Ocean to Table',
      'From Farm to Table（從農場到餐桌）→ From Farm to Plate（從農場到餐盤）',
      'From Soil to Mouth → From Farm to Market',
      'From Kitchen to Customer → From Store to Family'
    ],
    correctAnswer: 1,
    explanation: '教材第8頁指出：WHO 對食品安全用字的改變為由「From Farm to Table（從農場到餐桌）」進化為「From Farm to Plate（從農場到餐盤）」。',
    slideRef: '教材第 8 頁',
    category: '核心概念'
  },
  {
    id: 4,
    question: '促使世界各國紛紛將「食品衛生」一詞改為「食品安全 (food safety)」的關鍵歷史事件為何？',
    options: [
      '第二次世界大戰結束',
      '1986年車諾比核災事件',
      '美國 911 恐怖攻擊事件',
      '2019年全球新冠肺炎疫情'
    ],
    correctAnswer: 2,
    explanation: '依教材第10頁：美國 911 恐怖事件發生前，全球幾乎都使用「食品衛生」，自 911 恐怖事件後，各國考量食品遭受蓄意威脅等安全面向，紛紛改為「食品安全 (food safety)」。',
    slideRef: '教材第 10 頁',
    category: '核心概念'
  },
  {
    id: 5,
    question: '我國沿用40年的「食品衛生管理法」，是在何時正式更名為「食品安全衛生管理法」？',
    options: [
      '民國 90 年 9 月 11 日',
      '民國 100 年 12 月 1 日',
      '民國 104 年 2 月 4 日',
      '民國 108 年 5 月 20 日'
    ],
    correctAnswer: 2,
    explanation: '依教材第11頁：我國沿用40年的「食品衛生管理法」，於民國 104 年 2 月 4 日正式更名為「食品安全衛生管理法」。',
    slideRef: '教材第 11 頁',
    category: '核心概念'
  },
  {
    id: 6,
    question: '「食品防護 (Food Protection)」架構中，主要包含哪三大核心面向？',
    options: [
      '食品安全 (FS) ＋ 食品防禦 (FD) ＋ 食品品質 (FQ)',
      '食品加工 (FP) ＋ 食品冷藏 (FC) ＋ 食品包裝 (FP)',
      '食品有機 (FO) ＋ 食品保鮮 (FP) ＋ 食品認證 (FA)',
      '食品檢驗 (FI) ＋ 食品溯源 (FT) ＋ 食品宣傳 (FP)'
    ],
    correctAnswer: 0,
    explanation: '依教材第12及14頁：Food Protection 食品防護涵蓋三大核心：食品防禦 (FD, Food Defense)、食品安全 (FS, Food Safety, HACCP) 與食品品質 (FQ, Food Quality)。',
    slideRef: '教材第 12, 14 頁',
    category: '食品防護'
  },
  {
    id: 7,
    question: '關於「食品防禦 (Food Defense)」與「食品安全 (Food Safety)」的比較，何者正確？',
    options: [
      '食品安全防範的是蓄意投毒行為，很難合理預測',
      '食品防禦是針對偶然、意外污染，並透過 HACCP 系統有效預防',
      '食品安全針對偶然/意外污染(UNintentional)，可根據加工合理預測；食品防禦針對有意/蓄意污染(INTENTIONAL)，很難預測',
      '兩者在定義與預防方法上完全相同，並無區別'
    ],
    correctAnswer: 2,
    explanation: '教材第13頁：食品安全針對偶然/意外污染 (UNintentional)，可由 HACCP 預防並合理預測；食品防禦針對有意/蓄意污染 (INTENTIONAL)，難以事前預測。',
    slideRef: '教材第 13 頁',
    category: '食品防護'
  },
  {
    id: 8,
    question: '目前國際上針對「Food Protection (食品防護)」進行驗證的最高水準標章為下列何者？',
    options: [
      'CAS 優良農產品標章',
      'SQF (Safe Quality Food) 認證標章',
      'GMP 食品良好作業規範標章',
      'ISO 9001 品質管理系統標章'
    ],
    correctAnswer: 1,
    explanation: '教材第15頁明載：「SQF」是現在食品最高水準的標章，就是專門針對 Food Protection 進行全方位驗證。',
    slideRef: '教材第 15 頁',
    category: '食品防護'
  },
  {
    id: 9,
    question: '在餐飲業者一般衛生管理兩條法規比較中，「食品良好衛生規範 (GHP) 準則」的罰則特性為何？',
    options: [
      '屬於地方法，直接處以 3~300 萬元罰鍰',
      '依據食安法第8條之中央法，採間接罰（限期改正），屆期未改者處 6 萬元~ 2 億元罰鍰',
      '依據食安法第14條，直接吊銷營業登記並處拘役',
      '不具強制拘束力，僅為宣導性輔導準則'
    ],
    correctAnswer: 1,
    explanation: '教材第19頁：食品良好衛生規範準則是中央法，法源為食安法第8條，採「間接罰（先限期改正）」，若屆期未改正者處罰 6萬元至2億元。',
    slideRef: '教材第 19 頁',
    category: '法規比較'
  },
  {
    id: 10,
    question: '若地方衛生局依據「公共飲食場所衛生之管理辦法」對業者進行稽查處罰，其裁罰方式為何？',
    options: [
      '中央法，必須先開立限期改善單才能開罰',
      '法源為食安法第14條之地方法，採「直接罰（立即罰，不可限期改正）」，處罰 3-300 萬元',
      '直接處以 6 萬至 2 億元罰款且不准申訴',
      '先進行 3 次口頭告誡後再移送司法機關'
    ],
    correctAnswer: 1,
    explanation: '教材第19頁：公共飲食場所衛生之管理辦法為地方法（食安法第14條），處罰方式為「直接罰（立即罰，不可限期改正）」，罰鍰為 3-300 萬元。',
    slideRef: '教材第 19 頁',
    category: '法規比較'
  },
  {
    id: 11,
    question: '依最新修正之 GHP 準則規定，餐飲業者製備菜餚於室溫下不得存放超過多久？熟食熱藏溫度應維持在幾度以上？',
    options: [
      '室溫不得超過 4 小時；熱藏維持在 50℃ 以上',
      '室溫不得超過 2 小時；熱藏維持在 60℃ 以上',
      '室溫不得超過 1 小時；熱藏維持在 75℃ 以上',
      '室溫不得超過 3 小時；熱藏維持在 65℃ 以上'
    ],
    correctAnswer: 1,
    explanation: '教材第20頁明確規定：室溫下不得存放 2 小時以上（熟食及易腐敗菜餚及時冷藏），且熟食熱藏溫度必須保持在攝氏 60℃ 以上。',
    slideRef: '教材第 20 頁',
    category: 'GHP準則實務'
  },
  {
    id: 12,
    question: '為什麼修正後的 GHP 食品從業人員體檢項目中，「刪除結核病檢查」？',
    options: [
      '因為結核病疫苗接種率已達百分之百',
      '因為檢查費用過高，減輕業者負擔',
      '因為結核病係透過空氣傳染，非屬透過食品污染傳播之疾病',
      '因為廚房高溫能完全消滅結核桿菌'
    ],
    correctAnswer: 2,
    explanation: '教材第20頁指出：體檢刪除結核病檢查，係因結核病為空氣呼吸傳染，非屬透過食品傳播媒介污染之疾病。',
    slideRef: '教材第 20 頁',
    category: 'GHP準則實務'
  },
  {
    id: 13,
    question: '依 GHP 準則從業人員管理規定，新進食品從業人員與從業期間在職員工，應接受多少時數之教育訓練？',
    options: [
      '新進人員 8 小時；在職員工每三年 6 小時',
      '新進人員 1 小時；在職員工每半年 1 小時',
      '新進從業人員至少 3 小時；從業期間每年至少 3 小時',
      '僅衛生管理主管需要受訓，一般廚工無強制時數'
    ],
    correctAnswer: 2,
    explanation: '教材第20頁規定：新進食品從業人員（含管理衛生人員）應接受至少 3 小時訓練；從業期間每年至少 3 小時教育訓練。',
    slideRef: '教材第 20 頁',
    category: 'GHP準則實務'
  },
  {
    id: 14,
    question: '餐飲廚房或食品業者對於「食品添加物」之管制，GHP 準則明定增訂何種嚴格管理制度？',
    options: [
      '隨取隨用開放式冷藏庫管理',
      '「專區、專人、專冊」之「三專」管理制度',
      '僅需保留原廠購買發票，不需專門分區儲放',
      '委託外部檢驗所每日派員秤量管理'
    ],
    correctAnswer: 1,
    explanation: '教材第21頁強調：強化食品添加物販售與管理，增訂應落實「專區、專人、專冊」（三專）管理。',
    slideRef: '教材第 21 頁',
    category: 'GHP準則實務'
  },
  {
    id: 15,
    question: '針對新興餐飲業態，修正後 GHP 準則在食品外送與製程管理上有何重大增修？',
    options: [
      '外送員免受食品安全規範，責任全歸消費者',
      '增訂「外送平台業者」及外送員衛生管理規定，且製程品管適用對象由「製造業」擴大為「所有食品業者」',
      '禁止任何餐飲業者透過外送平台運送高溫熟食',
      '製程管制僅適用資本額一億元以上之連鎖超市'
    ],
    correctAnswer: 1,
    explanation: '教材第21頁：物流業增訂「外送平台業者」及外送員規範、抽測車廂溫度；製程及品質管理適用對象由「製造業」擴大為「所有食品業者」。',
    slideRef: '教材第 21 頁',
    category: 'GHP準則實務'
  }
];

export const SITUATION_CASES: SituationCase[] = [
  {
    id: 'case-1',
    title: '情境一：外燴宴席熟食常溫擺放與熱藏控管',
    location: '學校體育館大型學術研討會外燴現場',
    context: '某大學舉辦校慶研討會，外燴業者上午 10:30 將炸雞腿、排骨、炒米粉等熱食便當送達體育館走廊。由於主辦單位演講行程延誤，直至下午 13:40 仍將便當堆放在未開冷氣的常溫走廊上（室溫約 31℃），並準備於 14:00 開始發放給 500 位師生食用。',
    problemSummary: '便當自送達常溫（10:30）至發放（14:00）已長達 3.5 小時，遠超過 2 小時上限，且無維持 60℃ 以上熱藏設備。',
    legalBasis: '食品良好衛生規範準則(GHP)：餐飲業製備菜餚，室溫下不得存放 2 小時以上；熟食之熱藏溫度應保持在攝氏 60℃ 以上。',
    correctActionDescription: '室溫擺放已超過 2 小時且無熱藏設備，極易滋生仙人掌桿菌及金黃色葡萄球菌產生耐熱腸毒素。現場應果斷停止供應該批高風險餐點，改緊急採購合格即食餐點替代，絕不可僅作簡單微波後便發放食用。',
    keyRulePoints: [
      '菜餚在室溫下不得存放 2 小時以上',
      '熟食若採熱藏保存，中心溫度必須恆維持在 60℃ 以上',
      '微生物在 20℃~50℃ 之危險溫度帶繁殖速度呈指數型飆升'
    ],
    slideRef: '教材第 20 頁',
    options: [
      {
        id: 'c1-opt-a',
        label: 'A. 只要聞起來沒有酸臭味，立即以微波爐將便當稍微加熱後照常發給全體師生食用。',
        isCorrect: false,
        feedback: '嚴重錯誤！常溫超過 2 小時，金黃色葡萄球菌若產生耐熱毒素，事後微波加熱也無法破壞毒素，極易引發集體食物中毒。',
        penaltyPoints: 25
      },
      {
        id: 'c1-opt-b',
        label: 'B. 立即停止供應這批常溫置放達 3.5 小時的便當，通報活動總幹事並啟動備用應急供餐方案。',
        isCorrect: true,
        feedback: '完全正確！徹底恪守 GHP「室溫不得超過 2 小時」之鐵律，將學生安全放在第一位，展現專業餐飲從業人員的「Sanity 正經八百、沒有妥協空間」！',
        penaltyPoints: 0
      },
      {
        id: 'c1-opt-c',
        label: 'C. 將便當移進冷氣房降溫，並在便當盒上貼標記「請於半小時內吃完」即可交由大家領取。',
        isCorrect: false,
        feedback: '錯誤！細菌在 31℃ 環境下已大量滋生超過 3 小時，移入冷氣房不能逆轉污染，貼警語更無法免除業者責任。',
        penaltyPoints: 20
      }
    ]
  },
  {
    id: 'case-2',
    title: '情境二：櫃檯收銀找零與手部接續接觸即食餐點',
    location: '校園複合式烘焙炸雞快餐門市',
    context: '午間尖峰時刻，店員小陳左手剛接過顧客沾有污漬的百元鈔票與零錢並放進收銀機找零，隨後在未洗手或更換手套的情況下，右手拿夾子，左手直接徒手扶著剛出爐的炸雞熱狗堡放入紙袋遞給下一位同學。',
    problemSummary: '調理或拿取即食食品時，手部接續接觸金錢後未洗手即直接接觸食品，嚴重違反 GHP 操作規定。',
    legalBasis: '食品良好衛生規範準則(GHP)修正摘要：調理即食食品，手部不得同時或接續接觸金錢或其他有污染之虞之物品；且作業場所應佩戴口罩。',
    correctActionDescription: '收銀金錢上帶有大量致病菌，若徒手接續包裝即食食品，金錢上的病菌將直接污染熟食。正確作法為「收銀與拿取食品人員嚴格分工」，或每次接觸金錢後務必徹底洗手消毒並更換清潔手套。',
    keyRulePoints: [
      '調理與接觸即食食品，嚴禁手部同時或接續碰觸鈔票硬幣',
      '人員操作衛生 (Hygiene) 是食品安全最後一道防線',
      '收銀與配膳建議採雙人分工制，若一人作業則應於每道動作落實洗手與手套替換'
    ],
    slideRef: '教材第 5, 20 頁',
    options: [
      {
        id: 'c2-opt-a',
        label: 'A. 只要左手只摸熱狗堡的包裝紙外層，即使偶爾碰到麵包邊緣也無傷大雅，趕時間出餐最重要。',
        isCorrect: false,
        feedback: '不合格！硬幣紙鈔細菌菌落數極高，接續摸熟食即便是不小心擦過邊緣，均構成嚴重的交叉污染違規。',
        penaltyPoints: 20
      },
      {
        id: 'c2-opt-b',
        label: 'B. 門市應嚴格落實「專職收銀」與「專職配餐」雙人分工；若單人作業，摸完金錢後必須立即依七步驟洗手消毒並換戴新手套方可碰觸即食餐點。',
        isCorrect: true,
        feedback: '完全正確！嚴格符合 GHP 修正法規，徹底杜絕手部摸錢後將病原菌轉移至即食食品的交叉感染風險。',
        penaltyPoints: 0
      },
      {
        id: 'c2-opt-c',
        label: 'C. 店員左手戴著棉紗手套，就直接收錢找零並同時夾麵包，因為有戴手套就不算徒手。',
        isCorrect: false,
        feedback: '嚴重錯誤！手套若接觸了金錢，手套表面一樣沾染病菌，不換手套直接夾麵包同樣造成交叉感染，且棉手套更易吸附油水污垢。',
        penaltyPoints: 25
      }
    ]
  },
  {
    id: 'case-3',
    title: '情境三：烘焙原料庫食品添加物儲放與「三專」落實',
    location: '實習烘焙中央廚房原料倉庫',
    context: '衛生稽查小組走進廚房庫房抽查，發現泡打粉、紅色色素、防腐劑（去水醋酸鈉）與一般麵粉、奶粉混合堆放在同一個雜物料架上。現場不僅無任何領用秤量登記簿冊，更沒有特定保管人，任何實習生均可自行隨意舀取使用。',
    problemSummary: '食品添加物未落實法定「專區、專人、專冊」之「三專管理」，極易發生誤加、超量或混用造成食品中毒。',
    legalBasis: '食品安全衛生管理法及 GHP 修正規定：強化食品添加物管理，增訂應落實「專區、專人、專冊」（三專）管理規定。',
    correctActionDescription: '食品添加物具有法定限量與使用範圍規定，超量將嚴重危害人體健康。必須設立專用上鎖儲物櫃（專區）、指定經合格訓練之專責人員保管鑰匙（專人）、並詳實填寫每次秤量使用與領用數量日誌（專冊）。',
    keyRulePoints: [
      '專區：添加物應設獨立專區或專櫃存放，並明顯標示品名',
      '專人：指派專責管理人員點收、保管及秤量發放',
      '專冊：建立使用簿冊，記錄進貨日期、批號、領用日期、領用量及用途'
    ],
    slideRef: '教材第 21 頁',
    options: [
      {
        id: 'c3-opt-a',
        label: 'A. 食品添加物只是烘焙常用品，只要瓶身保留原本供應商貼紙，放在一般麵粉旁並不需要特殊專區與鎖櫃。',
        isCorrect: false,
        feedback: '錯誤！這已直接違反食安法規定的「三專」管理準則，若遭衛生局查獲將被勒令限期改正或開罰。',
        penaltyPoints: 20
      },
      {
        id: 'c3-opt-b',
        label: 'B. 立即建立專用有鎖的添加物獨立專櫃（專區），指定專門衛生管理人員保管鑰匙（專人），並設置詳細記錄領用秤量與用途的登記本（專冊）。',
        isCorrect: true,
        feedback: '完全正確！完整體現「專區、專人、專冊」之三專法定精髓，杜絕誤用超標危害。',
        penaltyPoints: 0
      },
      {
        id: 'c3-opt-c',
        label: 'C. 只要請每天最後離開廚房的同學隨便填一張簽名表，即可符合專冊管理。',
        isCorrect: false,
        feedback: '錯誤！專人須為明確指定受訓負責之保管人，專冊亦需如實記載進貨、領用量、用途及餘額，不可虛應敷衍。',
        penaltyPoints: 20
      }
    ]
  },
  {
    id: 'case-4',
    title: '情境四：衛生主管機關臨檢！GHP 準則 vs 地方管理法裁罰判定',
    location: '市區某人氣餐廳後廚稽查現場',
    context: '衛生局稽查員抵達餐廳後廚，發現天花板積塵油垢、食材未離地擺放、且冰箱溫度計損壞。主廚慌張地詢問店長：「我們會不會當場被開罰 6 萬元甚至 2 億元？」店長則辯稱：「這只是小缺失，地方政府無權管我們。」兩者對法令屬性與開罰流程一頭霧水。',
    problemSummary: '廚房作業場所不符 GHP 標準時，中央法（食安法第8條）與地方法（第14條）在「處罰方式」上的重大法理差別。',
    legalBasis: '食安法第8條(GHP準則)為中央法，採「間接罰」，主管機關依法應先命限期改善，若複查未改正才處6萬至2億罰鍰；而第14條地方法則為「直接罰」(不可限期改善，處3~300萬)。',
    correctActionDescription: '本案屬於 GHP 良好衛生規範範疇（食安法第8條中央法），依程序主管機關會先開立「限期改善通知單」（間接罰）。業者應於期限內全面修復冰箱溫度計、清洗油垢天花板並使食材墊高離地置放，複查合格即免受 6 萬至 2 億元重罰。',
    keyRulePoints: [
      'GHP 屬食安法第8條中央法，採間接罰：先命限期改善，複查未過才罰 6 萬 ~ 2 億',
      '公共飲食場所衛生管理辦法為食安法第14條地方法，採直接罰：不可限改，處 3 ~ 300 萬',
      '餐飲從業人員必須熟知法條屬性，在接獲限期改善單後務必全力依規整改'
    ],
    slideRef: '教材第 19 頁',
    options: [
      {
        id: 'c4-opt-a',
        label: 'A. 稽查員當場一定會立即開出 6 萬元至 2 億元的罰單，沒有任何改善機會，應拒絕簽名。',
        isCorrect: false,
        feedback: '觀念錯誤！GHP 是「間接罰」，法規程序規定必須先給予「限期改善」之期限，未在期限內改善完成才會處以 6 萬~ 2 億元。',
        penaltyPoints: 20
      },
      {
        id: 'c4-opt-b',
        label: 'B. 此項稽查依據食安法第8條中央法 GHP 準則，處罰方式為「間接罰」；衛生局會先命限期改善，業者應於期限內完成整改並報請複查，即可免除 6萬~2億之重罰。',
        isCorrect: true,
        feedback: '精準專業！清楚分辨中央法 GHP 與地方法之法源、處罰機制及罰鍰額度，展現法規守則之高水準素養！',
        penaltyPoints: 0
      },
      {
        id: 'c4-opt-c',
        label: 'C. 只要強調店內屬於公共飲食場所，就會一律被採「直接罰」處以 2 億元罰鍰。',
        isCorrect: false,
        feedback: '法條混淆！公共飲食場所衛生管理辦法雖然是直接罰，但其罰鍰上限為 300 萬元而非 2 億元；2 億元是 GHP 屆期未改善之最高罰額。',
        penaltyPoints: 20
      }
    ]
  }
];

export const DEMO_STUDENT_RECORDS: StudentRecord[] = [
  {
    id: 'rec-1',
    studentId: '11250101',
    studentName: '王曉明',
    submittedAt: '2026-09-28 14:20:15',
    quizScore: 93,
    quizPassed: true,
    correctAnswersCount: 14,
    totalQuizQuestions: 15,
    completedScenariosCount: 4,
    scenarioNotes: '深入探討了 GHP 間接罰與地方法直接罰之區別，並承諾落實添加物三專管理。',
    quizDetails: [
      { questionId: 1, chosenAnswer: 1, isCorrect: true },
      { questionId: 2, chosenAnswer: 2, isCorrect: true },
      { questionId: 3, chosenAnswer: 1, isCorrect: true },
      { questionId: 4, chosenAnswer: 2, isCorrect: true },
      { questionId: 5, chosenAnswer: 2, isCorrect: true },
      { questionId: 6, chosenAnswer: 0, isCorrect: true },
      { questionId: 7, chosenAnswer: 2, isCorrect: true },
      { questionId: 8, chosenAnswer: 1, isCorrect: true },
      { questionId: 9, chosenAnswer: 1, isCorrect: true },
      { questionId: 10, chosenAnswer: 1, isCorrect: true },
      { questionId: 11, chosenAnswer: 1, isCorrect: true },
      { questionId: 12, chosenAnswer: 2, isCorrect: true },
      { questionId: 13, chosenAnswer: 2, isCorrect: true },
      { questionId: 14, chosenAnswer: 1, isCorrect: true },
      { questionId: 15, chosenAnswer: 0, isCorrect: false }
    ]
  },
  {
    id: 'rec-2',
    studentId: '11250102',
    studentName: '李美玲',
    submittedAt: '2026-09-28 15:45:30',
    quizScore: 100,
    quizPassed: true,
    correctAnswersCount: 15,
    totalQuizQuestions: 15,
    completedScenariosCount: 4,
    scenarioNotes: '全數情境選擇最優決策，對於結核病刪除理由及常溫2小時標準掌握極為透徹。',
    quizDetails: [
      { questionId: 1, chosenAnswer: 1, isCorrect: true },
      { questionId: 2, chosenAnswer: 2, isCorrect: true },
      { questionId: 3, chosenAnswer: 1, isCorrect: true },
      { questionId: 4, chosenAnswer: 2, isCorrect: true },
      { questionId: 5, chosenAnswer: 2, isCorrect: true },
      { questionId: 6, chosenAnswer: 0, isCorrect: true },
      { questionId: 7, chosenAnswer: 2, isCorrect: true },
      { questionId: 8, chosenAnswer: 1, isCorrect: true },
      { questionId: 9, chosenAnswer: 1, isCorrect: true },
      { questionId: 10, chosenAnswer: 1, isCorrect: true },
      { questionId: 11, chosenAnswer: 1, isCorrect: true },
      { questionId: 12, chosenAnswer: 2, isCorrect: true },
      { questionId: 13, chosenAnswer: 2, isCorrect: true },
      { questionId: 14, chosenAnswer: 1, isCorrect: true },
      { questionId: 15, chosenAnswer: 1, isCorrect: true }
    ]
  },
  {
    id: 'rec-3',
    studentId: '11250108',
    studentName: '陳冠宇',
    submittedAt: '2026-09-29 09:12:05',
    quizScore: 80,
    quizPassed: true,
    correctAnswersCount: 12,
    totalQuizQuestions: 15,
    completedScenariosCount: 3,
    scenarioNotes: '對 SQF 驗證標章及 911 歷史分水嶺有明確理解，需加強中央法與地方法罰鍰上限之差異記憶。',
    quizDetails: [
      { questionId: 1, chosenAnswer: 1, isCorrect: true },
      { questionId: 2, chosenAnswer: 2, isCorrect: true },
      { questionId: 3, chosenAnswer: 1, isCorrect: true },
      { questionId: 4, chosenAnswer: 2, isCorrect: true },
      { questionId: 5, chosenAnswer: 1, isCorrect: false },
      { questionId: 6, chosenAnswer: 0, isCorrect: true },
      { questionId: 7, chosenAnswer: 2, isCorrect: true },
      { questionId: 8, chosenAnswer: 1, isCorrect: true },
      { questionId: 9, chosenAnswer: 0, isCorrect: false },
      { questionId: 10, chosenAnswer: 1, isCorrect: true },
      { questionId: 11, chosenAnswer: 1, isCorrect: true },
      { questionId: 12, chosenAnswer: 1, isCorrect: false },
      { questionId: 13, chosenAnswer: 2, isCorrect: true },
      { questionId: 14, chosenAnswer: 1, isCorrect: true },
      { questionId: 15, chosenAnswer: 1, isCorrect: true }
    ]
  },
  {
    id: 'rec-4',
    studentId: '11250115',
    studentName: '張婷萱',
    submittedAt: '2026-09-29 11:30:42',
    quizScore: 87,
    quizPassed: true,
    correctAnswersCount: 13,
    totalQuizQuestions: 15,
    completedScenariosCount: 4,
    scenarioNotes: '情境分析中對於外送平台與車廂溫度控管見解精闢。',
    quizDetails: [
      { questionId: 1, chosenAnswer: 1, isCorrect: true },
      { questionId: 2, chosenAnswer: 2, isCorrect: true },
      { questionId: 3, chosenAnswer: 1, isCorrect: true },
      { questionId: 4, chosenAnswer: 2, isCorrect: true },
      { questionId: 5, chosenAnswer: 2, isCorrect: true },
      { questionId: 6, chosenAnswer: 0, isCorrect: true },
      { questionId: 7, chosenAnswer: 2, isCorrect: true },
      { questionId: 8, chosenAnswer: 1, isCorrect: true },
      { questionId: 9, chosenAnswer: 1, isCorrect: true },
      { questionId: 10, chosenAnswer: 1, isCorrect: true },
      { questionId: 11, chosenAnswer: 0, isCorrect: false },
      { questionId: 12, chosenAnswer: 2, isCorrect: true },
      { questionId: 13, chosenAnswer: 2, isCorrect: true },
      { questionId: 14, chosenAnswer: 0, isCorrect: false },
      { questionId: 15, chosenAnswer: 1, isCorrect: true }
    ]
  },
  {
    id: 'rec-5',
    studentId: '11250122',
    studentName: '林家豪',
    submittedAt: '2026-09-29 16:05:18',
    quizScore: 60,
    quizPassed: false,
    correctAnswersCount: 9,
    totalQuizQuestions: 15,
    completedScenariosCount: 2,
    scenarioNotes: '法規與罰則部分混淆，建議重新複習字卡並重測。',
    quizDetails: [
      { questionId: 1, chosenAnswer: 0, isCorrect: false },
      { questionId: 2, chosenAnswer: 2, isCorrect: true },
      { questionId: 3, chosenAnswer: 1, isCorrect: true },
      { questionId: 4, chosenAnswer: 1, isCorrect: false },
      { questionId: 5, chosenAnswer: 2, isCorrect: true },
      { questionId: 6, chosenAnswer: 1, isCorrect: false },
      { questionId: 7, chosenAnswer: 2, isCorrect: true },
      { questionId: 8, chosenAnswer: 1, isCorrect: true },
      { questionId: 9, chosenAnswer: 0, isCorrect: false },
      { questionId: 10, chosenAnswer: 0, isCorrect: false },
      { questionId: 11, chosenAnswer: 1, isCorrect: true },
      { questionId: 12, chosenAnswer: 1, isCorrect: false },
      { questionId: 13, chosenAnswer: 2, isCorrect: true },
      { questionId: 14, chosenAnswer: 1, isCorrect: true },
      { questionId: 15, chosenAnswer: 1, isCorrect: true }
    ]
  }
];

export const INITIAL_TEACHER_PASSWORD = 'admin123';
