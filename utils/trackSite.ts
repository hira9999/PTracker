import axios from 'axios';
const cheerio = require('cheerio');

export const trackSite = async (url) => {
  try {
    if (!url.includes('https://search.shopping.naver.com/catalog')) {
      throw 'Enter the url like https://search.shopping.naver.com/catalog/... ';
    }
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const keys = ['last_price', 'shop_name', 'siteUrl', 'product_name'];

    const SELECTOR =
      '#__next > div > div.style_container__D_mqP > div.style_inner__ZMO5R > div.style_content_wrap__78pql > div.style_content__v25xx > div > div.summary_info_area__NP6l5 > div.lowestPrice_price_area__VDBfj';
    const productObj = {};
    let keyIdx = 0;

    $(SELECTOR)
      .children()
      .each((idx, elem) => {
        const value = $(elem).text();
        if (idx === 0) {
          const splitedValue = value.split('최저')[1].trim();
          productObj[keys[keyIdx]] = splitedValue;
          keyIdx++;
          return;
        }
        if (idx === 1) {
          const shopName = $(elem).children('span').text();
          productObj[keys[keyIdx]] = shopName;
          keyIdx++;
          return;
        }
        const href = $('a', 'div', elem).attr('href');
        productObj[keys[keyIdx]] = href;
      });
    $('h2').each((i, e) => {
      if (i === 2) {
        const value = $(e).text();
        productObj[keys[3]] = value;
      }
    });

    return productObj;
  } catch (err) {
    throw err;
  }
};
