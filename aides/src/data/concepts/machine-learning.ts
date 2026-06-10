import type {ConceptDetail} from '@site/src/components/Graph/types';

const machineLearning: ConceptDetail = {
  id: 'machine-learning',
  name: '机器学习',
  nameEn: 'Machine Learning',
  abbreviation: 'ML',
  category: 'basic',
  difficulty: 1,
  tags: ['AI', '算法', '数据', '监督学习'],
  tooltip: {summary: '让计算机从数据中自动学习规律并做出预测或决策，无需显式编程'},
  detail: {
    definition: '机器学习（Machine Learning，ML）是人工智能的一个核心分支，研究如何让计算机系统从数据中自动"学习"规律，并利用这些规律对未知数据做出预测或决策。与传统编程（人写规则让机器执行）不同，机器学习是让机器自己从数据中发现规则。机器学习包括监督学习（用标注数据训练）、无监督学习（发现数据内在结构）、强化学习（通过试错学习最优策略）三大类，以及半监督学习、自监督学习等变体。',
    plainExplanation: '传统编程是你告诉计算机每一步怎么做："如果出现 A，就执行 B"。机器学习相反：你给它一堆例子（输入+正确答案），让它自己找出规律。比如想识别垃圾邮件，你给 1000 封邮件（500 封正常、500 封垃圾）让算法学习，它自己会发现"包含某些关键词"或"某些发件人模式"是垃圾邮件的特征。下次新邮件来，它就能自动判断。学习就是"看大量例子找规律"的过程。',
    analogy: '机器学习就像教小孩认水果：传统编程是你写一本厚厚的"苹果识别手册"（"红色、圆形、有柄、顶部凹陷..."），但手册永远写不完（绿苹果、红富士、黄香蕉...）。机器学习是直接把一堆苹果、香蕉、橙子摆在他面前，告诉他哪些是苹果哪些不是。他观察多了，自然就掌握了"苹果是什么样"——即使你给他一个他从没见过的澳洲青苹果，他也能认出来。',
    keyPoints: [
      '三大范式：监督学习（有标签）、无监督学习（无标签）、强化学习（试错奖励）',
      '训练数据 + 算法 + 算力 = 机器学习模型的三大要素',
      '特征工程：在深度学习出现之前，模型性能严重依赖人类设计特征',
      '过拟合：模型在训练集表现好但在新数据表现差，是机器学习的核心挑战',
      '泛化能力：模型的终极目标，能在新数据上做出准确预测',
      '评估指标：分类（准确率、精确率、召回率、F1）、回归（MSE、R²）等',
    ],
    useCases: [
      {title: '推荐系统', description: '基于用户历史行为预测偏好，做个性化推荐', example: 'Netflix 电影推荐、淘宝"猜你喜欢"、抖音视频推送'},
      {title: '金融风控', description: '从历史数据学习欺诈模式，实时识别可疑交易', example: '支付宝反欺诈系统、信用卡盗刷检测'},
      {title: '医疗诊断', description: '从病历和影像数据学习疾病特征，辅助医生诊断', example: '皮肤癌筛查、肺结节检测、糖尿病视网膜病变识别'},
      {title: '预测分析', description: '从历史数据预测未来趋势，支持业务决策', example: '销售预测、天气预测、股票走势分析'},
    ],
    relatedConcepts: [
      {conceptId: 'deep-learning', relationType: 'includes', relationLabel: '包含'},
      {conceptId: 'neural-network', relationType: 'uses', relationLabel: '使用'},
      {conceptId: 'fine-tuning', relationType: 'uses', relationLabel: '使用'},
      {conceptId: 'prompt-engineering', relationType: 'is-foundation-of', relationLabel: '是基础'},
    ],
    resources: [
      {title: '吴恩达机器学习课程', url: 'https://www.coursera.org/learn/machine-learning', type: 'video', language: 'zh', difficulty: 'beginner', recommended: true},
      {title: '统计学习方法 (李航)', url: 'https://www.amazon.com/dp/730227595X', type: 'documentation', language: 'zh', difficulty: 'intermediate', recommended: true},
      {title: '机器学习速成课 (Google)', url: 'https://developers.google.com/machine-learning/crash-course', type: 'article', language: 'zh', difficulty: 'beginner', recommended: true},
    ],
  },
};

export default machineLearning;
