export function PopData(dataSource = [], id = []) {
    const newdata = [...dataSource]
    const flag = newdata.filter((item) => id.indexOf(item.id) >= 0).map((item) => (item.user = true) && item);
    const noflag = newdata.filter((item) => id.indexOf(item.id) < 0);
    return [...flag, ...noflag]
}
export function turnData(data) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            data[index] = turnData(item);
        })
    }
    if (isPureObj(data)) {
        if (!isOnlyObj(data)) {//只能根据对象键的多少(目前是以两个字段来判断)来判断是否需要转换为数组。
            for (let attr in data) {
                if (Array.isArray(data[attr])) {
                    data[attr].forEach((item, index) => {
                        data[attr][index] = turnData(item);
                    })
                } else if (isPureObj(data[attr])) {
                    if (Object.keys(data[attr]).length <= 2) {
                        data[attr] = Object.values(data[attr]);
                    } else {
                        data[attr] = turnData(data[attr]);
                    }
                }
            }
        } else if (Object.keys(data).length <= 2 && Object.keys(data).length !== 1) {
            data = Object.values(data);
        } else if (Object.keys(data).length === 1) {
            data = Object.values(data)[0]
        }
    }
    return data
}
function isOnlyObj(object) {//判断是不是最简单的对象(没有嵌套)
    for (let key in object) {
        if (typeof object[key] === "object" && object[key] !== null) {
            return false
        }
    }
    return true
}
function isPureObj(object) {//判断是不是纯对象，而不是数组。
    return Object.prototype.toString.call(object) === '[object Object]'
}
function typeOf(obj) {
    return Object.prototype.toString.call(obj)
}
//复制类实例化的对象不会产生预期的效果（类内部定义的方法都是不可枚举的）
export function deepCopy(obj) {
    let copy;
    let contain = arguments[1] || new WeakMap();
    if (typeOf(obj) === '[object Object]') {
        copy = {}
        if (contain.has(obj)) {
            copy = obj
        } else {
            contain.set(obj, 'MARK')
            for (let key in obj) {
                copy[key] = deepCopy(obj[key], contain);
            }
        }
    } else if (typeOf(obj) === '[object Function]') {
        copy = obj.bind();
    } else if (typeOf(obj) === '[object Array]') {
        copy = obj.map((item) => {
            return deepCopy(item, contain);
        })
    } else {
        copy = obj;
    }
    return copy
}