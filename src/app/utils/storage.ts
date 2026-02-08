export const saveToStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(`inovatec_${key}`, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar no storage:', error);
    }
};

export const getFromStorage = (key: string, defaultValue: any) => {
    try {
        const item = localStorage.getItem(`inovatec_${key}`);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Erro ao ler do storage:', error);
        return defaultValue;
    }
};
