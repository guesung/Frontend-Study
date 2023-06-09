
var value = 1;

var obj = {
  value: 100,
  foo: function () {
    console.log(this)
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    bar();
  },
};

// obj.foo();

var obj1 = {
  name: 'Lee',
  sayName: function () {
    console.log(this);
    // {
    //   name: 'Lee',
    //   sayName: [Function: sayName],
    //   sayNameArrow: [Function: sayNameArrow]
    // }
  },
  sayNameArrow: () => console.log(this)
  // {}. sayNameArrow함수는 전역 객체에서 정의되었기 때문에 전역 객체를 가리킴
}

var obj2 = {
  name: 'Kim'
}

obj2.sayName = obj1.sayName;

obj1.sayName();
obj1.sayNameArrow();
obj2.sayName();

// --------생성자 함수--------

// function Person(name) {
//   this.name = name;
// }

// var me = new Person('Lee');
// console.log(me); // Person&nbsp;{name: "Lee"}

// // new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
// var you = Person('Kim');
// console.log(you); // undefined

this.a = 1;
const func = () => {
  this.a = 2;
  const func2 = function () {
    console.log(this === globalThis) // global
    // 객체의 메소드가 아니라, 내부 함수로 사용되었기 때문에 전역 객체를 가리킴
  }
  const func3 = () => {
    console.log(this.a) // 2
    // 상위 스코프인 func2의 this를 가리킴
  }
  function func4() {
    console.log(this === global) // global
    // func2와 동일
  }

  func2()
  func3()
  func4()
}

func()