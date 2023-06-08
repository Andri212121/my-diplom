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
        },
        median: 1,
        blur: 0.3,
        gamma: 1,
        negate: false,
        normalise: {
            status: false,
            lower: 1,
            upper: 99
        }
    },

    status: {
        rotateAndFlip: false,
        affine: false,
        history: false,
        sharpen: false,
        median: false,
        blur: false,
        gamma: false
    },

    loading: false,

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
const MEDIAN = "MEDIAN"
const BLUR = "BLUR"
const GAMMA = "GAMMA"
const NEGATE = "NEGATE"
const NORMALISE = "NORMALISE"

const LOADING = "LOADING"

const STATUS = "STATUS"


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
        case MEDIAN:
            return {
                ...state,
                feature: {...state.feature, median: action.payload.median},
                history: [...state.history, {operation: "median"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case BLUR:
            return {
                ...state,
                feature: {...state.feature, blur: action.payload.blur},
                history: [...state.history, {operation: "blur"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case GAMMA:
            return {
                ...state,
                feature: {...state.feature, gamma: action.payload.gamma},
                history: [...state.history, {operation: "gamma"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case NEGATE:
            return {
                ...state,
                feature: {...state.feature, negate: action.payload.negate},
                history: [...state.history, {operation: "negate"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }
        case NORMALISE:
            return {
                ...state,
                feature: {...state.feature, normalise: action.payload.normalise},
                history: [...state.history, {operation: "normalise"}],
                photo: {...state.photo, processedPhoto: action.payload.processedPhoto}
            }

        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }

        case STATUS:
            return {
                ...state,
                status: action.payload
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
export const imageSharpenAction = (payload) => ({type: SHARPEN, payload})
export const imageMedianAction = (payload) => ({type: MEDIAN, payload})
export const imageBlurAction = (payload) => ({type: BLUR, payload})
export const imageGammaAction = (payload) => ({type: GAMMA, payload})
export const imageNegateAction = (payload) => ({type: NEGATE, payload})
export const imageNormaliseAction = (payload) => ({type: NORMALISE, payload})

export const loadingAction = (payload) => ({type: LOADING})
export const statusAction = (payload) => ({type: STATUS, payload})