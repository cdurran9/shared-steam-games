import { env } from '$env/dynamic/private';

export const load = async ({fetch}) => {
  const { STEAM_API_KEY } = env;

  const doFetch = async (userId: string) => {
    const dataUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?` + new URLSearchParams({
    key: STEAM_API_KEY,
    include_appinfo: true,
    steamid: userId
  });
  const res = await fetch(dataUrl);

  const data = await res.json();

  return data.response;
  };

  const getData = async () => {
    const carter = await doFetch('76561198097411249');
    const chris = await doFetch('76561198019026222');
    const dillon = await doFetch('76561198194771647');
    const pixton = await doFetch('MyBareTibs');

    return { carter, chris, dillon, pixton }
  }

  return {
    carter: doFetch('76561198097411249'),
    chris: doFetch('76561198019026222'),
    dillon: doFetch('76561198194771647'),
    pixton: doFetch('76561198142620712'),
    // games: getData() //Promise.all([doFetch('76561198097411249'), doFetch('76561198019026222')])
  }
}