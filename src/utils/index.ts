import Schema, { Rules, Values } from 'async-validator';
import * as crypto from 'crypto';
import config from "../config";
/** 返回 分页处理
 * @param data {} 列表数据
 * @param currentPage {number} 当前页
 * @param pageSize {number} 每页数量
 * @param total {number} 总数量
 * @return 
 */
export function paginate(data: any = [], currentPage: number = 1, pageSize: number = 100, total: number = 0)
  : { data: any, currentPage: number, pageSize: number, total: number, totalPage: number } {
  return {
    data,
    currentPage,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize)
  }
}

/** 表单校验
 * @param {object} data 数据列表
 * @param {Rules} rules 校验规则
 * @param {boolean} flag 是否返回完整的的错误信息
 * @return {*}
 */
export async function validate<T extends Values>(data: object, rules: Rules, flag: boolean = false): Promise<{ data: T, error: any | null, status: number }> {
  const validator = new Schema(rules)
  return await validator.validate(data).then((data) => {
    return {
      data: data as T,
      error: null,
      status: 200
    }
  }).catch(err => {
    let errorMessage = err.errors[0].message;
    let statusCode = 400; // 默认状态码
    // 检查错误对象是否包含自定义状态码
    if (err.errors[0].status) {
      statusCode = err.errors[0].status;
    }
    if (flag) {
      return {
        data: {} as T,
        error: err,
        status: statusCode
      }
    }
    return {
      data: {} as T,
      error: errorMessage,
      status: statusCode
    }
  })
}

/** 初始化分页参数
 * @param {number} page 页码
 * @param {number} pageSize 每页数量
 * @return
 */
export function initPaging(page: number = 1, pageSize: number = 10)
  : { _page: number, _pageSize: number } {
  return {
    _page: page < 1 ? 1 : page,
    _pageSize: pageSize > 10000 || pageSize < 1 ? 10 : pageSize
  }
}

/** aes加密
 * @param data 加密数据
 * @param key  // 32字节的密钥
 * @param IV  // 16字节的IV
 * @returns string
 */
export function encryptAes(data: any, key: string = config.CryptoKEY, iv: string = config.cryptoIV) {
  const algorithm = 'aes256';
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
}

/**
 * 
 * @param data 解密数据
 * @param key // 32字节的密钥
 * @param iv // 16字节的IV
 * @returns string
 */
export function decryptAes(data: any, key: string = config.CryptoKEY, iv: string = config.cryptoIV) {
  const algorithm = 'aes256';
  var decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}

export const generateRandomNumber = () => {
  const min = 10000000; // 最小值（包含）
  const max = 99999999; // 最大值（包含）

  // 使用 Math.random() 生成 0 到 1 之间的随机小数，
  // 然后乘以 (max - min + 1) 得到一个 0 到 (max - min) 之间的随机数，
  // 再加上 min，将随机数范围调整为 min 到 max。
  return Math.floor(Math.random() * (max - min + 1)) + min;
};