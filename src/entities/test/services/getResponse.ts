// Тип ответа от сервера
import {createAsyncThunk} from "@reduxjs/toolkit";

interface ReportStatusResponse {
    status: 'в обработке' | 'Файл готов';
    downloadUrl?: string;
    blobUrl?: string;
}

export const getResponse = createAsyncThunk<
    ReportStatusResponse,
    string,
    { rejectValue: string }
>(
    'test/fetchReportStatus',
    async (taskId, thunkAPI) => {
        try {
            const response = await fetch(`https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/${taskId}`);
            if (!response.ok) {
                throw new Error('Ошибка при получении статуса отчёта');
            }

            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                return { status: data.status } as ReportStatusResponse;
            }
            if (contentType && contentType.includes('application/pdf')) {
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                return { status: 'Файл готов', downloadUrl: `https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/${taskId}`, blobUrl: blobUrl } as ReportStatusResponse;
            }

            throw new Error('Ошибка при получении статуса отчёта');
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
