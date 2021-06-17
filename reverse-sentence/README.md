# reverse-sentence

Reverses the words of a sentence.

## Install
```sh
npm install @tomit4/reverse-sentence
```

## API

```js
require("reverse-sentence") => Function
reverse(sentence) => String
```

## Example
```js
const reverseSentence = require("reverse-sentence");

const sentence = "Hello Beth!";

const reversed = reverseSentence(sentence);

console.log(reversed) // Beth! Hello
```

## License

MIT