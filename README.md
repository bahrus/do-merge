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

### Notes on MoodStone setup

The README omits `this.age = 0` in `connectedCallback` but the demos include it to ensure the age display initializes properly. The `#age` field also omits the `= 0` initializer in the demo to match the pattern of `#isHappy` (both start as `undefined` until `connectedCallback` runs).

### Running demos

```bash
npm run serve
```

Then navigate to `http://localhost:8000/demo/Example1a.html` (the spa-ssi server handles the `#include virtual` directive for the import map).





