# CommonMark Simply Diff

<div class="label">Week 10 Lab Report</div>

This document will compare [our implementation](https://github.com/pvijay03/markdown-parse) of markdown-parse against markdown-parse from the [main repository](https://github.com/ucsd-cse15l-w22/markdown-parse) using tests from CommonMark.

## Saving Test Results

We modified the `script.sh` script to include the name of the file before calling `MarkdownParse`, as such.

```sh{3}
for file in test-files/*.md;
do
    echo $file
    java MarkdownParse $file
done
```

Then, when calling `script.sh`, we direct the output to `results.txt`, as such.

```
bash script.sh > results.txt
```

We perform the command twice, once in the directory for our implementation and once in the directory for the main implementation. This creates two `results.txt` files.

```txt
test-files/1.md
[]
test-files/10.md
[]
test-files/100.md
[]
... (1298 more lines)
```

Now that we have our results, we can compare them and detect differences between the implementations.

## Comparing Test Results

The `diff` command finds differences between two files, which is what we will use to find disagreeing results. We can output the results of `diff` to a text file for our convenience.

```
diff markdown-parse-test-files/results.txt markdown-parse/results.txt > differences.txt
```

`markdown-parse-test-files` is the directory for our implementation while `markdown-parse` is the main implementation.

Let's open `differences.txt` and analyze the results of `diff`.

```txt
92c92
< []
---
> [/foo]
270c270
< [/bar* "ti*tle"]
---
> []
492c492
< [/f&ouml;&ouml; "f&ouml;&ouml;"]
---
> []
... (many more lines)
```

Every fifth line indicates which lines in each file had differences. For example, the first difference was in line 92, where our implementation found no links while the main implementation did, `/foo`.

## Analyzing Test Results

### Analysis #1

To find which markdown file is associated with the line differences in `differences.txt`, we can look into the `results.txt` file. 

For our first analysis, let us look at the test case difference found in line 96. 

Here is a snippet from `results.txt` from our implementation. Line 96 is highlighted, and we can tell that it is associated with the markdown file `14.md`. 

```{7}
...
test-files/138.md
[]
test-files/139.md
[]
test-files/14.md
[]
test-files/140.md
[]
test-files/141.md
[]
...
```

We can open `14.md` and start investigating.

```md
\*not emphasized\*
\<br/> not a tag
\[not a link](/foo)
\`not code`
1\. not a list \* not a list
\# not a heading
\[foo]: /url "not a reference"
\&ouml; not a character entity
```

Parsing the file's contents through the [commonmark.js dingus](https://spec.commonmark.org/dingus/), no link elements are outputted.

```html
<p>
  *not emphasized* &lt;br/&gt; not a tag [not a link](/foo) `not code` 1. not a
  list * not a list # not a heading [foo]: /url “not a reference” &amp;ouml; not
  a character entity
</p>
```

This indicates that our implementation was correct and the main implementation was incorrect, as the main implementation outputted `[/foo]`. Let's try to find out why.

The main implementation of MarkdownParse does not check for escaped characters. Our implementation has a method that overrides the `indexOf` method to handle backslashes, shown below.

```java
public static int indexOfUnescaped(String str, String search, int startIndex) {
    int currIndex = startIndex - 1;
    int backslashCount;
    do {
        currIndex = str.indexOf(search, currIndex + 1);
        backslashCount = 0;
        int index = currIndex - 1;
        while (index >= 0 && str.charAt(index) == '\\') {
            index--;
            backslashCount++;
        }
    } while (backslashCount % 2 == 1);
    return currIndex;
}
```

The `indexOfUnescaped` method is implemented within our `getLinksFromLine` method,

```java{3,7,8}
public static ArrayList<String> getLinksFromLine(String markdown) {
    // ...
    int nextOpenBracket = indexOfUnescaped(markdown, "[", currentIndex);
    if (nextOpenBracket == -1) {
        break;
    }
    int nextCloseBracket = indexOfUnescaped(markdown, "]", nextOpenBracket);
    int openParen = indexOfUnescaped(markdown, "(", nextCloseBracket);
    if (openParen == -1) {
        break;
    }
    // ...
```

The fix I would provide to the main implementation is a method similar to `indexOfEscaped`, where a check is performed on each character to ensure that it is not escaped.

### Analysis #2

Let us go back to `differences.txt` again. Next, I will analyze the difference between the implementations in line 492 of `results.txt`.

```txt{9-12}
92c92
< []
---
> [/foo]
270c270
< [/bar* "ti*tle"]
---
> []
492c492
< [/f&ouml;&ouml; "f&ouml;&ouml;"]
---
> []
... (many more lines)
```

We can tell that our implementation outputted some strange text that includes a space, while the main implementation did have any output. Neither implementation looks correct, but let's look at the markdown file associated with this line to dive deeper.

Going into `results.txt`, we can tell that line 492 is associated with markdown file `32.md`.

```txt{7}
...
test-files/318.md
[]
test-files/319.md
[]
test-files/32.md
[/f&ouml;&ouml; "f&ouml;&ouml;"]
test-files/320.md
[]
test-files/321.md
[]
...
```

Lets open `32.md` and parse it through the [commonmark.js dingus](https://spec.commonmark.org/dingus/).

```md
[foo](/f&ouml;&ouml; "f&ouml;&ouml;")
```

```html
<p><a href="/f%C3%B6%C3%B6" title="föö">foo</a></p>
```

We can tell that the markdown is supposed to output one link, with the link title being the text inside the double quotes in the parenthesis and the actual link being the text before the space inside the parenthesis.

This is one type of link that neither implementation can handle. There are two problems.

1. Both MarkdownParse implementations do not have code to handle link titles, which is the text within the double quotes after the space.
2. Both MarkdownParse implementations are missing the ability to encode to URL-format.

A solution to the first problem in our implementation would be to check if the link contained any spaces, and if there are, split the link by the space and validate that the second split element is enclosed by double quotes that are not escaped. 

A solution may look like this (changed lines are emphasized).

```java{8-15}
    // ...
    if (closeParen == -1) {
        break;
    }
    // Check that this isn't an image link
    if (!(nextOpenBracket > 0 && markdown.charAt(nextOpenBracket - 1) == '!')) {
        String substr = markdown.substring(openParen + 1, closeParen);
        substr = substr.replaceAll("\\\\(.)", "$1").trim();
        if (substr.contains(" ")) {
            String[] split = substr.split(" ");
            if (!checkForDoubleQuotes(split[1])) {
                continue;
            }
            substr = split[0];
        }
        toReturn.add(substr);
    }
    currentIndex = closeParen + 1;
}
return toReturn;
```

To solve the first problem in the main implementation, the check for spaces within the potential link would have to be removed and the title checker from above would be added in the same fashion.

A solution may look like this (changed lines are emphasized and old code is commented).

```java{3-10}
String potentialLink = markdown.substring(openParen + 1, closeParen).trim();
// if(potentialLink.indexOf(" ") == -1 && potentialLink.indexOf("\n") == -1) {
if (potentialLink.indexOf("\n") == -1) {
    if (potentialLink.contains(" ")) {
        String[] split = potentialLink.split(" ");
        if (!checkForDoubleQuotes(split[1])) {
            continue;
        }
        potentialLink = split[0];
    }
    toReturn.add(potentialLink);
    currentIndex = closeParen + 1;
} else {
    currentIndex = currentIndex + 1;
}
```

To solve the second problem in both implementations, a method must be constructed to parse the link text to URL-format before returning it. One could implement their own URLEncoder, or use the one in [`java.net.URLEncoder`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/net/URLEncoder.html). However, `URLEncoder` will also encode the `/` in links, which is not something we want. Because of this, a custom method is needed to only URL encode the text around `/`.

A solution in our implementation may look like this (changed lines are emphasized), where `encodeURL` would use the `URLEncoder` while preserving the `/` in the links.

```java{16}
    // ...
    if (closeParen == -1) {
        break;
    }
    // Check that this isn't an image link
    if (!(nextOpenBracket > 0 && markdown.charAt(nextOpenBracket - 1) == '!')) {
        String substr = markdown.substring(openParen + 1, closeParen);
        substr = substr.replaceAll("\\\\(.)", "$1").trim();
        if (substr.contains(" ")) {
            String[] split = substr.split(" ");
            if (!checkForDoubleQuotes(split[1])) {
                continue;
            }
            substr = split[0];
        }
        toReturn.add(encodeURL(substr));
    }
    currentIndex = closeParen + 1;
}
return toReturn;
```