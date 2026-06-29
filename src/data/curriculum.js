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
          th: `## ผังงาน (Flowchart) คืออะไร? 🗺️

สวัสดีจ้า! ก่อนที่เราจะเริ่มเขียนโค้ดคอมพิวเตอร์ เราต้องมาทำความรู้จักกับ **ผังงาน** หรือที่เรียกภาษาอังกฤษว่า **Flowchart** (โฟลว์-ชาร์ต) กันก่อนนะ!

**ผังงาน (Flowchart)** ก็คือ "แผนที่" หรือ "ภาพวาด" ที่บอกว่าเราต้องทำอะไรบ้าง ทีละขั้นตอน ตั้งแต่เริ่มต้นจนจบเลย 

### ลองนึกถึงการชงไมโลดื่มเองดูสิ! ☕

ถ้าเราจะชงไมโล เราก็ต้องมีขั้นตอนใช่ไหมล่ะ? ดูรูปนี้เลย!

![ขั้นตอนการชงไมโล](/images/coffee_flowchart_1782705272122.png)

1. **เริ่มต้น** (เตรียมตัว)
2. **ต้มน้ำร้อน** 
3. **ใส่ผงไมโลลงในแก้ว**
4. **เทน้ำร้อนใส่แก้ว**
5. **จบ** (ได้ไมโลอร่อยๆ มาดื่ม!)

เห็นไหม! แค่เราวาดรูปออกมาเป็นข้อๆ เราก็ทำตามได้ง่ายมากๆ ผังงานในคอมพิวเตอร์ก็เหมือนกันเป๊ะเลย!

### ทำไมเราต้องวาดผังงานก่อนเขียนโค้ด? 🤔
- 🌟 **ช่วยให้ไม่หลงทาง:** เหมือนมีแผนที่ ทำให้เรารู้ว่าต้องเขียนโค้ดอะไรต่อไป
- 🌟 **หาที่ผิดง่าย:** ถ้าชงไมโลแล้วไม่อร่อย เราก็กลับไปดูแผนที่ได้ว่าลืมใส่อะไรไปไหม คอมพิวเตอร์ก็เหมือนกัน!
- 🌟 **เพื่อนๆ อ่านเข้าใจ:** ถ้าเราเอาแผนที่นี้ไปให้เพื่อน เพื่อนก็จะชงไมโลได้เหมือนเราเลย!`,
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
          th: `## รูปร่างต่างๆ ในผังงาน 🟢🟪🔷

เวลาเราวาดผังงาน เราจะใช้ "รูปร่างเรขาคณิต" แบบต่างๆ เพื่อบอกว่าตรงนั้นเรากำลังทำอะไรอยู่ แต่ละรูปจะมีความหมายไม่เหมือนกันนะ มาดูกันเลย!

![สัญลักษณ์ Flowchart](/images/flowchart_symbols_1782705282978.png)

### สัญลักษณ์ที่ต้องจำให้แม่น! 🧠

| รูปทรง | ชื่อเรียก | เอาไว้ทำอะไร? | ตัวอย่างง่ายๆ |
|---|---|---|---|
| **วงรี (Oval) ⬭** | **เริ่มต้น / จบ** | ต้องมีเสมอที่บนสุดและล่างสุด เหมือนการกดปุ่ม Start/Stop | เริ่มทำงาน, จบการทำงาน |
| **สี่เหลี่ยมผืนผ้า ▭** | **ลงมือทำ** | จุดที่เราต้องออกแรงทำอะไรสักอย่าง หรือให้คอมพิวเตอร์คำนวณ | ต้มน้ำร้อน, เอา 5 + 5 |
| **สี่เหลี่ยมข้าวหลามตัด ◇** | **ตัดสินใจ** | เป็นทางแยก! ต้องตอบคำถามว่า "ใช่" หรือ "ไม่ใช่" | ฝนตกไหม? (ใช่ ไปกางร่ม / ไม่ใช่ ไปวิ่งเล่น) |
| **สี่เหลี่ยมด้านขนาน ▱** | **รับของ / ส่งของ** | รับข้อมูลเข้ามา หรือแสดงผลลัพธ์ออกไป | คอมพิวเตอร์ถามชื่อ, คอมพิวเตอร์โชว์คำว่า "สวัสดี" |
| **ลูกศร →** | **เส้นทางเดิน** | บอกว่าเราต้องเดินไปทางไหนต่อ ห้ามเดินย้อนศรนะ! | ชี้จากรูปหนึ่งไปอีกรูปหนึ่ง |

### กฎเหล็ก 3 ข้อของการวาดผังงาน 📜
1. 🏁 **ต้องมีจุดเริ่มต้นและจุดสิ้นสุดเสมอ!** วงรีต้องอยู่บนสุดและล่างสุด
2. ⬇️ **ลูกศรต้องชี้ลงล่างเสมอ!** เราอ่านจากบนลงล่างเหมือนอ่านหนังสือ (ยกเว้นตอนทำซ้ำ)
3. 🛤️ **ข้าวหลามตัดต้องมีทางแยกเสมอ!** ต้องมีทางเลือก "ใช่ (Yes)" กับ "ไม่ใช่ (No)" ให้คอมพิวเตอร์เลือกเดิน`,
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
          th: `## ลองใช้ผังงานในชีวิตจริงกันเถอะ! 🧸

ก่อนที่เราจะไปเขียนโปรแกรมจริงๆ เรามาลองเล่นเกมอ่านผังงานจากชีวิตประจำวันของเราดูก่อนนะ!

### สถานการณ์: อยากได้ของเล่นใหม่จังเลย! 🤖

สมมติว่าเดินผ่านร้านของเล่น แล้วเจอหุ่นยนต์ตัวใหม่ อยากได้มากๆ เราจะตัดสินใจยังไงดี? ลองดูผังงานนี้สิ!

![ผังงานซื้อของเล่น](/images/buy_toy_flowchart_1782705292668.png)

**มาลองอ่านผังงานกันทีละขั้นนะ:**
1. **(วงรี) เริ่มต้น** → เรากำลังเดินไปที่ร้านของเล่น
2. **(สี่เหลี่ยม) ดูราคาของเล่น** → อ๊ะ! หุ่นยนต์ตัวนี้ราคา 500 บาท
3. **(ข้าวหลามตัด) เรามีเงินพอไหมนะ?** ตรงนี้คือ "ทางแยก" แล้วล่ะ!
   - 👉 **ถ้ามีเงินพอ (ใช่):** เราก็จะเดินตามลูกศรฝั่ง "ใช่" ไปที่กล่อง **(สี่เหลี่ยม) ซื้อของเล่นเลย!** เย้!
   - 👉 **ถ้าเงินไม่พอ (ไม่ใช่):** เราก็ต้องเดินตามลูกศรฝั่ง "ไม่ใช่" ไปที่กล่อง **(สี่เหลี่ยม) เก็บเงินเพิ่มต่อไป** แงงง 😭
4. **(วงรี) สิ้นสุด** → จบการตัดสินใจ!

เห็นไหมล่ะ! แค่นี้เราก็สามารถเอาผังงานมาแก้ปัญหาในชีวิตจริงได้แล้วนะ! ถ้าเราเข้าใจผังงานแบบนี้ พอไปเขียนโค้ดสั่งให้คอมพิวเตอร์ทำงาน มันก็จะง่ายนิดเดียวเลยล่ะ! 😉`,
          en: `## Using Flowcharts in Real Life! 🧸

Before we write real computer programs, let's play a game of reading flowcharts from our everyday life!

### Situation: I want a new toy! 🤖

Imagine you walk past a toy store and see a cool new robot. You really want it! How do you decide what to do? Look at this flowchart!

![Buy Toy Flowchart](/images/buy_toy_flowchart_1782705292668.png)

**Let's read the flowchart step-by-step:**
1. **(Oval) Start** → We are walking into the toy store.
2. **(Rectangle) Check toy price** → Oh! This robot costs 500 baht.
3. **(Diamond) Do we have enough money?** This is a "crossroad"!
   - 👉 **If we have enough (Yes):** We follow the "Yes" arrow to the box **(Rectangle) Buy the toy!** Yay!
   - 👉 **If we don't have enough (No):** We follow the "No" arrow to the box **(Rectangle) Save more money**. Aww! 😭
4. **(Oval) End** → Decision is done!

See? We can use flowcharts to solve problems in real life! If you understand this flowchart, writing code to tell a computer what to do will be super easy! 😉`,
        },
        commands: [],
      },
      {
        id: '1-4',
        title: { th: 'ผังงานกับการวนซ้ำ', en: 'Flowcharts with Loops' },
        xpReward: 30,
        hasFlowchart: true,
        content: {
          th: `## ผังงานแบบทำซ้ำ (Loop) 🔁

บางครั้งเราต้องทำงานเดิมซ้ำๆ หลายๆ รอบ เช่น วิ่งรอบสนาม 3 รอบ หรือท่องสูตรคูณ
ถ้าเราต้องเขียนผังงานยาวยืดลงมาเรื่อยๆ คงเมื่อยมือแย่เลย! 🥵

เราจึงมีเวทมนตร์เรียกว่า **การวนซ้ำ (Loop)**

### ตัวอย่าง: วิ่งรอบสนาม 3 รอบ 🏃‍♂️

แทนที่จะวาดกล่อง "วิ่ง 1 รอบ" ซ้ำกัน 3 กล่อง เราวาดแบบนี้แทน!

\`\`\`
     [เริ่มต้น]
         ↓
    [รอบ = 1] 🏁
         ↓
  ◇ รอบ <= 3? ◇ ──ไม่──> [สิ้นสุด]
       ↓ ใช่
    [วิ่ง 1 รอบ]
         ↓
   [รอบ = รอบ + 1] 📝
         ↑_________↙ (วนกลับไปเช็คใหม่!)
\`\`\`

**มาลองอ่านทีละก้าว:**
1. เริ่มต้นปุ๊บ เรานับรอบว่า \`รอบ = 1\`
2. ไปที่ทางแยก (ข้าวหลามตัด): "รอบที่เราอยู่ น้อยกว่าหรือเท่ากับ 3 หรือเปล่า?"
3. ถ้า **ใช่**: ไปวิ่ง 1 รอบ -> วิ่งเสร็จก็บวกเลขรอบขึ้นอีก 1 (กลายเป็นรอบ 2) -> แล้วเดินย้อนศรกลับไปที่ทางแยก!
4. วนไปเรื่อยๆ จนกว่ารอบจะเป็น 4... พอถึงรอบ 4 ปุ๊บ คำตอบของทางแยกจะเป็น **ไม่ใช่** ก็จะเดินออกไปที่ **สิ้นสุด** ทันที!

เห็นไหม? ประหยัดที่วาดไปได้เยอะเลย! 🤩`,
          en: `## Repeating Flowcharts (Loop) 🔁

Sometimes we have to do the same thing many times, like running around the field 3 times or reciting the multiplication table.
If we had to draw a super long flowchart, our hands would get tired! 🥵

So we use a magic called **Looping**.

### Example: Running 3 laps 🏃‍♂️

Instead of drawing the "Run 1 lap" box 3 times, we draw this!

\`\`\`
     [Start]
        ↓
    [lap = 1] 🏁
        ↓
  ◇ lap <= 3? ◇ ──No──> [End]
      ↓ Yes
   [Run 1 lap]
        ↓
  [lap = lap + 1] 📝
        ↑_________↙ (Loop back to check!)
\`\`\`

**Let's read step-by-step:**
1. At the start, we count \`lap = 1\`.
2. Go to the crossroad (Diamond): "Is the lap we are on less than or equal to 3?"
3. If **Yes**: Go run 1 lap -> After running, add 1 to the lap count (becomes lap 2) -> Then follow the arrow back up to the crossroad!
4. Keep looping until the lap becomes 4... When it is 4, the answer at the crossroad is **No**, so we walk straight to **End**!

See? We saved a lot of drawing space! 🤩`,
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
          th: `## ตัวแปร (Variables) คืออะไร? 📦

ตัวแปรเปรียบเหมือน **กล่องเก็บของที่มีป้ายชื่อแปะไว้** — เราเอาของใส่ลงไปในกล่อง แล้วเวลาเราอยากได้ของชิ้นนั้น เราก็แค่เรียกชื่อกล่อง!

\`\`\`
  ┌─────────────┐
  │  name       │  ← ป้ายชื่อกล่อง (ชื่อตัวแปร)
  │  "สมชาย"    │  ← ของที่อยู่ในกล่อง (ค่าที่เก็บ)
  └─────────────┘
\`\`\`

### วิธีสร้างกล่อง (ตัวแปร) ใน Python 🛠️

ง่ายมากๆ แค่ตั้งชื่อกล่อง ใส่เครื่องหมายเท่ากับ \`=\` แล้วตามด้วยของที่จะใส่

\`\`\`python
# รูปแบบ:  ชื่อกล่อง = ของที่ใส่
name = "สมชาย"
age = 10
score = 100
\`\`\`

### งูเหลือม Python ฉลาดมาก! 🐍

ในภาษาอื่น เราต้องบอกคอมพิวเตอร์ว่า "กล่องนี้ใส่ได้แค่ตัวเลขนะ" แต่ Python ฉลาดพอที่จะรู้เองว่าของที่เราใส่คืออะไร!

\`\`\`python
x = 42        # Python รู้ว่าเป็นตัวเลขจำนวนเต็ม
y = 3.14      # Python รู้ว่าเป็นตัวเลขมีจุดทศนิยม
z = "hello"   # Python รู้ว่าเป็นข้อความ
\`\`\`

### กฎการตั้งชื่อกล่อง (ตัวแปร) 📝

การตั้งชื่อก็มีกฎนะ เหมือนเราตั้งชื่อสัตว์เลี้ยงนั่นแหละ!

\`\`\`python
# ✅ ตั้งชื่อแบบนี้ถูกต้อง (เก่งมาก!)
student_name = "Alice"
score1 = 95
my_score = 100

# ❌ ตั้งชื่อแบบนี้ผิด! (คอมพิวเตอร์จะงง)
1name = "Bob"         # ห้ามเอาตัวเลขขึ้นต้น!
my-name = "Charlie"   # ห้ามใช้เครื่องหมายลบ - 
my name = "Dave"      # ห้ามมีช่องว่าง! (ใช้ _ แทนนะ)
\`\`\`

### ตั้งชื่อให้สื่อความหมาย (คนเก่งเค้าทำกัน) 🌟

\`\`\`python
# ❌ ตั้งชื่อแบบนี้ไม่ดี (a คืออะไร? ไม่มีใครรู้)
a = "John"
x = 10

# ✅ ตั้งชื่อแบบนี้ดีมาก (อ่านปุ๊บรู้ปั๊บ!)
player_name = "John"
player_age = 10
\`\`\`

### กล่องนี้เปลี่ยนของข้างในได้ตลอดนะ! 🪄

เราสามารถเอาของเก่าออก แล้วใส่ของใหม่เข้าไปแทนได้เสมอ

\`\`\`python
coin = 50
print(coin)   # มีเหรียญ 50

coin = 100    # เปลี่ยนเป็น 100 แทน
print(coin)   # ตอนนี้มี 100 แล้ว!

coin = coin + 10   # ได้เพิ่มมาอีก 10 
print(coin)   # กลายเป็น 110!
\`\`\``,
          en: `## What is a Variable? 📦

A variable is like a **magic box with a name tag** — we put something inside the box, and when we need it, we just call the name on the tag!

\`\`\`
  ┌─────────────┐
  │  name       │  ← The tag (variable name)
  │  "Alice"    │  ← What's inside (stored value)
  └─────────────┘
\`\`\`

### How to Create a Box (Variable) 🛠️

It's super easy! Just write the name, an equals sign \`=\`, and then what you want to put inside.

\`\`\`python
# Format:  box_name = what_to_put_inside
name = "Alice"
age = 10
score = 100
\`\`\`

### Python is Super Smart! 🐍

In some other languages, you have to tell the computer "This box is only for numbers". But Python is smart enough to figure it out by itself!

\`\`\`python
x = 42        # Python knows it's a whole number
y = 3.14      # Python knows it has a decimal point
z = "hello"   # Python knows it's text
\`\`\`

### Box Naming Rules 📝

Just like naming a pet, there are rules for naming boxes!

\`\`\`python
# ✅ Good names (Great job!)
student_name = "Alice"
score1 = 95
my_score = 100

# ❌ Bad names (Computer gets confused!)
1name = "Bob"         # Cannot start with a number!
my-name = "Charlie"   # Cannot use minus sign -
my name = "Dave"      # Cannot have spaces! (Use _ instead)
\`\`\`

### Name it clearly! (Like a pro) 🌟

\`\`\`python
# ❌ Bad names (What is a? Nobody knows!)
a = "John"
x = 10

# ✅ Good names (Instantly understandable!)
player_name = "John"
player_age = 10
\`\`\`

### You can always change what's inside! 🪄

You can take the old thing out and put a new thing in anytime!

\`\`\`python
coin = 50
print(coin)   # You have 50 coins

coin = 100    # Swap it to 100
print(coin)   # Now you have 100!

coin = coin + 10   # Got 10 more
print(coin)   # Now it's 110!
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
          th: `## ชนิดข้อมูลแบบข้อความ (String หรือ str) 📝

**String (สตริง)** คือข้อมูลที่เป็น **"ข้อความ"** เราจะรู้ได้ยังไงว่าเป็นข้อความ? ง่ายมาก! ข้อความจะต้องมี **ฟันหนู \`"\` หรือเครื่องหมายขีดเดียว \`'\`** คลุมไว้เสมอ!

\`\`\`python
name = "สมชาย"         # ใช้ฟันหนู (Double quote)
city = 'กรุงเทพฯ'      # ใช้ขีดเดียว (Single quote) ได้เหมือนกัน!
empty = ""             # ข้อความว่างเปล่า (ไม่มีอะไรข้างในเลย)
\`\`\`

### การเล่นกับข้อความ 🪄

เราสามารถเอาข้อความมาบวกกัน หรือคูณกันก็ได้นะ! 

\`\`\`python
# เอาข้อความมาต่อกัน (เหมือนต่อเลโก้)
first = "Hello"
second = "World"
result = first + " " + second   # ได้คำว่า "Hello World"

# คูณข้อความ (ปั๊มข้อความซ้ำๆ)
line = "-" * 20   # จะได้ขีดแบบนี้ 20 อัน: "--------------------"

# นับจำนวนตัวอักษร 
print(len("Python"))   # ได้ 6 เพราะมี 6 ตัวอักษร
\`\`\`

### การดึงตัวอักษรบางตัวออกมา (Indexing) 🎯

คอมพิวเตอร์จะนับตำแหน่งตัวอักษรเริ่มจากเลข 0 เสมอ! จำไว้นะ **ตัวแรกคือ 0 ไม่ใช่ 1**

\`\`\`python
word = "Python"
# ตำแหน่ง: 012345   ← เริ่มที่ 0!

print(word[0])   # P  (ตัวแรก)
print(word[1])   # y  (ตัวที่สอง)
print(word[-1])  # n  (ถ้าติดลบ คือนับจากข้างหลัง! -1 คือตัวสุดท้าย)
\`\`\`

### การตัดข้อความ (Slicing) ✂️

ถ้าเราอยากได้ข้อความแค่บางส่วน ก็ตัดมันออกมาได้!

\`\`\`python
text = "Hello, World!"

# เอาตั้งแต่ตำแหน่ง 0 ถึง 4 (ตัวที่ 5 ไม่เอานะ!)
print(text[0:5])    # ได้ "Hello"
\`\`\`

### เวทมนตร์แปลงร่างข้อความ (Methods) ✨

เราสามารถสั่งให้ข้อความแปลงร่างได้ด้วยคำสั่งพิเศษ!

\`\`\`python
name = "hello"

name.upper()          # แปลงเป็นพิมพ์ใหญ่ทั้งหมด -> "HELLO"
name.replace("o", "0") # เปลี่ยนตัว o เป็นเลข 0 -> "hell0"
\`\`\`

### f-string (สุดยอดเวทมนตร์ 🧙‍♂️) แนะนำให้ใช้!

ถ้าเราอยากเอาตัวแปรไปแทรกในข้อความ ให้พิมพ์ตัว \`f\` ไว้หน้าสุด แล้วใส่ตัวแปรไว้ในปีกกา \`{}\` ได้เลย ง่ายและสะอาดมาก!

\`\`\`python
name = "สมชาย"
age = 10

# เอาตัวแปรไปใส่ในข้อความแบบนี้เลย!
msg = f"สวัสดี เราชื่อ {name} อายุ {age} ขวบ"
print(msg) 
# ได้: สวัสดี เราชื่อ สมชาย อายุ 10 ขวบ
\`\`\``,
          en: `## Text Data Type (String or str) 📝

**String** is **"text"** data. How do we know it's a string? Easy! Text must always be wrapped in **quotes \`"\` or single quotes \`'\`**!

\`\`\`python
name = "Alice"         # Using double quotes
city = 'Bangkok'       # Using single quotes works too!
empty = ""             # Empty string (nothing inside)
\`\`\`

### Playing with Strings 🪄

We can add or multiply strings together!

\`\`\`python
# Adding strings together (like Lego blocks)
first = "Hello"
second = "World"
result = first + " " + second   # Becomes "Hello World"

# Multiplying strings (stamping it repeatedly)
line = "-" * 20   # You get 20 dashes: "--------------------"

# Counting characters 
print(len("Python"))   # Gives 6 because it has 6 characters
\`\`\`

### Pulling out one character (Indexing) 🎯

Computers always start counting from 0! Remember, **the first letter is 0, not 1**.

\`\`\`python
word = "Python"
# Index: 012345   ← Starts at 0!

print(word[0])   # P  (First letter)
print(word[1])   # y  (Second letter)
print(word[-1])  # n  (Negative means counting from the end! -1 is the last letter)
\`\`\`

### Cutting Strings (Slicing) ✂️

If we only want a part of the text, we can cut it out!

\`\`\`python
text = "Hello, World!"

# Get from position 0 up to 4 (position 5 is not included!)
print(text[0:5])    # Gives "Hello"
\`\`\`

### String Magic Spells (Methods) ✨

We can tell the string to transform using special commands!

\`\`\`python
name = "hello"

name.upper()           # Transforms to all uppercase -> "HELLO"
name.replace("o", "0") # Changes 'o' to '0' -> "hell0"
\`\`\`

### f-string (Ultimate Magic 🧙‍♂️) Highly Recommended!

If we want to put a variable inside a text, just type \`f\` at the very front, and put the variable in curly braces \`{}\`. It's so easy!

\`\`\`python
name = "Alice"
age = 10

# Put variables inside the text like this!
msg = f"Hello, my name is {name} and I am {age} years old."
print(msg) 
# Output: Hello, my name is Alice and I am 10 years old.
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
          th: `## ชนิดข้อมูลตัวเลข (Numbers) 🔢

ในโลกของ Python ตัวเลขมี 2 แก๊งใหญ่ๆ ที่เราต้องรู้จัก!

### 1. แก๊งจำนวนเต็ม (int ย่อมาจาก Integer)
ตัวเลขล้วนๆ ไม่มีจุดทศนิยม จะเป็นบวกหรือลบก็ได้!

\`\`\`python
age = 10
year = 2024
score = -5

# ถ้าเลขเยอะๆ ลายตา เราใส่ _ (ขีดล่าง) ช่วยให้อ่านง่ายได้นะ! 
# คอมพิวเตอร์จะมองไม่เห็น _ หรอก ไม่ต้องห่วง
money = 1_000_000   # หนึ่งล้านบาท!
\`\`\`

### 2. แก๊งทศนิยม (float)
ตัวเลขที่มี "จุด" นั่นเอง!

\`\`\`python
price = 99.50
pi = 3.14
temperature = -2.5
\`\`\`

### ให้ Python ช่วยคิดเลข (เหมือนเครื่องคิดเลขเลย!) 🧮

\`\`\`python
a = 10
b = 3

print(a + b)    # ได้ 13   (บวก)
print(a - b)    # ได้ 7    (ลบ)
print(a * b)    # ได้ 30   (คูณ ใช้ตัวดอกจัน *)
print(a / b)    # ได้ 3.33 (หาร จะได้ทศนิยมเสมอ)

# ท่าพิเศษ!
print(a // b)   # ได้ 3    (หารแบบไม่เอาเศษ เอาแค่จำนวนเต็ม)
print(a % b)    # ได้ 1    (หาเศษเหลือ! 10 หาร 3 เหลือเศษ 1)
print(a ** b)   # ได้ 1000 (ยกกำลัง! 10 คูณกัน 3 ครั้ง)
\`\`\`

### การคิดเลขแบบรวบรัด (Shorthand) ⚡

ถ้าเราอยากเพิ่มค่าให้ตัวแปรเดิม เราเขียนแบบย่อๆ ได้นะ!

\`\`\`python
coin = 10
coin += 5    # มีความหมายเหมือน coin = coin + 5 (ตอนนี้ coin เป็น 15)
coin -= 3    # โดนหักไป 3 (เหลือ 12)
coin *= 2    # ได้เบิ้ล 2 เท่า! (เป็น 24)
\`\`\`

### กฎการคิดเลข (อันไหนทำก่อน?) 🚦

Python จะคิดคณิตศาสตร์ตามกฎของโรงเรียนเป๊ะเลย!
ทำ \`**\` (ยกกำลัง) ก่อน → ตามด้วย \`* / // %\` (คูณหาร) → และสุดท้ายคือ \`+ -\` (บวกลบ)

\`\`\`python
result = 2 + 3 * 4    # Python จะเอา 3*4 ก่อน ได้ 12 แล้วค่อยบวก 2 = 14 (ไม่ใช่ 20 นะ!)

# ถ้าอยากให้บวกก่อน ต้องใส่วงเล็บ!
result = (2 + 3) * 4  # ทำในวงเล็บก่อน ได้ 5 * 4 = 20
\`\`\`

### เวทมนตร์แปลงร่างตัวเลข! 🧙‍♂️

บางทีตัวเลขมันปลอมตัวเป็นข้อความมา เราใช้เวทมนตร์แปลงกลับได้นะ!

\`\`\`python
int("100")     # แปลงข้อความ "100" ให้เป็นเลข 100 จริงๆ
float("3.14")  # แปลงข้อความให้เป็นเลขทศนิยม 3.14
str(42)        # แปลงเลข 42 ให้กลายเป็นข้อความ "42" 

# ระวังนะ!
int(3.9)       # จะได้ 3 เฉยๆ (มันแค่ตัดทศนิยมทิ้ง ไม่ได้ปัดขึ้นนะ!)
\`\`\``,
          en: `## Number Data Types 🔢

In the Python world, numbers belong to 2 main gangs!

### 1. The Whole Number Gang (int - Integer)
Just numbers, no decimal points. They can be positive or negative!

\`\`\`python
age = 10
year = 2024
score = -5

# If a number is too big, you can use _ to make it easy to read!
# The computer will ignore the _ so don't worry.
money = 1_000_000   # One million!
\`\`\`

### 2. The Decimal Gang (float)
Numbers with a "dot"!

\`\`\`python
price = 99.50
pi = 3.14
temperature = -2.5
\`\`\`

### Let Python Do the Math (Like a calculator!) 🧮

\`\`\`python
a = 10
b = 3

print(a + b)    # 13   (Addition)
print(a - b)    # 7    (Subtraction)
print(a * b)    # 30   (Multiplication uses star *)
print(a / b)    # 3.33 (Division always gives a decimal)

# Special Moves!
print(a // b)   # 3    (Floor division - ignores the remainder)
print(a % b)    # 1    (Modulo - gives only the remainder! 10 divided by 3 leaves 1)
print(a ** b)   # 1000 (Power! 10 to the power of 3)
\`\`\`

### Shortcut Math (Shorthand) ⚡

If we want to change a variable's value quickly, we can use shortcuts!

\`\`\`python
coin = 10
coin += 5    # Same as coin = coin + 5 (Now coin is 15)
coin -= 3    # Lost 3 (Now 12)
coin *= 2    # Doubled! (Now 24)
\`\`\`

### Math Rules (What goes first?) 🚦

Python follows school math rules perfectly!
Does \`**\` (Power) first → then \`* / // %\` (Multiply/Divide) → then \`+ -\` (Add/Subtract)

\`\`\`python
result = 2 + 3 * 4    # Python does 3*4 first (12), then adds 2 = 14 (Not 20!)

# If you want to add first, use parentheses!
result = (2 + 3) * 4  # Does (2+3) first, so 5 * 4 = 20
\`\`\`

### Number Transformation Magic! 🧙‍♂️

Sometimes numbers disguise themselves as text. We can change them back!

\`\`\`python
int("100")     # Turns text "100" into real number 100
float("3.14")  # Turns text into decimal 3.14
str(42)        # Turns number 42 into text "42"

# Watch out!
int(3.9)       # This gives 3 (It just chops off the decimal, it doesn't round up!)
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
          th: `## ความจริงและความเท็จ (Boolean หรือ bool) ✅❌

นี่คือชนิดข้อมูลที่ง่ายที่สุดในโลก! เพราะมันมีแค่ 2 ค่าเท่านั้น คือ:
- **True** (จริง / ใช่ / เปิด)
- **False** (เท็จ / ไม่ใช่ / ปิด)

*(จำไว้นะ: ต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่ **T** และ **F** เสมอ!)*

\`\`\`python
is_raining = False     # ฝนตกไหม? -> ไม่ตก (False)
is_sunny = True        # แดดออกไหม? -> ใช่ (True)
has_homework = True    # มีการบ้านไหม? -> มี (True) แงงง 😭
\`\`\`

### คอมพิวเตอร์คิดยังไงถึงได้ True หรือ False? 🤔

เวลาเราถามคำถามคอมพิวเตอร์ (เปรียบเทียบ) มันจะตอบเราเป็น True หรือ False นี่แหละ!

\`\`\`python
# เรามาถามคอมพิวเตอร์กัน!
print(10 > 5)   # 10 มากกว่า 5 ใช่ไหม? -> ตอบ: True (ใช่!)
print(2 == 3)   # 2 เท่ากับ 3 ใช่ไหม? -> ตอบ: False (ไม่เท่า!)
print(8 != 5)   # 8 ไม่เท่ากับ 5 ใช่ไหม? -> ตอบ: True (ถูกต้อง!)
\`\`\`

### การรวมเงื่อนไข (and, or, not) 🧩

เหมือนเวลาแม่ตั้งเงื่อนไขกับเราเลยล่ะ!

- **and (และ)**: ต้องจริง **ทั้งหมด** ถึงจะรอด!
  *(ต้องกินข้าวให้หมด **และ** ทำการบ้านเสร็จ ถึงจะได้เล่นเกม)*
- **or (หรือ)**: ขอแค่จริง **อย่างใดอย่างหนึ่ง** ก็รอดแล้ว!
  *(ถ้ามีเงิน **หรือ** มีบัตรฟรี ก็เข้าสวนสนุกได้)*
- **not (ตรงข้าม)**: เปลี่ยนคำตอบให้เป็นตรงกันข้าม!

\`\`\`python
# 1. and (และ) -> ต้อง True คู่ ถึงจะได้ True
print(True and True)   # True (กินข้าวหมด + การบ้านเสร็จ = ได้เล่น!)
print(True and False)  # False (กินข้าวหมด แต่ไม่ทำการบ้าน = อดเล่น!)

# 2. or (หรือ) -> มี True แค่อันเดียวก็รอดแล้ว!
print(False or True)   # True (ไม่มีเงิน แต่มีบัตรฟรี = ได้เข้า!)
print(False or False)  # False (ไม่มีเงิน แถมไม่มีบัตรฟรี = อด!)

# 3. not (ตรงข้าม) -> เปลี่ยนดำเป็นขาว!
print(not True)        # False (ตรงข้ามกับจริง คือเท็จ)
print(not False)       # True (ตรงข้ามกับเท็จ คือจริง)
\`\`\`

ชนิดข้อมูล bool นี้สำคัญมากๆ เลยนะ เพราะเราต้องเอามันไปใช้ตัดสินใจในบทต่อๆ ไปล่ะ! 😉`,
          en: `## Truth and Falsehood (Boolean or bool) ✅❌

This is the simplest data type in the world! Because it only has 2 values:
- **True** (Yes / On / Correct)
- **False** (No / Off / Incorrect)

*(Remember: They must always start with a capital **T** and **F**!)*

\`\`\`python
is_raining = False     # Is it raining? -> No (False)
is_sunny = True        # Is it sunny? -> Yes (True)
has_homework = True    # Do you have homework? -> Yes (True) Aww 😭
\`\`\`

### How does the computer get True or False? 🤔

When we ask the computer a question (compare things), it answers us with True or False!

\`\`\`python
# Let's ask the computer!
print(10 > 5)   # Is 10 greater than 5? -> Answer: True (Yes!)
print(2 == 3)   # Is 2 equal to 3? -> Answer: False (No!)
print(8 != 5)   # Is 8 not equal to 5? -> Answer: True (Correct!)
\`\`\`

### Combining Conditions (and, or, not) 🧩

Just like when mom sets rules for us!

- **and**: EVERYTHING must be true to pass!
  *(Must finish dinner **and** finish homework to play games)*
- **or**: Only ONE thing needs to be true to pass!
  *(If you have money **or** a free pass, you can enter the theme park)*
- **not**: Flips the answer to the opposite!

\`\`\`python
# 1. and -> Needs BOTH to be True to win
print(True and True)   # True (Finished dinner + Finished homework = Play time!)
print(True and False)  # False (Finished dinner but no homework done = No play!)

# 2. or -> Just ONE True is enough to win!
print(False or True)   # True (No money but have a free pass = Enter!)
print(False or False)  # False (No money and no pass = Cannot enter!)

# 3. not -> Flips everything!
print(not True)        # False (Opposite of true is false)
print(not False)       # True (Opposite of false is true)
\`\`\`

This bool data type is super important because we will use it to make decisions in the next chapters! 😉`,
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
          th: `## ตรวจสอบชนิดข้อมูลด้วยตัวเอง! 🕵️‍♂️

บางทีเราแอบลืมว่าของที่อยู่ในกล่อง (ตัวแปร) มันคืออะไรกันแน่นะ? 
เราสามารถใช้เครื่องสแกนที่ชื่อว่า \`type()\` เพื่อตรวจดูได้!

\`\`\`python
age = 10
price = 99.5
name = "Alice"
is_happy = True

print(type(age))      # จะบอกว่าเป็น <class 'int'> (จำนวนเต็ม)
print(type(price))    # จะบอกว่าเป็น <class 'float'> (ทศนิยม)
print(type(name))     # จะบอกว่าเป็น <class 'str'> (ข้อความ)
print(type(is_happy)) # จะบอกว่าเป็น <class 'bool'> (ความจริง/เท็จ)
\`\`\`

แค่นี้เราก็รู้แล้วว่าของในกล่องคืออะไร คอมพิวเตอร์เก่งไหมล่ะ! 🌟`,
          en: `## Checking Data Types Yourself! 🕵️‍♂️

Sometimes we forget what exactly is inside our box (variable).
We can use a scanner called \`type()\` to check it!

\`\`\`python
age = 10
price = 99.5
name = "Alice"
is_happy = True

print(type(age))      # Tells us it's <class 'int'> (Integer)
print(type(price))    # Tells us it's <class 'float'> (Decimal)
print(type(name))     # Tells us it's <class 'str'> (String/Text)
print(type(is_happy)) # Tells us it's <class 'bool'> (True/False)
\`\`\`

Now we know exactly what's inside the box. Isn't the computer smart? 🌟`,
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
          th: `## คำสั่งให้คอมพิวเตอร์พูด! (print) 🗣️

\`print()\` คือคำสั่งที่เราใช้บอกให้คอมพิวเตอร์ **แสดงผลลัพธ์ หรือ "พูด"** ออกมาบนหน้าจอ ถ้าเราไม่ใช้ \`print()\` คอมพิวเตอร์ก็จะคิดเงียบๆ อยู่คนเดียว เราจะมองไม่เห็นอะไรเลย!

### วิธีใช้งานพื้นฐาน 📝

แค่เอาของที่เราอยากให้คอมพิวเตอร์พูด ใส่เข้าไปในวงเล็บ \`()\`

\`\`\`python
# ให้คอมพิวเตอร์พูดข้อความ (ต้องมีฟันหนูนะ!)
print("สวัสดีชาวโลก!")

# ให้คอมพิวเตอร์คิดเลขแล้วบอกคำตอบ
print(5 + 5)    # มันจะแสดงเลข 10 ออกมา

# เอาค่าในกล่อง (ตัวแปร) ออกมาโชว์
name = "โดเรม่อน"
print(name)     # จะแสดงคำว่า โดเรม่อน
\`\`\`

### พิมพ์หลายๆ อย่างพร้อมกัน 🤝

เราสามารถให้คอมพิวเตอร์พูดหลายๆ อย่างพร้อมกันได้ โดยใช้ **ลูกน้ำ (,)** คั่นแต่ละอย่าง

\`\`\`python
age = 10
# คอมพิวเตอร์จะเอาคำมาต่อกัน และเติมช่องว่างให้ตรงลูกน้ำอัตโนมัติ!
print("ฉันอายุ", age, "ขวบ")
# ผลลัพธ์: ฉันอายุ 10 ขวบ
\`\`\`

### ใช้ f-string (เท่ที่สุด!) 🌟

แทนที่จะใช้ลูกน้ำ (,) คั่น ซึ่งบางทีก็งง เราสามารถใช้เวทมนตร์ \`f-string\` ได้! แค่พิมพ์ตัว \`f\` ไว้หน้าข้อความ แล้วเอาตัวแปรใส่ในปีกกา \`{}\`

\`\`\`python
score = 100
name = "โนบิตะ"

# ง่ายและอ่านง่ายมาก!
print(f"{name} สอบได้คะแนน {score} คะแนนเต็มเลย!")
# ผลลัพธ์: โนบิตะ สอบได้คะแนน 100 คะแนนเต็มเลย!
\`\`\``,
          en: `## Making the Computer Speak! (print) 🗣️

\`print()\` is the command we use to tell the computer to **show results or "speak"** on the screen. If we don't use \`print()\`, the computer will just think quietly to itself, and we won't see anything!

### Basic Usage 📝

Just put what you want the computer to say inside the parentheses \`()\`.

\`\`\`python
# Make it say text (must use quotes!)
print("Hello World!")

# Make it calculate and show the answer
print(5 + 5)    # It will show 10

# Show what's inside a box (variable)
name = "Doraemon"
print(name)     # It will show Doraemon
\`\`\`

### Printing many things together 🤝

We can make the computer say multiple things at once by using a **comma (,)** to separate them.

\`\`\`python
age = 10
# The computer puts them together and adds a space at the comma automatically!
print("I am", age, "years old")
# Output: I am 10 years old
\`\`\`

### Using f-string (The coolest way!) 🌟

Instead of using commas (,) which can get confusing, we can use \`f-string\` magic! Just type an \`f\` before the text, and put variables inside curly braces \`{}\`.

\`\`\`python
score = 100
name = "Nobita"

# Super easy to read!
print(f"{name} got a perfect score of {score}!")
# Output: Nobita got a perfect score of 100!
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
          th: `## ให้คอมพิวเตอร์ฟังเราบ้าง! (input) 👂

\`print()\` คือให้คอมพิวเตอร์เป็นคนพูด แล้วถ้าเราอยากเป็นคนพูดให้คอมพิวเตอร์ฟังล่ะ? เราต้องใช้คำสั่ง \`input()\` ครับ!

\`input()\` จะทำให้คอมพิวเตอร์ **หยุดรอ** ให้เราพิมพ์อะไรบางอย่างลงไปทางคีย์บอร์ด แล้วกด Enter!

### วิธีใช้งานพื้นฐาน ⌨️

ส่วนใหญ่เราจะตั้งคำถามทิ้งไว้ในวงเล็บ และ **ต้องสร้างกล่อง (ตัวแปร) มารอรับคำตอบเสมอ!** ไม่งั้นคอมพิวเตอร์ฟังแล้วก็จะลืมทิ้งไปเลย!

\`\`\`python
# 1. คอมพิวเตอร์ถามชื่อ
# 2. รอเราพิมพ์
# 3. เอาคำตอบไปเก็บไว้ในกล่องชื่อ user_name
user_name = input("คุณชื่ออะไรครับ? ")

print(f"ยินดีที่ได้รู้จักนะคุณ {user_name}!")
\`\`\`

### ⚠️ ข้อควรระวังสุดๆ! (ทุกสิ่งที่พิมพ์คือข้อความ!)

เมื่อเราใช้ \`input()\` **ทุกอย่างที่เราพิมพ์ลงไป คอมพิวเตอร์จะมองว่าเป็น ข้อความ (str) เสมอ!** ถึงแม้เราจะพิมพ์ตัวเลข 10 ลงไป มันก็จะมองว่าเป็นคำว่า "10" (เอาไปบวกลบไม่ได้นะ!)

\`\`\`python
age = input("คุณอายุเท่าไหร่? ")  # สมมติเราพิมพ์ 10

# ถ้าเราทำแบบนี้ โปรแกรมจะพัง (Error) ทันที!
# เพราะเราเอาข้อความ "10" ไปบวกกับเลข 5 ไม่ได้!
# print(age + 5)  ❌ ผิด!
\`\`\`

### วิธีแก้: แปลงร่างข้อความเป็นตัวเลข! 🧙‍♂️

ถ้าเราจะถามตัวเลขจากผู้ใช้ เราต้องใช้เวทมนตร์ \`int()\` หรือ \`float()\` คลุมทับ \`input()\` ไปอีกชั้นนึง!

\`\`\`python
# ใช้ int() คลุม input() เอาไว้ เพื่อแปลงคำตอบเป็นเลขจำนวนเต็ม
age = int(input("คุณอายุเท่าไหร่? "))

print(f"อีก 5 ปี คุณจะอายุ {age + 5} ขวบนะ!")  # ✅ คราวนี้บวกเลขได้แล้ว!
\`\`\`

จำง่ายๆ:
- ถ้าถามชื่อ, ถามสีที่ชอบ 👉 ใช้ \`input()\` ธรรมดา
- ถ้าถามอายุ, ถามจำนวนของ 👉 ใช้ \`int(input())\`
- ถ้าถามส่วนสูง, ถามน้ำหนัก (มีทศนิยม) 👉 ใช้ \`float(input())\``,
          en: `## Making the Computer Listen! (input) 👂

\`print()\` is for the computer to talk. What if we want to talk to the computer? We use the \`input()\` command!

\`input()\` makes the computer **stop and wait** for us to type something on the keyboard and press Enter!

### Basic Usage ⌨️

Usually, we put a question inside the parentheses, and **we must always create a box (variable) to catch the answer!** Otherwise, the computer will hear it and immediately forget it!

\`\`\`python
# 1. Computer asks your name
# 2. Waits for you to type
# 3. Stores the answer in the box 'user_name'
user_name = input("What is your name? ")

print(f"Nice to meet you, {user_name}!")
\`\`\`

### ⚠️ Super Important Warning! (Everything typed is text!)

When we use \`input()\`, **everything we type is seen as text (str) by the computer!** Even if we type the number 10, it sees it as the word "10" (you can't add or subtract with it!).

\`\`\`python
age = input("How old are you? ")  # Let's say we type 10

# If we do this, the program will crash (Error)!
# Because you cannot add the text "10" to the number 5!
# print(age + 5)  ❌ WRONG!
\`\`\`

### The Fix: Transform text into numbers! 🧙‍♂️

If we want to ask for a number, we must wrap \`input()\` with the \`int()\` or \`float()\` magic spells!

\`\`\`python
# Wrap input() with int() to transform the answer into a whole number
age = int(input("How old are you? "))

print(f"In 5 years, you will be {age + 5} years old!")  # ✅ Now we can do math!
\`\`\`

Easy to remember:
- Asking name, favorite color 👉 Just use \`input()\`
- Asking age, how many items 👉 Use \`int(input())\`
- Asking height, weight (decimals) 👉 Use \`float(input())\``,
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
          th: `## การจัดรูปแบบตัวเลขให้สวยงาม 🎨

บางทีเวลาเราคำนวณเลข ทศนิยมมันอาจจะยาวเป็นหางว่าวเลย เช่น \`3.33333333\`
เราสามารถใช้เวทมนตร์ \`f-string\` จัดการให้มันสวยงามได้!

### ตัดทศนิยมให้เหลือแค่ 2 ตำแหน่ง ✂️

เราแค่ใส่ โคลอน \`:\` และจุด \`.2f\` ไว้หลังชื่อตัวแปร

\`\`\`python
money = 100 / 3
# ถ้า print ธรรมดา จะได้ 33.333333333333336

# ใช้ f-string ตัดให้เหลือ 2 ตำแหน่ง!
print(f"ฉันมีเงิน {money:.2f} บาท")
# ผลลัพธ์: ฉันมีเงิน 33.33 บาท
\`\`\`

### ใส่ลูกน้ำให้ตัวเลขเยอะๆ (หลักพัน หลักหมื่น) 💰

ถ้าเงินเราเยอะมากๆ เช่น \`1000000\` เราอ่านยากใช่ไหมล่ะ? 
ใส่ \`,\` ให้มันซะเลย!

\`\`\`python
score = 5000000
print(f"คะแนนของคุณคือ {score:,} แต้ม")
# ผลลัพธ์: คะแนนของคุณคือ 5,000,000 แต้ม (อ่านง่ายขึ้นเยอะ!)
\`\`\``,
          en: `## Making Numbers Look Beautiful 🎨

Sometimes when we calculate math, the decimal points are super long like \`3.33333333\`.
We can use \`f-string\` magic to make it look pretty!

### Trim to just 2 decimal places ✂️

Just add a colon \`:\` and \`.2f\` right after the variable name.

\`\`\`python
money = 100 / 3
# Normal print gives: 33.333333333333336

# Use f-string to trim to 2 places!
print(f"I have {money:.2f} dollars")
# Output: I have 33.33 dollars
\`\`\`

### Add commas to big numbers (Thousands, Millions) 💰

If we have a huge number like \`1000000\`, it's hard to read, right?
Let's add commas \`,\` to it!

\`\`\`python
score = 5000000
print(f"Your score is {score:,} points")
# Output: Your score is 5,000,000 points (Much easier to read!)
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
          th: `## การตัดสินใจ (if / else) 🤔

ในโลกความจริง เราต้องตัดสินใจตลอดเวลา เช่น "ถ้าฝนตก ฉันจะกางร่ม แต่ถ้าไม่ตก ฉันจะใส่หมวก"
คอมพิวเตอร์ก็ตัดสินใจได้เหมือนกัน! เราเรียกเวทมนตร์นี้ว่า \`if\` (ถ้า) และ \`else\` (มิฉะนั้น)

### วิธีเขียน if / else ง่ายๆ 📝

\`\`\`python
is_raining = True

# ถ้าฝนตกนะ (is_raining เป็น True)
if is_raining:
    print("เอาร่มไปด้วยนะ! ☔")

# ถ้าไม่ตกล่ะ (is_raining เป็น False)
else:
    print("ใส่หมวกกันแดดได้เลย! 🧢")
\`\`\`

### ⚠️ กฎสำคัญของการใช้ if / else
1. ต้องมีเครื่องหมายทวิภาค \`:\` (โคลอน) ต่อท้ายบรรทัด \`if\` และ \`else\` เสมอ!
2. บรรทัดที่อยู่ข้างใต้ **ต้องย่อหน้า (กด Tab 1 ครั้ง)** เพื่อให้คอมพิวเตอร์รู้ว่า "นี่คือสิ่งที่ต้องทำนะ"

### ลองเช็คอายุเล่นๆ 🎂

\`\`\`python
age = int(input("คุณอายุเท่าไหร่? "))

if age >= 18:
    print("คุณเป็นผู้ใหญ่แล้ว! 🧑")
else:
    print("คุณยังเป็นเด็กอยู่เลย! 👶")
\`\`\``,
          en: `## Making Decisions (if / else) 🤔

In the real world, we make decisions all the time. Like "If it rains, I will take an umbrella, else I will wear a hat."
Computers can make decisions too! We call this magic \`if\` and \`else\`.

### How to write if / else easily 📝

\`\`\`python
is_raining = True

# If it is raining (is_raining is True)
if is_raining:
    print("Take an umbrella! ☔")

# Else (if is_raining is False)
else:
    print("Wear a sun hat! 🧢")
\`\`\`

### ⚠️ Important Rules for if / else
1. You must always put a colon \`:\` at the end of the \`if\` and \`else\` lines!
2. The lines underneath **must be indented (press Tab once)** so the computer knows "this is what I should do inside".

### Let's check your age 🎂

\`\`\`python
age = int(input("How old are you? "))

if age >= 18:
    print("You are an adult! 🧑")
else:
    print("You are still a kid! 👶")
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
          th: `## หลายทางเลือก (elif) 🛤️

บางครั้งชีวิตเราไม่ได้มีแค่ 2 ทางเลือก! ถ้าเราอยากมีทางเลือกที่ 3, 4, 5 เราจะใช้ \`elif\` (ย่อมาจาก else if) มาคั่นตรงกลางระหว่าง \`if\` กับ \`else\` ครับ!

### เครื่องตัดเกรด 🅰️🅱️🆎

\`\`\`python
score = int(input("ได้คะแนนเท่าไหร่? "))

if score >= 80:
    print("เก่งมาก! เอาเกรด A ไปเลย! 🏆")
elif score >= 70:
    print("ดีมาก! ได้เกรด B จ้า 🥈")
elif score >= 60:
    print("พอใช้! ได้เกรด C นะ 🥉")
else:
    print("ตกจ้า! ต้องขยันกว่านี้นะ 😭")
\`\`\`

**ข้อควรรู้:**
- คอมพิวเตอร์จะเช็คเงื่อนไขจาก **บนลงล่าง**
- ถ้าเจอเงื่อนไขไหนเป็นจริงแล้ว มันจะทำคำสั่งนั้น และ **ข้ามเงื่อนไขที่เหลือทั้งหมดทันที!** (ไม่เช็คต่อแล้วนะ!)
- เราจะมี \`elif\` กี่อันก็ได้ตามใจชอบเลย!`,
          en: `## Multiple Choices (elif) 🛤️

Sometimes life has more than 2 choices! If we want a 3rd, 4th, or 5th choice, we use \`elif\` (short for else if) in between \`if\` and \`else\`!

### The Grade Calculator 🅰️🅱️🆎

\`\`\`python
score = int(input("What is your score? "))

if score >= 80:
    print("Awesome! You get an A! 🏆")
elif score >= 70:
    print("Good job! You get a B 🥈")
elif score >= 60:
    print("Not bad! You get a C 🥉")
else:
    print("You failed! Try harder next time 😭")
\`\`\`

**Things to know:**
- The computer checks conditions from **top to bottom**.
- If it finds a True condition, it will run that block and **skip all the rest immediately!** (It won't check anymore!)
- You can have as many \`elif\` blocks as you want!`,
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
          th: `## ทางแยกซ้อนทางแยก (Nested if) 🪆

เหมือนกับตุ๊กตารัสเซียที่มีตุ๊กตาซ้อนอยู่ข้างใน! บางครั้งหลังจากเราเลือกทางแยกแล้ว เราเจอทางแยกข้างในอีกที เราสามารถเอา \`if\` ไปซ้อนใน \`if\` ได้นะ!

### ตัวอย่าง: สวนสนุก 🎢

\`\`\`python
height = int(input("คุณสูงเท่าไหร่ (ซม.)? "))

if height >= 120:
    print("ผ่านเกณฑ์ความสูง! ได้เข้าเครื่องเล่น")
    
    # ทางแยกซ้อนข้างใน! (ต้องย่อหน้าเข้าไปอีกระดับนึงนะ)
    age = int(input("แล้วคุณอายุเท่าไหร่? "))
    if age >= 15:
        print("คุณเล่นรถไฟเหาะตีลังกาได้! 🎢")
    else:
        print("คุณเล่นได้แค่ม้าหมุนนะ 🎠")
        
else:
    print("เสียใจด้วย ความสูงไม่ถึง อดเล่น 😭")
\`\`\`

**สังเกตดีๆ นะ:** \`if\` ที่อยู่ข้างใน จะทำงานก็ต่อเมื่อ \`if\` ตัวนอกมันเป็นจริงเท่านั้น! ถ้าความสูงไม่ถึงแต่แรก มันก็จะไม่ถามอายุเลย เด้งไปที่ \`else\` ตัวล่างสุดทันที!`,
          en: `## Decisions inside Decisions (Nested if) 🪆

Just like Russian nesting dolls! Sometimes after we make a decision, we face another decision inside it. We can put an \`if\` inside another \`if\`!

### Example: Theme Park 🎢

\`\`\`python
height = int(input("How tall are you (cm)? "))

if height >= 120:
    print("You are tall enough! Welcome to the ride")
    
    # A decision inside! (Notice the extra indentation)
    age = int(input("How old are you? "))
    if age >= 15:
        print("You can ride the Rollercoaster! 🎢")
    else:
        print("You can only ride the Carousel 🎠")
        
else:
    print("Sorry, you are not tall enough. No rides for you 😭")
\`\`\`

**Look closely:** The inside \`if\` will only run if the outside \`if\` is True! If you are not tall enough from the start, it won't even ask for your age; it skips straight to the bottom \`else\`!`,
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
          th: `## วนรอบตามที่สั่ง (for loop) 🔄

\`for\` loop เปรียบเหมือนเครื่องนับก้าว! เราจะใช้มันตอนที่เรา **รู้จำนวนรอบที่แน่นอน** ว่าอยากให้มันทำกี่รอบ

เรามักจะใช้ \`for\` คู่กับเวทมนตร์ \`range()\` ซึ่งทำหน้าที่สร้าง "ป้ายบอกรอบ" ให้เรา!

### สั่งให้ทำ 5 รอบ 🖐️

\`\`\`python
# i คือตัวแปรที่เราสร้างขึ้นมาเพื่อนับรอบ (นับเริ่มจาก 0 เสมอ!)
for i in range(5):
    print("รอบที่", i)
\`\`\`

**คอมพิวเตอร์จะนับแบบนี้:**
- รอบที่ 0
- รอบที่ 1
- รอบที่ 2
- รอบที่ 3
- รอบที่ 4
*(อ้าว! ไม่มีเลข 5 หรอ? ใช่แล้ว! คอมพิวเตอร์นับเริ่มที่ 0 พอครบ 5 นิ้ว มันจะหยุดที่เลข 4 เสมอ!)*

### ควบคุม range() ดั่งใจนึก 🕹️

\`range()\` สามารถรับตัวเลขได้ถึง 3 ตัวเลยนะ!
\`range(เริ่มต้น, สิ้นสุด, นับทีละเท่าไหร่)\`

\`\`\`python
# เริ่มที่เลข 1 ไปจนถึงเลข 10 (หยุดก่อนเลข 11)
for i in range(1, 11):
    print(i)

# เริ่มที่ 2 ไปจนถึง 10 แต่อยากให้นับข้ามทีละ 2 (เลขคู่!)
for i in range(2, 11, 2):
    print(i)  # จะได้ 2, 4, 6, 8, 10
\`\`\``,
          en: `## Repeat as Instructed (for loop) 🔄

\`for\` loop is like a step counter! We use it when we **know exactly how many times** we want to repeat something.

We usually use \`for\` with the \`range()\` magic, which creates a list of numbers for us!

### Command to run 5 times 🖐️

\`\`\`python
# 'i' is the variable we create to count the laps (always starts at 0!)
for i in range(5):
    print("Lap number", i)
\`\`\`

**The computer will count like this:**
- Lap number 0
- Lap number 1
- Lap number 2
- Lap number 3
- Lap number 4
*(Wait! No number 5? Correct! The computer starts counting at 0. Once it counts 5 times, it stops at number 4!)*

### Controlling range() like a boss 🕹️

\`range()\` can actually take up to 3 numbers!
\`range(start, end, step)\`

\`\`\`python
# Start at 1, go up to 10 (stops BEFORE 11)
for i in range(1, 11):
    print(i)

# Start at 2, go up to 10, but count by 2s (Even numbers!)
for i in range(2, 11, 2):
    print(i)  # Gives 2, 4, 6, 8, 10
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
          th: `## วนรอบไปเรื่อยๆ จนกว่าจะหยุด! (while loop) 🎡

ต่างจาก \`for\` ตรงที่ \`while\` loop ใช้ตอนที่เรา **ไม่รู้จำนวนรอบที่แน่นอน** แต่รู้ว่า "จะหยุดทำเมื่อไหร่"
มันเหมือนกับการเปิดน้ำใส่ถังน้ำ เราไม่รู้ว่ากี่วิจะเต็ม แต่เรารู้ว่า "ถ้าถังเต็มเมื่อไหร่ ให้หยุดทันที!"

\`\`\`python
water = 0

# ตราบใดที่ (while) น้ำยังน้อยกว่า 10 ลิตร ให้ทำไปเรื่อยๆ!
while water < 10:
    print(f"ตอนนี้น้ำมี {water} ลิตร")
    water += 2   # เติมน้ำเพิ่มทีละ 2 ลิตร
    
print("ถังน้ำเต็มแล้ว! ปิดน้ำได้!")
\`\`\`

### ⚠️ ระวัง Loop นรก! (Infinite Loop) 😱

ถ้าเราลืมเติมเงื่อนไขให้มันหยุด (ลืมเขียน \`water += 2\`) เครื่องมันก็จะรันไปเรื่อยๆ ไม่มีวันจบ! ทำให้คอมพิวเตอร์ค้างได้เลย ต้องระวังให้ดีนะ!

### คำสั่งฉุกเฉิน: break และ continue 🛑

- **break**: เหมือนการทุบกระจกฉุกเฉิน! กระโดดหนีออกจาก loop ทันที!
- **continue**: ข้ามรอบนี้ไปเลย แล้วไปเริ่มนับรอบต่อไป!

\`\`\`python
while True:  # อันนี้คือ Loop นรกของแท้ มันจะรันตลอดไป
    password = input("รหัสผ่านคืออะไร? ")
    
    if password == "1234":
        print("ถูกต้อง! เข้าสู่ระบบได้!")
        break   # ใช้ break เพื่อกระโดดหนีออกจาก Loop นรก!
    else:
        print("ผิด! พิมพ์ใหม่นะ")
\`\`\``,
          en: `## Loop Until Stopped! (while loop) 🎡

Unlike \`for\`, we use \`while\` loop when we **don't know exactly how many times** to repeat, but we know "when to stop".
It's like filling a bucket with water. We don't know how many seconds it takes, but we know "when it's full, STOP!"

\`\`\`python
water = 0

# As long as (while) water is less than 10 liters, keep doing this!
while water < 10:
    print(f"Current water: {water} liters")
    water += 2   # Add 2 liters of water
    
print("Bucket is full! Turn off the tap!")
\`\`\`

### ⚠️ Beware the Infinite Loop! 😱

If we forget to update the condition (like forgetting \`water += 2\`), it will run forever and never end! It can freeze the computer, so be careful!

### Emergency Commands: break and continue 🛑

- **break**: Like smashing the emergency glass! Jumps out of the loop immediately!
- **continue**: Skips the rest of this current lap, and jumps to the next lap!

\`\`\`python
while True:  # This is a real infinite loop, it runs forever
    password = input("What is the password? ")
    
    if password == "1234":
        print("Correct! Access Granted!")
        break   # Use break to escape the infinite loop!
    else:
        print("Wrong! Try again")
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
          th: `## ห่วงซ้อนห่วง (Nested Loops) 🧅

เราสามารถเอา Loop ไปซ้อนใน Loop ได้ด้วยนะ เหมือนหัวหอมที่มีหลายๆ ชั้น!

คอมพิวเตอร์จะทำ Loop ข้างในจนเสร็จหมดก่อน แล้วค่อยขยับ Loop ข้างนอกไป 1 ก้าว!
เหมือนเข็มนาฬิกาไง เข็มวินาทีต้องเดินครบ 60 รอบ (Loop ใน) เข็มนาทีถึงจะเดิน 1 ก้าว (Loop นอก)

### สร้างตารางสูตรคูณ ✖️

\`\`\`python
# แม่ 2 ถึง แม่ 3 (Loop นอก)
for i in range(2, 4):
    print(f"=== แม่ {i} ===")
    
    # คูณ 1 ถึง 12 (Loop ใน)
    for j in range(1, 13):
        print(f"{i} x {j} = {i*j}")
\`\`\`

เห็นไหม! Loop นอกจะดึง \`i\` มาเป็น 2 ก่อน แล้วปล่อยให้ Loop ในทำงานตั้งแต่ \`j = 1\` ถึง \`12\` พอเสร็จปุ๊บ Loop นอกค่อยดึง \`i\` เป็น 3 แล้วทำแบบเดิมอีกครั้ง!`,
          en: `## Loop Inside a Loop (Nested Loops) 🧅

We can put a Loop inside another Loop! Just like an onion with many layers.

The computer will finish all the laps of the INNER loop completely before moving the OUTER loop by 1 step!
Just like a clock! The second hand has to move 60 times (Inner loop) before the minute hand moves 1 step (Outer loop).

### Making a Multiplication Table ✖️

\`\`\`python
# Times table 2 to 3 (Outer Loop)
for i in range(2, 4):
    print(f"=== Table of {i} ===")
    
    # Multiply by 1 to 12 (Inner Loop)
    for j in range(1, 13):
        print(f"{i} x {j} = {i*j}")
\`\`\`

See? The Outer loop grabs \`i\` as 2 first, and lets the Inner loop run from \`j = 1\` to \`12\`. Once that is done, the Outer loop changes \`i\` to 3, and runs the whole thing again!`,
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
          th: `## กล่องเก็บของวิเศษ (List) 📦

เวลาที่เรามีของเยอะๆ เช่น มีเพื่อน 5 คน เราขี้เกียจสร้างตัวแปร \`friend1\`, \`friend2\`, ... ไปเรื่อยๆ ใช่ไหม?
เราเลยใช้ **List (กล่องเก็บของ)** แทน! 

List เป็นเหมือนตู้ลิ้นชักยาวๆ ที่เก็บของได้หลายอย่างไว้ด้วยกัน เราใช้เครื่องหมายก้ามปู \`[ ]\` ในการสร้าง List นะ!

### วิธีเก็บของลงกล่อง 🎒

\`\`\`python
# เก็บข้อความ
friends = ["โนบิตะ", "ชิซูกะ", "ไจแอนท์", "ซึเนโอะ"]

# เก็บตัวเลขก็ได้!
scores = [10, 20, 30, 40, 50]

# เก็บปนกันก็ยังได้! (Python ใจดีมาก)
mix = ["สวัสดี", 100, True, 3.14]
\`\`\`

### วิธีหยิบของออกมาดู (Indexing) 🎯

เหมือนกับข้อความเป๊ะเลย! คอมพิวเตอร์จะแปะป้ายเลขลิ้นชัก เริ่มที่ 0 เสมอ

\`\`\`python
friends = ["โนบิตะ", "ชิซูกะ", "ไจแอนท์"]
# ป้ายลิ้นชัก:    0         1          2

print(friends[0])   # หยิบลิ้นชักที่ 0 ได้ "โนบิตะ"
print(friends[-1])  # ถ้าติดลบ คือหยิบจากหลังสุด ได้ "ไจแอนท์"
\`\`\`

### วิธีเอาของใส่เพิ่ม / เอาออก 🔧

เราสามารถเติมของเข้ากล่อง หรือโยนของทิ้งได้ตามใจชอบ!

\`\`\`python
bag = ["ดินสอ", "ยางลบ"]

# เพิ่มของ (append) จะไปต่อท้ายสุดเสมอ!
bag.append("ไม้บรรทัด")
# ตอนนี้ bag กลายเป็น ["ดินสอ", "ยางลบ", "ไม้บรรทัด"]

# เอาของออก (remove) 
bag.remove("ยางลบ")
# ตอนนี้ bag กลายเป็น ["ดินสอ", "ไม้บรรทัด"]
\`\`\``,
          en: `## The Magic Storage Box (List) 📦

When we have a lot of things, like 5 friends, we don't want to create variables like \`friend1\`, \`friend2\`, ... right?
So we use a **List (Storage Box)** instead!

A List is like a long drawer cabinet that can store many things together. We use square brackets \`[ ]\` to create a List!

### How to pack the box 🎒

\`\`\`python
# Storing text
friends = ["Nobita", "Shizuka", "Giant", "Suneo"]

# Storing numbers works too!
scores = [10, 20, 30, 40, 50]

# You can even mix them! (Python is very kind)
mix = ["Hello", 100, True, 3.14]
\`\`\`

### How to pick things out (Indexing) 🎯

Just like Strings! The computer puts a number label on each drawer, always starting at 0.

\`\`\`python
friends = ["Nobita", "Shizuka", "Giant"]
# Labels:      0          1         2

print(friends[0])   # Open drawer 0, gets "Nobita"
print(friends[-1])  # Negative means from the back, gets "Giant"
\`\`\`

### How to Add / Remove things 🔧

We can put more things into the box, or throw things away!

\`\`\`python
bag = ["Pencil", "Eraser"]

# Add item (append) always goes to the very end!
bag.append("Ruler")
# Now bag is ["Pencil", "Eraser", "Ruler"]

# Remove item (remove)
bag.remove("Eraser")
# Now bag is ["Pencil", "Ruler"]
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
          th: `## จัดระเบียบกล่องสมบัติ (List ขั้นสูง) ✨

เมื่อเรามีของในกล่องเยอะแยะไปหมด เราสามารถจัดระเบียบมันได้นะ!

### เช็คความยาวกล่องด้วย len() 📏

อยากรู้ไหมว่ามีของกี่ชิ้น? ให้ใช้ \`len()\`

\`\`\`python
friends = ["โดเรม่อน", "โนบิตะ"]
print(len(friends))  # จะตอบว่า 2 (เพราะมี 2 คน)
\`\`\`

### สั่งเรียงของ (Sorting) 📊

ถ้าของในกล่องรกเกินไป เราสั่งให้มันเรียงได้!

\`\`\`python
# เรียงเลขจากน้อยไปมาก
numbers = [5, 2, 9, 1]
numbers.sort()  
# กลายเป็น [1, 2, 5, 9] ทันที!

# เรียงตัวอักษรก็ยังได้! (ตามพจนานุกรม)
names = ["Zebra", "Apple", "Dog"]
names.sort()
# กลายเป็น ["Apple", "Dog", "Zebra"]
\`\`\`

### ของสิ่งนี้อยู่ในกล่องไหมนะ? (in) 🔍

เราสามารถให้คอมพิวเตอร์ช่วยหาของในกล่องได้!

\`\`\`python
bag = ["สมุด", "ดินสอ"]

# หาคำว่า สมุด ใน bag
if "สมุด" in bag:
    print("มีสมุดอยู่ในกระเป๋า!")
\`\`\``,
          en: `## Organizing the Treasure Box (Advanced List) ✨

When we have too many things in our box, we can organize them!

### Check the box size with len() 📏

Want to know how many things are inside? Use \`len()\`

\`\`\`python
friends = ["Doraemon", "Nobita"]
print(len(friends))  # Will answer 2 (Because there are 2 people)
\`\`\`

### Sort the items (Sorting) 📊

If the items are messy, we can tell Python to sort them!

\`\`\`python
# Sort numbers from small to big
numbers = [5, 2, 9, 1]
numbers.sort()  
# Magically becomes [1, 2, 5, 9]!

# We can sort alphabets too! (Dictionary order)
names = ["Zebra", "Apple", "Dog"]
names.sort()
# Becomes ["Apple", "Dog", "Zebra"]
\`\`\`

### Is this thing in the box? (in) 🔍

We can ask the computer to find something in the box!

\`\`\`python
bag = ["Notebook", "Pencil"]

# Find the word "Notebook" in the bag
if "Notebook" in bag:
    print("You have a notebook in your bag!")
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
          th: `## สร้างคำสั่งส่วนตัว (def) 🛠️

ถ้ามีอะไรที่เราต้องทำซ้ำๆ บ่อยๆ เราคงขี้เกียจเขียนโค้ดเดิมซ้ำๆ ใช่ไหมล่ะ?

เราเลยสร้าง **ฟังก์ชัน (Function)** ขึ้นมา! มันคือการมัดรวมโค้ดหลายๆ บรรทัด แล้วตั้งชื่อให้มัน เหมือนสร้าง "คาถาเวทมนตร์" ส่วนตัวขึ้นมาใช้เอง!

### วิธีสร้างฟังก์ชัน (def)

เราใช้คำว่า \`def\` (ย่อมาจาก define = กำหนด) ในการสร้างคาถาใหม่!

\`\`\`python
# เราสร้างคาถาชื่อว่า say_hello()
def say_hello():
    print("สวัสดีจ้า!")
    print("กินข้าวหรือยัง?")

# ตอนนี้เรามีคาถาแล้ว แต่ยังไม่ได้ใช้นะ!

# วิธีร่ายคาถา! (เรียกใช้ฟังก์ชัน)
say_hello()  # คอมพิวเตอร์จะพิมพ์ สวัสดีจ้า! กินข้าวหรือยัง?
\`\`\`

### ฟังก์ชันที่รับของได้ด้วยนะ (Parameters) 🎁

บางทีเราก็อยากให้ฟังก์ชันทำงานต่างกันไปตามคน

\`\`\`python
# สร้างคาถาที่รับชื่อคนเข้าไปได้ด้วย!
def greet(name):
    print(f"สวัสดีคุณ {name}!")

# ร่ายคาถา!
greet("โดเรม่อน")  # ได้: สวัสดีคุณ โดเรม่อน!
greet("โนบิตะ")    # ได้: สวัสดีคุณ โนบิตะ!
\`\`\`

### ฟังก์ชันที่คืนของให้เรา (return) 🔄

นอกจากพูดแล้ว ฟังก์ชันยัง "คำนวณแล้วส่งของคืน" ให้เราได้ด้วย!

\`\`\`python
# ฟังก์ชันบวกเลข 2 ตัว
def add(a, b):
    answer = a + b
    return answer  # โยนคำตอบกลับมา!

# เรียกใช้ และรับค่ามาเก็บในกล่อง result
result = add(5, 10)
print(f"คำตอบคือ {result}")  # ได้: คำตอบคือ 15
\`\`\``,
          en: `## Creating Personal Commands (def) 🛠️

If there is something we have to do very often, we don't want to type the same code again and again, right?

So we create a **Function**! It's like bundling many lines of code and giving it a name. Just like creating your own personal "Magic Spell"!

### How to create a function (def)

We use the word \`def\` (Define) to create a new spell!

\`\`\`python
# We create a spell called say_hello()
def say_hello():
    print("Hello there!")
    print("Have you eaten yet?")

# We have the spell, but we haven't used it yet!

# How to cast the spell! (Call the function)
say_hello()  # Computer prints: Hello there! Have you eaten yet?
\`\`\`

### Functions that can accept things! (Parameters) 🎁

Sometimes we want the function to do slightly different things.

\`\`\`python
# Create a spell that accepts a name!
def greet(name):
    print(f"Hello Mr. {name}!")

# Cast the spell!
greet("Doraemon")  # Gets: Hello Mr. Doraemon!
greet("Nobita")    # Gets: Hello Mr. Nobita!
\`\`\`

### Functions that give things back! (return) 🔄

Functions don't just speak, they can "Calculate and Return" an answer to us!

\`\`\`python
# A function that adds 2 numbers
def add(a, b):
    answer = a + b
    return answer  # Throws the answer back!

# Call it, and catch the answer in the box 'result'
result = add(5, 10)
print(f"The answer is {result}")  # Gets: The answer is 15
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
          th: `## เขตหวงห้ามของตัวแปร (Scope) 🚧

เวลาเราสร้างกล่องเก็บของ (ตัวแปร) ไว้ในฟังก์ชัน กล่องนั้นจะเป็น **กล่องส่วนตัว**
คนข้างนอกจะมองไม่เห็นนะ!

\`\`\`python
def secret_room():
    # อันนี้คือตัวแปรส่วนตัว อยู่ในห้องความลับ
    treasure = "ทองคำ!"
    print(f"ในห้องมี {treasure}")

secret_room()  # อันนี้ทำงานได้ปกติ พิมพ์ ทองคำ!

# ❌ แต่ถ้าเราพยายามแอบดูขุมทรัพย์จากข้างนอกล่ะ?
# print(treasure)  <-- คอมพิวเตอร์จะโวยวาย (Error) ทันที!
# เพราะมันมองไม่เห็นของที่อยู่ในฟังก์ชันจ้า
\`\`\`

**จำง่ายๆ:** ของที่อยู่ใน \`def\` จะใช้ได้แค่ในนั้นเท่านั้น พอร่ายคาถาเสร็จ ของพวกนั้นก็จะสลายไป! ✨`,
          en: `## Restricted Zones for Variables (Scope) 🚧

When we create a box (variable) inside a function, it is a **Private Box**.
People outside cannot see it!

\`\`\`python
def secret_room():
    # This is a private variable inside the secret room
    treasure = "Gold!"
    print(f"The room has {treasure}")

secret_room()  # This works normally, prints Gold!

# ❌ But what if we try to peek at the treasure from the outside?
# print(treasure)  <-- The computer will complain (Error) instantly!
# Because it cannot see things that are locked inside a function.
\`\`\`

**Easy to remember:** Things inside \`def\` can only be used inside it. Once the spell finishes, those things vanish! ✨`,
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
          th: `## ยืมพลังเพื่อนมาใช้ (Module & Import) 🤝

ในโลก Python มีโปรแกรมเมอร์ใจดีมากมาย เขียนโค้ดแจกฟรีเพียบเลย!
เราสามารถไปยืมโค้ดของพวกเขามาใช้ได้ง่ายๆ เราเรียกการยืมนี้ว่าการใช้ **Module (โมดูล)**

เราจะใช้คาถาที่ชื่อว่า \`import\` แปลว่า "นำเข้ามา"

### ลองยืมเครื่องคิดเลขขั้นเทพมาใช้! 🧮

สมมติเราอยากหารากที่สอง (Square root) ไม่ต้องนั่งคิดเอง! ไปเรียก \`math\` มาช่วยเลย

\`\`\`python
import math  # บรรทัดนี้คือการไปสะกิดเรียกโมดูล math เข้ามาช่วยเรา!

# ลองให้ math ช่วยหารากที่สองของ 16
answer = math.sqrt(16)
print(answer)  # ได้ 4.0

# ขอดูค่า Pi หน่อย!
print(math.pi)  # ได้ 3.14159...
\`\`\`

### ลองยืมลูกเต๋ามาทอย! 🎲

ถ้าเราอยากสุ่มตัวเลข เราก็ไปเรียกโมดูล \`random\` เข้ามา!

\`\`\`python
import random

# สุ่มเลขตั้งแต่ 1 ถึง 10
lucky_number = random.randint(1, 10)
print(f"เลขเด็ดของคุณคือ {lucky_number}")
\`\`\`

การ \`import\` นี่แหละที่ทำให้ Python เก่งที่สุดในโลก เพราะมีเครื่องมือให้เรายืมใช้เพียบ! 🎉`,
          en: `## Borrowing Friends' Powers (Module & Import) 🤝

In the Python world, there are lots of kind programmers who write free code for us to use!
We can easily borrow their code. We call this borrowing a **Module**.

We use a magic word called \`import\` which means "bring in".

### Let's borrow an advanced calculator! 🧮

Suppose we want to find a Square Root. No need to calculate it yourself! Just call \`math\` to help.

\`\`\`python
import math  # This line taps the 'math' module on the shoulder to come help us!

# Ask math to find the square root of 16
answer = math.sqrt(16)
print(answer)  # Gives 4.0

# Ask for the Pi value!
print(math.pi)  # Gives 3.14159...
\`\`\`

### Let's borrow some dice to roll! 🎲

If we want a random number, we just call the \`random\` module!

\`\`\`python
import random

# Random a number from 1 to 10
lucky_number = random.randint(1, 10)
print(f"Your lucky number is {lucky_number}")
\`\`\`

The \`import\` command is what makes Python the best in the world, because there are so many free tools we can borrow! 🎉`,
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
