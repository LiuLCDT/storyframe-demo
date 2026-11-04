export const SAMPLE='一只金毛小狗第一次去游乐场。它兴奋地坐车抵达，依次体验旋转木马、过山车和碰碰车，吃爆米花、玩套圈。傍晚，它坐上摩天轮俯瞰乐园，最后在烟花下结束快乐的一天。整体采用温暖的绘本风格。';
export const SETTING='金毛幼犬，红色项圈，温暖的手绘绘本风格。保持主角外观一致；服装、道具随镜头补充。';
export type Shot={id:string;title:string;image:string;description:string;action:string;narration:string;duration:number;prompt:string;dirty:boolean;corrected:boolean};
const rows=[
 ['1-1','出发，去乐园','车内近景，小狗望向窗外的摩天轮。','前爪搭在窗边，兴奋地向外看。','今天，我要去一个特别的地方。'],
 ['1-2','第一张门票','乐园入口的全景，小狗拿着门票站在彩旗下。','举起门票，朝入口迈步。','我的快乐冒险，开始啦！'],
 ['1-3','旋转木马','中景，小狗戴着草帽，坐在白色木马上。','扶住立杆，跟随木马上下起伏。','第一站，当一回小骑士。'],
 ['2-1','勇敢过山车','动态中景，小狗坐在过山车前排，其他小狗在后排。','迎风张开嘴，随车俯冲。','原来勇敢，是害怕也想试一试。'],
 ['2-3','碰出新朋友','中景，红色和蓝色碰碰车相遇。','握紧方向盘，和新朋友笑着碰车。','转个弯，碰见一个新朋友。'],
 ['3-1','甜甜的休息','小吃摊中景，小狗捧着爆米花，旁边放着饮料。','拿起爆米花，享受片刻休息。','快乐，也需要补充一点能量。'],
 ['3-2','套圈小挑战','侧面中景，小狗站在套圈摊前，面对一排黄色小鸭。','举起圆环，瞄准小鸭。','再试一次，说不定就中了！'],
 ['2-2','夕阳里的摩天轮','轿厢内近景，小狗俯瞰夕阳下的整个乐园。','安静地望着窗外。','原来，刚才的冒险都变成了小小的风景。'],
 ['3-3','烟花说晚安','夜景，小狗拿着气球，仰望绽放的烟花。','抬头看烟花，露出满足的笑容。','把今天的快乐，装进明天的梦里。']
];
export function fresh():Shot[]{return rows.map(([id,title,description,action,narration])=>({id,title,image:`./assets/dog-${id}.png`,description,action,narration,duration:5,prompt:`${SETTING} ${description} ${action} 横幅构图，无字幕。`,dirty:false,corrected:false}));}
export const imageOf=(s:Shot)=>s.corrected?'./assets/ring-corrected.png':s.image;
export type Project={story:string;setting:string;shots:Shot[];started:boolean};
export const empty=():Project=>({story:'',setting:SETTING,shots:fresh(),started:false});
export function markdown(p:Project){return `# 镜序｜小狗去游乐场\n\n交互原型，生成结果使用预制样例。\n\n## 输入故事\n${p.story}\n\n## 共用设定\n${p.setting}\n\n计划总时长：${p.shots.reduce((a,s)=>a+s.duration,0)} 秒\n\n`+p.shots.map((s,i)=>`## ${i+1}. ${s.title}（${s.duration} 秒）\n\n画面：${s.description}\n\n动作：${s.action}\n\n旁白：${s.narration}\n\n提示词：${s.prompt}\n\n参考图状态：${s.dirty?'待更新':s.corrected?'已采用预制红色项圈版本':'预制样例，需人工检查一致性'}\n`).join('\n');}
