window.cheatSheetSections = [
{id:'basics',label:'Basics',content:`
<div class="grid">
<div class="card">
<div class="card-title">Program structure</div>
<pre><span class="kw">package</span> main

<span class="kw">import</span> (
  <span class="str">"fmt"</span>
  <span class="str">"os"</span>
)

<span class="kw">func</span> <span class="fn">main</span>() {
  fmt.<span class="fn">Println</span>(<span class="str">"Hello, Go"</span>)
}</pre>
</div>
<div class="card">
<div class="card-title">Variable declaration</div>
<pre><span class="cm">// typed</span>
<span class="kw">var</span> x <span class="typ">int</span> = <span class="num">10</span>
<span class="kw">var</span> s <span class="typ">string</span> = <span class="str">"hi"</span>

<span class="cm">// short declaration (inferred)</span>
y := <span class="num">42</span>
name := <span class="str">"gopher"</span>

<span class="cm">// multiple</span>
a, b := <span class="num">1</span>, <span class="num">2</span>
<span class="kw">var</span> (
  c <span class="typ">int</span>
  d <span class="typ">bool</span> = <span class="kw">true</span>
)

<span class="cm">// blank identifier</span>
_, err := someFunc()</pre>
</div>
<div class="card">
<div class="card-title">Basic types</div>
<table class="table">
<tr><th>Type</th><th>Size / Notes</th></tr>
<tr><td>bool</td><td>true / false</td></tr>
<tr><td>int, int8…64</td><td>platform / explicit</td></tr>
<tr><td>uint, uint8…64</td><td>unsigned</td></tr>
<tr><td>float32/64</td><td>IEEE 754</td></tr>
<tr><td>complex64/128</td><td>complex numbers</td></tr>
<tr><td>string</td><td>immutable UTF-8 bytes</td></tr>
<tr><td>byte</td><td>alias uint8</td></tr>
<tr><td>rune</td><td>alias int32 (Unicode)</td></tr>
<tr><td>uintptr</td><td>pointer arithmetic</td></tr>
</table>
</div>
<div class="card">
<div class="card-title">Constants &amp; iota</div>
<pre><span class="kw">const</span> Pi = <span class="num">3.14159</span>
<span class="kw">const</span> MaxRetries <span class="typ">int</span> = <span class="num">5</span>

<span class="kw">type</span> <span class="typ">Direction</span> <span class="typ">int</span>
<span class="kw">const</span> (
  North <span class="typ">Direction</span> = <span class="kw">iota</span> <span class="cm">// 0</span>
  East                      <span class="cm">// 1</span>
  South                     <span class="cm">// 2</span>
  West                      <span class="cm">// 3</span>
)

<span class="cm">// bit-shifted flags</span>
<span class="kw">const</span> (
  Read  = <span class="num">1</span> &lt;&lt; <span class="kw">iota</span> <span class="cm">// 1</span>
  Write               <span class="cm">// 2</span>
  Exec                <span class="cm">// 4</span>
)</pre>
</div>
<div class="card">
<div class="card-title">Operators</div>
<pre><span class="cm">// arithmetic</span>
+ - * / % ++ --

<span class="cm">// comparison</span>
== != &lt; &gt; &lt;= &gt;=

<span class="cm">// logical</span>
&amp;&amp; || !

<span class="cm">// bitwise</span>
&amp; | ^ &lt;&lt; &gt;&gt; &amp;^

<span class="cm">// assignment</span>
= += -= *= /= %=
&amp;= |= ^= &lt;&lt;= &gt;&gt;=

<span class="cm">// address / deref</span>
&amp;x   <span class="cm">// pointer to x</span>
*p   <span class="cm">// dereference p</span></pre>
</div>
<div class="card">
<div class="card-title">Type conversion</div>
<pre>i := <span class="typ">int</span>(<span class="num">3.9</span>)   <span class="cm">// 3, truncates</span>
f := <span class="typ">float64</span>(i)
s := <span class="typ">string</span>(<span class="num">65</span>) <span class="cm">// "A"</span>
b := []<span class="typ">byte</span>(s)
r := []<span class="typ">rune</span>(s)
n, _ := strconv.<span class="fn">Atoi</span>(<span class="str">"42"</span>)
str := strconv.<span class="fn">Itoa</span>(n)
f2, _ := strconv.<span class="fn">ParseFloat</span>(<span class="str">"3.14"</span>, <span class="num">64</span>)

<span class="cm">// type assertion</span>
<span class="kw">var</span> i <span class="typ">interface</span>{} = <span class="str">"hello"</span>
s2 := i.(<span class="typ">string</span>)        <span class="cm">// panics if wrong</span>
s3, ok := i.(<span class="typ">string</span>)    <span class="cm">// safe</span></pre>
</div>
</div>
`},
{id:'control',label:'Control Flow',content:`
<div class="grid">
<div class="card">
<div class="card-title">if / else</div>
<pre><span class="kw">if</span> x > <span class="num">0</span> {
  fmt.<span class="fn">Println</span>(<span class="str">"positive"</span>)
} <span class="kw">else if</span> x < <span class="num">0</span> {
  fmt.<span class="fn">Println</span>(<span class="str">"negative"</span>)
} <span class="kw">else</span> {
  fmt.<span class="fn">Println</span>(<span class="str">"zero"</span>)
}

<span class="cm">// init statement — v scoped to if block</span>
<span class="kw">if</span> v, err := <span class="fn">fetch</span>(); err != <span class="kw">nil</span> {
  <span class="fn">log</span>(err)
} <span class="kw">else</span> {
  fmt.<span class="fn">Println</span>(v)
}</pre>
</div>
<div class="card">
<div class="card-title">for loops</div>
<pre><span class="cm">// classic</span>
<span class="kw">for</span> i := <span class="num">0</span>; i < <span class="num">10</span>; i++ { }

<span class="cm">// while-style</span>
<span class="kw">for</span> n > <span class="num">0</span> { n-- }

<span class="cm">// infinite</span>
<span class="kw">for</span> { }

<span class="cm">// range over slice</span>
<span class="kw">for</span> i, v := <span class="kw">range</span> slice { }

<span class="cm">// range over map</span>
<span class="kw">for</span> k, v := <span class="kw">range</span> m { }

<span class="cm">// range over string (runes)</span>
<span class="kw">for</span> i, r := <span class="kw">range</span> <span class="str">"héllo"</span> { }

<span class="cm">// range over channel</span>
<span class="kw">for</span> v := <span class="kw">range</span> ch { }

<span class="cm">// Go 1.22+ range over int</span>
<span class="kw">for</span> i := <span class="kw">range</span> <span class="num">10</span> { }</pre>
</div>
<div class="card">
<div class="card-title">switch</div>
<pre><span class="cm">// expression switch (no fallthrough by default)</span>
<span class="kw">switch</span> os := runtime.GOOS; os {
<span class="kw">case</span> <span class="str">"darwin"</span>:
  fmt.<span class="fn">Println</span>(<span class="str">"Mac"</span>)
<span class="kw">case</span> <span class="str">"linux"</span>:
  fmt.<span class="fn">Println</span>(<span class="str">"Linux"</span>)
<span class="kw">default</span>:
  fmt.<span class="fn">Println</span>(<span class="str">"other"</span>)
}

<span class="cm">// multi-case</span>
<span class="kw">case</span> <span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>:

<span class="cm">// conditionless (replaces if-else chain)</span>
<span class="kw">switch</span> {
<span class="kw">case</span> t.Hour() < <span class="num">12</span>: fmt.<span class="fn">Println</span>(<span class="str">"AM"</span>)
<span class="kw">default</span>:              fmt.<span class="fn">Println</span>(<span class="str">"PM"</span>)
}

<span class="kw">fallthrough</span> <span class="cm">// explicit fall</span></pre>
</div>
<div class="card">
<div class="card-title">defer / panic / recover</div>
<pre><span class="cm">// defer: LIFO, args evaluated immediately</span>
<span class="kw">defer</span> f.<span class="fn">Close</span>()
<span class="kw">defer</span> fmt.<span class="fn">Println</span>(<span class="str">"done"</span>)

<span class="cm">// panic unwinds stack</span>
<span class="kw">panic</span>(<span class="str">"unrecoverable"</span>)

<span class="cm">// recover only works inside defer</span>
<span class="kw">func</span> <span class="fn">safe</span>() {
  <span class="kw">defer func</span>() {
    <span class="kw">if</span> r := <span class="fn">recover</span>(); r != <span class="kw">nil</span> {
      fmt.<span class="fn">Println</span>(<span class="str">"recovered:"</span>, r)
    }
  }()
  <span class="kw">panic</span>(<span class="str">"oops"</span>)
}</pre>
</div>
<div class="card">
<div class="card-title">goto / labels / break</div>
<pre><span class="cm">// labelled break / continue</span>
outer:
  <span class="kw">for</span> i := <span class="num">0</span>; i < <span class="num">5</span>; i++ {
    <span class="kw">for</span> j := <span class="num">0</span>; j < <span class="num">5</span>; j++ {
      <span class="kw">if</span> j == <span class="num">2</span> { <span class="kw">continue</span> outer }
      <span class="kw">if</span> i == <span class="num">3</span> { <span class="kw">break</span> outer }
    }
  }

<span class="cm">// goto (use sparingly)</span>
  <span class="kw">goto</span> End
End:</pre>
</div>
</div>
`},
{id:'funcs',label:'Functions',content:`
<div class="grid">
<div class="card">
<div class="card-title">Declaration patterns</div>
<pre><span class="cm">// basic</span>
<span class="kw">func</span> <span class="fn">add</span>(a, b <span class="typ">int</span>) <span class="typ">int</span> { <span class="kw">return</span> a + b }

<span class="cm">// multiple returns</span>
<span class="kw">func</span> <span class="fn">divide</span>(a, b <span class="typ">float64</span>) (<span class="typ">float64</span>, <span class="typ">error</span>) {
  <span class="kw">if</span> b == <span class="num">0</span> { <span class="kw">return</span> <span class="num">0</span>, errors.<span class="fn">New</span>(<span class="str">"division by zero"</span>) }
  <span class="kw">return</span> a / b, <span class="kw">nil</span>
}

<span class="cm">// named returns</span>
<span class="kw">func</span> <span class="fn">minMax</span>(a []<span class="typ">int</span>) (min, max <span class="typ">int</span>) {
  min, max = a[<span class="num">0</span>], a[<span class="num">0</span>]
  <span class="kw">for</span> _, v := <span class="kw">range</span> a {
    <span class="kw">if</span> v < min { min = v }
    <span class="kw">if</span> v > max { max = v }
  }
  <span class="kw">return</span> <span class="cm">// naked return</span>
}

<span class="cm">// variadic</span>
<span class="kw">func</span> <span class="fn">sum</span>(nums ...<span class="typ">int</span>) <span class="typ">int</span> {
  total := <span class="num">0</span>
  <span class="kw">for</span> _, n := <span class="kw">range</span> nums { total += n }
  <span class="kw">return</span> total
}
sum(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)
sum(slice...) <span class="cm">// spread</span></pre>
</div>
<div class="card">
<div class="card-title">First-class functions</div>
<pre><span class="cm">// function as value</span>
<span class="kw">var</span> fn <span class="kw">func</span>(<span class="typ">int</span>) <span class="typ">int</span>
fn = <span class="kw">func</span>(x <span class="typ">int</span>) <span class="typ">int</span> { <span class="kw">return</span> x * <span class="num">2</span> }

<span class="cm">// higher-order function</span>
<span class="kw">func</span> <span class="fn">apply</span>(f <span class="kw">func</span>(<span class="typ">int</span>) <span class="typ">int</span>, v <span class="typ">int</span>) <span class="typ">int</span> {
  <span class="kw">return</span> <span class="fn">f</span>(v)
}

<span class="cm">// closure captures env</span>
<span class="kw">func</span> <span class="fn">counter</span>() <span class="kw">func</span>() <span class="typ">int</span> {
  n := <span class="num">0</span>
  <span class="kw">return func</span>() <span class="typ">int</span> { n++; <span class="kw">return</span> n }
}
c := <span class="fn">counter</span>()
c() <span class="cm">// 1</span>
c() <span class="cm">// 2</span>

<span class="cm">// immediately invoked</span>
result := <span class="kw">func</span>(x <span class="typ">int</span>) <span class="typ">int</span> {
  <span class="kw">return</span> x * x
}(<span class="num">5</span>)</pre>
</div>
<div class="card">
<div class="card-title">Method receivers</div>
<pre><span class="kw">type</span> <span class="typ">Rect</span> <span class="kw">struct</span> { W, H <span class="typ">float64</span> }

<span class="cm">// value receiver (copy)</span>
<span class="kw">func</span> (r <span class="typ">Rect</span>) <span class="fn">Area</span>() <span class="typ">float64</span> {
  <span class="kw">return</span> r.W * r.H
}

<span class="cm">// pointer receiver (mutates)</span>
<span class="kw">func</span> (r *<span class="typ">Rect</span>) <span class="fn">Scale</span>(f <span class="typ">float64</span>) {
  r.W *= f; r.H *= f
}

rect := <span class="typ">Rect</span>{W: <span class="num">3</span>, H: <span class="num">4</span>}
rect.<span class="fn">Scale</span>(<span class="num">2</span>) <span class="cm">// auto-addressed</span>
fmt.<span class="fn">Println</span>(rect.<span class="fn">Area</span>()) <span class="cm">// 48</span>

<span class="cm">// method expression</span>
f := <span class="typ">Rect</span>.<span class="fn">Area</span>
f(rect)</pre>
</div>
<div class="card">
<div class="card-title">Functional patterns</div>
<pre><span class="cm">// map</span>
<span class="kw">func</span> <span class="fn">Map</span>[T, U any](s []T, f <span class="kw">func</span>(T) U) []U {
  r := <span class="kw">make</span>([]U, <span class="kw">len</span>(s))
  <span class="kw">for</span> i, v := <span class="kw">range</span> s { r[i] = <span class="fn">f</span>(v) }
  <span class="kw">return</span> r
}

<span class="cm">// filter</span>
<span class="kw">func</span> <span class="fn">Filter</span>[T any](s []T, f <span class="kw">func</span>(T) <span class="typ">bool</span>) []T {
  <span class="kw">var</span> r []T
  <span class="kw">for</span> _, v := <span class="kw">range</span> s {
    <span class="kw">if</span> <span class="fn">f</span>(v) { r = <span class="kw">append</span>(r, v) }
  }
  <span class="kw">return</span> r
}

<span class="cm">// reduce</span>
<span class="kw">func</span> <span class="fn">Reduce</span>[T, U any](s []T, init U, f <span class="kw">func</span>(U, T) U) U {
  acc := init
  <span class="kw">for</span> _, v := <span class="kw">range</span> s { acc = <span class="fn">f</span>(acc, v) }
  <span class="kw">return</span> acc
}</pre>
</div>
</div>
`},
{id:'types',label:'Types & Structs',content:`
<div class="grid">
<div class="card">
<div class="card-title">Structs</div>
<pre><span class="kw">type</span> <span class="typ">Person</span> <span class="kw">struct</span> {
  Name    <span class="typ">string</span>
  Age     <span class="typ">int</span>
  Email   <span class="typ">string</span> <span class="str">\`json:"email,omitempty"\`</span>
}

<span class="cm">// init</span>
p1 := <span class="typ">Person</span>{Name: <span class="str">"Alice"</span>, Age: <span class="num">30</span>}
p2 := <span class="typ">Person</span>{<span class="str">"Bob"</span>, <span class="num">25</span>, <span class="str">""</span>} <span class="cm">// positional</span>
p3 := &<span class="typ">Person</span>{Name: <span class="str">"Carol"</span>}  <span class="cm">// pointer</span>

<span class="cm">// anonymous struct</span>
cfg := <span class="kw">struct</span>{ Host <span class="typ">string</span>; Port <span class="typ">int</span> }{
  Host: <span class="str">"localhost"</span>, Port: <span class="num">8080</span>,
}

<span class="cm">// embedding (composition over inheritance)</span>
<span class="kw">type</span> <span class="typ">Employee</span> <span class="kw">struct</span> {
  <span class="typ">Person</span>              <span class="cm">// embedded, promoted fields</span>
  Department <span class="typ">string</span>
}
e := <span class="typ">Employee</span>{Person: p1}
e.Name <span class="cm">// promoted</span></pre>
</div>
<div class="card">
<div class="card-title">Interfaces</div>
<pre><span class="kw">type</span> <span class="typ">Writer</span> <span class="kw">interface</span> {
  <span class="fn">Write</span>(p []<span class="typ">byte</span>) (<span class="typ">int</span>, <span class="typ">error</span>)
}

<span class="cm">// interface composition</span>
<span class="kw">type</span> <span class="typ">ReadWriter</span> <span class="kw">interface</span> {
  <span class="typ">io.Reader</span>
  <span class="typ">io.Writer</span>
}

<span class="cm">// implicit satisfaction — no "implements"</span>
<span class="kw">type</span> <span class="typ">File</span> <span class="kw">struct</span>{}
<span class="kw">func</span> (f *<span class="typ">File</span>) <span class="fn">Write</span>(p []<span class="typ">byte</span>) (<span class="typ">int</span>, <span class="typ">error</span>) {...}
<span class="kw">var</span> w <span class="typ">Writer</span> = &<span class="typ">File</span>{} <span class="cm">// File satisfies Writer</span>

<span class="cm">// empty interface</span>
<span class="kw">var</span> any <span class="kw">interface</span>{} = <span class="str">"anything"</span>
<span class="kw">var</span> any2 any = <span class="num">42</span> <span class="cm">// Go 1.18+</span>

<span class="cm">// type switch</span>
<span class="kw">switch</span> v := i.(<span class="kw">type</span>) {
<span class="kw">case</span> <span class="typ">int</span>:    fmt.<span class="fn">Printf</span>(<span class="str">"int: %d\n"</span>, v)
<span class="kw">case</span> <span class="typ">string</span>: fmt.<span class="fn">Printf</span>(<span class="str">"string: %s\n"</span>, v)
<span class="kw">default</span>:    fmt.<span class="fn">Printf</span>(<span class="str">"unknown\n"</span>)
}</pre>
</div>
<div class="card">
<div class="card-title">Type aliases &amp; definitions</div>
<pre><span class="cm">// type definition (new named type)</span>
<span class="kw">type</span> <span class="typ">Celsius</span> <span class="typ">float64</span>
<span class="kw">type</span> <span class="typ">Fahrenheit</span> <span class="typ">float64</span>

<span class="kw">func</span> <span class="fn">CtoF</span>(c <span class="typ">Celsius</span>) <span class="typ">Fahrenheit</span> {
  <span class="kw">return</span> <span class="typ">Fahrenheit</span>(c*<span class="num">9</span>/<span class="num">5</span> + <span class="num">32</span>)
}

<span class="cm">// type alias (same type, different name)</span>
<span class="kw">type</span> <span class="typ">MyString</span> = <span class="typ">string</span>

<span class="cm">// comparable / ordered constraints</span>
<span class="kw">type</span> <span class="typ">Number</span> <span class="kw">interface</span> {
  ~<span class="typ">int</span> | ~<span class="typ">int32</span> | ~<span class="typ">int64</span> |
  ~<span class="typ">float32</span> | ~<span class="typ">float64</span>
}</pre>
</div>
<div class="card">
<div class="card-title">Stringer &amp; common interfaces</div>
<pre><span class="cm">// fmt.Stringer</span>
<span class="kw">func</span> (p <span class="typ">Person</span>) <span class="fn">String</span>() <span class="typ">string</span> {
  <span class="kw">return</span> fmt.<span class="fn">Sprintf</span>(<span class="str">"%s (%d)"</span>, p.Name, p.Age)
}

<span class="cm">// error interface</span>
<span class="kw">type</span> <span class="typ">MyError</span> <span class="kw">struct</span> {
  Code <span class="typ">int</span>; Msg <span class="typ">string</span>
}
<span class="kw">func</span> (e *<span class="typ">MyError</span>) <span class="fn">Error</span>() <span class="typ">string</span> {
  <span class="kw">return</span> fmt.<span class="fn">Sprintf</span>(<span class="str">"%d: %s"</span>, e.Code, e.Msg)
}

<span class="cm">// sort.Interface</span>
<span class="kw">type</span> <span class="typ">ByAge</span> []<span class="typ">Person</span>
<span class="kw">func</span> (a <span class="typ">ByAge</span>) <span class="fn">Len</span>() <span class="typ">int</span>           { <span class="kw">return</span> <span class="kw">len</span>(a) }
<span class="kw">func</span> (a <span class="typ">ByAge</span>) <span class="fn">Swap</span>(i, j <span class="typ">int</span>)      { a[i], a[j] = a[j], a[i] }
<span class="kw">func</span> (a <span class="typ">ByAge</span>) <span class="fn">Less</span>(i, j <span class="typ">int</span>) <span class="typ">bool</span> { <span class="kw">return</span> a[i].Age < a[j].Age }</pre>
</div>
</div>
`},
{id:'collections',label:'Collections',content:`
<div class="grid">
<div class="card">
<div class="card-title">Arrays</div>
<pre><span class="cm">// fixed size, value type</span>
<span class="kw">var</span> a [<span class="num">5</span>]<span class="typ">int</span>
b := [<span class="num">3</span>]<span class="typ">string</span>{<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>}
c := [...]<span class="typ">int</span>{<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>} <span class="cm">// compiler counts</span>
<span class="kw">len</span>(c) <span class="cm">// 3</span>

<span class="cm">// 2D array</span>
grid := [<span class="num">3</span>][<span class="num">3</span>]<span class="typ">int</span>{{<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>},{<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>},{<span class="num">7</span>,<span class="num">8</span>,<span class="num">9</span>}}</pre>
</div>
<div class="card">
<div class="card-title">Slices</div>
<pre>s := []<span class="typ">int</span>{<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>}
s = <span class="fn">append</span>(s, <span class="num">4</span>, <span class="num">5</span>)
s = <span class="fn">append</span>(s, other...) <span class="cm">// spread</span>

<span class="cm">// make(type, len, cap)</span>
s2 := <span class="fn">make</span>([]<span class="typ">int</span>, <span class="num">5</span>, <span class="num">10</span>)

<span class="cm">// slicing</span>
s[<span class="num">1</span>:<span class="num">3</span>]  <span class="cm">// [1,3) — shares backing array</span>
s[:<span class="num">3</span>]   <span class="cm">// from 0</span>
s[<span class="num">2</span>:]   <span class="cm">// to end</span>
s[<span class="num">1</span>:<span class="num">3</span>:<span class="num">5</span>] <span class="cm">// full slice expression (cap=4)</span>

<span class="cm">// copy — independent backing array</span>
dst := <span class="fn">make</span>([]<span class="typ">int</span>, <span class="kw">len</span>(src))
<span class="fn">copy</span>(dst, src)

<span class="kw">len</span>(s) <span class="cm">// length</span>
<span class="kw">cap</span>(s) <span class="cm">// capacity</span>

<span class="cm">// delete element at i (order-preserving)</span>
s = <span class="fn">append</span>(s[:<span class="num">i</span>], s[<span class="num">i</span>+<span class="num">1</span>:]...)</pre>
</div>
<div class="card">
<div class="card-title">Maps</div>
<pre>m := <span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">int</span>{<span class="str">"a"</span>: <span class="num">1</span>, <span class="str">"b"</span>: <span class="num">2</span>}
m2 := <span class="fn">make</span>(<span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">int</span>)

m[<span class="str">"c"</span>] = <span class="num">3</span>          <span class="cm">// set</span>
v := m[<span class="str">"a"</span>]         <span class="cm">// get (0 if missing)</span>
v, ok := m[<span class="str">"x"</span>]    <span class="cm">// safe get</span>
<span class="kw">delete</span>(m, <span class="str">"b"</span>)     <span class="cm">// remove</span>
<span class="kw">len</span>(m)              <span class="cm">// count</span>

<span class="cm">// iteration (random order!)</span>
<span class="kw">for</span> k, v := <span class="kw">range</span> m { }

<span class="cm">// nested map</span>
graph := <span class="kw">map</span>[<span class="typ">string</span>]<span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">int</span>{}

<span class="cm">// map of slices</span>
groups := <span class="kw">map</span>[<span class="typ">string</span>][]<span class="typ">int</span>{}</pre>
</div>
<div class="card">
<div class="card-title">slices package (Go 1.21+)</div>
<pre><span class="kw">import</span> <span class="str">"slices"</span>

slices.<span class="fn">Contains</span>(s, v)
slices.<span class="fn">Index</span>(s, v)        <span class="cm">// -1 if not found</span>
slices.<span class="fn">Sort</span>(s)
slices.<span class="fn">SortFunc</span>(s, cmp)
slices.<span class="fn">Reverse</span>(s)
slices.<span class="fn">Compact</span>(s)         <span class="cm">// remove consecutive dups</span>
slices.<span class="fn">Delete</span>(s, i, j)
slices.<span class="fn">Insert</span>(s, i, v...)
slices.<span class="fn">Equal</span>(a, b)
slices.<span class="fn">Max</span>(s) / slices.<span class="fn">Min</span>(s)
slices.<span class="fn">Collect</span>(iter)       <span class="cm">// from iterator</span>

<span class="kw">import</span> <span class="str">"maps"</span>
maps.<span class="fn">Keys</span>(m)               <span class="cm">// iter.Seq</span>
maps.<span class="fn">Values</span>(m)
maps.<span class="fn">Clone</span>(m)
maps.<span class="fn">Delete</span>(m, keys...)</pre>
</div>
</div>
`},
{id:'pointers',label:'Pointers & Memory',content:`
<div class="grid">
<div class="card">
<div class="card-title">Pointers</div>
<pre>x := <span class="num">42</span>
p := &x         <span class="cm">// *int, address of x</span>
fmt.<span class="fn">Println</span>(*p) <span class="cm">// dereference: 42</span>
*p = <span class="num">100</span>        <span class="cm">// modify through pointer</span>

<span class="cm">// new allocates, returns pointer</span>
n := <span class="fn">new</span>(<span class="typ">int</span>)   <span class="cm">// *int pointing to 0</span>
*n = <span class="num">7</span>

<span class="cm">// nil pointer</span>
<span class="kw">var</span> ptr *<span class="typ">int</span>    <span class="cm">// nil</span>
<span class="kw">if</span> ptr != <span class="kw">nil</span> { }

<span class="cm">// no pointer arithmetic in Go</span>
<span class="cm">// use unsafe.Pointer for that</span></pre>
</div>
<div class="card">
<div class="card-title">Value vs pointer semantics</div>
<pre><span class="cm">// value copy</span>
<span class="kw">func</span> <span class="fn">noMutate</span>(p <span class="typ">Person</span>) { p.Name = <span class="str">"x"</span> }

<span class="cm">// pointer mutates caller</span>
<span class="kw">func</span> <span class="fn">mutate</span>(p *<span class="typ">Person</span>) { p.Name = <span class="str">"x"</span> }

<span class="cm">// rule of thumb:
// - use pointer receiver if method mutates
// - use pointer receiver for large structs
// - be consistent within a type
// - small immutable types: value is fine</span></pre>
</div>
<div class="card">
<div class="card-title">Memory model highlights</div>
<pre><span class="cm">// stack vs heap</span>
<span class="cm">// compiler decides via escape analysis</span>
<span class="cm">// go build -gcflags="-m" to inspect</span>

<span class="cm">// zero values</span>
<span class="kw">var</span> i <span class="typ">int</span>     <span class="cm">// 0</span>
<span class="kw">var</span> s <span class="typ">string</span>  <span class="cm">// ""</span>
<span class="kw">var</span> b <span class="typ">bool</span>    <span class="cm">// false</span>
<span class="kw">var</span> p *<span class="typ">int</span>   <span class="cm">// nil</span>
<span class="kw">var</span> sl []<span class="typ">int</span> <span class="cm">// nil (len=0)</span>
<span class="kw">var</span> m <span class="kw">map</span>[<span class="typ">string</span>]<span class="typ">int</span> <span class="cm">// nil (don't write!)</span>
<span class="kw">var</span> fn <span class="kw">func</span>() <span class="cm">// nil</span></pre>
</div>
<div class="card">
<div class="card-title">unsafe package</div>
<pre><span class="kw">import</span> <span class="str">"unsafe"</span>

unsafe.<span class="fn">Sizeof</span>(x)      <span class="cm">// size in bytes</span>
unsafe.<span class="fn">Alignof</span>(x)     <span class="cm">// alignment</span>
unsafe.<span class="fn">Offsetof</span>(s.f)  <span class="cm">// field offset</span>

<span class="cm">// pointer conversion (bypass type system)</span>
p := unsafe.<span class="fn">Pointer</span>(&x)
up := (*<span class="typ">uint64</span>)(p)

<span class="cm">// uintptr for arithmetic (careful!)</span>
addr := uintptr(p) + offset

<span class="cm">// Go 1.17+ slice/string headers</span>
sh := (*reflect.<span class="typ">SliceHeader</span>)(unsafe.<span class="fn">Pointer</span>(&s))</pre>
<div class="warn">⚠ <strong>unsafe breaks GC guarantees.</strong> Use only in low-level code.</div>
</div>
</div>
`},
{id:'errors',label:'Error Handling',content:`
<div class="grid">
<div class="card">
<div class="card-title">Error basics</div>
<pre><span class="cm">// errors.New</span>
<span class="kw">var</span> ErrNotFound = errors.<span class="fn">New</span>(<span class="str">"not found"</span>)

<span class="cm">// fmt.Errorf with %w (wrapping)</span>
err := fmt.<span class="fn">Errorf</span>(<span class="str">"query failed: %w"</span>, dbErr)

<span class="cm">// check</span>
<span class="kw">if</span> err != <span class="kw">nil</span> {
  <span class="kw">return</span> fmt.<span class="fn">Errorf</span>(<span class="str">"op: %w"</span>, err)
}

<span class="cm">// unwrap chain</span>
errors.<span class="fn">Is</span>(err, ErrNotFound)   <span class="cm">// identity check</span>
errors.<span class="fn">As</span>(err, &<span class="kw">var</span>)          <span class="cm">// type check</span>
errors.<span class="fn">Unwrap</span>(err)             <span class="cm">// one level</span></pre>
</div>
<div class="card">
<div class="card-title">Custom error types</div>
<pre><span class="kw">type</span> <span class="typ">ValidationError</span> <span class="kw">struct</span> {
  Field   <span class="typ">string</span>
  Message <span class="typ">string</span>
}

<span class="kw">func</span> (e *<span class="typ">ValidationError</span>) <span class="fn">Error</span>() <span class="typ">string</span> {
  <span class="kw">return</span> fmt.<span class="fn">Sprintf</span>(<span class="str">"validation: %s: %s"</span>,
    e.Field, e.Message)
}

<span class="cm">// sentinel errors</span>
<span class="kw">var</span> (
  ErrTimeout    = errors.<span class="fn">New</span>(<span class="str">"timeout"</span>)
  ErrPermission = errors.<span class="fn">New</span>(<span class="str">"permission denied"</span>)
)

<span class="cm">// type assertion on error</span>
<span class="kw">var</span> ve *<span class="typ">ValidationError</span>
<span class="kw">if</span> errors.<span class="fn">As</span>(err, &ve) {
  fmt.<span class="fn">Println</span>(ve.Field)
}</pre>
</div>
<div class="card">
<div class="card-title">Panic &amp; recover pattern</div>
<pre><span class="cm">// turn panic into error (library boundary)</span>
<span class="kw">func</span> <span class="fn">safeDiv</span>(a, b <span class="typ">int</span>) (result <span class="typ">int</span>, err <span class="typ">error</span>) {
  <span class="kw">defer func</span>() {
    <span class="kw">if</span> r := <span class="fn">recover</span>(); r != <span class="kw">nil</span> {
      err = fmt.<span class="fn">Errorf</span>(<span class="str">"panic: %v"</span>, r)
    }
  }()
  <span class="kw">return</span> a / b, <span class="kw">nil</span>
}

<span class="cm">// must pattern (init-time only)</span>
<span class="kw">func</span> <span class="fn">Must</span>[T any](v T, err <span class="typ">error</span>) T {
  <span class="kw">if</span> err != <span class="kw">nil</span> { <span class="kw">panic</span>(err) }
  <span class="kw">return</span> v
}
re := <span class="fn">Must</span>(regexp.<span class="fn">Compile</span>(<span class="str">\`\d+\`</span>))</pre>
</div>
<div class="card">
<div class="card-title">Error handling patterns</div>
<pre><span class="cm">// inline error check helper</span>
<span class="kw">func</span> <span class="fn">check</span>(err <span class="typ">error</span>) {
  <span class="kw">if</span> err != <span class="kw">nil</span> { <span class="kw">panic</span>(err) }
}

<span class="cm">// error group (multiple errors)</span>
<span class="kw">import</span> <span class="str">"errors"</span>
errs := []<span class="typ">error</span>{err1, err2}
joined := errors.<span class="fn">Join</span>(errs...) <span class="cm">// Go 1.20+</span>

<span class="cm">// context in errors</span>
<span class="kw">return</span> fmt.<span class="fn">Errorf</span>(<span class="str">"ParseUser(%q): %w"</span>, id, err)

<span class="cm">// log and continue vs propagate</span>
<span class="cm">// rule: handle OR return, never both</span></pre>
</div>
</div>
`},
{id:'concurrency',label:'Concurrency',content:`
<div class="grid">
<div class="card">
<div class="card-title">Goroutines</div>
<pre><span class="cm">// launch goroutine</span>
<span class="kw">go func</span>() {
  fmt.<span class="fn">Println</span>(<span class="str">"goroutine"</span>)
}()

<span class="cm">// with WaitGroup</span>
<span class="kw">var</span> wg sync.<span class="typ">WaitGroup</span>
<span class="kw">for</span> _, v := <span class="kw">range</span> items {
  wg.<span class="fn">Add</span>(<span class="num">1</span>)
  <span class="kw">go func</span>(v <span class="typ">string</span>) {
    <span class="kw">defer</span> wg.<span class="fn">Done</span>()
    <span class="fn">process</span>(v)
  }(v) <span class="cm">// capture loop var</span>
}
wg.<span class="fn">Wait</span>()</pre>
</div>
<div class="card">
<div class="card-title">Channels</div>
<pre><span class="cm">// unbuffered (sync)</span>
ch := <span class="fn">make</span>(<span class="kw">chan</span> <span class="typ">int</span>)
<span class="kw">go func</span>() { ch &lt;- <span class="num">42</span> }()
v := &lt;-ch

<span class="cm">// buffered</span>
ch2 := <span class="fn">make</span>(<span class="kw">chan</span> <span class="typ">string</span>, <span class="num">10</span>)

<span class="cm">// directional</span>
<span class="kw">func</span> <span class="fn">producer</span>(out <span class="kw">chan</span>&lt;- <span class="typ">int</span>) {}
<span class="kw">func</span> <span class="fn">consumer</span>(in &lt;-<span class="kw">chan</span> <span class="typ">int</span>) {}

<span class="cm">// close and range</span>
<span class="fn">close</span>(ch)
<span class="kw">for</span> v := <span class="kw">range</span> ch { }

<span class="cm">// non-blocking receive</span>
v, ok := &lt;-ch
<span class="kw">if</span> !ok { <span class="cm">/* closed */</span> }</pre>
</div>
<div class="card">
<div class="card-title">select</div>
<pre><span class="kw">select</span> {
<span class="kw">case</span> v := &lt;-ch1:
  <span class="fn">handle</span>(v)
<span class="kw">case</span> ch2 &lt;- data:
  fmt.<span class="fn">Println</span>(<span class="str">"sent"</span>)
<span class="kw">case</span> &lt;-time.<span class="fn">After</span>(<span class="num">1</span> * time.Second):
  fmt.<span class="fn">Println</span>(<span class="str">"timeout"</span>)
<span class="kw">default</span>:
  fmt.<span class="fn">Println</span>(<span class="str">"non-blocking"</span>)
}

<span class="cm">// done channel pattern</span>
done := <span class="fn">make</span>(<span class="kw">chan</span> <span class="kw">struct</span>{})
<span class="kw">go func</span>() {
  <span class="kw">defer</span> <span class="fn">close</span>(done)
  <span class="cm">// work...</span>
}()
&lt;-done <span class="cm">// wait for completion</span></pre>
</div>
<div class="card">
<div class="card-title">sync primitives</div>
<pre><span class="cm">// Mutex</span>
<span class="kw">var</span> mu sync.<span class="typ">Mutex</span>
mu.<span class="fn">Lock</span>()
<span class="kw">defer</span> mu.<span class="fn">Unlock</span>()

<span class="cm">// RWMutex</span>
<span class="kw">var</span> rw sync.<span class="typ">RWMutex</span>
rw.<span class="fn">RLock</span>() / rw.<span class="fn">RUnlock</span>()   <span class="cm">// read</span>
rw.<span class="fn">Lock</span>() / rw.<span class="fn">Unlock</span>()      <span class="cm">// write</span>

<span class="cm">// Once</span>
<span class="kw">var</span> once sync.<span class="typ">Once</span>
once.<span class="fn">Do</span>(<span class="kw">func</span>() { <span class="fn">init</span>() })

<span class="cm">// atomic operations</span>
<span class="kw">var</span> counter <span class="typ">int64</span>
atomic.<span class="fn">AddInt64</span>(&counter, <span class="num">1</span>)
atomic.<span class="fn">LoadInt64</span>(&counter)
atomic.<span class="fn">StoreInt64</span>(&counter, <span class="num">0</span>)
atomic.<span class="fn">CompareAndSwapInt64</span>(&counter, old, new)

<span class="cm">// sync.Map (concurrent map)</span>
<span class="kw">var</span> sm sync.<span class="typ">Map</span>
sm.<span class="fn">Store</span>(key, val)
sm.<span class="fn">Load</span>(key)
sm.<span class="fn">Delete</span>(key)</pre>
</div>
<div class="card">
<div class="card-title">Context</div>
<pre><span class="kw">import</span> <span class="str">"context"</span>

<span class="cm">// backgrounds</span>
ctx := context.<span class="fn">Background</span>()
ctx2 := context.<span class="fn">TODO</span>()

<span class="cm">// cancellation</span>
ctx, cancel := context.<span class="fn">WithCancel</span>(ctx)
<span class="kw">defer</span> <span class="fn">cancel</span>()

<span class="cm">// timeout / deadline</span>
ctx, cancel := context.<span class="fn">WithTimeout</span>(ctx, <span class="num">5</span>*time.Second)
ctx, cancel := context.<span class="fn">WithDeadline</span>(ctx, t)

<span class="cm">// key-value (use typed key)</span>
<span class="kw">type</span> <span class="typ">ctxKey</span> <span class="typ">string</span>
ctx = context.<span class="fn">WithValue</span>(ctx, <span class="typ">ctxKey</span>(<span class="str">"user"</span>), u)
val := ctx.<span class="fn">Value</span>(<span class="typ">ctxKey</span>(<span class="str">"user"</span>))

<span class="cm">// check cancellation</span>
<span class="kw">select</span> {
<span class="kw">case</span> &lt;-ctx.<span class="fn">Done</span>():
  <span class="kw">return</span> ctx.<span class="fn">Err</span>()
<span class="kw">default</span>:
}</pre>
</div>
<div class="card">
<div class="card-title">Patterns</div>
<pre><span class="cm">// fan-out / fan-in</span>
<span class="kw">func</span> <span class="fn">merge</span>(cs ...&lt;-<span class="kw">chan</span> <span class="typ">int</span>) &lt;-<span class="kw">chan</span> <span class="typ">int</span> {
  out := <span class="fn">make</span>(<span class="kw">chan</span> <span class="typ">int</span>)
  <span class="kw">var</span> wg sync.<span class="typ">WaitGroup</span>
  <span class="kw">for</span> _, c := <span class="kw">range</span> cs {
    wg.<span class="fn">Add</span>(<span class="num">1</span>)
    <span class="kw">go func</span>(c &lt;-<span class="kw">chan</span> <span class="typ">int</span>) {
      <span class="kw">defer</span> wg.<span class="fn">Done</span>()
      <span class="kw">for</span> v := <span class="kw">range</span> c { out &lt;- v }
    }(c)
  }
  <span class="kw">go func</span>() { wg.<span class="fn">Wait</span>(); <span class="fn">close</span>(out) }()
  <span class="kw">return</span> out
}

<span class="cm">// semaphore via buffered chan</span>
sem := <span class="fn">make</span>(<span class="kw">chan</span> <span class="kw">struct</span>{}, <span class="num">5</span>)
sem &lt;- <span class="kw">struct</span>{}{}
<span class="kw">defer</span> <span class="kw">func</span>() { &lt;-sem }()</pre>
</div>
</div>
`},
{id:'generics',label:'Generics',content:`
<div class="grid">
<div class="card">
<div class="card-title">Type parameters</div>
<pre><span class="cm">// generic function</span>
<span class="kw">func</span> <span class="fn">Min</span>[T constraints.Ordered](a, b T) T {
  <span class="kw">if</span> a &lt; b { <span class="kw">return</span> a }
  <span class="kw">return</span> b
}
<span class="fn">Min</span>[<span class="typ">int</span>](<span class="num">3</span>, <span class="num">5</span>)    <span class="cm">// explicit</span>
<span class="fn">Min</span>(<span class="num">3.0</span>, <span class="num">5.0</span>)   <span class="cm">// inferred</span>

<span class="cm">// multiple type params</span>
<span class="kw">func</span> <span class="fn">Map</span>[K comparable, V any](
  m <span class="kw">map</span>[K]V, f <span class="kw">func</span>(V) V,
) <span class="kw">map</span>[K]V {
  out := <span class="fn">make</span>(<span class="kw">map</span>[K]V, <span class="kw">len</span>(m))
  <span class="kw">for</span> k, v := <span class="kw">range</span> m { out[k] = <span class="fn">f</span>(v) }
  <span class="kw">return</span> out
}</pre>
</div>
<div class="card">
<div class="card-title">Generic types</div>
<pre><span class="cm">// generic stack</span>
<span class="kw">type</span> <span class="typ">Stack</span>[T any] <span class="kw">struct</span> {
  items []T
}

<span class="kw">func</span> (s *<span class="typ">Stack</span>[T]) <span class="fn">Push</span>(v T) {
  s.items = <span class="fn">append</span>(s.items, v)
}

<span class="kw">func</span> (s *<span class="typ">Stack</span>[T]) <span class="fn">Pop</span>() (T, <span class="typ">bool</span>) {
  <span class="kw">var</span> zero T
  <span class="kw">if</span> <span class="kw">len</span>(s.items) == <span class="num">0</span> {
    <span class="kw">return</span> zero, <span class="kw">false</span>
  }
  n := <span class="kw">len</span>(s.items) - <span class="num">1</span>
  v := s.items[n]
  s.items = s.items[:n]
  <span class="kw">return</span> v, <span class="kw">true</span>
}

stk := &<span class="typ">Stack</span>[<span class="typ">string</span>]{}
stk.<span class="fn">Push</span>(<span class="str">"hello"</span>)</pre>
</div>
<div class="card">
<div class="card-title">Constraints</div>
<pre><span class="kw">import</span> <span class="str">"golang.org/x/exp/constraints"</span>

<span class="cm">// built-in</span>
any          <span class="cm">// == interface{}</span>
comparable   <span class="cm">// supports == !=</span>

<span class="cm">// from constraints package</span>
constraints.Ordered  <span class="cm">// < > <= >=</span>
constraints.Integer
constraints.Float
constraints.Signed
constraints.Unsigned
constraints.Complex

<span class="cm">// custom constraint</span>
<span class="kw">type</span> <span class="typ">Numeric</span> <span class="kw">interface</span> {
  ~<span class="typ">int</span> | ~<span class="typ">int64</span> | ~<span class="typ">float64</span>
}

<span class="cm">// ~ means "underlying type"</span>
<span class="kw">type</span> <span class="typ">MyInt</span> <span class="typ">int</span>
<span class="cm">// ~int includes MyInt</span></pre>
</div>
<div class="card">
<div class="card-title">Generic result type</div>
<pre><span class="kw">type</span> <span class="typ">Result</span>[T any] <span class="kw">struct</span> {
  Value T
  Err   <span class="typ">error</span>
}

<span class="kw">func</span> <span class="fn">Ok</span>[T any](v T) <span class="typ">Result</span>[T] {
  <span class="kw">return</span> <span class="typ">Result</span>[T]{Value: v}
}

<span class="kw">func</span> <span class="fn">Err</span>[T any](e <span class="typ">error</span>) <span class="typ">Result</span>[T] {
  <span class="kw">return</span> <span class="typ">Result</span>[T]{Err: e}
}

<span class="kw">func</span> (r <span class="typ">Result</span>[T]) <span class="fn">Unwrap</span>() T {
  <span class="kw">if</span> r.Err != <span class="kw">nil</span> { <span class="kw">panic</span>(r.Err) }
  <span class="kw">return</span> r.Value
}</pre>
</div>
</div>
`},
{id:'io',label:'I/O & Files',content:`
<div class="grid">
<div class="card">
<div class="card-title">fmt package</div>
<pre><span class="cm">// print</span>
fmt.<span class="fn">Print</span>(<span class="str">"no newline"</span>)
fmt.<span class="fn">Println</span>(<span class="str">"with newline"</span>)
fmt.<span class="fn">Printf</span>(<span class="str">"%s is %d"</span>, name, age)

<span class="cm">// format verbs</span>
<span class="str">%v</span>  <span class="cm">default</span>       <span class="str">%+v</span> <span class="cm">struct fields</span>
<span class="str">%#v</span> <span class="cm">Go syntax</span>    <span class="str">%T</span>  <span class="cm">type</span>
<span class="str">%d</span>  <span class="cm">int</span>           <span class="str">%05d</span> <span class="cm">padded</span>
<span class="str">%f</span>  <span class="cm">float</span>        <span class="str">%.2f</span> <span class="cm">2 decimals</span>
<span class="str">%s</span>  <span class="cm">string</span>       <span class="str">%q</span>   <span class="cm">quoted</span>
<span class="str">%x</span>  <span class="cm">hex</span>          <span class="str">%b</span>   <span class="cm">binary</span>
<span class="str">%p</span>  <span class="cm">pointer</span>      <span class="str">%t</span>   <span class="cm">bool</span>
<span class="str">%e</span>  <span class="cm">scientific</span>

<span class="cm">// to string</span>
s := fmt.<span class="fn">Sprintf</span>(<span class="str">"%d"</span>, n)
<span class="cm">// to stderr</span>
fmt.<span class="fn">Fprintf</span>(os.Stderr, <span class="str">"err: %v\n"</span>, err)</pre>
</div>
<div class="card">
<div class="card-title">File operations</div>
<pre><span class="cm">// read entire file</span>
data, err := os.<span class="fn">ReadFile</span>(<span class="str">"file.txt"</span>)

<span class="cm">// write file</span>
err = os.<span class="fn">WriteFile</span>(<span class="str">"out.txt"</span>, data, <span class="num">0644</span>)

<span class="cm">// open for streaming</span>
f, err := os.<span class="fn">Open</span>(<span class="str">"file.txt"</span>)   <span class="cm">// read-only</span>
<span class="kw">defer</span> f.<span class="fn">Close</span>()

f2, err := os.<span class="fn">Create</span>(<span class="str">"out.txt"</span>) <span class="cm">// create/truncate</span>
f3, err := os.<span class="fn">OpenFile</span>(<span class="str">"a.txt"</span>,
  os.O_APPEND|os.O_CREATE|os.O_WRONLY, <span class="num">0644</span>)

<span class="cm">// stat</span>
info, err := os.<span class="fn">Stat</span>(<span class="str">"file.txt"</span>)
info.<span class="fn">Size</span>(); info.<span class="fn">IsDir</span>(); info.<span class="fn">ModTime</span>()

<span class="cm">// mkdir</span>
os.<span class="fn">Mkdir</span>(<span class="str">"dir"</span>, <span class="num">0755</span>)
os.<span class="fn">MkdirAll</span>(<span class="str">"a/b/c"</span>, <span class="num">0755</span>)</pre>
</div>
<div class="card">
<div class="card-title">bufio — buffered I/O</div>
<pre><span class="cm">// read lines</span>
scanner := bufio.<span class="fn">NewScanner</span>(f)
<span class="kw">for</span> scanner.<span class="fn">Scan</span>() {
  fmt.<span class="fn">Println</span>(scanner.<span class="fn">Text</span>())
}

<span class="cm">// scanner with split</span>
scanner.<span class="fn">Split</span>(bufio.ScanWords)

<span class="cm">// buffered writer</span>
w := bufio.<span class="fn">NewWriter</span>(f)
w.<span class="fn">WriteString</span>(<span class="str">"line\n"</span>)
<span class="kw">defer</span> w.<span class="fn">Flush</span>() <span class="cm">// don't forget!</span>

<span class="cm">// buffered reader</span>
r := bufio.<span class="fn">NewReader</span>(f)
line, err := r.<span class="fn">ReadString</span>('\n')</pre>
</div>
<div class="card">
<div class="card-title">io package</div>
<pre><span class="cm">// copy</span>
n, err := io.<span class="fn">Copy</span>(dst, src)
io.<span class="fn">CopyN</span>(dst, src, <span class="num">1024</span>)

<span class="cm">// read all</span>
data, err := io.<span class="fn">ReadAll</span>(r)

<span class="cm">// discard</span>
io.<span class="fn">Copy</span>(io.Discard, body)

<span class="cm">// strings reader</span>
r := strings.<span class="fn">NewReader</span>(<span class="str">"hello"</span>)

<span class="cm">// bytes buffer</span>
<span class="kw">var</span> buf bytes.<span class="typ">Buffer</span>
buf.<span class="fn">WriteString</span>(<span class="str">"hello"</span>)
buf.<span class="fn">WriteByte</span>('<span class="str"> '</span>')
s := buf.<span class="fn">String</span>()

<span class="cm">// pipe</span>
pr, pw := io.<span class="fn">Pipe</span>()
<span class="kw">go</span> pw.<span class="fn">Write</span>(data)
io.<span class="fn">Copy</span>(dst, pr)</pre>
</div>
</div>
`},
{id:'json',label:'JSON & Encoding',content:`
<div class="grid">
<div class="card">
<div class="card-title">Encoding / Decoding</div>
<pre><span class="kw">import</span> <span class="str">"encoding/json"</span>

<span class="kw">type</span> <span class="typ">User</span> <span class="kw">struct</span> {
  Name  <span class="typ">string</span> <span class="str">\`json:"name"\`</span>
  Email <span class="typ">string</span> <span class="str">\`json:"email,omitempty"\`</span>
  Pass  <span class="typ">string</span> <span class="str">\`json:"-"\`</span>         <span class="cm">// skip</span>
  Age   <span class="typ">int</span>    <span class="str">\`json:"age,string"\`</span>  <span class="cm">// as string</span>
}

<span class="cm">// marshal</span>
data, err := json.<span class="fn">Marshal</span>(user)
pretty, _ := json.<span class="fn">MarshalIndent</span>(user, <span class="str">""</span>, <span class="str">"  "</span>)

<span class="cm">// unmarshal</span>
<span class="kw">var</span> u <span class="typ">User</span>
err = json.<span class="fn">Unmarshal</span>(data, &u)

<span class="cm">// streaming encoder</span>
enc := json.<span class="fn">NewEncoder</span>(w)
enc.<span class="fn">SetIndent</span>(<span class="str">""</span>, <span class="str">"  "</span>)
enc.<span class="fn">Encode</span>(user)

<span class="cm">// streaming decoder</span>
dec := json.<span class="fn">NewDecoder</span>(r)
dec.<span class="fn">Decode</span>(&u)</pre>
</div>
<div class="card">
<div class="card-title">Dynamic JSON</div>
<pre><span class="cm">// arbitrary json</span>
<span class="kw">var</span> data <span class="kw">map</span>[<span class="typ">string</span>]<span class="kw">interface</span>{}
json.<span class="fn">Unmarshal</span>(raw, &data)

<span class="cm">// json.RawMessage — defer parsing</span>
<span class="kw">type</span> <span class="typ">Event</span> <span class="kw">struct</span> {
  Type    <span class="typ">string</span>          <span class="str">\`json:"type"\`</span>
  Payload json.<span class="typ">RawMessage</span> <span class="str">\`json:"payload"\`</span>
}

<span class="cm">// custom marshaler</span>
<span class="kw">func</span> (t <span class="typ">MyTime</span>) <span class="fn">MarshalJSON</span>() ([]<span class="typ">byte</span>, <span class="typ">error</span>) {
  <span class="kw">return</span> json.<span class="fn">Marshal</span>(t.Format(time.RFC3339))
}
<span class="kw">func</span> (t *<span class="typ">MyTime</span>) <span class="fn">UnmarshalJSON</span>(data []<span class="typ">byte</span>) <span class="typ">error</span> {
  <span class="kw">var</span> s <span class="typ">string</span>
  <span class="kw">if</span> err := json.<span class="fn">Unmarshal</span>(data, &s); err != <span class="kw">nil</span> {
    <span class="kw">return</span> err
  }
  *t, _ = <span class="fn">time.Parse</span>(time.RFC3339, s)
  <span class="kw">return nil</span>
}</pre>
</div>
<div class="card">
<div class="card-title">Other encodings</div>
<pre><span class="kw">import</span> <span class="str">"encoding/base64"</span>
enc := base64.<span class="fn">StdEncoding.EncodeToString</span>(data)
dec, _ := base64.<span class="fn">StdEncoding.DecodeString</span>(enc)

<span class="kw">import</span> <span class="str">"encoding/csv"</span>
w := csv.<span class="fn">NewWriter</span>(file)
w.<span class="fn">Write</span>([]<span class="typ">string</span>{<span class="str">"a"</span>, <span class="str">"b"</span>})
w.<span class="fn">Flush</span>()

<span class="kw">import</span> <span class="str">"encoding/xml"</span>
<span class="kw">type</span> <span class="typ">Book</span> <span class="kw">struct</span> {
  Title <span class="typ">string</span> <span class="str">\`xml:"title,attr"\`</span>
}
xml.<span class="fn">Marshal</span>(book)
xml.<span class="fn">Unmarshal</span>(data, &book)

<span class="kw">import</span> <span class="str">"encoding/binary"</span>
binary.LittleEndian.<span class="fn">Uint64</span>(b)
binary.BigEndian.<span class="fn">PutUint32</span>(b, n)</pre>
</div>
</div>
`},
{id:'http',label:'HTTP',content:`
<div class="grid">
<div class="card">
<div class="card-title">HTTP Client</div>
<pre>client := &http.<span class="typ">Client</span>{
  Timeout: <span class="num">10</span> * time.Second,
}

<span class="cm">// GET</span>
resp, err := client.<span class="fn">Get</span>(<span class="str">"https://api.example.com"</span>)
<span class="kw">defer</span> resp.Body.<span class="fn">Close</span>()
body, _ := io.<span class="fn">ReadAll</span>(resp.Body)

<span class="cm">// POST JSON</span>
buf := bytes.<span class="fn">NewBuffer</span>(payload)
req, _ := http.<span class="fn">NewRequestWithContext</span>(ctx,
  http.MethodPost, url, buf)
req.Header.<span class="fn">Set</span>(<span class="str">"Content-Type"</span>, <span class="str">"application/json"</span>)
req.Header.<span class="fn">Set</span>(<span class="str">"Authorization"</span>, <span class="str">"Bearer "+token</span>)

resp, err = client.<span class="fn">Do</span>(req)
fmt.<span class="fn">Println</span>(resp.StatusCode)</pre>
</div>
<div class="card">
<div class="card-title">HTTP Server</div>
<pre><span class="cm">// basic handler</span>
http.<span class="fn">HandleFunc</span>(<span class="str">"/hello"</span>, <span class="kw">func</span>(w http.<span class="typ">ResponseWriter</span>, r *http.<span class="typ">Request</span>) {
  fmt.<span class="fn">Fprintln</span>(w, <span class="str">"Hello, world"</span>)
})

<span class="cm">// with ServeMux</span>
mux := http.<span class="fn">NewServeMux</span>()
mux.<span class="fn">HandleFunc</span>(<span class="str">"GET /users/{id}"</span>, <span class="fn">getUser</span>) <span class="cm">// 1.22+</span>
mux.<span class="fn">Handle</span>(<span class="str">"/static/"</span>, http.<span class="fn">StripPrefix</span>(<span class="str">"/static"</span>,
  http.<span class="fn">FileServer</span>(http.<span class="fn">Dir</span>(<span class="str">"./public"</span>))))

srv := &http.<span class="typ">Server</span>{
  Addr:         <span class="str">":8080"</span>,
  Handler:      mux,
  ReadTimeout:  <span class="num">5</span> * time.Second,
  WriteTimeout: <span class="num">10</span> * time.Second,
  IdleTimeout:  <span class="num">120</span> * time.Second,
}
log.<span class="fn">Fatal</span>(srv.<span class="fn">ListenAndServe</span>())</pre>
</div>
<div class="card">
<div class="card-title">Request / Response</div>
<pre><span class="cm">// path param (Go 1.22+)</span>
id := r.<span class="fn">PathValue</span>(<span class="str">"id"</span>)

<span class="cm">// query params</span>
q := r.URL.Query().<span class="fn">Get</span>(<span class="str">"page"</span>)

<span class="cm">// body decode</span>
<span class="kw">var</span> payload <span class="typ">CreateUserReq</span>
json.<span class="fn">NewDecoder</span>(r.Body).<span class="fn">Decode</span>(&payload)

<span class="cm">// write JSON response</span>
w.Header().<span class="fn">Set</span>(<span class="str">"Content-Type"</span>, <span class="str">"application/json"</span>)
w.<span class="fn">WriteHeader</span>(http.StatusCreated)
json.<span class="fn">NewEncoder</span>(w).<span class="fn">Encode</span>(resp)

<span class="cm">// error response</span>
http.<span class="fn">Error</span>(w, <span class="str">"not found"</span>, http.StatusNotFound)</pre>
</div>
<div class="card">
<div class="card-title">Middleware pattern</div>
<pre><span class="kw">type</span> <span class="typ">Middleware</span> = <span class="kw">func</span>(http.<span class="typ">Handler</span>) http.<span class="typ">Handler</span>

<span class="kw">func</span> <span class="fn">Logger</span>(next http.<span class="typ">Handler</span>) http.<span class="typ">Handler</span> {
  <span class="kw">return</span> http.<span class="fn">HandlerFunc</span>(<span class="kw">func</span>(
    w http.<span class="typ">ResponseWriter</span>,
    r *http.<span class="typ">Request</span>,
  ) {
    start := time.<span class="fn">Now</span>()
    next.<span class="fn">ServeHTTP</span>(w, r)
    log.<span class="fn">Printf</span>(<span class="str">"%s %s %v"</span>, r.Method,
      r.URL.Path, time.<span class="fn">Since</span>(start))
  })
}

<span class="cm">// chain</span>
handler := <span class="fn">Logger</span>(<span class="fn">Auth</span>(<span class="fn">RateLimit</span>(mux)))</pre>
</div>
<div class="card">
<div class="card-title">Graceful shutdown</div>
<pre>quit := <span class="fn">make</span>(<span class="kw">chan</span> os.<span class="typ">Signal</span>, <span class="num">1</span>)
signal.<span class="fn">Notify</span>(quit, syscall.SIGINT, syscall.SIGTERM)
&lt;-quit

ctx, cancel := context.<span class="fn">WithTimeout</span>(
  context.<span class="fn">Background</span>(), <span class="num">30</span>*time.Second)
<span class="kw">defer</span> <span class="fn">cancel</span>()

<span class="kw">if</span> err := srv.<span class="fn">Shutdown</span>(ctx); err != <span class="kw">nil</span> {
  log.<span class="fn">Fatal</span>(<span class="str">"forced shutdown:"</span>, err)
}</span></pre>
</div>
</div>
`},
{id:'testing',label:'Testing',content:`
<div class="grid">
<div class="card">
<div class="card-title">Unit tests</div>
<pre><span class="cm">// file: add_test.go</span>
<span class="kw">package</span> mypackage

<span class="kw">import</span> <span class="str">"testing"</span>

<span class="kw">func</span> <span class="fn">TestAdd</span>(t *testing.<span class="typ">T</span>) {
  got := <span class="fn">Add</span>(<span class="num">2</span>, <span class="num">3</span>)
  want := <span class="num">5</span>
  <span class="kw">if</span> got != want {
    t.<span class="fn">Errorf</span>(<span class="str">"Add(2,3) = %d, want %d"</span>, got, want)
  }
}

<span class="cm">// t.Error/Errorf  – fail, continue</span>
<span class="cm">// t.Fatal/Fatalf  – fail, stop</span>
<span class="cm">// t.Log/Logf      – verbose output</span>
<span class="cm">// t.Skip          – skip test</span>
<span class="cm">// t.Parallel()    – run in parallel</span>
<span class="cm">// t.Helper()      – mark helper func</span>
<span class="cm">// t.Cleanup(f)    – teardown</span></pre>
</div>
<div class="card">
<div class="card-title">Table-driven tests</div>
<pre><span class="kw">func</span> <span class="fn">TestDiv</span>(t *testing.<span class="typ">T</span>) {
  tests := []<span class="kw">struct</span> {
    name    <span class="typ">string</span>
    a, b    <span class="typ">float64</span>
    want    <span class="typ">float64</span>
    wantErr <span class="typ">bool</span>
  }{
    {<span class="str">"normal"</span>, <span class="num">10</span>, <span class="num">2</span>, <span class="num">5</span>, <span class="kw">false</span>},
    {<span class="str">"zero div"</span>, <span class="num">1</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="kw">true</span>},
  }

  <span class="kw">for</span> _, tc := <span class="kw">range</span> tests {
    t.<span class="fn">Run</span>(tc.name, <span class="kw">func</span>(t *testing.<span class="typ">T</span>) {
      got, err := <span class="fn">Div</span>(tc.a, tc.b)
      <span class="kw">if</span> (err != <span class="kw">nil</span>) != tc.wantErr {
        t.<span class="fn">Fatalf</span>(<span class="str">"err = %v, wantErr %v"</span>, err, tc.wantErr)
      }
      <span class="kw">if</span> !tc.wantErr && got != tc.want {
        t.<span class="fn">Errorf</span>(<span class="str">"= %v, want %v"</span>, got, tc.want)
      }
    })
  }
}</pre>
</div>
<div class="card">
<div class="card-title">Benchmarks &amp; fuzzing</div>
<pre><span class="cm">// benchmark</span>
<span class="kw">func</span> <span class="fn">BenchmarkSort</span>(b *testing.<span class="typ">B</span>) {
  data := <span class="fn">generateData</span>(<span class="num">1000</span>)
  b.<span class="fn">ResetTimer</span>()
  <span class="kw">for</span> range b.N {
    slices.<span class="fn">Sort</span>(slices.<span class="fn">Clone</span>(data))
  }
}
<span class="cm">// go test -bench=. -benchmem</span>

<span class="cm">// fuzz (Go 1.18+)</span>
<span class="kw">func</span> <span class="fn">FuzzReverse</span>(f *testing.<span class="typ">F</span>) {
  f.<span class="fn">Add</span>(<span class="str">"hello"</span>)
  f.<span class="fn">Fuzz</span>(<span class="kw">func</span>(t *testing.<span class="typ">T</span>, s <span class="typ">string</span>) {
    out := <span class="fn">Reverse</span>(s)
    <span class="kw">if</span> <span class="fn">Reverse</span>(out) != s {
      t.<span class="fn">Fail</span>()
    }
  })
}
<span class="cm">// go test -fuzz=FuzzReverse</span></pre>
</div>
<div class="card">
<div class="card-title">Mocking &amp; test helpers</div>
<pre><span class="cm">// interface mocking</span>
<span class="kw">type</span> <span class="typ">DB</span> <span class="kw">interface</span> {
  <span class="fn">GetUser</span>(id <span class="typ">string</span>) (*<span class="typ">User</span>, <span class="typ">error</span>)
}

<span class="kw">type</span> <span class="typ">MockDB</span> <span class="kw">struct</span> {
  <span class="fn">GetUserFn</span> <span class="kw">func</span>(<span class="typ">string</span>) (*<span class="typ">User</span>, <span class="typ">error</span>)
}

<span class="kw">func</span> (m *<span class="typ">MockDB</span>) <span class="fn">GetUser</span>(id <span class="typ">string</span>) (*<span class="typ">User</span>, <span class="typ">error</span>) {
  <span class="kw">return</span> m.<span class="fn">GetUserFn</span>(id)
}

<span class="cm">// httptest</span>
srv := httptest.<span class="fn">NewServer</span>(handler)
<span class="kw">defer</span> srv.<span class="fn">Close</span>()
resp, _ := http.<span class="fn">Get</span>(srv.URL + <span class="str">"/api"</span>)

rr := httptest.<span class="fn">NewRecorder</span>()
handler.<span class="fn">ServeHTTP</span>(rr, req)
<span class="kw">if</span> rr.Code != http.StatusOK { }</pre>
</div>
</div>
`},
{id:'modules',label:'Modules & Tooling',content:`
<div class="grid">
<div class="card">
<div class="card-title">Go modules</div>
<pre><span class="cm">// init module</span>
go mod init github.com/user/repo

<span class="cm">// add dependency</span>
go get github.com/pkg/errors@v0.9.1

<span class="cm">// update all</span>
go get -u ./...

<span class="cm">// tidy (remove unused, add missing)</span>
go mod tidy

<span class="cm">// vendor dependencies</span>
go mod vendor

<span class="cm">// workspace (go.work)</span>
go work init ./moduleA ./moduleB

<span class="cm">// replace directive (go.mod)</span>
<span class="kw">require</span> github.com/foo/bar v1.2.3
<span class="kw">replace</span> github.com/foo/bar => ../local/bar</pre>
</div>
<div class="card">
<div class="card-title">Build &amp; run</div>
<pre>go run main.go
go run .
go build -o myapp .
go build -ldflags="-s -w" .   <span class="cm"># strip debug</span>

<span class="cm"># cross-compile</span>
GOOS=linux GOARCH=amd64 go build .
GOOS=windows GOARCH=amd64 go build .
GOOS=darwin GOARCH=arm64 go build .

<span class="cm"># race detector</span>
go run -race main.go
go test -race ./...

<span class="cm"># generate (runs go:generate directives)</span>
go generate ./...

<span class="cm"># vet (static analysis)</span>
go vet ./...

<span class="cm"># work with build constraints</span>
<span class="cm">//go:build linux && amd64</span></pre>
</div>
<div class="card">
<div class="card-title">Testing commands</div>
<pre>go test ./...                   <span class="cm"># all packages</span>
go test -v ./...                <span class="cm"># verbose</span>
go test -run TestName ./...     <span class="cm"># filter</span>
go test -count=1 ./...          <span class="cm"># no cache</span>
go test -cover ./...            <span class="cm"># coverage</span>
go test -coverprofile=c.out ./...
go tool cover -html=c.out
go test -bench=. -benchmem ./...
go test -timeout 30s ./...
go test -short ./...            <span class="cm"># skip slow</span></pre>
</div>
<div class="card">
<div class="card-title">go:generate &amp; embed</div>
<pre><span class="cm">//go:generate stringer -type=Direction</span>
<span class="cm">//go:generate mockgen -source=db.go</span>

<span class="cm">// embed files at compile time</span>
<span class="kw">import</span> _ <span class="str">"embed"</span>

<span class="cm">//go:embed config.json</span>
<span class="kw">var</span> configData []<span class="typ">byte</span>

<span class="cm">//go:embed templates/*</span>
<span class="kw">var</span> templates embed.<span class="typ">FS</span>

data, _ := templates.<span class="fn">ReadFile</span>(<span class="str">"templates/index.html"</span>)</pre>
</div>
<div class="card">
<div class="card-title">pprof profiling</div>
<pre><span class="kw">import</span> _ <span class="str">"net/http/pprof"</span>

<span class="cm">// add to server, then:</span>
go tool pprof http://localhost:6060/debug/pprof/profile
go tool pprof http://localhost:6060/debug/pprof/heap

<span class="cm">// manual CPU profile</span>
f, _ := os.<span class="fn">Create</span>(<span class="str">"cpu.prof"</span>)
pprof.<span class="fn">StartCPUProfile</span>(f)
<span class="kw">defer</span> pprof.<span class="fn">StopCPUProfile</span>()

<span class="cm">// trace</span>
f, _ := os.<span class="fn">Create</span>(<span class="str">"trace.out"</span>)
trace.<span class="fn">Start</span>(f)
<span class="kw">defer</span> trace.<span class="fn">Stop</span>()
<span class="cm">// go tool trace trace.out</span></pre>
</div>
</div>
`},
{id:'patterns',label:'Patterns',content:`
<div class="grid">
<div class="card">
<div class="card-title">Options pattern</div>
<pre><span class="kw">type</span> <span class="typ">Server</span> <span class="kw">struct</span> {
  host    <span class="typ">string</span>
  port    <span class="typ">int</span>
  timeout <span class="typ">time.Duration</span>
}
<span class="kw">type</span> <span class="typ">Option</span> <span class="kw">func</span>(*<span class="typ">Server</span>)

<span class="kw">func</span> <span class="fn">WithHost</span>(h <span class="typ">string</span>) <span class="typ">Option</span> {
  <span class="kw">return func</span>(s *<span class="typ">Server</span>) { s.host = h }
}
<span class="kw">func</span> <span class="fn">WithPort</span>(p <span class="typ">int</span>) <span class="typ">Option</span> {
  <span class="kw">return func</span>(s *<span class="typ">Server</span>) { s.port = p }
}
<span class="kw">func</span> <span class="fn">NewServer</span>(opts ...<span class="typ">Option</span>) *<span class="typ">Server</span> {
  s := &<span class="typ">Server</span>{host: <span class="str">"localhost"</span>, port: <span class="num">8080</span>}
  <span class="kw">for</span> _, o := <span class="kw">range</span> opts { <span class="fn">o</span>(s) }
  <span class="kw">return</span> s
}
srv := <span class="fn">NewServer</span>(<span class="fn">WithPort</span>(<span class="num">9090</span>))</pre>
</div>
<div class="card">
<div class="card-title">Builder pattern</div>
<pre><span class="kw">type</span> <span class="typ">QueryBuilder</span> <span class="kw">struct</span> {
  table  <span class="typ">string</span>
  wheres []<span class="typ">string</span>
  limit  <span class="typ">int</span>
}
<span class="kw">func</span> <span class="fn">NewQuery</span>(t <span class="typ">string</span>) *<span class="typ">QueryBuilder</span> {
  <span class="kw">return</span> &<span class="typ">QueryBuilder</span>{table: t}
}
<span class="kw">func</span> (q *<span class="typ">QueryBuilder</span>) <span class="fn">Where</span>(cond <span class="typ">string</span>) *<span class="typ">QueryBuilder</span> {
  q.wheres = <span class="fn">append</span>(q.wheres, cond)
  <span class="kw">return</span> q
}
<span class="kw">func</span> (q *<span class="typ">QueryBuilder</span>) <span class="fn">Limit</span>(n <span class="typ">int</span>) *<span class="typ">QueryBuilder</span> {
  q.limit = n; <span class="kw">return</span> q
}

<span class="fn">NewQuery</span>(<span class="str">"users"</span>).
  <span class="fn">Where</span>(<span class="str">"age > 18"</span>).
  <span class="fn">Limit</span>(<span class="num">10</span>)</pre>
</div>
<div class="card">
<div class="card-title">Worker pool</div>
<pre><span class="kw">func</span> <span class="fn">WorkerPool</span>(jobs &lt;-<span class="kw">chan</span> <span class="typ">Job</span>, n <span class="typ">int</span>) &lt;-<span class="kw">chan</span> <span class="typ">Result</span> {
  results := <span class="fn">make</span>(<span class="kw">chan</span> <span class="typ">Result</span>, <span class="kw">len</span>(jobs))
  <span class="kw">var</span> wg sync.<span class="typ">WaitGroup</span>

  <span class="kw">for</span> i := <span class="kw">range</span> n {
    wg.<span class="fn">Add</span>(<span class="num">1</span>)
    <span class="kw">go func</span>(id <span class="typ">int</span>) {
      <span class="kw">defer</span> wg.<span class="fn">Done</span>()
      <span class="kw">for</span> j := <span class="kw">range</span> jobs {
        results &lt;- <span class="fn">process</span>(j)
      }
    }(i)
  }

  <span class="kw">go func</span>() {
    wg.<span class="fn">Wait</span>()
    <span class="fn">close</span>(results)
  }()
  <span class="kw">return</span> results
}</pre>
</div>
<div class="card">
<div class="card-title">Singleton via sync.Once</div>
<pre><span class="kw">type</span> <span class="typ">DB</span> <span class="kw">struct</span>{ pool *sql.<span class="typ">DB</span> }

<span class="kw">var</span> (
  instance *<span class="typ">DB</span>
  once     sync.<span class="typ">Once</span>
)

<span class="kw">func</span> <span class="fn">GetDB</span>() *<span class="typ">DB</span> {
  once.<span class="fn">Do</span>(<span class="kw">func</span>() {
    pool, err := sql.<span class="fn">Open</span>(<span class="str">"postgres"</span>, dsn)
    <span class="kw">if</span> err != <span class="kw">nil</span> { <span class="kw">panic</span>(err) }
    instance = &<span class="typ">DB</span>{pool: pool}
  })
  <span class="kw">return</span> instance
}</pre>
</div>
<div class="card">
<div class="card-title">Iterator (Go 1.23+)</div>
<pre><span class="kw">import</span> <span class="str">"iter"</span>

<span class="cm">// iter.Seq[V] = func(yield func(V) bool)</span>
<span class="kw">func</span> <span class="fn">Fibonacci</span>() iter.<span class="typ">Seq</span>[<span class="typ">int</span>] {
  <span class="kw">return func</span>(yield <span class="kw">func</span>(<span class="typ">int</span>) <span class="typ">bool</span>) {
    a, b := <span class="num">0</span>, <span class="num">1</span>
    <span class="kw">for</span> {
      <span class="kw">if</span> !<span class="fn">yield</span>(a) { <span class="kw">return</span> }
      a, b = b, a+b
    }
  }
}

<span class="kw">for</span> n := <span class="kw">range</span> <span class="fn">Fibonacci</span>() {
  <span class="kw">if</span> n > <span class="num">100</span> { <span class="kw">break</span> }
  fmt.<span class="fn">Println</span>(n)
}</pre>
</div>
<div class="card">
<div class="card-title">Dependency injection</div>
<pre><span class="kw">type</span> <span class="typ">UserService</span> <span class="kw">struct</span> {
  db     <span class="typ">UserRepo</span>
  cache  <span class="typ">Cache</span>
  logger *slog.<span class="typ">Logger</span>
}

<span class="kw">func</span> <span class="fn">NewUserService</span>(
  db     <span class="typ">UserRepo</span>,
  cache  <span class="typ">Cache</span>,
  logger *slog.<span class="typ">Logger</span>,
) *<span class="typ">UserService</span> {
  <span class="kw">return</span> &<span class="typ">UserService</span>{db, cache, logger}
}

<span class="cm">// wire dependencies at main</span>
<span class="cm">// never use globals (except loggers/configs)</span></pre>
</div>
</div>
`},
{id:'stdlib',label:'Std Library',content:`
<div class="grid">
<div class="card">
<div class="card-title">strings package</div>
<pre><span class="cm">// common ops</span>
strings.<span class="fn">Contains</span>(s, sub)
strings.<span class="fn">HasPrefix</span>(s, p) / <span class="fn">HasSuffix</span>(s, p)
strings.<span class="fn">Index</span>(s, sub)       <span class="cm">// -1 if not found</span>
strings.<span class="fn">Count</span>(s, sub)
strings.<span class="fn">Replace</span>(s, old, new, n) <span class="cm">// n=-1 all</span>
strings.<span class="fn">ReplaceAll</span>(s, old, new)
strings.<span class="fn">ToUpper</span>(s) / <span class="fn">ToLower</span>(s)
strings.<span class="fn">TrimSpace</span>(s)
strings.<span class="fn">Trim</span>(s, cutset)
strings.<span class="fn">TrimPrefix</span>(s, p) / <span class="fn">TrimSuffix</span>(s, p)
strings.<span class="fn">Split</span>(s, sep)
strings.<span class="fn">Join</span>(parts, sep)
strings.<span class="fn">Fields</span>(s)          <span class="cm">// split whitespace</span>
strings.<span class="fn">Repeat</span>(s, n)
strings.<span class="fn">EqualFold</span>(a, b)    <span class="cm">// case-insensitive ==</span>

<span class="cm">// builder (avoid string concat in loops)</span>
<span class="kw">var</span> sb strings.<span class="typ">Builder</span>
sb.<span class="fn">WriteString</span>(<span class="str">"hello"</span>)
s := sb.<span class="fn">String</span>()</pre>
</div>
<div class="card">
<div class="card-title">time package</div>
<pre><span class="cm">// now and formatting</span>
t := time.<span class="fn">Now</span>()
t.<span class="fn">Format</span>(time.RFC3339)
t.<span class="fn">Format</span>(<span class="str">"2006-01-02 15:04:05"</span>)
<span class="cm">// reference: Mon Jan 2 15:04:05 MST 2006</span>

parsed, _ := time.<span class="fn">Parse</span>(time.RFC3339, s)

<span class="cm">// durations</span>
d := <span class="num">5</span> * time.Minute + <span class="num">30</span> * time.Second
time.<span class="fn">Sleep</span>(<span class="num">2</span> * time.Second)

<span class="cm">// after / tick</span>
&lt;-time.<span class="fn">After</span>(<span class="num">5</span> * time.Second)
ticker := time.<span class="fn">NewTicker</span>(<span class="num">1</span> * time.Second)
<span class="kw">defer</span> ticker.<span class="fn">Stop</span>()
<span class="kw">for</span> t := <span class="kw">range</span> ticker.C { }

<span class="cm">// elapsed</span>
start := time.<span class="fn">Now</span>()
elapsed := time.<span class="fn">Since</span>(start)</pre>
</div>
<div class="card">
<div class="card-title">regexp</div>
<pre><span class="cm">// compile (panic on error)</span>
re := regexp.<span class="fn">MustCompile</span>(<span class="str">\`(\d+)-(\w+)\`</span>)

re.<span class="fn">MatchString</span>(<span class="str">"123-abc"</span>)
re.<span class="fn">FindString</span>(s)
re.<span class="fn">FindAllString</span>(s, n)    <span class="cm">// n=-1 for all</span>
re.<span class="fn">FindStringSubmatch</span>(s)  <span class="cm">// groups</span>
re.<span class="fn">ReplaceAllString</span>(s, repl)
re.<span class="fn">ReplaceAllStringFunc</span>(s, f)
re.<span class="fn">Split</span>(s, n)

<span class="cm">// common syntax</span>
<span class="str">.   </span>any char    <span class="str">\d  </span>digit   <span class="str">\w  </span>word
<span class="str">^</span>   start       <span class="str">$</span>   end     <span class="str">*</span>   0+
<span class="str">+</span>   1+          <span class="str">?</span>   0 or 1  <span class="str">{n}</span> exact
<span class="str">[abc]</span> class    <span class="str">[^abc]</span> neg  <span class="str">(?i)</span> case-i</pre>
</div>
<div class="card">
<div class="card-title">slog (structured logging)</div>
<pre><span class="cm">// default logger</span>
slog.<span class="fn">Info</span>(<span class="str">"user login"</span>, <span class="str">"user"</span>, uid, <span class="str">"ip"</span>, ip)
slog.<span class="fn">Warn</span>(<span class="str">"high load"</span>, <span class="str">"cpu"</span>, pct)
slog.<span class="fn">Error</span>(<span class="str">"db error"</span>, <span class="str">"err"</span>, err)

<span class="cm">// JSON handler</span>
logger := slog.<span class="fn">New</span>(slog.<span class="fn">NewJSONHandler</span>(
  os.Stdout, &slog.<span class="typ">HandlerOptions</span>{
    Level: slog.LevelDebug,
  }))
slog.<span class="fn">SetDefault</span>(logger)

<span class="cm">// with context</span>
logger.<span class="fn">With</span>(<span class="str">"request_id"</span>, rid).
  <span class="fn">Info</span>(<span class="str">"handled"</span>, <span class="str">"status"</span>, <span class="num">200</span>)</pre>
</div>
<div class="card">
<div class="card-title">sync/errgroup</div>
<pre><span class="kw">import</span> <span class="str">"golang.org/x/sync/errgroup"</span>

g, ctx := errgroup.<span class="fn">WithContext</span>(ctx)

g.<span class="fn">Go</span>(<span class="kw">func</span>() <span class="typ">error</span> {
  <span class="kw">return</span> <span class="fn">fetchUsers</span>(ctx)
})
g.<span class="fn">Go</span>(<span class="kw">func</span>() <span class="typ">error</span> {
  <span class="kw">return</span> <span class="fn">fetchOrders</span>(ctx)
})

<span class="kw">if</span> err := g.<span class="fn">Wait</span>(); err != <span class="kw">nil</span> {
  <span class="kw">return</span> err
}

<span class="cm">// limit concurrency</span>
g.<span class="fn">SetLimit</span>(<span class="num">5</span>)
g.<span class="fn">TryGo</span>(fn) <span class="cm">// non-blocking</span></pre>
</div>
<div class="card">
<div class="card-title">os / exec / path</div>
<pre><span class="cm">// env</span>
os.<span class="fn">Getenv</span>(<span class="str">"HOME"</span>)
os.<span class="fn">Setenv</span>(<span class="str">"KEY"</span>, <span class="str">"val"</span>)
os.<span class="fn">LookupEnv</span>(<span class="str">"KEY"</span>)  <span class="cm">// + ok bool</span>

<span class="cm">// args</span>
os.Args[<span class="num">1</span>:]

<span class="cm">// exec command</span>
cmd := exec.<span class="fn">CommandContext</span>(ctx, <span class="str">"git"</span>, <span class="str">"status"</span>)
out, err := cmd.<span class="fn">Output</span>()
cmd.<span class="fn">Run</span>()
cmd.<span class="fn">Start</span>(); cmd.<span class="fn">Wait</span>()

<span class="cm">// filepath</span>
filepath.<span class="fn">Join</span>(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>)
filepath.<span class="fn">Base</span>(p) / <span class="fn">Dir</span>(p) / <span class="fn">Ext</span>(p)
filepath.<span class="fn">Abs</span>(rel)
filepath.<span class="fn">Walk</span>(root, fn)</pre>
</div>
</div>
`},
{id:'advanced',label:'Advanced',content:`
<div class="grid">
<div class="card">
<div class="card-title">reflect package</div>
<pre><span class="kw">import</span> <span class="str">"reflect"</span>

v := reflect.<span class="fn">ValueOf</span>(x)
t := reflect.<span class="fn">TypeOf</span>(x)

t.<span class="fn">Kind</span>()   <span class="cm">// reflect.Struct, .Slice, etc.</span>
t.<span class="fn">Name</span>()   <span class="cm">// type name string</span>

<span class="cm">// struct field inspection</span>
<span class="kw">for</span> i := <span class="kw">range</span> t.<span class="fn">NumField</span>() {
  f := t.<span class="fn">Field</span>(i)
  tag := f.Tag.<span class="fn">Get</span>(<span class="str">"json"</span>)
}

<span class="cm">// dynamic call</span>
method := v.<span class="fn">MethodByName</span>(<span class="str">"String"</span>)
result := method.<span class="fn">Call</span>(<span class="kw">nil</span>)

<span class="cm">// set via pointer</span>
p := reflect.<span class="fn">ValueOf</span>(&x).<span class="fn">Elem</span>()
p.<span class="fn">SetInt</span>(<span class="num">42</span>)</pre>
</div>
<div class="card">
<div class="card-title">cgo basics</div>
<pre><span class="cm">/*
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void sayHello(const char* name) {
    printf("Hello, %s!\n", name);
}
*/</span>
<span class="kw">import</span> <span class="str">"C"</span>

<span class="kw">import</span> <span class="str">"unsafe"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
  cs := C.<span class="fn">CString</span>(<span class="str">"Go"</span>)
  <span class="kw">defer</span> C.<span class="fn">free</span>(unsafe.<span class="fn">Pointer</span>(cs))
  C.<span class="fn">sayHello</span>(cs)
}
<span class="cm">// CGO_ENABLED=1 go build</span></pre>
</div>
<div class="card">
<div class="card-title">sync/atomic &amp; memory ordering</div>
<pre><span class="kw">import</span> <span class="str">"sync/atomic"</span>

<span class="cm">// typed atomic (Go 1.19+)</span>
<span class="kw">var</span> counter atomic.<span class="typ">Int64</span>
counter.<span class="fn">Add</span>(<span class="num">1</span>)
counter.<span class="fn">Load</span>()
counter.<span class="fn">Store</span>(<span class="num">0</span>)
counter.<span class="fn">Swap</span>(<span class="num">5</span>)
counter.<span class="fn">CompareAndSwap</span>(old, new)

<span class="kw">var</span> flag atomic.<span class="typ">Bool</span>
<span class="kw">var</span> ptr  atomic.<span class="typ">Pointer</span>[<span class="typ">Config</span>]

<span class="cm">// Go memory model:
// - chan ops synchronize
// - sync.Mutex synchronize  
// - atomic ops synchronize
// - once.Do synchronizes</span></pre>
</div>
<div class="card">
<div class="card-title">WASM target</div>
<pre><span class="cm">// compile to WebAssembly</span>
GOOS=js GOARCH=wasm go build -o main.wasm .

<span class="cm">// syscall/js for DOM</span>
<span class="kw">import</span> <span class="str">"syscall/js"</span>

doc := js.Global().<span class="fn">Get</span>(<span class="str">"document"</span>)
el  := doc.<span class="fn">Call</span>(<span class="str">"getElementById"</span>, <span class="str">"app"</span>)
el.<span class="fn">Set</span>(<span class="str">"textContent"</span>, <span class="str">"Hello from Go"</span>)

<span class="cm">// export function to JS</span>
js.Global().<span class="fn">Set</span>(<span class="str">"greet"</span>, js.<span class="fn">FuncOf</span>(
  <span class="kw">func</span>(this js.<span class="typ">Value</span>, args []js.<span class="typ">Value</span>) any {
    <span class="kw">return</span> <span class="str">"Hello, "</span> + args[<span class="num">0</span>].<span class="fn">String</span>()
  }))

<span class="fn">select</span> {} <span class="cm">// keep alive</span></pre>
</div>
<div class="card">
<div class="card-title">Plugin system</div>
<pre><span class="cm">// build plugin</span>
<span class="cm">// GOOS=linux go build -buildmode=plugin -o plug.so</span>

<span class="kw">import</span> <span class="str">"plugin"</span>

p, err := plugin.<span class="fn">Open</span>(<span class="str">"plug.so"</span>)
sym, err := p.<span class="fn">Lookup</span>(<span class="str">"MyFunc"</span>)
f := sym.(<span class="kw">func</span>(<span class="typ">string</span>) <span class="typ">string</span>)
result := <span class="fn">f</span>(<span class="str">"hello"</span>)

<span class="cm">// limitations:
// - Linux/Mac only
// - must use same Go version
// - prefer interface-based plugins</span></pre>
</div>
<div class="card">
<div class="card-title">go:linkname &amp; directives</div>
<pre><span class="cm">//go:nosplit  – no stack growth check</span>
<span class="cm">//go:noescape – ptr doesn't escape</span>
<span class="cm">//go:noinline – prevent inlining</span>
<span class="cm">//go:inline   – force inline hint</span>
<span class="cm">//go:generate cmd args</span>
<span class="cm">//go:build constraint</span>
<span class="cm">//go:embed pattern</span>

<span class="cm">// linkname — access internal symbols</span>
<span class="cm">// (breaks at any runtime update)</span>
<span class="kw">import</span> _ <span class="str">"unsafe"</span>
<span class="cm">//go:linkname nanotime runtime.nanotime</span>
<span class="kw">func</span> <span class="fn">nanotime</span>() <span class="typ">int64</span></pre>
</div>
</div>
`},
];
