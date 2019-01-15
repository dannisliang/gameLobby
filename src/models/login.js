export default {
    namespace: 'login',
    state: {
        sid: localStorage.getItem('sid'),
        managener: false,
        user: {},
    },
    reducers: {
        login(state, { payload }) {
            const { sid } = payload;
            window.localStorage.setItem('sid',sid)
            console.log(sid);
            return { ...state, sid: sid }
        },
        logout(state, { payload }) {
            window.localStorage.removeItem('sid')
            return { ...state, sid: null }
        }
    }
}