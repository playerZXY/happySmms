
export default {
    // 存数据
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    // 取数据
    get(key) {
        return JSON.parse(window.localStorage.getItem(key))
    },
    // 删除指定key的数据
    remove(key) {
        window.localStorage.removeItem(key)
    }
}