// src/data/exercises/module1_flowchart_exercises.js
export const exercises1 = [
  {
    id: 'ex-1-1',
    lessonId: '1-5',
    moduleId: 1,
    difficulty: 'easy',
    order: 1,
    xpReward: 30,
    title: { th: '1. ตรรกะพื้นฐาน', en: '1. Basic Logic' },
    description: {
      th: `จง Trace อัลกอริทึมนี้ในกระดาษ (Desk Checking):
1. SET x = 5
2. SET y = 2
3. WHILE x > y DO
4.   SET x = x - 1
5.   SET y = y + 1
6. ENDWHILE

เมื่อรันจบแล้ว จงใช้คำสั่ง \`print()\` พิมพ์ค่าสุดท้ายของ x และ y ออกมา โดยคั่นด้วยช่องว่าง`,
      en: `Trace this algorithm (Desk Checking):
1. SET x = 5
2. SET y = 2
3. WHILE x > y DO
4.   SET x = x - 1
5.   SET y = y + 1
6. ENDWHILE

Once finished, use the \`print()\` command to output the final values of x and y, separated by a space.`,
    },
    starterCode: '# พิมพ์คำตอบที่ได้จากการ Trace โค้ด\nprint("")\n',
    hint: {
      th: 'รอบแรก x=5, y=2 (เงื่อนไข 5>2 เป็นจริง) -> จะได้ x=4, y=3. ลองทำต่ออีกรอบสิว่าลูปจะหยุดทำงานตอนไหน?',
      en: 'First round x=5, y=2 (5>2 is true) -> x becomes 4, y becomes 3. Try one more round to see when the loop stops.',
    },
    testCases: [
      { input: '', expectedOutput: '3 4' },
    ],
  },
  {
    id: 'ex-1-2',
    moduleId: 1,
    difficulty: 'easy',
    order: 2,
    xpReward: 30,
    title: { th: '2. ถอดรหัสตรรกะ', en: '2. Logic Decoding' },
    description: {
      th: `จง Trace อัลกอริทึมนี้ในกระดาษ:
1. SET A = 10
2. SET B = 5
3. SET C = A + B
4. SET A = C - B
5. SET B = C - A
จงพิมพ์ค่าสุดท้ายของ A, B, C โดยคั่นด้วยช่องว่าง`,
      en: `Trace this algorithm:
1. SET A = 10
2. SET B = 5
3. SET C = A + B
4. SET A = C - B
5. SET B = C - A
Print the final values of A, B, and C separated by spaces.`,
    },
    starterCode: '# พิมพ์คำตอบที่ได้จากการ Trace โค้ด\nprint("")\n',
    hint: {
      th: 'ลองทำทีละบรรทัด บรรทัดที่ 4 A จะกลายเป็น 15 - 5 = 10... อ้าว! มันคือการสลับค่า (Swap) หรือเปล่านะ?',
      en: 'Line 4 makes A = 15 - 5. This is actually a swapping algorithm without a temp variable!',
    },
    testCases: [
      { input: '', expectedOutput: '5 10 15' },
    ],
  },
  {
    id: 'ex-1-3',
    moduleId: 1,
    difficulty: 'medium',
    order: 3,
    xpReward: 40,
    title: { th: '3. ลูปเวียนหัว', en: '3. Dizzy Loop' },
    description: {
      th: `จง Trace อัลกอริทึมนี้:
1. SET N = 3
2. SET SUM = 0
3. WHILE N > 0 DO
4.   SET SUM = SUM + N
5.   SET N = N - 1
6. ENDWHILE
จงพิมพ์ค่าสุดท้ายของ SUM`,
      en: `Trace this algorithm:
1. SET N = 3
2. SET SUM = 0
3. WHILE N > 0 DO
4.   SET SUM = SUM + N
5.   SET N = N - 1
6. ENDWHILE
Print the final value of SUM.`,
    },
    starterCode: 'print("")\n',
    hint: {
      th: 'รอบที่ 1: SUM=3, รอบที่ 2: SUM=3+2=5...',
      en: 'Round 1: SUM=3, Round 2: SUM=3+2=5...',
    },
    testCases: [
      { input: '', expectedOutput: '6' },
    ],
  },
  {
    id: 'ex-1-4',
    moduleId: 1,
    difficulty: 'medium',
    order: 4,
    xpReward: 40,
    title: { th: '4. ทางแยกของตรรกะ', en: '4. Logic Crossroads' },
    description: {
      th: `จง Trace อัลกอริทึมนี้:
1. SET X = 15
2. SET Y = 20
3. IF X > Y THEN
4.   SET Z = X - Y
5. ELSE
6.   SET Z = Y - X
7. ENDIF
8. SET Z = Z * 2
จงพิมพ์ค่าสุดท้ายของ Z`,
      en: `Trace this algorithm:
1. SET X = 15
2. SET Y = 20
3. IF X > Y THEN
4.   SET Z = X - Y
5. ELSE
6.   SET Z = Y - X
7. ENDIF
8. SET Z = Z * 2
Print the final value of Z.`,
    },
    starterCode: '# Trace อัลกอริทึมแล้วพิมพ์คำตอบ\nprint("")\n',
    hint: {
      th: 'X=15 ไม่มากกว่า Y=20 ดังนั้นจะเข้า ELSE → Z = 20-15 = 5 แล้ว Z = 5*2',
      en: 'X=15 is NOT > Y=20, so ELSE branch runs → Z = 20-15 = 5, then Z = 5*2',
    },
    testCases: [
      { input: '', expectedOutput: '10' },
    ],
  },
  {
    id: 'ex-1-5',
    moduleId: 1,
    difficulty: 'medium',
    order: 5,
    xpReward: 50,
    title: { th: '5. นับถอยหลังพร้อมเงื่อนไข', en: '5. Countdown with Conditions' },
    description: {
      th: `จง Trace อัลกอริทึมนี้:
1. SET I = 5
2. SET RESULT = ""
3. WHILE I >= 1 DO
4.   IF I เป็นเลขคี่ THEN
5.     SET RESULT = RESULT + str(I)
6.   ENDIF
7.   SET I = I - 1
8. ENDWHILE
จงพิมพ์ค่าสุดท้ายของ RESULT

หมายเหตุ: str(I) คือการแปลงตัวเลข I เป็นข้อความ และ + คือการนำข้อความมาต่อกัน`,
      en: `Trace this algorithm:
1. SET I = 5
2. SET RESULT = ""
3. WHILE I >= 1 DO
4.   IF I is odd THEN
5.     SET RESULT = RESULT + str(I)
6.   ENDIF
7.   SET I = I - 1
8. ENDWHILE
Print the final value of RESULT.

Note: str(I) converts I to text, and + concatenates strings.`,
    },
    starterCode: '# Trace อัลกอริทึม แล้วพิมพ์ RESULT สุดท้าย\nprint("")\n',
    hint: {
      th: 'เลขคี่จาก 5 ถึง 1 คือ 5, 3, 1 → ต่อกันจะได้ "531"',
      en: 'Odd numbers from 5 down to 1 are 5, 3, 1 → concatenated = "531"',
    },
    testCases: [
      { input: '', expectedOutput: '531' },
    ],
  },
  {
    id: 'ex-1-6',
    moduleId: 1,
    difficulty: 'hard',
    order: 6,
    xpReward: 60,
    title: { th: '6. ลูปซ้อนลูป', en: '6. Nested Loop Madness' },
    description: {
      th: `จง Trace อัลกอริทึมนี้:
1. SET TOTAL = 0
2. SET I = 1
3. WHILE I <= 3 DO
4.   SET J = 1
5.   WHILE J <= I DO
6.     SET TOTAL = TOTAL + J
7.     SET J = J + 1
8.   ENDWHILE
9.   SET I = I + 1
10. ENDWHILE
จงพิมพ์ค่าสุดท้ายของ TOTAL`,
      en: `Trace this algorithm:
1. SET TOTAL = 0
2. SET I = 1
3. WHILE I <= 3 DO
4.   SET J = 1
5.   WHILE J <= I DO
6.     SET TOTAL = TOTAL + J
7.     SET J = J + 1
8.   ENDWHILE
9.   SET I = I + 1
10. ENDWHILE
Print the final value of TOTAL.`,
    },
    starterCode: '# ลองวาดตารางค่า I, J, TOTAL แล้วพิมพ์คำตอบ\nprint("")\n',
    hint: {
      th: 'I=1: J วนจาก 1 ถึง 1 → TOTAL=1\nI=2: J วนจาก 1 ถึง 2 → TOTAL=1+1+2=4\nI=3: J วนจาก 1 ถึง 3 → TOTAL=4+1+2+3=10',
      en: 'I=1: J loops 1→1 → TOTAL=1\nI=2: J loops 1→2 → TOTAL=1+1+2=4\nI=3: J loops 1→3 → TOTAL=4+1+2+3=10',
    },
    testCases: [
      { input: '', expectedOutput: '10' },
    ],
  },
  {
    id: 'ex-1-7',
    moduleId: 1,
    difficulty: 'hard',
    order: 7,
    xpReward: 70,
    title: { th: '7. อัลกอริทึมปริศนา', en: '7. Mystery Algorithm' },
    description: {
      th: `จง Trace อัลกอริทึมนี้ แล้วบอกว่ามันทำอะไร:
1. SET N = 56
2. SET R = ""
3. WHILE N > 0 DO
4.   SET D = N MOD 2
5.   SET R = str(D) + R
6.   SET N = N / 2  (หารเอาจำนวนเต็ม)
7. ENDWHILE
จงพิมพ์ค่าสุดท้ายของ R

หมายเหตุ: MOD คือการหารเอาเศษ, str(D) + R คือเอาตัวเลขไปต่อหน้าข้อความ R`,
      en: `Trace this algorithm and figure out what it does:
1. SET N = 56
2. SET R = ""
3. WHILE N > 0 DO
4.   SET D = N MOD 2
5.   SET R = str(D) + R
6.   SET N = N / 2  (integer division)
7. ENDWHILE
Print the final value of R.

Note: MOD = remainder, str(D) + R = prepend D to R.`,
    },
    starterCode: '# อัลกอริทึมนี้ทำอะไร? Trace ดูแล้วพิมพ์คำตอบ\nprint("")\n',
    hint: {
      th: 'ลองทำทีละรอบ: N=56→D=0,R="0",N=28 → N=28→D=0,R="00",N=14... นี่คืออัลกอริทึมแปลงเลขฐาน 10 เป็นฐาน 2!',
      en: 'Trace step by step: N=56→D=0,R="0",N=28 → … This is a decimal-to-binary conversion algorithm!',
    },
    testCases: [
      { input: '', expectedOutput: '111000' },
    ],
  }
];
