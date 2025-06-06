import {createAsyncThunk} from "@reduxjs/toolkit";

export const sendAnswers = createAsyncThunk<string, {answers: Record<string, string>, taskId: string}, { rejectValue: string }>(
    'test/sendAnswers',
    async ({ answers, taskId }, thunkAPI) => {
        const dataAnswers = JSON.stringify({
            task_id: taskId,
            survey: {
                task_id: taskId,
                ...answers,
            },
        });

        try {
            const response = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dataAnswers,
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке изображений');
            }
            const data = await response.json();
            return data.task_id
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);