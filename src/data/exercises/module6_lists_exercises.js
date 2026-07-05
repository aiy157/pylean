// src/data/exercises/module6_lists_exercises.js
export const exercises6 = [
  {
    id: 'ex-6-1',
    lessonId: '6-1',
    moduleId: 6,
    difficulty: 'easy',
    order: 1,
    xpReward: 40,
    title: { th: '1. สร้างและเข้าถึงข้อมูล', en: '1. Create and Access' },
    description: {
      th: 'คุณมีกล่องเก็บข้อมูลชื่อ `backpack`\nโปรแกรมจะรับของ 3 อย่าง (รับค่า 3 ครั้งผ่าน `input()`)\nจงเอาของทั้ง 3 อย่างเก็บลงใน List ที่ชื่อว่า `backpack` (ใช้ฟังก์ชัน `append`)\nและจงใช้คำสั่ง `print()` พิมพ์ของชิ้นที่ **2** (ชิ้นตรงกลาง) ออกมา',
      en: 'Receive 3 inputs and `append` them to a list named `backpack`. Then print the **2nd** item (the middle one).',
    },
    starterCode: 'backpack = []\n# ใช้ลูป หรือเขียนรับ 3 ครั้งก็ได้\n\n# พิมพ์ชิ้นที่ 2 ออกมา\n',
    hint: {
      th: 'ของชิ้นที่ 2 จะอยู่ที่ index 1 เสมอ (เพราะเราเริ่มนับ 0, 1, 2)',
      en: 'The 2nd item is at index 1.',
    },
    testCases: [
      { input: 'Map\nSword\nPotion', expectedOutput: 'Sword' },
      { input: 'Book\nPen\nEraser', expectedOutput: 'Pen' },
    ],
  },
  {
    id: 'ex-6-2',
    lessonId: '6-3',
    moduleId: 6,
    difficulty: 'medium',
    order: 2,
    xpReward: 50,
    title: { th: '2. ถอยหลังเข้าคลอง (Slicing)', en: '2. Reverse Slicing' },
    description: {
      th: 'มี List ชื่อ `numbers` เก็บตัวเลขตั้งแต่ 1 ถึง 10 ไว้\nจงใช้ **Slicing \`[::-1]\`** เพื่อพิมพ์ตัวเลขเรียงจากหลังมาหน้า',
      en: 'Given a list `numbers` containing 1 to 10. Use **Slicing \`[::-1]\`** to print the list in reverse order.',
    },
    starterCode: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# ห้ามใช้ลูป! จงใช้ Slicing พิมพ์ตัวเลขถอยหลัง\n',
    hint: {
      th: 'ใช้ print(numbers[::-1])',
      en: 'Use print(numbers[::-1])',
    },
    testCases: [
      { input: '', expectedOutput: '[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]' },
    ],
  },
  {
    id: 'ex-6-3',
    lessonId: '6-2',
    moduleId: 6,
    difficulty: 'medium',
    order: 3,
    xpReward: 50,
    title: { th: '3. ตามล่าหาของ (Remove & Pop)', en: '3. Remove and Pop' },
    description: {
      th: 'ในกระเป๋าคุณมีของดังนี้: `items = ["Gold", "Poison", "Map", "Poison", "Sword"]`\n\n1. จงใช้ฟังก์ชัน `remove("Poison")` เพื่อทิ้งยาพิษขวดแรก\n2. จงใช้ฟังก์ชัน `pop(0)` เพื่อทิ้งของชิ้นแรกสุด (Gold)\n3. พิมพ์ `items` ปัจจุบันออกมา',
      en: 'Given `items = ["Gold", "Poison", "Map", "Poison", "Sword"]`.\n1. `remove("Poison")` (removes the first one).\n2. `pop(0)` to remove the first item.\n3. Print the resulting list.',
    },
    starterCode: 'items = ["Gold", "Poison", "Map", "Poison", "Sword"]\n# เขียนคำสั่งลบข้อมูล\n\nprint(items)\n',
    hint: {
      th: 'คำสั่ง remove จะลบแค่ตัวแรกที่เจอเท่านั้น',
      en: 'remove() only deletes the first matching element.',
    },
    testCases: [
      { input: '', expectedOutput: "['Map', 'Poison', 'Sword']" },
    ],
  },
  {
    id: 'ex-6-4',
    lessonId: '6-4',
    moduleId: 6,
    difficulty: 'hard',
    order: 4,
    xpReward: 60,
    title: { th: '4. เวทมนตร์ 1 บรรทัด (List Comp)', en: '4. List Comprehension' },
    description: {
      th: 'คุณมี List `nums = [1, 2, 3, 4, 5]`\nจงใช้ **List Comprehension** สร้าง List ใหม่ชื่อ `result` โดยดึงเฉพาะ **เลขคี่** แล้วนำมายกกำลังสาม\nตัวอย่าง: เลข 3 เป็นเลขคี่ -> ยกกำลังสามได้ 27\nจงพิมพ์ตัวแปร `result` ออกมา (บังคับเขียน 1 บรรทัด)',
      en: 'Given `nums = [1, 2, 3, 4, 5]`. Use **List Comprehension** to create a new list `result` containing the cube of ONLY the ODD numbers. Print `result`.',
    },
    starterCode: 'nums = [1, 2, 3, 4, 5]\n# ใช้ List Comprehension ตรงนี้\nresult = \n\nprint(result)\n',
    hint: {
      th: 'result = [x ** 3 for x in nums if x % 2 != 0]',
      en: 'result = [x ** 3 for x in nums if x % 2 != 0]',
    },
    testCases: [
      { input: '', expectedOutput: '[1, 27, 125]' },
    ],
  },
  {
    id: 'ex-6-5',
    lessonId: '6-5',
    moduleId: 6,
    difficulty: 'expert',
    order: 5,
    xpReward: 80,
    title: { th: '5. พิสูจน์อาถรรพ์ (Shallow Copy)', en: '5. Proving the Shallow Copy' },
    description: {
      th: 'พนักงานคนก่อนเขียนโค้ดเพื่อคัดลอกตารางคะแนน (2D Matrix) ดังนี้:\n`a = [[1, 2], [3, 4]]`\n`b = a.copy()`\n\nคุณจงทำการเปลี่ยนค่าคะแนน `1` ในตัวแปร `b` (ซึ่งอยู่ที่ตำแหน่ง `b[0][0]`) ให้กลายเป็น `99`\nจากนั้นพิมพ์ค่าตัวแปร `a` (ย้ำ! พิมพ์ตัวแปร a) ออกมา เพื่อพิสูจน์ให้พนักงานคนนั้นเห็นว่า Shallow copy ทำ Matrix พัง!',
      en: '`a = [[1, 2], [3, 4]]`\n`b = a.copy()`\nChange `b[0][0]` to `99`. Print `a` to prove that modifying `b` affects `a` in a 2D list with Shallow Copy!',
    },
    starterCode: 'a = [[1, 2], [3, 4]]\nb = a.copy()\n\n# แก้ไขค่า b ที่ตำแหน่ง [0][0] ให้เป็น 99\n\n\n# พิมพ์ a ออกมา\nprint(a)\n',
    hint: {
      th: 'เพียงแค่สั่ง b[0][0] = 99 แล้วรันเลย คุณจะเห็นความหายนะของ Shallow copy!',
      en: 'Assign b[0][0] = 99 and run.',
    },
    testCases: [
      { input: '', expectedOutput: '[[99, 2], [3, 4]]' },
    ],
  },
  {
    id: 'ex-6-6',
    lessonId: '6-6',
    moduleId: 6,
    difficulty: 'easy',
    order: 6,
    xpReward: 40,
    title: { th: '6. จัดเรียงข้อมูล', en: '6. Sorting Data' },
    description: {
      th: 'โปรแกรมจะรับตัวเลข 5 ตัว (คั่นด้วยช่องว่าง)\nจงเก็บลงใน List แล้วใช้คำสั่งจัดเรียงข้อมูลจากน้อยไปมาก จากนั้นพิมพ์ List ออกมา',
      en: 'Read 5 numbers separated by spaces into a List. Sort it in ascending order and print the List.',
    },
    starterCode: 'nums = list(map(int, input().split()))\n# จัดเรียง nums แล้วพิมพ์ออกมา\n',
    hint: {
      th: 'ใช้ nums.sort() แล้วค่อย print(nums)',
      en: 'Use nums.sort() then print(nums)',
    },
    testCases: [
      { input: '50 20 10 40 30', expectedOutput: '[10, 20, 30, 40, 50]' },
      { input: '9 1 8 2 7', expectedOutput: '[1, 2, 7, 8, 9]' },
    ],
  }
];
