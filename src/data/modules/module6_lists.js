// src/data/modules/module6_lists.js
export const module6 = {
  id: 6,
  icon: '📚',
  color: '#8b5cf6',
  colorDark: 'rgba(139,92,246,0.15)',
  requiredXP: 700,
  title: { th: 'โครงสร้างข้อมูลพื้นฐาน (Lists)', en: 'Lists & Data Structures' },
  description: {
    th: 'เจาะลึกกลไกของ List, Slicing, ความซับซ้อนเชิงเวลา (Time Complexity) และความแตกต่างระหว่าง Shallow vs Deep Copy',
    en: 'Deep dive into List mechanics, Slicing, Time Complexity, and Shallow vs Deep Copy',
  },
  lessons: [
    {
      id: '6-1',
      title: { th: 'กำเนิด List และ Index', en: 'Lists & Indexing' },
      xpReward: 40,
      content: {
        th: `## โครงสร้างข้อมูลแบบชุด (Lists) 📚

ในภาษา C/Java เราจะมีสิ่งที่เรียกว่า **Array (อาร์เรย์)** ซึ่งต้องระบุขนาดตายตัวตั้งแต่ตอนสร้างและต้องเก็บข้อมูลชนิดเดียวกันเท่านั้น 
แต่ **List ใน Python** เป็นโครงสร้างที่ยืดหยุ่นกว่ามาก (Dynamic Array) ขยายขนาดเองได้ และเก็บอะไรปนกันก็ได้!

\`\`\`python
# สร้าง List ว่างๆ
my_list = []

# List ที่เก็บของปนกัน
data = [10, "Somchai", 3.14, True]
\`\`\`

### การเข้าถึงข้อมูล (Indexing)
ข้อมูลแต่ละตัวใน List จะมี "หมายเลขตู้" ประจำตัว เรียกว่า **Index** โดยคอมพิวเตอร์จะ**เริ่มนับจาก 0 เสมอ**
- ตู้ที่ 1 คือ index \`0\`
- ตู้ที่ 2 คือ index \`1\`

\`\`\`python
fruits = ["Apple", "Banana", "Cherry"]
print(fruits[0])  # พิมพ์ "Apple"
\`\`\`

### Negative Indexing (จุดเด่นของ Python!)
Python ยอมให้คุณนับถอยหลังพุ่งไปตัวสุดท้ายได้เลยโดยใช้ดัชนีติดลบ
- \`-1\` คือ ตัวสุดท้าย
- \`-2\` คือ ตัวรองสุดท้าย
\`\`\`python
print(fruits[-1]) # พิมพ์ "Cherry"
\`\`\``,
        en: `## Lists & Indexing 📚

In C/Java, you have Arrays with fixed sizes and strict types. **Python Lists** are Dynamic Arrays—they can grow automatically and hold mixed data types!

### Indexing
Each item in a List is accessed by an **Index**. Computer Science always uses **Zero-based Indexing**.
- The 1st item is at index \`0\`.

### Negative Indexing (Python Feature)
You can access items from the end of the list using negative numbers.
- \`-1\` is the last item.
- \`-2\` is the second to last.

\`\`\`python
fruits = ["Apple", "Banana", "Cherry"]
print(fruits[0])   # "Apple"
print(fruits[-1])  # "Cherry"
\`\`\``
      },
      commands: [
        {
          name: 'List []',
          syntax: 'my_list = [item1, item2, ...]',
          description: { th: 'สร้าง List ใหม่โดยใส่ข้อมูลในวงเล็บเหลี่ยม', en: 'Create a new list using square brackets' },
          example: 'fruits = ["Apple", "Banana", "Cherry"]\\nempty = []',
        },
        {
          name: 'Indexing list[i]',
          syntax: 'list[index]',
          description: { th: 'เข้าถึงข้อมูลใน List ด้วย Index (เริ่มจาก 0, ค่าลบนับจากท้าย)', en: 'Access a list item by index (starts at 0, negative counts from end)' },
          example: 'fruits = ["A", "B", "C"]\\nprint(fruits[0])   # "A"\\nprint(fruits[-1])  # "C"',
        },
      ]
    },
    {
      id: '6-2',
      title: { th: 'ฟังก์ชันจัดการ List และ O(n)', en: 'List Methods & Big O' },
      xpReward: 50,
      content: {
        th: `## เพิ่ม-ลดข้อมูลใน List (พร้อมวิเคราะห์ความเร็ว ⏱️)

การเลือกใช้คำสั่งผิดใน Python อาจทำให้โปรแกรมคุณช้าลงมหาศาล! มาดูฟังก์ชันยอดฮิตพร้อม **Time Complexity (Big O)** กัน

### การเพิ่มข้อมูล
1. **\`append(x)\`**: ต่อท้าย List
   - **ความเร็ว:** \`O(1)\` (เร็วมาก ⚡) เพราะแค่เอาไปแปะท้ายสุด
2. **\`insert(index, x)\`**: แทรกข้อมูลที่ตำแหน่ง index ที่กำหนด
   - **ความเร็ว:** \`O(n)\` (ช้า 🐌) เพราะคอมพิวเตอร์ต้อง "เลื่อน" ข้อมูลตัวที่เหลือทั้งหมดไปทางขวา 1 ช่อง!
3. **\`extend(list2)\`**: เอา List อีกอันมาต่อท้าย
   - **ความเร็ว:** \`O(k)\` (k คือความยาวของ list2)

\`\`\`python
arr = [1, 2, 3]
arr.append(4)     # [1, 2, 3, 4] (O(1))
arr.insert(0, 99) # [99, 1, 2, 3, 4] (O(n) - เลื่อนของทั้งแผง!)
\`\`\`

### การลบข้อมูล
1. **\`pop()\`**: ลบตัวสุดท้ายออก แล้วดึงค่าออกมาด้วย
   - **ความเร็ว:** \`O(1)\` (เร็ว ⚡) 
2. **\`pop(0)\`**: ลบตัวแรกออก
   - **ความเร็ว:** \`O(n)\` (ช้า 🐌) เพราะต้องเลื่อนตัวที่เหลือกลับมาทางซ้าย
3. **\`remove(x)\`**: ลบข้อมูลที่มีค่าเท่ากับ x ตัวแรกที่เจอ
   - **ความเร็ว:** \`O(n)\` เพราะต้องสแกนหา (Search) ตั้งแต่ตัวแรก

> 🎓 **คำแนะนำระดับมหาลัย:** หลีกเลี่ยงการใช้ \`insert(0, x)\` หรือ \`pop(0)\` ใน List ที่มีขนาดใหญ่มากๆ (ล้านตัว) ถ้าจำเป็นต้องทำแบบนั้นจริงๆ ให้เปลี่ยนไปใช้ \`collections.deque\` แทน!`,
        en: `## List Methods & Time Complexity ⏱️

Choosing the wrong list method can cripple your program's performance! Let's look at the **Big O** complexity.

### Adding Items
1. **\`append(x)\`**: Adds to the end. **O(1)** (Fast ⚡)
2. **\`insert(i, x)\`**: Inserts at index \`i\`. **O(n)** (Slow 🐌) because Python must shift all subsequent elements to the right.
3. **\`extend(list2)\`**: Appends another list. **O(k)**.

### Removing Items
1. **\`pop()\`**: Removes and returns the last item. **O(1)** (Fast ⚡)
2. **\`pop(0)\`**: Removes the first item. **O(n)** (Slow 🐌) because it shifts everything to the left.
3. **\`remove(x)\`**: Removes the first occurrence of \`x\`. **O(n)** (Requires searching).

> 🎓 **Pro Tip:** Avoid \`insert(0, ...)\` or \`pop(0)\` on massive lists. If you need queue-like behavior, use \`collections.deque\`.`
      },
      commands: [
        {
          name: 'append()',
          syntax: 'list.append(item)',
          description: { th: 'เพิ่มข้อมูลต่อท้าย List — O(1)', en: 'Add an item to the end of the list — O(1)' },
          example: 'arr = [1, 2]\\narr.append(3)  # [1, 2, 3]',
        },
        {
          name: 'insert()',
          syntax: 'list.insert(index, item)',
          description: { th: 'แทรกข้อมูลที่ตำแหน่ง index ที่กำหนด — O(n)', en: 'Insert an item at the specified index — O(n)' },
          example: 'arr = [1, 3]\\narr.insert(1, 2)  # [1, 2, 3]',
        },
        {
          name: 'pop()',
          syntax: 'list.pop(index=-1)',
          description: { th: 'ลบและคืนค่าข้อมูลที่ตำแหน่ง index (ค่าปกติคือตัวสุดท้าย)', en: 'Remove and return the item at index (default: last item)' },
          example: 'arr = [1, 2, 3]\\nlast = arr.pop()  # last=3, arr=[1,2]',
        },
        {
          name: 'remove()',
          syntax: 'list.remove(value)',
          description: { th: 'ลบข้อมูลตัวแรกที่มีค่าตรงกับ value — O(n)', en: 'Remove the first occurrence of value — O(n)' },
          example: 'arr = [1, 2, 3, 2]\\narr.remove(2)  # [1, 3, 2]',
        },
        {
          name: 'extend()',
          syntax: 'list.extend(iterable)',
          description: { th: 'ต่อข้อมูลจาก iterable อื่นเข้าไปท้าย List', en: 'Append all items from an iterable to the end of the list' },
          example: 'a = [1, 2]\\na.extend([3, 4])  # [1, 2, 3, 4]',
        },
      ]
    },
    {
      id: '6-3',
      title: { th: 'การหั่น List (Slicing)', en: 'List Slicing' },
      xpReward: 40,
      content: {
        th: `## ศิลปะแห่งการ Slicing ✂️

Slicing คือความสามารถพิเศษของ Python ที่ทำให้คุณดึงข้อมูลหลายๆ ตัวออกมาเป็น List ย่อย (Sub-list) ได้อย่างทรงพลัง!

**โครงสร้าง Syntax:** \`list[start:stop:step]\`
- \`start\`: เริ่มดึงที่ index ไหน (รวมตัวนี้ด้วย)
- \`stop\`: ไปหยุดที่ index ไหน (ไม่รวมตัวนี้)
- \`step\`: ก้าวทีละกี่ช่อง

\`\`\`python
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

# ดึงตั้งแต่ index 1 ถึง 3 (b, c, d)
print(letters[1:4])  

# ไม่ใส่ start แปลว่าเริ่มจาก 0
print(letters[:3])  # ['a', 'b', 'c']

# ไม่ใส่ stop แปลว่าเอาถึงจบ
print(letters[4:])  # ['e', 'f', 'g']

# ก้าวทีละ 2
print(letters[0:6:2]) # ['a', 'c', 'e']
\`\`\`

### ทริคระดับเทพ: Reverse List แบบง่ายที่สุด!
ถ้าระบุ step เป็น \`-1\` (เดินถอยหลัง) 
\`\`\`python
# สลับ List จากหลังมาหน้าแบบชิลๆ!
print(letters[::-1]) 
# ['g', 'f', 'e', 'd', 'c', 'b', 'a']
\`\`\``,
        en: `## List Slicing ✂️

Slicing is a powerful Python feature to extract sub-lists.

**Syntax:** \`list[start:stop:step]\`
- \`start\`: Starting index (inclusive).
- \`stop\`: Stopping index (exclusive).
- \`step\`: Step size.

\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])  # [1, 2, 3]
print(nums[:3])   # [0, 1, 2]
print(nums[3:])   # [3, 4, 5]
print(nums[::2])  # [0, 2, 4]
\`\`\`

### The Ultimate Trick: Reversing a List
Use a step of \`-1\`:
\`\`\`python
print(nums[::-1]) # [5, 4, 3, 2, 1, 0]
\`\`\``
      },
      commands: [
        {
          name: 'Slicing',
          syntax: 'list[start:stop:step]',
          description: { th: 'ดึงข้อมูลบางส่วนออกมาเป็น List ย่อย (Sub-list)', en: 'Extract a sub-list using start, stop, and step indices' },
          example: 'nums = [0,1,2,3,4,5]\\nprint(nums[1:4])   # [1, 2, 3]\\nprint(nums[::-1])  # [5,4,3,2,1,0]',
        },
      ]
    },
    {
      id: '6-4',
      title: { th: 'List Comprehensions', en: 'List Comprehensions' },
      xpReward: 50,
      content: {
        th: `## เขียน List ให้สั้นและเร็วด้วย List Comprehensions ⚡

ปกติถ้าเราอยากเอาตัวเลข 1-5 มายกกำลังสอง แล้วใส่ List ใหม่ เราจะเขียนแบบนี้:
\`\`\`python
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
# squares = [1, 4, 9, 16, 25]
\`\`\`

แต่ในแบบฉบับโปรแกรมเมอร์ Python ที่แท้จริง (Pythonic Way) เราจะใช้ **List Comprehension** ยุบโค้ดเหลือ 1 บรรทัด!

**Syntax:** \`[expression for item in iterable if condition]\`

\`\`\`python
squares = [i ** 2 for i in range(1, 6)]
\`\`\`

### ใส่ If ไว้ข้างในได้ด้วย!
ดึงเฉพาะเลขคู่มายกกำลังสอง:
\`\`\`python
even_squares = [i ** 2 for i in range(1, 6) if i % 2 == 0]
# [4, 16] (เพราะ 2^2=4, 4^2=16)
\`\`\`

> 🏆 **ข้อดี:** List Comprehension ไม่ได้มีดีแค่โค้ดสั้นลง แต่เบื้องหลัง (C level) มันรัน **เร็วกว่า** การใช้ \`for\` แล้ว \`append\` มาก!`,
        en: `## List Comprehensions ⚡

A Pythonic way to construct lists elegantly and efficiently in a single line.

Instead of this:
\`\`\`python
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
\`\`\`

Do this!
**Syntax:** \`[expression for item in iterable if condition]\`

\`\`\`python
squares = [i ** 2 for i in range(1, 6)]
\`\`\`

### Filtering with If
\`\`\`python
even_squares = [i ** 2 for i in range(1, 6) if i % 2 == 0]
\`\`\`

> 🏆 **Advantage:** Not only is it shorter to read, but it also executes significantly **faster** at the C-level compared to manual \`append()\` calls in a loop.`
      },
      commands: [
        {
          name: 'List Comprehension',
          syntax: '[expression for item in iterable if condition]',
          description: { th: 'สร้าง List ใหม่แบบกระชับ 1 บรรทัด พร้อมเงื่อนไขกรองได้', en: 'Create a new list concisely in one line with optional filtering' },
          example: 'squares = [x**2 for x in range(5)]\\n# [0, 1, 4, 9, 16]\\nevens = [x for x in range(10) if x%2==0]',
        },
      ]
    },
    {
      id: '6-5',
      title: { th: 'ปัญหาระดับชาติ: Shallow vs Deep Copy', en: 'Shallow vs Deep Copy' },
      xpReward: 60,
      content: {
        th: `## อาถรรพ์ตัวแปร List (Shallow vs Deep Copy) 👻

จำบทที่ 2 เรื่อง Mutable vs Immutable ได้ไหม? \nList เป็นชนิดข้อมูลแบบ **Mutable (เปลี่ยนแปลงได้)** และนี่คือจุดกำเนิดของ "ปวดหัว" ระดับชาติ!

ลองดูโค้ดนี้:
\`\`\`python
a = [1, 2, 3]
b = a          # เราพยายาม copy a ไปใส่ b
b.append(99)   # เติม 99 เข้าไปใน b

print(b) # ได้ [1, 2, 3, 99]
print(a) # อ้าวเฮ้ย! a ก็กลายเป็น [1, 2, 3, 99] ด้วย!! 😱
\`\`\`
**เกิดอะไรขึ้น?** การสั่ง \`b = a\` ไม่ใช่การถ่ายเอกสาร List แต่เป็นการ **"ก๊อปปี้ป้ายชื่อไปแปะที่ List ก้อนเดียวกันใน RAM (Reference)"**! ถ้าใครคนนึงแก้ข้อมูลในนั้น อีกคนก็จะเห็นการเปลี่ยนแปลงด้วย!

### วิธีแก้ 1: ถ่ายเอกสารชั้นเดียว (Shallow Copy)
ใช้การ \`copy()\` หรือ Slicing \`[:]\`
\`\`\`python
a = [1, 2, 3]
b = a.copy()   # หรือ b = a[:]
b.append(99)
print(a) # [1, 2, 3] (a ปลอดภัยแล้ว!)
\`\`\`

### ระวัง! 2D List (List ซ้อน List)
ถ้าคุณมี List ซ้อน List (เช่น เมทริกซ์) การ \`copy()\` ธรรมดาจะช่วยแค่ List ชั้นนอกสุดเท่านั้น (ชั้นในจะยังชี้ไปที่เดียวกันอยู่)
คุณต้องใช้ **Deep Copy** จากโมดูล \`copy\`
\`\`\`python
import copy
matrix_a = [[1, 2], [3, 4]]
matrix_b = copy.deepcopy(matrix_a) # ก๊อปปี้ทุกอณู ทุกชั้น! ปลอดภัย 100%
\`\`\``,
        en: `## The Matrix Bug: Shallow vs Deep Copy 👻

Remember that Lists are **Mutable**. Assigning a list to another variable does NOT copy the list; it copies the **Memory Reference**.

\`\`\`python
a = [1, 2, 3]
b = a
b.append(99)
print(a) # [1, 2, 3, 99] ! Both point to the exact same list!
\`\`\`

### Solution 1: Shallow Copy
Use \`.copy()\` or Slicing \`[:]\`
\`\`\`python
b = a.copy() # Creates a new list object in RAM
\`\`\`

### Beware of 2D (Nested) Lists!
If you have lists inside lists, \`copy()\` only copies the outer layer. The inner lists are still shared!
You must use **Deep Copy**:
\`\`\`python
import copy
matrix_b = copy.deepcopy(matrix_a) # Recursively clones everything!
\`\`\``
      },
      commands: [
        {
          name: '.copy()',
          syntax: 'list.copy()',
          description: { th: 'สร้างสำเนา List ชั้นเดียว (Shallow Copy)', en: 'Create a shallow copy of the list (top level only)' },
          example: 'a = [1, 2, 3]\\nb = a.copy()\\nb.append(4)\\nprint(a)  # [1, 2, 3]',
        },
        {
          name: 'copy.deepcopy()',
          syntax: 'import copy\\ncopy.deepcopy(object)',
          description: { th: 'สร้างสำเนาทุกชั้น (Deep Copy) สำหรับ List ซ้อน List', en: 'Recursively copy all nested objects (Deep Copy)' },
          example: 'import copy\\na = [[1,2],[3,4]]\\nb = copy.deepcopy(a)\\nb[0].append(99)\\nprint(a)  # [[1,2],[3,4]]',
        },
      ]
    },
    {
      id: '6-6',
      title: { th: 'การเรียงลำดับ (Sorting)', en: 'Sorting Lists' },
      xpReward: 40,
      content: {
        th: `## การเรียงลำดับข้อมูลใน List (Sorting) 🔢

การเรียงลำดับเป็นหนึ่งในปฏิบัติการที่ใช้บ่อยที่สุดในการเขียนโปรแกรม Python มีเครื่องมือ 2 ตัวให้เลือกใช้:

### 1. \`.sort()\` (เรียงแบบ In-place)
เมธอดของ List ที่ **เรียงลำดับข้อมูลในตัว** (แก้ List เดิมโดยตรง ไม่สร้าง List ใหม่) คืนค่า \`None\`
\`\`\`python
nums = [3, 1, 4, 1, 5, 9]
nums.sort()         # เรียงจากน้อยไปมาก
print(nums)         # [1, 1, 3, 4, 5, 9]

nums.sort(reverse=True)  # เรียงจากมากไปน้อย
print(nums)              # [9, 5, 4, 3, 1, 1]
\`\`\`

### 2. \`sorted()\` (เรียงแบบสร้าง List ใหม่)
ฟังก์ชัน Built-in ที่ **คืน List ใหม่ที่เรียงแล้ว** โดยไม่แก้ไขข้อมูลเดิม
\`\`\`python
original = [3, 1, 4, 1, 5]
result = sorted(original)
print(result)    # [1, 1, 3, 4, 5]
print(original)  # [3, 1, 4, 1, 5] (ไม่โดนแก้!)
\`\`\`

### การเรียงด้วย Key Function
ทั้ง \`.sort()\` และ \`sorted()\` รับพารามิเตอร์ \`key\` ที่ช่วยกำหนดเกณฑ์การเรียงลำดับ
\`\`\`python
words = ["banana", "apple", "cherry"]
words.sort(key=len)   # เรียงตามความยาว
print(words)          # ['apple', 'banana', 'cherry']

students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
result = sorted(students, key=lambda s: s[1], reverse=True)
# เรียงตามคะแนนจากมากไปน้อย
\`\`\`

> 🎓 **เมื่อไหร่ใช้อะไร?** ใช้ \`.sort()\` เมื่อไม่จำเป็นต้องเก็บข้อมูลเดิม (ประหยัด RAM) ใช้ \`sorted()\` เมื่อต้องการรักษาข้อมูลต้นฉบับไว้ หรือเมื่อต้องการเรียงลำดับ iterable อื่นๆ ที่ไม่ใช่ List`,
        en: `## Sorting Lists 🔢

Sorting is one of the most common operations in programming. Python provides two powerful tools:

### 1. \`.sort()\` (In-place Sorting)
A List method that **sorts the list in place** (modifies the original list directly). Returns \`None\`.
\`\`\`python
nums = [3, 1, 4, 1, 5, 9]
nums.sort()         # Ascending order
print(nums)         # [1, 1, 3, 4, 5, 9]

nums.sort(reverse=True)  # Descending order
print(nums)              # [9, 5, 4, 3, 1, 1]
\`\`\`

### 2. \`sorted()\` (Returns a New List)
A built-in function that **returns a new sorted list** without modifying the original.
\`\`\`python
original = [3, 1, 4, 1, 5]
result = sorted(original)
print(result)    # [1, 1, 3, 4, 5]
print(original)  # [3, 1, 4, 1, 5] (Unchanged!)
\`\`\`

### Custom Sorting with Key
Both \`.sort()\` and \`sorted()\` accept a \`key\` parameter for custom sorting criteria.
\`\`\`python
words = ["banana", "apple", "cherry"]
words.sort(key=len)  # Sort by length

students = [("Alice", 85), ("Bob", 92)]
sorted(students, key=lambda s: s[1], reverse=True)
# Sort by score descending
\`\`\`

> 🎓 **When to use which?** Use \`.sort()\` when you don't need the original order (saves memory). Use \`sorted()\` when you need to preserve the original data or sort non-list iterables.`
      },
      commands: [
        {
          name: '.sort()',
          syntax: 'list.sort(key=None, reverse=False)',
          description: { th: 'เรียงลำดับ List แบบ In-place (แก้ List เดิมโดยตรง คืนค่า None)', en: 'Sort the list in place (modifies the original, returns None)' },
          example: 'nums = [3,1,2]\\nnums.sort()\\nprint(nums)  # [1, 2, 3]',
        },
        {
          name: 'sorted()',
          syntax: 'sorted(iterable, key=None, reverse=False)',
          description: { th: 'คืน List ใหม่ที่เรียงแล้ว โดยไม่แก้ข้อมูลเดิม', en: 'Return a new sorted list without modifying the original' },
          example: 'nums = [3,1,2]\\nresult = sorted(nums)\\nprint(result)  # [1,2,3]\\nprint(nums)    # [3,1,2]',
        },
      ],
    }
  ]
};
