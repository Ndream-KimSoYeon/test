interface LoginParams {
  division: number;
  udid?: string;
  idaccount: string;
  fcmtoken: string;
}

interface LoginProfile {
  iduser: number;
  udid: string;
  nickname: string;
  userinfo: string;
  profilepath: string;
  gm: number;
  fcmtoken: string;
  accountinfo: number;
  accesstoken: string;
  avatarfolderlist: AvatarFolderList[];
  avatarlist: AvatarList[];
}

interface AvatarFolderList {}

interface AvatarList {}
