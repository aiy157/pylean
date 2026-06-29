import json
import re
import sys

def update_lessons():
    with open('src/data/curriculum.js', 'r', encoding='utf-8') as f:
        content = f.read()

    with open('replacements.json', 'r', encoding='utf-8') as f:
        replacements = json.load(f)

    for lesson_id, data in replacements.items():
        # Match from id: 'x-x' up to content: { ... }
        # Regex explanation:
        # id: '2-3', ... content: { th: `...`, en: `...` }
        pattern = r"(id:\s*'" + re.escape(lesson_id) + r"'.*?content:\s*\{)(.*?th:\s*`.*?`.*?,.*?en:\s*`.*?`\s*\n\s*\})"
        
        def repl(match):
            prefix = match.group(1)
            # Create new content block
            new_th = data['th'].replace('`', '\\`')
            new_en = data['en'].replace('`', '\\`')
            new_content = f"\n          th: `{new_th}`,\n          en: `{new_en}`,\n        }}"
            return prefix + new_content

        content = re.sub(pattern, repl, content, flags=re.DOTALL)

    with open('src/data/curriculum.js', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Curriculum updated successfully!")

if __name__ == '__main__':
    update_lessons()
