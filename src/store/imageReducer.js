const defaultState = {
    feature: {
        width: 0,
        height: 0,
        rotate: 0,
        flip: false,
        flop: false,
        affine: [[1, 0], [0, 1]],
        sharpen: {
            sigma: 0,
            m1: 1,
            m2: 2,
            x1: 2,
            y2: 10,
            y3: 20
        }
    },

    history: [],

    photo: {
        processedPhoto: null,
        unProcessedPhoto: null
    }
}

const UPLOAD = "UPLOAD"
const ROTATE = "ROTATE"
const FLIP = "FLIP"
const FLOP = "FLOP"
const AFFINE = "AFFINE"
const SHARPEN = "SHARPEN"

export const imageReducer = (state = defaultState, action) => {

    switch (action.type) {
        case UPLOAD:
            if (action.payload.image.target.files[0]) {
                return {
                    ...state,
                    photo: {...state.photo, unProcessedPhoto: action.payload.image.target.files[0]},
                    feature: {...state.feature, width: action.payload.width, height: action.payload.height}
                }
            } else {
                return state
            }
        case ROTATE:
            return {
                ...state,
                feature: {
                    ...state.feature,
                    rotate: state.feature.rotate + action.payload.angle === 360 ? 0 : state.feature.rotate + action.payload.angle
                },
                history: [...state.history, {operation: "rotate", angle: action.payload.angle}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case FLIP:
            return {
                ...state,
                feature: {...state.feature, flip: !state.feature.flip},
                history: [...state.history, {operation: "flip"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case FLOP:
            return {
                ...state,
                feature: {...state.feature, flop: !state.feature.flop},
                history: [...state.history, {operation: "flop"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case AFFINE:
            return {
                ...state,
                feature: {...state.feature, affine: action.payload.affine},
                history: [...state.history, {operation: "affine"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case SHARPEN:
            return {
                ...state,
                feature: {...state.feature, sharpen: action.payload.sharpen},
                history: [...state.history, {operation: "sharpen"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        default:
            return state
    }
}

export const imageUploadAction = (payload) => ({type: UPLOAD, payload})
export const imageRotateAction = (payload) => ({type: ROTATE, payload})
export const imageFlipAction = (payload) => ({type: FLIP, payload})
export const imageFlopAction = (payload) => ({type: FLOP, payload})
export const imageAffineAction = (payload) => ({type: AFFINE, payload})
export const imageASharpenAction = (payload) => ({type: SHARPEN, payload})