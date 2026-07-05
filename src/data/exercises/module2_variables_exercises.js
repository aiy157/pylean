// src/data/exercises/module2_variables_exercises.js
export const exercises2 = [
  {
    id: 'ex-2-1',
    lessonId: '2-1',
    moduleId: 2,
    difficulty: 'easy',
    order: 1,
    xpReward: 30,
    title: { th: 'ตัวแปรป้ายชื่อ (Variable Assignment)', en: 'Variable Assignment' },
    description: {
      th: 'สร้างตัวแปรชื่อ `my_name` เก็บข้อความ "สมชาย" และ `my_age` เก็บตัวเลข 20 จากนั้นใช้คำสั่ง `print(my_name, my_age)`',
      en: 'Create a variable `my_name` storing "สมชาย", and `my_age` storing 20. Then print them using `print(my_name, my_age)`.',
    },
    starterCode: '# กำหนดค่าตัวแปรด้านล่าง\nmy_name = \nmy_age = \n\n# พิมพ์ผลลัพธ์\nprint(my_name, my_age)\n',
    hint: {
      th: 'ข้อความต้องอยู่ในเครื่องหมาย "" ส่วนตัวเลขพิมพ์ลงไปได้เลย',
      en: 'Strings must be in quotes, integers do not.',
    },
    testCases: [
      { input: '', expectedOutput: 'สมชาย 20' },
    ],
  },
  {
    id: 'ex-2-2',
    lessonId: '2-2',
    moduleId: 2,
    difficulty: 'easy',
    order: 2,
    xpReward: 30,
    title: { th: 'ตรวจสอบชนิดข้อมูล', en: 'Checking Data Types' },
    description: {
      th: 'กำหนดให้ตัวแปร `mystery = "555.5"` (เป็นข้อความ)\nจงพิมพ์ชนิดข้อมูล (Type) ของตัวแปร `mystery` ออกมาทางหน้าจอ',
      en: 'Given `mystery = "555.5"`. Print the data type of the variable `mystery`.',
    },
    starterCode: 'mystery = "555.5"\n# เขียนคำสั่งตรวจสอบและพิมพ์ชนิดข้อมูลที่นี่\n\n',
    hint: {
      th: 'ใช้คำสั่ง print(type(ตัวแปร))',
      en: 'Use print(type(variable))',
    },
    testCases: [
      { input: '', expectedOutput: "<class 'str'>" },
    ],
  },
  {
    id: 'ex-2-3',
    lessonId: '2-4',
    moduleId: 2,
    difficulty: 'medium',
    order: 3,
    xpReward: 40,
    title: { th: 'Type Casting โหดๆ', en: 'Hardcore Type Casting' },
    description: {
      th: 'คุณได้ตัวเลขทศนิยมในรูปแบบข้อความ `data = "99.99"`\nจงแปลงข้อมูลนี้ให้กลายเป็น **จำนวนเต็ม (Integer)** แล้วเก็บในตัวแปร `result` และ print ค่า `result` ออกมา (ผลลัพธ์ต้องเป็น 99)\n\n*ข้อควรระวัง:* คุณไม่สามารถแปลงข้อความทศนิยมเป็น int ตรงๆ ได้ ต้องแปลงเป็น float ก่อน!',
      en: 'You have `data = "99.99"`. Convert it to an Integer and store it in `result`, then print it. Note: You cannot cast a float-string directly to int!',
    },
    starterCode: 'data = "99.99"\n# แปลงร่างข้อมูลที่นี่\n\nprint(result)\n',
    hint: {
      th: 'แปลง `data` เป็น `float()` ก่อน แล้วค่อยครอบด้วย `int()` อีกที',
      en: 'Cast it to float() first, then to int().',
    },
    testCases: [
      { input: '', expectedOutput: '99' },
    ],
  },
  {
    id: 'ex-2-4',
    lessonId: '2-3',
    moduleId: 2,
    difficulty: 'hard',
    order: 4,
    xpReward: 50,
    title: { th: 'พิสูจน์ระบบ Caching ของ Python', en: 'Proving Python Caching' },
    description: {
      th: 'สร้างตัวแปร `a = 256` และ `b = 256`\nจากนั้นสร้างตัวแปร `c = 257` และ `d = 257`\n\nจงพิมพ์ผลลัพธ์การเปรียบเทียบ ID ของตัวแปรทั้งสองคู่\nให้ `print(id(a) == id(b))` ในบรรทัดแรก และ `print(id(c) == id(d))` ในบรรทัดที่สอง',
      en: 'Create `a=256`, `b=256`, `c=257`, `d=257`. Print `id(a) == id(b)` on line 1, and `id(c) == id(d)` on line 2.',
    },
    starterCode: 'a = 256\nb = 256\nc = 257\nd = 257\n\n# พิมพ์ผลลัพธ์การเปรียบเทียบ\n',
    hint: {
      th: 'Python บันทึกค่า 0-256 ไว้ใน RAM เดียวกัน แต่ถ้าเกินนั้นจะสร้างใหม่',
      en: 'Python caches 0-256 in memory.',
    },
    testCases: [
      { input: '', expectedOutput: 'True\nFalse' },
    ],
  },
  {
    id: 'ex-2-5',
    lessonId: '2-5',
    moduleId: 2,
    difficulty: 'easy',
    order: 5,
    xpReward: 30,
    title: { th: 'สร้างประโยคด้วย f-string', en: 'Building Sentences with f-strings' },
    description: {
      th: 'กำหนดให้ `fruit = "มะม่วง"` และ `price = 45`\nจงใช้ f-string พิมพ์ข้อความ `มะม่วง ราคา 45 บาท` ออกมา\n\nตัวอย่าง f-string: `f"{ตัวแปร} ข้อความ"`',
      en: 'Given `fruit = "มะม่วง"` and `price = 45`. Use an f-string to print: `มะม่วง ราคา 45 บาท`',
    },
    starterCode: 'fruit = "มะม่วง"\nprice = 45\n\n# ใช้ f-string พิมพ์ข้อความ\n',
    hint: {
      th: 'ใช้ print(f"{fruit} ราคา {price} บาท")',
      en: 'Use print(f"{fruit} ราคา {price} บาท")',
    },
    testCases: [
      { input: '', expectedOutput: 'มะม่วง ราคา 45 บาท' },
    ],
  },
  {
    id: 'ex-2-6',
    moduleId: 2,
    difficulty: 'medium',
    order: 6,
    xpReward: 40,
    title: { th: 'รับข้อมูลแล้วแปลงร่าง', en: 'Input and Type Conversion' },
    description: {
      th: 'เขียนโปรแกรมรับค่าตัวเลขจำนวนเต็มจาก input() 2 ตัว (ทีละบรรทัด) แล้วพิมพ์ผลรวมออกมา\n\nตัวอย่าง: ถ้าใส่ 10 และ 25 ผลลัพธ์คือ 35',
      en: 'Write a program that reads two integers from input() (one per line) and prints their sum.\n\nExample: if inputs are 10 and 25, output is 35',
    },
    starterCode: '# รับค่าตัวเลขสองตัว แปลงเป็น int แล้วพิมพ์ผลรวม\n',
    hint: {
      th: 'ใช้ int(input()) เพื่อรับค่าและแปลงเป็นจำนวนเต็มพร้อมกัน',
      en: 'Use int(input()) to read and convert to integer in one step.',
    },
    testCases: [
      { input: '10\n25', expectedOutput: '35' },
      { input: '0\n-5', expectedOutput: '-5' },
    ],
  },
  {
    id: 'ex-2-7',
    moduleId: 2,
    difficulty: 'medium',
    order: 7,
    xpReward: 50,
    title: { th: 'ตัวดำเนินการลัดมือ', en: 'Augmented Assignment Operators' },
    description: {
      th: `จง Trace โค้ดนี้แล้วพิมพ์ผลลัพธ์:
x = 10
y = 3
x += y
y *= 2
x -= y
x //= 2
print(x, y)`,
      en: `Trace this code and print the output:
x = 10
y = 3
x += y
y *= 2
x -= y
x //= 2
print(x, y)`,
    },
    starterCode: '# Trace โค้ดข้างบนทีละบรรทัดแล้วพิมพ์คำตอบ\nprint("")\n',
    hint: {
      th: 'x=10→x+=3→x=13→y*=2→y=6→x-=6→x=7→x//=2→x=3 (หารจำนวนเต็ม)',
      en: 'x=10→x+=3=13→y*=2=6→x-=6=7→x//=2=3 (integer division)',
    },
    testCases: [
      { input: '', expectedOutput: '3 6' },
    ],
  },
  {
    id: 'ex-2-8',
    moduleId: 2,
    difficulty: 'hard',
    order: 8,
    xpReward: 60,
    title: { th: 'ประกอบร่างข้อมูล', en: 'Data Assembly Challenge' },
    description: {
      th: `กำหนดให้:
first = "3"
second = "7"

จงเขียนโปรแกรมที่:
1. ต่อ first กับ second เป็นข้อความ → แสดง "37"
2. บวก first กับ second เป็นตัวเลข → แสดง 10
3. แสดงชนิดข้อมูลของ first → แสดง <class 'str'>

พิมพ์ทั้ง 3 บรรทัดตามลำดับ`,
      en: `Given:
first = "3"
second = "7"

Write a program that:
1. Concatenates first and second as strings → shows "37"
2. Adds first and second as numbers → shows 10
3. Shows the type of first → shows <class 'str'>

Print all 3 lines in order.`,
    },
    starterCode: 'first = "3"\nsecond = "7"\n\n# บรรทัดที่ 1: ต่อข้อความ\n\n# บรรทัดที่ 2: บวกเลข\n\n# บรรทัดที่ 3: แสดงชนิดข้อมูล\n',
    hint: {
      th: 'บรรทัดที่ 1 ใช้ + ต่อ string ตรงๆ, บรรทัดที่ 2 ต้อง int() ก่อนบวก, บรรทัดที่ 3 ใช้ type()',
      en: 'Line 1: use + on strings directly. Line 2: cast to int() first. Line 3: use type().',
    },
    testCases: [
      { input: '', expectedOutput: "37\n10\n<class 'str'>" },
    ],
  }
];
