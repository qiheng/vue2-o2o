/**
 * 设为默认地址
 * @param {Function} callback 操作后的回调函数
 * @param {Boolean} bOnly 只能选择一项或者不选
 * @param {Boolean} bMustOne 选择后必须保持一个是选择中状态
 */

export function setRadio (callback, bOnly, bMustOne) {
    var $radioParent = $('.J-radio'),
        $radio = null,
        //only = (bOnly === undefined) ? true : bOnly,
        only = (bOnly == null) ? true : bOnly,
        mustOne = (bMustOne == null) ? false : bMustOne;

    if (!$radioParent.length) {
        $radio = $('.i-radio');
    } else {
        $radio = $radioParent.find('.i-radio');
    }

    if (!$radio.length) return;

    $radio.off('.radio').on('click.radio', function () {

        if (mustOne && $(this).hasClass('checked')) return false;

        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
            this._status = false
        } else {
            only ? $radio.removeClass('checked') : '';

            $(this).addClass('checked');
            this._status = true
        }

        callback && callback.call(this, this._status);

        return false;
    });

    $radioParent.off('.radio').on('click.radio', function () {
        $(this).find('.i-radio').trigger('click');
        return false;
    })

    /* 2017/03/14 改进该事件处理 */
    //$radioParent.off('.radio').on('click.radio', '.i-radio', function () {
    //	$(this).trigger('click');
    //	return false;
    //})
}

// 工具函数
export function utils () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        isWeixin: (function () {
            return !!(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger');
        })(),
        asyncAlert: function (msg) {
            setTimeout(function(){
                alert(msg);
            }, 1);
        },
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == ' qq' //是否QQ
    }
};
