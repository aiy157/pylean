// src/data/exercises/module7_functions_exercises.js
export const exercises7 = [
  {
    id: 'ex-7-1',
    lessonId: '7-1',
    moduleId: 7,
    difficulty: 'easy',
    order: 1,
    xpReward: 40,
    title: { th: '1. ฟังก์ชันกำลังสอง', en: '1. Square Function' },
    description: {
      th: 'สร้างฟังก์ชัน `square(n)` ที่รับตัวเลข `n` เข้ามาแล้ว **คืนค่า (return)** ผลลัพธ์ของ n ยกกำลังสอง\nจากนั้นรับ n จากผู้ใช้ แล้วพิมพ์ผลลัพธ์',
      en: 'Create a function `square(n)` that returns n². Read n from user and print the result.',
    },
    starterCode: 'def square(n):\n    # เขียนฟังก์ชันที่นี่\n    pass\n\nn = int(input())\nprint(square(n))\n',
    hint: {
      th: 'return n ** 2 หรือ return n * n',
      en: 'return n ** 2 or return n * n',
    },
    testCases: [
      { input: '7', expectedOutput: '49' },
      { input: '5', expectedOutput: '25' },
      { input: '0', expectedOutput: '0' },
    ],
  },
  {
    id: 'ex-7-2',
    lessonId: '7-1',
    moduleId: 7,
    difficulty: 'medium',
    order: 2,
    xpReward: 50,
    title: { th: '2. ฟังก์ชัน Default Parameter', en: '2. Default Parameter Function' },
    description: {
      th: 'สร้างฟังก์ชัน `power(base, exp=2)` ที่ยกกำลัง\n- ถ้าส่ง exp มา ให้ยกกำลังตามค่านั้น\n- ถ้าไม่ส่ง exp มา ให้ยกกำลังสอง (ค่า default)\n\nโปรแกรมจะรับ 1 หรือ 2 ตัวเลข (คั่นด้วยช่องว่าง)\n- ถ้ารับ 1 ตัว → เรียก power(base)\n- ถ้ารับ 2 ตัว → เรียก power(base, exp)',
      en: 'Create `power(base, exp=2)`. If exp is given, use it. Otherwise default to squaring.',
    },
    starterCode: 'def power(base, exp=2):\n    # เขียนฟังก์ชันที่นี่\n    pass\n\nparts = input().split()\nif len(parts) == 1:\n    print(power(int(parts[0])))\nelse:\n    print(power(int(parts[0]), int(parts[1])))\n',
    hint: {
      th: 'return base ** exp',
      en: 'return base ** exp',
    },
    testCases: [
      { input: '3', expectedOutput: '9' },
      { input: '2 10', expectedOutput: '1024' },
      { input: '5 3', expectedOutput: '125' },
    ],
  },
  {
    id: 'ex-7-3',
    lessonId: '7-2',
    moduleId: 7,
    difficulty: 'medium',
    order: 3,
    xpReward: 50,
    title: { th: '3. *args บวกเลขไม่จำกัด', en: '3. *args Sum' },
    description: {
      th: 'สร้างฟังก์ชัน `add_all(*numbers)` ที่รับตัวเลขกี่ตัวก็ได้ แล้วคืนค่าผลรวมทั้งหมด\nโปรแกรมจะรับตัวเลขในบรรทัดเดียว คั่นด้วยช่องว่าง',
      en: 'Create `add_all(*numbers)` that accepts any number of arguments and returns their sum.',
    },
    starterCode: 'def add_all(*numbers):\n    # เขียนฟังก์ชันที่นี่\n    pass\n\nnums = list(map(int, input().split()))\nprint(add_all(*nums))\n',
    hint: {
      th: 'วนลูปบวกค่า หรือใช้ sum(numbers)',
      en: 'Loop and accumulate, or use sum(numbers)',
    },
    testCases: [
      { input: '1 2 3', expectedOutput: '6' },
      { input: '10 20 30 40', expectedOutput: '100' },
      { input: '5', expectedOutput: '5' },
    ],
  },
  {
    id: 'ex-7-4',
    lessonId: '7-3',
    moduleId: 7,
    difficulty: 'medium',
    order: 4,
    xpReward: 60,
    title: { th: '4. FizzBuzz Function', en: '4. FizzBuzz Function' },
    description: {
      th: 'สร้างฟังก์ชัน `fizzbuzz(n)` ที่:\n- ถ้า n หารด้วย 3 และ 5 ลงตัว → คืน "FizzBuzz"\n- ถ้า n หารด้วย 3 ลงตัว → คืน "Fizz"\n- ถ้า n หารด้วย 5 ลงตัว → คืน "Buzz"\n- นอกนั้น → คืนตัวเลขนั้นเป็น string\n\nรับค่า N แล้วพิมพ์ fizzbuzz() ของทุกตัว 1 ถึง N',
      en: 'Create fizzbuzz(n): div by 3&5 → "FizzBuzz", div by 3 → "Fizz", div by 5 → "Buzz", else → str(n). Print for 1 to N.',
    },
    starterCode: 'def fizzbuzz(n):\n    # เขียนฟังก์ชันที่นี่\n    pass\n\nN = int(input())\nfor i in range(1, N+1):\n    print(fizzbuzz(i))\n',
    hint: {
      th: 'ตรวจ n % 15 == 0 ก่อน (FizzBuzz) แล้วค่อย % 3, % 5',
      en: 'Check n % 15 == 0 first, then % 3, then % 5',
    },
    testCases: [
      { input: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
      { input: '5', expectedOutput: '1\n2\nFizz\n4\nBuzz' },
    ],
  },
  {
    id: 'ex-7-5',
    lessonId: '7-4',
    moduleId: 7,
    difficulty: 'hard',
    order: 5,
    xpReward: 70,
    title: { th: '5. Recursive Factorial', en: '5. Recursive Factorial' },
    description: {
      th: 'สร้างฟังก์ชัน `factorial(n)` ที่คำนวณ n! โดยใช้ **Recursion เท่านั้น** (ห้ามใช้ loop!)\n- Base Case: 0! = 1\n- Recursive Case: n! = n × (n-1)!',
      en: 'Create `factorial(n)` using **Recursion only** (no loops!).\nBase: 0! = 1. Recursive: n! = n × (n-1)!',
    },
    starterCode: 'def factorial(n):\n    # Base case?\n    # Recursive case?\n    pass\n\nn = int(input())\nprint(factorial(n))\n',
    hint: {
      th: 'if n == 0: return 1 แล้ว return n * factorial(n - 1)',
      en: 'if n == 0: return 1, then return n * factorial(n - 1)',
    },
    testCases: [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1' },
      { input: '10', expectedOutput: '3628800' },
    ],
  },
  {
    id: 'ex-7-6',
    lessonId: '7-5',
    moduleId: 7,
    difficulty: 'hard',
    order: 6,
    xpReward: 80,
    title: { th: '6. ฟังก์ชัน Palindrome', en: '6. Palindrome Checker' },
    description: {
      th: 'สร้างฟังก์ชัน `is_palindrome(text)` ที่ตรวจสอบว่าข้อความอ่านกลับแล้วเหมือนเดิมหรือไม่ (ไม่สนตัวพิมพ์ใหญ่-เล็ก)\nคืนค่า `True` หรือ `False`',
      en: 'Create `is_palindrome(text)` that checks if text reads the same backward (case-insensitive). Return True or False.',
    },
    starterCode: 'def is_palindrome(text):\n    # เขียนฟังก์ชันที่นี่\n    pass\n\ntext = input()\nprint(is_palindrome(text))\n',
    hint: {
      th: 'แปลงเป็น lower() แล้วเทียบกับ text[::-1]',
      en: 'Convert to lower() then compare with text[::-1]',
    },
    testCases: [
      { input: 'racecar', expectedOutput: 'True' },
      { input: 'hello', expectedOutput: 'False' },
      { input: 'LEVEL', expectedOutput: 'True' },
    ],
  },
  {
    id: 'ex-7-7',
    lessonId: '7-6',
    moduleId: 7,
    difficulty: 'expert',
    order: 7,
    xpReward: 90,
    title: { th: '7. Lambda + Sorted', en: '7. Lambda + Sorted' },
    description: {
      th: 'คุณมีรายชื่อนักศึกษาพร้อมคะแนน (คั่นด้วย `,`)\nรับข้อมูลมา n บรรทัด แต่ละบรรทัดเป็น `ชื่อ,คะแนน`\nจงใช้ `sorted()` ร่วมกับ `lambda` เรียงจากคะแนนน้อยไปมาก แล้วพิมพ์ชื่อเรียงตามลำดับ',
      en: 'Read n lines of `name,score`. Use `sorted()` with `lambda` to sort by score ascending, then print names in order.',
    },
    starterCode: 'n = int(input())\nstudents = []\nfor _ in range(n):\n    line = input().split(",")\n    students.append((line[0], int(line[1])))\n\n# ใช้ sorted + lambda เรียงตามคะแนน\n\n',
    hint: {
      th: 'sorted(students, key=lambda s: s[1]) แล้ววนลูปพิมพ์ชื่อ',
      en: 'sorted(students, key=lambda s: s[1]) then loop to print names',
    },
    testCases: [
      { input: '3\nAlice,85\nBob,92\nCharlie,78', expectedOutput: 'Charlie\nAlice\nBob' },
    ],
  }
];
