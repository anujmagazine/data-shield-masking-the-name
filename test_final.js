const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const lines=html.split('\n');
const startLine=lines.findIndex(l=>l.includes('function detectNames(text)'));
const endLine=lines.findIndex((l,i)=>i>startLine&&/^}/.test(l.trimStart())&&i>startLine+10&&lines.slice(startLine,i).join('\n').includes('return arr.filter'));
eval(lines.slice(startLine,endLine+1).join('\n'));

const ALL_NAMES=[
  'Shyam Sundar Swami','Harvinder Singh','Vivek Chikara','Ajeet Singh',
  'Mariyappan Thangavelu','Nishad Kumar','Praveen Kumar','Soman Rana',
  'Chirag Baretha','Sukant Kadam','Krishna Nagar','Swarup Unhalkar',
  'Singhraj Adhana','Yogesh Kathuniya','Sidhartha Babu','Sriharsha Ramakrishna Devaraddi',
  'MS Sharath','Navdeep Dalbir','Simran','Bhavina Hasmukh Patel',
  'Nimisha C S','Shailesh Kumar','Bhagyashri Madhavrao Jadhav','Sonal Manu Patel',
  'Prachi Yadav','Nithya Sre','Sandip Sanjay Sargar','Sivarajan Solaimalai',
  'Haris Mythili Srikumar','Nihal Singh','Pooja Jatyan','Manisha Ramadass',
  'Rubina Francis','Sandeep Choudhary','Rinku Hooda','Manish Narwal',
  'Avani Lekhara','Rahul Azad Jakhar','Shanthiya Vishwanathan','Nitesh Kumar',
  'Naveen Sivakumar','Sachin Khilari','Sheetal Devi','Sarita Rishal Singh Adhana',
  'Pushpendra Singh','Adil Mohd Nazir Ansari','Bhawanaben Ajbaji Chaudhary','Dev Rathi',
  'Thulasimathi Murugesan','Abhijeet Sakuja','Jatin Ajay Azad','Tulika Satischandra Jadhav',
  'Kokila Krishan Kumar','Kapil Parmar','Ramesh Vaja Chaudhary','Bhakthi Yogendra Sharma',
  'Sourabhi Sharma','Rudransh Khandelwal','Pranav Soorma','Ravi Rongali',
  'Dilip Mahadu Gavit','Mohd Shavej','H Hokato Sema','Killaka Lalitha',
  'Pallavi KM','Sagar Katale','Pranay Seth','Mona Agrawal',
  'Deepthi Jeevanji','Preeti Pal','Ruchi Trivedi','Sanjana Kumari',
  'Sudarshan M S','Alphia James','Manu','Solairaj Dharamraj',
  'Sundar Singh Gurjar','DS Vishnu','Ullas Gowda','Usha Chouhan',
  'Payal Nag','Nikhil','Sandesh Reddy','Shrishti Arora',
  'Shubham Juyal','Mugunthan S','Azbaan Ahmed','Sandeep Kumar',
  'Adiba Ali','Satya Sridhar Rayala','Jagadesh Dilli','Dhanna Ram',
  'Toman Kumar','Lakshay Choudhary','Kartik Suhag','Sai Mangala',
  'Vijender','Yogesh','Ishank Ahuja','Vijaya Deepika',
  'Chirag Tyagi','Aanya Naomi Mathew','Pramod Bhagat','Tarun Dhillon',
  'Suryakant Yadav','Sumedha Pathak','Ashok Malik','Kashish Lakra',
  'Mit Patel','Ayush Kumar','Kavin Kengnalkar','Mahendra Gurjar',
  'Banothu Akiranandan','B Naresh','A Naresh','Boya Pavani',
  'A Swaraj Kumar','B Manohara','K Manoj','D Charanjith',
  'G Rishi','Shivam Yadav','Nitin Yadav','Akshay',
  'Aishpreet Singh','Shanti Bai Jharia','Sarabjit Kaur','Potnuru Premchand',
  'Reva Swarnkar','Shruti Santosh Tanksali','Pranay Ravi Shetty','Rutvi Mangesh Lolge',
  'Manisha Patel','Saivardhan Vikram Patil','Sharmila','Bhawna',
  'Swati Chaudhary','Sehajveer Singh','Tejalben Amraji Damor','Vikram Singh',
  'Aaryan Sharma','Sumit','Varun Singh Bhati'
];

