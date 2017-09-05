/**
 * Created by qiheng on 2017/4/25.
 */

// 一些默认图片
import defaultGoodsPic from '@/assets/images/empty/default-empty.png'
import defaultHeaderPic from '@/assets/images/header-default.png'
import defaultShopPic from '@/assets/images/empty/default_shop_logo.png'
//import default_720_300 from '@/assets/images/empty/default_720_300.png'

// 店铺分类
const shopTypeId = { // 大类ID
    'synthe': '29FCFAF9EDD2375DE050AA0A1B2B54AF', // 综合(传统电商)
    'o2o'   : '29FCFAF9EDD4375DE050AA0A1B2B54AF', // 服务(上门服务)
    'spws'  : '4ede38cc7c69451790d7fe69e224d000', // 商品外送
    'ddxf'  : 'feb280f1210c4fefbfd86e33d30eda0a' // 到店消费
};

// 店铺分类对应的中文名称
const shopTypeName = { // 大类名字
    '29FCFAF9EDD2375DE050AA0A1B2B54AF' : '传统电商', // 综合(传统电商)
    '29FCFAF9EDD4375DE050AA0A1B2B54AF' : '上门服务', // 服务(上门服务)
    '4ede38cc7c69451790d7fe69e224d000' : '商品外送', //  商品外送
    'feb280f1210c4fefbfd86e33d30eda0a' : '到店消费' // 到店消费
};

// 默认首页
const index = 'home';

// 页面加载loading
const pageLoading = true;
// 异步请求loading
const ajaxLoading = true;

export default {
    index,
    defaultGoodsPic,
    defaultShopPic,
    defaultHeaderPic,
    shopTypeName,
    shopTypeId,
    pageLoading,
    ajaxLoading
}
