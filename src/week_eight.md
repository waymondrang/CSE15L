# Snippets and Tests

<div class="label">Week 8 Lab Report</div>

This document will compare our group's implementation of MarkdownParse with another group's implementation with three new test cases involving new lines and back ticks.

<div class="flex_buttons">
    <a href="https://github.com/pvijay03/markdown-parse" class="left_button flex_button">
        <button>Our GitHub Repo 🔗</button>
    </a>
    <a href="https://github.com/m1ma0314/markdown-parse" class="flex_button">
        <button>Reviewed GitHub Repo 🔗</button>
    </a>
</div>

## Snippet 1

```md
`[a link`](url.com)

[another link](`google.com)`

[`cod[e`](google.com)

[`code]`](ucsd.edu)
```

Parsing the markdown through [commonmark.js](https://spec.commonmark.org/dingus/), the following HTML is outputted, showing that there should be three links, `` `google.com``, `google.com`, and `ucsd.edu`.

```html
<p><code>[a link</code>](url.com)</p>
<p><a href="%60google.com">another link</a>`</p>
<p>
  <a href="google.com"><code>cod[e</code></a>
</p>
<p>
  <a href="ucsd.edu"><code>code]</code></a>
</p>
```

### Test Implementation

In `MarkdownParseTest.java`, the following test was added for `snippet_1.md` located in a sibling of `MarkdownParseTest.java`'s parent directory.

```java
@Test
public void testSnippet1() throws IOException {
    String contents = Files.readString(Path.of("../snippets/snippet_1.md"));
    List<String> expect = List.of("`google.com", "google.com", "ucsd.edu");
    assertEquals(expect, MarkdownParse.getLinks(contents));
}
```

### Test Results

The test for `snippet_1.md` did not pass in our repo.

```txt
1) testSnippet1(MarkdownParseTest)
java.lang.AssertionError: expected:<[`google.com, google.com, ucsd.edu]> but was:<[url.com, `google.com, google.com, ucsd.edu]>
        at org.junit.Assert.fail(Assert.java:89)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.assertEquals(Assert.java:120)
        at org.junit.Assert.assertEquals(Assert.java:146)
        at MarkdownParseTest.testSnippet2(MarkdownParseTest.java:103)
```

The test for `snippet_1.md` did not pass in the reviewed repo.

```txt
3) testSnippet1(MarkdownParseTest)
java.lang.AssertionError: expected:<[`google.com, google.com, ucsd.edu]> but was:<[url.com, `google.com, google.com, ucsd.edu]>
        at org.junit.Assert.fail(Assert.java:89)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.assertEquals(Assert.java:120)
        at org.junit.Assert.assertEquals(Assert.java:146)
        at MarkdownParseTest.testSnippet1(MarkdownParseTest.java:67)
```

## Snippet 2

```md
[a [nested link](a.com)](b.com)

[a nested parenthesized url](a.com(()))

