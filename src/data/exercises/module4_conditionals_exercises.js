// src/data/exercises/module4_conditionals_exercises.js
export const exercises4 = [
  {
    id: 'ex-4-1',
    lessonId: '4-1',
    moduleId: 4,
    difficulty: 'easy',
    order: 1,
    xpReward: 30,
    title: { th: '1. ทายใจตัวเลข', en: '1. Number Guessing' },
    description: {
      th: 'โปรแกรมจะรับตัวเลข 1 ตัวมาเก็บในตัวแปร `num`\nจงเขียนคำสั่ง `if-else` เพื่อตรวจสอบว่าตัวเลขนี้มากกว่า 50 หรือไม่\n- ถ้ามากกว่า 50 ให้พิมพ์ว่า `High`\n- ถ้าไม่เกิน 50 ให้พิมพ์ว่า `Low`',
      en: 'The program receives an integer in `num`.\nWrite an if-else statement:\n- If num is greater than 50, print `High`\n- Otherwise, print `Low`',
    },
    starterCode: 'num = int(input())\n# เขียนเงื่อนไขที่นี่\n',
    hint: {
      th: 'ใช้ if num > 50: และอย่าลืมย่อหน้า (Indentation) 4 เคาะในบรรทัด print',
      en: 'Use if num > 50: and remember to indent the print statement.',
    },
    testCases: [
      { input: '60', expectedOutput: 'High' },
      { input: '50', expectedOutput: 'Low' },
      { input: '49', expectedOutput: 'Low' },
    ],
  },
  {
    id: 'ex-4-2',
    lessonId: '4-2',
    moduleId: 4,
    difficulty: 'medium',
    order: 2,
    xpReward: 40,
    title: { th: '2. ตัดเกรดมหาวิทยาลัย', en: '2. University Grading' },
    description: {
      th: 'จงเขียนโปรแกรมตัดเกรดโดยรับคะแนน `score` (0-100)\nเงื่อนไข:\n- คะแนน 80 ขึ้นไป พิมพ์ `A`\n- คะแนน 70 ถึง 79 พิมพ์ `B`\n- คะแนน 60 ถึง 69 พิมพ์ `C`\n- คะแนนต่ำกว่า 60 พิมพ์ `F`',
      en: 'Write a grading program based on `score` (0-100).\n- 80+: print `A`\n- 70-79: print `B`\n- 60-69: print `C`\n- < 60: print `F`',
    },
    starterCode: 'score = int(input())\n# ใช้ if, elif, else\n',
    hint: {
      th: 'ใช้โครงสร้าง if, elif, elif, else ตามลำดับคะแนนจากมากไปน้อย',
      en: 'Use if, elif, elif, else in descending order of scores.',
    },
    testCases: [
      { input: '85', expectedOutput: 'A' },
      { input: '79', expectedOutput: 'B' },
      { input: '60', expectedOutput: 'C' },
      { input: '45', expectedOutput: 'F' },
    ],
  },
  {
    id: 'ex-4-3',
    lessonId: '4-3',
    moduleId: 4,
    difficulty: 'medium',
    order: 3,
    xpReward: 40,
    title: { th: '3. ปีอธิกสุรทิน (Leap Year)', en: '3. Leap Year Logic' },
    description: {
      th: 'โปรแกรมจะรับปี ค.ศ. เข้ามา จงตรวจสอบว่าเป็นปีอธิกสุรทิน (Leap Year) หรือไม่\nกฎของ Leap Year:\n1. ต้องหารด้วย 4 ลงตัว (`year % 4 == 0`)\n2. แต่ถ้าหารด้วย 100 ลงตัว จะไม่เป็น Leap Year\n3. ยกเว้นว่าปีนั้นหารด้วย 400 ลงตัว จะกลับมาเป็น Leap Year\n\nถ้าเป็นให้พิมพ์ `Leap Year` ถ้าไม่เป็นให้พิมพ์ `Normal Year`',
      en: 'Determine if the input year is a Leap Year.\nRules:\n1. Divisible by 4\n2. BUT NOT divisible by 100\n3. UNLESS divisible by 400.\nPrint `Leap Year` or `Normal Year`.',
    },
    starterCode: 'year = int(input())\n# เขียนเงื่อนไขตรรกศาสตร์ขั้นสูง\n',
    hint: {
      th: 'เงื่อนไขคือ (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)',
      en: 'The condition is (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)',
    },
    testCases: [
      { input: '2024', expectedOutput: 'Leap Year' },
      { input: '2023', expectedOutput: 'Normal Year' },
      { input: '1900', expectedOutput: 'Normal Year' },
      { input: '2000', expectedOutput: 'Leap Year' },
    ],
  },
  {
    id: 'ex-4-4',
    lessonId: '4-4',
    moduleId: 4,
    difficulty: 'hard',
    order: 4,
    xpReward: 50,
    title: { th: '4. ตรวจสอบข้อความว่างเปล่า (Truthy/Falsy)', en: '4. Checking Falsy Values' },
    description: {
      th: 'โปรแกรมจะรับข้อความ 1 บรรทัดผ่าน `input()`\nจงใช้แนวคิด **Truthy / Falsy (ห้ามใช้ == "")**\n- ถ้าผู้ใช้ไม่ได้พิมพ์อะไรเลย (กด Enter เฉยๆ) ให้พิมพ์ว่า `Empty Data`\n- ถ้าพิมพ์ข้อความมา ให้พิมพ์ว่า `Valid Data`',
      en: 'Receive a string input.\nUsing **Truthy/Falsy concepts (DO NOT use == "")**:\n- If it is empty, print `Empty Data`\n- Otherwise, print `Valid Data`',
    },
    starterCode: 'data = input()\n# ห้ามใช้ data == "" นะครับ! ลองใช้ not data ดู\n',
    hint: {
      th: 'if not data: จะเป็นจริงเมื่อ data ว่างเปล่า',
      en: 'if not data: is True when data is empty.',
    },
    testCases: [
      { input: '', expectedOutput: 'Empty Data' },
      { input: 'Hello', expectedOutput: 'Valid Data' },
      { input: ' ', expectedOutput: 'Valid Data' },
    ],
  },
  {
    id: 'ex-4-5',
    moduleId: 4,
    difficulty: 'hard',
    order: 5,
    xpReward: 50,
    title: { th: '5. คัดกรองผู้สมัคร (Nested Logic)', en: '5. Candidate Screening' },
    description: {
      th: 'ผู้สมัครต้องผ่านเงื่อนไขดังนี้ถึงจะรับเข้าทำงาน:\n1. อายุ (`age`) ระหว่าง 22 ถึง 30 ปี (รวม 22 และ 30)\n2. มีประสบการณ์ (`exp`) มากกว่าหรือเท่ากับ 2 ปี **หรือ** จบเกียรตินิยม (`honor` พิมพ์ว่า Yes)\n\nระบบจะส่งค่ามา 3 บรรทัด (age, exp, honor) \nถ้าผ่านเงื่อนไขให้พิมพ์ `Hired` ถ้าไม่ผ่านพิมพ์ `Rejected`',
      en: 'A candidate is hired if:\n1. Age is between 22 and 30 inclusive.\n2. Experience >= 2 years OR honor is "Yes".\nGiven age, exp, honor on 3 lines. Print `Hired` or `Rejected`.',
    },
    starterCode: 'age = int(input())\nexp = int(input())\nhonor = input()\n\n# ใช้ and, or ร่วมกับวงเล็บเพื่อความแม่นยำ\n',
    hint: {
      th: 'if (22 <= age <= 30) and (exp >= 2 or honor == "Yes"):',
      en: 'if (22 <= age <= 30) and (exp >= 2 or honor == "Yes"):',
    },
    testCases: [
      { input: '25\n3\nNo', expectedOutput: 'Hired' },
      { input: '21\n5\nYes', expectedOutput: 'Rejected' },
      { input: '28\n1\nYes', expectedOutput: 'Hired' },
      { input: '28\n1\nNo', expectedOutput: 'Rejected' },
    ],
  }
];
