// src/data/exercises/module5_loops_exercises.js
export const exercises5 = [
  {
    id: 'ex-5-1',
    lessonId: '5-1',
    moduleId: 5,
    difficulty: 'easy',
    order: 1,
    xpReward: 30,
    title: { th: '1. While Loop นับถอยหลัง', en: '1. While Countdown' },
    description: {
      th: 'ระบบจะให้ตัวเลข `n` มา จงใช้ `while` loop นับถอยหลังและพิมพ์ค่า `n` ลงไปเรื่อยๆ จนถึง 1\nเมื่อนับเสร็จแล้ว (ออกจากลูป) ให้พิมพ์ว่า `Blastoff!`',
      en: 'Given `n`. Use a `while` loop to print `n` down to 1. After the loop finishes, print `Blastoff!`.',
    },
    starterCode: 'n = int(input())\n# เขียน while loop ที่นี่\n',
    hint: {
      th: 'while n >= 1: แล้วอย่าลืม n = n - 1 ในลูป',
      en: 'while n >= 1: and don\'t forget n = n - 1',
    },
    testCases: [
      { input: '3', expectedOutput: '3\n2\n1\nBlastoff!' },
      { input: '5', expectedOutput: '5\n4\n3\n2\n1\nBlastoff!' },
    ],
  },
  {
    id: 'ex-5-2',
    lessonId: '5-2',
    moduleId: 5,
    difficulty: 'medium',
    order: 2,
    xpReward: 40,
    title: { th: '2. สูตรคูณมหาลัย (For Loop)', en: '2. Multiplication Table' },
    description: {
      th: 'โปรแกรมจะรับแม่สูตรคูณ `m`\nจงใช้ `for` loop และ `range()` พิมพ์แม่สูตรคูณตั้งแต่ `m x 1` จนถึง `m x 12`\nรูปแบบ: `5 x 1 = 5`',
      en: 'Given `m`, use a `for` loop to print its multiplication table from 1 to 12. Format: `5 x 1 = 5`',
    },
    starterCode: 'm = int(input())\n# ใช้ for loop กับ range\n',
    hint: {
      th: 'for i in range(1, 13): และใช้ f-string ช่วยพิมพ์',
      en: 'for i in range(1, 13): and use f-string.',
    },
    testCases: [
      { input: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n5 x 11 = 55\n5 x 12 = 60' },
    ],
  },
  {
    id: 'ex-5-3',
    lessonId: '5-3',
    moduleId: 5,
    difficulty: 'medium',
    order: 3,
    xpReward: 40,
    title: { th: '3. ข้ามเลขอาถรรพ์ (Continue)', en: '3. Skip the Unlucky Number' },
    description: {
      th: 'โปรแกรมจะรับตัวเลข `target` มา\nจงใช้ `for` loop พิมพ์เลขตั้งแต่ 1 ถึง `target`\n**แต่!!** ถ้าตัวเลขนั้นหารด้วย 3 ลงตัว ให้ใช้คำสั่ง `continue` ข้ามไปเลย ห้ามพิมพ์ออกมา!',
      en: 'Given `target`. Loop from 1 to `target`. If the number is divisible by 3, `continue` (skip printing it).',
    },
    starterCode: 'target = int(input())\n# เขียนลูปและเงื่อนไข\n',
    hint: {
      th: 'if i % 3 == 0: ให้ continue',
      en: 'if i % 3 == 0: continue',
    },
    testCases: [
      { input: '5', expectedOutput: '1\n2\n4\n5' },
      { input: '10', expectedOutput: '1\n2\n4\n5\n7\n8\n10' },
    ],
  },
  {
    id: 'ex-5-4',
    lessonId: '5-4',
    moduleId: 5,
    difficulty: 'hard',
    order: 4,
    xpReward: 50,
    title: { th: '4. ค้นหาสายลับ (Loop Else)', en: '4. Spy Hunt (Loop Else)' },
    description: {
      th: 'คุณมีกล่องรหัสลับ 5 กล่อง โปรแกรมจะจำลองให้รับเลข 5 ครั้ง (ผ่านลูป)\nถ้าเจอเลข `007` ระหว่างทาง ให้พิมพ์ว่า `Spy Found!` แล้วออกจากลูปทันที (`break`)\nแต่ถ้ารับครบ 5 ตัวแล้วไม่เจอ `007` เลย ให้พิมพ์ว่า `Clear` (บังคับให้ใช้บล็อก `else` ของลูป ห้ามใช้ตัวแปรแบบ flag!)',
      en: 'Loop 5 times to input numbers. If you find `007`, print `Spy Found!` and `break`. If the loop finishes without finding it, print `Clear` (You MUST use loop `else`, no flag variables).',
    },
    starterCode: 'for i in range(5):\n    code = input()\n    # ถ้าเจอ 007 ให้พิมพ์และ break\n\n# ใช้ block else ตรงนี้\n',
    hint: {
      th: 'ลูป else จะวางเยื้องตรงกับ for และมันจะทำงานก็ต่อเมื่อไม่โดน break ถีบออกมา',
      en: 'The else block aligns with the for loop.',
    },
    testCases: [
      { input: '123\n456\n007\n888\n999', expectedOutput: 'Spy Found!' },
      { input: '111\n222\n333\n444\n555', expectedOutput: 'Clear' },
    ],
  },
  {
    id: 'ex-5-5',
    moduleId: 5,
    difficulty: 'expert',
    order: 5,
    xpReward: 60,
    title: { th: '5. พีระมิดซ้อนลูป (Nested Loops)', en: '5. Nested Loop Pyramid' },
    description: {
      th: 'นี่คือโจทย์ระดับตำนานของนักศึกษาวิทยาการคอมพิวเตอร์\nรับค่าความสูง `h` และจงวาดรูปสามเหลี่ยมมุมฉากด้วย `*` (ดาวและช่องว่าง 1 เคาะ)\nตัวอย่างถ้ารับ `3`:\n* \n* * \n* * *',
      en: 'Receive height `h`. Draw a right triangle using `* ` (star and space).\nExample for `3`:\n* \n* * \n* * * ',
    },
    starterCode: 'h = int(input())\n# ใช้ลูปซ้อนลูป (ลูปนอกนับแถว, ลูปในพิมพ์ดาว)\n',
    hint: {
      th: 'ลูปนอก i รันจาก 1 ถึง h, ลูปใน j รันจาก 0 ถึง i',
      en: 'Outer loop 1 to h. Inner loop prints `* ` i times.',
    },
    testCases: [
      { input: '3', expectedOutput: '* \n* * \n* * * ' },
      { input: '4', expectedOutput: '* \n* * \n* * * \n* * * * ' },
    ],
  }
];
