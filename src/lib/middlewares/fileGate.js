import multer from 'multer';

const storage = multer.memoryStorage();

const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
];

const fileFilter = (req, file, cb) => {
    tiposPermitidos.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error('Tipo de arquivo não permitido.'));
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export const handleUploadError = (err, req, res, next) => {
    if (err && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'Arquivo muito grande. O tamanho máximo permitido é 10MB.' });
    }
    if (err && err.message === 'Tipo de arquivo não permitido.') {
        return res.status(415).json({ error: err.message });
    }
    if (err) {
        return res.status(400).json({ error: `Erro no upload: ${err.message}` });
    }
    next();
};
