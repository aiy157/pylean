// src/data/exercises/module3_io_exercises.js
export const exercises3 = [
  {
    id: 'ex-3-1',
    lessonId: '3-1',
    moduleId: 3,
    difficulty: 'easy',
    order: 1,
    xpReward: 30,
    title: { th: '1. Hello, Input!', en: '1. Hello, Input!' },
    description: {
      th: 'โปรแกรมรับชื่อผู้ใช้ผ่าน `input()`\nจงเติมโค้ดเพื่อรับชื่อมาเก็บไว้ในตัวแปร `name` และพิมพ์คำว่า `Hello, [ชื่อผู้ใช้]!`',
      en: 'Receive a name via `input()`. Store it in `name` and print `Hello, [name]!`.',
    },
    starterCode: '# รับชื่อผู้ใช้\nname = input()\n\n# พิมพ์ทักทายโดยใช้ f-string\n',
    hint: {
      th: 'ใช้ f"Hello, {name}!"',
      en: 'Use f"Hello, {name}!"',
    },
    testCases: [
      { input: 'Somchai', expectedOutput: 'Hello, Somchai!' },
      { input: 'Alice', expectedOutput: 'Hello, Alice!' },
    ],
  },
  {
    id: 'ex-3-2',
    lessonId: '3-3',
    moduleId: 3,
    difficulty: 'medium',
    order: 2,
    xpReward: 40,
    title: { th: '2. เครื่องคิดเลขบวกเลข (Type Casting)', en: '2. Addition Calculator' },
    description: {
      th: 'ระบบจะส่งตัวเลขมา 2 ตัว (ทีละบรรทัด)\nจงรับค่าทั้งสองมาแปลงเป็น **จำนวนเต็ม (int)** แล้วนำมาบวกกัน จากนั้นพิมพ์ผลลัพธ์ออกมา',
      en: 'The system inputs two numbers (one per line). Cast them to `int`, add them, and print the result.',
    },
    starterCode: '# รับค่าและแปลงเป็น int\nnum1 = int(input())\nnum2 = int(input())\n\n# คำนวณและแสดงผล\n',
    hint: {
      th: 'เอา num1 + num2 แล้ว print()',
      en: 'Add num1 and num2, then print().',
    },
    testCases: [
      { input: '10\n20', expectedOutput: '30' },
      { input: '55\n45', expectedOutput: '100' },
    ],
  },
  {
    id: 'ex-3-3',
    lessonId: '3-4',
    moduleId: 3,
    difficulty: 'medium',
    order: 3,
    xpReward: 40,
    title: { th: '3. ปัดเศษทศนิยม', en: '3. Rounding Decimals' },
    description: {
      th: 'ระบบจะให้ค่าเงินเป็นทศนิยมมา เช่น `150.5678`\nจงใช้ **f-string** พิมพ์ข้อความ `Price is 150.57 Baht` (แสดงทศนิยม 2 ตำแหน่งเป๊ะๆ)',
      en: 'Given a float input. Use an f-string to print `Price is [value] Baht` with exactly 2 decimal places.',
    },
    starterCode: 'price = float(input())\n# ใช้ f-string แสดงผลลัพธ์\n',
    hint: {
      th: 'ใช้ {price:.2f}',
      en: 'Use {price:.2f}',
    },
    testCases: [
      { input: '150.5678', expectedOutput: 'Price is 150.57 Baht' },
      { input: '99', expectedOutput: 'Price is 99.00 Baht' },
    ],
  },
  {
    id: 'ex-3-4',
    moduleId: 3,
    difficulty: 'hard',
    order: 4,
    xpReward: 50,
    title: { th: '4. จัดหน้าใบเสร็จ (Alignment)', en: '4. Receipt Alignment' },
    description: {
      th: 'จงใช้ฟีเจอร์จัดหน้าของ f-string พิมพ์ข้อความต่อไปนี้ให้อยู่กึ่งกลางโดยมีความกว้าง 10 ตัวอักษรพอดี:\nระบบจะส่งชื่อสินค้ามาให้ พิมพ์ออกไปแบบกึ่งกลาง หุ้มด้วยเครื่องหมาย `|` ซ้ายขวา\nเช่น ถ้ารับ `Pen` ให้แสดง `|   Pen    |`',
      en: 'Center align the input word within a 10-character width, surrounded by `|`. Example: `|   Pen    |`',
    },
    starterCode: 'item = input()\n# พิมพ์ผลลัพธ์จัดกึ่งกลางความกว้าง 10\n',
    hint: {
      th: 'ใช้ {item:^10}',
      en: 'Use {item:^10}',
    },
    testCases: [
      { input: 'Pen', expectedOutput: '|   Pen    |' },
      { input: 'Notebook', expectedOutput: '| Notebook |' },
    ],
  },
  {
    id: 'ex-3-5',
    moduleId: 3,
    difficulty: 'hard',
    order: 5,
    xpReward: 50,
    title: { th: '5. พิมพ์ตัวเลขศูนย์นำหน้า (Zero-Padding)', en: '5. Zero Padding' },
    description: {
      th: 'ระบบจะส่งเลขรหัสพนักงานมา (เช่น 42)\nจงใช้ f-string แปลงให้เป็นเลข 5 หลัก โดยเติม 0 ข้างหน้าให้เต็ม (เช่น `00042`) แล้วพิมพ์รหัสออกมา',
      en: 'Pad the given employee ID with zeros to make it 5 digits long using f-strings (e.g. `00042`).',
    },
    starterCode: 'emp_id = int(input())\n# เติม 0 ให้ครบ 5 หลัก\n',
    hint: {
      th: 'ใช้ {emp_id:05d}',
      en: 'Use {emp_id:05d}',
    },
    testCases: [
      { input: '42', expectedOutput: '00042' },
      { input: '7', expectedOutput: '00007' },
      { input: '10500', expectedOutput: '10500' },
    ],
  },
  {
    id: 'ex-3-6',
    lessonId: '3-2',
    moduleId: 3,
    difficulty: 'expert',
    order: 6,
    xpReward: 70,
    title: { th: '6. ศิลปะแห่ง Escape Character', en: '6. Escape Character Art' },
    description: {
      th: 'จงพิมพ์ข้อความนี้ออกหน้าจอให้เหมือนต้นฉบับเป๊ะๆ (ระวังเครื่องหมายคำพูดและ backslash!)\n\n`Path is: C:\\Users\\Name\\Documents`\n`He said, "Python is awesome!"`\n\n(ต้องพิมพ์ 2 บรรทัด)',
      en: 'Print exactly this text:\nPath is: C:\\Users\\Name\\Documents\nHe said, "Python is awesome!"',
    },
    starterCode: '# พิมพ์ข้อความ 2 บรรทัดนี้ให้เป๊ะที่สุด\n\n',
    hint: {
      th: 'ใช้ \\\\ แทน \\ หนึ่งตัว และ \\" แทน "',
      en: 'Use \\\\ for \\ and \\" for "',
    },
    testCases: [
      { input: '', expectedOutput: 'Path is: C:\\Users\\Name\\Documents\nHe said, "Python is awesome!"' },
    ],
  }
];
