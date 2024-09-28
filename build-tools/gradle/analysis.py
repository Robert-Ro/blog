# 解析flutter构建日志，分析耗时的步骤
import re


def read_file(file_path):
    # 打开文件并逐行读取
    with open(file_path, "r", encoding="utf-8") as lines:
        return lines.readlines()


def truncate_string(s, max_length=100):
    if len(s) > max_length:
        return s[:max_length] + "..."
    return s


# 定义一个函数来查找和提取所有匹配的数字及其对应的行
def extract_numbers_in_brackets(lines):
    pattern = r"\[\s*[+-]?(\d+)\s*ms\]"  # 正则表达式模式
    number_line_pairs = []  # 用于存储数字和对应行的列表
    for index, line in enumerate(lines):
        matches = re.findall(pattern, line)  # 查找所有匹配的数字
        for num in matches:
            number = int(num)  # 转换为整数
            clean_line = re.sub(pattern, "", line).strip()
            number_line_pairs.append(
                (number, f"{index}: " + truncate_string(clean_line))
            )  # 添加到列表
    return number_line_pairs


# 定义一个函数来按数字大小排序，并返回排序后的列表
def sort_numbers(number_line_pairs):
    return sorted(number_line_pairs, key=lambda pair: pair[0])


# 示例使用
lines = read_file("C:\\Users\\liuts\\Downloads\\build-1.log")

# 提取数字和行
extracted_pairs = extract_numbers_in_brackets(lines)

# 排序数字和行
sorted_pairs = sort_numbers(extracted_pairs)

# 输出排序后的数字和对应的行
with open("analysis.log", "w", encoding="utf-8") as file:
    for number, line in sorted_pairs:
        if number >= 1000:
            file.write(f"line-{line}, 耗时: {number}ms\n")
