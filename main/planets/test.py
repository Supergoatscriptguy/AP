import os
import re

def remove_comments_from_html(content):
    pattern = re.compile(r'<!--(?!<!)[^\[>].*?-->', re.DOTALL)
    return re.sub(pattern, '', content)

def remove_comments_from_css(content):
    pattern = re.compile(r'/\*.*?\*/', re.DOTALL)
    return re.sub(pattern, '', content)

def remove_comments_from_js(content):
    # Handle both single-line and multi-line comments
    pattern = re.compile(r'//.*?$|/\*.*?\*/', re.DOTALL | re.MULTILINE)
    return re.sub(pattern, '', content)

def remove_comments_from_file(file_path, file_type):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    original_content = content

    if file_type == 'html':
        content = remove_comments_from_html(content)
    elif file_type == 'css':
        content = remove_comments_from_css(content)
    elif file_type == 'js':
        content = remove_comments_from_js(content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Comments removed from {file_path}")
    else:
        print(f"No comments found in {file_path}")

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))

    for file_name in os.listdir(current_dir):
        if file_name.endswith('.html'):
            remove_comments_from_file(os.path.join(current_dir, file_name), 'html')
        elif file_name.endswith('.css'):
            remove_comments_from_file(os.path.join(current_dir, file_name), 'css')
        elif file_name.endswith('.js'):
            remove_comments_from_file(os.path.join(current_dir, file_name), 'js')

if __name__ == "__main__":
    main()