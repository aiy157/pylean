// src/data/modules/module3_io.js
export const module3 = {
  id: 3,
  icon: '⌨️',
  color: '#8b5cf6',
  colorDark: 'rgba(139,92,246,0.15)',
  requiredXP: 100,
  title: { th: 'การรับส่งข้อมูลและข้อความ (I/O & Strings)', en: 'Input/Output & Strings' },
  description: {
    th: 'เจาะลึกการจัดรูปแบบข้อความขั้นสูง (f-strings, alignment) และการจัดการ Input/Output',
    en: 'Advanced string formatting (f-strings) and standard I/O management',
  },
  lessons: [
    {
      id: '3-1',
      title: { th: 'ฟังก์ชัน print() ฉบับเจาะลึก', en: 'print() In-Depth' },
      xpReward: 30,
      content: {
        th: `## ผ่าตัดฟังก์ชัน print() 🖨️

ทุกคนรู้ว่า \`print()\` เอาไว้แสดงผล แต่ในระดับมหาวิทยาลัย เราต้องรู้ว่า \`print()\` มีพารามิเตอร์ลับ (Keyword arguments) ซ่อนอยู่!

### โครงสร้างเต็มๆ ของ print()
\`print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)\`

1. **\`sep\` (Separator):** ตัวคั่นระหว่างข้อมูล (ค่าปกติคือ 1 ช่องว่าง)
2. **\`end\`:** ตัวปิดท้าย (ค่าปกติคือ \`\\n\` หรือการขึ้นบรรทัดใหม่)

### การประยุกต์ใช้งาน
\`\`\`python
# เปลี่ยนตัวคั่นจากช่องว่างเป็นเครื่องหมายขีด
print("081", "123", "4567", sep="-") 
# Output: 081-123-4567

# พิมพ์ติดกันโดยไม่ขึ้นบรรทัดใหม่
print("Hello", end="")
print("World")
# Output: HelloWorld (ไม่ขึ้นบรรทัดใหม่)
\`\`\`

> 💡 **เทคนิค:** ถ้ารันลูปแล้วอยากให้ผลลัพธ์พิมพ์เรียงกันในบรรทัดเดียว ให้ใช้ \`end=' '\``,
        en: `## print() In-Depth 🖨️

Everyone knows \`print()\`, but at a university level, you need to understand its hidden parameters.

### Signature
\`print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)\`

- **\`sep\` (Separator):** How multiple objects are separated (default is a space).
- **\`end\`:** What is printed at the very end (default is \`\\n\` newline).

### Examples
\`\`\`python
print("081", "123", "4567", sep="-") 
# Output: 081-123-4567

print("Hello", end="")
print("World")
# Output: HelloWorld
\`\`\``
      },
      commands: [
        {
          name: 'print()',
          syntax: 'print(*objects, sep=\' \', end=\'\\n\')',
          description: { th: 'แสดงผลข้อมูลออกทางหน้าจอ พร้อมกำหนดตัวคั่น (sep) และตัวปิดท้าย (end) ได้', en: 'Display output to the screen with customizable separator (sep) and ending (end)' },
          example: 'print("A", "B", "C", sep="-")  # A-B-C\\nprint("Hi", end="!")  # Hi!',
        },
      ]
    },
    {
      id: '3-2',
      title: { th: 'อักขระหลีก (Escape Characters)', en: 'Escape Characters' },
      xpReward: 35,
      content: {
        th: `## อักขระหลีก (Escape Characters) 🥷

ในคอมพิวเตอร์ มีปุ่มบางปุ่มที่เราพิมพ์ลงไปใน String ตรงๆ ไม่ได้ เช่น ปุ่ม Enter, ปุ่ม Tab หรือแม้กระทั่งเครื่องหมาย \`"\` (เพราะมันจะไปตีบกับเครื่องหมายเปิด/ปิด String)

เราจึงต้องใช้ **สแลชกลับ (Backslash \`\\\`)** เพื่อบอก Python ว่า "ตัวถัดไปคืออักขระพิเศษนะ!"

| โค้ด | ความหมาย | สิ่งที่เกิดขึ้น |
|------|----------|---------------|
| \`\\n\` | Newline | ขึ้นบรรทัดใหม่ (เหมือนกด Enter) |
| \`\\t\` | Tab | เว้นวรรค 1 Tab |
| \`\\'\` | Single Quote | พิมพ์เครื่องหมาย ' ออกมา |
| \`\\"\` | Double Quote | พิมพ์เครื่องหมาย " ออกมา |
| \`\\\\\` | Backslash | พิมพ์เครื่องหมาย \\ ออกมา |

### ตัวอย่าง:
\`\`\`python
print("Name:\\tSomchai\\nAge:\\t20")
# Output:
# Name:    Somchai
# Age:     20

print("เขาพูดว่า \\"ฉันรัก Python\\"")
# Output: เขาพูดว่า "ฉันรัก Python"
\`\`\`

> ⚠️ **คำเตือน:** เวลาเขียน path ไฟล์ใน Windows (\`C:\\Users\\name\`) ให้ระวัง \`\\U\` หรือ \`\\n\` จะถูกมองเป็น Escape Character! ทางแก้คือใช้ \`\\\\\` สองตัว หรือใส่ตัว \`r\` ไว้หน้า String (เช่น \`r"C:\\Users\\name"\`)`,
        en: `## Escape Characters 🥷

How do you print a newline, a tab, or a quote inside a string without breaking the syntax? You use the **Backslash (\\\`)**.

| Code | Meaning |
|------|---------|
| \`\\n\` | Newline (Enter) |
| \`\\t\` | Tab |
| \`\\"\` | Double Quote |
| \`\\\\\` | Backslash |

\`\`\`python
print("She said, \\"Hello!\\"")
\`\`\``
      },
      commands: []
    },
    {
      id: '3-3',
      title: { th: 'การรับค่าด้วย input()', en: 'Input Function' },
      xpReward: 35,
      content: {
        th: `## รับข้อมูลจากผู้ใช้ (Input) 🎤

โปรแกรมที่ดีต้องโต้ตอบกับผู้ใช้ได้! ฟังก์ชัน \`input()\` จะหยุดโปรแกรมชั่วคราวและรอให้ผู้ใช้พิมพ์อะไรบางอย่างแล้วกด Enter

### ⚠️ กฎเหล็กของ input()
**ค่าที่ได้จาก \`input()\` จะเป็น "String (ข้อความ)" เสมอ!** ไม่ว่าคุณจะพิมพ์ตัวเลข 100 เข้าไปก็ตาม

\`\`\`python
age = input("Enter your age: ")
print(type(age)) # จะได้ <class 'str'>
\`\`\`

ถ้าคุณเอาไปบวกเลข โปรแกรมจะพัง (TypeError):
\`\`\`python
age = input("Enter age: ")
next_year = age + 1  # ❌ ERROR!
\`\`\`

**วิธีแก้ (Type Casting):** คุณต้องครอบ \`input()\` ด้วย \`int()\` หรือ \`float()\` เสมอถ้ารับค่าตัวเลข
\`\`\`python
age = int(input("Enter age: "))
next_year = age + 1  # ✅ ทำงานได้!
\`\`\``,
        en: `## Receiving User Input 🎤

The \`input()\` function pauses the program and waits for the user to type something and press Enter.

### ⚠️ The Golden Rule of input()
**\`input()\` ALWAYS returns a String!** Even if the user types a number.

\`\`\`python
age = input("Enter age: ") # Returns "20", not 20
\`\`\`

**Solution (Type Casting):** Always wrap \`input()\` with \`int()\` or \`float()\` if you expect a number.
\`\`\`python
age = int(input("Enter age: "))
next_year = age + 1 # Works!
\`\`\``
      },
      commands: [
        {
          name: 'input()',
          syntax: 'input(prompt)',
          description: { th: 'รับค่าจากผู้ใช้ทางคีย์บอร์ด (คืนค่าเป็น String เสมอ)', en: 'Receive user input from the keyboard (always returns a String)' },
          example: 'name = input("Enter name: ")\\nage = int(input("Enter age: "))',
        },
      ]
    },
    {
      id: '3-4',
      title: { th: 'f-strings ขั้นเทพ (Advanced Formatting)', en: 'Advanced f-strings' },
      xpReward: 50,
      content: {
        th: `## f-strings ขั้นเทพ (String Interpolation) 💎

ตั้งแต่ Python 3.6 เป็นต้นมา มีฟีเจอร์ที่เรียกว่า **f-strings** ซึ่งเปลี่ยนชีวิตโปรแกรมเมอร์ไปตลอดกาล!
แค่เติมตัว \`f\` ไว้หน้า String คุณก็สามารถแทรกตัวแปรเข้าไปในวงเล็บปีกกา \`{}\` ได้เลย

\`\`\`python
name = "Alice"
score = 95
print(f"Student: {name}, Score: {score}")
\`\`\`

แต่นั่นมันพื้นฐานเกินไป ระดับมหาวิทยาลัยต้องรู้เทคนิคเหล่านี้:

### 1. คำนวณในปีกกาได้เลย!
\`\`\`python
print(f"2 + 2 เท่ากับ {2 + 2}")
\`\`\`

### 2. จัดรูปแบบทศนิยม (Formatting Floats)
อยากให้ทศนิยมมี 2 ตำแหน่งเป๊ะๆ ให้ใส่ \`:.2f\` (f ย่อมาจาก float)
\`\`\`python
pi = 3.14159265
print(f"ค่า Pi คือ {pi:.2f}") # Output: 3.14
\`\`\`

### 3. เติม 0 ข้างหน้า (Zero-Padding)
เหมาะสำหรับรหัสนักศึกษา หรือเวลา
\`\`\`python
student_id = 45
print(f"ID: {student_id:05d}") # Output: 00045 (เติม 0 ให้ครบ 5 หลัก, d ย่อมาจาก decimal/integer)
\`\`\`

### 4. การจัดหน้า (Text Alignment)
- \`<\` ชิดซ้าย
- \`>\` ชิดขวา
- \`^\` กึ่งกลาง
\`\`\`python
text = "Python"
print(f"|{text:<10}|") # |Python    | (ซ้าย)
print(f"|{text:>10}|") # |    Python| (ขวา)
print(f"|{text:^10}|") # |  Python  | (กลาง)
\`\`\`
ความสามารถเหล่านี้ทำให้คุณวาดตารางสวยๆ ในหน้าจอ Terminal ได้เลย!`,
        en: `## Advanced f-strings 💎

f-strings (introduced in Python 3.6) allow you to embed expressions directly inside strings using \`{}\`.

### 1. Expressions inside {}
\`\`\`python
print(f"2 + 2 is {2 + 2}")
\`\`\`

### 2. Float Precision (\`:.2f\`)
\`\`\`python
pi = 3.14159265
print(f"Pi: {pi:.2f}") # 3.14
\`\`\`

### 3. Zero Padding (\`:05d\`)
\`\`\`python
id = 45
print(f"ID: {id:05d}") # 00045
\`\`\`

### 4. Text Alignment
- \`<\` Left align
- \`>\` Right align
- \`^\` Center align
\`\`\`python
word = "Py"
print(f"|{word:^6}|") # |  Py  |
\`\`\``
      },
      commands: [
        {
          name: 'f-string',
          syntax: 'f"text {expression}"',
          description: { th: 'แทรกตัวแปรหรือนิพจน์ลงในข้อความโดยตรง (Python 3.6+)', en: 'Embed variables or expressions directly inside strings (Python 3.6+)' },
          example: 'name = "Alice"\\nprint(f"Hello {name}")\\nprint(f"Pi: {3.14159:.2f}")  # Pi: 3.14',
        },
      ]
    }
  ]
};
