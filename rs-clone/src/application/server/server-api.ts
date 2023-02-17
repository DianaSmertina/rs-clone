export class Api {
    private static base = 'http://localhost:5000/api'; // поменять, когда будет задеплоеный сервер

    static async signIn(data: { username: string; password: string }): Promise<string> {
        const response = await fetch(`${Api.base}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async signUp(data: { username: string; password: string }): Promise<string | { message: string }> {
        const response = await fetch(`${Api.base}/user`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    static async getUser(
        userName: string
    ): Promise<{ id: number; username: string; password: string; reg_date: string }> {
        const response = await fetch(`${Api.base}/user/${userName}`);
        const data = await response.json();
        return data;
    }

    static async addResult(quiz: QuizName, result: number): Promise<string | { message: string }> {
        const username = localStorage.getItem('username');
        if (!username) return 'please register or login to save the record';
        const prevRecord = await Api.getUserQuizResult(quiz, JSON.stringify(username));
        if (result <= prevRecord) return 'not record';
        const response = await fetch(`${Api.base}/${quiz}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: JSON.stringify(username), [quiz]: result }),
        });
        return response.json();
    }

    static async getUserQuizResult(quiz: QuizName, userName: string): Promise<number | { message: string }> {
        const response = await fetch(`${Api.base}/${quiz}/${userName}`);
        const data = await response.json();
        return data;
    }

    static async getAllUserResults(
        userName: string
    ): Promise<{
        country: number;
        population: number;
        flags: number;
        user_name: string;
        region_country: string | null;
        region_population: string | null;
        region_flags: string | null;
    }> {
        const response = await fetch(`${Api.base}/results/${userName}`);
        const data = await response.json();
        return data;
    }

    static async getAllResults(): Promise<string | { message: string }> {
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