// 143-name masking test
let pass=0, fail=0;
ALL_NAMES.forEach(fullName => {
  const parts = fullName.split(/\s+/).filter(p=>p.length>=3);
  const text = `Athlete: ${fullName}\n${fullName} reported to camp.\n${parts[0]||''} trained well.\nSigned by: Dr. Mehta`;
  const detected = detectNames(text);
  const alias = {};
  detected.forEach((n,i) => { alias[n] = '[P'+(i+1)+']'; });
  let masked = text;
  [...detected].sort((a,b)=>b.length-a.length).forEach(n=>{
    const escaped=n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    masked=masked.replace(new RegExp('\\b'+escaped+'\\b','gi'),alias[n]);
  });
  const _pm={};
  detected.forEach(n=>{n.split(/\s+/).forEach(p=>{
    if(p.length<3||/^[A-Z]\.$/.test(p))return;
    const k=p.toLowerCase();if(!_pm[k])_pm[k]={w:p,a:new Set()};_pm[k].a.add(alias[n]);
  })});
  Object.values(_pm).sort((a,b)=>b.w.length-a.w.length).forEach(v=>{
    const escaped=v.w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    masked=masked.replace(new RegExp('\\b'+escaped+'\\b','gi'),[...v.a][0]);
  });
  const leaked = parts.filter(p => new RegExp('\\b'+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i').test(masked));
  if(leaked.length > 0){ fail++; console.log(`✗ ${fullName} — LEAKED: ${leaked.join(', ')}`); }
  else pass++;
});
console.log(`\n143-NAME TEST: ✓ ${pass}/${ALL_NAMES.length} masked, ✗ ${fail} leaked`);

// False merge test
console.log('\n═══ FALSE MERGE TESTS ═══');
const mergeTests = [
  {input: 'Coach: Subhash reviewed Avani\'s shooting scores.', reject: ['Subhash Avani']},
  {input: 'Coach: Ramesh reviewed Chirag Baretha and Navdeep Dalbir.', reject: ['Ramesh Chirag']},
  {input: 'Signed by: Dr. Anand reviewed by Nutritionist Priya', reject: ['Anand Priya']},
  {input: 'Athlete: Harvinder Singh\nAthlete: Sheetal Devi', reject: ['Harvinder Singh Sheetal','Singh Sheetal']},
];
mergeTests.forEach(t => {
  const r = detectNames(t.input);
  const bad = (t.reject||[]).filter(x => r.includes(x));
  if(bad.length) console.log(`✗ FALSE MERGE: "${bad.join(', ')}" in ${JSON.stringify(r)}`);
  else console.log(`✓ No false merges: ${JSON.stringify(r)}`);
});

// Smoke tests
console.log('\n═══ SMOKE TESTS ═══');
const smoke=[
  {name:'No false SAI/BMI', input:'SAI Bengaluru. BMI normal.', reject:['SAI','BMI']},
  {name:'No false Nutritionist', input:'Nutritionist reviewed diet plan.', reject:['Nutritionist']},
  {name:'Medical no FP', input:'Hemoglobin normal. Ferritin elevated. Cortisol adequate.', reject:[]},
  {name:'Empty text', input:'', expect:[]},
];
smoke.forEach(t=>{
  const r=detectNames(t.input);let ok=true;
  if(t.expect&&JSON.stringify(r)!==JSON.stringify(t.expect)){console.log(`FAIL [${t.name}]`);ok=false;}
  if(t.reject)(t.reject).forEach(e=>{if(r.includes(e)){console.log(`FAIL [${t.name}]: has "${e}"`);ok=false;}});
  if(ok) console.log(`✓ [${t.name}]`);
});
