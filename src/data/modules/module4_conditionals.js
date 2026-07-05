// src/data/modules/module4_conditionals.js
export const module4 = {
  id: 4,
  icon: '🔀',
  color: '#f59e0b',
  colorDark: 'rgba(245,158,11,0.15)',
  requiredXP: 250,
  title: { th: 'เงื่อนไขและการตัดสินใจ (Conditionals)', en: 'Conditionals & Logic' },
  description: {
    th: 'เจาะลึกคำสั่ง if-else, ตรรกศาสตร์ (and/or/not) และความลับของ Truthy/Falsy',
    en: 'Deep dive into if-else, Boolean logic, and Truthy/Falsy mechanics',
  },
  lessons: [
    {
      id: '4-1',
      title: { th: 'ตัวดำเนินการเปรียบเทียบ (Comparison)', en: 'Comparison Operators' },
      xpReward: 30,
      content: {
        th: `## การเปรียบเทียบ (Comparison) ⚖️

ก่อนที่เราจะสั่งให้โปรแกรม "ตัดสินใจ" เราต้องรู้จักวิธีตั้งคำถามกับคอมพิวเตอร์เสียก่อน คำถามเหล่านี้จะให้คำตอบกลับมาเป็น **Boolean (\`True\` หรือ \`False\`)** เสมอ

### ตัวดำเนินการเปรียบเทียบ (Comparison Operators)
เครื่องหมายเหล่านี้ใช้เปรียบเทียบค่า 2 ฝั่ง:

- \`==\` (เท่ากับ): ตรวจสอบว่าซ้ายกับขวา **มีค่าเท่ากันไหม** (ระวัง! ใช้ \`=\` ตัวเดียวไม่ได้ เพราะ \`=\` คือการกำหนดค่าให้ตัวแปร)
- \`!=\` (ไม่เท่ากับ): ตรวจสอบว่าซ้ายกับขวา **ไม่เท่ากัน** ใช่หรือไม่
- \`>\` (มากกว่า): ซ้ายมากกว่าขวาไหม?
- \`<\` (น้อยกว่า): ซ้ายน้อยกว่าขวาไหม?
- \`>=\` (มากกว่าหรือเท่ากับ): ซ้ายมากกว่า หรือ เท่ากับ ขวาไหม?
- \`<=\` (น้อยกว่าหรือเท่ากับ): ซ้ายน้อยกว่า หรือ เท่ากับ ขวาไหม?

**ตัวอย่างการใช้งาน:**
\`\`\`python
# คำสั่งเช็คว่า 10 มากกว่า 5 ไหม
result1 = (10 > 5)  
print(result1)  # ได้ True

# คำสั่งเช็คว่า "Apple" เท่ากับ "apple" ไหม
result2 = ("Apple" == "apple")
print(result2)  # ได้ False (เพราะตัวพิมพ์ใหญ่/เล็ก ในคอมพิวเตอร์ถือว่าไม่เหมือนกัน!)
\`\`\`

> 💡 **ทริคระดับมหาลัย:** ใน Python เราสามารถเปรียบเทียบแบบต่อเนื่องได้เหมือนวิชาคณิตศาสตร์เลย! เช่น \`10 < x < 20\` ซึ่งภาษาอื่นอย่าง C++ หรือ Java ทำแบบนี้ไม่ได้นะ!`,
        en: `## Comparison Operators ⚖️

Before making decisions, you need to ask questions. In programming, these questions yield a **Boolean (\`True\` or \`False\`)**.

### Operators
- \`==\` : Equal to (Do NOT confuse with \`=\` which is for assignment).
- \`!=\` : Not equal to.
- \`>\`  : Greater than.
- \`<\`  : Less than.
- \`>=\` : Greater than or equal to.
- \`<=\` : Less than or equal to.

\`\`\`python
print(10 > 5)         # True
print("A" == "a")     # False (Case-sensitive!)
print(10 < 15 < 20)   # True (Python supports chained comparisons!)
\`\`\``
      },
      commands: [
        {
          name: 'Comparison Operators',
          syntax: 'a == b, a != b, a < b, a > b, a <= b, a >= b',
          description: { th: 'เปรียบเทียบค่า 2 ฝั่ง แล้วคืนผลลัพธ์เป็น True หรือ False', en: 'Compare two values and return True or False' },
          example: 'print(10 > 5)       # True\\nprint("A" == "a")   # False\\nprint(1 <= 1)       # True',
        },
      ]
    },
    {
      id: '4-2',
      title: { th: 'คำสั่ง if, elif, else', en: 'If, Elif, Else' },
      xpReward: 40,
      content: {
        th: `## คำสั่ง if, elif, else (ทางแยกของโปรแกรม) 🔀

นี่คือคำสั่งที่ทำให้คอมพิวเตอร์ "คิดเองได้" โดยมันจะเลือกทำงานตามเงื่อนไขที่เรากำหนด

### 1. คำสั่ง \`if\` (ถ้า...)
ใช้เมื่อต้องการให้โปรแกรมทำงานบางอย่าง **"เฉพาะตอนที่เงื่อนไขเป็นจริง (True)"**
**โครงสร้าง (Syntax):**
\`\`\`python
# คำสั่ง if ตามด้วยเงื่อนไข และต้องปิดท้ายด้วยเครื่องหมายโคลอน (:) เสมอ
if score >= 50:
    # บรรทัดถัดมา "ต้องเคาะย่อหน้า (Indentation)" เสมอ! 
    # (ปกติใช้ Tab หรือ 4 Space) เพื่อบอกว่าโค้ดนี้อยู่ใน if
    print("สอบผ่าน!")
\`\`\`

### 2. คำสั่ง \`else\` (มิฉะนั้น...)
ใช้คู่กับ \`if\` เอาไว้ดักกรณีที่เงื่อนไขของ \`if\` เป็น **เท็จ (False)**
\`\`\`python
if score >= 50:
    print("สอบผ่าน!")
else:
    # จะทำงานเมื่อเงื่อนไขข้างบนเป็น False ทั้งหมด
    print("สอบตก! สู้ใหม่นะ")
\`\`\`

### 3. คำสั่ง \`elif\` (ย่อมาจาก else if - หรือถ้า...)
ใช้เมื่อเรามี **"หลายเงื่อนไข"** ให้เช็ค (เช่น การตัดเกรด A, B, C, D)
\`\`\`python
if score >= 80:
    print("เกรด A")
elif score >= 70:
    print("เกรด B")
elif score >= 60:
    print("เกรด C")
else:
    print("เกรด F")
\`\`\`

> ⚠️ **กฎเหล็กของ Python:** ภาษา Python ไม่มีปีกกา \`{}\` เพื่อบอกขอบเขตโค้ด มันจึงใช้ **"การย่อหน้า (Indentation)"** เป็นตัวแบ่งเขต ถ้าคุณลืมย่อหน้า หรือย่อหน้าเบี้ยวไปแค่ช่องเดียว โปรแกรมจะพังทันที (IndentationError)!`,
        en: `## If, Elif, Else 🔀

These commands allow your program to make decisions.

### 1. \`if\` Statement
Executes a block of code ONLY if the condition is \`True\`.
\`\`\`python
if score >= 50:
    print("Pass!") # MUST be indented!
\`\`\`

### 2. \`else\` Statement
Executes when the \`if\` condition is \`False\`.
\`\`\`python
if score >= 50:
    print("Pass!")
else:
    print("Fail!")
\`\`\`

### 3. \`elif\` Statement
Short for "else if". Used for checking multiple conditions sequentially.

> ⚠️ **Golden Rule:** Python uses **Indentation** (usually 4 spaces or a Tab) to define code blocks instead of brackets \`{}\`. Incorrect indentation will cause an \`IndentationError\`.`
      },
      commands: [
        {
          name: 'if',
          syntax: 'if condition:\\n    code',
          description: { th: 'ตรวจสอบเงื่อนไข ถ้าเป็น True จะทำโค้ดในบล็อก', en: 'Execute a block of code only if the condition is True' },
          example: 'if score >= 50:\\n    print("Pass!")',
        },
        {
          name: 'elif',
          syntax: 'elif condition:\\n    code',
          description: { th: 'ตรวจสอบเงื่อนไขเพิ่มเติม (ใช้ต่อจาก if)', en: 'Check an additional condition after if (else if)' },
          example: 'if score >= 80:\\n    print("A")\\nelif score >= 70:\\n    print("B")',
        },
        {
          name: 'else',
          syntax: 'else:\\n    code',
          description: { th: 'ทำงานเมื่อเงื่อนไข if/elif ทั้งหมดเป็น False', en: 'Execute when all preceding if/elif conditions are False' },
          example: 'if score >= 50:\\n    print("Pass")\\nelse:\\n    print("Fail")',
        },
      ]
    },
    {
      id: '4-3',
      title: { th: 'ตรรกศาสตร์ (and, or, not)', en: 'Logical Operators' },
      xpReward: 40,
      content: {
        th: `## ตรรกศาสตร์ (Logical Operators) 🧠

บางครั้งเราไม่ได้อยากเช็คแค่เงื่อนไขเดียว เช่น "ต้องอายุเกิน 18 **และ** ต้องมีตั๋ว ถึงจะเข้าดูหนังได้" เราจึงต้องใช้เครื่องหมายทางตรรกศาสตร์มาช่วยเชื่อมเงื่อนไข

### 1. \`and\` (และ)
จะเป็น **True** ก็ต่อเมื่อเงื่อนไข **ทุกตัวเป็นจริงทั้งหมด** (ขาดตัวใดตัวหนึ่งไม่ได้)
\`\`\`python
age = 20
has_ticket = True

if age >= 18 and has_ticket == True:
    print("เชิญเข้าโรงหนังได้ครับ")
\`\`\`

### 2. \`or\` (หรือ)
จะเป็น **True** ขอแค่มีเงื่อนไข **ตัวใดตัวหนึ่งเป็นจริง** ก็พอแล้ว
\`\`\`python
has_vip_card = False
has_cash = True

if has_vip_card == True or has_cash == True:
    print("ซื้อของได้")
\`\`\`

### 3. \`not\` (นิเสธ / ไม่)
ใช้ **กลับค่าความจริง** จาก True เป็น False และ False เป็น True (เหมือนคนคุยด้วยยาก บอกซ้ายไปขวา)
\`\`\`python
is_raining = False

if not is_raining:  # มีความหมายเหมือน if is_raining == False:
    print("ไปเตะบอลกัน!")
\`\`\`

---
### 🔥 ทฤษฎีระดับมหาลัย: Short-circuit Evaluation (การขี้เกียจคิดของคอมพิวเตอร์)

คอมพิวเตอร์ถูกสร้างมาให้ฉลาดและขี้เกียจ (เพื่อประหยัดแบตและเวลา)!
- **กรณี \`and\`:** ถ้ามันตรวจเจอว่าเงื่อนไขตัวแรกเป็น \`False\` มันจะ **หยุดตรวจตัวที่เหลือทันที!** (เพราะรู้อยู่แล้วว่าสรุปยังไงก็ False)
- **กรณี \`or\`:** ถ้ามันตรวจเจอว่าเงื่อนไขตัวแรกเป็น \`True\` มันจะ **หยุดตรวจตัวที่เหลือทันที!** (เพราะรู้อยู่แล้วว่าสรุปยังไงก็ True)

\`\`\`python
# ถ้า x = 0
if x != 0 and (10 / x) > 1:
    print("ผ่าน")
# โค้ดนี้ไม่ Error เพราะพอ x!=0 เป็น False มันก็หยุดทำทันที (ไม่ฝืนไปหารด้วย 0 ให้โปรแกรมบึ้ม)
\`\`\``,
        en: `## Logical Operators (and, or, not) 🧠

To combine multiple conditions, we use logical operators.

### 1. \`and\`
Returns \`True\` ONLY if **both** conditions are True.
\`\`\`python
if age >= 18 and has_ticket:
    print("Welcome!")
\`\`\`

### 2. \`or\`
Returns \`True\` if **at least one** condition is True.

### 3. \`not\`
Reverses the boolean value (True becomes False, and vice versa).
\`\`\`python
if not is_raining:
    print("Let's go outside!")
\`\`\`

---
### 🔥 University Concept: Short-circuit Evaluation
Computers are designed to evaluate expressions lazily to save processing time:
- In \`A and B\`, if \`A\` is False, it immediately stops and returns False without checking \`B\`.
- In \`A or B\`, if \`A\` is True, it immediately stops and returns True without checking \`B\`.

This feature prevents errors, like dividing by zero if the first condition safely catches it!`
      },
      commands: [
        {
          name: 'and',
          syntax: 'condition1 and condition2',
          description: { th: 'คืนค่า True เมื่อเงื่อนไขทุกตัวเป็น True ทั้งหมด', en: 'Returns True only if ALL conditions are True' },
          example: 'if age >= 18 and has_ticket:\\n    print("Welcome!")',
        },
        {
          name: 'or',
          syntax: 'condition1 or condition2',
          description: { th: 'คืนค่า True เมื่อมีเงื่อนไขอย่างน้อย 1 ตัวเป็น True', en: 'Returns True if at least one condition is True' },
          example: 'if has_vip or has_cash:\\n    print("Can buy!")',
        },
        {
          name: 'not',
          syntax: 'not condition',
          description: { th: 'กลับค่าความจริง (True เป็น False, False เป็น True)', en: 'Reverses the boolean value (True becomes False and vice versa)' },
          example: 'if not is_raining:\\n    print("Go outside!")',
        },
      ]
    },
    {
      id: '4-4',
      title: { th: 'ความลับของ Truthy / Falsy', en: 'Truthy & Falsy Values' },
      xpReward: 50,
      content: {
        th: `## ความลับของ Truthy และ Falsy 👻

ใน Python คำสั่ง \`if\` ไม่จำเป็นต้องเช็คกับ \`True\` หรือ \`False\` เสมอไป! 
คุณสามารถโยน **"อะไรก็ได้"** ใส่เข้าไปใน \`if\` เช่น ตัวเลข, ข้อความ, หรือ List แล้ว Python จะมีเซนส์ในการตีความสิ่งเหล่านั้นว่ามัน **"มีความหมายเหมือน True (Truthy)"** หรือ **"มีความหมายเหมือน False (Falsy)"**

### ค่าที่เป็น Falsy (ตีความว่าเป็น False เสมอ)
จำง่ายๆ: **"ความว่างเปล่าทั้งปวง คือ False"**
1. ตัวเลข \`0\` หรือ \`0.0\`
2. ข้อความว่างๆ \`""\` หรือ \`''\`
3. List ว่างๆ \`[]\` หรือ Dictionary ว่างๆ \`{}\`
4. ค่า \`None\` (ไม่มีข้อมูล)
5. และแน่นอน ตัวมันเองคือ \`False\`

### ค่าที่เป็น Truthy (ตีความว่าเป็น True เสมอ)
จำง่ายๆ: **"ทุกอย่างบนโลกที่ไม่ใช่ Falsy คือ True หมด!"**
- ตัวเลขอื่นๆ เช่น \`1\`, \`-5\`, \`3.14\`
- ข้อความที่มีตัวอักษร เช่น \`"Hello"\`, \`" "\` (แม้แต่ช่องว่างก็เป็น True)
- List ที่มีของอยู่ข้างใน

### ตัวอย่างโปรแกรมระดับโปร
โปรแกรมเมอร์มือใหม่จะเขียนแบบนี้:
\`\`\`python
name = input("Enter name: ")
if name == "":
    print("คุณไม่ได้พิมพ์ชื่อ!")
\`\`\`

แต่โปรแกรมเมอร์ระดับซีเนียร์ (Pythonic way) จะเขียนสั้นๆ แบบนี้:
\`\`\`python
name = input("Enter name: ")
if not name:  # ถ้า name ว่างเปล่า มันคือ Falsy -> โดน not ทับจะกลายเป็น True
    print("คุณไม่ได้พิมพ์ชื่อ!")
\`\`\`
เจ๋งใช่ไหมล่ะ! การเข้าใจ Truthy/Falsy ทำให้เราเขียนโค้ดได้สั้นลงและอ่านง่ายขึ้นเยอะ!`,
        en: `## Truthy & Falsy Values 👻

In Python, an \`if\` statement doesn't strictly need a Boolean (\`True\`/\`False\`). You can pass any object, and Python will evaluate its "Truthiness".

### Falsy Values (Evaluates to False)
Rule of thumb: **Emptiness is False.**
1. Number Zero: \`0\`, \`0.0\`
2. Empty Strings: \`""\`, \`''\`
3. Empty Collections: \`[]\`, \`{}\`
4. The \`None\` keyword.
5. \`False\` itself.

### Truthy Values (Evaluates to True)
Rule of thumb: **Everything else!**
- Numbers like \`1\`, \`-5\`, \`3.14\`
- Strings with content, even a space \`" "\`
- Collections with items.

### The Pythonic Way
Instead of checking \`if name == "":\`, professional Python developers write:
\`\`\`python
name = input("Enter name: ")
if not name:
    print("You didn't enter a name!")
\`\`\`
Understanding Truthy/Falsy makes your code concise and deeply Pythonic.`
      },
      commands: []
    }
  ]
};
