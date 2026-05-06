# do-merge (🔀)

Merge local values into the host custom element or a remote peer element

## Example 1a 

```html
<script type=module>
class MoodStone extends HTMLElement{
    #isHappy;
    get isHappy(){
        return this.#isHappy;
    }
    set isHappy(nv){
        this.#isHappy = nv;
        this.querySelector('#happy').textContent = nv ? '😊' : '😢'
    }
    #age = 0;
    get age(){
        return this.#age;
    }
    set age(nv){
        this.#age = nv;
        this.querySelector('#age').textContent = nv;

    }
    connectedCallback(){
        this.isHappy = true;
    }
}
customElements.define('mood-stone', MoodStone);
</script>
...
<mood-stone itemscope>
    <div>
        Is Happy: <span id=happy></span>
        Age: <span id=age></span>
    </div>
    <button 🔀='{
        "assign": {
            "?.isHappy =!": ".",
            "?.age +=": 10
        "
    }'>Merge</button>
</mood-stone>
```

This applies [assignFrom from the assign-gingerly package](https://github.com/bahrus/assign-gingerly#resolving-and-assigning-with-assignfrom).  The "from" is the button element.  

## Relationship to do-invoke, do-inc, do-toggle

do-merge covers most of the same ground as [do-invoke](https://github.com/bahrus/do-invoke), [do-inc](https://github.com/bahrus/do-inc), and [do-toggle](https://github.com/bahrus/do-toggle). The key differences:

- **do-invoke**, **do-inc**, and **do-toggle** use a string DSL (no JSON required) and include inferencing logic — they can figure out the event type, target property, etc. from context, so you can often be less explicit. The intent is arguably more obvious at a glance for their specific use cases.
- **do-merge** uses JSON syntax and the full power of [assign-gingerly](https://github.com/bahrus/assign-gingerly) operators (`=!` for toggle, `+=` for increment, method calls via `?.classList?.add`, etc.). It's more general-purpose — a single enhancement that can handle toggling, incrementing, method invocation, and arbitrary property assignment in one attribute.

Choose do-merge when you need to combine multiple operations or want the full expressiveness of assign-gingerly. Choose the specialized enhancements when brevity and self-documenting intent matter more.

### Editing JSON in HTML

Two options for a better authoring experience:

1. **json-in-html** — A VS Code / Kiro extension that adds syntax highlighting for JSON embedded in HTML attributes. Available in both the VS Code and Kiro marketplaces.
2. **Build-time authoring** — Write your merge instructions in a `*.mjs` file that serializes to JSON, then inject the result into your HTML at build time. This gives you full editor support (comments, trailing commas, template literals) while producing valid JSON for the browser.

## Example 1b - Specifying the event

```html
<mood-stone itemscope>
    <div>
        Is Happy: <span id=happy></span>
        Age: <span id=age></span>
    </div>
    <button 🔀='{
        "assign": {
            "?.isHappy =!": ".",
            "?.age +=": 10
        },
        "on": "mouseover"
    }'>Merge</button>
</mood-stone>
```

## Example 1c - Using the canonical name

```html
<mood-stone itemscope>
    <div>
        Is Happy: <span id=happy></span>
        Age: <span id=age></span>
    </div>
    <button do-merge='{
        "assign": {
            "?.isHappy =!": ".",
            "?.age +=": 10
        },
        "on": "mouseover"
    }'>Merge</button>
</mood-stone>
```

## Example 1d - Multiple merges on different events

```html
<mood-stone itemscope>
    <div>
        Is Happy: <span id=happy></span>
        Age: <span id=age></span>
    </div>
    <button do-merge='[
        {
            "assign": {
                "?.isHappy =!": ".",
                "?.age +=": 10,
                "?.classList?.add": "my-class"
            },
            "options": {
                "withMethods": ["add"]
            },
            "on": "mouseover"
        },{
            "assign": {
                "?.age +=": -10,
            }
        }
    ]'>Merge</button>
</mood-stone>
```

The second group will be done on click by default.

## Example 1e - Specifying the target element to merge into

```html
<mood-stone itemscope id=moodStone>
    <div>
        Is Happy: <span id=happy></span>
        Age: <span id=age></span>
    </div>

</mood-stone>
...
<button 🔀='{
    "assign": {
        "?.isHappy =!": ".",
        "?.age +=": 10
    ",
    "targetElementId": "moodStone"
}'>Merge</button>
```


## Translating README Examples to Demos

Each README example maps to a demo file in `demo/`. The translation pattern:

1. **Wrap in full HTML document** with `<!DOCTYPE html>`, `<head>`, `<body>`
2. **Include the import map** via `<!-- #include virtual="/imports.html" -->`
3. **Register the enhancement** with a `<be-hive>` block containing `<script type=emc src="do-merge/🔀.json">` (or `emc.json` for the canonical name)
4. **Import be-hive** with `<script type=module>import 'be-hive/be-hive.js';</script>`
5. **Include the MoodStone custom element definition** (since the examples depend on it)
6. **Copy the example markup** into `<body>`

### Demo file mapping

| README Example | Demo File | Key Difference from 1a |
|---|---|---|
| Example 1a | `demo/Example1a.html` | Base case — emoji attribute, click event (default) |
| Example 1b | `demo/Example1b.html` | Adds `"on": "mouseover"` to specify event |
| Example 1c | `demo/Example1c.html` | Uses canonical `do-merge` attribute instead of 🔀 |
| Example 1d | `demo/Example1d.html` | Array of merge configs with different events and `options.withMethods` |
| Example 1e | `demo/Example1e.html` | Uses `targetElementId` to merge into a remote element by ID |

### Notes on MoodStone setup

The README omits `this.age = 0` in `connectedCallback` but the demos include it to ensure the age display initializes properly. The `#age` field also omits the `= 0` initializer in the demo to match the pattern of `#isHappy` (both start as `undefined` until `connectedCallback` runs).

### Running demos

```bash
npm run serve
```

Then navigate to `http://localhost:8000/demo/Example1a.html` (the spa-ssi server handles the `#include virtual` directive for the import map).





