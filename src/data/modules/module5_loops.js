// src/data/modules/module5_loops.js
export const module5 = {
  id: 5,
  icon: '🔁',
  color: '#ec4899',
  colorDark: 'rgba(236,72,153,0.15)',
  requiredXP: 450,
  title: { th: 'การทำซ้ำ (Loops & Iteration)', en: 'Loops & Iteration' },
  description: {
    th: 'เจาะลึก while, for, range, คำสั่งควบคุมลูปขั้นสูง (break, continue, else) และ Nested Loops',
    en: 'Deep dive into while, for, loop controls (break, continue, else) and Nested Loops',
  },
  lessons: [
    {
      id: '5-1',
      title: { th: 'While Loop (ทำซ้ำตราบที่...)', en: 'While Loop' },
      xpReward: 40,
      content: {
        th: `## While Loop (ทำซ้ำตราบที่เงื่อนไขเป็นจริง) 🔁

ในโลกการเขียนโปรแกรม เราจะไม่มานั่งเขียน \`print("Hello")\` 1,000 บรรทัดด้วยมือ เราจะใช้ **Loop (การทำซ้ำ)** มาช่วยแทน!

\`while\` loop คือลูปพื้นฐานที่สุด หลักการของมันเหมือนคำสั่ง \`if\` ที่ **"เด้งกลับไปทำใหม่เรื่อยๆ"** ตราบใดที่เงื่อนไขยังคงเป็น \`True\`

### โครงสร้างของ While Loop
\`\`\`python
# 1. กำหนดค่าเริ่มต้น (Initialization)
count = 1  

# 2. ตั้งเงื่อนไข (Condition) - "ตราบที่ count ยังน้อยกว่าหรือเท่ากับ 5"
while count <= 5:  
    print(f"รอบที่ {count}")
    
    # 3. อัปเดตค่า (Update) - สำคัญมาก! ถ้าลืมบรรทัดนี้จะเกิด Infinite Loop!
    count = count + 1  
\`\`\`

### Infinite Loop (ลูปนรกอนันต์) 💀
ถ้าคุณลืมบรรทัด \`count = count + 1\` ค่าของ count จะเป็น 1 ตลอดกาล ทำให้เงื่อนไข \`1 <= 5\` เป็นจริงเสมอ โปรแกรมจะพิมพ์คำว่า "รอบที่ 1" ไปเรื่อยๆ จนกว่าคอมพิวเตอร์จะค้างหรือ RAM เต็ม!

> 💡 **การใช้ while กับ Falsy:** บางครั้งเราจะใช้ \`while True:\` (ลูปอนันต์แบบตั้งใจ) ควบคู่กับคำสั่ง \`break\` เพื่อรอรับค่าจากผู้ใช้จนกว่าจะถูก`,
        en: `## While Loop 🔁

A \`while\` loop is like an \`if\` statement that repeats its block of code as long as its condition remains \`True\`.

### Anatomy of a While Loop
\`\`\`python
count = 1              # 1. Initialization
while count <= 5:      # 2. Condition
    print(count)
    count = count + 1  # 3. Update (Crucial!)
\`\`\`

### Infinite Loops 💀
If you forget the update step (\`count = count + 1\`), the condition will never become \`False\`. The program will run forever until it crashes!`
      },
      commands: [
        {
          name: 'while',
          syntax: 'while condition:\\n    code',
          description: { th: 'ทำซ้ำบล็อกโค้ดตราบที่เงื่อนไขยังเป็น True', en: 'Repeat a block of code as long as the condition is True' },
          example: 'count = 1\\nwhile count <= 5:\\n    print(count)\\n    count += 1',
        },
      ]
    },
    {
      id: '5-2',
      title: { th: 'For Loop และฟังก์ชัน range()', en: 'For Loop & range()' },
      xpReward: 40,
      content: {
        th: `## For Loop และ range() 🎯

ในภาษา Python คำสั่ง \`for\` จะแตกต่างจากภาษา C++ หรือ Java (ที่เป็นการนับตัวเลข) \n\`for\` ใน Python คือการ **"ดึงของออกมาทีละชิ้นจากกล่อง (Iteration)"**

### การใช้งานร่วมกับ range()
ฟังก์ชัน \`range()\` เปรียบเสมือนโรงงานผลิตตัวเลข (จริงๆ แล้วมันคือ Generator ที่เราจะเรียนระดับลึกต่อไป)
- \`range(stop)\`: เริ่มจาก 0 ถึง \`stop - 1\`
- \`range(start, stop)\`: เริ่มจาก \`start\` ถึง \`stop - 1\`
- \`range(start, stop, step)\`: การก้าวเดินทีละ \`step\` (ถ้า step ติดลบ คือเดินถอยหลัง)

\`\`\`python
# พิมพ์เลข 0 ถึง 4
for i in range(5):
    print(i)

# พิมพ์เลข 10 ถึง 15
for i in range(10, 16):
    print(i)

# นับถอยหลัง 5, 4, 3, 2, 1
for i in range(5, 0, -1):
    print(i)
\`\`\`

> 💡 **ทำไมต้องหยุดที่ stop - 1?** นี่คือหลักการ Zero-based Indexing ใน Computer Science (เริ่มนับที่ 0) ถ้าสั่ง \`range(5)\` เราจะได้เลข 5 ตัว คือ 0, 1, 2, 3, 4 พอดีเป๊ะ!`,
        en: `## For Loop & range() 🎯

In Python, a \`for\` loop iterates over the items of any sequence (like a list or a string).

### The range() function
- \`range(stop)\`: 0 to \`stop - 1\`
- \`range(start, stop)\`: \`start\` to \`stop - 1\`
- \`range(start, stop, step)\`: Increments by \`step\`

\`\`\`python
for i in range(5, 0, -1):
    print(i) # Prints 5, 4, 3, 2, 1
\`\`\`

> 💡 **Why stop - 1?** Computer Science uses Zero-based Indexing. \`range(5)\` gives exactly 5 numbers: 0, 1, 2, 3, 4.`
      },
      commands: [
        {
          name: 'for',
          syntax: 'for variable in iterable:\\n    code',
          description: { th: 'วนซ้ำดึงข้อมูลออกมาทีละตัวจาก iterable (เช่น list, range)', en: 'Iterate over items in a sequence (list, range, string, etc.)' },
          example: 'for i in range(5):\\n    print(i)  # 0, 1, 2, 3, 4',
        },
        {
          name: 'range()',
          syntax: 'range(stop) / range(start, stop) / range(start, stop, step)',
          description: { th: 'สร้างลำดับตัวเลข (เริ่มจาก start ถึง stop-1 ก้าวทีละ step)', en: 'Generate a sequence of numbers (from start to stop-1, incrementing by step)' },
          example: 'list(range(5))        # [0, 1, 2, 3, 4]\\nlist(range(2, 8, 2))  # [2, 4, 6]',
        },
      ]
    },
    {
      id: '5-3',
      title: { th: 'Break, Continue, และความลับของ Else', en: 'Break, Continue, and Else' },
      xpReward: 50,
      content: {
        th: `## ควบคุมลูปดั่งใจนึก (Break & Continue) 🛑⏭️

บางครั้งเราอยากจะ "แทรกแซง" การทำงานของลูปกลางคัน เรามีเวทมนตร์ 2 คำสั่งคือ:

### 1. \`break\` (พังลูปทิ้งทันที)
เมื่อโปรแกรมเจอคำสั่ง \`break\` มันจะกระโดดหนีออกจากลูปนั้นทันที (ไม่สนใจว่ารอบจะเหลือเท่าไหร่)
\`\`\`python
for i in range(1, 10):
    if i == 5:
        break  # พอ i เป็น 5 ลูปจะจบการทำงานทันที
    print(i)
# Output: 1 2 3 4
\`\`\`

### 2. \`continue\` (ข้ามรอบนี้ไปเลย)
เมื่อโปรแกรมเจอคำสั่ง \`continue\` มันจะหยุดทำคำสั่งที่เหลือใน "รอบนั้น" แล้วเด้งกลับไปเริ่ม "รอบถัดไป" ทันที
\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue # พอ i เป็น 3 จะถูกข้ามไป ไม่ถูกพิมพ์
    print(i)
# Output: 1 2 4 5
\`\`\`

---
### 🌟 ทฤษฎีลับ: Loop \`else\` (มีแค่ใน Python!)
ในภาษา Python ลูป \`for\` และ \`while\` สามารถมี \`else\` ต่อท้ายได้! 
- บล็อก \`else\` จะทำงานก็ต่อเมื่อ **ลูปนั้นรันจนจบตามปกติโดยไม่โดน \`break\` เตะออกกลางคัน**

\`\`\`python
for num in range(2, 10):
    if num % 5 == 0:
        print("เจอเลขที่หาร 5 ลงตัวแล้ว!")
        break
else:
    print("หาไม่เจอเลยลูปจนจบแล้ว")
\`\`\`
ทริคนี้มีประโยชน์มากเวลาใช้ค้นหาข้อมูล (Searching Algorithm) โดยไม่ต้องสร้างตัวแปร Flag มาคอยเช็ค!`,
        en: `## Control Statements: Break, Continue, Else 🛑⏭️

### 1. \`break\`
Terminates the loop entirely.
\`\`\`python
while True:
    if input() == "quit":
        break # Exits the infinite loop
\`\`\`

### 2. \`continue\`
Skips the rest of the code inside the loop for the current iteration and jumps to the next iteration.

---
### 🌟 The Secret Loop \`else\`
In Python, loops can have an \`else\` clause! It executes ONLY IF the loop completes normally (i.e., it wasn't terminated by a \`break\` statement). This is incredibly useful for searching algorithms.`
      },
      commands: [
        {
          name: 'break',
          syntax: 'break',
          description: { th: 'หยุดลูปทันทีและกระโดดออกไป (ไม่ทำรอบที่เหลือ)', en: 'Immediately terminate the loop and jump out' },
          example: 'for i in range(10):\\n    if i == 5:\\n        break\\n    print(i)  # 0,1,2,3,4',
        },
        {
          name: 'continue',
          syntax: 'continue',
          description: { th: 'ข้ามรอบปัจจุบันไปเริ่มรอบถัดไปทันที', en: 'Skip the rest of the current iteration and jump to the next one' },
          example: 'for i in range(5):\\n    if i == 2:\\n        continue\\n    print(i)  # 0,1,3,4',
        },
      ]
    },
    {
      id: '5-4',
      title: { th: 'Nested Loops และ Time Complexity', en: 'Nested Loops & Time Complexity' },
      xpReward: 60,
      content: {
        th: `## ลูปซ้อนลูป (Nested Loops) 🪆

การเอา Loop ไปใส่ไว้ข้างใน Loop อีกที เรียกว่า **Nested Loops** 
หลักการทำงานคือ: **ลูปนอก (Outer Loop) ขยับ 1 ก้าว, ลูปใน (Inner Loop) จะต้องวิ่งจนจบทุกรอบ**

\`\`\`python
for i in range(1, 4):         # ลูปนอก รัน 3 รอบ
    for j in range(1, 4):     # ลูปใน รัน 3 รอบ
        print(f"i={i}, j={j}")
\`\`\`
**ผลลัพธ์ทั้งหมดจะพิมพ์ออกมากี่บรรทัด?** คำตอบคือ 3 × 3 = **9 บรรทัด!**

### การวาดพีระมิด (Pattern Printing)
โจทย์ยอดฮิตในระดับมหาวิทยาลัย มักต้องใช้ \`print(..., end="")\` เข้ามาช่วย
\`\`\`python
# วาดสี่เหลี่ยม 3x3
for row in range(3):
    for col in range(3):
        print("* ", end="") # พิมพ์ * เรียงกันในบรรทัดเดิม
    print() # พิมพ์บรรทัดใหม่เมื่อจบลูปในแต่ละรอบ
\`\`\`

---
### ⏱️ Time Complexity เบื้องต้น (O-Notation)
นี่คือหัวใจของวิชา Data Structures!
- ลูปชั้นเดียว (เช่น ลูป n รอบ) ความเร็วคือ **O(n)** (Linear time)
- ลูปซ้อนกัน 2 ชั้น (เช่น ลูป n รอบ ซ้อนลูป n รอบ) ความเร็วคือ **O(n²)** (Quadratic time)

ถ้า n = 1,000,000
- อัลกอริทึม O(n) จะทำงาน 1 ล้านครั้ง (เร็วมาก ⚡)
- อัลกอริทึม O(n²) จะทำงาน 1 ล้าน × 1 ล้าน = 1,000,000,000,000 ครั้ง! (คอมค้างแน่นอน 🐌)

ดังนั้น **จงระวังการใช้ Nested Loops ซ้อนกันลึกๆ โดยไม่จำเป็น!**`,
        en: `## Nested Loops & Time Complexity 🪆

A loop inside a loop is called a **Nested Loop**.
Rule: **For every one iteration of the outer loop, the inner loop executes completely.**

\`\`\`python
for i in range(3):
    for j in range(3):
        # This code runs 3 x 3 = 9 times!
\`\`\`

### ⏱️ Intro to Time Complexity (Big O Notation)
- A single loop running \`n\` times is **O(n)**.
- A nested loop (n inside n) is **O(n²)**.

If n = 10,000:
- O(n) takes 10,000 operations.
- O(n²) takes 100,000,000 operations!
**Beware of deep nested loops! They can severely slow down your program.**`
      },
      commands: []
    }
  ]
};
