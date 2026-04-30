window.cheatSheetNotes = {
  fieldNotes: [
    {
      title: 'Where Go fits well',
      tags: ['overview', 'use-cases'],
      body: `
        <p>Go is a strong fit when you want simple code, fast builds, good tooling, and solid performance without managing memory manually.</p>
        <ul>
          <li>Cloud services and APIs</li>
          <li>Command-line tools</li>
          <li>DevOps and SRE tooling</li>
          <li>Network services and web backends</li>
        </ul>
      `,
    },
    {
      title: 'Concurrency mental model',
      tags: ['concurrency', 'mental-model'],
      body: `
        <p>Think of goroutines as independent tasks and channels as the communication lines between them.</p>
        <ul>
          <li>Goroutines run work concurrently.</li>
          <li>Channels move values and synchronize handoff.</li>
          <li><code>select</code> waits on multiple channel operations.</li>
          <li>Race conditions happen when goroutines share mutable data without coordination.</li>
        </ul>
      `,
    },
    {
      title: 'Small web app flow',
      tags: ['web', 'templates', 'forms'],
      body: `
        <p>A tiny Go web app often has this shape: route, handler, data, template, response.</p>
        <ol>
          <li>User visits a route such as <code>/interact</code>.</li>
          <li>A handler reads data from a file, database, or request.</li>
          <li>Data is placed into a struct.</li>
          <li><code>html/template</code> renders HTML with that struct.</li>
          <li>Form submissions are handled with <code>r.FormValue()</code>, then redirected.</li>
        </ol>
      `,
    },
    {
      title: 'Debug print for real shapes',
      tags: ['debugging'],
      body: `
        <p>Use <code>%#v</code> when you want Go to show the value in a more structural form.</p>
        <pre>fmt.Printf("%#v\\n", todoVals)</pre>
      `,
    },
  ],
  idioms: [
    {
      title: 'Constants do not need shouting',
      tags: ['naming', 'constants'],
      body: `
        <p>Go constants usually follow normal Go naming. They do not need to be all uppercase just because they are constants.</p>
        <pre>const Scalar = 0.1

const (
  Version = "1.0"
  Timeout = 30
)</pre>
      `,
    },
    {
      title: 'Use Must prefix for panic helpers',
      tags: ['errors', 'naming'],
      body: `
        <p>If a helper panics instead of returning an error, make that behavior obvious with a <code>Must</code> prefix.</p>
        <pre>func ParsePort(s string) (int, error) {
  return strconv.Atoi(s)
}

func MustParsePort(s string) int {
  port, err := ParsePort(s)
  if err != nil {
    panic(err)
  }
  return port
}</pre>
      `,
    },
    {
      title: 'Prefer named struct fields',
      tags: ['structs', 'readability'],
      body: `
        <p>Named fields make initialization resilient to field order changes and easier to read during review.</p>
        <pre>server := Server{
  Addr: ":8080",
  ReadTimeout: 5 * time.Second,
}</pre>
      `,
    },
    {
      title: 'Keep mutexes beside protected data',
      tags: ['concurrency', 'mutex'],
      body: `
        <p>Put the mutex directly above the field it protects. The struct then documents its own synchronization boundary.</p>
        <pre>type Server struct {
  listenAddr string

  peersMu sync.RWMutex
  peers   map[string]net.Conn
}</pre>
      `,
    },
    {
      title: 'Compose small interfaces',
      tags: ['interfaces', 'design'],
      body: `
        <p>Small interfaces are easier to satisfy, test, and compose. Start with the behavior you actually need.</p>
        <pre>type Getter interface {
  Get(id string) (Item, error)
}

type Putter interface {
  Put(item Item) error
}

type Store interface {
  Getter
  Putter
}</pre>
      `,
    },
    {
      title: 'Name packages by what they provide',
      tags: ['packages', 'naming'],
      body: `
        <p>A package name should make usage read naturally: <code>redis.Client</code>, <code>order.New</code>, <code>http.Handler</code>.</p>
        <p>Avoid names that repeat context already provided by the import path.</p>
      `,
    },
    {
      title: 'Group imports by origin',
      tags: ['imports', 'style'],
      body: `
        <p>Use blank lines to separate standard library, third-party, and internal imports.</p>
        <pre>import (
  "bytes"
  "context"
  "time"

  "go.opentelemetry.io/otel"

  "github.com/example/project/internal/store"
)</pre>
      `,
    },
  ],
  gotchas: [
    {
      title: 'Unused variables are compile errors',
      tags: ['compiler', 'basics'],
      body: `
        <p>Go rejects unused local variables and imports. This feels strict at first, but it keeps code clean and catches half-finished edits.</p>
        <pre>name := "gopher" // compile error if name is never used</pre>
      `,
    },
    {
      title: 'Map iteration order is not guaranteed',
      tags: ['maps', 'loops'],
      body: `
        <p>Do not rely on <code>range</code> over a map producing a stable order. Sort keys first when order matters.</p>
      `,
    },
    {
      title: 'main does not wait for goroutines',
      tags: ['goroutines', 'concurrency'],
      body: `
        <p>If <code>main</code> returns, the program exits. Use a <code>sync.WaitGroup</code>, channel, or context-driven shutdown when work must finish.</p>
      `,
    },
    {
      title: 'Channels block by default',
      tags: ['channels', 'concurrency'],
      body: `
        <p>An unbuffered send waits for a receiver, and an unbuffered receive waits for a sender. This is useful synchronization, but it can also deadlock.</p>
      `,
    },
    {
      title: 'Only the sender should close a channel',
      tags: ['channels', 'concurrency'],
      body: `
        <p>Closing is a signal that no more values will be sent. Receivers usually range over the channel; senders own the close.</p>
      `,
    },
    {
      title: 'count++ is not atomic',
      tags: ['race-conditions', 'mutex'],
      body: `
        <p>Incrementing shared state from multiple goroutines can race. Use channels, mutexes, or atomic operations depending on the design.</p>
      `,
    },
  ],
};
