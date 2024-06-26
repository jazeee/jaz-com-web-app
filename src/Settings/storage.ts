import { SettingProp, SettingName, SettingsStatus } from './types';

const SETTING_PROPS: SettingProp[] = [
  {
    name: SettingName.USERNAME,
    defaultValue: '',
  },
  {
    name: SettingName.PASSWORD,
    defaultValue: '',
  },
  {
    name: SettingName.SOURCE_URL,
    defaultValue: 'https://jazcom.jazeee.com/sample3',
  },
  {
    name: SettingName.SETTINGS_STATE,
    defaultValue: SettingsStatus.UNINITIALIZED,
  },
];

function extractSettingsFromArray(
  settingProps: SettingProp[],
): Record<SettingName, string> {
  const settings: Record<string, string> = {};
  settingProps.forEach(({ name, value, defaultValue }) => {
    settings[name] = value ?? defaultValue;
  });
  return settings;
}

export const DEFAULT_SETTINGS = extractSettingsFromArray(SETTING_PROPS);

export async function storeSettings(settings: Record<SettingName, string>) {
  const promises = SETTING_PROPS.map(async (prop) => {
    const { name } = prop;
    return localStorage.setItem(`@jazcom:${name}`, settings[name]);
  });
  return Promise.all(promises);
}

export const loadSettings = async () => {
  const promises = SETTING_PROPS.map(async (prop) => {
    const { name, defaultValue } = prop;
    const value = localStorage.getItem(`@jazcom:${name}`);
    return { name, value, defaultValue };
  });
  const results = await Promise.all(promises);
  return extractSettingsFromArray(results);
};
