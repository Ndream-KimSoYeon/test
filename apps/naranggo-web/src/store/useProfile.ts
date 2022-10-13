import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

export interface LoginState {
  loginProfile: LoginProfile;
  setLoginProfile: (by: LoginProfile) => void;
  initLoginProfile: () => void;
}

const initialLoginProfile = {
  iduser: 0,
  udid: '',
  nickname: '',
  userinfo: '',
  profilepath: '',
  gm: 0,
  fcmtoken: '',
  accountinfo: 0,
  accesstoken: '',
  avatarfolderlist: [],
  avatarlist: []
};

const useProfile = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        loginProfile: initialLoginProfile,
        setLoginProfile: (loginProfile: LoginProfile) =>
          set(
            produce((state) => {
              state.loginProfile = loginProfile;
            })
          ),
        initLoginProfile: () =>
          set(
            produce((state) => {
              state.loginProfile = initialLoginProfile;
            })
          )
      }),
      {
        name: 'profile-storage',
        getStorage: () => sessionStorage
      }
    )
  )
);

export default useProfile;
