import axios from 'axios';

export default class AxiosCancelUtil {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AxiosCancelUtil();
    }
    return this.instance;
  }

  constructor(props) {
    this.axiosQueue = [];
    this.instance = null;
  }

  /**
   * 移除队列内的属性
   * @method removeQueue
   * @param {String} id 属性id
   * @return {void}
   */
  removeQueue(id) {
    for (let i = 0, size = this.axiosQueue.length; i < size; i++) {
      if (this.axiosQueue[i].id === id) {
        this.axiosQueue.splice(i, 1);
        break;
      }
    }
  }

  /**
   * 生成随机ID
   * @method generateId
   * @return {String}
   */
  generateId() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
      36,
    );
  }

  /**
   * 添加取消任务的ID
   * @method addCancelTokenId
   * @param {} config axios Config
   * @return {void}
   */
  addCancelTokenId(config) {
    config.cancelTokenId = this.generateId();
  }

  /**
   * 获取取消任务的ID
   * @method getCancelTokenId
   * @param {} config axios Config
   * @return {Number}
   */
  getCancelTokenId(config) {
    return config.cancelTokenId;
  }

  /**
   * 生成axios请求的CancelToken
   * @method addCancelToken
   * @param {} config axios Config
   * @return {void}
   */
  addCancelToken(config) {
    let id = this.getCancelTokenId(config);
    config.cancelToken = new axios.CancelToken((cancel) => {
      this.axiosQueue.push({id, cancel});
    });
  }

  /**
   * 生成axios请求取消事件
   * @method createCancel
   * @param {} config axios Config
   * @return {void}
   */
  createCancel(config) {
    this.addCancelTokenId(config);
    this.addCancelToken(config);
  }

  /**
   * 移除取消事件
   * @method removeCancel
   * @param {} config axios Config
   * @return {void}
   */
  removeCancel(config) {
    let cancelTokenId = this.getCancelTokenId(config);
    this.removeQueue(cancelTokenId);
  }
  /**
   * 执行任务取消事件
   * @method cancelTask
   * @param {cancel} task axios Config CancelToken
   * @return {void}
   */
  cancelTask(task) {
    task.cancel && task.cancel();
  }
  /**
   * 执行队里内所有任务的取消事件
   * @method cancelAllTask
   * @return {void}
   */
  cancelAllTask() {
    this.axiosQueue.forEach((item) => {
      this.cancelTask(item);
      this.removeQueue(item.id);
    });
  }
}
