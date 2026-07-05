// src/data/modules/module1_flowchart.js
export const module1 = {
  id: 1,
  icon: '🗺️',
  color: '#10b981',
  colorDark: 'rgba(16,185,129,0.15)',
  requiredXP: 0,
  title: { th: 'อัลกอริทึมและผังงาน (Algorithms & Flowcharts)', en: 'Algorithms & Flowcharts' },
  description: {
    th: 'เจาะลึกกระบวนการคิดแบบโปรแกรมเมอร์ รหัสเทียม และการแก้ปัญหาอย่างเป็นระบบ',
    en: 'Deep dive into algorithmic thinking, pseudocode, and systematic problem solving',
  },
  lessons: [
    {
      id: '1-1',
      title: { th: 'อัลกอริทึมคืออะไร? (What is an Algorithm?)', en: 'What is an Algorithm?' },
      xpReward: 30,
      hasFlowchart: false,
      content: {
        th: `## อัลกอริทึม (Algorithm) คืออะไร? 🧠

ในระดับมหาวิทยาลัย การเขียนโปรแกรมไม่ได้เริ่มต้นที่การพิมพ์โค้ด แต่เริ่มต้นที่ **การคิด (Computational Thinking)** 

**อัลกอริทึม (Algorithm)** คือ ลำดับขั้นตอนวิธีในการแก้ปัญหาใดปัญหาหนึ่งอย่างเป็นระบบ มีจุดเริ่มต้นและจุดสิ้นสุดที่ชัดเจน และเมื่อทำตามขั้นตอนเหล่านี้ครบถ้วน จะต้องได้ผลลัพธ์ที่ถูกต้องเสมอ

### องค์ประกอบของอัลกอริทึมที่ดี (Characteristics of a Good Algorithm)
1. **Unambiguous (มีความชัดเจน):** แต่ละขั้นตอนต้องชัดเจน ไม่กำกวม ตีความได้แบบเดียว
2. **Finiteness (มีจุดสิ้นสุด):** อัลกอริทึมต้องทำงานเสร็จสิ้นภายในระยะเวลาหรือจำนวนขั้นตอนที่จำกัด (ไม่ติดลูปอนันต์)
3. **Feasibility (ปฏิบัติได้จริง):** ขั้นตอนต้องสามารถนำไปเขียนเป็นโปรแกรมและทำงานได้จริงด้วยทรัพยากรที่มี
4. **Independent (เป็นอิสระจากภาษา):** อัลกอริทึมที่ดีต้องสามารถนำไปเขียนด้วยภาษาใดก็ได้ (Python, Java, C++) 

> 💡 **ข้อคิด:** โปรแกรมเมอร์ที่เก่ง ไม่ใช่คนที่จำ Syntax ของภาษาได้แม่นยำที่สุด แต่คือคนที่ออกแบบอัลกอริทึมในการแก้ปัญหาได้มีประสิทธิภาพที่สุด (กิน RAM น้อย, ประมวลผลเร็ว)

---

### กระบวนการแก้ปัญหา (Problem Solving Process)
เวลาเราเจอโจทย์ยากๆ เรามักจะใช้หลักการ 4 ขั้นตอน:
1. **วิเคราะห์ปัญหา (Analyze the Problem):** ข้อมูลนำเข้า (Input) คืออะไร? ผลลัพธ์ (Output) ที่ต้องการคืออะไร?
2. **ออกแบบอัลกอริทึม (Design Algorithm):** วางแผนขั้นตอนการทำงาน อาจเขียนเป็น Flowchart หรือ Pseudocode
3. **ลงมือโค้ด (Implementation):** แปลงอัลกอริทึมให้เป็นภาษาโปรแกรม (เช่น Python)
4. **ทดสอบ (Testing/Debugging):** ลองใส่ข้อมูลและตรวจสอบว่าผลลัพธ์ถูกต้องในทุกกรณี (Edge cases) หรือไม่`,
        en: `## What is an Algorithm? 🧠

At the university level, programming does not start with typing code; it starts with **Computational Thinking**.

An **Algorithm** is a step-by-step procedure for solving a problem. It has a clear start and end, and following these steps will always yield the correct result.

### Characteristics of a Good Algorithm
1. **Unambiguous:** Each step must be clear and not open to multiple interpretations.
2. **Finiteness:** The algorithm must terminate after a finite number of steps (no infinite loops).
3. **Feasibility:** It must be practical and executable with available resources.
4. **Independent:** A good algorithm can be implemented in any programming language (Python, Java, C++).

> 💡 **Takeaway:** Great programmers aren't just those who memorize syntax, but those who design efficient algorithms (low memory, fast execution).`
      },
      commands: []
    },
    {
      id: '1-2',
      title: { th: 'รหัสเทียม (Pseudocode)', en: 'Pseudocode' },
      xpReward: 30,
      hasFlowchart: false,
      content: {
        th: `## รหัสเทียม (Pseudocode) 📝

ก่อนที่เราจะวาด Flowchart เรามักจะเขียนแนวคิดออกเป็น **รหัสเทียม (Pseudocode)** เสียก่อน 

**Pseudocode** คือ การอธิบายอัลกอริทึมด้วยภาษาที่คล้ายภาษาพูด (English-like syntax) ผสมกับโครงสร้างทางคอมพิวเตอร์ (เช่น IF, WHILE) โดยไม่มีไวยากรณ์ (Syntax) ที่เข้มงวดแบบภาษาโปรแกรมจริงๆ

### ตัวอย่าง: อัลกอริทึมการสอบผ่าน
สมมติเงื่อนไขคือ "ถ้าคะแนนตั้งแต่ 50 ขึ้นไป ถือว่าสอบผ่าน"

**การเขียน Pseudocode:**
\`\`\`text
START
  INPUT score
  IF score >= 50 THEN
    PRINT "Pass"
  ELSE
    PRINT "Fail"
  ENDIF
END
\`\`\`

### คำศัพท์ที่นิยมใช้ใน Pseudocode
- **รับค่า:** \`INPUT\`, \`READ\`, \`GET\`
- **แสดงผล:** \`OUTPUT\`, \`PRINT\`, \`DISPLAY\`
- **คำนวณ/กำหนดค่า:** \`SET\`, \`COMPUTE\`, \`CALCULATE\`
- **เงื่อนไข:** \`IF ... THEN ... ELSE ... ENDIF\`
- **ทำซ้ำ:** \`WHILE ... DO ... ENDWHILE\` หรือ \`FOR ... DO ... ENDFOR\`

การฝึกเขียน Pseudocode จะช่วยให้คุณจัดลำดับความคิดได้ดีมาก ก่อนที่จะไปปวดหัวกับวงเล็บ หรือเครื่องหมายต่างๆ ในการเขียนโค้ดจริง!`,
        en: `## Pseudocode 📝

Before drawing a Flowchart or writing code, we often express our ideas in **Pseudocode**.

**Pseudocode** is an informal high-level description of an algorithm using English-like syntax mixed with programming structures (like IF, WHILE). It has no strict syntax rules.

### Example: Passing an Exam
Condition: "If the score is 50 or above, you pass."

**Pseudocode:**
\`\`\`text
START
  INPUT score
  IF score >= 50 THEN
    PRINT "Pass"
  ELSE
    PRINT "Fail"
  ENDIF
END
\`\`\`

Practicing pseudocode helps you structure your thoughts clearly before worrying about brackets and syntax in actual coding!`
      },
      commands: []
    },
    {
      id: '1-3',
      title: { th: 'สัญลักษณ์ผังงานระดับลึก', en: 'Advanced Flowchart Symbols' },
      xpReward: 35,
      hasFlowchart: true,
      content: {
        th: `## ผังงาน (Flowchart) 🟢🟪🔷

เมื่อเรามี Pseudocode แล้ว บางครั้งภาพจะสื่อสารได้ดีกว่าตัวหนังสือ การนำอัลกอริทึมมาวาดเป็นภาพเรียกว่า **Flowchart**

ในระดับมหาวิทยาลัย เราจะเคร่งครัดเรื่องการใช้สัญลักษณ์ให้ถูกต้องตามมาตรฐาน **ISO/ANSI**

![สัญลักษณ์ Flowchart](/images/flowchart_symbols_1782705282978.png)

### สัญลักษณ์มาตรฐาน (Standard Symbols)

1. **Terminal (วงรี ⬭):** จุดเริ่มต้น (Start) และจุดสิ้นสุด (End/Stop) ของโปรแกรม 
2. **Process (สี่เหลี่ยมผืนผ้า ▭):** การประมวลผล การคำนวณ หรือการกำหนดค่าตัวแปร (เช่น \`x = x + 1\`)
3. **Input/Output (สี่เหลี่ยมด้านขนาน ▱):** การรับข้อมูล (Read/Input) หรือการแสดงผล (Print/Output) ทั่วไป
4. **Decision (สี่เหลี่ยมข้าวหลามตัด ◇):** การตัดสินใจ ต้องมีทางแยกออก 2 ทางเสมอ (เช่น True / False หรือ Yes / No)
5. **Flowline (ลูกศร →):** ทิศทางการทำงานของโปรแกรม (หัวลูกศรต้องมีเสมอ และปกติจะพุ่งลงล่าง หรือไปทางขวา)

### สัญลักษณ์ขั้นสูง (Advanced Symbols)
- **Preparation (สี่เหลี่ยมหกเหลี่ยม):** มักใช้กับการประกาศค่าเริ่มต้นของลูป (For-loop initialization)
- **Subroutine/Predefined Process (สี่เหลี่ยมมีเส้นขีดข้าง):** การเรียกใช้ฟังก์ชันย่อยที่ถูกนิยามไว้ที่อื่น (ฟังก์ชัน/โมดูล)
- **On-page Connector (วงกลม):** จุดเชื่อมต่อผังงานในหน้าเดียวกัน เพื่อลดความสับสนของเส้นลูกศรที่ตัดกัน
- **Off-page Connector (รูปห้าเหลี่ยมคล้ายป้าย):** จุดเชื่อมต่อไปยังกระดาษหน้าถัดไป

> ⚠️ **ข้อควรระวัง:** เส้นลูกศร (Flowline) ห้ามปล่อยปลายทิ้งไว้เฉยๆ ต้องชี้เข้าหาสัญลักษณ์ใดสัญลักษณ์หนึ่งเสมอ และจุดเริ่มต้นต้องมีเส้นพุ่งออกเท่านั้น ส่วนจุดสิ้นสุดต้องมีเส้นพุ่งเข้าเท่านั้น!`,
        en: `## Advanced Flowchart Symbols 🟢🟪🔷

A Flowchart is a visual representation of an algorithm. At the university level, we strictly follow **ISO/ANSI** standards for symbols.

### Standard Symbols
1. **Terminal (Oval ⬭):** Start and End points.
2. **Process (Rectangle ▭):** Calculations, data processing, or variable assignment (e.g., \`x = x + 1\`).
3. **Input/Output (Parallelogram ▱):** Reading input or displaying output.
4. **Decision (Diamond ◇):** Conditional branching. Must have exactly two outgoing flowlines (e.g., True/False).
5. **Flowline (Arrow →):** Shows the direction of the process.

### Advanced Symbols
- **Preparation (Hexagon):** Often used for loop initialization.
- **Subroutine (Rectangle with double vertical lines):** Calling a predefined function or module.
- **Connectors:** Circles for on-page connections, and shield-like shapes for off-page connections to avoid messy crossing lines.`
      },
      commands: []
    },
    {
      id: '1-4',
      title: { th: 'โครงสร้างการควบคุมพื้นฐาน (Control Structures)', en: 'Basic Control Structures' },
      xpReward: 40,
      hasFlowchart: false,
      content: {
        th: `## โครงสร้างการควบคุม (Control Structures) 🏗️

โปรแกรมทุกโปรแกรมในโลกนี้ ไม่ว่าจะซับซ้อนแค่ไหน (เช่น AI หรือเกม 3D) ล้วนถูกสร้างขึ้นจากโครงสร้างพื้นฐานเพียง 3 แบบตาม **Böhm-Jacopini Theorem**:

### 1. ลำดับ (Sequential Structure)
โปรแกรมทำงานจากบนลงล่าง ทีละคำสั่ง ไม่มีการข้ามคำสั่ง
- **ตัวอย่าง:** รับค่ารัศมี -> คำนวณพื้นที่ -> แสดงพื้นที่

### 2. ทางเลือก (Selection/Decision Structure)
โปรแกรมต้องเลือกทางเดินใดทางเดินหนึ่งตาม "เงื่อนไข (Condition)" 
- **รูปแบบ IF-THEN:** ถ้าจริงทำ ถ้าเท็จข้ามไป
- **รูปแบบ IF-THEN-ELSE:** ถ้าจริงทำอย่างหนึ่ง ถ้าเท็จทำอีกอย่างหนึ่ง
- **ตัวอย่าง:** ถ้าอายุ >= 18 ให้ทำบัตรประชาชนได้, ถ้าไม่ใช่ ให้รอไปก่อน

### 3. ทำซ้ำ (Iteration/Looping Structure)
โปรแกรมทำงานกลุ่มคำสั่งเดิมซ้ำๆ ตราบที่เงื่อนไขยังเป็นจริง
- **รูปแบบ Pre-test loop (While):** เช็คเงื่อนไขก่อน ถ้าจริงค่อยทำ (ถ้าเท็จแต่แรกก็จะไม่ทำเลย)
- **รูปแบบ Post-test loop (Do-While):** ทำไปก่อน 1 รอบ ค่อยเช็คเงื่อนไข
- **ตัวอย่าง:** โปรแกรมให้ใส่รหัสผ่าน ถ้าใส่ผิด ให้ขึ้นว่า "ลองใหม่" และให้ใส่ซ้ำไปเรื่อยๆ จนกว่าจะถูก

การเขียนโปรแกรมก็คือการนำ 3 โครงสร้างนี้มา **ต่อกัน (Sequential composition)** และ **ซ้อนกัน (Nesting)** จนเกิดเป็นระบบที่ซับซ้อนขึ้นนั่นเอง!`,
        en: `## Control Structures 🏗️

According to the **Böhm-Jacopini Theorem**, all programs, no matter how complex, are built using only three basic control structures:

### 1. Sequential Structure
Commands are executed one after another from top to bottom.

### 2. Selection Structure
The program chooses a path based on a condition (Boolean evaluation).
- **IF-THEN:** Execute if true, skip if false.
- **IF-THEN-ELSE:** Execute path A if true, path B if false.

### 3. Iteration Structure (Loops)
The program repeats a block of code as long as a condition is true.
- **Pre-test loop (While):** Checks condition before executing.
- **Post-test loop (Do-While):** Executes once before checking condition.

Programming is simply combining and nesting these three structures!`
      },
      commands: []
    },
    {
      id: '1-5',
      title: { th: 'การ Trace อัลกอริทึม (Desk Checking)', en: 'Algorithm Tracing (Desk Checking)' },
      xpReward: 50,
      hasFlowchart: false,
      content: {
        th: `## การตรวจสอบอัลกอริทึมด้วยมือ (Trace Table / Desk Checking) 🕵️‍♂️

สิ่งที่แยกรุ่นพี่ปี 4 ออกจากเฟรชชี่ปี 1 คือ **ทักษะการ Trace โค้ดด้วยมือเปล่า**!

เวลาเราออกแบบอัลกอริทึมเสร็จ เรายังไม่ควรพิมพ์โค้ดทันที แต่ควรทำ **Desk Checking** (หรือรันโค้ดในกระดาษ) เพื่อพิสูจน์ว่าลอจิกของเราถูกต้อง

### วิธีทำ Trace Table (ตารางไล่สถานะตัวแปร)
เราจะตีตารางโดยให้แต่ละคอลัมน์คือ "ตัวแปร" 1 ตัว และจำลองการทำงานของโปรแกรมทีละบรรทัด

**ตัวอย่างอัลกอริทึม:**
1. \`SET x = 5\`
2. \`SET y = 2\`
3. \`WHILE x > y DO\`
4.   \`SET x = x - 1\`
5.   \`SET y = y + 1\`
6. \`ENDWHILE\`
7. \`PRINT x, y\`

**Trace Table:**
| Step (บรรทัด) | x | y | เงื่อนไข (x > y) | Output |
|--------------|---|---|------------------|--------|
| 1, 2         | 5 | 2 | -                | -      |
| 3 (รอบ 1)    | 5 | 2 | 5 > 2 (True)     | -      |
| 4, 5         | 4 | 3 | -                | -      |
| 3 (รอบ 2)    | 4 | 3 | 4 > 3 (True)     | -      |
| 4, 5         | 3 | 4 | -                | -      |
| 3 (รอบ 3)    | 3 | 4 | 3 > 4 (False) จบลูป| -      |
| 7            | 3 | 4 | -                | "3 4"  |

การทำตารางแบบนี้จะช่วยให้เราเห็น **บั๊ก (Bug)** หรือข้อผิดพลาดเชิงตรรกะได้ตั้งแต่ก่อนเขียนโค้ด! ในแบบฝึกหัดต่อไป คุณจะต้องฝึกคำนวณลอจิกในใจ!`,
        en: `## Algorithm Tracing (Desk Checking) 🕵️‍♂️

Before writing code, we should verify our algorithm using a technique called **Desk Checking** or creating a **Trace Table**.

A trace table simulates the computer's memory. You create columns for variables and conditions, and track how their values change line by line.

By manually executing your algorithm on paper, you can catch logical bugs (like infinite loops or incorrect off-by-one errors) before you even touch a keyboard. It's a critical skill for computer science students!`
      },
      commands: []
    }
  ]
};
