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

    async signUp(data: { username: string; password: string }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async addResult(quiz: QuizName, result: number): Promise<string | { message: string }> {
        const userName = JSON.parse(localStorage.getItem('username') || '');
        const prevRecord = await this.getUserResult(quiz, userName);
        if (!userName) return 'please register or login to save the record';
        if (result <= prevRecord) return 'not record';
        const response = await fetch(`${Api.base}/${quiz}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: userName, [quiz]: result }),
        });
        return response.json();
    }

    async getUserResult(quiz: QuizName, userName: string): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/${quiz}/${userName}`);
        const data = await response.json();
        return data;
    }

    async getAllResults(): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/results`);
        const data = await response.json();
        return data;
    }
}

export enum QuizName {
    Country = 'country',
    Population = 'population',
    Flags = 'flags',
}
