export class Api {
    private static base = 'https://rs-clone-backend-d1sl.onrender.com/api';

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

    static async getUser(userName: string): Promise<Iuser> {
        const response = await fetch(`${Api.base}/user/${userName}`);
        const data = await response.json();
        return data;
    }

    static async addResult(quiz: string, result: number, region: string): Promise<string | { message: string }> {
        const username = localStorage.getItem('username');
        if (!username) return 'please register or login to save the record';
        const prevRecord = await Api.getUserQuizResult(quiz, JSON.parse(username));
        if (result <= Number(prevRecord)) return 'not record';
        const response = await fetch(`${Api.base}/${quiz}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: JSON.parse(username), [quiz]: result }),
        });
        await Api.updateRegion(quiz, region, username);
        return response.json();
    }

    static async updateRegion(quiz: string, region: string, username: string) {
        const response = await fetch(`${Api.base}/${quiz}-region`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: JSON.parse(username), region: region }),
        });
        return response.json();
    }

    static async getUserQuizResult(quiz: string, userName: string): Promise<number | { message: string }> {
        const response = await fetch(`${Api.base}/${quiz}/${userName}`);
        const data = await response.json();
        return data;
    }

    static async getAllUserResults(userName: string): Promise<IResult> {
        const response = await fetch(`${Api.base}/results/${userName}`);
        const data = await response.json();
        return data;
    }

    static async getAllResults(): Promise<Array<IResult> | { message: string }> {
        const response = await fetch(`${Api.base}/results`);
        const data = await response.json();
        return data;
    }

    static async addAvatar(userName: string, file: File) {
        const formData = new FormData();
        formData.append('avatar', file, file.name);
        const response = await fetch(`${Api.base}/avatar/${userName}`, {
            method: 'PUT',
            body: formData,
        });
        return response.json();
    }

    static async getAvatar(userName: string) {
        const response = await fetch(`${Api.base}/avatar/${userName}`);
        const data = await response.json();
        return data;
    }
}

export interface Iuser {
    id: number;
    username: string;
    password: string;
    reg_date: string;
    avatar: string | null;
}

export interface IResult {
    country: number;
    population: number;
    flags: number;
    user_name: string;
    region_country: string | null;
    region_population: string | null;
    region_flags: string | null;
}

export enum QuizName {
    Country = 'country',
    Population = 'population',
    Flags = 'flags',
}
