import type {ConceptDetail} from '@site/src/components/Graph/types';

const neuralNetwork: ConceptDetail = {
  id: 'neural-network',
  name: '神经网络',
  nameEn: 'Neural Network',
  abbreviation: 'NN',
  category: 'basic',
  difficulty: 2,
  tags: ['AI', '深度学习', '感知机', '神经元'],
  tooltip: {summary: '受人脑神经元结构启发设计的计算模型，是深度学习的核心架构'},
  detail: {
    definition: '神经网络（Neural Network）是一种受人脑神经元连接结构启发的计算模型，由大量人工神经元（节点）通过加权连接（边）组成。一个典型的人工神经元接收多个输入，每个输入带有权重，神经元将加权和通过激活函数处理后输出。多个神经元按层组织（输入层、隐藏层、输出层），通过反向传播算法训练调整权重，使网络能够学习输入到输出的复杂映射关系。',
    plainExplanation: '想象大脑里有数十亿个神经细胞，它们相互连接，传递电信号。某个神经细胞收到足够强的信号就会"激活"，并把信号传给下游细胞。学习就是不断调整细胞间连接的"强度"。人工神经网络就是这种机制的数学模拟：每个圆圈（神经元）做简单的加权求和和激活判断，但当几十亿个这样的简单单元组合起来，就能识别图像、理解语言、下棋玩游戏。',
    analogy: '神经网络就像乐高积木：单个积木块（神经元）功能很弱，只能做简单的判断；但当你把它们一层一层堆叠起来（输入层→隐藏层→输出层），用不同的连接方式组合，就能搭建出从简单到复杂的各种结构——比如识别手写数字的 3 层网络，识别猫狗的 50 层网络，乃至 ChatGPT 的上千层网络。每个"积木"都很简单，组合起来就威力无穷。',
    keyPoints: [
      '神经元（节点）：接收输入、加权求和、通过激活函数（如 ReLU、Sigmoid）输出',
      '层（Layer）：输入层接收数据，隐藏层提取特征，输出层给出预测',
      '权重（Weight）：连接的强度，通过训练调整，是网络"学习"的载体',
      '前向传播：输入数据经过各层计算得到输出',
      '反向传播 + 梯度下降：根据输出误差反向调整每层权重',
      '万能逼近定理：足够大的神经网络可以逼近任意连续函数',
    ],
    useCases: [
      {title: '图像识别', description: '卷积神经网络（CNN）成为图像分类、目标检测的标准方法', example: '人脸识别门禁系统、自动驾驶中的行人检测、医学影像的肿瘤识别'},
      {title: '语音处理', description: '循环神经网络（RNN）和 Transformer 用于语音识别、合成', example: '手机语音助手、智能音箱的语音转文字功能'},
      {title: '推荐系统', description: '深度神经网络学习用户偏好，做个性化推荐', example: '抖音、快手、淘宝的"猜你喜欢"'},
      {title: '科学研究', description: '神经网络在物理、生物、材料等领域加速科学发现', example: 'AlphaFold 预测蛋白质三维结构，解决困扰生物学 50 年的难题'},
    ],
    relatedConcepts: [
      {conceptId: 'deep-learning', relationType: 'is-foundation-of', relationLabel: '是基础'},
      {conceptId: 'machine-learning', relationType: 'is-subfield-of', relationLabel: '是子领域'},
      {conceptId: 'transformer', relationType: 'uses', relationLabel: '使用'},
    ],
    resources: [
      {title: 'Neural Networks and Deep Learning', url: 'http://neuralnetworksanddeeplearning.com/', type: 'article', language: 'en', difficulty: 'beginner', recommended: true},
      {title: '3Blue1Brown 神经网络系列', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'video', language: 'en', difficulty: 'beginner', recommended: true},
      {title: '台大李宏毅机器学习', url: 'https://www.youtube.com/watch?v=CXgbekl66jc', type: 'video', language: 'zh', difficulty: 'beginner', recommended: true},
    ],
  },
};

export default neuralNetwork;
