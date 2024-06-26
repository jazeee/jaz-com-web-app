export enum SettingsStatus {
  UNINITIALIZED = 'UNINITIALIZED',
  UPDATED = 'UPDATED',
}

export enum SettingName {
  USERNAME = 'username',
  PASSWORD = 'password',
  SOURCE_URL = 'sourceUrl',
  SETTINGS_STATE = 'settingsState',
}

export interface SettingProp {
  name: SettingName;
  defaultValue: string;
  value?: string | null;
}
