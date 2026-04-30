window.cheatSheetSectionLevels = {
  basics: 'beginner',
  control: 'beginner',
  funcs: 'beginner',
  types: 'beginner',
  collections: 'beginner',
  pointers: 'intermediate',
  errors: 'intermediate',
  concurrency: 'intermediate',
  generics: 'intermediate',
  io: 'beginner',
  json: 'beginner',
  http: 'intermediate',
  testing: 'intermediate',
  modules: 'beginner',
  patterns: 'advanced',
  stdlib: 'intermediate',
  advanced: 'advanced',
};

window.cheatSheetPlaygroundExamples = {
  'Program structure': `package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Hello, Go")
	fmt.Println("Args:", os.Args[1:])
}
`,
  'Constants & iota': `package main

import "fmt"

type Direction int

const (
	North Direction = iota
	East
	South
	West
)

const (
	Read = 1 << iota
	Write
	Exec
)

func main() {
	fmt.Println(North, East, South, West)
	fmt.Println(Read, Write, Exec)
}
`,
  'for loops': `package main

import "fmt"

func main() {
	for i := 0; i < 3; i++ {
		fmt.Println("classic", i)
	}

	n := 3
	for n > 0 {
		fmt.Println("while-style", n)
		n--
	}

	for i, v := range []string{"go", "is", "fun"} {
		fmt.Println(i, v)
	}
}
`,
  'switch': `package main

import "fmt"

func describe(x int) string {
	switch {
	case x < 0:
		return "negative"
	case x == 0:
		return "zero"
	default:
		return "positive"
	}
}

func main() {
	fmt.Println(describe(-2))
	fmt.Println(describe(0))
	fmt.Println(describe(7))
}
`,
  'Slices': `package main

import "fmt"

func main() {
	nums := []int{1, 2, 3}
	nums = append(nums, 4, 5)

	firstTwo := nums[:2]
	rest := nums[2:]

	fmt.Println(nums)
	fmt.Println(firstTwo)
	fmt.Println(rest)
	fmt.Println("len/cap:", len(nums), cap(nums))
}
`,
  'Maps': `package main

import "fmt"

func main() {
	ages := map[string]int{
		"gopher": 15,
		"tux":    30,
	}

	ages["duke"] = 28
	age, ok := ages["gopher"]

	fmt.Println(age, ok)
	for name, age := range ages {
		fmt.Println(name, age)
	}
}
`,
  'Error basics': `package main

import (
	"errors"
	"fmt"
)

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("divide by zero")
	}
	return a / b, nil
}

func main() {
	result, err := divide(10, 0)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println(result)
}
`,
  'Goroutines': `package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			fmt.Println("worker", id)
		}(i)
	}

	wg.Wait()
}
`,
  'Channels': `package main

import "fmt"

func main() {
	ch := make(chan string)

	go func() {
		ch <- "hello from a goroutine"
		close(ch)
	}()

	for msg := range ch {
		fmt.Println(msg)
	}
}
`,
  'Encoding / Decoding': `package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID   int    \`json:"id"\`
	Name string \`json:"name"\`
}

func main() {
	data := []byte(\`{"id":1,"name":"Layla"}\`)

	var user User
	if err := json.Unmarshal(data, &user); err != nil {
		panic(err)
	}

	out, _ := json.MarshalIndent(user, "", "  ")
	fmt.Println(string(out))
}
`,
  'Unit tests': `package main

import "testing"

func add(a, b int) int {
	return a + b
}

func TestAdd(t *testing.T) {
	if got := add(2, 3); got != 5 {
		t.Fatalf("add(2, 3) = %d, want 5", got)
	}
}
`,
  'strings package': `package main

import (
	"fmt"
	"strings"
)

func main() {
	text := "go,java,python"
	parts := strings.Split(text, ",")

	fmt.Println(parts)
	fmt.Println(strings.Contains(text, "go"))
	fmt.Println(strings.ToUpper("gopher"))
}
`,
};
