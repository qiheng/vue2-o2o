/**
 * 表单验证(validator)
 * @Author   : qh
 * @Updated  : 2015-10-16
 * @version  : v1.0
 * @mail     : 626726426@qq.com
 */


var

    doc = window.document,
    toString = Object.prototype.toString,

    validator = {
        // 所有可用的检查
        types: {},
        // 当前验证回话中的错误消息
        messages: {},
        // 当前验证配置
        config: {},
        // 接口(键值对)
        validate: function (data, getFirstErrorMsgFlag) {
            var i, j, k, msg, type, rules, strategyObj, strategy, args, errorMsg, checker, result_ok;

            // 重置所有消息
            this.messages = {};

            // 映射关系 data的属性与config的属性值是对应的
            outloop:
                for (i in data) {

                    if (data.hasOwnProperty(i)) {

                        type = this.config[i];

                        if (!type) {
                            continue; // 不需要验证
                        }

                        // errorMsg = null;
                        rules = [];

                        switch (toString.call(type)) {
                            case '[object String]':
                                var strategyItems = type.split(' ');

                                for (var j = 0; j < strategyItems.length; j++) {
                                    rules.push({
                                        strategy: strategyItems[j]
                                    })
                                }

                                break;
                            case '[object Object]':
                                rules.push({
                                    strategy: type.strategy,
                                    errorMsg: type.errorMsg || ''
                                })

                                break;
                            case '[object Array]':
                                try {
                                    type[0].strategy
                                } catch(e) {
                                    throw  i + ' 的验证属性值格式错误. 如[{strategy: "isNonEmpty", errorMsg: "error Msg tips!"}]'
                                }

                                rules = type;

                                break;
                            default :
                                throw i + '的验证字段属性值 * ' + type + ' * 不是 String or Object or Array.';

                        }

                        // 处理字段验证
                        for (k = 0; k < rules.length; k++) {
                            strategyObj = rules[k];
                            args = strategyObj.strategy.split(':');
                            strategy = args.shift(); // 策略函数名
                            args.unshift( data[i] ); // 检验的值

                            checker = this.types[ strategy ];

                            if (!checker) {
                                throw 'No handler to validate type ' + strategy;
                            }

                            result_ok = checker.validate.apply(this, args);

                            if (!result_ok) {
                                errorMsg = strategyObj.errorMsg || checker.errorMsg || '输入格式错误';

                                //msg = 'Invalid value for *' + i + '*, ' + errorMsg;
                                //this.messages.push(msg);
                                this.messages[i] = errorMsg;

                                if (getFirstErrorMsgFlag) {
                                    break outloop;
                                }

                                break;
                            }
                        }
                    }
                }

            return !this.hasErrors();
        },

        isEmptyObject: function( obj ) {
            for ( var name in obj ) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        },

        hasErrors: function () {
            //return this.messages.length !== 0;
            return !this.isEmptyObject(this.messages);
        },
        version: '0.0.1'
    };

validator.types.isNonEmpty = {
    validate: function (value) {
        //console.log(value,'--',value !== void(0))
        return value === void(0) ? false : value !== '';
    },
    errorMsg: '此项不能为空'
}

validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    errorMsg: '请输入格式正确的数字'
}

validator.types.isName = {
    validate: function (value) {
        return /^\w{6,20}$/i.test(value);
    },
    errorMsg: '请输入格式正确的昵称由6~20个(字母、数字、_)组成'
}

validator.types.isMobile = {
    validate: function (value) {
        //return /^0?1[3|4|5|7|8]\d{5,9}$/.test(value);
        return /^1\d{5,14}$/.test(value);
    },
    errorMsg: '请输入格式正确的手机号码'
}

validator.types.isPhone = {
    validate: function (value) {
        //return /^0?1[3|4|5|7|8]\d{5,9}$/.test(value);
        return /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^1\d{4,14}$)|(^400\-\d{3}\-\d{4}$)|(^400\d{3}\d{4}$)/i.test(value);
    },
    errorMsg: '请输入格式正确的电话号码'
}

validator.types.isEmail = {
    validate: function (value) {
        return /^\w+((\-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|\-)[A-Za-z0-9]+)*.[A-Za-z0-9]+$/.test(value);
    },
    errorMsg: '请输入格式正确的邮箱'
}

validator.types.isPassword = {
    validate: function (value) {
        //return /^\d{6,}$/.test(value);
        return /[a-zA-Z0-9]{6,20}/.test(value);
    },
    //errorMsg: '输入的密码长度大于6'
    errorMsg: '密码格式错误(6-20位字母、数字组合)'
}

// 这里有个缺陷，errorMsg 不能提取具体的规定的长度
validator.types.minLength = {
    validate: function(value, length){
        //console.log(value + ':' + length);
        return value.length >= length;
    },
    errorMsg: '输入的字符不能小于规定的长度'
}

validator.types.maxLength = {
    validate: function(value, length){
        return value.length <= length;
    },
    errorMsg: '输入的字符不能大于规定的长度'
}
// 身份证
validator.types.isIdCard = {
    validate: function(value){
        return /^[1-9]([0-9]{14}|([0-9]{16}(\d|X|x)))$/i.test(value);
    },
    errorMsg: '输入的身份证格式错误'
}
// 银行卡
validator.types.isBankCard = {
    validate: function(value){
        return /^(\d{16}|\d{11,45})$/.test(value);
    },
    errorMsg: '输入的银行卡格式错误'
}
//短日期，形如 (2003-12-05)(2003/12/05)
validator.types.isDate = {
    validate: function (value) {
        var r = value.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if(r==null)return false;
        var d= new Date(r[1], r[3]-1, r[4]);
        return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
    },
    errorMsg: '输入的日期格式错误或是无效的日期'
}
// 正整数 + 0 intege
validator.types.isIntege = {
    validate: function(value){
        return /^[0-9]\d*$/.test(value);
    },
    errorMsg: '输入大于或等于0的整数'
}
// 整数字匹配
validator.types.isIntege1 = {
    validate: function(value){
        return /(^0.\d+$)|(^[1-9]\d*.\d*$)|(^[1-9]\d*$)|(^0$)/.test(value);
    },
    errorMsg: '输入大于或等于0的数字'
}

// 价格
validator.types.isPrice = {
    validate: function(value){
        return /(^\d{1,8}$)|(^\d{1,8}\.\d{1,2}$)/.test(value);
    },
    errorMsg: '输入正确的价格(0~99999999.99)'
}



export default validator


