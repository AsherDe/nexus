---
title: "编译原理第一次实验课"
date: "2025-09-19"
excerpt: "这个问题要求我们为一个特定的类C语言文法编写一个词法分析器。词法分析器是编译器的第一个阶段，它的任务是读取源代码（一个字符流），并将其转换成一系列的“单词”（Token），供后续的语法分析器使用。"
language: "zh"
tags: ["compiler", "lab", "tutorial", "student-life"]
---
# 以下代码仅供参考 （建议让ai拿走重写一遍防止重复）
这个问题要求我们为一个特定的类C语言文法编写一个词法分析器。词法分析器是编译器的第一个阶段，它的任务是读取源代码（一个字符流），并将其转换成一系列的“单词”（Token），供后续的语法分析器使用。

我们将按照以下步骤来构建这个C++程序：

1.  **环境准备与数据结构设计**
2.  **核心逻辑：主扫描循环**
3.  **识别标识符和关键字**
4.  **识别常量（整数、字符、字符串）**
5.  **识别运算符和分隔符**
6.  **整合代码与文件读写**

-----

### 第1步：环境准备与数据结构设计

首先，我们需要定义一些基本的数据结构来存储我们的“单词”和文法规则。

  * **Token结构体**: 我们需要一个结构体来表示一个被识别出的单词。根据题目要求，每个单词包含“类别码”和“单词的字符串形式”。
  * **关键字/符号映射表**: 为了快速查找一个字符串是关键字（如`if`, `while`）还是特殊符号（如`+`, `*`），我们可以使用C++的`std::map`。它能将字符串映射到对应的类别码。

**C 代码实现**:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_TOKENS 1000
#define MAX_TOKEN_LEN 100
#define MAX_KEYWORDS 30

// 用于存储一个单词（Token）
typedef struct {
    char type[20];   // 类别码，例如 "IDENFR"
    char value[MAX_TOKEN_LEN];  // 单词的字符串，例如 "myVar"
} Token;

// 关键字映射结构
typedef struct {
    char keyword[20];
    char tokenType[20];
} KeywordMap;

// 全局变量，用于存储关键字和符号的映射表
KeywordMap keywords[MAX_KEYWORDS];
int keywordCount = 0;

// 初始化关键字映射表
void initializeKeywords() {
    // 关键字
    strcpy(keywords[keywordCount].keyword, "const"); strcpy(keywords[keywordCount++].tokenType, "CONSTTK");
    strcpy(keywords[keywordCount].keyword, "int"); strcpy(keywords[keywordCount++].tokenType, "INTTK");
    strcpy(keywords[keywordCount].keyword, "char"); strcpy(keywords[keywordCount++].tokenType, "CHARTK");
    strcpy(keywords[keywordCount].keyword, "void"); strcpy(keywords[keywordCount++].tokenType, "VOIDTK");
    strcpy(keywords[keywordCount].keyword, "main"); strcpy(keywords[keywordCount++].tokenType, "MAINTK");
    strcpy(keywords[keywordCount].keyword, "if"); strcpy(keywords[keywordCount++].tokenType, "IFTK");
    strcpy(keywords[keywordCount].keyword, "else"); strcpy(keywords[keywordCount++].tokenType, "ELSETK");
    strcpy(keywords[keywordCount].keyword, "switch"); strcpy(keywords[keywordCount++].tokenType, "SWITCHTK");
    strcpy(keywords[keywordCount].keyword, "case"); strcpy(keywords[keywordCount++].tokenType, "CASETK");
    strcpy(keywords[keywordCount].keyword, "default"); strcpy(keywords[keywordCount++].tokenType, "DEFAULTTK");
    strcpy(keywords[keywordCount].keyword, "while"); strcpy(keywords[keywordCount++].tokenType, "WHILETK");
    strcpy(keywords[keywordCount].keyword, "for"); strcpy(keywords[keywordCount++].tokenType, "FORTK");
    strcpy(keywords[keywordCount].keyword, "scanf"); strcpy(keywords[keywordCount++].tokenType, "SCANFTK");
    strcpy(keywords[keywordCount].keyword, "printf"); strcpy(keywords[keywordCount++].tokenType, "PRINTFTK");
    strcpy(keywords[keywordCount].keyword, "return"); strcpy(keywords[keywordCount++].tokenType, "RETURNTK");
}

