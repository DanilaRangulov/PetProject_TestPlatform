export type ImageType = 'tree' | 'animal' | 'self';
export interface TestState {
    currentStep: number;

    images: Record<ImageType, File | null>;
    previews: Record<ImageType, string | null>;

    taskId: string | null;

    answers: Record<string, string>;

    imageStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    imageError: string | null;

    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;

    reportStatus: 'idle' | 'processing' | 'ready' | 'failed',
    reportUrl: string | null,
    reportStatusError: string | null,
    blobUrl: string | null,
}

export interface ImageMap {
    tree: File | null;
    animal: File | null;
    self: File | null;
}