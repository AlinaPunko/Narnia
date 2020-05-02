async function callService(service, data, errorRef) {
    const result = await service(data);
    if (result instanceof Error) {
        errorRef.current.innerHTML = '';
        if (Array.isArray(result.message)) {
            result.message.forEach((message) => {
                errorRef.current.innerHTML += `${message}</br>`;
            });
            return;
        }
        errorRef.current.innerHTML = result.message.message;
        return;
    }

    return result;
}

export default { callService };