// 查找关键字，返回对应的token类型，如果不是关键字返回NULL
char* findKeyword(char* word) {
    for (int i = 0; i < keywordCount; i++) {
        if (strcmp(keywords[i].keyword, word) == 0) {
            return keywords[i].tokenType;
        }
    }
    return NULL;
}

// 获取运算符和分隔符的token类型
char* getOperatorType(char* op) {
    if (strcmp(op, "+") == 0) return "PLUS";
    if (strcmp(op, "-") == 0) return "MINU";
    if (strcmp(op, "*") == 0) return "MULT";
    if (strcmp(op, "/") == 0) return "DIV";
    if (strcmp(op, "<") == 0) return "LSS";
    if (strcmp(op, "<=") == 0) return "LEQ";
    if (strcmp(op, ">") == 0) return "GRE";
    if (strcmp(op, ">=") == 0) return "GEQ";
    if (strcmp(op, "==") == 0) return "EQL";
    if (strcmp(op, "!=") == 0) return "NEQ";
    if (strcmp(op, "=") == 0) return "ASSIGN";
    if (strcmp(op, ";") == 0) return "SEMICN";
    if (strcmp(op, ",") == 0) return "COMMA";
    if (strcmp(op, "(") == 0) return "LPARENT";
    if (strcmp(op, ")") == 0) return "RPARENT";
    if (strcmp(op, "[") == 0) return "LBRACK";
    if (strcmp(op, "]") == 0) return "RBRACK";
    if (strcmp(op, "{") == 0) return "LBRACE";
    if (strcmp(op, "}") == 0) return "RBRACE";
    if (strcmp(op, ":") == 0) return "COLON";
    return NULL;
}
```

### 第2步：核心逻辑：主扫描循环

我们的词法分析器需要从头到尾扫描整个源代码。我们可以将整个文件内容读入一个字符串，然后用一个指针或索引来标记当前扫描的位置。

主循环的逻辑如下：

1.  检查是否已到达文件末尾。
2.  查看当前索引指向的字符。
3.  根据字符的类型（字母、数字、符号、空白符等），决定调用哪个处理函数。
4.  处理函数返回识别到的Token。
5.  将Token存起来，并更新索引，跳过已识别的字符。
6.  重复此过程，直到所有字符都被处理。

**C 代码框架**:

```c
// (接上文)
int main() {
    initializeKeywords();

    // 1. 读取源文件 testfile.txt
    FILE *inputFile = fopen("testfile.txt", "r");
    if (inputFile == NULL) {
        printf("Error opening testfile.txt\n");
        return 1;
    }

    // 获取文件大小并读取所有内容
    fseek(inputFile, 0, SEEK_END);
    long fileSize = ftell(inputFile);
    fseek(inputFile, 0, SEEK_SET);

    char *sourceCode = (char*)malloc(fileSize + 1);
    fread(sourceCode, 1, fileSize, inputFile);
    sourceCode[fileSize] = '\0';
    fclose(inputFile);

    Token tokens[MAX_TOKENS]; // 存储所有识别出的Token
    int tokenCount = 0;
    int currentIndex = 0;

    // 2. 主扫描循环
    while (currentIndex < strlen(sourceCode)) {
        char currentChar = sourceCode[currentIndex];

        if (isspace(currentChar)) {
            // 如果是空白符，跳过
            currentIndex++;
            continue;
        } else if (isalpha(currentChar) || currentChar == '_') {
            // 处理标识符或关键字
            // ... (将在第3步实现)
        } else if (isdigit(currentChar)) {
            // 处理数字常量
            // ... (将在第4步实现)
        } else if (currentChar == '\'') {
            // 处理字符常量
            // ... (将在第4步实现)
        } else if (currentChar == '"') {
            // 处理字符串常量
            // ... (将在第4步实现)
        } else {
            // 处理运算符和分隔符
            // ... (将在第5步实现)
        }
    }

    // 3. 将结果写入 output.txt
    // ... (将在第6步实现)

    free(sourceCode);
    return 0;
}
```

### 第3步：识别标识符和关键字

如果当前字符是字母或下划线，那么它可能是一个标识符（如 `var1`）或一个关键字（如 `if`）。

**处理逻辑**:

1.  从当前位置开始，连续读取所有字母、数字和下划线，组成一个完整的单词。
2.  在我们的`tokenMap`中查找这个单词。
3.  如果找到了，说明它是一个关键字，类别码就是`map`中对应的值。
4.  如果没找到，它就是一个标识符，类别码是`IDENFR`。

**C 代码实现**:

```c
// (在主循环的 `if (isalpha(currentChar) || currentChar == '_')` 分支中)
int start = currentIndex;
while (currentIndex < strlen(sourceCode) && (isalnum(sourceCode[currentIndex]) || sourceCode[currentIndex] == '_')) {
    currentIndex++;
}

