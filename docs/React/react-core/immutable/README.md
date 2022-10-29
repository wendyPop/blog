---
title: 불변성을 유지하며 state 핸들링하기
meta:
- name: description
  content: React immutable state
- property: og:title
  content: React immutable
- property: og:description
  content: React immutable
- property: og:url
  content: https://wendypop.github.io/blog/React/immutable
  tags: ["react", "immutable", "spread", "react_state", "reference-type"]
---

# 불변성을 유지하며 state 핸들링하기
리액트에서는 불변성을 지키면서 상태를 변화시켜야 합니다.

즉 리액트가 아닌 프로젝트에서는 이부분을 신경쓰지 않아도 됩니다.
바닐라 스크립트나 Vue로 개발시에는 신경쓰지 않아도 되는 부분이 리액트를 하면서 알게 된 부분을
정리해봅니다.

상태를 변경한다는 것은 데이터를 변경한다는 것이고, 
모던 프레임워크에서는 상태(데이터)가 변화하면 화면이 업데이트 됩니다. 
vue로 개발시에는 어떤 타입의 상태든 그 상태를 변경시키면 화면이 업데이트 되었습니다. 

하지만 리액트에서는 불변성을 지키면서 상태를 변화시켜야 합니다.


원시타입( string, number, boolean 등) state 는 메모리 참조형태가 아닙니다.
이렇게 원시타입 데이터를 리액트의 state 변수에 저장해도 참조 관계가 생기지 않습니다.
이렇게 참조가 생기지 않은 상황에서 state 변수값을 변경하는 것을 복사 한다고 합니다. 리액트는 state가 변경되었다고
판단되어 가상돔을 다시 랜더링합니다. 하여 state 변경 시 신경써야할 부분이 적지만
원시타입이 아닌 reference 타입(객체, 배열 등)의 객체는 원본만 변경하면 참조는 그대로라 리액트가 state 변화를 감지하지 못합니다.



`리액트가 state 변화를 감시하여 가상 돔을 다시 그리는 프로세스를 이해하면 좋습니다.`

`요약하자면 메모리 포인터가 참조하고 있는 reference 타입의 객체들의 원본만 바꾸는게 아닌
새로운 객체를 전달하여 메모리 포인터까지 변경 해야 리액트가 state 변화를 감지하여
화면을 갱신합니다.` 

### 원본을 변경하는 부수효과가 있는 메서드

:::tip
초창기 배열 메서드는 원본을 변경하는 부수효과 있는 메서드들이 있습니다.
:::


1. 원본 배열을 직접 변경하는 메서드 ( mutator method )  
   Array.prototype.push()  
   Array.prototype.pop()  
   Array.prototype.unshift()   
   Array.prototype.shift()   
   Array.prototype.splice()  
   Array.prototype.slice()  
   Array.prototype.join()  
   Array.prototype.fill()  
   Array.prototype.sort()

2. 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드 ( accessor method )
   Array.prototype.concat()  -> 스프레드 문법으로 대체 가능  
   Array.prototype.map()  
   Array.prototype.filter()  
   Array.prototype.reduce()  
   Array.prototype.find()   
   또는 ES6의 스프레드 문법


## 배열 state 핸들링
#### 배열에 추가

```js{4}
// zustand 
setTag: (_new) => {
  set((state) => ({
    specialTags: [ ...state.specialTags, _new.specialTags ]
  }))
}
```
```js{4}
let array1 = []
let array2 = []

setList([...array1, ...array2])
```
```js
setUsers(state.array.concat(newArray));
```
```js
setWord((state) => state.concat([newWord]))
// [1, 2].concat([3, 4])
// [...[1, 2], ...[3, 4]]
```

#### 배열 수정
```js{4,9}
const onToggle = id => {
  setUsers(
    users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
    )
  )
}

setList(_old => [..._old, newList])
```

map 함수도 새로운 배열을 반환하기 때문에 불변성을 유지하며, state 변경이 가능합니다.
```js{2-10}
setRelateProductList(
    products.map(item => {
        const new_product = {
            ...item,
            id: item.id,
            name: item.name,
            image: item.image
        }
        return new_product
    })
)
```

#### 배열 삭제
```js{3}
// 매개변수 id 에 해당하는 것을 삭제 
const filter = id => {
  setList(list.filter(item => item.id !== id))
}

```
## 객체 state 핸들링

#### 객체 추가
```js{2}
  setDetail(( prev ) => {
    return { ...prev, ...current }
  })
```
```js
// ES6 Object.aasign 메서드를 이용 가능
let merged1 = Object.assign({}, { x:1, y: 2 }, { a: 10, c: 1 })
let changed1 = Object.assign({}, { x:1, y:2 }, { y: 100 })

let merged2 = { ...{x:1, y:2}, ...{a:1, b: 2} }
let changed2 = { ...{x:1, y:2}, y: 100 }
let added = { ...{x:1, y:2}, k: 0 }

```
#### 객체 수정 
```js{2,7,9,11,13}
// state 변수 수정
setState(state => { ...state, key: value})

// redux 
switch(action.type) {
  case all:
    return { ...state, payload }
  case title:
    return { ...state, title : payload }
  case content:
    return { ...state, content: payload }
  case created:
    return { ...state, createdAt: new Date().toISOString() }
  default: return state
}
```

#### 배열 내 객체 수정
```js{4}
  setOption(
    options.map(option =>
      // 기존 selected: false 토글! 
      option.type === item.type ? { ...option, selected: !option.selected } : option
    )
  )
```
```js{28,33}
  const initial = [
    {
      type: 'car',
      selected: false,
      childObj: {
        carType1 : false,
        carType2 : false,
        carType3 : false
      }
    },
    {
      type: 'area',
      selected: false,
      childObj: {
        area1 : false,
        area2 : false,
        area3 : false
      }
    }
  ]

  const [ option, setOption ] = useState(initial)
  const [ sub, setSub ] = useState(initial[0])

  setOption(
      option.map(opt => {
        // 여러 속성 수정
        return { ...opt, selected: true, childObj: { ...arg.childObj } }
      })
  )

  setSub((state) => {
    return { ...state, childObj: { ...arg.childObj } }
  })

```
```js{13,18}
// zustand
  const initialDialog = {
    show: false,
    type: 'confirm',
    ...
  }

  export const useDialog = create(set => ({
    dialogs: [],
    dialog: { ...initialDialog },
    setDialogShow: (_new) => {
      set((_old) => ({
        dialogs: [..._old.dialogs, { ..._old.dialog, ..._new, show: true }]
      }))
    },
    setDialogHide: () => {
      set((_old) => ({
        dialogs: _old.dialogs.filter((element, index) => index < _old.dialogs.length - 1)
      }))
    }
  }))
```
#### 객체 내 배열 수정
```js{3,5,7}
switch (action.type) {
  case add_user:
    return { ...state, users: [...state.users, action.payload ] }
  case del_user:
    return { ...state, users: [...state.users.filter((s) => s.id !== action.payload.id)] }
  case clear_all:
    return { ...state, users: [] }
  default:
    throw new Error()
}
```
