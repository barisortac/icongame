import request from '../utils/request'

export const fetchLeaderboard = (options) => request('/leaderboard', options);
export const insertLeaderboard = (options) => request('/leaderboard', {method:'POST', ...options});
