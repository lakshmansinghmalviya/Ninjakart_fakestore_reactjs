
export const apiCall = async <T>(
    path: string,
    method: string,
    headers: Record<string, string>,
    data?: unknown
): Promise<T> => {
    try {
        const options: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        };
        console.log("Path is going like " + path + " data " + JSON.stringify(data));
        const response = await fetch(path, options);
        console.log("The res is  " + JSON.stringify(response));
        if (!response.ok) {
            const { message } = await response.json();
            console.log("Message ==" + message);
            throw new Error(message);
        }
        const dataToSend = await response.json() as T;
        console.log("The res is like " + JSON.stringify(dataToSend));
        return dataToSend;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown API error');
    }
};
