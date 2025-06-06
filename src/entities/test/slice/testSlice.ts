import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sendAnswers} from "entities/test/services/sendAnswers";
import {getResponse} from "entities/test/services/getResponse";
import {ImageType, TestState} from "entities/test/types/types";
import {sendImages} from "entities/test/services/sendImages";

const initialState: TestState = {
    currentStep: 1,

    images: {
        tree: null,
        animal: null,
        self: null,
    },
    previews: {
        tree: null,
        animal: null,
        self: null,
    },

    taskId: null,

    answers: {
        childName: null,
        childGender: null,
        parentName: null,
        q1_1: null,
        q1_2: null,
        q1_3: null,
        q1_4: null,
        q2_1: null,
        q2_2: null,
        q2_3: null,
        q2_4: null,
        q3_1: null,
        q3_2: null,
        q3_3: null,
        q3_4: null,
        q4_1: null,
        q4_2: null,
        q4_3: null,
        q4_4: null,
        q5_1: null,
        q5_2: '',
        q5_3: '',
        q5_4: '',
        q5_5: '',
        emotionalState: '',
    },

    imageStatus: 'idle',
    imageError: null,

    status: 'idle',
    error: null,

    reportStatus: 'idle',
    reportUrl: null,
    reportStatusError: null,
    blobUrl: null,
};

interface ImageMap {
    tree: File | null;
    animal: File | null;
    self: File | null;
}


const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setImage(state, action: PayloadAction<{ type: ImageType; file: File }>) {
            state.images[action.payload.type] = action.payload.file;
        },
        setPreview(state, action: PayloadAction<{ type: ImageType; url: string }>) {
            state.previews[action.payload.type] = action.payload.url;
        },
        setAnswer(state, action: PayloadAction<{ questionId: string; answer: string }>) {
            state.answers[action.payload.questionId] = action.payload.answer;
        },
        nextStep(state) {
            state.currentStep += 1;
        },
        prevStep(state) {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        resetTest(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            // sendImages
            .addCase(sendImages.pending, (state) => {
                state.imageStatus = 'loading';
                state.imageError = null;
            })
            .addCase(sendImages.fulfilled, (state, action: PayloadAction<string>) => {
                state.taskId = action.payload;
                state.imageStatus = 'succeeded';
                state.currentStep = 2;
            })
            .addCase(sendImages.rejected, (state, action) => {
                state.imageStatus = 'failed';
                state.imageError = action.payload as string;
            })

            // sendAnswers

            .addCase(sendAnswers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendAnswers.fulfilled, (state) => {
                state.status = 'succeeded';
                state.currentStep = 3;
            })
            .addCase(sendAnswers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getResponse.pending, (state) => {
                state.reportStatus = 'processing';
                state.reportStatusError = null;
            })

            // getResponse

            .addCase(getResponse.fulfilled, (state, action) => {
                console.log(action.payload.status)
                if (action.payload.status === 'Файл готов') {
                    state.reportStatus = 'ready';
                    state.reportUrl = action.payload.downloadUrl;
                    state.blobUrl = action.payload.blobUrl;
                }
            })
            .addCase(getResponse.rejected, (state, action) => {
                state.reportStatus = 'failed';
                state.reportStatusError = action.payload as string;
            }
            );


    },
});

export const {
    actions: testActions
} = testSlice
export const {
    reducer: testReducer
} = testSlice