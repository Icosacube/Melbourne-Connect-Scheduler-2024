import axios from 'axios';
import {
    getAllSpeakers,
    getSpeakerById,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
    defaultSpeaker,
} from '../../../scripts/speaker/functions'; 
import { Speaker } from '../../../types/frontendTypes';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Speaker Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
        process.env.REACT_APP_SPEAKER_API_PATH = '/speakers';
    });

    describe('getAllSpeakers', () => {
        it('should fetch and format all speakers', async () => {
            const mockData = [
                { id: '1', FirstName: 'John', LastName: 'Doe' },
                { id: '2', FirstName: 'Jane', LastName: 'Smith' }
            ];
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getAllSpeakers();

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/speakers');
            expect(result).toHaveLength(2);
            expect(result[0].FirstName).toBe('John');
            expect(result[1].LastName).toBe('Smith');
        });

        it('should return an empty array on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getAllSpeakers();

            expect(result).toEqual([]);
        });
    });

    describe('getSpeakerById', () => {
        it('should fetch a specific speaker by ID', async () => {
            const mockData = { id: '1', FirstName: 'John', LastName: 'Doe' };
            mockedAxios.get.mockResolvedValue({ data: mockData });

            const result = await getSpeakerById('1');

            expect(mockedAxios.get).toHaveBeenCalledWith('http://test-api.com/speakers/1');
            expect(result.FirstName).toBe('John');
            expect(result.LastName).toBe('Doe');
        });

        it('should return{} on error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await getSpeakerById('1');

            expect(result).toEqual({});
        });
    });

    describe('createSpeaker', () => {
        it('should create a new speaker successfully', async () => {
            const newSpeaker: Speaker = { ...defaultSpeaker, FirstName: 'John', LastName: 'Doe' };
            mockedAxios.post.mockResolvedValue({ status: 201 });

            const result = await createSpeaker(newSpeaker);

            expect(mockedAxios.post).toHaveBeenCalledWith('http://test-api.com/speakers', {
                ...newSpeaker,
                RecordID: undefined
            });
            expect(result.status).toBe(201);
        });

        it('should handle errors when creating a speaker', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));

            await expect(createSpeaker(defaultSpeaker)).rejects.toThrow('Network error');
        });
    });

    describe('updateSpeaker', () => {
        it('should update an existing speaker', async () => {
            const updatedSpeaker: Speaker = { ...defaultSpeaker, RecordID: '1', FirstName: 'John', LastName: 'Doe' };
            mockedAxios.put.mockResolvedValue({ status: 200 });

            const result = await updateSpeaker(updatedSpeaker);

            expect(mockedAxios.put).toHaveBeenCalledWith('http://test-api.com/speakers/1', {
                ...updatedSpeaker,
                RecordID: undefined
            });
            expect(result.status).toBe(200);
        });

        it('should handle errors when updating a speaker', async () => {
            mockedAxios.put.mockRejectedValue(new Error('Network error'));

            await expect(updateSpeaker(defaultSpeaker)).rejects.toThrow('Network error');
        });
    });

    describe('deleteSpeaker', () => {
        it('should delete a speaker by ID', async () => {
            mockedAxios.delete.mockResolvedValue({ status: 204 });

            const result = await deleteSpeaker('1');

            expect(mockedAxios.delete).toHaveBeenCalledWith('http://test-api.com/speakers/1');
            expect(result.status).toBe(204);
        });

        it('should handle errors when deleting a speaker', async () => {
            mockedAxios.delete.mockRejectedValue(new Error('Network error'));

            await expect(deleteSpeaker('1')).rejects.toThrow('Network error');
        });
    });
});
