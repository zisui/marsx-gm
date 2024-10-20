import Redis from 'ioredis'

export enum redisKeys {
  // 用户信息
  USER_INFO = 'userinfo_',
  // marsx token
  MARSX_TOKEN = 'marsx_Token_',
  // 榜单数据
  RANKINGS = 'rankings_',
  //前三榜单
  TOP_THREE_RANKINGS = 'topThreeRankings',
  // 增加播放次数
  PLAY_COUNT = 'playCount_',
  // 玩家是否有未读消息
  UNREAD_MESSAGE = 'unreadMessage_',
  // 语音交互token
  VOICE_TOKEN = "voiceToken",

  INVITE_CODE = 'inviteCode_',
  ONLINE_TIME = 'onlineTime_',
  USER_REWARD = 'userReward_',

  DAILY_SIGN_IN = 'dailySignIn_',
  ACCUMULATE_SIGN_IN_DAYS = 'accumulateSignInDays_',
  SIGN_IN_DAYS = 'signInDays_',
  REWARD_RED_DOT = 'rewardRedDot_',
  USER_CONSUM_REWARD = 'userConsumReward_',
  
  

  
}

class RedisConnection {

  private redis: any

  constructor() {
    const config = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as any,
      // password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB as any
    }
    this.redis = new Redis(config)
  }

  async set(key: redisKeys | string, value: string, expiryMode?: 'EX' | 'PX', time?: number): Promise<string> {
    return expiryMode && time ?
      this.redis.set(key, value, expiryMode, time) :
      this.redis.set(key, value);
  }

  async get(key: redisKeys | string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<number> {
    return this.redis.exists(key);
  }

  async expire(key: string, seconds: number): Promise<number> {
    return this.redis.expire(key, seconds);
  }

  // hget
  async hget(key: string, field: string): Promise<string | null> {
    return this.redis.hget(key, field);
  }

  // hgetall
  async hgetall(key: string): Promise<any> {
    return this.redis.hgetall(key);
  }

}

export default new RedisConnection