[some escaped \[ brackets \]](example.com)
```

Parsing the markdown through [commonmark.js](https://spec.commonmark.org/dingus/), the following HTML is outputted, showing that there should be three links, `a.com`, `a.com(())`, and `example.com`.

```html
<p>[a <a href="a.com">nested link</a>](b.com)</p>
<p><a href="a.com(())">a nested parenthesized url</a></p>
<p><a href="example.com">some escaped [ brackets ]</a></p>
```

### Test Implementation

In `MarkdownParseTest.java`, the following test was added for `snippet_2.md` located in a sibling of `MarkdownParseTest.java`'s parent directory.

```java
@Test
public void testSnippet2() throws IOException {
    String contents = Files.readString(Path.of("../snippets/snippet_2.md"));
    List<String> expect = List.of("a.com", "a.com(())", "example.com");
    assertEquals(expect, MarkdownParse.getLinks(contents));
}
```

### Test Results

The test for `snippet_2.md` passed in our repo.

The test for `snippet_2.md` did not pass in the reviewed repo.

```txt
1) testSnippet2(MarkdownParseTest)
java.lang.AssertionError: expected:<[a.com, a.com(()), example.com]> but was:<[a.com, a.com((, example.com]>
        at org.junit.Assert.fail(Assert.java:89)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.assertEquals(Assert.java:120)
        at org.junit.Assert.assertEquals(Assert.java:146)
        at MarkdownParseTest.testSnippet2(MarkdownParseTest.java:74)
```

## Snippet 3

```md
[this title text is really long and takes up more than 
one line

and has some line breaks](
    https://www.twitter.com
)

[this title text is really long and takes up more than 
one line](
    https://ucsd-cse15l-w22.github.io/
)


[this link doesn't have a closing parenthesis](github.com

And there's still some more text after that.

[this link doesn't have a closing parenthesis for a while](https://cse.ucsd.edu/



)

And then there's more text
```

Parsing the markdown through [commonmark.js](https://spec.commonmark.org/dingus/), the following HTML is outputted, showing that there should be one link, `https://ucsd-cse15l-w22.github.io/`.

```html
<p>[this title text is really long and takes up more than one line</p>
<p>and has some line breaks]( https://www.twitter.com )</p>
<p>
  <a href="https://ucsd-cse15l-w22.github.io/"
    >this title text is really long and takes up more than one line</a
  >
</p>
<p>[this link doesn't have a closing parenthesis](github.com</p>
<p>And there's still some more text after that.</p>
<p>
  [this link doesn't have a closing parenthesis for a
  while](https://cse.ucsd.edu/
</p>
<p>)</p>
<p>And then there's more text</p>
```

### Test Implementation

In `MarkdownParseTest.java`, the following test was added for `snippet_3.md` located in a sibling of `MarkdownParseTest.java`'s parent directory.

```java
@Test
public void testSnippet3() throws IOException {
    String contents = Files.readString(Path.of("../snippets/snippet_3.md"));
    List<String> expect = List.of("https://ucsd-cse15l-w22.github.io/");
    assertEquals(expect, MarkdownParse.getLinks(contents));
}
```

### Test Results

The test for `snippet_3.md` did not pass in our repo.

```txt
3) testSnippet3(MarkdownParseTest)
java.lang.AssertionError: expected:<[https://ucsd-cse15l-w22.github.io/]> but was:<[]>
        at org.junit.Assert.fail(Assert.java:89)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.assertEquals(Assert.java:120)
        at org.junit.Assert.assertEquals(Assert.java:146)
        at MarkdownParseTest.testSnippet3(MarkdownParseTest.java:110)
```

The test for `snippet_3.md` did not pass in the reviewed repo.

```txt
5) testSnippet3(MarkdownParseTest)
java.lang.AssertionError: expected:<[https://ucsd-cse15l-w22.github.io/]> but was:<[]>
        at org.junit.Assert.fail(Assert.java:89)
        at org.junit.Assert.failNotEquals(Assert.java:835)
        at org.junit.Assert.assertEquals(Assert.java:120)
        at org.junit.Assert.assertEquals(Assert.java:146)
        at MarkdownParseTest.testSnippet3(MarkdownParseTest.java:81)
```

## Reflection

### Snippet 1 Reflection

Yes, considering that the program can technically be written in one line, it is certainly possible to handle back ticks within 10 lines of code. Even if we consider a line of code to end whenever there is a semicolon, it is still possible.

In between the indexes of the open and close brackets, we check for back ticks and if there are an odd number of back ticks, the link is invalid and we reject it. It is important that we use the close bracket with index one less than the index of the open parenthesis because there could exist one or more close brackets inside the back ticks.

<!-- When reading the markdown file, check for back ticks at every index. If between two indexes of back ticks in the same line exist an open or close bracket or an open or close parenthesis, move onto the next line. -->

### Snippet 2 Reflection

Our program passed the test for snippet 2, which gives me confidence that any edge case snippet 2 does not consider regarding nested parentheses, brackets, and escaped brackets can be fixed under 10 lines of code.

### Snippet 3 Reflection

I had to familiarize myself with how markdown handles new lines within links, so I read more on the [CommonMark specifications website](https://spec.commonmark.org/0.30/#links). 

> Although link titles may span multiple lines, they may not contain a blank line. 

I think this is implementable within 10 lines of code—checks just need to be made in between the indexes of opening and closing parenthesis and brackets. If there exists an empty line break between the opening and closing indexes of either the brackets or parenthesis, then that link is invalid.