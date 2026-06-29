// src/data/curriculum.js — Complete 7-module curriculum (EXPANDED)
export const MODULES = [
  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 1: FLOWCHART
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    icon: '🗺️',
    color: '#10b981',
    colorDark: 'rgba(16,185,129,0.15)',
    requiredXP: 0,
    title: { th: 'ผังงาน (Flowchart)', en: 'Flowchart & Thinking' },
    description: {
      th: 'เรียนรู้การคิดเชิงโปรแกรมด้วยผังงาน ก่อนลงมือเขียนโค้ด',
      en: 'Learn algorithmic thinking with flowcharts before coding',
    },
    lessons: [
      {
        id: '1-1',
        title: { th: 'ผังงานคืออะไร?', en: 'What is a Flowchart?' },
        xpReward: 20,
        hasFlowchart: true,
        content: {
          th: `## ผังงาน (Flowchart) คืออะไร?

ผังงาน คือ **แผนภาพที่แสดงขั้นตอนการทำงาน** ของโปรแกรม โดยใช้สัญลักษณ์รูปทรงต่างๆ เชื่อมต่อกันด้วยลูกศร

### เปรียบเทียบกับชีวิตจริง

ลองนึกภาพว่าคุณจะ **ชงกาแฟ** คุณต้องทำตามขั้นตอน:
1. ต้มน้ำ
2. ใส่กาแฟลงในแก้ว
3. เทน้ำร้อน
4. เติมน้ำตาล (ถ้าชอบหวาน)
5. คนให้เข้ากัน

ผังงานก็เหมือนกัน — เป็นแผนที่นำทางก่อนเขียนโค้ด!

### ทำไมโปรแกรมเมอร์ต้องใช้ผังงาน?

> **คนที่ไม่วางแผน** มักเจอปัญหาระหว่างทาง  
> **คนที่วางแผนด้วยผังงาน** เขียนโค้ดได้เร็วและผิดพลาดน้อยกว่า

### ประโยชน์ของผังงาน
- ✅ มองเห็นภาพรวมของโปรแกรมได้ชัดเจน
- ✅ ค้นหาจุดผิดพลาดได้ง่ายขึ้น
- ✅ ทีมงานเข้าใจโปรแกรมได้โดยไม่ต้องอ่านโค้ด
- ✅ ประหยัดเวลาในการพัฒนา`,
          en: `## What is a Flowchart?

A flowchart is a **diagram that shows the steps** of a program using different shapes connected by arrows.

### Real-life Analogy

Imagine you're **making coffee**. You need to follow steps:
1. Boil water
2. Put coffee in a cup
3. Pour hot water
4. Add sugar (if you like it sweet)
5. Stir until mixed

A flowchart works the same way — it's a roadmap before you write code!

### Why do programmers use flowcharts?

> **Those without a plan** often run into problems along the way.  
> **Those who plan with flowcharts** code faster and make fewer mistakes.

### Benefits of Flowcharts
- ✅ See the overall structure of a program clearly
- ✅ Find errors more easily
- ✅ Team members understand the program without reading code
- ✅ Saves development time`,
        },
        commands: [],
      },
      {
        id: '1-2',
        title: { th: 'สัญลักษณ์ในผังงาน', en: 'Flowchart Symbols' },
        xpReward: 25,
        hasFlowchart: true,
        content: {
          th: `## สัญลักษณ์ที่ใช้ในผังงาน

| สัญลักษณ์ | รูปทรง | ความหมาย | ตัวอย่าง |
|---|---|---|---|
| เริ่ม/จบ | วงรี ⬭ | จุดเริ่มต้นและสิ้นสุด | เริ่มต้น, สิ้นสุด |
| กระบวนการ | สี่เหลี่ยม ▭ | การคำนวณ/กำหนดค่า | x = x + 1 |
| เงื่อนไข | สี่เหลี่ยมข้าวหลามตัด ◇ | การตัดสินใจ ใช่/ไม่ใช่ | อายุ >= 18? |
| รับ/แสดงผล | ขนาน ▱ | Input/Output | รับชื่อ, แสดงผล |
| ลูกศร | → | ทิศทางการทำงาน | เชื่อมกล่อง |

### ตัวอย่าง: ผังงานตรวจสอบอายุ

\`\`\`
       [เริ่มต้น]
           ↓
    [รับค่า: อายุ]
           ↓
    ◇ อายุ >= 18? ◇
      ↙ใช่    ไม่ใช่↘
[แสดง"ผู้ใหญ่"] [แสดง"เด็ก"]
      ↘          ↙
       [สิ้นสุด]
\`\`\`

### กฎสำคัญของผังงาน
1. **เริ่มต้นและสิ้นสุดเสมอ** ด้วยวงรี
2. **ลูกศรไหลจากบนลงล่าง** เป็นหลัก
3. **เงื่อนไขต้องมี 2 ทางเสมอ** (ใช่/ไม่ใช่)
4. **ทุกเส้นต้องมีลูกศร** แสดงทิศทาง`,
          en: `## Flowchart Symbols

| Symbol | Shape | Meaning | Example |
|---|---|---|---|
| Start/End | Oval ⬭ | Beginning and end | Start, End |
| Process | Rectangle ▭ | Calculation or assignment | x = x + 1 |
| Decision | Diamond ◇ | Yes/No branching | age >= 18? |
| Input/Output | Parallelogram ▱ | Receiving or displaying data | Get name, Show result |
| Arrow | → | Direction of flow | Connects shapes |

### Example: Age Check Flowchart

\`\`\`
        [Start]
           ↓
      [Get: age]
           ↓
    ◇ age >= 18? ◇
      ↙Yes      No↘
[Show "Adult"]  [Show "Minor"]
      ↘              ↙
        [End]
\`\`\`

### Flowchart Rules
1. **Always start and end** with an oval
2. **Arrows flow top to bottom** as the main direction
3. **Decisions must always have 2 paths** (Yes/No)
4. **Every line must have an arrow** showing direction`,
        },
        commands: [],
      },
      {
        id: '1-3',
        title: { th: 'ผังงานในชีวิตจริง', en: 'Real-life Flowcharts' },
        xpReward: 25,
        hasFlowchart: true,
        content: {
          th: `## ผังงานในชีวิตประจำวัน

ก่อนเขียนโปรแกรม ลองฝึกอ่านผังงานจากสถานการณ์จริง

### ตัวอย่าง 1: เช็คว่ามีเงินพอซื้อของไหม?

\`\`\`
     [เริ่มต้น]
          ↓
  [รับราคาสินค้า]
  [รับจำนวนเงิน]
          ↓
 ◇ เงิน >= ราคา? ◇
   ↙ใช่     ไม่ใช่↘
[ซื้อสินค้า]  [ไม่ซื้อ]
[รับเงินทอน]  [ออกจากร้าน]
    ↘              ↙
      [สิ้นสุด]
\`\`\`

โค้ด Python ที่ตรงกัน:
\`\`\`python
price = float(input("ราคาสินค้า: "))
money = float(input("เงินที่มี: "))

if money >= price:
    change = money - price
    print(f"ซื้อได้! เงินทอน {change:.2f} บาท")
else:
    print("เงินไม่พอ ออกจากร้านได้เลย")
\`\`\`

### ตัวอย่าง 2: หาเลขที่มากกว่า

\`\`\`
      [เริ่มต้น]
           ↓
   [รับค่า A และ B]
           ↓
     ◇ A > B? ◇
    ↙ใช่   ไม่ใช่↘
[แสดง A]    ◇ A == B? ◇
               ↙ใช่   ไม่ใช่↘
         [เท่ากัน] [แสดง B]
    ↘        ↓         ↙
          [สิ้นสุด]
\`\`\`

### ฝึกคิด: ผังงาน ATM

ลองวาดผังงานสำหรับ:
1. ใส่รหัส PIN
2. ถ้าถูกต้อง → เข้าเมนู
3. ถ้าผิด → แสดงข้อผิดพลาด (สูงสุด 3 ครั้ง)
4. ถ้าผิด 3 ครั้ง → บล็อกบัตร`,
          en: `## Real-life Flowcharts

Before writing a program, practice reading flowcharts from real situations.

### Example 1: Can I afford this item?

\`\`\`
      [Start]
          ↓
  [Get item price]
  [Get my money]
          ↓
 ◇ money >= price? ◇
   ↙Yes        No↘
[Buy item]    [Don't buy]
[Get change]  [Leave store]
    ↘              ↙
        [End]
\`\`\`

Matching Python code:
\`\`\`python
price = float(input("Item price: "))
money = float(input("Your money: "))

if money >= price:
    change = money - price
    print(f"Purchased! Change: {change:.2f}")
else:
    print("Not enough money. Leave store.")
\`\`\`

### Example 2: Find the larger number

\`\`\`
      [Start]
           ↓
   [Get values A and B]
           ↓
     ◇ A > B? ◇
    ↙Yes     No↘
[Show A]    ◇ A == B? ◇
               ↙Yes    No↘
         [Equal]   [Show B]
    ↘        ↓         ↙
           [End]
\`\`\`

### Practice: ATM Flowchart

Try to draw a flowchart for:
1. Enter PIN
2. If correct → go to menu
3. If wrong → show error (max 3 tries)
4. If wrong 3 times → block card`,
        },
        commands: [],
      },
      {
        id: '1-4',
        title: { th: 'ผังงานกับการวนซ้ำ', en: 'Flowcharts with Loops' },
        xpReward: 30,
        hasFlowchart: true,
        content: {
          th: `## ผังงานแบบวนซ้ำ (Loop)

ผังงานที่มีการวนซ้ำจะมีลูกศร **ย้อนกลับขึ้นไป** นี่คือสัญญาณว่าโปรแกรมจะทำซ้ำ

### ผังงาน for loop: นับ 1-5

\`\`\`
    [เริ่มต้น]
         ↓
    [i = 1]
         ↓
  ◇ i <= 5? ◇──ไม่ใช่──→ [สิ้นสุด]
       ↓ ใช่
  [แสดง i]
       ↓
  [i = i + 1]
       ↑_________↙  ← วนกลับ!
\`\`\`

โค้ด Python:
\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

### ผังงาน while loop: รับเลขจนกว่าจะถูก

\`\`\`
    [เริ่มต้น]
         ↓
    [เลขลับ = 7]
         ↓
   [รับค่า guess]
         ↓
◇ guess == 7? ◇──ไม่ใช่──→ [แสดง"ลองใหม่"]
       ↓ ใช่                        ↓
 [แสดง"ถูกต้อง!"]           [รับค่า guess อีกครั้ง]
       ↓                              ↑___↙
   [สิ้นสุด]
\`\`\`

โค้ด Python:
\`\`\`python
secret = 7
guess = int(input("ทายเลข: "))
while guess != secret:
    print("ผิด! ลองใหม่")
    guess = int(input("ทายเลข: "))
print("ถูกต้อง! 🎉")
\`\`\`

### สังเกตความแตกต่าง

| for loop | while loop |
|---|---|
| รู้จำนวนรอบที่แน่นอน | ไม่รู้จำนวนรอบ มีเงื่อนไขหยุด |
| \`for i in range(5)\` | \`while condition:\` |`,
          en: `## Flowcharts with Loops

Flowcharts with loops have arrows that **go back up**. This signals that the program will repeat.

### for loop flowchart: Count 1 to 5

\`\`\`
    [Start]
         ↓
    [i = 1]
         ↓
  ◇ i <= 5? ◇──No──→ [End]
       ↓ Yes
  [Display i]
       ↓
  [i = i + 1]
       ↑_________↙  ← Loop back!
\`\`\`

Python code:
\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

### while loop flowchart: Guess until correct

\`\`\`
    [Start]
         ↓
    [secret = 7]
         ↓
   [Get guess]
         ↓
◇ guess == 7? ◇──No──→ [Show "Try again"]
       ↓ Yes                    ↓
 [Show "Correct!"]      [Get guess again]
       ↓                         ↑___↙
    [End]
\`\`\`

Python code:
\`\`\`python
secret = 7
guess = int(input("Guess: "))
while guess != secret:
    print("Wrong! Try again")
    guess = int(input("Guess: "))
print("Correct! 🎉")
\`\`\`

### Key Differences

| for loop | while loop |
|---|---|
| Known number of iterations | Unknown iterations, has stop condition |
| \`for i in range(5)\` | \`while condition:\` |`,
        },
        commands: [],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 2: VARIABLES & DATA TYPES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    icon: '📦',
    color: '#7c3aed',
    colorDark: 'rgba(124,58,237,0.15)',
    requiredXP: 50,
    title: { th: 'ตัวแปรและชนิดข้อมูล', en: 'Variables & Data Types' },
    description: {
      th: 'เรียนรู้การเก็บข้อมูลในตัวแปร และชนิดข้อมูลพื้นฐาน str, int, float, bool',
      en: 'Learn to store data in variables and basic types: str, int, float, bool',
    },
    lessons: [
      {
        id: '2-1',
        title: { th: 'ตัวแปร (Variables)', en: 'Variables' },
        xpReward: 25,
        hasFlowchart: false,
        content: {
          th: `## ตัวแปร (Variables) คืออะไร?

ตัวแปรเปรียบเหมือน **กล่องเก็บของที่มีป้ายชื่อ** — เราใส่ข้อมูลลงในกล่อง แล้วเรียกชื่อกล่องเพื่อนำข้อมูลออกมาใช้

\`\`\`
  ┌─────────────┐
  │  name       │  ← ชื่อตัวแปร
  │  "สมชาย"    │  ← ค่าที่เก็บ
  └─────────────┘
\`\`\`

### วิธีสร้างตัวแปร

\`\`\`python
# รูปแบบ:  ชื่อตัวแปร = ค่า
name = "สมชาย"
age = 20
height = 170.5
is_student = True
\`\`\`

### Python เดาชนิดข้อมูลให้อัตโนมัติ!

ไม่เหมือนบางภาษาที่ต้องบอกว่า "ฉันจะเก็บตัวเลข" — Python ฉลาดพอที่จะรู้เอง

\`\`\`python
x = 42        # Python รู้ว่าเป็น int
y = 3.14      # Python รู้ว่าเป็น float
z = "hello"   # Python รู้ว่าเป็น str
\`\`\`

### กฎการตั้งชื่อตัวแปร

\`\`\`python
# ✅ ถูกต้อง
student_name = "Alice"
score1 = 95
_data = []
myVariable = "ok"

# ❌ ผิด!
1name = "Bob"         # ห้ามขึ้นต้นตัวเลข
my-name = "Charlie"   # ห้ามใช้ -
my name = "Dave"      # ห้ามมีช่องว่าง
for = 10              # ห้ามใช้คำสงวน
\`\`\`

### การตั้งชื่อให้ดี (Best Practice)

\`\`\`python
# ❌ ชื่อไม่ดี (ไม่รู้ว่าเก็บอะไร)
x = 25
a = "John"

# ✅ ชื่อดี (เข้าใจได้ทันที)
age = 25
student_name = "John"
\`\`\`

### เปลี่ยนค่าตัวแปรได้เสมอ

\`\`\`python
score = 80
print(score)   # 80

score = 95     # เปลี่ยนค่าใหม่
print(score)   # 95

score = score + 5   # บวกเพิ่ม
print(score)   # 100
\`\`\``,
          en: `## What is a Variable?

A variable is like a **labeled box** — we store data in the box, then use its name to retrieve the data.

\`\`\`
  ┌─────────────┐
  │  name       │  ← variable name
  │  "Alice"    │  ← stored value
  └─────────────┘
\`\`\`

### How to Create a Variable

\`\`\`python
# Format:  variable_name = value
name = "Alice"
age = 20
height = 170.5
is_student = True
\`\`\`

### Python Guesses the Type Automatically!

Unlike some languages where you must declare "I'm storing a number" — Python is smart enough to figure it out.

\`\`\`python
x = 42        # Python knows it's an int
y = 3.14      # Python knows it's a float
z = "hello"   # Python knows it's a str
\`\`\`

### Naming Rules

\`\`\`python
# ✅ Valid
student_name = "Alice"
score1 = 95
_data = []
myVariable = "ok"

# ❌ Invalid!
1name = "Bob"         # can't start with number
my-name = "Charlie"   # can't use -
my name = "Dave"      # can't have spaces
for = 10              # can't use reserved words
\`\`\`

### Good Naming (Best Practice)

\`\`\`python
# ❌ Bad names (unclear what they store)
x = 25
a = "John"

# ✅ Good names (immediately understandable)
age = 25
student_name = "John"
\`\`\`

### Variables Can Change

\`\`\`python
score = 80
print(score)   # 80

score = 95     # reassign
print(score)   # 95

score = score + 5   # add to it
print(score)   # 100
\`\`\``,
        },
        commands: [
          {
            name: 'การกำหนดค่า (Assignment)',
            syntax: 'variable = value',
            description: { th: 'กำหนดค่าให้กับตัวแปร', en: 'Assign a value to a variable' },
            example: 'x = 10\nname = "Python"',
          },
        ],
      },
      {
        id: '2-2',
        title: { th: 'str — ข้อความ', en: 'str — Strings' },
        xpReward: 25,
        hasFlowchart: false,
        content: {
          th: `## ชนิดข้อมูล str (String)

str คือข้อมูลประเภท **ข้อความ** ครอบด้วยเครื่องหมาย \`"\` หรือ \`'\`

\`\`\`python
name = "สมชาย"
city = 'กรุงเทพฯ'
sentence = "Python is awesome!"
empty = ""           # string ว่าง
multiline = """
บรรทัดที่ 1
บรรทัดที่ 2
"""
\`\`\`

### การดำเนินการพื้นฐาน

\`\`\`python
# ต่อข้อความ (Concatenation)
first = "Hello"
second = "World"
result = first + " " + second   # "Hello World"

# ทำซ้ำ (Repetition)
line = "-" * 20   # "--------------------"

# ความยาว
print(len("Python"))   # 6
\`\`\`

### เข้าถึงตัวอักษรแต่ละตัว (Indexing)

\`\`\`python
word = "Python"
#       012345   ← index (เริ่มที่ 0!)

print(word[0])   # P  (ตัวแรก)
print(word[1])   # y
print(word[-1])  # n  (ตัวสุดท้าย)
print(word[-2])  # o
\`\`\`

### การตัดข้อความ (Slicing)

\`\`\`python
text = "Hello, World!"
#       0123456789...

print(text[0:5])    # "Hello"
print(text[7:])     # "World!"
print(text[:5])     # "Hello"
print(text[::2])    # "Hlo ol!"  ← ทีละ 2
\`\`\`

### Method ที่ใช้บ่อย

\`\`\`python
name = "  hello world  "

name.upper()          # "  HELLO WORLD  "
name.lower()          # "  hello world  "
name.strip()          # "hello world"  (ตัดช่องว่างหน้า-หลัง)
name.replace("o","0") # "hell0 w0rld"
name.split(" ")       # ['', '', 'hello', 'world', '', '']

text = "Python"
text.startswith("Py")  # True
text.endswith("on")    # True
"yth" in text          # True
\`\`\`

### f-string (สมัยใหม่ แนะนำมาก!)

\`\`\`python
name = "สมชาย"
age = 20
score = 98.5

# แบบเก่า (ยุ่งยาก)
msg = "ชื่อ " + name + " อายุ " + str(age)

# แบบ f-string (สะอาด อ่านง่าย)
msg = f"ชื่อ {name} อายุ {age} ปี คะแนน {score:.1f}"
print(msg)
# ชื่อ สมชาย อายุ 20 ปี คะแนน 98.5
\`\`\``,
          en: `## Data Type: str (String)

str is **text data**, wrapped in \`"\` or \`'\` quotes.

\`\`\`python
name = "Alice"
city = 'Bangkok'
sentence = "Python is awesome!"
empty = ""           # empty string
multiline = """
Line 1
Line 2
"""
\`\`\`

### Basic Operations

\`\`\`python
# Concatenation
first = "Hello"
second = "World"
result = first + " " + second   # "Hello World"

# Repetition
line = "-" * 20   # "--------------------"

# Length
print(len("Python"))   # 6
\`\`\`

### Accessing Individual Characters (Indexing)

\`\`\`python
word = "Python"
#       012345   ← index (starts at 0!)

print(word[0])   # P  (first char)
print(word[1])   # y
print(word[-1])  # n  (last char)
print(word[-2])  # o
\`\`\`

### Slicing

\`\`\`python
text = "Hello, World!"
#       0123456789...

print(text[0:5])    # "Hello"
print(text[7:])     # "World!"
print(text[:5])     # "Hello"
print(text[::2])    # "Hlo ol!"  ← every 2nd char
\`\`\`

### Common Methods

\`\`\`python
name = "  hello world  "

name.upper()           # "  HELLO WORLD  "
name.lower()           # "  hello world  "
name.strip()           # "hello world"  (remove leading/trailing spaces)
name.replace("o","0")  # "hell0 w0rld"
name.split(" ")        # ['hello', 'world']

text = "Python"
text.startswith("Py")  # True
text.endswith("on")    # True
"yth" in text          # True
\`\`\`

### f-string (Modern, Highly Recommended!)

\`\`\`python
name = "Alice"
age = 20
score = 98.5

# Old way (messy)
msg = "Name: " + name + " Age: " + str(age)

# f-string (clean and readable)
msg = f"Name: {name} Age: {age} Score: {score:.1f}"
print(msg)
# Name: Alice Age: 20 Score: 98.5
\`\`\``,
        },
        commands: [
          {
            name: 'len()',
            syntax: 'len(string)',
            description: { th: 'คืนค่าความยาวของข้อความ', en: 'Returns the length of a string' },
            example: 'len("Hello")  # 5',
          },
          {
            name: '.upper() / .lower()',
            syntax: 'string.upper()\nstring.lower()',
            description: { th: 'แปลงเป็นตัวพิมพ์ใหญ่/เล็ก', en: 'Convert to uppercase/lowercase' },
            example: '"hello".upper()  # "HELLO"',
          },
          {
            name: '.strip()',
            syntax: 'string.strip()',
            description: { th: 'ตัดช่องว่างหน้า-หลัง', en: 'Remove leading/trailing whitespace' },
            example: '"  hi  ".strip()  # "hi"',
          },
          {
            name: '.split()',
            syntax: 'string.split(separator)',
            description: { th: 'แบ่งข้อความเป็น list', en: 'Split string into a list' },
            example: '"a,b,c".split(",")  # ["a","b","c"]',
          },
          {
            name: '.replace()',
            syntax: 'string.replace(old, new)',
            description: { th: 'แทนที่ข้อความ', en: 'Replace part of string' },
            example: '"hello".replace("l","L")  # "heLLo"',
          },
        ],
      },
      {
        id: '2-3',
        title: { th: 'int & float — ตัวเลข', en: 'int & float — Numbers' },
        xpReward: 25,
        hasFlowchart: false,
        content: {
          th: `## ชนิดข้อมูลตัวเลข

### int — จำนวนเต็ม
ตัวเลขที่ไม่มีทศนิยม ไม่ว่าจะบวกหรือลบก็ได้

\`\`\`python
age = 25
year = 2024
score = -10
big_number = 1_000_000   # ใส่ _ เพื่อให้อ่านง่าย
\`\`\`

### float — เลขทศนิยม

\`\`\`python
price = 99.99
pi = 3.14159
temperature = -5.5
scientific = 1.5e10   # 1.5 × 10^10
\`\`\`

### การคำนวณทุกอย่างที่รู้จัก

\`\`\`python
a = 10
b = 3

print(a + b)    # 13   บวก
print(a - b)    # 7    ลบ
print(a * b)    # 30   คูณ
print(a / b)    # 3.333...  หาร (ได้ float เสมอ)
print(a // b)   # 3    หารเอาเฉพาะส่วนเต็ม (Floor division)
print(a % b)    # 1    หารเอาเศษ (Modulo)
print(a ** b)   # 1000 ยกกำลัง (10^3)

# Shorthand operators
x = 10
x += 5    # x = x + 5  → 15
x -= 3    # x = x - 3  → 12
x *= 2    # x = x * 2  → 24
x //= 5   # x = x // 5 → 4
\`\`\`

### ลำดับความสำคัญ (Priority)

\`\`\`python
# Python คำนวณตามลำดับ: ** → * / // % → + -
result = 2 + 3 * 4    # = 2 + 12 = 14  (ไม่ใช่ 20!)
result = (2 + 3) * 4  # = 5 * 4 = 20   (ใช้วงเล็บ)
\`\`\`

### ฟังก์ชันคณิตศาสตร์

\`\`\`python
import math

print(abs(-5))          # 5    ค่าสัมบูรณ์
print(round(3.14159, 2))# 3.14 ปัดเศษ
print(max(1, 5, 3))     # 5    ค่ามากสุด
print(min(1, 5, 3))     # 1    ค่าน้อยสุด
print(sum([1,2,3,4,5])) # 15   รวมทุกค่า

print(math.sqrt(16))    # 4.0  รากที่สอง
print(math.ceil(3.2))   # 4    ปัดขึ้น
print(math.floor(3.8))  # 3    ปัดลง
print(math.pi)          # 3.14159...
\`\`\`

### การแปลงชนิดข้อมูล

\`\`\`python
int("100")     # 100  str → int
float("3.14")  # 3.14 str → float
str(42)        # "42" int → str
int(3.9)       # 3    float → int (ตัดทศนิยม ไม่ปัด!)
float(5)       # 5.0  int → float
\`\`\``,
          en: `## Number Data Types

### int — Integers
Whole numbers without decimals, positive or negative.

\`\`\`python
age = 25
year = 2024
score = -10
big_number = 1_000_000   # underscores for readability
\`\`\`

### float — Decimal Numbers

\`\`\`python
price = 99.99
pi = 3.14159
temperature = -5.5
scientific = 1.5e10   # 1.5 × 10^10
\`\`\`

### All Arithmetic Operations

\`\`\`python
a = 10
b = 3

print(a + b)    # 13   addition
print(a - b)    # 7    subtraction
print(a * b)    # 30   multiplication
print(a / b)    # 3.333...  division (always float!)
print(a // b)   # 3    floor division
print(a % b)    # 1    modulo (remainder)
print(a ** b)   # 1000 exponentiation (10^3)

# Shorthand operators
x = 10
x += 5    # x = x + 5  → 15
x -= 3    # x = x - 3  → 12
x *= 2    # x = x * 2  → 24
x //= 5   # x = x // 5 → 4
\`\`\`

### Operator Priority

\`\`\`python
# Python follows: ** → * / // % → + -
result = 2 + 3 * 4    # = 2 + 12 = 14  (not 20!)
result = (2 + 3) * 4  # = 5 * 4 = 20   (use parentheses)
\`\`\`

### Math Functions

\`\`\`python
import math

print(abs(-5))           # 5    absolute value
print(round(3.14159, 2)) # 3.14 round to 2 decimal places
print(max(1, 5, 3))      # 5    maximum value
print(min(1, 5, 3))      # 1    minimum value
print(sum([1,2,3,4,5]))  # 15   sum of all values

print(math.sqrt(16))     # 4.0  square root
print(math.ceil(3.2))    # 4    round up
print(math.floor(3.8))   # 3    round down
print(math.pi)           # 3.14159...
\`\`\`

### Type Conversion

\`\`\`python
int("100")     # 100  str → int
float("3.14")  # 3.14 str → float
str(42)        # "42" int → str
int(3.9)       # 3    float → int (truncates, doesn't round!)
float(5)       # 5.0  int → float
\`\`\``,
        },
        commands: [
          {
            name: 'int()',
            syntax: 'int(value)',
            description: { th: 'แปลงค่าเป็นจำนวนเต็ม', en: 'Convert value to integer' },
            example: 'int("42")   # 42\nint(3.9)    # 3',
          },
          {
            name: 'float()',
            syntax: 'float(value)',
            description: { th: 'แปลงค่าเป็นทศนิยม', en: 'Convert value to float' },
            example: 'float("3.14")  # 3.14',
          },
          {
            name: 'round()',
            syntax: 'round(number, digits)',
            description: { th: 'ปัดเศษตัวเลข', en: 'Round a number' },
            example: 'round(3.14159, 2)  # 3.14',
          },
          {
            name: 'abs()',
            syntax: 'abs(number)',
            description: { th: 'ค่าสัมบูรณ์ (ตัดเครื่องหมายลบ)', en: 'Absolute value (removes negative sign)' },
            example: 'abs(-5)   # 5\nabs(5)    # 5',
          },
        ],
      },
      {
        id: '2-4',
        title: { th: 'bool — ค่าจริง/เท็จ', en: 'bool — True/False' },
        xpReward: 25,
        hasFlowchart: false,
        content: {
          th: `## ชนิดข้อมูล bool (Boolean)

bool มีแค่ **2 ค่า**: \`True\` (จริง) และ \`False\` (เท็จ)  
เปรียบเหมือนสวิตช์ไฟ — เปิดหรือปิดเท่านั้น!

\`\`\`python
is_raining = True
is_sunny = False
has_ticket = True
is_logged_in = False
\`\`\`

> ⚠️ **สำคัญ**: ต้องขึ้นต้นตัวพิมพ์ใหญ่! \`True\` ✅ ไม่ใช่ \`true\` ❌

### bool เกิดจากการเปรียบเทียบ

\`\`\`python
print(5 > 3)      # True
print(5 < 3)      # False
print(5 == 5)     # True   (เท่ากัน ใช้ ==)
print(5 != 3)     # True   (ไม่เท่ากัน)
print(5 >= 5)     # True
print(5 <= 4)     # False

name = "Alice"
print(name == "Alice")   # True
print(name == "alice")   # False  (ตัวพิมพ์สำคัญ!)
\`\`\`

### ตัวดำเนินการตรรกะ (Logical Operators)

\`\`\`python
# and — ทุกเงื่อนไขต้องเป็น True
print(True and True)    # True
print(True and False)   # False
print(False and True)   # False

# or — อย่างน้อยหนึ่งอันต้อง True
print(True or False)    # True
print(False or False)   # False

# not — กลับค่า
print(not True)    # False
print(not False)   # True
\`\`\`

### ตัวอย่างการใช้งาน

\`\`\`python
age = 25
has_id = True

# ตรวจสอบว่าเข้าได้ไหม
can_enter = age >= 18 and has_id
print(can_enter)   # True

# วันหยุด?
day = "เสาร์"
is_weekend = day == "เสาร์" or day == "อาทิตย์"
print(is_weekend)  # True

# ไม่ใช่วันธรรมดา?
is_workday = not is_weekend
print(is_workday)  # False
\`\`\`

### ค่าใดที่ Python ถือว่าเป็น False?

\`\`\`python
# ค่าเหล่านี้ถือว่าเป็น "falsy" (เท็จ)
bool(0)        # False  (เลขศูนย์)
bool(0.0)      # False  (ทศนิยมศูนย์)
bool("")       # False  (string ว่าง)
bool([])       # False  (list ว่าง)
bool(None)     # False  (ไม่มีค่า)

# ทุกอย่างอื่นถือว่าเป็น "truthy" (จริง)
bool(1)        # True
bool("hello")  # True
bool([1,2,3])  # True
\`\`\``,
          en: `## Data Type: bool (Boolean)

bool has only **2 values**: \`True\` and \`False\`  
Think of a light switch — on or off!

\`\`\`python
is_raining = True
is_sunny = False
has_ticket = True
is_logged_in = False
\`\`\`

> ⚠️ **Important**: Must be capitalized! \`True\` ✅ not \`true\` ❌

### bool Comes from Comparisons

\`\`\`python
print(5 > 3)      # True
print(5 < 3)      # False
print(5 == 5)     # True   (equals, use ==)
print(5 != 3)     # True   (not equal)
print(5 >= 5)     # True
print(5 <= 4)     # False

name = "Alice"
print(name == "Alice")   # True
print(name == "alice")   # False  (case-sensitive!)
\`\`\`

### Logical Operators

\`\`\`python
# and — both conditions must be True
print(True and True)    # True
print(True and False)   # False

# or — at least one must be True
print(True or False)    # True
print(False or False)   # False

# not — reverses the value
print(not True)    # False
print(not False)   # True
\`\`\`

### Practical Examples

\`\`\`python
age = 25
has_id = True

# Can they enter?
can_enter = age >= 18 and has_id
print(can_enter)   # True

# Is it a weekend?
day = "Saturday"
is_weekend = day == "Saturday" or day == "Sunday"
print(is_weekend)  # True
\`\`\`

### What Python Considers False?

\`\`\`python
# These are "falsy" values
bool(0)        # False  (zero)
bool(0.0)      # False  (float zero)
bool("")       # False  (empty string)
bool([])       # False  (empty list)
bool(None)     # False  (no value)

# Everything else is "truthy"
bool(1)        # True
bool("hello")  # True
bool([1,2,3])  # True
\`\`\``,
        },
        commands: [
          {
            name: 'bool()',
            syntax: 'bool(value)',
            description: { th: 'แปลงค่าเป็น bool', en: 'Convert value to bool' },
            example: 'bool(0)     # False\nbool(1)     # True\nbool("")    # False',
          },
          {
            name: 'type()',
            syntax: 'type(value)',
            description: { th: 'ตรวจสอบชนิดข้อมูล', en: 'Check the data type' },
            example: 'type(42)    # <class "int">\ntype("hi")  # <class "str">',
          },
        ],
      },
      {
        id: '2-5',
        title: { th: 'ตรวจสอบชนิดข้อมูล', en: 'Checking Data Types' },
        xpReward: 20,
        hasFlowchart: false,
        content: {
          th: `## ตรวจสอบชนิดข้อมูล

### type() — รู้ว่าตัวแปรเก็บอะไร

\`\`\`python
x = 42
y = 3.14
z = "hello"
w = True

print(type(x))   # <class 'int'>
print(type(y))   # <class 'float'>
print(type(z))   # <class 'str'>
print(type(w))   # <class 'bool'>
\`\`\`

### isinstance() — ตรวจว่าเป็นชนิดนั้นไหม?

\`\`\`python
x = 42

print(isinstance(x, int))    # True
print(isinstance(x, float))  # False
print(isinstance(x, str))    # False

# ตรวจหลายชนิดพร้อมกัน
print(isinstance(x, (int, float)))  # True (เป็นอย่างใดอย่างหนึ่ง)
\`\`\`

### กำหนดค่าหลายตัวพร้อมกัน

\`\`\`python
# กำหนดค่าหลายตัวในบรรทัดเดียว
x, y, z = 1, 2, 3
print(x, y, z)   # 1 2 3

# สลับค่าระหว่างตัวแปร (Python trick!)
a = 10
b = 20
a, b = b, a   # สลับกัน!
print(a, b)   # 20 10

# กำหนดค่าเดียวกันให้หลายตัวแปร
p = q = r = 0
print(p, q, r)  # 0 0 0
\`\`\`

### ตาราง cheat sheet ชนิดข้อมูล

| ชนิด | ตัวอย่าง | แปลงจาก |
|---|---|---|
| int | 42, -10, 0 | int("5"), int(3.9) |
| float | 3.14, -2.5 | float("3.14"), float(5) |
| str | "hello", 'world' | str(42), str(True) |
| bool | True, False | bool(0), bool("") |

\`\`\`python
# รวมทุกอย่างใน 1 โปรแกรม
name = "Alice"
age = 20
height = 165.5
is_student = True

print(f"ชื่อ: {name} ({type(name).__name__})")
print(f"อายุ: {age} ({type(age).__name__})")
print(f"ส่วนสูง: {height} ({type(height).__name__})")
print(f"เป็นนักเรียน: {is_student} ({type(is_student).__name__})")
\`\`\``,
          en: `## Checking Data Types

### type() — Know What a Variable Contains

\`\`\`python
x = 42
y = 3.14
z = "hello"
w = True

print(type(x))   # <class 'int'>
print(type(y))   # <class 'float'>
print(type(z))   # <class 'str'>
print(type(w))   # <class 'bool'>
\`\`\`

### isinstance() — Check if it's a Specific Type

\`\`\`python
x = 42

print(isinstance(x, int))    # True
print(isinstance(x, float))  # False
print(isinstance(x, str))    # False

# Check multiple types at once
print(isinstance(x, (int, float)))  # True (either one)
\`\`\`

### Assign Multiple Variables at Once

\`\`\`python
# Multiple assignment in one line
x, y, z = 1, 2, 3
print(x, y, z)   # 1 2 3

# Swap variable values (Python trick!)
a = 10
b = 20
a, b = b, a   # swap!
print(a, b)   # 20 10

# Assign same value to multiple variables
p = q = r = 0
print(p, q, r)  # 0 0 0
\`\`\`

### Data Type Cheat Sheet

| Type | Examples | Convert from |
|---|---|---|
| int | 42, -10, 0 | int("5"), int(3.9) |
| float | 3.14, -2.5 | float("3.14"), float(5) |
| str | "hello", 'world' | str(42), str(True) |
| bool | True, False | bool(0), bool("") |`,
        },
        commands: [
          {
            name: 'type()',
            syntax: 'type(value)',
            description: { th: 'คืนชนิดข้อมูล', en: 'Returns the data type' },
            example: 'type(42)        # <class "int">\ntype("hello")   # <class "str">',
          },
          {
            name: 'isinstance()',
            syntax: 'isinstance(value, type)',
            description: { th: 'ตรวจว่าค่าเป็นชนิดนั้นไหม', en: 'Check if value is of a certain type' },
            example: 'isinstance(42, int)     # True\nisinstance(42, str)     # False',
          },
        ],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 3: INPUT & OUTPUT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    icon: '🖨️',
    color: '#3b82f6',
    colorDark: 'rgba(59,130,246,0.15)',
    requiredXP: 120,
    title: { th: 'รับและแสดงผล', en: 'Input & Output' },
    description: {
      th: 'เรียนรู้ print() และ input() เพื่อโต้ตอบกับผู้ใช้',
      en: 'Learn print() and input() to interact with users',
    },
    lessons: [
      {
        id: '3-1',
        title: { th: 'print() — แสดงผล', en: 'print() — Display Output' },
        xpReward: 30,
        hasFlowchart: true,
        content: {
          th: `## คำสั่ง print()

print() คือคำสั่งที่ใช้ **แสดงข้อมูลบนหน้าจอ** เปรียบเหมือนลำโพงที่ส่งเสียงให้ได้ยิน

### รูปแบบพื้นฐาน

\`\`\`python
# แสดงข้อความ
print("สวัสดีชาวโลก!")

# แสดงตัวแปร
name = "Python"
print(name)

# แสดงหลายค่า (คั่นด้วย comma)
print("ชื่อ:", name, "เวอร์ชัน:", 3)
# ชื่อ: Python เวอร์ชัน: 3
\`\`\`

### ตัวเลือกพิเศษ: sep และ end

\`\`\`python
# sep — กำหนดตัวคั่นระหว่างค่า (ค่าเริ่มต้นคือ " ")
print("แอปเปิ้ล", "กล้วย", "มะม่วง", sep=", ")
# แอปเปิ้ล, กล้วย, มะม่วง

print("2024", "06", "23", sep="-")
# 2024-06-23

# end — กำหนดตัวสิ้นสุด (ค่าเริ่มต้นคือ "\\n")
print("Hello", end=" ")
print("World")
# Hello World  (อยู่บรรทัดเดียวกัน!)

# พิมพ์โดยไม่ขึ้นบรรทัดใหม่
print("A", end="")
print("B", end="")
print("C")
# ABC
\`\`\`

### f-string — จัดรูปแบบขั้นเทพ

\`\`\`python
name = "สมชาย"
score = 98.567
pi = 3.14159265

# รูปแบบตัวเลข
print(f"คะแนน: {score:.2f}")        # คะแนน: 98.57  (2 ตำแหน่ง)
print(f"Pi = {pi:.4f}")             # Pi = 3.1416
print(f"จำนวน: {1000000:,}")        # จำนวน: 1,000,000 (มี comma)
print(f"เปอร์เซ็นต์: {0.856:.1%}") # เปอร์เซ็นต์: 85.6%

# จัดตำแหน่ง (Alignment)
print(f"{'ชื่อ':<10} {'คะแนน':>6}")  # ชอบด้านซ้าย / ขวา
print(f"{'Alice':<10} {95:>6}")
print(f"{'Bob':<10} {87:>6}")
\`\`\`

### พิมพ์ pattern สวยๆ

\`\`\`python
# กรอบข้อความ
print("=" * 30)
print(f"{'ยินดีต้อนรับ':^30}")    # จัดกลาง
print("=" * 30)

# ตาราง
print(f"{'ชื่อ':<15} {'คะแนน':^10} {'เกรด':>5}")
print("-" * 32)
print(f"{'Alice':<15} {95:^10} {'A':>5}")
print(f"{'Bob':<15} {82:^10} {'B':>5}")
\`\`\``,
          en: `## The print() Function

print() is used to **display information on screen** — like a speaker that outputs sound.

### Basic Usage

\`\`\`python
# Display text
print("Hello, World!")

# Display variable
name = "Python"
print(name)

# Display multiple values (separated by comma)
print("Name:", name, "Version:", 3)
# Name: Python Version: 3
\`\`\`

### Special Options: sep and end

\`\`\`python
# sep — custom separator (default is " ")
print("Apple", "Banana", "Mango", sep=", ")
# Apple, Banana, Mango

print("2024", "06", "23", sep="-")
# 2024-06-23

# end — custom ending (default is "\\n")
print("Hello", end=" ")
print("World")
# Hello World  (same line!)

# No newline
print("A", end="")
print("B", end="")
print("C")
# ABC
\`\`\`

### f-string — Advanced Formatting

\`\`\`python
name = "Alice"
score = 98.567
pi = 3.14159265

# Number formatting
print(f"Score: {score:.2f}")           # Score: 98.57  (2 decimals)
print(f"Pi = {pi:.4f}")               # Pi = 3.1416
print(f"Count: {1000000:,}")          # Count: 1,000,000
print(f"Percentage: {0.856:.1%}")     # Percentage: 85.6%

# Alignment
print(f"{'Name':<10} {'Score':>6}")   # left / right
print(f"{'Alice':<10} {95:>6}")
print(f"{'Bob':<10} {87:>6}")
\`\`\`

### Creating Pretty Patterns

\`\`\`python
# Bordered text
print("=" * 30)
print(f"{'Welcome':^30}")   # center aligned
print("=" * 30)

# Table
print(f"{'Name':<15} {'Score':^10} {'Grade':>5}")
print("-" * 32)
print(f"{'Alice':<15} {95:^10} {'A':>5}")
print(f"{'Bob':<15} {82:^10} {'B':>5}")
\`\`\``,
        },
        commands: [
          {
            name: 'print()',
            syntax: 'print(*values, sep=" ", end="\\n")',
            description: { th: 'แสดงข้อมูลบนหน้าจอ', en: 'Display data on screen' },
            example: 'print("Hello!")\nprint("a", "b", sep="-")  # a-b\nprint("Hi", end="!")       # Hi!',
          },
        ],
      },
      {
        id: '3-2',
        title: { th: 'input() — รับข้อมูล', en: 'input() — Get User Input' },
        xpReward: 35,
        hasFlowchart: true,
        content: {
          th: `## คำสั่ง input()

input() ใช้ **รับข้อมูลจากผู้ใช้** — เหมือนกล่องที่รอให้คนพิมพ์แล้วกด Enter

### รูปแบบพื้นฐาน

\`\`\`python
# รับข้อมูลพื้นฐาน
name = input("ชื่อของคุณ: ")
print(f"สวัสดี, {name}!")
\`\`\`

### ⚠️ input() คืนค่าเป็น str เสมอ!

\`\`\`python
# ผิด! ไม่สามารถบวกตัวเลขกับ string ได้
age = input("อายุ: ")
print(age + 1)    # TypeError!

# ถูก! ต้องแปลงชนิดก่อน
age = int(input("อายุ: "))
print(age + 1)    # ทำงานได้!

height = float(input("ส่วนสูง (cm): "))
print(f"ส่วนสูงในเมตร: {height/100:.2f} m")
\`\`\`

### รับหลายค่าพร้อมกัน

\`\`\`python
# รับทีละบรรทัด
name = input("ชื่อ: ")
age = int(input("อายุ: "))
city = input("เมือง: ")

print(f"สวัสดี {name} อายุ {age} ปี จาก{city}")
\`\`\`

### รับหลายค่าในบรรทัดเดียว (ขั้นสูง)

\`\`\`python
# รับ 3 ตัวเลขในบรรทัดเดียว (คั่นด้วยช่องว่าง)
# ผู้ใช้พิมพ์: 1 2 3
a, b, c = input("กรอก 3 ตัวเลข: ").split()
a, b, c = int(a), int(b), int(c)
print(f"ผลรวม = {a + b + c}")
\`\`\`

### ตัวอย่างโปรแกรมครบๆ

\`\`\`python
# โปรแกรมคำนวณ BMI
print("=== คำนวณ BMI ===")
name = input("ชื่อ: ")
weight = float(input("น้ำหนัก (kg): "))
height = float(input("ส่วนสูง (cm): "))

height_m = height / 100
bmi = weight / (height_m ** 2)

print(f"\\nผล BMI ของ {name}:")
print(f"BMI = {bmi:.1f}")

if bmi < 18.5:
    status = "น้ำหนักน้อย"
elif bmi < 25:
    status = "ปกติ ✅"
elif bmi < 30:
    status = "น้ำหนักเกิน"
else:
    status = "อ้วน"

print(f"สถานะ: {status}")
\`\`\``,
          en: `## The input() Function

input() is used to **receive data from the user** — like a box waiting for someone to type and press Enter.

### Basic Usage

\`\`\`python
# Get basic input
name = input("Your name: ")
print(f"Hello, {name}!")
\`\`\`

### ⚠️ input() Always Returns a String!

\`\`\`python
# Wrong! Can't add a number to a string
age = input("Age: ")
print(age + 1)    # TypeError!

# Correct! Convert type first
age = int(input("Age: "))
print(age + 1)    # Works!

height = float(input("Height (cm): "))
print(f"Height in meters: {height/100:.2f} m")
\`\`\`

### Receive Multiple Values

\`\`\`python
# One per line
name = input("Name: ")
age = int(input("Age: "))
city = input("City: ")

print(f"Hello {name}, age {age}, from {city}")
\`\`\`

### Multiple Values on One Line (Advanced)

\`\`\`python
# User types: 1 2 3
a, b, c = input("Enter 3 numbers: ").split()
a, b, c = int(a), int(b), int(c)
print(f"Sum = {a + b + c}")
\`\`\`

### Complete Program Example

\`\`\`python
# BMI Calculator
print("=== BMI Calculator ===")
name = input("Name: ")
weight = float(input("Weight (kg): "))
height = float(input("Height (cm): "))

height_m = height / 100
bmi = weight / (height_m ** 2)

print(f"\\nBMI result for {name}:")
print(f"BMI = {bmi:.1f}")

if bmi < 18.5:
    status = "Underweight"
elif bmi < 25:
    status = "Normal ✅"
elif bmi < 30:
    status = "Overweight"
else:
    status = "Obese"

print(f"Status: {status}")
\`\`\``,
        },
        commands: [
          {
            name: 'input()',
            syntax: 'input(prompt)',
            description: { th: 'รับข้อมูลจากผู้ใช้ (คืนค่าเป็น str เสมอ)', en: 'Get user input (always returns str)' },
            example: 'name = input("Name: ")\nage = int(input("Age: "))',
          },
          {
            name: '.split()',
            syntax: 'string.split(separator)',
            description: { th: 'แบ่งข้อความที่รับมาเป็นหลายค่า', en: 'Split input string into multiple values' },
            example: 'a, b = input("2 nums: ").split()\na, b = int(a), int(b)',
          },
        ],
      },
      {
        id: '3-3',
        title: { th: 'การจัดรูปแบบตัวเลข', en: 'Number Formatting' },
        xpReward: 30,
        hasFlowchart: false,
        content: {
          th: `## การจัดรูปแบบตัวเลขใน Python

### format specifiers ใน f-string

\`\`\`python
pi = 3.14159265358

# จำนวนทศนิยม
print(f"{pi:.0f}")    # 3      (0 ตำแหน่ง)
print(f"{pi:.2f}")    # 3.14   (2 ตำแหน่ง)
print(f"{pi:.5f}")    # 3.14159 (5 ตำแหน่ง)

# จำนวนเงิน
price = 1234567.89
print(f"฿\{price:,.2f\}")   # ฿1,234,567.89

# เปอร์เซ็นต์
ratio = 0.8567
print(f"{ratio:.1%}")   # 85.7%
print(f"{ratio:.0%}")   # 86%

# เลขยกกำลัง (Scientific notation)
big = 1234567890
print(f"{big:.2e}")   # 1.23e+09

# ใส่ศูนย์นำหน้า
num = 7
print(f"{num:03d}")   # 007  (กว้าง 3 ใส่ 0 นำหน้า)
\`\`\`

### ตัวอย่าง: ใบเสร็จร้านอาหาร

\`\`\`python
print("=" * 35)
print(f"{'ใบเสร็จ':^35}")
print("=" * 35)

items = [
    ("ข้าวผัด", 2, 60),
    ("ต้มยำ", 1, 120),
    ("น้ำเปล่า", 3, 15),
]

total = 0
for name, qty, price in items:
    subtotal = qty * price
    total += subtotal
    print(f"{name:<12} {qty:>3} x {price:>4} = {subtotal:>6,.0f}฿")

print("-" * 35)
print(f"{'รวม':>27} {total:>6,.0f}฿")
vat = total * 0.07
print(f"{'VAT 7%':>27} {vat:>6,.0f}฿")
print(f"{'รวมทั้งหมด':>27} {total+vat:>6,.0f}฿")
print("=" * 35)
\`\`\``,
          en: `## Number Formatting in Python

### Format Specifiers in f-string

\`\`\`python
pi = 3.14159265358

# Decimal places
print(f"{pi:.0f}")    # 3      (0 places)
print(f"{pi:.2f}")    # 3.14   (2 places)
print(f"{pi:.5f}")    # 3.14159 (5 places)

# Currency
price = 1234567.89
print(f"$\{price:,.2f\}")   # $1,234,567.89

# Percentage
ratio = 0.8567
print(f"{ratio:.1%}")   # 85.7%
print(f"{ratio:.0%}")   # 86%

# Scientific notation
big = 1234567890
print(f"{big:.2e}")   # 1.23e+09

# Zero-padded
num = 7
print(f"{num:03d}")   # 007  (width 3, pad with zeros)
\`\`\`

### Example: Restaurant Receipt

\`\`\`python
print("=" * 35)
print(f"{'RECEIPT':^35}")
print("=" * 35)

items = [
    ("Fried Rice", 2, 60),
    ("Tom Yum", 1, 120),
    ("Water", 3, 15),
]

total = 0
for name, qty, price in items:
    subtotal = qty * price
    total += subtotal
    print(f"{name:<12} {qty:>3} x {price:>4} = {subtotal:>6,.0f}")

print("-" * 35)
print(f"{'Subtotal':>27} {total:>6,.0f}")
vat = total * 0.07
print(f"{'VAT 7%':>27} {vat:>6,.0f}")
print(f"{'Total':>27} {total+vat:>6,.0f}")
print("=" * 35)
\`\`\``,
        },
        commands: [],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 4: CONDITIONALS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    icon: '🔀',
    color: '#f59e0b',
    colorDark: 'rgba(245,158,11,0.15)',
    requiredXP: 215,
    title: { th: 'เงื่อนไข (Conditionals)', en: 'Conditionals' },
    description: {
      th: 'เรียนรู้การตัดสินใจในโปรแกรมด้วย if, elif, else และ nested conditions',
      en: 'Learn decision making with if, elif, else and nested conditions',
    },
    lessons: [
      {
        id: '4-1',
        title: { th: 'if / else', en: 'if / else' },
        xpReward: 35,
        hasFlowchart: true,
        content: {
          th: `## คำสั่ง if / else

if-else เหมือน **ทางแยก** ที่โปรแกรมต้องเลือกเส้นทาง

### รูปแบบ

\`\`\`python
if เงื่อนไข:
    # รันเมื่อเงื่อนไขเป็น True
else:
    # รันเมื่อเงื่อนไขเป็น False
\`\`\`

> ⚠️ **Python ใช้ indentation (การเยื้อง 4 ช่องว่าง)** แทนวงเล็บปีกกา { }

### ตัวดำเนินการเปรียบเทียบ

\`\`\`python
x = 10
print(x == 10)   # True   (เท่ากัน)
print(x != 5)    # True   (ไม่เท่ากัน)
print(x > 8)     # True   (มากกว่า)
print(x < 8)     # False  (น้อยกว่า)
print(x >= 10)   # True   (มากกว่าหรือเท่ากัน)
print(x <= 9)    # False  (น้อยกว่าหรือเท่ากัน)
\`\`\`

### ตัวอย่างพื้นฐาน

\`\`\`python
# ตัวอย่าง 1: ตรวจสอบอายุ
age = int(input("อายุ: "))
if age >= 18:
    print("คุณบรรลุนิติภาวะแล้ว")
else:
    print(f"อีก {18 - age} ปีจะบรรลุนิติภาวะ")

# ตัวอย่าง 2: ตรวจสอบเลขคู่/คี่
num = int(input("กรอกตัวเลข: "))
if num % 2 == 0:
    print(f"{num} เป็นเลขคู่")
else:
    print(f"{num} เป็นเลขคี่")

# ตัวอย่าง 3: หาค่ามาก/น้อย
a = int(input("a = "))
b = int(input("b = "))
if a > b:
    print(f"a ({a}) มากกว่า b ({b})")
else:
    print(f"b ({b}) มากกว่าหรือเท่ากับ a ({a})")
\`\`\`

### if โดยไม่มี else

\`\`\`python
score = int(input("คะแนน: "))
if score == 100:
    print("🎉 Perfect Score!")   # แสดงเฉพาะเมื่อได้ 100

print("ขอบคุณที่เข้าร่วม!")   # แสดงเสมอ
\`\`\``,
          en: `## if / else Statement

if-else is like a **crossroads** where the program must choose a path.

### Structure

\`\`\`python
if condition:
    # runs when condition is True
else:
    # runs when condition is False
\`\`\`

> ⚠️ **Python uses indentation (4 spaces)** instead of curly braces { }

### Comparison Operators

\`\`\`python
x = 10
print(x == 10)   # True   (equals)
print(x != 5)    # True   (not equal)
print(x > 8)     # True   (greater than)
print(x < 8)     # False  (less than)
print(x >= 10)   # True   (greater than or equal)
print(x <= 9)    # False  (less than or equal)
\`\`\`

### Basic Examples

\`\`\`python
# Example 1: Age check
age = int(input("Age: "))
if age >= 18:
    print("You are an adult")
else:
    print(f"{18 - age} more years until adulthood")

# Example 2: Even or Odd
num = int(input("Enter a number: "))
if num % 2 == 0:
    print(f"{num} is even")
else:
    print(f"{num} is odd")

# Example 3: Find larger value
a = int(input("a = "))
b = int(input("b = "))
if a > b:
    print(f"a ({a}) is greater than b ({b})")
else:
    print(f"b ({b}) is greater than or equal to a ({a})")
\`\`\`

### if Without else

\`\`\`python
score = int(input("Score: "))
if score == 100:
    print("🎉 Perfect Score!")   # only shows when score is 100

print("Thank you for participating!")   # always shows
\`\`\``,
        },
        commands: [
          {
            name: 'if / else',
            syntax: 'if condition:\n    code\nelse:\n    code',
            description: { th: 'รันโค้ดตามเงื่อนไข', en: 'Run code based on condition' },
            example: 'if x > 0:\n    print("positive")\nelse:\n    print("not positive")',
          },
        ],
      },
      {
        id: '4-2',
        title: { th: 'elif — หลายเงื่อนไข', en: 'elif — Multiple Conditions' },
        xpReward: 35,
        hasFlowchart: true,
        content: {
          th: `## คำสั่ง elif

elif (else if) ใช้เมื่อมีเงื่อนไข**มากกว่า 2 ทาง**

\`\`\`python
if เงื่อนไข1:
    # ทาง 1
elif เงื่อนไข2:
    # ทาง 2
elif เงื่อนไข3:
    # ทาง 3
else:
    # ทางสุดท้าย
\`\`\`

### ตัวอย่าง: ระบบเกรด

\`\`\`python
score = int(input("คะแนน (0-100): "))

if score >= 80:
    grade = "A"
    msg = "ยอดเยี่ยม! 🌟"
elif score >= 70:
    grade = "B"
    msg = "ดีมาก! 👍"
elif score >= 60:
    grade = "C"
    msg = "พอใช้ได้"
elif score >= 50:
    grade = "D"
    msg = "ต้องพยายามมากขึ้น"
else:
    grade = "F"
    msg = "สอบไม่ผ่าน ❌"

print(f"เกรด: {grade} — {msg}")
\`\`\`

### ตัวดำเนินการตรรกะ

\`\`\`python
age = 25
has_id = True
is_vip = False

# and — ทุกเงื่อนไขต้องจริง
if age >= 18 and has_id:
    print("เข้าได้")

# or — อย่างน้อยหนึ่งต้องจริง
if is_vip or age >= 60:
    print("ได้รับส่วนลด")

# not — กลับค่า
if not is_vip:
    print("ไม่ใช่ VIP")

# รวมหลายตัว
day = "เสาร์"
time_hour = 10
if (day == "เสาร์" or day == "อาทิตย์") and (9 <= time_hour <= 17):
    print("ร้านเปิดวันหยุด")
\`\`\`

### ตัวอย่าง: สถานีรถไฟ (ตั๋ว)

\`\`\`python
age = int(input("อายุผู้โดยสาร: "))
full_price = 100

if age <= 5:
    price = 0
    desc = "เด็กเล็ก (ฟรี)"
elif age <= 12:
    price = full_price * 0.5
    desc = "เด็ก (50%)"
elif age <= 59:
    price = full_price
    desc = "ผู้ใหญ่ (เต็ม)"
else:
    price = full_price * 0.7
    desc = "ผู้สูงอายุ (70%)"

print(f"ประเภท: {desc}")
print(f"ราคาตั๋ว: {price:.0f} บาท")
\`\`\``,
          en: `## elif Statement

elif (else if) is used when you have **more than 2 conditions**.

\`\`\`python
if condition1:
    # path 1
elif condition2:
    # path 2
elif condition3:
    # path 3
else:
    # final path
\`\`\`

### Example: Grade System

\`\`\`python
score = int(input("Score (0-100): "))

if score >= 80:
    grade = "A"
    msg = "Excellent! 🌟"
elif score >= 70:
    grade = "B"
    msg = "Very Good! 👍"
elif score >= 60:
    grade = "C"
    msg = "Satisfactory"
elif score >= 50:
    grade = "D"
    msg = "Needs improvement"
else:
    grade = "F"
    msg = "Failed ❌"

print(f"Grade: {grade} — {msg}")
\`\`\`

### Logical Operators

\`\`\`python
age = 25
has_id = True
is_vip = False

# and — all conditions must be true
if age >= 18 and has_id:
    print("You may enter")

# or — at least one must be true
if is_vip or age >= 60:
    print("Discount applied")

# not — reverses
if not is_vip:
    print("Not a VIP member")

# Combined
day = "Saturday"
hour = 10
if (day == "Saturday" or day == "Sunday") and (9 <= hour <= 17):
    print("Weekend store hours")
\`\`\``,
        },
        commands: [
          {
            name: 'elif',
            syntax: 'elif condition:\n    code',
            description: { th: 'เพิ่มเงื่อนไขทางเลือก', en: 'Add alternative condition' },
            example: 'if x > 0:\n    print("+")\nelif x < 0:\n    print("-")\nelse:\n    print("0")',
          },
        ],
      },
      {
        id: '4-3',
        title: { th: 'if ซ้อนกัน (Nested if)', en: 'Nested if' },
        xpReward: 35,
        hasFlowchart: true,
        content: {
          th: `## Nested if — เงื่อนไขซ้อนกัน

เราสามารถใส่ if ไว้ข้างใน if อีกทีได้ เหมือน **ประตูด่านแรก ผ่านแล้วมีด่านที่สอง**

\`\`\`python
if เงื่อนไขภายนอก:
    if เงื่อนไขภายใน:
        # รันเมื่อผ่านทั้งสองด่าน
    else:
        # ผ่านด่านแรก แต่ไม่ผ่านด่านสอง
else:
    # ไม่ผ่านด่านแรก
\`\`\`

### ตัวอย่าง: ระบบเข้างาน

\`\`\`python
has_badge = input("มีบัตรผ่าน? (y/n): ") == "y"

if has_badge:
    # ผ่านด่านแรก → ตรวจเวลา
    hour = int(input("เวลาปัจจุบัน (ชั่วโมง): "))
    if 8 <= hour <= 18:
        print("✅ เข้าได้! อยู่ในเวลาทำงาน")
    else:
        print("⚠️ นอกเวลาทำงาน ต้องขออนุญาต")
else:
    print("❌ ไม่มีบัตรผ่าน เข้าไม่ได้")
\`\`\`

### ตัวอย่าง: เกม RPG เลือกตัวละคร

\`\`\`python
race = input("เลือกเผ่า (human/elf/dwarf): ")
class_ = input("เลือกอาชีพ (warrior/mage): ")

if race == "human":
    if class_ == "warrior":
        bonus = "+10 HP, +5 ATK"
    else:
        bonus = "+10 MP, +8 INT"
elif race == "elf":
    if class_ == "warrior":
        bonus = "+5 HP, +10 AGI"
    else:
        bonus = "+20 MP, +12 INT"
else:  # dwarf
    if class_ == "warrior":
        bonus = "+20 HP, +8 ATK"
    else:
        bonus = "+5 MP, +5 INT, +10 DEF"

print(f"ตัวละคร: {race.capitalize()} {class_.capitalize()}")
print(f"Bonus: {bonus}")
\`\`\`

### One-liner if (Ternary)

\`\`\`python
# รูปแบบ: ค่าถ้าจริง if เงื่อนไข else ค่าถ้าเท็จ
age = 20
status = "ผู้ใหญ่" if age >= 18 else "เด็ก"
print(status)  # ผู้ใหญ่

# ใช้ใน f-string
score = 75
result = f"ผ่าน ✅" if score >= 50 else "ไม่ผ่าน ❌"
print(result)
\`\`\``,
          en: `## Nested if — Conditions Inside Conditions

You can put an if inside another if — like **passing gate 1 to reach gate 2**.

\`\`\`python
if outer_condition:
    if inner_condition:
        # runs when both conditions pass
    else:
        # passed outer, failed inner
else:
    # failed outer condition
\`\`\`

### Example: Building Access System

\`\`\`python
has_badge = input("Have badge? (y/n): ") == "y"

if has_badge:
    # passed gate 1 → check time
    hour = int(input("Current hour: "))
    if 8 <= hour <= 18:
        print("✅ Access granted! Working hours.")
    else:
        print("⚠️ Outside working hours. Need permission.")
else:
    print("❌ No badge. Access denied.")
\`\`\`

### One-liner if (Ternary)

\`\`\`python
# Format: value_if_true if condition else value_if_false
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult

# Use in f-string
score = 75
result = f"Pass ✅" if score >= 50 else "Fail ❌"
print(result)
\`\`\``,
        },
        commands: [
          {
            name: 'Ternary (One-liner if)',
            syntax: 'value_true if condition else value_false',
            description: { th: 'if แบบย่อในบรรทัดเดียว', en: 'Compact one-line if expression' },
            example: 'x = "even" if n % 2 == 0 else "odd"',
          },
        ],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 5: LOOPS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    icon: '🔁',
    color: '#ec4899',
    colorDark: 'rgba(236,72,153,0.15)',
    requiredXP: 320,
    title: { th: 'การวนซ้ำ (Loops)', en: 'Loops' },
    description: {
      th: 'เรียนรู้ for loop, while loop และ pattern ต่างๆ',
      en: 'Learn for loop, while loop, and various patterns',
    },
    lessons: [
      {
        id: '5-1',
        title: { th: 'for loop พื้นฐาน', en: 'for Loop Basics' },
        xpReward: 40,
        hasFlowchart: true,
        content: {
          th: `## for loop

for loop ใช้เมื่อ **รู้จำนวนรอบที่แน่นอน** เปรียบเหมือนนับลูกปัดที่รู้จำนวนแน่นอน

### กับ range()

\`\`\`python
# range(stop) — นับ 0 ถึง stop-1
for i in range(5):
    print(i)
# 0 1 2 3 4

# range(start, stop) — นับ start ถึง stop-1
for i in range(1, 6):
    print(i)
# 1 2 3 4 5

# range(start, stop, step) — กำหนด step
for i in range(0, 11, 2):
    print(i)
# 0 2 4 6 8 10

# นับถอยหลัง
for i in range(5, 0, -1):
    print(i)
# 5 4 3 2 1
\`\`\`

### วนใน String

\`\`\`python
word = "Python"
for char in word:
    print(char)
# P y t h o n

# นับสระ
vowels = "aeiouAEIOU"
word = input("กรอกคำ: ")
count = 0
for ch in word:
    if ch in vowels:
        count += 1
print(f"มีสระ {count} ตัว")
\`\`\`

### enumerate() — ได้ทั้ง index และ ค่า

\`\`\`python
fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง"]
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")
# 1. แอปเปิ้ล
# 2. กล้วย
# 3. มะม่วง

# เริ่ม index ที่ 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
\`\`\`

### ตัวอย่างการคำนวณ

\`\`\`python
# ผลรวม 1 ถึง 100
total = 0
for i in range(1, 101):
    total += i
print(f"ผลรวม 1-100 = {total}")   # 5050

# แฟกทอเรียล 5! = 1×2×3×4×5
factorial = 1
for i in range(1, 6):
    factorial *= i
print(f"5! = {factorial}")   # 120

# หาเลขจากผู้ใช้
numbers = []
n = int(input("จำนวนข้อมูล: "))
for i in range(n):
    num = float(input(f"ข้อมูลที่ {i+1}: "))
    numbers.append(num)
print(f"เฉลี่ย: {sum(numbers)/len(numbers):.2f}")
\`\`\``,
          en: `## for Loop

A for loop is used when you **know exactly how many times to repeat**.

### With range()

\`\`\`python
# range(stop) — count 0 to stop-1
for i in range(5):
    print(i)
# 0 1 2 3 4

# range(start, stop) — count start to stop-1
for i in range(1, 6):
    print(i)
# 1 2 3 4 5

# range(start, stop, step) — custom step
for i in range(0, 11, 2):
    print(i)
# 0 2 4 6 8 10

# Count down
for i in range(5, 0, -1):
    print(i)
# 5 4 3 2 1
\`\`\`

### Looping Over a String

\`\`\`python
word = "Python"
for char in word:
    print(char)
# P y t h o n
\`\`\`

### enumerate() — Get Both Index and Value

\`\`\`python
fruits = ["Apple", "Banana", "Mango"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. Apple
# 2. Banana
# 3. Mango
\`\`\`

### Calculation Examples

\`\`\`python
# Sum 1 to 100
total = 0
for i in range(1, 101):
    total += i
print(f"Sum 1-100 = {total}")   # 5050

# Factorial 5! = 1×2×3×4×5
factorial = 1
for i in range(1, 6):
    factorial *= i
print(f"5! = {factorial}")   # 120
\`\`\``,
        },
        commands: [
          {
            name: 'for ... in range()',
            syntax: 'for i in range(start, stop, step):\n    code',
            description: { th: 'วนซ้ำตามจำนวนที่กำหนด', en: 'Repeat a specific number of times' },
            example: 'for i in range(3):\n    print(i)  # 0, 1, 2',
          },
          {
            name: 'enumerate()',
            syntax: 'enumerate(iterable, start=0)',
            description: { th: 'วนพร้อมได้ index', en: 'Loop with index' },
            example: 'for i, v in enumerate(["a","b"]):\n    print(i, v)  # 0 a, 1 b',
          },
        ],
      },
      {
        id: '5-2',
        title: { th: 'while loop', en: 'while Loop' },
        xpReward: 40,
        hasFlowchart: true,
        content: {
          th: `## while loop

while loop ใช้เมื่อ **ไม่รู้จำนวนรอบ แต่มีเงื่อนไขหยุด**

\`\`\`python
while เงื่อนไข:
    # วนซ้ำจนเงื่อนไขเป็น False
\`\`\`

### ตัวอย่างพื้นฐาน

\`\`\`python
# นับถอยหลัง
count = 5
while count > 0:
    print(f"{count}...")
    count -= 1
print("🚀 ปล่อยยาน!")

# รับข้อมูลจนกว่าจะถูกต้อง
while True:
    age = int(input("อายุ (1-120): "))
    if 1 <= age <= 120:
        break   # ออกจาก loop
    print("อายุไม่ถูกต้อง กรอกใหม่")
print(f"อายุ: {age} ปี")
\`\`\`

### break — หยุด loop ทันที

\`\`\`python
# หาตัวเลขแรกที่หารด้วย 7 ลงตัวในช่วง 1-100
for i in range(1, 101):
    if i % 7 == 0:
        print(f"พบเลข: {i}")
        break   # หยุดทันที
\`\`\`

### continue — ข้ามรอบนี้

\`\`\`python
# แสดงเลข 1-10 ยกเว้น 5
for i in range(1, 11):
    if i == 5:
        continue   # ข้าม 5 แล้วไปรอบถัดไป
    print(i)
# 1 2 3 4 6 7 8 9 10
\`\`\`

### ตัวอย่าง: เกมทายเลข

\`\`\`python
import random
secret = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("🎮 เกมทายเลข 1-100")
print(f"คุณมี {max_attempts} โอกาส!")

while attempts < max_attempts:
    guess = int(input(f"ทาย (เหลือ {max_attempts - attempts} ครั้ง): "))
    attempts += 1

    if guess == secret:
        print(f"🎉 ถูกต้อง! เลขคือ {secret} (ทาย {attempts} ครั้ง)")
        break
    elif guess < secret:
        print("⬆️ มากกว่านี้")
    else:
        print("⬇️ น้อยกว่านี้")
else:
    print(f"😢 หมดโอกาส! เลขคือ {secret}")
\`\`\``,
          en: `## while Loop

A while loop is used when you **don't know how many times, but have a stopping condition**.

\`\`\`python
while condition:
    # repeat until condition is False
\`\`\`

### Basic Examples

\`\`\`python
# Countdown
count = 5
while count > 0:
    print(f"{count}...")
    count -= 1
print("🚀 Launch!")

# Accept input until valid
while True:
    age = int(input("Age (1-120): "))
    if 1 <= age <= 120:
        break   # exit loop
    print("Invalid age. Try again.")
print(f"Age: {age}")
\`\`\`

### break — Stop the Loop Immediately

\`\`\`python
# Find first number divisible by 7 from 1-100
for i in range(1, 101):
    if i % 7 == 0:
        print(f"Found: {i}")
        break   # stop immediately
\`\`\`

### continue — Skip This Iteration

\`\`\`python
# Print 1-10, skip 5
for i in range(1, 11):
    if i == 5:
        continue   # skip 5
    print(i)
# 1 2 3 4 6 7 8 9 10
\`\`\``,
        },
        commands: [
          {
            name: 'while',
            syntax: 'while condition:\n    code',
            description: { th: 'วนซ้ำจนเงื่อนไขเป็น False', en: 'Repeat until condition is False' },
            example: 'x = 0\nwhile x < 3:\n    print(x)\n    x += 1',
          },
          {
            name: 'break / continue',
            syntax: 'break\ncontinue',
            description: { th: 'break หยุด, continue ข้ามรอบ', en: 'break exits, continue skips current iteration' },
            example: 'for i in range(5):\n    if i == 3: break\n    print(i)  # 0,1,2',
          },
        ],
      },
      {
        id: '5-3',
        title: { th: 'Loop ซ้อนกัน (Nested Loops)', en: 'Nested Loops' },
        xpReward: 45,
        hasFlowchart: false,
        content: {
          th: `## Nested Loops — Loop ซ้อนกัน

Loop ซ้อนกันใช้สำหรับ **ข้อมูล 2 มิติ** เช่น ตาราง, สมการ, pattern ต่างๆ

### ตัวอย่าง: ตารางสูตรคูณ

\`\`\`python
# Loop ภายนอก: แถว (row)
for i in range(1, 4):
    # Loop ภายใน: คอลัมน์ (column)
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="  ")
    print()  # ขึ้นบรรทัดใหม่
# 1×1=1  1×2=2  1×3=3
# 2×1=2  2×2=4  2×3=6
# 3×1=3  3×2=6  3×3=9
\`\`\`

### ตัวอย่าง: วาด Pattern รูปดาว

\`\`\`python
n = 5

# สามเหลี่ยมด้านขวา
print("สามเหลี่ยม:")
for i in range(1, n+1):
    print("★" * i)
# ★
# ★★
# ★★★
# ★★★★
# ★★★★★

# สามเหลี่ยมกลับด้าน
print("\\nกลับด้าน:")
for i in range(n, 0, -1):
    print("★" * i)

# ปิรามิด
print("\\nปิรามิด:")
for i in range(1, n+1):
    spaces = " " * (n - i)
    stars = "★" * (2*i - 1)
    print(spaces + stars)
\`\`\`

### ตัวอย่าง: หาเลขเฉพาะ (Prime Numbers)

\`\`\`python
print("เลขเฉพาะตั้งแต่ 2-50:")
for num in range(2, 51):
    is_prime = True
    for divisor in range(2, int(num**0.5) + 1):
        if num % divisor == 0:
            is_prime = False
            break
    if is_prime:
        print(num, end=" ")
# 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
\`\`\`

### zip() — วนหลาย list พร้อมกัน

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [95, 82, 78]
grades = ["A", "B", "C"]

for name, score, grade in zip(names, scores, grades):
    print(f"{name:<10} {score:>5}  {grade}")
# Alice         95  A
# Bob           82  B
# Charlie       78  C
\`\`\``,
          en: `## Nested Loops

Nested loops work on **2D data** like tables, grids, and patterns.

### Example: Multiplication Table

\`\`\`python
# Outer loop: rows
for i in range(1, 4):
    # Inner loop: columns
    for j in range(1, 4):
        print(f"{i}×{j}={i*j}", end="  ")
    print()  # newline
# 1×1=1  1×2=2  1×3=3
# 2×1=2  2×2=4  2×3=6
# 3×1=3  3×2=6  3×3=9
\`\`\`

### Example: Star Patterns

\`\`\`python
n = 5

# Right triangle
for i in range(1, n+1):
    print("★" * i)

# Pyramid
for i in range(1, n+1):
    spaces = " " * (n - i)
    stars = "★" * (2*i - 1)
    print(spaces + stars)
\`\`\`

### zip() — Loop Multiple Lists Together

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [95, 82, 78]

for name, score in zip(names, scores):
    print(f"{name:<10} {score:>5}")
\`\`\``,
        },
        commands: [
          {
            name: 'zip()',
            syntax: 'zip(list1, list2, ...)',
            description: { th: 'วนหลาย iterable พร้อมกัน', en: 'Iterate multiple iterables together' },
            example: 'for a, b in zip([1,2], ["x","y"]):\n    print(a, b)  # 1 x, 2 y',
          },
        ],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 6: LISTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    icon: '📋',
    color: '#06b6d4',
    colorDark: 'rgba(6,182,212,0.15)',
    requiredXP: 445,
    title: { th: 'List และ Collections', en: 'Lists & Collections' },
    description: {
      th: 'เรียนรู้การเก็บข้อมูลหลายๆ ตัวใน List พร้อมการจัดการขั้นสูง',
      en: 'Learn to store multiple values and manage them with advanced techniques',
    },
    lessons: [
      {
        id: '6-1',
        title: { th: 'List พื้นฐาน', en: 'List Basics' },
        xpReward: 45,
        hasFlowchart: false,
        content: {
          th: `## List คืออะไร?

List คือ **กล่องเก็บของหลายชิ้น** เรียงลำดับกัน เปรียบเหมือนตะกร้าที่ใส่ผลไม้ได้หลายอย่าง

\`\`\`python
fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]   # ผสมชนิดได้!
empty = []                           # list ว่าง
\`\`\`

### เข้าถึงสมาชิก (Index เริ่มที่ 0!)

\`\`\`python
fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง", "องุ่น"]
#          0           1        2         3

print(fruits[0])    # แอปเปิ้ล  (แรกสุด)
print(fruits[2])    # มะม่วง
print(fruits[-1])   # องุ่น    (ท้ายสุด)
print(fruits[-2])   # มะม่วง
print(len(fruits))  # 4        (จำนวนสมาชิก)
\`\`\`

### การตัด List (Slicing)

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[2:5])     # [2, 3, 4]
print(nums[:4])      # [0, 1, 2, 3]
print(nums[6:])      # [6, 7, 8, 9]
print(nums[::2])     # [0, 2, 4, 6, 8]  (ทีละ 2)
print(nums[::-1])    # [9,8,7,6,5,4,3,2,1,0] (กลับหัว)
\`\`\`

### เพิ่ม ลบ แก้ไขสมาชิก

\`\`\`python
fruits = ["แอปเปิ้ล", "กล้วย"]

# เพิ่ม
fruits.append("มะม่วง")          # เพิ่มท้าย
fruits.insert(1, "ส้ม")          # แทรกที่ index 1
fruits.extend(["องุ่น", "แตงโม"]) # เพิ่มหลายอัน

print(fruits)
# ["แอปเปิ้ล", "ส้ม", "กล้วย", "มะม่วง", "องุ่น", "แตงโม"]

# แก้ไข
fruits[0] = "สับปะรด"

# ลบ
fruits.remove("กล้วย")    # ลบโดยค่า
popped = fruits.pop()     # ลบตัวสุดท้าย คืนค่ากลับ
fruits.pop(0)             # ลบที่ index 0
del fruits[1]             # ลบที่ index 1
fruits.clear()            # ล้างทั้งหมด
\`\`\`

### ค้นหาและตรวจสอบ

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5]

print(5 in nums)          # True (มีอยู่ไหม?)
print(7 not in nums)      # True (ไม่มีอยู่?)
print(nums.count(1))      # 2   (นับจำนวน 1)
print(nums.index(4))      # 2   (อยู่ที่ index ไหน)

print(max(nums))          # 9
print(min(nums))          # 1
print(sum(nums))          # 36
\`\`\``,
          en: `## What is a List?

A List is an **ordered container for multiple items** — like a basket that holds many fruits.

\`\`\`python
fruits = ["Apple", "Banana", "Mango"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]   # mixed types!
empty = []                           # empty list
\`\`\`

### Accessing Items (Index starts at 0!)

\`\`\`python
fruits = ["Apple", "Banana", "Mango", "Grape"]
#          0          1        2        3

print(fruits[0])    # Apple  (first)
print(fruits[2])    # Mango
print(fruits[-1])   # Grape  (last)
print(len(fruits))  # 4
\`\`\`

### Slicing

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[2:5])     # [2, 3, 4]
print(nums[:4])      # [0, 1, 2, 3]
print(nums[6:])      # [6, 7, 8, 9]
print(nums[::2])     # [0, 2, 4, 6, 8]
print(nums[::-1])    # [9,8,7,6,5,4,3,2,1,0]
\`\`\`

### Add, Remove, Modify

\`\`\`python
fruits = ["Apple", "Banana"]

fruits.append("Mango")            # add to end
fruits.insert(1, "Orange")        # insert at index 1
fruits.extend(["Grape", "Melon"]) # add multiple

fruits.remove("Banana")           # remove by value
popped = fruits.pop()             # remove last, return it
del fruits[0]                     # delete at index
fruits.clear()                    # remove all
\`\`\``,
        },
        commands: [
          {
            name: '.append()',
            syntax: 'list.append(item)',
            description: { th: 'เพิ่มสมาชิกท้าย List', en: 'Add item to end' },
            example: 'nums = [1, 2]\nnums.append(3)  # [1, 2, 3]',
          },
          {
            name: '.insert()',
            syntax: 'list.insert(index, item)',
            description: { th: 'แทรกสมาชิกที่ตำแหน่งที่กำหนด', en: 'Insert item at position' },
            example: 'nums = [1, 3]\nnums.insert(1, 2)  # [1, 2, 3]',
          },
          {
            name: '.remove()',
            syntax: 'list.remove(value)',
            description: { th: 'ลบสมาชิกโดยค่า', en: 'Remove item by value' },
            example: 'nums = [1,2,3]\nnums.remove(2)  # [1,3]',
          },
          {
            name: '.sort()',
            syntax: 'list.sort(reverse=False)',
            description: { th: 'เรียงลำดับ List', en: 'Sort the list in place' },
            example: 'nums = [3,1,2]\nnums.sort()     # [1,2,3]\nnums.sort(reverse=True)  # [3,2,1]',
          },
        ],
      },
      {
        id: '6-2',
        title: { th: 'การเรียงและ List ขั้นสูง', en: 'Sorting & Advanced List' },
        xpReward: 45,
        hasFlowchart: false,
        content: {
          th: `## การเรียงลำดับ List

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# เรียงแบบ in-place (แก้ List เดิม)
nums.sort()
print(nums)   # [1, 1, 2, 3, 4, 5, 6, 9]

nums.sort(reverse=True)
print(nums)   # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() — คืน List ใหม่ โดยไม่แก้ของเดิม
nums2 = [3, 1, 4, 1, 5]
sorted_nums = sorted(nums2)
print(nums2)        # [3, 1, 4, 1, 5]  (ไม่เปลี่ยน)
print(sorted_nums)  # [1, 1, 3, 4, 5]

# เรียง string
words = ["banana", "apple", "cherry"]
words.sort()
print(words)   # ['apple', 'banana', 'cherry']

# เรียงตามความยาว
words.sort(key=len)
print(words)   # ['apple', 'banana', 'cherry']
\`\`\`

### List Comprehension — สร้าง List อย่างรวดเร็ว

\`\`\`python
# แบบปกติ (5 บรรทัด)
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# แบบ List Comprehension (1 บรรทัด)
squares = [i**2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]

# พร้อมเงื่อนไข
evens = [i for i in range(1, 21) if i % 2 == 0]
print(evens)   # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# แปลง List
names = ["alice", "bob", "charlie"]
upper_names = [name.upper() for name in names]
print(upper_names)   # ['ALICE', 'BOB', 'CHARLIE']

# กรอง List
scores = [45, 90, 62, 38, 85, 71]
passing = [s for s in scores if s >= 60]
print(passing)   # [90, 62, 85, 71]
\`\`\`

### ตัวอย่าง: วิเคราะห์คะแนน

\`\`\`python
# รับคะแนน
n = int(input("จำนวนนักเรียน: "))
scores = []
for i in range(n):
    s = float(input(f"คะแนนคนที่ {i+1}: "))
    scores.append(s)

# วิเคราะห์
avg = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)
passing = [s for s in scores if s >= 50]

print(f"\\n📊 ผลการวิเคราะห์")
print(f"เฉลี่ย: {avg:.2f}")
print(f"สูงสุด: {highest}")
print(f"ต่ำสุด: {lowest}")
print(f"ผ่าน: {len(passing)}/{n} คน ({len(passing)/n*100:.1f}%)")

# เรียงคะแนน
scores_sorted = sorted(scores, reverse=True)
print(f"\\nอันดับคะแนน: {scores_sorted}")
\`\`\``,
          en: `## Sorting Lists

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# In-place sort (modifies original)
nums.sort()
print(nums)   # [1, 1, 2, 3, 4, 5, 6, 9]

nums.sort(reverse=True)
print(nums)   # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() — returns new list, keeps original
nums2 = [3, 1, 4, 1, 5]
sorted_nums = sorted(nums2)
print(nums2)        # [3, 1, 4, 1, 5]  (unchanged)
print(sorted_nums)  # [1, 1, 3, 4, 5]
\`\`\`

### List Comprehension — Create Lists Quickly

\`\`\`python
# Normal way (5 lines)
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# List Comprehension (1 line!)
squares = [i**2 for i in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]

# With condition
evens = [i for i in range(1, 21) if i % 2 == 0]
print(evens)   # [2, 4, 6, 8, 10, ...]

# Transform list
names = ["alice", "bob"]
upper = [n.upper() for n in names]
print(upper)   # ['ALICE', 'BOB']

# Filter list
scores = [45, 90, 62, 38, 85]
passing = [s for s in scores if s >= 60]
print(passing)   # [90, 62, 85]
\`\`\``,
        },
        commands: [
          {
            name: 'sorted()',
            syntax: 'sorted(iterable, reverse=False)',
            description: { th: 'คืน List ที่เรียงแล้ว (ไม่แก้ของเดิม)', en: 'Returns new sorted list' },
            example: 'x = [3,1,2]\nsorted(x)  # [1,2,3]\nprint(x)   # [3,1,2] (unchanged)',
          },
          {
            name: 'List Comprehension',
            syntax: '[expr for item in iterable if condition]',
            description: { th: 'สร้าง List ในบรรทัดเดียว', en: 'Create a list in one line' },
            example: '[x**2 for x in range(5)]      # [0,1,4,9,16]\n[x for x in range(10) if x%2==0]  # [0,2,4,6,8]',
          },
        ],
      },
    ],
    exercises: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 7: FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    icon: '⚙️',
    color: '#f43f5e',
    colorDark: 'rgba(244,63,94,0.15)',
    requiredXP: 535,
    title: { th: 'ฟังก์ชัน (Functions)', en: 'Functions' },
    description: {
      th: 'เรียนรู้การสร้างและใช้ฟังก์ชันเพื่อจัดระเบียบโค้ดอย่างมีประสิทธิภาพ',
      en: 'Learn to create and use functions to organize code effectively',
    },
    lessons: [
      {
        id: '7-1',
        title: { th: 'def — สร้างฟังก์ชัน', en: 'def — Creating Functions' },
        xpReward: 50,
        hasFlowchart: false,
        content: {
          th: `## ฟังก์ชัน (Functions)

ฟังก์ชันเหมือน **เครื่องใช้ไฟฟ้า** — ใช้ซ้ำได้, ทำงานได้มาก, กดปุ่มเดียว

### ทำไมต้องใช้ฟังก์ชัน?

\`\`\`python
# ❌ ไม่ดี: โค้ดซ้ำซาก
name1 = "Alice"
msg1 = f"สวัสดี {name1}! ยินดีต้อนรับ"
print(msg1)

name2 = "Bob"
msg2 = f"สวัสดี {name2}! ยินดีต้อนรับ"
print(msg2)

# ✅ ดี: ใช้ฟังก์ชัน
def greet(name):
    print(f"สวัสดี {name}! ยินดีต้อนรับ")

greet("Alice")
greet("Bob")
greet("Charlie")   # ง่ายมาก!
\`\`\`

### รูปแบบฟังก์ชัน

\`\`\`python
def ชื่อฟังก์ชัน(parameter1, parameter2):
    """Docstring: อธิบายว่าฟังก์ชันทำอะไร"""
    # โค้ด
    return ค่าที่ส่งกลับ
\`\`\`

### ตัวอย่างฟังก์ชันต่างๆ

\`\`\`python
# ไม่มี parameter, ไม่ return
def say_hello():
    print("สวัสดี!")

say_hello()   # สวัสดี!

# มี parameter, ไม่ return
def greet(name, age):
    print(f"ชื่อ {name} อายุ {age} ปี")

greet("Alice", 20)

# มี parameter, มี return
def add(a, b):
    return a + b

result = add(5, 3)   # result = 8
print(result)

# return หลายค่า
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(f"ต่ำสุด: {lo}, สูงสุด: {hi}")
\`\`\`

### Default Parameters

\`\`\`python
def introduce(name, age=18, city="กรุงเทพฯ"):
    print(f"ฉันชื่อ {name}, อายุ {age}, อยู่ที่{city}")

introduce("Alice")                  # ใช้ค่าเริ่มต้น
introduce("Bob", 25)                # age=25, city ค่าเริ่มต้น
introduce("Charlie", 30, "เชียงใหม่")  # ระบุทุกค่า
introduce("Dave", city="ภูเก็ต")    # ข้ามบางค่า (keyword arg)
\`\`\``,
          en: `## Functions

A function is like an **appliance** — reusable, does a lot, just press a button.

### Why Use Functions?

\`\`\`python
# ❌ Bad: repetitive code
name1 = "Alice"
msg1 = f"Hello {name1}! Welcome!"
print(msg1)

name2 = "Bob"
msg2 = f"Hello {name2}! Welcome!"
print(msg2)

# ✅ Good: use a function
def greet(name):
    print(f"Hello {name}! Welcome!")

greet("Alice")
greet("Bob")
greet("Charlie")   # easy!
\`\`\`

### Function Structure

\`\`\`python
def function_name(param1, param2):
    """Docstring: describe what the function does"""
    # code
    return return_value
\`\`\`

### Various Examples

\`\`\`python
# Return multiple values
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {lo}, Max: {hi}")
\`\`\`

### Default Parameters

\`\`\`python
def introduce(name, age=18, city="Bangkok"):
    print(f"I'm {name}, age {age}, from {city}")

introduce("Alice")                 # uses defaults
introduce("Bob", 25)               # age=25, city default
introduce("Charlie", 30, "Phuket") # all specified
introduce("Dave", city="Chiang Mai") # keyword argument
\`\`\``,
        },
        commands: [
          {
            name: 'def',
            syntax: 'def function_name(params):\n    """docstring"""\n    code\n    return value',
            description: { th: 'สร้างฟังก์ชัน', en: 'Define a function' },
            example: 'def square(n):\n    return n * n\n\nprint(square(4))  # 16',
          },
          {
            name: 'return',
            syntax: 'return value',
            description: { th: 'ส่งค่ากลับจากฟังก์ชัน', en: 'Return a value from function' },
            example: 'def double(x):\n    return x * 2\n\ny = double(5)  # y = 10',
          },
        ],
      },
      {
        id: '7-2',
        title: { th: 'ขอบเขตตัวแปร (Scope)', en: 'Variable Scope' },
        xpReward: 45,
        hasFlowchart: false,
        content: {
          th: `## ขอบเขตของตัวแปร (Variable Scope)

ตัวแปรมี "ขอบเขต" ที่ใช้ได้ เหมือนกุญแจที่เปิดได้แค่ห้องบางห้อง

### Local vs Global

\`\`\`python
x = 10   # Global variable (ใช้ได้ทุกที่)

def my_function():
    y = 20   # Local variable (ใช้ได้แค่ในฟังก์ชัน)
    print(x)   # ✅ เข้าถึง global ได้
    print(y)   # ✅ ใช้ local ได้

my_function()
print(x)   # ✅ ใช้ global ได้
print(y)   # ❌ Error! y ไม่มีนอกฟังก์ชัน
\`\`\`

### แก้ไข Global Variable

\`\`\`python
counter = 0

def increment():
    global counter   # บอกว่าจะแก้ global
    counter += 1

increment()
increment()
print(counter)   # 2
\`\`\`

### Lambda Functions — ฟังก์ชันสั้นๆ

\`\`\`python
# ฟังก์ชันปกติ
def square(x):
    return x ** 2

# Lambda แบบย่อ (บรรทัดเดียว)
square = lambda x: x ** 2

print(square(5))   # 25

# ใช้กับ sorted
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
students.sort(key=lambda s: s[1], reverse=True)  # เรียงตามคะแนน
for name, score in students:
    print(f"{name}: {score}")
\`\`\`

### ฟังก์ชัน Recursive (เรียกตัวเอง)

\`\`\`python
# แฟกทอเรียลแบบ recursive
def factorial(n):
    if n == 0 or n == 1:   # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))   # 120  (5! = 5×4×3×2×1)

# Fibonacci
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

for i in range(10):
    print(fib(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34
\`\`\`

### ตัวอย่าง: ฟังก์ชัน Utility

\`\`\`python
def is_palindrome(text):
    """ตรวจว่าคำอ่านกลับได้ไหม"""
    clean = text.lower().replace(" ", "")
    return clean == clean[::-1]

print(is_palindrome("racecar"))    # True
print(is_palindrome("level"))      # True
print(is_palindrome("hello"))      # False

def celsius_to_fahrenheit(c):
    """แปลง Celsius เป็น Fahrenheit"""
    return (c * 9/5) + 32

print(f"100°C = {celsius_to_fahrenheit(100)}°F")  # 212°F
\`\`\``,
          en: `## Variable Scope

Variables have a "scope" — where they can be accessed, like a key that only opens certain rooms.

### Local vs Global

\`\`\`python
x = 10   # Global variable

def my_function():
    y = 20   # Local variable
    print(x)   # ✅ can access global
    print(y)   # ✅ can use local

my_function()
print(x)   # ✅ global works here
print(y)   # ❌ Error! y not accessible outside function
\`\`\`

### Lambda Functions — Short Functions

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Lambda (one-liner)
square = lambda x: x ** 2

print(square(5))   # 25

# Use with sorted
students = [("Alice", 85), ("Bob", 92)]
students.sort(key=lambda s: s[1], reverse=True)
\`\`\`

### Recursive Functions

\`\`\`python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120

def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
\`\`\``,
        },
        commands: [
          {
            name: 'global',
            syntax: 'global variable_name',
            description: { th: 'ระบุว่าจะใช้ global variable', en: 'Declare use of global variable inside function' },
            example: 'count = 0\ndef inc():\n    global count\n    count += 1',
          },
          {
            name: 'lambda',
            syntax: 'lambda params: expression',
            description: { th: 'ฟังก์ชันสั้นๆ ในบรรทัดเดียว', en: 'Anonymous one-line function' },
            example: 'double = lambda x: x * 2\nprint(double(5))  # 10',
          },
        ],
      },
      {
        id: '7-3',
        title: { th: 'Module และ import', en: 'Modules & import' },
        xpReward: 40,
        hasFlowchart: false,
        content: {
          th: `## Module คืออะไร?

Module คือ **ไฟล์ Python ที่รวมฟังก์ชันที่เกี่ยวข้องกัน** เหมือนกล่องเครื่องมือเฉพาะทาง

### import Modules

\`\`\`python
# import ทั้ง module
import math
print(math.pi)          # 3.14159...
print(math.sqrt(25))    # 5.0
print(math.ceil(3.2))   # 4
print(math.floor(3.8))  # 3
print(math.pow(2, 10))  # 1024.0

# import เฉพาะที่ต้องการ
from math import pi, sqrt, factorial
print(pi)           # 3.14159...
print(sqrt(16))     # 4.0
print(factorial(5)) # 120

# ตั้งชื่อย่อ
import math as m
print(m.sin(m.pi/2))  # 1.0
\`\`\`

### random — สุ่มตัวเลข

\`\`\`python
import random

# สุ่มจำนวนเต็ม
print(random.randint(1, 6))       # สุ่มลูกเต๋า

# สุ่มทศนิยม 0.0-1.0
print(random.random())

# สุ่มจาก List
fruits = ["แอปเปิ้ล", "กล้วย", "มะม่วง"]
print(random.choice(fruits))

# สับไพ่ (สุ่มลำดับ)
cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.shuffle(cards)
print(cards)

# สุ่มหลายตัว
print(random.sample(range(1, 50), 6))  # ล็อตเตอรี่!
\`\`\`

### datetime — วันและเวลา

\`\`\`python
from datetime import datetime, date

now = datetime.now()
print(f"วันที่: {now.strftime('%d/%m/%Y')}")
print(f"เวลา: {now.strftime('%H:%M:%S')}")

today = date.today()
print(f"วันนี้: {today}")

# คำนวณอายุ
birthday = date(2000, 6, 15)
age_days = (date.today() - birthday).days
print(f"อายุ: {age_days // 365} ปี")
\`\`\`

### สร้าง Module ของตัวเอง

\`\`\`python
# ไฟล์: my_utils.py
def greet(name):
    return f"สวัสดี {name}!"

def add(a, b):
    return a + b

PI = 3.14159

# ไฟล์: main.py
import my_utils
print(my_utils.greet("Alice"))
print(my_utils.add(5, 3))
print(my_utils.PI)
\`\`\``,
          en: `## What is a Module?

A module is a **Python file containing related functions** — like a specialized toolbox.

### Importing Modules

\`\`\`python
import math
print(math.pi)          # 3.14159...
print(math.sqrt(25))    # 5.0
print(math.ceil(3.2))   # 4
print(math.floor(3.8))  # 3

from math import pi, sqrt
print(pi)           # 3.14159...
print(sqrt(16))     # 4.0
\`\`\`

### random — Random Numbers

\`\`\`python
import random

print(random.randint(1, 6))    # dice roll
print(random.random())          # float 0.0-1.0

fruits = ["Apple", "Banana", "Mango"]
print(random.choice(fruits))    # random choice

cards = [1,2,3,4,5]
random.shuffle(cards)           # shuffle in-place
print(cards)

print(random.sample(range(1, 50), 6))  # lottery!
\`\`\`

### datetime — Dates and Times

\`\`\`python
from datetime import datetime, date

now = datetime.now()
print(f"Date: {now.strftime('%d/%m/%Y')}")
print(f"Time: {now.strftime('%H:%M:%S')}")
\`\`\``,
        },
        commands: [
          {
            name: 'import',
            syntax: 'import module_name\nfrom module import name',
            description: { th: 'นำเข้า module หรือฟังก์ชัน', en: 'Import a module or specific function' },
            example: 'import math\nprint(math.pi)\n\nfrom math import sqrt\nprint(sqrt(16))  # 4.0',
          },
          {
            name: 'random.randint()',
            syntax: 'random.randint(a, b)',
            description: { th: 'สุ่มจำนวนเต็มระหว่าง a และ b', en: 'Random integer between a and b (inclusive)' },
            example: 'import random\nrandom.randint(1, 10)  # e.g. 7',
          },
        ],
      },
    ],
    exercises: [],
  },
];

export const getModuleById = (id) => MODULES.find(m => m.id === id);
export const getLessonById = (moduleId, lessonId) => {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find(l => l.id === lessonId);
};
