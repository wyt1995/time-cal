export interface CalendarInfo {
  name: string,
  name_ch: string,
  era: string,
  author: string | null,
  year: number,
}

export const CalendarsInfo: Array<CalendarInfo> = [
  {
    name: 'HuangDi',
    name_ch: '黄帝曆',
    era: 'Warring States',
    author: null,
    year: -300,
  },

  {
    name: 'ZhuanXu',
    name_ch: '顓頊曆',
    era: 'Warring States',
    author: null,
    year: -340,
  },

  {
    name: 'Xia',
    name_ch: '夏曆',
    era: 'Warring States',
    author: null,
    year: -460,
  },

  {
    name: 'Yin',
    name_ch: '殷曆',
    era: 'Warring States',
    author: null,
    year: -430,
  },

  {
    name: 'Zhou',
    name_ch: '周曆',
    era: 'Warring States',
    author: null,
    year: -210,
  },

  {
    name: 'Lu',
    name_ch: '魯曆',
    era: 'Warring States',
    author: null,
    year: -450,
  },

  {
    name: 'SanTong',
    name_ch: '三統曆',
    era: 'Western Han',
    author: 'Liu Xin',
    year: -104,
  },

  {
    name: 'SiFen',
    name_ch: '四分曆',
    era: 'Eastern Han',
    author: 'Bian Xin',
    year: 85,
  },

  {
    name: 'QianXiang',
    name_ch: '乾象曆',
    era: 'Eastern Han',
    author: 'Liu Hong',
    year: 196,
  },

  {
    name: 'JingChu',
    name_ch: '景初曆',
    era: 'Wei, Three Kingdoms',
    author: 'Yang Wei',
    year: 237,
  },

  {
    name: 'SanJi',
    name_ch: '三紀甲子元曆',
    era: 'Sixteen Kingdoms',
    author: 'Jiang Ji',
    year: 384,
  },

  {
    name: 'YuanJia',
    name_ch: '元嘉曆',
    era: 'Song, Southern Dynasties',
    author: 'He Chengtian',
    year: 443,
  },

  {
    name: 'DaMing',
    name_ch: '大明曆',
    era: 'Song, Southern Dynasties',
    author: 'Zu Chongzhi',
    year: 462,
  },

  {
    name: 'ZhengGuang',
    name_ch: '正光曆',
    era: 'Northern Wei',
    author: 'Li Yexing',
    year: 520,
  },

  {
    name: 'XingHe',
    name_ch: '興和曆',
    era: 'Northern Wei',
    author: 'Li Yexing',
    year: 539,
  },

  {
    name: 'KaiHuang',
    name_ch: '開皇曆',
    era: 'Sui',
    author: 'Zhang Bin',
    year: 584,
  },

  {
    name: 'LiuXiaoSun',
    name_ch: '劉孝孫曆',
    era: 'Sui',
    author: 'Liu XiaoSun',
    year: 584,
  },

  {
    name: 'DaYe',
    name_ch: '大業曆',
    era: 'Sui',
    author: 'Zhang Zhouxuan',
    year: 608,
  },

  {
    name: 'HuangJi',
    name_ch: '皇極曆',
    era: 'Sui',
    author: 'Liu Zhuo',
    year: 604,
  },

  {
    name: 'WuYinYuan',
    name_ch: '戊寅元曆',
    era: 'Tang',
    author: 'Fu Renjun',
    year: 626,
  },

  {
    name: 'LinDe',
    name_ch: '麟德曆',
    era: 'Tang',
    author: 'Li Chunfeng',
    year: 664,
  },

  {
    name: 'DaYan',
    name_ch: '大衍曆',
    era: 'Tang',
    author: 'Monk Yixing',
    year: 724,
  },

  {
    name: 'WuJi',
    name_ch: '五紀曆',
    era: 'Tang',
    author: 'Guo Xianzhi',
    year: 762,
  },

  {
    name: 'ZhengYuan',
    name_ch: '正元曆',
    era: 'Tang',
    author: 'Xu Chengsi',
    year: 784,
  },

  {
    name: 'XuanMing',
    name_ch: '宣明曆',
    era: 'Tang',
    author: 'Xu Ang',
    year: 822,
  },

  {
    name: 'ChongXuan',
    name_ch: '崇玄曆',
    era: 'Tang',
    author: 'Bian Gang',
    year: 892,
  },

  {
    name: 'YingTian',
    name_ch: '應天曆',
    era: 'Northern Song',
    author: 'Wang Chune',
    year: 962,
  },

  {
    name: 'QianYuan',
    name_ch: '乾元曆',
    era: 'Northern Song',
    author: 'Wu Zhaosu',
    year: 981,
  },

  {
    name: 'YiTian',
    name_ch: '儀天曆',
    era: 'Northern Song',
    author: 'Shi Xu',
    year: 1001,
  },

  {
    name: 'ChongTian',
    name_ch: '崇天曆',
    era: 'Northern Song',
    author: 'Chu Yan',
    year: 1024,
  },

  {
    name: 'MingTian',
    name_ch: '明天曆',
    era: 'Northern Song',
    author: 'Zhou Cong',
    year: 1064,
  },

  {
    name: 'GuanTian',
    name_ch: '觀天曆',
    era: 'Northern Song',
    author: 'Huang Juqing',
    year: 1092,
  },

  {
    name: 'JiYuan',
    name_ch: '紀元曆',
    era: 'Northern Song',
    author: 'Yao Shunfu',
    year: 1106,
  },

  {
    name: 'TongYuan',
    name_ch: '統元曆',
    era: 'Southern Song',
    author: 'Chen Deyi',
    year: 1135,
  },

  {
    name: 'QianDao',
    name_ch: '乾道曆',
    era: 'Southern Song',
    author: 'Liu Xiaorong',
    year: 1167,
  },

  {
    name: 'ChunXi',
    name_ch: '淳熙曆',
    era: 'Southern Song',
    author: 'Liu Xiaorong',
    year: 1176,
  },

  {
    name: 'HuiYuan',
    name_ch: '會元曆',
    era: 'Southern Song',
    author: 'Liu Xiaorong',
    year: 1191,
  },

  {
    name: 'TongTian',
    name_ch: '統天曆',
    era: 'Southern Song',
    author: 'Yang Zhongfu',
    year: 1199,
  },

  {
    name: 'KaiXi',
    name_ch: '開禧曆',
    era: 'Southern Song',
    author: 'Bao Hanzhi',
    year: 1207,
  },

  {
    name: 'ChengTian',
    name_ch: '成天曆',
    era: 'Southern Song',
    author: 'Chen Ding',
    year: 1271,
  },

  {
    name: 'NewDaMing',
    name_ch: '重修大明曆',
    era: 'Jin',
    author: 'Zhao Zhiwei',
    year: 1180,
  },

  {
    name: 'XiZheng',
    name_ch: '西征庚午元曆',
    era: 'Mongolia',
    author: 'Yelv Chucai',
    year: 1220,
  },

  {
    name: 'ShouShi',
    name_ch: '授時曆',
    era: 'Yuan',
    author: 'Guo Shoujing',
    year: 1281,
  },

  {
    name: 'DaTong',
    name_ch: '大統曆',
    era: 'Ming',
    author: 'Yuan Tong',
    year: 1384,
  },
]
