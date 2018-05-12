import Cookies from 'js-cookie'
/**
 * 设置cookie
 * 默认0.5天过期
 */
export const setCookie = (name, value, option = {}) => {
    try {
        Cookies.set(name, value, option);
    } catch (e) {
        console.log("setCookie error!");
    }
};

/**
 * 获取cookie
 */
export const getCookie = name => {
    try {
        return Cookies.get(name);
    } catch (e) {
        console.log("getCookie error!");
        return null;
    }
};