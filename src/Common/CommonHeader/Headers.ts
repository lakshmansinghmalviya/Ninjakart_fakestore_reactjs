export const getAuthenticatedHeader = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token
    }
}

export const getPublicHeader = () => {
    return {
        'Content-Type': 'application/json'
    }
}