// src/data/modules/module2_variables.js
export const module2 = {
  id: 2,
  icon: '📦',
  color: '#3b82f6',
  colorDark: 'rgba(59,130,246,0.15)',
  requiredXP: 30,
  title: { th: 'ตัวแปรและหน่วยความจำ (Variables & Memory)', en: 'Variables & Memory' },
  description: {
    th: 'เจาะลึกเบื้องหลังตัวแปร Data Types และระบบจองพื้นที่ในหน่วยความจำ RAM',
    en: 'Deep dive into variables, data types, and RAM memory allocation',
  },
  lessons: [
    {
      id: '2-1',
      title: { th: 'ตัวแปรคืออะไร?', en: 'What is a Variable?' },
      xpReward: 30,
      content: {
        th: `## ตัวแปร (Variables) ในมุมมอง Computer Science 📦

ตอนเรียนมัธยม คุณอาจจะจำว่า "ตัวแปรคือกล่องใส่ของ" แต่ในระดับมหาวิทยาลัย เราจะมองตัวแปรว่ามันคือ **"ป้ายชื่อ (Label/Reference)"** ที่เอาไปแปะไว้บนข้อมูลที่ถูกสร้างขึ้นใน **หน่วยความจำหลัก (RAM)**

### การประกาศตัวแปรใน Python
Python เป็นภาษาแบบ **Dynamic Typing** คือคุณไม่ต้องบอกว่าตัวแปรนี้เก็บชนิดข้อมูลอะไร (ไม่ต้องเขียน \`int x = 5\` แบบ C++) คุณแค่ตั้งชื่อและจับคู่กับค่าได้เลย!

\`\`\`python
name = "Somchai"
age = 20
score = 95.5
is_student = True
\`\`\`

### กฎการตั้งชื่อตัวแปร (Naming Conventions)
1. **ประกอบด้วยตัวอักษร, ตัวเลข และ Underscore (\`_\`) เท่านั้น**
2. **ห้ามขึ้นต้นด้วยตัวเลข** (เช่น \`1st_prize\` ❌ พังแน่นอน)
3. **ห้ามใช้คำสงวน (Reserved Words)** เช่น \`if\`, \`while\`, \`for\`, \`True\`, \`class\`, \`def\`
4. **Case-sensitive:** \`Age\` กับ \`age\` ถือว่าเป็นคนละตัวแปรกัน!

### สไตล์การตั้งชื่อ (Best Practices)
- **Snake Case (แนะนำสำหรับ Python):** \`student_score\`, \`first_name\`
- **Camel Case:** \`studentScore\`, \`firstName\`
- **Pascal Case (มักใช้กับ Class):** \`StudentScore\`

> 💡 **ข้อควรระวัง:** พยายามตั้งชื่อให้มีความหมาย (Meaningful names) อย่าตั้งชื่อว่า \`a, b, c, x, y\` ยกเว้นจะใช้ในโจทย์คณิตศาสตร์หรือลูปแคบๆ เพราะเวลาคนอื่นมาอ่านโค้ด จะไม่รู้ว่ามันคืออะไร!`,
        en: `## Variables in Computer Science 📦

You might have heard "a variable is a box". In CS, specifically in Python, a variable is more like a **"Name Tag (Label/Reference)"** attached to an object residing in the **RAM (Random Access Memory)**.

### Declaring Variables
Python uses **Dynamic Typing**, meaning you don't declare the data type explicitly.

\`\`\`python
name = "Somchai"
age = 20
\`\`\`

### Naming Rules & Conventions
1. Only letters, numbers, and underscores (\`_\`).
2. Cannot start with a number.
3. Cannot be a reserved keyword (\`if\`, \`for\`, etc.).
4. **Case-sensitive.**

**Python Standard:** Use \`snake_case\` for variables (e.g., \`user_age\`). Avoid meaningless names like \`x\` or \`y\` unless absolutely necessary.`
      },
      commands: []
    },
    {
      id: '2-2',
      title: { th: 'ชนิดข้อมูลพื้นฐาน (Data Types)', en: 'Basic Data Types' },
      xpReward: 35,
      content: {
        th: `## ชนิดข้อมูลพื้นฐาน (Primitive Data Types) 🧬

คอมพิวเตอร์จัดเก็บข้อความ (Text) และตัวเลข (Numbers) ด้วยโครงสร้างบิต (Bits) ที่ต่างกันอย่างสิ้นเชิง การระบุชนิดข้อมูลจึงสำคัญมาก

ใน Python มี Data Types หลักๆ ดังนี้:

### 1. Integer (int) - จำนวนเต็ม
ตัวเลขที่ไม่มีจุดทศนิยม สามารถเป็นค่าบวก ลบ หรือศูนย์ และใน Python 3 ขนาดของ int จะใหญ่ได้แบบ **ไม่จำกัด (Arbitrary-precision)** (ตราบเท่าที่ RAM คุณเหลือ!)
\`\`\`python
population = 7000000000
temperature = -5
\`\`\`

### 2. Float (float) - จำนวนจริง (ทศนิยม)
ตัวเลขที่มีจุดทศนิยม เบื้องหลังใช้มาตรฐาน **IEEE 754 (64-bit double precision)** ซึ่งอาจเกิดความคลาดเคลื่อน (Floating-point error) เล็กน้อยเวลาคำนวณ!
\`\`\`python
pi = 3.14159
gravity = 9.81
\`\`\`

### 3. String (str) - ข้อความ (สตริง)
กลุ่มของอักขระ (Characters) ใช้เครื่องหมาย Single quote \`'...\'\` หรือ Double quote \`"..."\` ก็ได้
\`\`\`python
message = "Hello, Python!"
\`\`\`

### 4. Boolean (bool) - ค่าความจริง
มีแค่ 2 ค่าเท่านั้น คือ \`True\` (จริง) และ \`False\` (เท็จ) (ต้องพิมพ์ตัวพิมพ์ใหญ่ตัวแรกเสมอใน Python)
\`\`\`python
is_raining = False
\`\`\`

### 5. NoneType (None)
ค่าความว่างเปล่า (Null) เอาไว้บอกว่าตัวแปรนี้ยังไม่มีข้อมูล
\`\`\`python
result = None
\`\`\`

> 💡 **ฟังก์ชัน \`type()\`:** หากไม่แน่ใจว่าตัวแปรเก็บอะไรไว้ ให้ใช้ \`print(type(ตัวแปร))\` คอมพิวเตอร์จะบอกคลาสของชนิดข้อมูลนั้นให้ทันที`,
        en: `## Primitive Data Types 🧬

Computers store texts and numbers entirely differently in binary. Python handles several core data types:

1. **Integer (\`int\`):** Whole numbers. In Python 3, ints have arbitrary precision (no maximum limit, bounded only by memory).
2. **Float (\`float\`):** Decimal numbers based on the IEEE 754 64-bit standard.
3. **String (\`str\`):** Sequences of characters enclosed in \`""\` or \`''\`.
4. **Boolean (\`bool\`):** \`True\` or \`False\` (Capitalized).
5. **NoneType (\`None\`):** Represents the absence of a value (Null).

> 💡 **Tip:** Use \`type(variable)\` to check a variable's data type dynamically.`
      },
      commands: [
        {
          name: 'type()',
          syntax: 'type(value)',
          description: { th: 'ตรวจสอบชนิดข้อมูล (Data Type) ของค่าหรือตัวแปร', en: 'Check the data type of a value or variable' },
          example: 'print(type(42))      # <class \'int\'>\\nprint(type("Hi"))  # <class \'str\'>',
        },
      ]
    },
    {
      id: '2-3',
      title: { th: 'หน่วยความจำและ ID (Memory & References)', en: 'Memory & References' },
      xpReward: 50,
      content: {
        th: `## ผ่าเบื้องหลัง: หน่วยความจำ (RAM) และการอ้างอิง (References) 🧠

นี่คือเนื้อหาที่เด็กมหาลัยต้องรู้! 

เมื่อเราพิมพ์ \`x = 10\` คอมพิวเตอร์ทำอะไรบ้าง?
1. คอมพิวเตอร์จะไปหาพื้นที่ว่างใน **RAM (Heap memory)** 
2. สร้าง "อ็อบเจกต์ (Object)" ประเภท Integer ที่มีค่าเท่ากับ \`10\` ขึ้นมา
3. เอาป้ายชื่อที่เขียนว่า \`x\` ไปแปะ (ชี้) ที่อ็อบเจกต์นั้น!

เราเรียกกระบวนการนี้ว่า **Reference Assignment**

### ฟังก์ชัน \`id()\` ตรวจสอบตำแหน่งหน่วยความจำ
ฟังก์ชัน \`id()\` จะคืนค่าตัวเลขซึ่งเปรียบเสมือน **"บ้านเลขที่ (Memory Address)"** ของอ็อบเจกต์นั้นใน RAM

ลองจินตนาการโค้ดนี้:
\`\`\`python
a = 256
b = 256
print(id(a)) # อาจจะได้ 1407000000
print(id(b)) # จะได้ 1407000000 เหมือนกันเป๊ะ!
\`\`\`
**เกิดอะไรขึ้น?** Python มีระบบฉลาดที่เรียกว่า **Integer Pre-allocation (Caching)** สำหรับเลข -5 ถึง 256 มันจะสร้างรอไว้ก่อนแล้ว ถ้าเราประกาศตัวแปรค่าเท่ากัน มันจะเอาป้ายชื่อ \`a\` และ \`b\` ไปชี้ที่วัตถุตัวเดียวกันเลย เพื่อประหยัด RAM!

แต่ถ้า...
\`\`\`python
c = 1000
d = 1000
print(id(c) == id(d)) # ได้ False เพราะเลขเยอะเกิน Python เลยสร้างอ็อบเจกต์ใหม่คนละที่
\`\`\`

### Garbage Collection (คนเก็บขยะใน RAM)
ถ้าเราเปลี่ยนให้ \`x = 20\` ป้ายชื่อ \`x\` จะถูกดึงออกไปแปะที่เลข \`20\` 
แล้วเลข \`10\` ตัวเก่าล่ะ? 
ถ้าไม่มีป้ายชื่อไหนชี้ไปที่เลข \`10\` แล้ว ตัวชี้วัด (Reference count) จะกลายเป็น 0 ระบบ **Garbage Collector** ของ Python จะกวาดเลข \`10\` ทิ้งไปจาก RAM อัตโนมัติเพื่อคืนพื้นที่ให้ระบบ!`,
        en: `## Under the Hood: Memory and References 🧠

When you write \`x = 10\`:
1. Python creates an Integer object with the value \`10\` in the **Heap memory**.
2. It assigns the reference (label) \`x\` to point to that object.

### The \`id()\` function
The \`id()\` function returns the memory address (identity) of an object.

\`\`\`python
a = 256
b = 256
print(id(a) == id(b)) # True! Because Python caches small integers (-5 to 256)
\`\`\`
Python optimizes memory by having multiple variables point to the same object in memory if the values are small numbers or short strings.

### Garbage Collection
If you reassign \`x = 20\`, the reference count for the object \`10\` drops to 0 (if no other variable points to it). Python's **Garbage Collector** will automatically free that memory space.`
      },
      commands: [
        {
          name: 'id()',
          syntax: 'id(object)',
          description: { th: 'คืนค่าตัวเลขที่เป็นตัวแทนตำแหน่งหน่วยความจำ (Memory Address) ของอ็อบเจกต์', en: 'Return the unique identity (memory address) of an object' },
          example: 'a = 256\\nb = 256\\nprint(id(a) == id(b))  # True (cached)',
        },
      ]
    },
    {
      id: '2-4',
      title: { th: 'เปลี่ยนคลาสและ Type Casting', en: 'Type Casting' },
      xpReward: 30,
      content: {
        th: `## การแปลงชนิดข้อมูล (Type Casting / Conversion) 🔄

บางครั้งข้อมูลที่เรามี มันอยู่คนละ Type กัน ทำให้เอามาคำนวณตรงๆ ไม่ได้ เช่น
\`\`\`python
age_string = "20"
next_year = age_string + 1  # ❌ พังแน่นอน! เอาข้อความไปบวกตัวเลขไม่ได้ (TypeError)
\`\`\`

เราจึงต้องมีทักษะการ "แปลงร่าง" ข้อมูลให้เป็น Type ที่เราต้องการ เรียกว่า **Type Casting** หรือ **Type Conversion**

### ฟังก์ชันแปลงร่างที่เจอบ่อย
- \`int()\` : แปลงเป็นจำนวนเต็ม (ตัดทศนิยมทิ้ง ไม่ปัดเศษ!)
- \`float()\` : แปลงเป็นจำนวนจริง
- \`str()\` : แปลงเป็นข้อความ

**ตัวอย่างการแปลงร่าง:**
\`\`\`python
# 1. แปลงข้อความเป็นตัวเลข (ข้อความนั้นต้องเป็นตัวเลขล้วนๆ นะ)
num = int("100") 
print(num * 2)    # ได้ 200

# 2. แปลงตัวเลขเป็นข้อความ
word = str(555)
print(word + " 😆") # ได้ "555 😆"

# 3. แปลงทศนิยมเป็นจำนวนเต็ม (ทิ้งเศษ)
money = int(99.99)
print(money)      # ได้ 99 (ขาดทุนซะงั้น!)
\`\`\`

> ⚠️ **ข้อควรระวัง:** ถ้าคุณพยายามสั่ง \`int("Hello")\` โปรแกรมจะเกิด ValueError ทันที เพราะมันไม่รู้จะตีความคำว่า Hello เป็นตัวเลขยังไง!`,
        en: `## Type Casting / Conversion 🔄

You cannot mix operations between incompatible types (e.g., adding a string to an integer throws a \`TypeError\`). You must convert them first.

### Common Casting Functions
- \`int(value)\` : Converts to integer (truncates decimals, does not round).
- \`float(value)\` : Converts to float.
- \`str(value)\` : Converts to string.

\`\`\`python
# String to Integer
num = int("100")
print(num * 2) # 200

# Float to Integer
pi = int(3.99)
print(pi) # 3 (Decimals are truncated!)
\`\`\``
      },
      commands: [
        {
          name: 'int()',
          syntax: 'int(value)',
          description: { th: 'แปลงค่าเป็นจำนวนเต็ม (ตัดทศนิยมทิ้ง ไม่ปัดเศษ)', en: 'Convert a value to an integer (truncates decimals)' },
          example: 'print(int("100"))  # 100\\nprint(int(3.99))   # 3',
        },
        {
          name: 'float()',
          syntax: 'float(value)',
          description: { th: 'แปลงค่าเป็นจำนวนจริง (ทศนิยม)', en: 'Convert a value to a floating-point number' },
          example: 'print(float("3.14"))  # 3.14\\nprint(float(10))      # 10.0',
        },
        {
          name: 'str()',
          syntax: 'str(value)',
          description: { th: 'แปลงค่าเป็นข้อความ (String)', en: 'Convert a value to a string' },
          example: 'print(str(555) + " 😆")  # "555 😆"',
        },
      ]
    },
    {
      id: '2-5',
      title: { th: 'Mutable vs Immutable (เกริ่นนำ)', en: 'Mutable vs Immutable (Intro)' },
      xpReward: 40,
      content: {
        th: `## Mutable vs Immutable (เปลี่ยนแปลงได้ vs แก้ไขไม่ได้) 🛡️

นี่คือคอนเซปต์ระดับเทพที่ทำให้โปรแกรมเมอร์มือใหม่มักจะเขียนโค้ดบั๊กโดยไม่รู้ตัว! 
ใน Python อ็อบเจกต์ทุกอย่างในหน่วยความจำจะถูกแบ่งเป็น 2 ก๊ก:

### 1. ก๊ก Immutable (แก้ไขตัวเองไม่ได้) 🔒
ชนิดข้อมูลอย่าง **int, float, bool, str** ล้วนอยู่ในก๊กนี้
"แก้ไขไม่ได้" แปลว่าอะไร? แปลว่าเมื่ออ็อบเจกต์ถูกสร้างใน RAM แล้ว ข้อมูลข้างในนั้นจะห้ามเปลี่ยนเด็ดขาด!

\`\`\`python
x = 10
print(id(x))  # สมมติได้ 1000
x = x + 1     # เราพยายามบวกค่า
print(id(x))  # ได้ 1004 (มันเปลี่ยนบ้านเลขที่!)
\`\`\`
ตอนเราสั่ง \`x = x + 1\` Python ไม่ได้เดินไปแก้เลข 10 ให้กลายเป็น 11... แต่มันสร้างอ็อบเจกต์ 11 ขึ้นมาใหม่ในที่ใหม่ แล้วย้ายป้ายชื่อ \`x\` ไปแปะอันใหม่แทน!

### 2. ก๊ก Mutable (เปลี่ยนแปลงข้างในได้) 🔓
ชนิดข้อมูลโครงสร้างซับซ้อนอย่าง **List, Dictionary, Set** (ซึ่งเราจะเรียนในบทหลังๆ)
อ็อบเจกต์พวกนี้ "แก้ข้อมูลข้างในได้โดยที่บ้านเลขที่ (id) ยังคงเดิม"

> 🎯 **จำไว้ว่า:** ตัวเลขและข้อความใน Python เปลี่ยนแปลงไม่ได้ (Immutable) ทุกครั้งที่คุณพยายามแก้ค่า มันคือการสร้างของใหม่เสมอเบื้องหลัง! ทฤษฎีนี้จะส่งผลมหาศาลเวลาคุณส่งตัวแปรเข้าไปในฟังก์ชัน (Pass by Object Reference)!`,
        en: `## Mutable vs Immutable (Intro) 🛡️

In Python, all objects fall into two categories. Understanding this is crucial to avoid devastating bugs!

### 1. Immutable Objects 🔒
Includes: **int, float, bool, str**.
Once created in RAM, their state cannot be changed.

\`\`\`python
x = 10
print(id(x))  # e.g., 1000
x = x + 1
print(id(x))  # e.g., 1004 (Identity changed!)
\`\`\`
Python doesn't modify the \`10\` to \`11\`. It creates a completely new \`11\` object and points the label \`x\` to it.

### 2. Mutable Objects 🔓
Includes: **Lists, Dictionaries, Sets**.
These objects can be modified in place (their internal state changes, but their \`id()\` remains the exact same).

> 🎯 **Takeaway:** Primitive types are Immutable. Modifying them means creating new objects. This has massive implications for how memory is managed and how functions behave.`
      },
      commands: []
    }
  ]
};
