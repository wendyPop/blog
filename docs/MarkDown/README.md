
## 뭐래
ㅇㅎㄴㅇㄹㄴㅇ



# 해보자

## 사이드

:::tip
팁 박스!
:::


:::warning
워닝 박스!
:::

``` js{4}
// docs/.vuepress/config.js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

[[toc]]

``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

> 인용
>
> 인용
>> 인용 내의 인용
>>
>> 인용 내의 인용
>>
> 인용
>
> 인용

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


:tada: :100:

Props:

text - string
type - string, optional value: "tip"|"warning"|"error", defaults to "tip".
vertical - string, optional value: "top"|"middle", defaults to "top".

<Badge text="Badge" />
<Badge text="Badge" type="tip" />
<Badge text="Badge" type="warn" vertical="top" />
<Badge text="Badge" type="error" vertical="middle" />
### Badge <Badge text="beta" type="warning"/> <Badge text="default theme"/>
