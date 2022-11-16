import axios from 'axios';
import { PRODUCT_INFO_SELECTOR, LOWEST_PRICE_BASE_URL } from '../constants';

const cheerio = require('cheerio');

export const trackSite = async (url: string) => {
  try {
    if (!url.includes(LOWEST_PRICE_BASE_URL)) {
      throw `Enter the url like ${LOWEST_PRICE_BASE_URL}`;
    }

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const keys = ['last_price', 'shop_name', 'siteUrl', 'product_name'];

    const productObj = {};
    let keyIdx = 0;

    $(PRODUCT_INFO_SELECTOR)
      .children()
      .each((idx: number, elem) => {
        const productInfo = $(elem).text();
        if (idx === 0) {
          const splitedPriceStr = productInfo.split('최저')[1].trim();
          const splitedPriceNum = parseFloat(splitedPriceStr.replace(/,/g, ''));

          productObj[keys[keyIdx]] = splitedPriceNum;
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

    // get siteUrl
    $('h2').each((idx, elem) => {
      if (idx === 2) {
        const siteUrl = $(elem).text();
        productObj[keys[3]] = siteUrl;
      }
    });

    return productObj;
  } catch (error) {
    throw error;
  }
};
