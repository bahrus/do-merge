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
            "?.isHappy !=": ".",
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
            "?.isHappy !=": ".",
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
            "?.isHappy !=": ".",
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
                "?.isHappy !=": ".",
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





