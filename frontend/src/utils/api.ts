import axios from 'axios';

const serverApi = 'http://localhost:5002/api'

export const getRoomExists = async (roomId: string) => {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`)
    return response.data;
}