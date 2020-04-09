export default function reducer(state, action) {
    switch (action.type) {
        case 'pushPath':
            return Object.assign(state, action.payload)
        default:
            throw new Error();
    }
};