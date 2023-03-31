import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
jest.mock('../store/actions', () => ({

    SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",

    setIsRoomHost: () => {
        return {
            type: "SET_IS_ROOM_HOST",
            payload: { isRoomHost: true },
        };
    }
}));
import IntroductionPage from "./";

test('set room host is called with true', () => {
    render(<Provider store={store}><IntroductionPage /></Provider>);
    const isRoomHost = store.getState().isRoomHost;
    expect(isRoomHost).toBe(true);

});
test('join button should be defined', () => {
    render(<Provider store={store}><IntroductionPage /></Provider>);
    const isRoomHost = screen.getByRole('button', { name: /Join a meeting/i })
    expect(isRoomHost).toBeDefined()

});
test('host button should be defined', () => {
    render(<Provider store={store}><IntroductionPage /></Provider>);
    const isRoomHost = screen.getByRole('button', { name: /Host a meeting/i })
    expect(isRoomHost).toBeDefined()
});
test('clicking button should navigate to page', async () => {
    render(<Provider store={store}><IntroductionPage /></Provider>);
    const isRoomHost = screen.getByRole('button', { name: /Host a meeting/i })
    fireEvent.click(isRoomHost);
    expect(mockedUsedNavigate).toBeCalled();
});


