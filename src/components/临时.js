function NormalFunction() {
    this.id = 42;

    this.arrowFunction = () => {
        console.log("Arrow function this.id:", this.id);
    };

    this.regularFunction = function() {
        console.log("Regular function this.id:", this.id);
    };
}

const instance = new NormalFunction();
instance.arrowFunction(); // 输出 "Arrow function this.id: 42"
instance.regularFunction(); // 输出 "Regular function this.id: 42"

const anotherObject = {
    id: 100,
};

anotherObject.arrowFunction = instance.arrowFunction;
anotherObject.regularFunction = instance.regularFunction;//把i.a的值赋值给a.a，i.r的值赋值给a.r。这之后，a和r指向同一个函数。

anotherObject.arrowFunction(); // 输出 "Arrow function this.id: 42"
anotherObject.regularFunction(); // 输出 "Regular function this.id: 100"