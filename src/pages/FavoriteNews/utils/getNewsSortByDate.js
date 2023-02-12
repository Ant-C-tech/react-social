export const getNewsSortByDate = (news) => {
  return news.sort((news1, news2) => {
    return (
      new Date(news2.pubDate)[Symbol.toPrimitive]('number') -
      new Date(news1.pubDate)[Symbol.toPrimitive]('number')
    );
  });
};
