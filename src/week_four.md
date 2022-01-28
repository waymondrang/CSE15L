# Begone, Bugs! Scram, Symptoms!

<div class="label">Week 4 Lab Report</div>

This document will showcase three code changes that addressed failure-inducing inputs from labs 3 and 4: [Unclosed Open Brackets](#unclosed-open-brackets), [Parenthesis Inside Links](#parenthesis-inside-links), and [Testing for Images](#testing-for-images).

## Unclosed Open Brackets

*Commit 273fa0950682dbc793b85b7520a611e179689bf9*

![273fa0950682dbc793b85b7520a611e179689bf9](https://i.imgur.com/28dtVh1.png)

[test-unclosed-bracket.md](https://github.com/waymondrang/markdown-parse/blob/main/test-unclosed-bracket.md) was the test file with failure-inducing input that prompted us to make the change.

![Open Brackets Original Output](https://i.imgur.com/aLhfvAX.png)

The symptom was that `test-unclosed-bracket.md` was causing the program to loop infinitely, which was observed by the `java.lang.OutOfMemoryError: Java heap space` error thrown before the program was terminated. The bug was that there was no handling of unclosed brackets. Our fix was to add a conditional break

```java
if (nextOpenBracket == -1) {
    break;
}
```

to stop the loop when another open bracket could not be found.

## Parenthesis Inside Links

*Commit 9a9fc400b281c8db8a18160cfeced37f173b4521*

![9a9fc400b281c8db8a18160cfeced37f173b4521](https://i.imgur.com/85J3sz0.png)

[test-parens-inside-link.md](https://github.com/waymondrang/markdown-parse/blob/main/test-parens-inside-link.md) was the test file with failure-inducing input that prompted us to make the change.

![test-parens-inside-link.md](https://i.imgur.com/tAovGH5.png)

The symptom was that `test-parens-inside-link.md` was causing the program to output an invalid link when it should've invalidated the link and ignored it. The bug was that the program was not looking for another open parenthesis before the next close parenthesis.

```java
if (nextOpenParen != -1 && closeParen > nextOpenParen) {
    currentIndex = closeParen;
    continue;
}
```

## Ignoring Images

*Commit b087ed00a86d2d072e71a8b427ebec9a5c841030*

![b087ed00a86d2d072e71a8b427ebec9a5c841030](https://i.imgur.com/XaHmOZU.png)

[test-ignore-image.md](https://github.com/waymondrang/markdown-parse/blob/main/test-ignore-image.md) was the test file with failure-inducing input that prompted us to make the change.

![test-ignore-image.md](https://i.imgur.com/LG1HhSo.png)

The symptom was that `test-ignore-image.md` was causing the program to output the links for the images, which should've been ignored because the program is supposed to ignore the URLs of the images. The bug was that the program was missing a filter to check that the link wasn't one for an image.

```java
toReturn.add(markdown.substring(openParen + 1, closeParen));
```

We made this line of code run conditionally by wrapping it in an if statement that checks if the character prior to the open bracket was an exclamation point.

```java
if (!(nextOpenBracket > 0 && markdown.charAt(nextOpenBracket - 1) == '!')) {
    toReturn.add(markdown.substring(openParen + 1, closeParen));
}
```
