import { TLoginData } from '../../utils/burger-api';
import { RequestStatus } from '../../utils/types';
import {
  checkUserAuth,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userActions,
  userReducer
} from '../userSlice';

const userData = {
  user: { name: 'Dima', email: 'kozlovv.ds@ya.ru', password: 'password' },
  success: true
};
const updateUserData = {
  name: 'updateDima',
  email: 'UpdateKozlovv.ds@ya.ru',
  password: 'updatePassword'
};
const loginData: TLoginData = {
  email: 'kozlovv.ds@ya.ru',
  password: 'password'
};

describe('Тесты userSlice', () => {
  describe('Тесты reducers', () => {
    test('Тест authCheck', () => {
      const state = userReducer(initialState, userActions.authCheck());
      expect(state.isAuthChecked).toEqual(true);
    });
    test('Тест userLogout', () => {
      const state = userReducer(initialState, userActions.userLogout());
      expect(state.data).toEqual(null);
    });
  });
  describe('Тесты logoutUser', () => {
    test('Тест logoutUser.pending', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        logoutUser.pending('')
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Loading
      });
    });

    test('Тест logoutUser.rejected', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        logoutUser.rejected(new Error('Error'), '')
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Failed
      });
    });

    test('Тест logoutUser.fulfilled', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        userActions.userLogout()
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Idle
      });
    });
  });
  describe('Тесты registerUser', () => {
    test('Тест registerUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        registerUser.fulfilled(userData.user, '', userData.user)
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест registerUser.pending', () => {
      const state = userReducer(
        initialState,
        registerUser.pending('', userData.user)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест registerUser.rejected', () => {
      const state = userReducer(
        initialState,
        registerUser.rejected(new Error('Error'), '', userData.user)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты loginUser', () => {
    test('Тест loginUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        loginUser.fulfilled(userData.user, '', loginData)
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест loginUser.pending', () => {
      const state = userReducer(initialState, loginUser.pending('', loginData));
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест loginUser.rejected', () => {
      const state = userReducer(
        initialState,
        loginUser.rejected(new Error('Error'), '', loginData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты checkUserAuth', () => {
    test('Тест checkUserAuth.fulfilled', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.fulfilled(userData.user, '')
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест checkUserAuth.pending', () => {
      const state = userReducer(initialState, checkUserAuth.pending(''));
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест checkUserAuth.rejected', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.rejected(new Error('Error'), '')
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты checkUserAuth', () => {
    test('Тест updateUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        updateUser.fulfilled(userData, '', updateUserData)
      );
      expect(state).toEqual({
        isAuthChecked: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест updateUser.pending', () => {
      const state = userReducer(
        initialState,
        updateUser.pending('', updateUserData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест updateUser.rejected', () => {
      const state = userReducer(
        initialState,
        updateUser.rejected(new Error('Error'), '', updateUserData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });
});