// 提取单词
char word[MAX_TOKEN_LEN];
int wordLen = currentIndex - start;
strncpy(word, sourceCode + start, wordLen);
word[wordLen] = '\0';

// 查找是否为关键字
char* tokenType = findKeyword(word);
if (tokenType != NULL) {
    strcpy(tokens[tokenCount].type, tokenType);
    strcpy(tokens[tokenCount].value, word);
} else {
    strcpy(tokens[tokenCount].type, "IDENFR");
    strcpy(tokens[tokenCount].value, word);
}
tokenCount++;
```

### 第4步：识别常量（整数、字符、字符串）

#### 整数常量 (`INTCON`)

如果当前字符是数字，就连续读取所有数字。
**C 代码实现**:

```c
// (在主循环的 `if (isdigit(currentChar))` 分支中)
int start = currentIndex;
while (currentIndex < strlen(sourceCode) && isdigit(sourceCode[currentIndex])) {
    currentIndex++;
}
char number[MAX_TOKEN_LEN];
int numLen = currentIndex - start;
strncpy(number, sourceCode + start, numLen);
number[numLen] = '\0';
strcpy(tokens[tokenCount].type, "INTCON");
strcpy(tokens[tokenCount].value, number);
tokenCount++;
```

#### 字符常量 (`CHARCON`)

以单引号`'`开始和结束。我们需要提取单引号之间的内容。
**C 代码实现**:

```c
// (在主循环的 `if (currentChar == '\'')` 分支中)
int start = currentIndex + 1; // 跳过开头的 '
currentIndex++;
// 注意：这里简化了处理，实际应处理转义字符等，但根据题目要求，这样足够
while (currentIndex < strlen(sourceCode) && sourceCode[currentIndex] != '\'') {
    currentIndex++;
}
char char_val[MAX_TOKEN_LEN];
int charLen = currentIndex - start;
strncpy(char_val, sourceCode + start, charLen);
char_val[charLen] = '\0';
strcpy(tokens[tokenCount].type, "CHARCON");
strcpy(tokens[tokenCount].value, char_val);
tokenCount++;
currentIndex++; // 跳过结尾的 '
```

#### 字符串常量 (`STRCON`)

以双引号`"`开始和结束。逻辑与字符常量类似。
**C 代码实现**:

```c
// (在主循环的 `if (currentChar == '"')` 分支中)
int start = currentIndex + 1; // 跳过开头的 "
currentIndex++;
while (currentIndex < strlen(sourceCode) && sourceCode[currentIndex] != '"') {
    currentIndex++;
}
char str_val[MAX_TOKEN_LEN];
int strLen = currentIndex - start;
strncpy(str_val, sourceCode + start, strLen);
str_val[strLen] = '\0';
strcpy(tokens[tokenCount].type, "STRCON");
strcpy(tokens[tokenCount].value, str_val);
tokenCount++;
currentIndex++; // 跳过结尾的 "
```

### 第5步：识别运算符和分隔符

这部分稍微复杂，因为有些运算符是两个字符（如 `==`, `<=`, `!=`, `>=`）。我们需要“向前看”一个字符来判断。

**处理逻辑**:

1.  检查当前字符和下一个字符的组合是否在`tokenMap`中（例如`<=`）。
2.  如果是，就将其作为一个双字符Token处理，并将索引`+2`。
3.  如果不是，就将当前字符作为一个单字符Token处理，并将索引`+1`。

**C 代码实现**:

```c
// (在主循环的 `else` 分支中)
char two_char_op[3];
char one_char_op[2];
char* tokenType;

// 检查双字符运算符
if (currentIndex + 1 < strlen(sourceCode)) {
    strncpy(two_char_op, sourceCode + currentIndex, 2);
    two_char_op[2] = '\0';
    tokenType = getOperatorType(two_char_op);
    if (tokenType != NULL) {
        strcpy(tokens[tokenCount].type, tokenType);
        strcpy(tokens[tokenCount].value, two_char_op);
        tokenCount++;
        currentIndex += 2;
    } else {
        // 检查单字符运算符
        one_char_op[0] = sourceCode[currentIndex];
        one_char_op[1] = '\0';
        tokenType = getOperatorType(one_char_op);
        if (tokenType != NULL) {
            strcpy(tokens[tokenCount].type, tokenType);
            strcpy(tokens[tokenCount].value, one_char_op);
            tokenCount++;
        }
        currentIndex++;
    }
} else {
    // 只能是单字符运算符
    one_char_op[0] = sourceCode[currentIndex];
    one_char_op[1] = '\0';
    tokenType = getOperatorType(one_char_op);
    if (tokenType != NULL) {
        strcpy(tokens[tokenCount].type, tokenType);
        strcpy(tokens[tokenCount].value, one_char_op);
        tokenCount++;
    }
    currentIndex++;
}
```

