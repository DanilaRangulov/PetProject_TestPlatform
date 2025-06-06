import {createAsyncThunk} from "@reduxjs/toolkit";
import {ImageMap} from "entities/test/types/types";

export const sendImages = createAsyncThunk<string, ImageMap, { rejectValue: string }>(
    'test/sendImages',
    async (images: ImageMap, thunkAPI) => {
        const formData = new FormData();
        if (images.tree) formData.append('files', images.tree);
        if (images.animal) formData.append('files', images.animal);
        if (images.self) formData.append('files', images.self);

        try {
            const response = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload', {
                method: 'POST',
                body: formData,
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