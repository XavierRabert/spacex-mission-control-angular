// export interface MissionStat {
//   label: string;
//   value: string | number;
// }

// export interface LaunchResource {
//   key: string;
//   url: string;
//   icon: string;
//   title: string;
//   subtitle: string;
// }

// export function getMissionStats(
//   launch: Launch,
//   launchpadName: string,
//   rocketName: string,
// ): MissionStat[] {
//   if (!launch) return [];

//   return [
//     { label: 'ROCKET', value: rocketName },
//     { label: 'LAUNCHPAD', value: launchpadName || 'N/A' },
//     { label: 'CORES', value: launch.cores?.length || 0 },
//     { label: 'PAYLOADS', value: launch.payloads?.length || 0 },
//   ];
// }

// export function getLaunchResources(launch: any): LaunchResource[] {
//   if (!launch?.links) return [];

//   const allResources: LaunchResource[] = [
//     {
//       key: 'article',
//       url: launch.links.article,
//       icon: '📰',
//       title: 'Article',
//       subtitle: 'Read more',
//     },
//     {
//       key: 'wikipedia',
//       url: launch.links.wikipedia,
//       icon: '📖',
//       title: 'Wikipedia',
//       subtitle: 'Learn more',
//     },
//     {
//       key: 'presskit',
//       url: launch.links.presskit,
//       icon: '📋',
//       title: 'Press Kit',
//       subtitle: 'Download',
//     },
//     {
//       key: 'webcast',
//       url: launch.links.webcast,
//       icon: '🎥',
//       title: 'Webcast',
//       subtitle: 'Watch video',
//     },
//   ];

//   return allResources.filter((resource) => resource.url);
// }
