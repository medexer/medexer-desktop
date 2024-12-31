interface DropzoneOptions {
    maxSize: number;
    accept: string[];
    onDrop: (files: File[]) => void;
    onReject: (files: { file: File; errors: { code: string; message: string; }[] }[]) => void;
}

declare class Dropzone {
    constructor(options: DropzoneOptions);
    openBrowseDialog(): void;
} 