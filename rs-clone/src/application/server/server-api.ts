export class Api {
    private static base = 'http://localhost:5000/api'; // поменять, когда будет задеплоеный сервер

    async signIn(data: { username: string; password: string }): Promise<string> {
        const response = await fetch(`${Api.base}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async signUp(data: { username: string; password: string }) {
        const response = await fetch(`${Api.base}/user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}
