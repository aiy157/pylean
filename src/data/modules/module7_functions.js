// src/data/modules/module7_functions.js
export const module7 = {
  id: 7,
  icon: '⚙️',
  color: '#f43f5e',
  colorDark: 'rgba(244,63,94,0.15)',
  requiredXP: 900,
  title: { th: 'ฟังก์ชันและการเขียนโปรแกรมเชิงโมดูล (Functions & Modular Programming)', en: 'Functions & Modular Programming' },
  description: {
    th: 'เจาะลึกการสร้างฟังก์ชัน, *args/**kwargs, Recursion, Closure, Decorator และการ import Module',
    en: 'Deep dive into functions, *args/**kwargs, Recursion, Closures, Decorators, and Module imports',
  },
  lessons: [
    {
      id: '7-1',
      title: { th: 'def — สร้างฟังก์ชัน (ฉบับเจาะลึก)', en: 'def — Functions In-Depth' },
      xpReward: 40,
      content: {
        th: `## สร้างฟังก์ชัน (def) ฉบับเจาะลึก 🛠️

ฟังก์ชันคือหัวใจของการเขียนโปรแกรมเชิงโมดูล (Modular Programming) หลักการสำคัญคือ **DRY — Don't Repeat Yourself** (อย่าเขียนโค้ดซ้ำ!)

### โครงสร้างของฟังก์ชัน (Anatomy)
\`\`\`python
def function_name(parameter1, parameter2):
    """Docstring: อธิบายว่าฟังก์ชันนี้ทำอะไร"""
    # Function body (ตัวฟังก์ชัน)
    result = parameter1 + parameter2
    return result  # ส่งค่ากลับ (ถ้ามี)
\`\`\`

### แต่ละส่วนมีหน้าที่อะไร?
1. **\`def\`** : คำสั่งบอก Python ว่า "ฉันจะสร้างฟังก์ชันใหม่นะ!" (ย่อมาจาก define)
2. **ชื่อฟังก์ชัน** : ตั้งชื่อตามกฎเดียวกับตัวแปร (snake_case) เช่น \`calculate_tax\`
3. **Parameters (พารามิเตอร์)** : ตัวแปรที่รับค่าเข้ามาในฟังก์ชัน (อยู่ในวงเล็บ)
4. **\`:\` (Colon)** : บังคับต้องมี! ถ้าลืมจะได้ SyntaxError
5. **Docstring** : ข้อความอธิบายฟังก์ชัน อยู่ในเครื่องหมาย \`"""\` 3 อัน (Best practice ที่โปรแกรมเมอร์มืออาชีพทำเสมอ)
6. **\`return\`** : ส่งค่ากลับให้คนเรียกใช้ — ถ้าไม่มี return ฟังก์ชันจะคืนค่า \`None\` โดยอัตโนมัติ

### Parameter vs Argument (ศัพท์ที่คนชอบสับสน)
- **Parameter:** ตัวแปรที่อยู่ใน \`def\` (ตอนสร้าง) เช่น \`def greet(name):\` ← \`name\` คือ Parameter
- **Argument:** ค่าจริงๆ ที่ส่งเข้าไป (ตอนเรียกใช้) เช่น \`greet("Alice")\` ← \`"Alice"\` คือ Argument

### Default Parameters (ค่าเริ่มต้น)
เราตั้งค่าสำรองให้ Parameter ได้! ถ้าคนเรียกไม่ส่งค่ามา มันจะใช้ค่าเริ่มต้นแทน
\`\`\`python
def greet(name, greeting="สวัสดี"):
    print(f"{greeting} คุณ {name}!")

greet("อลิซ")               # สวัสดี คุณ อลิซ!
greet("บ็อบ", "หวัดดี")      # หวัดดี คุณ บ็อบ!
\`\`\`

> ⚠️ **กฎเหล็ก:** Parameter ที่มี Default ต้องอยู่หลัง Parameter ที่ไม่มี Default เสมอ! (เช่น \`def f(a, b=10)\` ✅ แต่ \`def f(a=10, b)\` ❌)`,
        en: `## Functions In-Depth (def) 🛠️

Functions are the heart of Modular Programming. The core principle is **DRY — Don't Repeat Yourself!**

### Anatomy of a Function
\`\`\`python
def function_name(parameter1, parameter2):
    """Docstring: explains what this function does"""
    result = parameter1 + parameter2
    return result
\`\`\`

### Key Components
1. **\`def\`**: Tells Python you're defining a new function.
2. **Function Name**: Follows variable naming rules (use snake_case).
3. **Parameters**: Variables that accept input values (in parentheses).
4. **\`:\` (Colon)**: Mandatory! Forgetting it causes a SyntaxError.
5. **Docstring**: Documentation string inside triple quotes (\`"""\`). A professional best practice.
6. **\`return\`**: Sends a value back to the caller. Without it, the function returns \`None\` implicitly.

### Parameter vs Argument
- **Parameter:** The variable in the \`def\` statement (e.g., \`name\` in \`def greet(name):\`).
- **Argument:** The actual value passed when calling (e.g., \`"Alice"\` in \`greet("Alice")\`).

### Default Parameters
You can assign default values to parameters:
\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hey")         # Hey, Bob!
\`\`\`

> ⚠️ **Rule:** Parameters with defaults must come AFTER parameters without defaults!`
      },
      commands: [
        {
          name: 'def',
          syntax: 'def function_name(params):\\n    """docstring"""\\n    code\\n    return value',
          description: { th: 'สร้างฟังก์ชันใหม่', en: 'Define a new function' },
          example: 'def square(n):\\n    return n * n\\n\\nprint(square(4))  # 16',
        },
        {
          name: 'return',
          syntax: 'return value',
          description: { th: 'ส่งค่ากลับจากฟังก์ชัน (ถ้าไม่มี return จะคืน None)', en: 'Return a value from a function (returns None if omitted)' },
          example: 'def double(x):\\n    return x * 2\\n\\ny = double(5)  # y = 10',
        },
      ],
    },
    {
      id: '7-2',
      title: { th: '*args และ **kwargs (รับค่าไม่จำกัด)', en: '*args & **kwargs' },
      xpReward: 50,
      content: {
        th: `## *args และ **kwargs (พลังลับของฟังก์ชัน) 🌟

บางครั้งเราไม่รู้ว่าคนเรียกจะส่ง Argument มากี่ตัว เช่น ฟังก์ชันบวกเลข ซึ่งอาจจะบวก 2 ตัว 5 ตัว หรือ 100 ตัวก็ได้!

### 1. \`*args\` (Positional Arguments แบบไม่จำกัด)
เครื่องหมาย \`*\` จะ "กวาดรวม" Argument ที่เหลือทั้งหมดมาเก็บใน **Tuple** (คล้าย List แต่แก้ไม่ได้)
\`\`\`python
def add_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(add_all(1, 2, 3))       # 6
print(add_all(10, 20, 30, 40)) # 100
\`\`\`

### 2. \`**kwargs\` (Keyword Arguments แบบไม่จำกัด)
เครื่องหมาย \`**\` จะกวาดรวม Argument ที่ส่งมาในรูปแบบ \`key=value\` ทั้งหมดมาเก็บใน **Dictionary**
\`\`\`python
def student_info(**data):
    for key, value in data.items():
        print(f"{key}: {value}")

student_info(name="Somchai", age=20, gpa=3.5)
# name: Somchai
# age: 20
# gpa: 3.5
\`\`\`

### ลำดับการวางที่ถูกต้อง (จำไว้ให้ขึ้นใจ!)
\`\`\`python
def f(normal, *args, **kwargs):
    pass
\`\`\`
1. Normal parameters ก่อน
2. *args ตามมา
3. **kwargs อยู่ท้ายสุดเสมอ

> 💡 **ชื่อ \`args\` และ \`kwargs\` เป็นแค่ Convention** คุณจะตั้งชื่ออะไรก็ได้ (เช่น \`*numbers\`, \`**options\`) แต่ตัว \`*\` และ \`**\` ต่างหากที่สำคัญ!`,
        en: `## *args and **kwargs 🌟

Sometimes you don't know how many arguments the caller will pass. Python provides two powerful tools for this.

### 1. \`*args\` (Unlimited Positional Arguments)
The \`*\` operator collects all remaining positional arguments into a **Tuple**.
\`\`\`python
def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3))       # 6
print(add_all(10, 20, 30, 40)) # 100
\`\`\`

### 2. \`**kwargs\` (Unlimited Keyword Arguments)
The \`**\` operator collects all keyword arguments into a **Dictionary**.
\`\`\`python
def student_info(**data):
    for key, value in data.items():
        print(f"{key}: {value}")

student_info(name="Alice", age=20, gpa=3.5)
\`\`\`

### Correct Order
\`\`\`python
def f(normal, *args, **kwargs):
    pass
\`\`\`
1. Normal parameters first.
2. \`*args\` next.
3. \`**kwargs\` always last.

> 💡 The names \`args\` and \`kwargs\` are just conventions. The \`*\` and \`**\` operators are what matter!`
      },
      commands: [
        {
          name: '*args',
          syntax: 'def func(*args):',
          description: { th: 'รับ Argument แบบ Positional ได้ไม่จำกัด (เก็บเป็น Tuple)', en: 'Accept unlimited positional arguments as a Tuple' },
          example: 'def total(*nums):\\n    return sum(nums)\\n\\nprint(total(1,2,3)) # 6',
        },
        {
          name: '**kwargs',
          syntax: 'def func(**kwargs):',
          description: { th: 'รับ Argument แบบ Keyword ได้ไม่จำกัด (เก็บเป็น Dict)', en: 'Accept unlimited keyword arguments as a Dictionary' },
          example: 'def info(**d):\\n    print(d)\\n\\ninfo(a=1, b=2) # {"a":1,"b":2}',
        },
      ],
    },
    {
      id: '7-3',
      title: { th: 'ขอบเขตตัวแปร (Scope) และ LEGB Rule', en: 'Variable Scope & LEGB Rule' },
      xpReward: 50,
      content: {
        th: `## ขอบเขตตัวแปร (Scope) และ LEGB Rule 🚧

ใน Python ไม่ใช่ว่าทุกส่วนของโปรแกรมจะมองเห็นตัวแปรทุกตัวเสมอไป มันมีกฎอาณาเขตเรียกว่า **Scope**

### Local vs Global
- **Local Variable:** ตัวแปรที่สร้างภายในฟังก์ชัน ใช้ได้แค่ในฟังก์ชันนั้น
- **Global Variable:** ตัวแปรที่สร้างนอกฟังก์ชัน ใช้ได้ทุกที่

\`\`\`python
x = 100  # Global variable

def my_func():
    x = 5  # Local variable (คนละตัวกับ x ข้างนอก!)
    print(f"ใน func: x = {x}")  # 5

my_func()
print(f"นอก func: x = {x}")   # 100 (ไม่โดนแก้!)
\`\`\`

### LEGB Rule (ลำดับการค้นหาตัวแปร)
เวลา Python เจอชื่อตัวแปร มันจะค้นหาตามลำดับนี้:
1. **L**ocal — ค้นในฟังก์ชันปัจจุบันก่อน
2. **E**nclosing — ค้นในฟังก์ชันที่ครอบอยู่ (กรณี Nested functions)
3. **G**lobal — ค้นในระดับ Module (ไฟล์)
4. **B**uilt-in — ค้นในชื่อที่ Python สร้างมาให้ (เช่น \`print\`, \`len\`)

### คำสั่ง \`global\` (แก้ตัวแปรนอกจากข้างใน)
ถ้าอยากให้ฟังก์ชันแก้ไขตัวแปร Global จริงๆ ต้องประกาศก่อน
\`\`\`python
count = 0

def increment():
    global count  # บอก Python ว่า "ฉันจะแก้ตัว count ข้างนอกนะ!"
    count += 1

increment()
increment()
print(count)  # 2
\`\`\`

> ⚠️ **คำเตือน:** หลีกเลี่ยงการใช้ \`global\` เว้นแต่จำเป็นจริงๆ เพราะมันทำให้โค้ดอ่านยากและเกิดบั๊กง่าย (Side effects) มืออาชีพมักจะ \`return\` ค่าออกมาแทน!`,
        en: `## Variable Scope & LEGB Rule 🚧

Not every part of your program can see every variable. Python has rules called **Scope** that govern visibility.

### Local vs Global
- **Local Variable:** Created inside a function, visible only within that function.
- **Global Variable:** Created outside all functions, visible everywhere.

### LEGB Rule (Search Order)
When Python encounters a variable name, it searches in this order:
1. **L**ocal — Current function first.
2. **E**nclosing — Outer enclosing functions (for nested functions).
3. **G**lobal — Module-level scope.
4. **B**uilt-in — Python's built-in names (\`print\`, \`len\`, etc.).

### The \`global\` Keyword
To modify a global variable from inside a function, you must declare it with \`global\`:
\`\`\`python
count = 0
def increment():
    global count
    count += 1
\`\`\`

> ⚠️ **Warning:** Avoid \`global\` unless absolutely necessary. It creates side effects that make code harder to debug. Prefer returning values instead!`
      },
      commands: [
        {
          name: 'global',
          syntax: 'global variable_name',
          description: { th: 'ประกาศใช้ตัวแปร Global ภายในฟังก์ชัน', en: 'Declare a global variable for modification inside a function' },
          example: 'count = 0\\ndef inc():\\n    global count\\n    count += 1',
        },
      ],
    },
    {
      id: '7-4',
      title: { th: 'Recursion (ฟังก์ชันเรียกตัวเอง)', en: 'Recursion' },
      xpReward: 60,
      content: {
        th: `## Recursion (ฟังก์ชันเรียกตัวเอง) 🪆

**Recursion** คือเทคนิคที่ฟังก์ชันเรียกใช้ตัวเองซ้ำๆ เพื่อแก้ปัญหาที่มีโครงสร้างซ้ำ (Repetitive structure) โดยแบ่งปัญหาใหญ่ออกเป็นปัญหาย่อยที่เหมือนกันแต่เล็กลงเรื่อยๆ

### องค์ประกอบสำคัญ 2 อย่าง
1. **Base Case (กรณีฐาน):** เงื่อนไขที่ทำให้หยุดเรียกตัวเอง (ถ้าไม่มี จะเกิด Infinite Recursion → RecursionError!)
2. **Recursive Case (กรณีเรียกซ้ำ):** ฟังก์ชันเรียกตัวเองด้วยข้อมูลที่เล็กลง

### ตัวอย่าง: Factorial (n!)
\`\`\`python
def factorial(n):
    # Base Case: 0! = 1
    if n == 0:
        return 1
    # Recursive Case: n! = n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # 5 × 4 × 3 × 2 × 1 = 120
\`\`\`

### วิธีคิดแบบ Recursion (Call Stack)
เวลาเรียก \`factorial(4)\` คอมพิวเตอร์จะสร้าง "กองซ้อน (Stack)" ของการเรียกฟังก์ชัน:
\`\`\`
factorial(4)  →  4 × factorial(3)
                     →  3 × factorial(2)
                          →  2 × factorial(1)
                               →  1 × factorial(0)
                                    →  return 1  ← Base case!
                               →  return 1 × 1 = 1
                          →  return 2 × 1 = 2
                     →  return 3 × 2 = 6
                →  return 4 × 6 = 24
\`\`\`

### Python มีขีดจำกัด Recursion!
Python กำหนดไว้ที่ **ประมาณ 1,000 ชั้น** ถ้าเรียกซ้ำเกินจะเกิด \`RecursionError\`

> 🎓 **เมื่อไหร่ควรใช้ Recursion แทน Loop?**
> - ปัญหาที่มีโครงสร้างเป็น Tree เช่น การค้นหาไฟล์ในโฟลเดอร์ซ้อนโฟลเดอร์
> - ปัญหาแบ่งแยก (Divide and Conquer) เช่น Merge Sort, Quick Sort
> - ปัญหาคณิตศาสตร์เชิงนิยาม เช่น Fibonacci, Factorial`,
        en: `## Recursion (Self-calling Functions) 🪆

**Recursion** is a technique where a function calls itself to solve problems with repetitive structures, breaking large problems into smaller identical sub-problems.

### Two Essential Components
1. **Base Case:** The condition that stops the recursion. Without it → \`RecursionError\`!
2. **Recursive Case:** The function calls itself with smaller input.

### Example: Factorial (n!)
\`\`\`python
def factorial(n):
    if n == 0:        # Base Case
        return 1
    return n * factorial(n - 1)  # Recursive Case

print(factorial(5))  # 120
\`\`\`

### Call Stack Visualization
\`\`\`
factorial(4) → 4 × factorial(3) → 3 × factorial(2) → ... → return 1 (base)
\`\`\`
Each call is pushed onto a **stack** in memory, then results are computed as each call returns.

### Python's Recursion Limit
Python defaults to approximately **1,000 recursive calls**. Exceeding this throws a \`RecursionError\`.

> 🎓 **When to use Recursion over Loops?**
> - Tree-structured problems (file system traversal).
> - Divide and Conquer algorithms (Merge Sort, Quick Sort).
> - Mathematically defined recurrences (Fibonacci, Factorial).`
      },
      commands: [],
    },
    {
      id: '7-5',
      title: { th: 'Lambda, Closure และ Decorator', en: 'Lambda, Closure & Decorator' },
      xpReward: 70,
      content: {
        th: `## Lambda, Closure และ Decorator (ระดับมหาลัย) 🎓

### 1. Lambda (ฟังก์ชัน 1 บรรทัด)
ถ้าฟังก์ชันสั้นมากๆ (แค่ return ค่าเดียว) เราสร้างแบบย่อได้เลย!
\`\`\`python
# แบบปกติ
def double(x):
    return x * 2

# แบบ Lambda (เขียนบรรทัดเดียวจบ!)
double = lambda x: x * 2

print(double(5))  # 10
\`\`\`

Lambda มักจะใช้คู่กับ Higher-order Functions เช่น \`sorted()\`, \`map()\`, \`filter()\`:
\`\`\`python
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
# เรียงตามคะแนน (ตัวที่ 2 ของ tuple)
sorted_students = sorted(students, key=lambda s: s[1])
\`\`\`

### 2. Closure (ฟังก์ชันที่จำค่าจากภายนอก)
เมื่อฟังก์ชันข้างในจดจำตัวแปรของฟังก์ชันข้างนอกได้ แม้ฟังก์ชันข้างนอกจะทำงานเสร็จไปแล้ว!
\`\`\`python
def multiplier(factor):
    def multiply(number):
        return number * factor  # จำค่า factor ไว้!
    return multiply

double = multiplier(2)
triple = multiplier(3)

print(double(10))  # 20
print(triple(10))  # 30
\`\`\`

### 3. Decorator (ห่อฟังก์ชันด้วยฟังก์ชัน)
Decorator คือฟังก์ชันที่รับฟังก์ชันอื่นเข้าไป แล้ว **"เพิ่มความสามารถ"** ให้โดยไม่ต้องแก้โค้ดเดิม!
\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} ใช้เวลา {end - start:.4f} วินาที")
        return result
    return wrapper

@timer  # เครื่องหมาย @ คือการ "ห่อ" ฟังก์ชัน slow_add ด้วย timer
def slow_add(a, b):
    import time
    time.sleep(1)
    return a + b
\`\`\`

> 🏆 **สรุป:** Lambda = ฟังก์ชันย่อ | Closure = ฟังก์ชันที่จำบริบท | Decorator = ฟังก์ชันที่ห่อหุ้มฟังก์ชันอื่น`,
        en: `## Lambda, Closure & Decorator 🎓

### 1. Lambda (One-line Functions)
For very short functions that just return a single expression:
\`\`\`python
double = lambda x: x * 2
print(double(5))  # 10
\`\`\`
Commonly used with \`sorted()\`, \`map()\`, \`filter()\`:
\`\`\`python
students = [("Alice", 85), ("Bob", 92)]
sorted(students, key=lambda s: s[1])
\`\`\`

### 2. Closure (Functions that Remember)
When an inner function remembers variables from its enclosing function, even after the outer function has finished:
\`\`\`python
def multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

double = multiplier(2)
print(double(10))  # 20
\`\`\`

### 3. Decorator (Wrapping Functions)
A decorator adds functionality to existing functions without modifying their code:
\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_add(a, b):
    return a + b
\`\`\`

> 🏆 **Summary:** Lambda = Short functions | Closure = Context-remembering functions | Decorator = Function wrappers`
      },
      commands: [
        {
          name: 'lambda',
          syntax: 'lambda params: expression',
          description: { th: 'สร้างฟังก์ชันนิรนาม (Anonymous) แบบสั้นๆ 1 บรรทัด', en: 'Create a short anonymous one-line function' },
          example: 'double = lambda x: x * 2\\nprint(double(5))  # 10',
        },
      ],
    },
    {
      id: '7-6',
      title: { th: 'Module และ import (ระบบนำเข้าโค้ด)', en: 'Modules & import' },
      xpReward: 40,
      content: {
        th: `## Module และ import 🤝

ใน Python มีไลบรารี (Library) ให้ยืมใช้มากมาย ทั้งแบบที่ Python มีให้ฟรี (Built-in) และแบบที่คนอื่นเขียนไว้ (Third-party)

### รูปแบบการ import
\`\`\`python
# วิธีที่ 1: import ทั้ง Module
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...

# วิธีที่ 2: import เฉพาะสิ่งที่ต้องการ (ไม่ต้องพิมพ์ชื่อ Module นำหน้า)
from math import sqrt, pi
print(sqrt(16))  # 4.0
print(pi)        # 3.14159...

# วิธีที่ 3: ตั้งชื่อเล่น (Alias) เพราะชื่อยาวเกินไป
import random as rd
print(rd.randint(1, 10))
\`\`\`

### Module ยอดฮิตที่ต้องรู้
| Module | หน้าที่ | คำสั่งตัวอย่าง |
|--------|--------|--------------|
| \`math\` | คณิตศาสตร์ | \`sqrt()\`, \`pi\`, \`ceil()\`, \`floor()\` |
| \`random\` | สุ่มค่า | \`randint()\`, \`choice()\`, \`shuffle()\` |
| \`datetime\` | วันที่/เวลา | \`datetime.now()\`, \`timedelta()\` |
| \`os\` | จัดการไฟล์/ระบบ | \`os.path.exists()\`, \`os.listdir()\` |
| \`json\` | อ่าน/เขียนข้อมูล JSON | \`json.loads()\`, \`json.dumps()\` |

> 💡 **เทคนิค:** ห้ามใช้ \`from module import *\` ในโปรเจกต์จริงๆ เพราะมันจะดึงชื่อทุกอย่างเข้ามาจน Namespace ชนกัน (Pollution) ทำให้เกิดบั๊กได้!`,
        en: `## Modules & import 🤝

Python has thousands of libraries available: Built-in ones (like \`math\`, \`random\`) and third-party ones (installable via \`pip\`).

### Import Styles
\`\`\`python
# 1. Import the whole module
import math
print(math.sqrt(16))

# 2. Import specific items
from math import sqrt, pi
print(sqrt(16))

# 3. Import with alias
import random as rd
print(rd.randint(1, 10))
\`\`\`

### Must-Know Built-in Modules
| Module | Purpose | Example |
|--------|---------|---------|
| \`math\` | Mathematics | \`sqrt()\`, \`pi\`, \`ceil()\` |
| \`random\` | Randomization | \`randint()\`, \`choice()\` |
| \`datetime\` | Date/Time | \`datetime.now()\` |
| \`os\` | File/System operations | \`os.path.exists()\` |
| \`json\` | JSON data handling | \`json.loads()\`, \`json.dumps()\` |

> 💡 **Tip:** Never use \`from module import *\` in production code — it pollutes your namespace and causes hard-to-track bugs!`
      },
      commands: [
        {
          name: 'import',
          syntax: 'import module_name\\nfrom module import name',
          description: { th: 'นำเข้า Module หรือฟังก์ชันจาก Module อื่น', en: 'Import a module or specific items from it' },
          example: 'import math\\nprint(math.pi)\\n\\nfrom math import sqrt\\nprint(sqrt(16))  # 4.0',
        },
      ],
    },
    {
      id: '7-7',
      title: { th: 'Pass by Object Reference (ตัวแปรเปลี่ยนค่าไหม?)', en: 'Pass by Object Reference' },
      xpReward: 60,
      content: {
        th: `## Pass by Object Reference 🚨

เรื่องที่โปรแกรมเมอร์มือใหม่มักจะตกม้าตายมากที่สุด คือการส่งตัวแปรเข้าไปในฟังก์ชัน แล้วค่ามันเปลี่ยนไปโดยไม่รู้ตัว!

ในภาษา C/C++ เราอาจจะเคยได้ยิน Pass by Value (ก๊อปปี้ค่าไป) หรือ Pass by Reference (ส่งตำแหน่งหน่วยความจำไป)
แต่ใน Python เราใช้ระบบที่เรียกว่า **Pass by Object Reference** (ส่งป้ายชื่อที่ชี้ไปยัง Object เดียวกัน)

### สิ่งที่เกิดขึ้นขึ้นอยู่กับประเภทของข้อมูล (Data Type)!

#### 1. Immutable Objects (แก้ไม่ได้)
ได้แก่: \`int\`, \`float\`, \`str\`, \`tuple\`, \`bool\`
เมื่อส่งเข้าฟังก์ชัน แล้วพยายามแก้ค่า มันจะสร้างกล่องใหม่ (เหมือน Pass by Value) โค้ดข้างนอกจะไม่เปลี่ยน!
\`\`\`python
def change_num(n):
    n = 999  # สร้าง int ใหม่
    print("ในฟังก์ชัน:", n)

x = 10
change_num(x)
print("นอกฟังก์ชัน:", x)  
# Output: นอกฟังก์ชัน: 10 (ไม่ถูกเปลี่ยน!)
\`\`\`

#### 2. Mutable Objects (แก้ได้)
ได้แก่: \`list\`, \`dict\`, \`set\`
เมื่อส่งเข้าฟังก์ชัน แล้วไปแก้ไส้ใน โค้ดข้างนอกจะ **เปลี่ยนตามไปด้วย!** (เพราะชี้กล่องเดียวกัน)
\`\`\`python
def append_zero(lst):
    lst.append(0)  # แอบยัด 0 เข้าไปใน List เดิม
    print("ในฟังก์ชัน:", lst)

my_list = [1, 2, 3]
append_zero(my_list)
print("นอกฟังก์ชัน:", my_list)  
# Output: นอกฟังก์ชัน: [1, 2, 3, 0] (โดนเปลี่ยนซะงั้น!)
\`\`\`

### วิธีป้องกันตัวแปร Mutable โดนแก้ (Defensive Programming)
ถ้าเราไม่ต้องการให้ฟังก์ชันมาแอบแก้ List ของเรา ให้ส่ง **ตัวก๊อปปี้ (Copy)** เข้าไปแทน
\`\`\`python
# วิธีที่ 1: ใช้ .copy() หรือ [:]
append_zero(my_list.copy())
append_zero(my_list[:])

# วิธีที่ 2: ใช้ copy.deepcopy() สำหรับ List ซ้อน List
import copy
append_zero(copy.deepcopy(my_list))
\`\`\`

> 🎓 **จุดสังเกต:** ถ้าในฟังก์ชันมีการทำ \`lst = [9, 9]\` (กำหนดค่าตัวแปรใหม่ทั้งหมดด้วยเครื่องหมาย \`=\`) อันนี้จะไม่กระทบข้างนอก แต่ถ้าใช้เมธอดอย่าง \`.append()\`, \`.pop()\`, หรือ \`lst[0] = 9\` อันนี้จะกระทบแน่นอน!`,
        en: `## Pass by Object Reference 🚨

One of the most common pitfalls for beginners is passing variables into functions and having them unexpectedly change!

Python uses a system called **Pass by Object Reference**. What happens inside the function depends on the data type.

### 1. Immutable Objects (int, str, tuple)
If you reassign them inside a function, Python creates a new object. The original variable outside the function remains unchanged.
\`\`\`python
def change_num(n):
    n = 999
    
x = 10
change_num(x)
print(x)  # Still 10!
\`\`\`

### 2. Mutable Objects (list, dict, set)
If you modify them in-place (e.g., \`.append()\`, modifying an index), the original variable outside the function **will change** because both reference the same object in memory!
\`\`\`python
def append_zero(lst):
    lst.append(0)

my_list = [1, 2, 3]
append_zero(my_list)
print(my_list)  # [1, 2, 3, 0] (Changed!)
\`\`\`

### How to Protect Mutable Objects
If you don't want a function to modify your list, pass a copy instead:
\`\`\`python
append_zero(my_list.copy())
append_zero(my_list[:])
\`\`\`

> 🎓 **Note:** Reassigning the whole variable inside the function (\`lst = [9]\`) creates a local variable and doesn't affect the outside. Only in-place modifications (\`.append()\`) cause side effects.`
      },
      commands: [],
    },
  ]
};
