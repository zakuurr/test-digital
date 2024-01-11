function p(x) {
    return function (y){
        return x + y
    };
}

const m = p(3);
console.log(m(4))