*注意*: 从样例输出 `MINU -` 和 `INTCON 100`可以看出，负号被视为一个独立的单词 `MINU`，而不是数字的一部分。我们当前的设计已经正确地处理了这一点。

### 第6步：整合代码与文件读写

最后，我们将所有识别出的Token写入到`output.txt`文件中，格式为`类别码 单词值`，中间用一个空格隔开。

**C 代码实现**:

```c
// (在主循环结束后)
FILE *outputFile = fopen("output.txt", "w");
if (outputFile == NULL) {
    printf("Error opening output.txt\n");
    return 1;
}

for (int i = 0; i < tokenCount; i++) {
    fprintf(outputFile, "%s %s\n", tokens[i].type, tokens[i].value);
}
fclose(outputFile);

printf("Lexical analysis completed. Output written to output.txt.\n");
```

### 还有一步

这时候上传代码发现正确率是99%。

**核心问题：关键字识别是大小写敏感的 (Case-Sensitive)**

词法分析器将 `PRINTF` 和 `printF` 识别为了普通标识符 (`IDENFR`)，而评测系统希望你将它们识别为 `printf` 关键字 (`PRINTFTK`)。

这说明了一个隐藏的测试点：**关键字的识别应该是大小写不敏感的 (Case-Insensitive)**。

### 如何修正

修正这个问题的方法是，在进行关键字匹配时，忽略大小写。具体步骤如下：

1.  当你从源代码中识别出一个单词时（比如 "PRINTF"），**保留这个原始的字符串**，因为它将作为最终输出的单词值。
2.  为了进行匹配，**将这个单词统一转换成全小写**（"PRINTF" -\> "printf"）。
3.  使用这个全小写的版本去你的关键字 `map` 中查找。你的 `map` 应该只使用小写字母作为键（key）。
4.  **如果找到了**，说明它是一个关键字。此时，创建一个 Token，它的 `type` 是从 map 中查到的类别码（如 `PRINTFTK`），但它的 `value` 必须是**第1步中保留的原始字符串**（如 "PRINTF"）。
5.  **如果没有找到**，那么它就是一个普通标识符，`type` 为 `IDENFR`，`value` 依然是原始字符串。

#### C++ 代码修改示例

你需要一个辅助函数来将字符串转为小写。

```c
// 将字符串转为小写的辅助函数
void toLower(char* str) {
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
}
```

然后修改你处理标识符和关键字的逻辑：

```c
// ... 在主循环中 ...
if (isalpha(currentChar) || currentChar == '_') {
    int start = currentIndex;
    while (currentIndex < strlen(sourceCode) && (isalnum(sourceCode[currentIndex]) || sourceCode[currentIndex] == '_')) {
        currentIndex++;
    }

    // 1. 保留原始单词
    char originalWord[MAX_TOKEN_LEN];
    int wordLen = currentIndex - start;
    strncpy(originalWord, sourceCode + start, wordLen);
    originalWord[wordLen] = '\0';

    // 2. 创建小写版本用于匹配
    char lowercaseWord[MAX_TOKEN_LEN];
    strcpy(lowercaseWord, originalWord);
    toLower(lowercaseWord);

    // 3. 使用小写版本查找关键字
    char* tokenType = findKeyword(lowercaseWord);
    if (tokenType != NULL) {
        // 4. 找到了！使用查找到的 type 和 原始的 value
        strcpy(tokens[tokenCount].type, tokenType);
        strcpy(tokens[tokenCount].value, originalWord);
    } else {
        // 5. 没找到，是普通标识符
        strcpy(tokens[tokenCount].type, "IDENFR");
        strcpy(tokens[tokenCount].value, originalWord);
    }
    tokenCount++;
}
// ... 其他逻辑 ...
```

通过这样的修改，你的程序就能够正确处理像 `PRINTF`、`If`、`WHILE` 等大小写不规范的关键字，从而通过所有的测试用例。
